import { useCallback, useMemo, useState } from "react"

import {
  groupExpensesByCategory,
  type ExpenseSection,
} from "../lib/expenseSections"
import { type Group } from "../types"

import { useAppData } from "./useAppData"

const PAGE_SIZE = 15

export type ExpenseHistoryState = {
  sections: ExpenseSection[]
  refreshing: boolean
  refresh: () => Promise<void>
  loadMore: () => void
  hasMore: boolean
}

export function useExpenseHistory(group: Group): ExpenseHistoryState {
  const { reload } = useAppData()
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [refreshing, setRefreshing] = useState(false)

  const sortedExpenses = useMemo(
    () => [...group.expenses].sort((a, b) => b.date.localeCompare(a.date)),
    [group.expenses],
  )

  const sections = useMemo(
    () => groupExpensesByCategory(sortedExpenses.slice(0, limit)),
    [limit, sortedExpenses],
  )

  const refresh = useCallback(async () => {
    setRefreshing(true)
    setLimit(PAGE_SIZE)
    await reload()
    setRefreshing(false)
  }, [reload])

  const loadMore = useCallback(() => {
    if (limit < sortedExpenses.length) {
      setLimit((count) => count + PAGE_SIZE)
    }
  }, [limit, sortedExpenses.length])

  return {
    sections,
    refreshing,
    refresh,
    loadMore,
    hasMore: limit < sortedExpenses.length,
  }
}
