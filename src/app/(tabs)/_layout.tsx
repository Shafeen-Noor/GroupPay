import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"

const Layout: React.FC = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="users" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="info-circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  )
}

export default Layout
