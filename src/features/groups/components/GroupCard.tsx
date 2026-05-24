import { StyleSheet, Text, View } from "react-native"

import { type Group } from "../types"

export const GroupCard: React.FC<{ group: Group }> = ({ group }) => {
  const balanceLabel =
    group.yourBalance === 0
      ? "Settled"
      : group.yourBalance > 0
        ? `You are owed $${group.yourBalance.toFixed(2)}`
        : `You owe $${Math.abs(group.yourBalance).toFixed(2)}`

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{group.name}</Text>
      <Text style={styles.meta}>
        {group.category} · {group.memberCount} people · ${group.totalSpent}
      </Text>
      <Text style={styles.balance}>{balanceLabel}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  meta: {
    marginTop: 4,
    fontSize: 13,
    color: "#666",
  },
  balance: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
  },
})
