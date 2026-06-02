import { type BalanceRow } from "../types"

import { computeSettlements } from "./settlements"

describe("computeSettlements", () => {
  it("returns empty when everyone is even", () => {
    const balances: BalanceRow[] = [
      { participantId: "a", name: "Alex", balance: 0 },
      { participantId: "b", name: "Bo", balance: 0 },
    ]
    expect(computeSettlements(balances)).toEqual([])
  })

  it("suggests who pays whom for simple debt", () => {
    const balances: BalanceRow[] = [
      { participantId: "a", name: "Alex", balance: 30 },
      { participantId: "b", name: "Bo", balance: -30 },
    ]
    expect(computeSettlements(balances)).toEqual([
      {
        fromId: "b",
        fromName: "Bo",
        toId: "a",
        toName: "Alex",
        amount: 30,
      },
    ])
  })
})
