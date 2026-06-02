import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import { loadAppData, saveAppData } from "#shared/persistence"

import { createId } from "../lib/ids"
import { withoutParticipant } from "../lib/pruneExpense"
import {
  type AppData,
  type Expense,
  type Group,
  type Participant,
} from "../types"

type AppDataApi = {
  data: AppData
  loading: boolean
  addGroup: (name: string, category: string, color: string) => Promise<Group>
  removeGroup: (groupId: string) => Promise<void>
  addParticipant: (groupId: string, name: string) => Promise<void>
  removeParticipant: (groupId: string, participantId: string) => Promise<void>
  addExpense: (groupId: string, expense: Omit<Expense, "id">) => Promise<void>
  removeExpense: (groupId: string, expenseId: string) => Promise<void>
  getGroup: (groupId: string) => Group | undefined
}

const Context = createContext<AppDataApi | null>(null)

async function persist(next: AppData, setData: (data: AppData) => void) {
  setData(next)
  await saveAppData(next)
}

export function AppDataProvider({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  const [data, setData] = useState<AppData>({ groups: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void (async () => {
      setData(await loadAppData())
      setLoading(false)
    })()
  }, [])

  const getGroup = useCallback(
    (groupId: string) => data.groups.find((group) => group.id === groupId),
    [data.groups],
  )

  const addGroup = useCallback(
    async (name: string, category: string, color: string) => {
      const group: Group = {
        id: createId(),
        name: name.trim(),
        category: category.trim() || "trip",
        color: color.trim() || "#059669",
        participants: [],
        expenses: [],
      }
      const next = { groups: [...data.groups, group] }
      await persist(next, setData)
      return group
    },
    [data.groups],
  )

  const removeGroup = useCallback(
    async (groupId: string) => {
      await persist(
        { groups: data.groups.filter((group) => group.id !== groupId) },
        setData,
      )
    },
    [data.groups],
  )

  const addParticipant = useCallback(
    async (groupId: string, name: string) => {
      const trimmed = name.trim()
      if (!trimmed) return

      const participant: Participant = { id: createId(), name: trimmed }
      await persist(
        {
          groups: data.groups.map((group) =>
            group.id === groupId
              ? { ...group, participants: [...group.participants, participant] }
              : group,
          ),
        },
        setData,
      )
    },
    [data.groups],
  )

  const removeParticipant = useCallback(
    async (groupId: string, participantId: string) => {
      await persist(
        {
          groups: data.groups.map((group) =>
            group.id === groupId
              ? {
                  ...group,
                  participants: group.participants.filter(
                    (person) => person.id !== participantId,
                  ),
                  expenses: group.expenses
                    .map((expense) =>
                      withoutParticipant(expense, participantId),
                    )
                    .filter((expense): expense is Expense => expense !== null),
                }
              : group,
          ),
        },
        setData,
      )
    },
    [data.groups],
  )

  const addExpense = useCallback(
    async (groupId: string, expense: Omit<Expense, "id">) => {
      await persist(
        {
          groups: data.groups.map((group) =>
            group.id === groupId
              ? {
                  ...group,
                  expenses: [...group.expenses, { ...expense, id: createId() }],
                }
              : group,
          ),
        },
        setData,
      )
    },
    [data.groups],
  )

  const removeExpense = useCallback(
    async (groupId: string, expenseId: string) => {
      await persist(
        {
          groups: data.groups.map((group) =>
            group.id === groupId
              ? {
                  ...group,
                  expenses: group.expenses.filter(
                    (expense) => expense.id !== expenseId,
                  ),
                }
              : group,
          ),
        },
        setData,
      )
    },
    [data.groups],
  )

  const value = useMemo(
    () => ({
      data,
      loading,
      addGroup,
      removeGroup,
      addParticipant,
      removeParticipant,
      addExpense,
      removeExpense,
      getGroup,
    }),
    [
      data,
      loading,
      addGroup,
      removeGroup,
      addParticipant,
      removeParticipant,
      addExpense,
      removeExpense,
      getGroup,
    ],
  )

  return createElement(Context.Provider, { value }, children)
}

export function useAppData(): AppDataApi {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useAppData must be used within AppDataProvider")
  }
  return context
}
