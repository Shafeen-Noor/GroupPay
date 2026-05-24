import { StyleSheet, Text, View } from "react-native"

import { type Group } from "../types"

export const GroupSummary: React.FC<{ group: Group }> = ({ group }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total spent</Text>
      <Text style={styles.amount}>${group.totalSpent.toFixed(2)}</Text>
      <Text style={styles.label}>Members</Text>
      <Text style={styles.value}>{group.memberCount}</Text>
      <Text style={styles.label}>Category</Text>
      <Text style={styles.value}>{group.category}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
  amount: {
    fontSize: 28,
    fontWeight: "700",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
})
