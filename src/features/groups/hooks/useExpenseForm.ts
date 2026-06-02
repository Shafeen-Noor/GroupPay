import { useCallback, useMemo, useState } from "react"

import { hapticSuccess } from "#shared/device"
import { type ManagerSettings } from "#shared/persistence"

import {
  equalShare,
  parseMoney,
  parsePaymentMap,
  parseShareMap,
  validateExpenseForm,
} from "../lib/expenseFormLogic"
import { type Group, type SplitMode } from "../types"

import { useAppData } from "./useAppData"

export type ExpenseFormState = {
  title: string
  setTitle: (value: string) => void
  amount: string
  setAmount: (value: string) => void
  category: string
  setCategory: (value: string) => void
  notes: string
  setNotes: (value: string) => void
  date: string
  setDate: (value: string) => void
  splitWithEveryone: boolean
  setSplitWithEveryone: (value: boolean) => void
  selectedIds: string[]
  toggleParticipant: (id: string) => void
  multiplePayers: boolean
  setMultiplePayers: (value: boolean) => void
  customSplit: boolean
  setCustomSplit: (value: boolean) => void
  payerId: string
  setPayerId: (value: string) => void
  paymentAmounts: Record<string, string>
  setPaymentAmount: (participantId: string, value: string) => void
  shareAmounts: Record<string, string>
  setShareAmount: (participantId: string, value: string) => void
  splitPreview: string | null
  validationMessage: string
  submit: () => Promise<boolean>
}

export function useExpenseForm(
  group: Group,
  manager: ManagerSettings,
): ExpenseFormState {
  const { addExpense } = useAppData()
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [payerId, setPayerId] = useState("")
  const [category, setCategory] = useState("food")
  const [notes, setNotes] = useState("")
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [splitWithEveryone, setSplitWithEveryone] = useState(true)
  const [multiplePayers, setMultiplePayers] = useState(false)
  const [customSplit, setCustomSplit] = useState(false)
  const [paymentAmounts, setPaymentAmounts] = useState<Record<string, string>>(
    {},
  )
  const [shareAmounts, setShareAmounts] = useState<Record<string, string>>({})
  const [validationMessage, setValidationMessage] = useState("")

  const participantIds = useMemo(() => {
    if (splitWithEveryone) {
      return group.participants.map((person) => person.id)
    }
    return selectedIds
  }, [group.participants, selectedIds, splitWithEveryone])

  const splitPreview = useMemo(() => {
    const bill = parseMoney(amount)
    if (bill === null || participantIds.length === 0) return null

    if (customSplit) {
      return "Enter each person’s share below"
    }

    return `$${equalShare(bill, participantIds.length).toFixed(2)} each`
  }, [amount, customSplit, participantIds.length])

  const toggleParticipant = useCallback((id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    )
  }, [])

  const setPaymentAmount = useCallback(
    (participantId: string, value: string) => {
      setPaymentAmounts((current) => ({ ...current, [participantId]: value }))
    },
    [],
  )

  const setShareAmount = useCallback((participantId: string, value: string) => {
    setShareAmounts((current) => ({ ...current, [participantId]: value }))
  }, [])

  const resetForm = useCallback(() => {
    setTitle("")
    setAmount("")
    setNotes("")
    setSelectedIds([])
    setPayerId("")
    setPaymentAmounts({})
    setShareAmounts({})
    setValidationMessage("")
  }, [])

  const submit = useCallback(async (): Promise<boolean> => {
    const bill = parseMoney(amount)
    if (bill === null) {
      setValidationMessage("Enter a valid bill amount.")
      return false
    }

    const splitMode: SplitMode = customSplit ? "custom" : "equal"

    let payments: Record<string, number>
    if (multiplePayers) {
      payments = parsePaymentMap(
        paymentAmounts,
        group.participants.map((p) => p.id),
      )
    } else if (payerId) {
      payments = { [payerId]: bill }
    } else {
      payments = {}
    }

    const shares =
      splitMode === "custom" ? parseShareMap(shareAmounts, participantIds) : {}

    const validation = validateExpenseForm({
      title,
      amount: bill,
      participantIds,
      payments,
      splitMode,
      shares,
    })

    if (!validation.ok) {
      setValidationMessage(validation.message)
      return false
    }

    await addExpense(group.id, {
      title: title.trim(),
      amount: bill,
      category: category.trim() || "other",
      notes: notes.trim(),
      date,
      participantIds,
      splitMode,
      shares: splitMode === "custom" ? shares : undefined,
      payments,
    })

    await hapticSuccess(manager.hapticsEnabled)
    resetForm()
    return true
  }, [
    addExpense,
    amount,
    category,
    customSplit,
    date,
    group.id,
    group.participants,
    manager.hapticsEnabled,
    multiplePayers,
    notes,
    participantIds,
    payerId,
    paymentAmounts,
    resetForm,
    shareAmounts,
    title,
  ])

  return {
    title,
    setTitle,
    amount,
    setAmount,
    category,
    setCategory,
    notes,
    setNotes,
    date,
    setDate,
    splitWithEveryone,
    setSplitWithEveryone,
    selectedIds,
    toggleParticipant,
    multiplePayers,
    setMultiplePayers,
    customSplit,
    setCustomSplit,
    payerId,
    setPayerId,
    paymentAmounts,
    setPaymentAmount,
    shareAmounts,
    setShareAmount,
    splitPreview,
    validationMessage,
    submit,
  }
}
