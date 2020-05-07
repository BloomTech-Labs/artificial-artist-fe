import React from "react"
import { renderWithReduxAndRouter as render } from "../utils/renderWithReduxAndRouter.js"
import Navigation from "./Navigation"

describe("Navigation", () => {
    test("renders Navigation without crashing", () => {
        render(<Navigation />)
    })

    test("renders ui components", () => {
        const { getByText } = render(<Navigation />)

        getByText(/Artificial Artist/i)
        getByText(/browse/i)
        getByText(/login/i)
        getByText(/sign up/i)
    })
})
