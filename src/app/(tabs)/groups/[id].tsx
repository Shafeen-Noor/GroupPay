import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { useEffect } from "react"

import { TripDetailScreen, useAppData } from "#features/groups"

const App: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { getGroup } = useAppData()
  const router = useRouter()
  const group = getGroup(id ?? "")

  useEffect(() => {
    if (id && !group) {
      router.replace("/groups")
    }
  }, [group, id, router])

  return (
    <>
      <Stack.Screen options={{ title: group?.name ?? "Trip" }} />
      <TripDetailScreen groupId={id ?? ""} />
    </>
  )
}

export default App
