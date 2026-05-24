export type Group = {
  id: string
  name: string
  category: "trip" | "apartment" | "dinner" | "vacation" | "other"
  memberCount: number
  totalSpent: number
  yourBalance: number
}
