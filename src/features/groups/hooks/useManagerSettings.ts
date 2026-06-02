import { useCallback, useEffect, useState } from "react"

import {
  defaultManagerSettings,
  loadManagerSettings,
  saveManagerSettings,
  type ManagerSettings,
} from "#shared/persistence"

export function useManagerSettings(): {
  settings: ManagerSettings
  ready: boolean
  update: (patch: Partial<ManagerSettings>) => Promise<void>
} {
  const [settings, setSettings] = useState<ManagerSettings>(
    defaultManagerSettings,
  )
  const [ready, setReady] = useState(false)

  useEffect(() => {
    void (async () => {
      setSettings(await loadManagerSettings())
      setReady(true)
    })()
  }, [])

  const update = useCallback(async (patch: Partial<ManagerSettings>) => {
    setSettings((current) => {
      const next = { ...current, ...patch }
      void saveManagerSettings(next)
      return next
    })
  }, [])

  return { settings, ready, update }
}
