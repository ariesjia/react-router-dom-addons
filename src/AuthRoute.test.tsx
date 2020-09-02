import React from 'react'
import { renderWithRouter } from '../test/test-util'
import { AuthRoute, UnAuthRoute } from './AuthRoute'

describe('AuthRoute test', function () {
  test('should render component when authenticated is true', function () {
    const { history, queryByText } = renderWithRouter(
      <AuthRoute
        path="/"
        redirectTo="/login"
        authenticated={true}
        component={() => <div>home</div>}
      />,
    )
    expect(history.location.pathname).toEqual('/')
    expect(queryByText('home')).toBeInTheDocument()
  })

  test('should redirect to `redirectTo` path  when authenticated is false', function () {
    const { history, queryByText } = renderWithRouter(
      <AuthRoute
        path="/x"
        redirectTo="/login"
        authenticated={false}
        component={() => <div>home</div>}
      />,
      {
        route: ['/x'],
      },
    )
    expect(history.location.pathname).toEqual('/login')
    expect(queryByText('home')).not.toBeInTheDocument()
  })
})

describe('UnAuthRoute test', function () {
  test('should redirect to `redirectTo` when authenticated is true', function () {
    const { history, queryByText } = renderWithRouter(
      <UnAuthRoute
        path="/login"
        redirectTo="/"
        authenticated={true}
        component={() => <div>login</div>}
      />,
      {
        route: ['/login'],
      },
    )
    expect(history.location.pathname).toEqual('/')
    expect(queryByText('login')).not.toBeInTheDocument()
  })

  test('should render component  when authenticated is false', function () {
    const { history, queryByText } = renderWithRouter(
      <UnAuthRoute
        path="/login"
        redirectTo="/"
        authenticated={false}
        component={() => <div>login</div>}
      />,
      {
        route: ['/login'],
      },
    )
    expect(history.location.pathname).toEqual('/login')
    expect(queryByText('login')).toBeInTheDocument()
  })
})
