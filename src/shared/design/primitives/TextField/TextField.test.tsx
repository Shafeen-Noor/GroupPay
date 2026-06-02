import { render, userEvent } from "@testing-library/react-native"

import { FormGroup } from "#design/layout"

import { TextField } from "./TextField"

describe("Design > primitives > TextField", () => {
  it("renders", () => {
    const { getByDisplayValue } = render(
      <TextField onChange={() => undefined} value="" />,
    )
    expect(getByDisplayValue("")).toBeTruthy()
  })

  it("fires onChange when typing", async () => {
    const onChange = jest.fn()
    const { getByDisplayValue } = render(
      <TextField onChange={onChange} value="A" />,
    )

    await userEvent.type(getByDisplayValue("A"), "lex")
    expect(onChange).toHaveBeenCalled()
  })

  it("integrates with FormGroup", () => {
    const { getByText, getByDisplayValue } = render(
      <FormGroup label="Trip name">
        <TextField onChange={() => undefined} value="Paris" />
      </FormGroup>,
    )

    expect(getByText("Trip name")).toBeTruthy()
    expect(getByDisplayValue("Paris")).toBeTruthy()
  })
})
