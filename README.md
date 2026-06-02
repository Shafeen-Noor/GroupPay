# GroupPay

Split trip and group expenses. One **trip manager** runs the app, adds friends by name, logs shared expenses, and sees each person’s balance plus **who should pay whom** to settle up.

Expenses support **several people paying part of the bill** (e.g. Alex $60 + Bo $40 on a $100 dinner) and **custom splits** when people owe different amounts.

## Run

```bash
npm install
npm start
```

## Architecture

| Area                       | Location                                 |
| -------------------------- | ---------------------------------------- |
| Design tokens              | `src/shared/design/foundations/`         |
| Reusable UI (high → low)   | `primitives/` → `layout/`                |
| Persistence                | `src/shared/persistence/` (AsyncStorage) |
| Device (haptics)           | `src/shared/device/`                     |
| Trip logic & hooks         | `src/features/groups/hooks/`, `lib/`     |
| Screens (no routing logic) | `src/features/*/screens/`                |
| Routes (thin)              | `src/app/`                               |

## Scripts

- `npm start` — Expo dev server
- `npm run lint` — typecheck, ESLint, Prettier, Knip
- `npm run test:ci` — Jest with coverage

## Course requirements

- **Design system:** primitives separate from components; most styling in `#design/*`
- **Persistence:** trips and manager settings (name, haptics, round settlements) via hooks, not in UI components
- **Device:** haptic feedback on expense save (`hapticSuccess` in `useExpenseForm`)
- **User input:** multiple `TextField` and `Switch` (`ToggleField`) inputs, settings persisted
- **Tests:** smoke tests on shared components; unit tests with mocks/user actions; Card integration test
