import { type Expense } from "../types"

import { groupExpensesByCategory } from "./expenseSections"

const sample: Expense[] = [
  {
    id: "1",
    title: "Lunch",
    amount: 30,
    category: "food",
    notes: "",
    date: "2026-02-01",
    participantIds: ["a"],
    splitMode: "equal",
    payments: { a: 30 },
  },
  {
    id: "2",
    title: "Taxi",
    amount: 20,
    category: "transport",
    notes: "",
    date: "2026-02-02",
    participantIds: ["a"],
    splitMode: "equal",
    payments: { a: 20 },
  },
  {
    id: "3",
    title: "Dinner",
    amount: 50,
    category: "food",
    notes: "",
    date: "2026-02-03",
    participantIds: ["a"],
    splitMode: "equal",
    payments: { a: 50 },
  },
]

describe("groupExpensesByCategory", () => {
  it("groups and subtotals by category", () => {
    const sections = groupExpensesByCategory(sample)
    expect(sections).toHaveLength(2)
    expect(sections[0].category).toBe("food")
    expect(sections[0].subtotal).toBe(80)
    expect(sections[0].data).toHaveLength(2)
    expect(sections[1].category).toBe("transport")
  })
})
