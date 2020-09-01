import React from 'react'
import AuthenticatedRoute, {
  AuthenticatedRouteProps,
} from './AuthenticatedRoute'

export const AuthRoute = (props: AuthenticatedRouteProps) => {
  const { authenticated, ...rest } = props
  return <AuthenticatedRoute authenticated={authenticated} {...rest} />
}

export const UnAuthRoute = (props: AuthenticatedRouteProps) => {
  const { authenticated, ...rest } = props
  return <AuthenticatedRoute authenticated={!authenticated} {...rest} />
}
