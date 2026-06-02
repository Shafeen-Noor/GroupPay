import { Screen, ScreenHeader } from "#design/layout"
import { AppText } from "#design/primitives"

import { CreateTripFormView } from "../components/CreateTripFormView"
import { TripCard } from "../components/TripCard"
import { useAppData } from "../hooks/useAppData"
import { useCreateTrip } from "../hooks/useCreateTrip"

export const TripsScreen: React.FC = () => {
  const { data, loading } = useAppData()
  const createTrip = useCreateTrip()

  return (
    <Screen>
      <ScreenHeader
        title="GroupPay"
        subtitle="One trip manager tracks people, expenses, and who owes whom"
      />
      <CreateTripFormView form={createTrip} />
      {loading ? (
        <AppText variant="bodySmall">Loading trips…</AppText>
      ) : data.groups.length === 0 ? (
        <AppText variant="bodySmall">Create your first trip above.</AppText>
      ) : (
        data.groups.map((group) => <TripCard key={group.id} group={group} />)
      )}
    </Screen>
  )
}
