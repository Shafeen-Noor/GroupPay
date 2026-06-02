import { type TextInputProps, StyleSheet, TextInput } from "react-native"

import { border, surface, text } from "../../foundations/colors"
import { radiusSm } from "../../foundations/shapes"
import { sm } from "../../foundations/spacing"
import { body } from "../../foundations/typography"

export type TextFieldProps = {
  onChange: (value: string) => void
  value: string
} & Omit<TextInputProps, "onChange" | "value" | "onChangeText">

export const TextField: React.FC<TextFieldProps> = ({
  onChange,
  value,
  style,
  ...props
}) => {
  return (
    <TextInput
      onChangeText={onChange}
      value={value}
      placeholderTextColor={text + "88"}
      style={[styles.input, style]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    ...body,
    width: "100%",
    borderWidth: 1,
    borderColor: border,
    borderRadius: radiusSm,
    padding: sm,
    backgroundColor: surface,
  },
})
