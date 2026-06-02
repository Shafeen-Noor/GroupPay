import { type BalanceRow } from "../types"

export type Settlement = {
  fromId: string
  fromName: string
  toId: string
  toName: string
  amount: number
}

/** Who should pay whom to settle the trip (greedy minimum transfers). */
export function computeSettlements(
  balances: BalanceRow[],
  roundToCents = true,
): Settlement[] {
  const round = (value: number) =>
    roundToCents ? Math.round(value * 100) / 100 : value

  const debtors = balances
    .filter((row) => row.balance < -0.005)
    .map((row) => ({
      id: row.participantId,
      name: row.name,
      amount: round(-row.balance),
    }))
    .sort((a, b) => b.amount - a.amount)

  const creditors = balances
    .filter((row) => row.balance > 0.005)
    .map((row) => ({
      id: row.participantId,
      name: row.name,
      amount: round(row.balance),
    }))
    .sort((a, b) => b.amount - a.amount)

  const settlements: Settlement[] = []
  let i = 0
  let j = 0

  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amount, creditors[j].amount)
    if (pay > 0.005) {
      settlements.push({
        fromId: debtors[i].id,
        fromName: debtors[i].name,
        toId: creditors[j].id,
        toName: creditors[j].name,
        amount: pay,
      })
    }
    debtors[i].amount = round(debtors[i].amount - pay)
    creditors[j].amount = round(creditors[j].amount - pay)
    if (debtors[i].amount <= 0.005) i += 1
    if (creditors[j].amount <= 0.005) j += 1
  }

  return settlements
}
