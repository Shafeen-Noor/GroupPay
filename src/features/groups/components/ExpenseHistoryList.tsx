import { SectionList, View } from "react-native"

import { colors, spacing } from "#design/foundations"
import { AppText } from "#design/primitives"

import { type ExpenseHistoryState } from "../hooks/useExpenseHistory"
import { type Group } from "../types"

export const ExpenseHistoryList: React.FC<{
  group: Group
  history: ExpenseHistoryState
}> = ({ group, history }) => {
  const nameById = (id: string) =>
    group.participants.find((person) => person.id === id)?.name ?? "?"

  return (
    <SectionList
      sections={history.sections}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled
      refreshing={history.refreshing}
      onRefresh={() => {
        void history.refresh()
      }}
      onEndReached={history.loadMore}
      onEndReachedThreshold={0.4}
      ListEmptyComponent={
        <AppText variant="bodySmall">No expenses logged yet.</AppText>
      }
      renderSectionHeader={({ section }) => (
        <View style={headerStyle.wrap}>
          <AppText variant="heading">{section.title}</AppText>
          <AppText variant="caption">
            ${section.subtotal.toFixed(2)} total
          </AppText>
        </View>
      )}
      renderItem={({ item }) => {
        const payers = Object.entries(item.payments)
          .filter(([, paid]) => (paid ?? 0) > 0)
          .map(([id, paid]) => `${nameById(id)} $${(paid ?? 0).toFixed(2)}`)
          .join(", ")

        return (
          <View style={rowStyle.wrap}>
            <AppText variant="body">
              {item.title} · ${item.amount.toFixed(2)}
            </AppText>
            <AppText variant="caption">
              {item.date} · paid by {payers || "—"}
            </AppText>
          </View>
        )
      }}
      ListFooterComponent={
        history.hasMore ? (
          <AppText variant="caption" style={rowStyle.footer}>
            Scroll for older expenses…
          </AppText>
        ) : null
      }
    />
  )
}

const headerStyle = {
  wrap: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
}

const rowStyle = {
  wrap: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  footer: {
    textAlign: "center" as const,
    padding: spacing.md,
  },
}
