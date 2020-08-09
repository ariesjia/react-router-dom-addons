import React, { FC } from 'react'
import { NavLinkProps, Route, Link } from 'react-router-dom'

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  )
}

const SafeNavLink: FC<NavLinkProps> = (props: NavLinkProps) => {
  const {
    exact,
    strict,
    activeClassName,
    activeStyle,
    isActive,
    ...linkProps
  } = props
  const { to, component: _, replace: __, ...other } = linkProps
  return (
    <Route path={to.toString()} exact={exact} strict={strict}>
      {({ match, location }) => {
        const activeClass = [props.className, activeClassName || 'active']
          .filter((string) => !!string)
          .join(' ')
        const matched =
          isActive && isFunction(isActive) ? isActive(match, location) : match
        return matched ? (
          <span {...other} className={activeClass} style={activeStyle}>
            {props.children}
          </span>
        ) : (
          <Link {...linkProps} />
        )
      }}
    </Route>
  )
}

export default SafeNavLink
