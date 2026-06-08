import { FlatList, View } from "react-native"

import { spacing } from "#design/foundations"
import { ScreenHeader } from "#design/layout"
import { AppText } from "#design/primitives"

import { CreateTripFormView } from "../components/CreateTripFormView"
import { TripCard } from "../components/TripCard"
import { useCreateTrip } from "../hooks/useCreateTrip"
import { useTripsList } from "../hooks/useTripsList"

export const TripsScreen: React.FC = () => {
  const createTrip = useCreateTrip()
  const { trips, loading, refreshing, refresh, loadMore, hasMore } =
    useTripsList()

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "#f8fafc" }}
      contentContainerStyle={{ padding: spacing.md, flexGrow: 1 }}
      data={trips}
      keyExtractor={(trip) => trip.id}
      refreshing={refreshing}
      onRefresh={() => {
        void refresh()
      }}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <View>
          <ScreenHeader
            title="GroupPay"
            subtitle="One trip manager tracks people, expenses, and who owes whom"
          />
          <CreateTripFormView form={createTrip} />
          {loading && trips.length === 0 ? (
            <AppText variant="bodySmall">Loading trips…</AppText>
          ) : null}
        </View>
      }
      ListEmptyComponent={
        !loading ? (
          <AppText variant="bodySmall">Create your first trip above.</AppText>
        ) : null
      }
      renderItem={({ item: trip }) => <TripCard group={trip} />}
      ListFooterComponent={
        hasMore ? (
          <AppText
            variant="caption"
            style={{ textAlign: "center", marginTop: 8 }}
          >
            Pull up for more trips…
          </AppText>
        ) : null
      }
    />
  )
}
