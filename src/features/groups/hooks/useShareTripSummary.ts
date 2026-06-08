import { useCallback } from "react"
import { Share } from "react-native"

import { type Settlement } from "../lib/settlements"
import { buildTripSummary } from "../lib/tripSummary"
import { type BalanceRow, type Group } from "../types"

export function useShareTripSummary(
  group: Group,
  balances: BalanceRow[],
  settlements: Settlement[],
): { share: () => Promise<void> } {
  const share = useCallback(async () => {
    const message = buildTripSummary(group, balances, settlements)
    await Share.share({ message, title: `${group.name} settlement` })
  }, [balances, group, settlements])

  return { share }
}
