import { render } from "@testing-library/react-native"

import { AppText } from "#design/primitives"

import { Card } from "./Card"

describe("Design > layout > Card integration", () => {
  it("shows child text inside a card", () => {
    const { getByText } = render(
      <Card>
        <AppText variant="heading">Settlement</AppText>
      </Card>,
    )

    expect(getByText("Settlement")).toBeTruthy()
  })
})
