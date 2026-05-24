import { StyleSheet, Text, View } from "react-native"

import { ScreenHeader } from "#shared/design"

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Profile" />
      <Text style={styles.item}>Name: You</Text>
      <Text style={styles.item}>Email: not set</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  item: {
    fontSize: 16,
    marginTop: 12,
  },
})
