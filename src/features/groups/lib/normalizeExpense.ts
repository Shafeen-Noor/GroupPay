import { type Expense } from "../types"

/** Ensures legacy single-payer expenses work with the payments map. */
export function normalizeExpense(expense: Expense): Expense {
  const hasPayments =
    expense.payments && Object.keys(expense.payments).length > 0

  if (hasPayments) {
    return {
      ...expense,
      splitMode: expense.splitMode ?? "equal",
      payments: expense.payments,
    }
  }

  if (expense.payerId) {
    return {
      ...expense,
      splitMode: expense.splitMode ?? "equal",
      payments: { [expense.payerId]: expense.amount },
    }
  }

  return {
    ...expense,
    splitMode: expense.splitMode ?? "equal",
    payments: {},
  }
}
