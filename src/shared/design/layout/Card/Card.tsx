import { type StyleProp, type ViewStyle, StyleSheet, View } from "react-native"

import { border, surface } from "../../foundations/colors"
import { card as cardShadow } from "../../foundations/shadows"
import { radiusMd } from "../../foundations/shapes"
import { md } from "../../foundations/spacing"

export type CardProps = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: md,
    borderRadius: radiusMd,
    backgroundColor: surface,
    borderWidth: 1,
    borderColor: border,
    ...cardShadow,
  },
})
