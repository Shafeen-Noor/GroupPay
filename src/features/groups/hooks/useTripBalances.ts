import { useMemo } from "react"

import { calculateBalances, totalSpent } from "../lib/balances"
import { computeSettlements, type Settlement } from "../lib/settlements"
import { type BalanceRow, type Group } from "../types"

export type TripFinance = {
  balances: BalanceRow[]
  settlements: Settlement[]
  total: number
}

export function useTripBalances(
  group: Group,
  roundBalances: boolean,
): TripFinance {
  return useMemo(() => {
    const balances = calculateBalances(group)
    const settlements = computeSettlements(balances, roundBalances)
    const total = totalSpent(group)
    return { balances, settlements, total }
  }, [group, roundBalances])
}
