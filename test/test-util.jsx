import React from 'react'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'

export function renderWithRouter(ui, { route = ['/'] } = {}) {
  const history = createMemoryHistory({ initialEntries: route })
  return {
    ...render(ui, {
      wrapper: function Wrapper({ children }) {
        return <Router history={history}>{children}</Router>
      },
    }),
    history,
  }
}
