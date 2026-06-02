import { Link } from "expo-router"
import { StyleSheet } from "react-native"

import { shapes, spacing } from "#design/foundations"
import { Card } from "#design/layout"
import { AppText } from "#design/primitives"

import { totalSpent } from "../lib/balances"
import { type Group } from "../types"

export const TripCard: React.FC<{ group: Group }> = ({ group }) => {
  const spent = totalSpent(group)

  return (
    <Link href={`/groups/${group.id}`} style={styles.link}>
      <Card style={[styles.card, { borderLeftColor: group.color }]}>
        <AppText variant="heading">{group.name}</AppText>
        <AppText variant="caption">
          {group.category} · {group.participants.length} people · $
          {spent.toFixed(2)}
        </AppText>
      </Card>
    </Link>
  )
}

const styles = StyleSheet.create({
  link: { width: "100%", marginBottom: spacing.sm },
  card: {
    borderLeftWidth: 4,
    borderRadius: shapes.radiusSm,
  },
})
