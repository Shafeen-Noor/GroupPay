import { type BalanceRow, type Group } from "../types"

import { type Settlement } from "./settlements"

/** Plain-text summary managers can paste into a group chat. */
export function buildTripSummary(
  group: Group,
  balances: BalanceRow[],
  settlements: Settlement[],
): string {
  const lines = [
    `${group.name} — GroupPay settlement`,
    `Total spent: $${group.expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}`,
    "",
    "Balances:",
    ...balances.map((row) => {
      if (Math.abs(row.balance) < 0.01) {
        return `  ${row.name}: settled`
      }
      return row.balance > 0
        ? `  ${row.name}: gets $${row.balance.toFixed(2)}`
        : `  ${row.name}: owes $${Math.abs(row.balance).toFixed(2)}`
    }),
    "",
  ]

  if (settlements.length === 0) {
    lines.push("Everyone is even — no payments needed.")
  } else {
    lines.push("Pay up:")
    for (const row of settlements) {
      lines.push(`  ${row.fromName} → ${row.toName}: $${row.amount.toFixed(2)}`)
    }
  }

  return lines.join("\n")
}
