import { useRouter } from "expo-router"

import { Card, Screen, ScreenHeader } from "#design/layout"
import { AppText, Button } from "#design/primitives"

import { BalanceList } from "../components/BalanceList"
import { ExpenseFormView } from "../components/ExpenseFormView"
import { ParticipantFormView } from "../components/ParticipantFormView"
import { SettlementList } from "../components/SettlementList"
import { useAppData } from "../hooks/useAppData"
import { useTripDetail } from "../hooks/useTripDetail"
import { type Group } from "../types"

const TripDetailContent: React.FC<{ group: Group }> = ({ group }) => {
  const router = useRouter()
  const { removeGroup } = useAppData()
  const {
    settings,
    participantForm,
    expenseForm,
    finance,
    removePerson,
    removeExpenseById,
  } = useTripDetail(group)

  return (
    <Screen>
      <ScreenHeader
        title={group.name}
        subtitle={`${group.category} · managed by ${settings.managerName}`}
      />

      <Card>
        <ParticipantFormView
          group={group}
          form={participantForm}
          onRemove={(id) => {
            void removePerson(id)
          }}
        />
      </Card>

      <Card>
        <ExpenseFormView
          group={group}
          form={expenseForm}
          onRemoveExpense={(id) => {
            void removeExpenseById(id)
          }}
        />
      </Card>

      <BalanceList balances={finance.balances} total={finance.total} />
      <SettlementList settlements={finance.settlements} />

      <Button
        label="Delete this trip"
        variant="ghost"
        onPress={() => {
          void removeGroup(group.id).then(() => {
            router.replace("/groups")
          })
        }}
      />
    </Screen>
  )
}

export const TripDetailScreen: React.FC<{ groupId: string }> = ({
  groupId,
}) => {
  const { getGroup } = useAppData()
  const group = getGroup(groupId)

  if (!group) {
    return (
      <Screen scroll={false}>
        <AppText variant="bodySmall">Trip not found.</AppText>
      </Screen>
    )
  }

  return <TripDetailContent group={group} />
}
