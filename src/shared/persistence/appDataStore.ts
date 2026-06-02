import AsyncStorage from "@react-native-async-storage/async-storage"

import { type AppData } from "#features/groups"

import { STORAGE_KEYS } from "./keys"

const empty: AppData = { groups: [] }

export async function loadAppData(): Promise<AppData> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.appData)
  if (!raw?.trim()) return empty
  return JSON.parse(raw) as AppData
}

export async function saveAppData(data: AppData): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.appData, JSON.stringify(data))
}
