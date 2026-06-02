import { type Expense } from "../types"

import { sumMoney } from "./expenseFormLogic"
import { normalizeExpense } from "./normalizeExpense"

function omitKey<T extends Record<string, unknown>>(
  map: T | undefined,
  key: string,
): T | undefined {
  if (!map) return undefined
  const { [key]: _removed, ...rest } = map
  return rest as T
}

/** Removes a participant from an expense, or drops it if it becomes invalid. */
export function withoutParticipant(
  expense: Expense,
  participantId: string,
): Expense | null {
  const participantIds = expense.participantIds.filter(
    (id) => id !== participantId,
  )
  const payments = omitKey(expense.payments, participantId) ?? {}
  const shares = omitKey(expense.shares, participantId)

  const payerId =
    expense.payerId === participantId ? undefined : expense.payerId

  const next = normalizeExpense({
    ...expense,
    participantIds,
    payments,
    shares,
    payerId,
  })

  if (participantIds.length === 0) return null
  const paid = Object.values(next.payments).filter(
    (value): value is number => value !== undefined && value > 0,
  )
  if (sumMoney(paid) < 0.01) return null

  return next
}
