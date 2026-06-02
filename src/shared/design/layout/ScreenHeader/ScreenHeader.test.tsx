import { render } from "@testing-library/react-native"

import { ScreenHeader } from "./ScreenHeader"

describe("Design > layout > ScreenHeader", () => {
  it("renders", () => {
    const { getByText } = render(
      <ScreenHeader title="Trips" subtitle="Split costs" />,
    )
    expect(getByText("Trips")).toBeTruthy()
  })
})
