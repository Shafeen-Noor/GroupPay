import { Stack } from "expo-router"

import { TripsScreen } from "#features/groups"

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Trips" }} />
      <TripsScreen />
    </>
  )
}

export default App
