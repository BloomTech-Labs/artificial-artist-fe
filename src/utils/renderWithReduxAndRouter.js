import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { render } from '@testing-library/react'
import reducer from '../store/reducers'
import { BrowserRouter } from 'react-router-dom'

export const renderWithReduxAndRouter = (
    ui,
    { initialState, store = createStore(reducer, initialState) } = {}
) => {
    const rendered = render(
        <Provider store={store}>
            <BrowserRouter>{ui}</BrowserRouter>
        </Provider>,
        ({ initialState, store = createStore(reducer, initialState) } = {})
    )
    return {
        ...rendered,
        rerender: (ui, options) =>
            renderWithReduxAndRouter(ui, {
                container: rendered.container,
                ...options,
            }),
    }
}
