import { Drawer } from "expo-router/drawer"

const Layout: React.FC = () => {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "Settings" }} />
    </Drawer>
  )
}

export default Layout
