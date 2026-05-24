import { StyleSheet, Text, View } from "react-native"

import { ScreenHeader } from "#shared/design"

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Settings" subtitle="App preferences" />
      <Text style={styles.item}>Default split: Equal</Text>
      <Text style={styles.item}>Currency: USD</Text>
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
