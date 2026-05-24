import { type Group } from "../types"

export const mockGroups: Group[] = [
  {
    id: "trip-paris",
    name: "Paris Trip",
    category: "trip",
    memberCount: 4,
    totalSpent: 840,
    yourBalance: -42.5,
  },
  {
    id: "apt-main",
    name: "Apartment 4B",
    category: "apartment",
    memberCount: 3,
    totalSpent: 1260,
    yourBalance: 18,
  },
  {
    id: "dinner-friday",
    name: "Friday Dinner",
    category: "dinner",
    memberCount: 6,
    totalSpent: 186,
    yourBalance: -12,
  },
]

export function getGroupById(id: string): Group | undefined {
  return mockGroups.find((group) => group.id === id)
}
