import React, { FC } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

export interface AuthenticatedRouteProps extends RouteProps {
  authenticated: boolean
  redirectTo: string
}

const AuthenticatedRoute: FC<AuthenticatedRouteProps> = (
  props: AuthenticatedRouteProps,
) => {
  const { component: Component, redirectTo, authenticated, ...rest } = props
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          Component && <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default AuthenticatedRoute
