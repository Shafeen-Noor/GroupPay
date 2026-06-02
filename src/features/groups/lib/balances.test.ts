import { type Group } from "../types"

import { calculateBalances } from "./balances"

const groupBase: Group = {
  id: "g1",
  name: "Trip",
  category: "trip",
  color: "#059669",
  participants: [
    { id: "a", name: "Alex" },
    { id: "b", name: "Bo" },
    { id: "c", name: "Casey" },
  ],
  expenses: [],
}

describe("calculateBalances", () => {
  it("splits equally when one person paid the full bill", () => {
    const group: Group = {
      ...groupBase,
      expenses: [
        {
          id: "e1",
          title: "Dinner",
          amount: 90,
          category: "food",
          notes: "",
          date: "2026-01-01",
          participantIds: ["a", "b", "c"],
          splitMode: "equal",
          payments: { a: 90 },
          payerId: "a",
        },
      ],
    }

    const balances = calculateBalances(group)
    expect(balances.find((row) => row.participantId === "a")?.balance).toBe(60)
    expect(balances.find((row) => row.participantId === "b")?.balance).toBe(-30)
    expect(balances.find((row) => row.participantId === "c")?.balance).toBe(-30)
  })

  it("handles multiple partial payers", () => {
    const group: Group = {
      ...groupBase,
      expenses: [
        {
          id: "e2",
          title: "Hotel",
          amount: 100,
          category: "stay",
          notes: "",
          date: "2026-01-02",
          participantIds: ["a", "b"],
          splitMode: "equal",
          payments: { a: 60, b: 40 },
        },
      ],
    }

    const balances = calculateBalances(group)
    expect(balances.find((row) => row.participantId === "a")?.balance).toBe(10)
    expect(balances.find((row) => row.participantId === "b")?.balance).toBe(-10)
    expect(balances.find((row) => row.participantId === "c")?.balance).toBe(0)
  })

  it("handles custom unequal shares", () => {
    const group: Group = {
      ...groupBase,
      expenses: [
        {
          id: "e3",
          title: "Groceries",
          amount: 50,
          category: "food",
          notes: "",
          date: "2026-01-03",
          participantIds: ["a", "b"],
          splitMode: "custom",
          shares: { a: 30, b: 20 },
          payments: { b: 50 },
        },
      ],
    }

    const balances = calculateBalances(group)
    expect(balances.find((row) => row.participantId === "a")?.balance).toBe(-30)
    expect(balances.find((row) => row.participantId === "b")?.balance).toBe(30)
  })
})
