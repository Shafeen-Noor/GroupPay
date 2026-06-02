const MONEY_EPSILON = 0.01

export function parseMoney(value: string): number | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const parsed = Number.parseFloat(trimmed)
  if (!Number.isFinite(parsed) || parsed < 0) return null
  return parsed
}

export function sumMoney(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0)
}

function nearlyEqual(a: number, b: number): boolean {
  return Math.abs(a - b) < MONEY_EPSILON
}

export function equalShare(total: number, count: number): number {
  if (count <= 0) return 0
  return total / count
}

export function parsePaymentMap(
  raw: Record<string, string>,
  participantIds: string[],
): Record<string, number> {
  const payments: Record<string, number> = {}
  for (const id of participantIds) {
    const parsed = parseMoney(raw[id] ?? "")
    if (parsed !== null && parsed > 0) {
      payments[id] = parsed
    }
  }
  return payments
}

export function parseShareMap(
  raw: Record<string, string>,
  participantIds: string[],
): Record<string, number> {
  const shares: Record<string, number> = {}
  for (const id of participantIds) {
    const parsed = parseMoney(raw[id] ?? "")
    if (parsed !== null && parsed >= 0) {
      shares[id] = parsed
    }
  }
  return shares
}

export type ExpenseFormValidation = {
  ok: boolean
  message: string
}

export function validateExpenseForm(input: {
  title: string
  amount: number
  participantIds: string[]
  payments: Record<string, number>
  splitMode: "equal" | "custom"
  shares: Record<string, number>
}): ExpenseFormValidation {
  if (!input.title.trim()) {
    return { ok: false, message: "Enter a title." }
  }

  if (input.participantIds.length === 0) {
    return { ok: false, message: "Choose who shares this expense." }
  }

  const paidTotal = sumMoney(Object.values(input.payments))
  if (paidTotal <= 0) {
    return { ok: false, message: "Enter who paid and how much." }
  }

  if (!nearlyEqual(paidTotal, input.amount)) {
    return {
      ok: false,
      message: `Payments ($${paidTotal.toFixed(2)}) must equal the bill ($${input.amount.toFixed(2)}).`,
    }
  }

  if (input.splitMode === "custom") {
    const owedTotal = sumMoney(
      input.participantIds.map((id) => input.shares[id] ?? 0),
    )
    if (!nearlyEqual(owedTotal, input.amount)) {
      return {
        ok: false,
        message: `Custom shares ($${owedTotal.toFixed(2)}) must equal the bill ($${input.amount.toFixed(2)}).`,
      }
    }
  }

  return { ok: true, message: "" }
}

export function formatExpenseSummary(
  expense: {
    amount: number
    participantIds: string[]
    splitMode: "equal" | "custom"
    shares?: Partial<Record<string, number>>
    payments: Partial<Record<string, number>>
  },
  nameById: (id: string) => string,
): string {
  const payers = Object.entries(expense.payments)
    .filter(([, paid]) => (paid ?? 0) > 0)
    .map(([id, paid]) => `${nameById(id)} $${(paid ?? 0).toFixed(2)}`)
    .join(", ")

  if (expense.splitMode === "custom" && expense.shares) {
    const owed = expense.participantIds
      .map(
        (id) =>
          `${nameById(id)} owes $${(expense.shares?.[id] ?? 0).toFixed(2)}`,
      )
      .join(", ")
    return `${payers} · ${owed}`
  }

  const each = equalShare(
    expense.amount,
    expense.participantIds.length,
  ).toFixed(2)
  return `${payers} · $${each} each`
}
