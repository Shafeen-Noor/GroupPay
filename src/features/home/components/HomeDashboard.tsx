import { useMemo, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

import { GroupCard, mockGroups } from "#features/groups"
import { ScreenHeader } from "#shared/design"

type Filter = "all" | "owed" | "owing"

export const HomeDashboard: React.FC = () => {
  const [filter, setFilter] = useState<Filter>("all")

  const filteredGroups = useMemo(() => {
    if (filter === "owed") {
      return mockGroups.filter((group) => group.yourBalance > 0)
    }
    if (filter === "owing") {
      return mockGroups.filter((group) => group.yourBalance < 0)
    }
    return mockGroups
  }, [filter])

  const netBalance = useMemo(
    () => mockGroups.reduce((sum, group) => sum + group.yourBalance, 0),
    [],
  )

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="GroupPay"
        subtitle="Split expenses, track balances"
      />
      <Text style={styles.net}>
        Net balance: {netBalance >= 0 ? "+" : "-"}$
        {Math.abs(netBalance).toFixed(2)}
      </Text>

      <View style={styles.filters}>
        {(["all", "owed", "owing"] as const).map((value) => (
          <Pressable
            key={value}
            onPress={() => {
              setFilter(value)
            }}
            style={[styles.filter, filter === value && styles.filterActive]}
          >
            <Text
              style={[
                styles.filterText,
                filter === value && styles.filterTextActive,
              ]}
            >
              {value}
            </Text>
          </Pressable>
        ))}
      </View>

      {filteredGroups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
  },
  net: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  filters: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  filter: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  filterActive: {
    backgroundColor: "#333",
  },
  filterText: {
    fontSize: 13,
    textTransform: "capitalize",
    color: "#111",
  },
  filterTextActive: {
    color: "#fff",
  },
})
