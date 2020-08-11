import React, { FC } from 'react'
import { generatePath } from 'react-router'
import { RouteProps, Route } from 'react-router-dom'

interface NamedRouteProps extends RouteProps {
  namePath?: string
  name?: string
}

const NamedRoute: FC<RouteProps> = (props: NamedRouteProps) => {
  const { namePath, name, ...routeProps } = props
  return <Route {...routeProps}></Route>
}

export default NamedRoute
