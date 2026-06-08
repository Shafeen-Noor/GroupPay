import { type Expense } from "../types"

export type ExpenseSection = {
  title: string
  category: string
  data: Expense[]
  subtotal: number
}

/** Groups expenses into SectionList sections sorted by category name. */
export function groupExpensesByCategory(expenses: Expense[]): ExpenseSection[] {
  const byCategory = new Map<string, Expense[]>()

  for (const expense of expenses) {
    const key = expense.category.trim() || "other"
    const list = byCategory.get(key) ?? []
    list.push(expense)
    byCategory.set(key, list)
  }

  return [...byCategory.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, items]) => ({
      category,
      title: category.charAt(0).toUpperCase() + category.slice(1),
      data: [...items].sort((a, b) => b.date.localeCompare(a.date)),
      subtotal: items.reduce((sum, item) => sum + item.amount, 0),
    }))
}
