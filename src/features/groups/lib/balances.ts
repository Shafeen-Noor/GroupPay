import { type BalanceRow, type Expense, type Group } from "../types"

import { normalizeExpense } from "./normalizeExpense"

function owedAmount(expense: Expense, participantId: string): number {
  if (!expense.participantIds.includes(participantId)) return 0

  if (
    expense.splitMode === "custom" &&
    expense.shares?.[participantId] !== undefined
  ) {
    return expense.shares[participantId] ?? 0
  }

  const count = expense.participantIds.length
  if (count === 0) return 0
  return expense.amount / count
}

function applyExpenseToBalances(
  expense: Expense,
  totals: Record<string, number>,
): void {
  const normalized = normalizeExpense(expense)

  for (const participantId of normalized.participantIds) {
    if (totals[participantId] !== undefined) {
      totals[participantId] -= owedAmount(normalized, participantId)
    }
  }

  for (const [participantId, paid] of Object.entries(normalized.payments)) {
    if (paid && totals[participantId] !== undefined) {
      totals[participantId] += paid
    }
  }
}

export function calculateBalances(group: Group): BalanceRow[] {
  const totals: Record<string, number> = {}

  for (const person of group.participants) {
    totals[person.id] = 0
  }

  for (const expense of group.expenses) {
    applyExpenseToBalances(expense, totals)
  }

  return group.participants.map((person) => ({
    participantId: person.id,
    name: person.name,
    balance: totals[person.id] ?? 0,
  }))
}

export function totalSpent(group: Group): number {
  return group.expenses.reduce((sum, expense) => sum + expense.amount, 0)
}
