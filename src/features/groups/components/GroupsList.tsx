import { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"

import { mockGroups } from "../data/mockGroups"
import { type Group } from "../types"

import { GroupCard } from "./GroupCard"

export const GroupsList: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    setGroups(mockGroups)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your groups</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GroupCard group={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No groups yet</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  empty: {
    color: "#888",
    textAlign: "center",
    marginTop: 24,
  },
})
