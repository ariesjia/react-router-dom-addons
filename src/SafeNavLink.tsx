import React, { FC } from 'react'
import { NavLinkProps, Route, Link } from 'react-router-dom'

const SafeNavLink: FC<NavLinkProps> = (props: NavLinkProps) => {
  const { to, exact, strict, ...rest } = props
  return (
    <Route path={to.toString()} exact={exact} strict={strict}>
      {({ match }) => {
        const activeClassName = [
          props.className,
          props.activeClassName || 'active',
        ]
          .filter((string) => !!string)
          .join(' ')
        return match ? (
          <span className={activeClassName} style={props.activeStyle} {...rest}>
            {props.children}
          </span>
        ) : (
          <Link {...props} />
        )
      }}
    </Route>
  )
}

export default SafeNavLink
