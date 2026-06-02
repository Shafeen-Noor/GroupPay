import { colors } from "#design/foundations"
import { Card } from "#design/layout"
import { AppText } from "#design/primitives"

import { type BalanceRow } from "../types"

export const BalanceList: React.FC<{
  balances: BalanceRow[]
  total: number
}> = ({ balances, total }) => {
  return (
    <Card>
      <AppText variant="heading">Individual balances</AppText>
      <AppText variant="caption">Trip total: ${total.toFixed(2)}</AppText>
      {balances.map((row) => (
        <AppText
          key={row.participantId}
          style={{
            color: row.balance >= 0 ? colors.positive : colors.negative,
          }}
        >
          {row.name}:{" "}
          {row.balance >= 0
            ? `gets $${row.balance.toFixed(2)}`
            : `owes $${Math.abs(row.balance).toFixed(2)}`}
        </AppText>
      ))}
    </Card>
  )
}
