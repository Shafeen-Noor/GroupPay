import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { StyleSheet } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { AppDataProvider } from "#features/groups"

const Layout: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <AppDataProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>

        <StatusBar style="auto" />
      </AppDataProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})

export default Layout
