import { Stack, useLocalSearchParams } from "expo-router"
import { useMemo } from "react"
import { StyleSheet, Text, View } from "react-native"

import { getGroupById, GroupSummary } from "#features/groups"
import { ScreenHeader } from "#shared/design"

const App: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const group = useMemo(() => getGroupById(id ?? ""), [id])

  return (
    <>
      <Stack.Screen options={{ title: group?.name ?? "Group" }} />

      <View style={styles.container}>
        <ScreenHeader title={group?.name ?? "Unknown group"} />
        {group ? (
          <GroupSummary group={group} />
        ) : (
          <Text style={styles.missing}>Group not found</Text>
        )}
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  missing: {
    color: "#888",
    fontSize: 16,
  },
})
