import { View } from "react-native"

import { FormGroup } from "#design/layout"
import { AppText, Button, TextField } from "#design/primitives"

import { type ParticipantFormState } from "../hooks/useParticipantForm"
import { type Group } from "../types"

export const ParticipantFormView: React.FC<{
  group: Group
  form: ParticipantFormState
  onRemove: (participantId: string) => void
}> = ({ group, form, onRemove }) => {
  return (
    <View>
      <AppText variant="heading">People on this trip</AppText>
      <AppText variant="bodySmall">
        Only the manager needs the app. Add everyone else by name.
      </AppText>
      <FormGroup label="Add person">
        <TextField
          value={form.name}
          onChange={form.setName}
          placeholder="Name"
        />
      </FormGroup>
      <Button
        label="Add person"
        onPress={() => {
          void form.submit()
        }}
      />
      {group.participants.map((person) => (
        <View key={person.id}>
          <AppText variant="body">{person.name}</AppText>
          <Button
            label="Remove"
            variant="ghost"
            onPress={() => {
              onRemove(person.id)
            }}
          />
        </View>
      ))}
    </View>
  )
}
