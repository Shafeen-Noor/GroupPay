import AsyncStorage from "@react-native-async-storage/async-storage"

import { STORAGE_KEYS } from "./keys"

export type ManagerSettings = {
  managerName: string
  hapticsEnabled: boolean
  roundBalances: boolean
}

export const defaultManagerSettings: ManagerSettings = {
  managerName: "Trip manager",
  hapticsEnabled: true,
  roundBalances: true,
}

export async function loadManagerSettings(): Promise<ManagerSettings> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.manager)
  if (!raw?.trim()) return defaultManagerSettings
  return { ...defaultManagerSettings, ...(JSON.parse(raw) as ManagerSettings) }
}

export async function saveManagerSettings(
  settings: ManagerSettings,
): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.manager, JSON.stringify(settings))
}
