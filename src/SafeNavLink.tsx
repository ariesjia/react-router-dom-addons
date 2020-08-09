import React, { FC } from 'react'
import { NavLinkProps, Route, Link } from 'react-router-dom'

const SafeNavLink: FC<NavLinkProps> = (props: NavLinkProps) => {
  const { to, exact, strict, className, activeClassName, ...rest } = props
  return (
    <Route path={to.toString()} exact={exact} strict={strict}>
      {({ match }) => {
        const activeClass = [className, activeClassName || 'active']
          .filter((string) => !!string)
          .join(' ')
        return match ? (
          <span {...rest} className={activeClass} style={props.activeStyle}>
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
