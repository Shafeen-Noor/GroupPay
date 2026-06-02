import { Card, FormGroup } from "#design/layout"
import { AppText, Button, TextField } from "#design/primitives"

import { type CreateTripState } from "../hooks/useCreateTrip"

export const CreateTripFormView: React.FC<{
  form: CreateTripState
}> = ({ form }) => {
  return (
    <Card>
      <AppText variant="heading">New trip</AppText>
      <FormGroup label="Trip name" hint="e.g. Bali 2026">
        <TextField
          value={form.name}
          onChange={form.setName}
          placeholder="Trip name"
        />
      </FormGroup>
      <FormGroup label="Type">
        <TextField
          value={form.category}
          onChange={form.setCategory}
          placeholder="trip, dinner, apartment"
        />
      </FormGroup>
      <FormGroup label="Color" hint="Hex for list accent">
        <TextField
          value={form.color}
          onChange={form.setColor}
          placeholder="#059669"
        />
      </FormGroup>
      <Button
        label="Create trip"
        onPress={() => {
          void form.submit()
        }}
      />
      {form.message ? (
        <AppText variant="caption">{form.message}</AppText>
      ) : null}
    </Card>
  )
}
