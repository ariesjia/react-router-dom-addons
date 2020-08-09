import React from 'react'
import AuthenticatedRoute, {
  AuthenticatedRouteProps,
} from './AuthenticatedRoute'

export { default as SafeNavLink } from './SafeNavLink'
export { default as AuthenticatedRoute } from './AuthenticatedRoute'

export const AuthRoute = (props: AuthenticatedRouteProps) => {
  const { authenticated, ...rest } = props
  return <AuthenticatedRoute authenticated={authenticated} {...rest} />
}

export const UnAuthRoute = (props: AuthenticatedRouteProps) => {
  const { authenticated, ...rest } = props
  return <AuthenticatedRoute authenticated={!authenticated} {...rest} />
}
