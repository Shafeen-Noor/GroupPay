import { type TextStyle } from "react-native"

import { text, textMuted } from "./colors"

const base = 16

export const body: TextStyle = {
  fontSize: base,
  color: text,
}

export const bodySmall: TextStyle = {
  fontSize: base * 0.875,
  color: textMuted,
}

export const title: TextStyle = {
  fontSize: base * 1.5,
  fontWeight: "700",
  color: text,
}

export const heading: TextStyle = {
  fontSize: base * 1.125,
  fontWeight: "600",
  color: text,
}

export const label: TextStyle = {
  fontSize: base * 0.8125,
  fontWeight: "600",
  color: text,
}

export const caption: TextStyle = {
  fontSize: base * 0.75,
  color: textMuted,
}
