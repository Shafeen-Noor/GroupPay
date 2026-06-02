import { fireEvent, render } from "@testing-library/react-native"

import { ToggleField } from "./ToggleField"

describe("Design > primitives > ToggleField", () => {
  it("renders", () => {
    const { getByRole } = render(
      <ToggleField value={false} onChange={() => undefined} />,
    )
    expect(getByRole("switch")).toBeTruthy()
  })

  it("calls onChange when toggled", () => {
    const onChange = jest.fn()
    const { getByRole } = render(
      <ToggleField value={false} onChange={onChange} />,
    )

    fireEvent(getByRole("switch"), "valueChange", true)
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
