import { render } from "@testing-library/react-native"

import { AppText } from "#design/primitives"

import { FormGroup } from "./FormGroup"

describe("Design > layout > FormGroup", () => {
  it("renders label and children", () => {
    const { getByText } = render(
      <FormGroup label="Manager">
        <AppText>You</AppText>
      </FormGroup>,
    )

    expect(getByText("Manager")).toBeTruthy()
    expect(getByText("You")).toBeTruthy()
  })
})
