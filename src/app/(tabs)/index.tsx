import { ScrollView, StyleSheet } from "react-native"

import { HomeDashboard } from "#features/home"

const App: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HomeDashboard />
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
  },
})
