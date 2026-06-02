import { useCallback } from "react"

import { type ManagerSettings } from "#shared/persistence"

import { type Group } from "../types"

import { useAppData } from "./useAppData"
import { type ExpenseFormState, useExpenseForm } from "./useExpenseForm"
import { useManagerSettings } from "./useManagerSettings"
import {
  type ParticipantFormState,
  useParticipantForm,
} from "./useParticipantForm"
import { type TripFinance, useTripBalances } from "./useTripBalances"

export type TripDetailState = {
  settings: ManagerSettings
  participantForm: ParticipantFormState
  expenseForm: ExpenseFormState
  finance: TripFinance
  removePerson: (participantId: string) => Promise<void>
  removeExpenseById: (expenseId: string) => Promise<void>
}

export function useTripDetail(group: Group): TripDetailState {
  const { removeParticipant, removeExpense } = useAppData()
  const { settings } = useManagerSettings()
  const participantForm = useParticipantForm(group.id)
  const expenseForm = useExpenseForm(group, settings)
  const finance = useTripBalances(group, settings.roundBalances)

  const removePerson = useCallback(
    (participantId: string) => removeParticipant(group.id, participantId),
    [group.id, removeParticipant],
  )

  const removeExpenseById = useCallback(
    (expenseId: string) => removeExpense(group.id, expenseId),
    [group.id, removeExpense],
  )

  return {
    settings,
    participantForm,
    expenseForm,
    finance,
    removePerson,
    removeExpenseById,
  }
}
