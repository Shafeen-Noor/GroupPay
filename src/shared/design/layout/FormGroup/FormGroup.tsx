import { StyleSheet, View } from "react-native"

import { md, sm } from "../../foundations/spacing"
import { AppText } from "../../primitives/Text"

export type FormGroupProps = {
  label: string
  hint?: string
  children: React.ReactNode
}

export const FormGroup: React.FC<FormGroupProps> = ({
  label,
  hint,
  children,
}) => {
  return (
    <View style={styles.group}>
      <AppText variant="label">{label}</AppText>
      {hint ? (
        <AppText variant="caption" style={styles.hint}>
          {hint}
        </AppText>
      ) : null}
      <View style={styles.field}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  group: {
    width: "100%",
    marginBottom: md,
  },
  hint: {
    marginTop: sm / 2,
  },
  field: {
    marginTop: sm,
  },
})
