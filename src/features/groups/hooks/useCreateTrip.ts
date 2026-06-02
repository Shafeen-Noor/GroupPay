import { useCallback, useState } from "react"

import { type Group } from "../types"

import { useAppData } from "./useAppData"

export type CreateTripInput = {
  name: string
  category: string
  color: string
}

export type CreateTripState = {
  name: string
  setName: (value: string) => void
  category: string
  setCategory: (value: string) => void
  color: string
  setColor: (value: string) => void
  message: string
  submit: () => Promise<Group | undefined>
}

export function useCreateTrip(): CreateTripState {
  const { addGroup } = useAppData()
  const [name, setName] = useState("")
  const [category, setCategory] = useState("trip")
  const [color, setColor] = useState("#059669")
  const [message, setMessage] = useState("")

  const reset = useCallback(() => {
    setName("")
    setCategory("trip")
    setColor("#059669")
    setMessage("")
  }, [])

  const submit = useCallback(async (): Promise<Group | undefined> => {
    if (!name.trim()) {
      setMessage("Enter a trip name.")
      return undefined
    }

    const group = await addGroup(name, category, color)
    setMessage(`${group.name} created.`)
    reset()
    return group
  }, [addGroup, category, color, name, reset])

  return {
    name,
    setName,
    category,
    setCategory,
    color,
    setColor,
    message,
    submit,
  }
}
