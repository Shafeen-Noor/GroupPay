import { render } from "@testing-library/react-native"

import { AppText } from "#design/primitives"

import { Screen } from "./Screen"

describe("Design > layout > Screen", () => {
  it("renders", () => {
    const { getByText } = render(
      <Screen>
        <AppText>Page</AppText>
      </Screen>,
    )
    expect(getByText("Page")).toBeTruthy()
  })
})
