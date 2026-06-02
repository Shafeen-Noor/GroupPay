import { render } from "@testing-library/react-native"

import { AppText } from "#design/primitives"

import { Card } from "./Card"

describe("Design > layout > Card", () => {
  it("renders", () => {
    const { getByText } = render(
      <Card>
        <AppText>Inside</AppText>
      </Card>,
    )
    expect(getByText("Inside")).toBeTruthy()
  })
})
