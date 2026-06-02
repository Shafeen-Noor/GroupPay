import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

import { AppDataProvider } from "#features/groups"

const Layout: React.FC = () => {
  return (
    <AppDataProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="auto" />
    </AppDataProvider>
  )
}

export default Layout
