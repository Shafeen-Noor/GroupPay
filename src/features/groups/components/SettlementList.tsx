import { colors } from "#design/foundations"
import { Card } from "#design/layout"
import { AppText } from "#design/primitives"

import { type Settlement } from "../lib/settlements"

export const SettlementList: React.FC<{ settlements: Settlement[] }> = ({
  settlements,
}) => {
  return (
    <Card>
      <AppText variant="heading">Who pays whom</AppText>
      {settlements.length === 0 ? (
        <AppText variant="bodySmall">Everyone is settled up.</AppText>
      ) : (
        settlements.map((row) => (
          <AppText
            key={`${row.fromId}-${row.toId}`}
            style={{ color: colors.negative }}
          >
            {row.fromName} pays {row.toName} ${row.amount.toFixed(2)}
          </AppText>
        ))
      )}
    </Card>
  )
}
