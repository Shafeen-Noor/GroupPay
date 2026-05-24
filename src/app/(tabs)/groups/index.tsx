import { Link, Stack } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

import { GroupsList } from "#features/groups"

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Groups" }} />

      <View style={styles.container}>
        <GroupsList />

        <Link href="/groups/trip-paris" style={styles.link}>
          Open Paris Trip
        </Link>
        <Text style={styles.hint}>
          Tap a group above or use the sample link
        </Text>
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    color: "#0066cc",
  },
  hint: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 12,
    color: "#888",
  },
})
