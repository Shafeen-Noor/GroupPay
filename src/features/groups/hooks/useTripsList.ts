import { useCallback, useMemo, useState } from "react"

import { type Group } from "../types"

import { useAppData } from "./useAppData"

const PAGE_SIZE = 8

export type TripsListState = {
  trips: Group[]
  loading: boolean
  refreshing: boolean
  refresh: () => Promise<void>
  loadMore: () => void
  hasMore: boolean
}

export function useTripsList(): TripsListState {
  const { data, loading, reload } = useAppData()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [refreshing, setRefreshing] = useState(false)

  const sorted = useMemo(
    () => [...data.groups].sort((a, b) => a.name.localeCompare(b.name)),
    [data.groups],
  )

  const trips = useMemo(
    () => sorted.slice(0, visibleCount),
    [sorted, visibleCount],
  )

  const refresh = useCallback(async () => {
    setRefreshing(true)
    setVisibleCount(PAGE_SIZE)
    await reload()
    setRefreshing(false)
  }, [reload])

  const loadMore = useCallback(() => {
    if (visibleCount < sorted.length) {
      setVisibleCount((count) => count + PAGE_SIZE)
    }
  }, [sorted.length, visibleCount])

  return {
    trips,
    loading,
    refreshing,
    refresh,
    loadMore,
    hasMore: visibleCount < sorted.length,
  }
}
