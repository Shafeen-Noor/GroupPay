import { type Group } from "../types"

import { buildTripSummary } from "./tripSummary"

const group: Group = {
  id: "g1",
  name: "Bali",
  category: "trip",
  color: "#059669",
  participants: [
    { id: "a", name: "Alex" },
    { id: "b", name: "Bo" },
  ],
  expenses: [
    {
      id: "e1",
      title: "Hotel",
      amount: 100,
      category: "stay",
      notes: "",
      date: "2026-01-01",
      participantIds: ["a", "b"],
      splitMode: "equal",
      payments: { a: 100 },
    },
  ],
}

describe("buildTripSummary", () => {
  it("includes balances and settlement lines", () => {
    const text = buildTripSummary(
      group,
      [
        { participantId: "a", name: "Alex", balance: 50 },
        { participantId: "b", name: "Bo", balance: -50 },
      ],
      [
        {
          fromId: "b",
          fromName: "Bo",
          toId: "a",
          toName: "Alex",
          amount: 50,
        },
      ],
    )

    expect(text).toContain("Bali — GroupPay settlement")
    expect(text).toContain("Bo → Alex: $50.00")
  })
})
