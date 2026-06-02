import { StyleSheet, Switch } from "react-native"

import { brand } from "../../foundations/colors"

export type ToggleFieldProps = {
  value: boolean
  onChange: (value: boolean) => void
}

export const ToggleField: React.FC<ToggleFieldProps> = ({
  value,
  onChange,
}) => {
  return (
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ true: brand, false: "#cbd5e1" }}
      style={styles.switch}
    />
  )
}

const styles = StyleSheet.create({
  switch: {
    alignSelf: "flex-start",
  },
})
