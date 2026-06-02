import { type StyleProp, type TextStyle, StyleSheet, Text } from "react-native"

import * as tokens from "../../foundations/typography"

export type TextVariant = keyof typeof tokens

export type AppTextProps = {
  variant?: TextVariant
  style?: StyleProp<TextStyle>
  children: React.ReactNode
}

const styles = StyleSheet.create({
  body: tokens.body,
  bodySmall: tokens.bodySmall,
  title: tokens.title,
  heading: tokens.heading,
  label: tokens.label,
  caption: tokens.caption,
})

export const AppText: React.FC<AppTextProps> = ({
  variant = "body",
  style,
  children,
}) => {
  return <Text style={[styles[variant], style]}>{children}</Text>
}
