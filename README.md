# GroupPay

GroupPay helps a trip manager split shared costs with friends without everyone installing an app. One person creates a trip, adds people by name, logs expenses (including when several people paid part of a bill or owe unequal shares), and instantly sees each person’s balance plus who should pay whom to settle up. It is useful for group vacations, roommates, and dinners where one organizer tracks spending and shares a fair settlement plan in the group chat.

The codebase uses feature-based modlets under `src/features/` and shared modules under `src/shared/`, with thin Expo Router files in `src/app/`. A design system (`#design`) keeps tokens separate from UI primitives and layout. Trip and settlement logic lives in hooks and `lib/` (not in route files). Data persists on-device via AsyncStorage. CI runs lint steps and tests on every push; EAS Build produces Android binaries when triggered manually.

## Tech stack

- **React Native** 0.85 + **Expo SDK 56** (Expo Router, typed routes)
- **TypeScript**, ESLint, Prettier, Knip
- **Jest** + React Native Testing Library
- **AsyncStorage** — trips, manager settings (no external database)
- **expo-haptics** — feedback when expenses are saved
- **React Native Share** — settlement summary for group chats
- **GitHub Actions** — verify on push; optional EAS Android build
- **EAS Build** — `eas.json` + `npm run build`

No paid external APIs. All settlement math runs locally.

---

## Key features (code links)

| Feature                                              | Location                                                                                                                                                                                                     |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Multi-payer & custom splits                          | [`src/features/groups/hooks/useExpenseForm.ts`](src/features/groups/hooks/useExpenseForm.ts), [`src/features/groups/lib/expenseFormLogic.ts`](src/features/groups/lib/expenseFormLogic.ts)                   |
| Who pays whom                                        | [`src/features/groups/lib/settlements.ts`](src/features/groups/lib/settlements.ts)                                                                                                                           |
| **FlatList** trip list (pull-to-refresh, pagination) | [`src/features/groups/screens/TripsScreen.tsx`](src/features/groups/screens/TripsScreen.tsx), [`src/features/groups/hooks/useTripsList.ts`](src/features/groups/hooks/useTripsList.ts)                       |
| **SectionList** expense history by category          | [`src/features/groups/components/ExpenseHistoryList.tsx`](src/features/groups/components/ExpenseHistoryList.tsx), [`src/features/groups/lib/expenseSections.ts`](src/features/groups/lib/expenseSections.ts) |
| Share settlement summary                             | [`src/features/groups/lib/tripSummary.ts`](src/features/groups/lib/tripSummary.ts), [`src/features/groups/hooks/useShareTripSummary.ts`](src/features/groups/hooks/useShareTripSummary.ts)                   |
| Design system                                        | [`src/shared/design/foundations/`](src/shared/design/foundations/), [`src/shared/design/primitives/`](src/shared/design/primitives/)                                                                         |
| Persistence                                          | [`src/shared/persistence/`](src/shared/persistence/)                                                                                                                                                         |
| Tests                                                | `*.test.ts(x)` under `src/`                                                                                                                                                                                  |

---

## Onboarding

### Prerequisites

- **Node.js 24** — `nvm use` (see [`.nvmrc`](.nvmrc))
- **Watchman** (recommended on macOS)
- **Expo Go** or Android/iOS simulator

### Install

```bash
git clone <repo-url>
cd GroupPay
npm install
```

Install uses [`.npmrc`](.npmrc) (`legacy-peer-deps=true`). CI uses `npm ci --force`.

### Environment variables

None required. Trip data stays in AsyncStorage on the device.

For **EAS builds from GitHub**, add `EXPO_TOKEN` to repository secrets after running `npx eas init` locally.

### Commands

| Command                  | Purpose                 |
| ------------------------ | ----------------------- |
| `npm run start`          | Expo dev server         |
| `npm run lint`           | Full lint pipeline      |
| `npm run lint-typecheck` | TypeScript only         |
| `npm run lint-eslint`    | ESLint only             |
| `npm run lint-prettier`  | Prettier check          |
| `npm run lint-knip`      | Unused code scan        |
| `npm run test`           | Jest watch mode         |
| `npm run test:ci`        | Jest with coverage (CI) |
| `npm run build`          | EAS Android build       |
| `npx expo-doctor`        | Dependency health check |

### Project layout

```
src/
  app/           # Expo Router — thin wrappers only
  features/      # groups, settings (screens, hooks, components)
  shared/        # design system, persistence, device (haptics)
```

Import maps: `#features/*`, `#shared/*`, `#design/*`.

---

## CI/CD

Workflow: [`.github/workflows/verify-and-build.yaml`](.github/workflows/verify-and-build.yaml)

| Trigger               | Jobs                                             |
| --------------------- | ------------------------------------------------ |
| **push**              | Typecheck → ESLint → Prettier → Knip → `test:ci` |
| **workflow_dispatch** | Above + `npm run build` (EAS Android)            |

---

## Course concepts

- **Design system** — foundations vs primitives vs layout
- **Persistence** — hooks + `src/shared/persistence/`, not in components
- **Device** — haptics in `useExpenseForm`
- **User input** — `TextField` + `ToggleField` on settings and expense forms
- **FlatList / SectionList** — real trip and expense UIs
- **Testing** — smoke, unit (mocks + user actions), integration tests on shared components
