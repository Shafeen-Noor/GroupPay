export type Participant = {
  id: string
  name: string
}

export type SplitMode = "equal" | "custom"

export type Expense = {
  id: string
  title: string
  amount: number
  category: string
  notes: string
  date: string
  /** Who shares the cost of this expense. */
  participantIds: string[]
  splitMode: SplitMode
  /** Amount each participant owes (custom split only). */
  shares?: Partial<Record<string, number>>
  /** Amount each participant paid toward this bill. */
  payments: Partial<Record<string, number>>
  /** Legacy single payer — migrated to `payments` when loading balances. */
  payerId?: string
}

export type Group = {
  id: string
  name: string
  category: string
  color: string
  participants: Participant[]
  expenses: Expense[]
}

export type AppData = {
  groups: Group[]
}

export type BalanceRow = {
  participantId: string
  name: string
  balance: number
}
