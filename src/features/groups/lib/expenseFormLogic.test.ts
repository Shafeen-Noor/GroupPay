import { parsePaymentMap, validateExpenseForm } from "./expenseFormLogic"

describe("validateExpenseForm", () => {
  it("requires payments to match the bill", () => {
    const result = validateExpenseForm({
      title: "Dinner",
      amount: 100,
      participantIds: ["a", "b"],
      payments: { a: 60, b: 30 },
      splitMode: "equal",
      shares: {},
    })

    expect(result.ok).toBe(false)
    expect(result.message).toContain("must equal")
  })

  it("accepts multiple payers with equal split", () => {
    const result = validateExpenseForm({
      title: "Dinner",
      amount: 100,
      participantIds: ["a", "b"],
      payments: { a: 60, b: 40 },
      splitMode: "equal",
      shares: {},
    })

    expect(result.ok).toBe(true)
  })
})

describe("parsePaymentMap", () => {
  it("ignores empty fields", () => {
    expect(parsePaymentMap({ a: "50", b: "" }, ["a", "b"])).toEqual({ a: 50 })
  })
})
