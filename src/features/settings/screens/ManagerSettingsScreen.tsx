import { Card, FormGroup, Screen, ScreenHeader } from "#design/layout"
import { AppText, TextField, ToggleField } from "#design/primitives"

import { useManagerSettings } from "../../groups/hooks/useManagerSettings"

export const ManagerSettingsScreen: React.FC = () => {
  const { settings, ready, update } = useManagerSettings()

  if (!ready) {
    return (
      <Screen scroll={false}>
        <AppText variant="bodySmall">Loading settings…</AppText>
      </Screen>
    )
  }

  return (
    <Screen>
      <ScreenHeader
        title="Trip manager"
        subtitle="Only you need the app — everyone else is added by name"
      />

      <Card>
        <FormGroup label="Your name" hint="Shown on trip screens">
          <TextField
            value={settings.managerName}
            onChange={(value) => {
              void update({ managerName: value })
            }}
            placeholder="Trip manager"
          />
        </FormGroup>
        <FormGroup
          label="Haptic feedback"
          hint="Light tap when an expense is saved"
        >
          <ToggleField
            value={settings.hapticsEnabled}
            onChange={(value) => {
              void update({ hapticsEnabled: value })
            }}
          />
        </FormGroup>
        <FormGroup
          label="Round settlements"
          hint="Settlement amounts rounded to cents"
        >
          <ToggleField
            value={settings.roundBalances}
            onChange={(value) => {
              void update({ roundBalances: value })
            }}
          />
        </FormGroup>
      </Card>

      <Card>
        <AppText variant="heading">How it works</AppText>
        <AppText variant="bodySmall">
          Create a trip, add friends by name, log shared expenses, and see each
          person&apos;s balance plus who should pay whom to settle up. Data
          stays on this device.
        </AppText>
      </Card>
    </Screen>
  )
}
