import {
  type StyleProp,
  type ViewStyle,
  Pressable,
  StyleSheet,
} from "react-native"

import { brand, brandDark, textInverse } from "../../foundations/colors"
import { radiusSm } from "../../foundations/shapes"
import { md, sm } from "../../foundations/spacing"

import { AppText } from "../Text"

export type ButtonProps = {
  label: string
  onPress: () => void
  variant?: "primary" | "ghost" | "danger"
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <AppText
        variant="label"
        style={variant === "ghost" ? styles.ghostLabel : styles.label}
      >
        {label}
      </AppText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: sm,
    paddingHorizontal: md,
    borderRadius: radiusSm,
    alignItems: "center",
  },
  primary: {
    backgroundColor: brand,
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: brand,
  },
  danger: {
    backgroundColor: "#fee2e2",
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: textInverse,
  },
  ghostLabel: {
    color: brandDark,
  },
})
