import { Pressable, View } from "react-native"

import { colors, shapes, spacing } from "#design/foundations"
import { FormGroup } from "#design/layout"
import { AppText, Button, TextField, ToggleField } from "#design/primitives"

import { type ExpenseFormState } from "../hooks/useExpenseForm"
import { formatExpenseSummary } from "../lib/expenseFormLogic"
import { normalizeExpense } from "../lib/normalizeExpense"
import { type Group } from "../types"

export const ExpenseFormView: React.FC<{
  group: Group
  form: ExpenseFormState
  onRemoveExpense: (expenseId: string) => void
}> = ({ group, form, onRemoveExpense }) => {
  const nameById = (id: string) =>
    group.participants.find((person) => person.id === id)?.name ?? "?"

  return (
    <View>
      <AppText variant="heading">Shared expenses</AppText>
      <FormGroup label="Title">
        <TextField
          value={form.title}
          onChange={form.setTitle}
          placeholder="Dinner"
        />
      </FormGroup>
      <FormGroup label="Total bill">
        <TextField
          value={form.amount}
          onChange={form.setAmount}
          keyboardType="decimal-pad"
          placeholder="0.00"
        />
      </FormGroup>
      <FormGroup label="Category">
        <TextField
          value={form.category}
          onChange={form.setCategory}
          placeholder="food"
        />
      </FormGroup>
      <FormGroup label="Notes">
        <TextField value={form.notes} onChange={form.setNotes} />
      </FormGroup>
      <FormGroup label="Date">
        <TextField value={form.date} onChange={form.setDate} />
      </FormGroup>

      <FormGroup
        label="Several people paid"
        hint="Turn on to enter how much each person paid"
      >
        <ToggleField
          value={form.multiplePayers}
          onChange={form.setMultiplePayers}
        />
      </FormGroup>

      {form.multiplePayers ? (
        <FormGroup
          label="Who paid how much?"
          hint="Amounts must add up to the total bill"
        >
          {group.participants.map((person) => (
            <View key={person.id} style={styles.row}>
              <AppText variant="bodySmall" style={styles.rowLabel}>
                {person.name}
              </AppText>
              <TextField
                value={form.paymentAmounts[person.id] ?? ""}
                onChange={(value) => {
                  form.setPaymentAmount(person.id, value)
                }}
                keyboardType="decimal-pad"
                placeholder="0.00"
              />
            </View>
          ))}
        </FormGroup>
      ) : (
        <FormGroup label="Who paid the full bill?">
          <View>
            {group.participants.map((person) => (
              <Pressable
                key={person.id}
                onPress={() => {
                  form.setPayerId(person.id)
                }}
                style={[
                  chipStyle.chip,
                  form.payerId === person.id && chipStyle.active,
                ]}
              >
                <AppText variant="caption">{person.name}</AppText>
              </Pressable>
            ))}
          </View>
        </FormGroup>
      )}

      <FormGroup label="Split with everyone" hint="Who shares this cost">
        <ToggleField
          value={form.splitWithEveryone}
          onChange={form.setSplitWithEveryone}
        />
      </FormGroup>
      {!form.splitWithEveryone
        ? group.participants.map((person) => (
            <Pressable
              key={person.id}
              onPress={() => {
                form.toggleParticipant(person.id)
              }}
              style={[
                chipStyle.chip,
                form.selectedIds.includes(person.id) && chipStyle.active,
              ]}
            >
              <AppText variant="caption">{person.name}</AppText>
            </Pressable>
          ))
        : null}

      <FormGroup
        label="Custom split"
        hint="Turn on when people owe different amounts"
      >
        <ToggleField value={form.customSplit} onChange={form.setCustomSplit} />
      </FormGroup>

      {form.customSplit ? (
        <FormGroup
          label="Who owes how much?"
          hint="Shares must add up to the total bill"
        >
          {(form.splitWithEveryone
            ? group.participants
            : group.participants.filter((person) =>
                form.selectedIds.includes(person.id),
              )
          ).map((person) => (
            <View key={person.id} style={styles.row}>
              <AppText variant="bodySmall" style={styles.rowLabel}>
                {person.name}
              </AppText>
              <TextField
                value={form.shareAmounts[person.id] ?? ""}
                onChange={(value) => {
                  form.setShareAmount(person.id, value)
                }}
                keyboardType="decimal-pad"
                placeholder="0.00"
              />
            </View>
          ))}
        </FormGroup>
      ) : null}

      {form.splitPreview ? (
        <AppText variant="bodySmall">{form.splitPreview}</AppText>
      ) : null}
      {form.validationMessage ? (
        <AppText variant="caption" style={styles.error}>
          {form.validationMessage}
        </AppText>
      ) : null}

      <Button
        label="Add expense"
        onPress={() => {
          void form.submit()
        }}
      />

      {group.expenses.map((expense) => {
        const normalized = normalizeExpense(expense)
        return (
          <View key={expense.id} style={styles.expenseRow}>
            <AppText variant="body">
              {expense.title} · ${expense.amount.toFixed(2)}
            </AppText>
            <AppText variant="caption">
              {formatExpenseSummary(normalized, nameById)}
            </AppText>
            <Button
              label="Remove"
              variant="ghost"
              onPress={() => {
                onRemoveExpense(expense.id)
              }}
            />
          </View>
        )
      })}
    </View>
  )
}

const styles = {
  row: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  rowLabel: {
    minWidth: 72,
  },
  expenseRow: {
    marginTop: spacing.md,
  },
  error: {
    color: colors.negative,
    marginTop: spacing.sm,
  },
}

const chipStyle = {
  chip: {
    paddingVertical: spacing.sm / 2,
    paddingHorizontal: spacing.sm,
    borderRadius: shapes.radiusSm,
    backgroundColor: colors.brandLight,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  active: {
    backgroundColor: colors.brand,
  },
}
