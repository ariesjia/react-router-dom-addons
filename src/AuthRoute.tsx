import React from 'react'
import AuthenticatedRoute, {
  AuthenticatedRouteProps,
} from './AuthenticatedRoute'

function getAuthRoute(
  componentName: string,
  getAuthenticated: (authenticated: boolean) => boolean,
) {
  return Object.assign(
    (props: AuthenticatedRouteProps) => {
      const { authenticated, ...rest } = props
      return (
        <AuthenticatedRoute
          authenticated={getAuthenticated(authenticated)}
          {...rest}
        />
      )
    },
    { displayName: componentName },
  )
}

export const AuthRoute = getAuthRoute(
  'AuthRoute',
  (authenticated) => authenticated,
)

export const UnAuthRoute = getAuthRoute(
  'UnAuthRoute',
  (authenticated) => !authenticated,
)
