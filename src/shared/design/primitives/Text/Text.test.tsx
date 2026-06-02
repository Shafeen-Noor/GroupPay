import { render } from "@testing-library/react-native"

import { AppText } from "./Text"

describe("Design > primitives > Text", () => {
  it("renders title variant", () => {
    const { getByText } = render(<AppText variant="title">GroupPay</AppText>)
    expect(getByText("GroupPay")).toBeTruthy()
  })
})
