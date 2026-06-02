import { useCallback, useState } from "react"

import { useAppData } from "./useAppData"

export type ParticipantFormState = {
  name: string
  setName: (value: string) => void
  submit: () => Promise<void>
}

export function useParticipantForm(groupId: string): ParticipantFormState {
  const { addParticipant } = useAppData()
  const [name, setName] = useState("")

  const submit = useCallback(async () => {
    if (!name.trim()) return
    await addParticipant(groupId, name)
    setName("")
  }, [addParticipant, groupId, name])

  return { name, setName, submit }
}
