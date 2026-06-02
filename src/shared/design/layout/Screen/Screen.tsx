import {
  type StyleProp,
  type ViewStyle,
  ScrollView,
  StyleSheet,
  View,
} from "react-native"

import { background } from "../../foundations/colors"
import { md } from "../../foundations/spacing"

export type ScreenProps = {
  children: React.ReactNode
  scroll?: boolean
  style?: StyleProp<ViewStyle>
}

/** Low reusability: page shell with optional scroll. */
export const Screen: React.FC<ScreenProps> = ({
  children,
  scroll = true,
  style,
}) => {
  if (scroll) {
    return (
      <ScrollView contentContainerStyle={[styles.content, style]}>
        {children}
      </ScrollView>
    )
  }

  return <View style={[styles.content, style]}>{children}</View>
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    backgroundColor: background,
    padding: md,
  },
})
