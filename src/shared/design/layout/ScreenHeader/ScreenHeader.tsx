import { StyleSheet, View } from "react-native"

import { lg, sm } from "../../foundations/spacing"
import { AppText } from "../../primitives/Text"

export type ScreenHeaderProps = {
  title: string
  subtitle?: string
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <View style={styles.header}>
      <AppText variant="title">{title}</AppText>
      {subtitle ? (
        <AppText variant="bodySmall" style={styles.subtitle}>
          {subtitle}
        </AppText>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: lg,
    alignItems: "center",
  },
  subtitle: {
    marginTop: sm,
    textAlign: "center",
  },
})
