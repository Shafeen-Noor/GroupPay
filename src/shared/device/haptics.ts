import * as Haptics from "expo-haptics"
import { Platform } from "react-native"

/** Device feedback when the manager records an expense or settlement. */
export async function hapticSuccess(enabled: boolean): Promise<void> {
  if (!enabled) return

  if (Platform.OS === "ios") {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    return
  }

  await Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Confirm)
}
