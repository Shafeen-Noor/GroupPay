import { render, userEvent } from "@testing-library/react-native"

import { Button } from "./Button"

describe("Design > primitives > Button", () => {
  it("renders", () => {
    const { getByText } = render(
      <Button label="Save" onPress={() => undefined} />,
    )
    expect(getByText("Save")).toBeTruthy()
  })

  it("calls onPress when tapped", async () => {
    const onPress = jest.fn()
    const { getByText } = render(<Button label="Add trip" onPress={onPress} />)

    await userEvent.press(getByText("Add trip"))
    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
