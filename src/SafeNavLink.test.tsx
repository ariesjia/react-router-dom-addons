import React from 'react'
import { renderWithRouter } from '../test/test-util'
import { SafeNavLink } from './index'

test('should render span element when link is match current path', function () {
  const id = 'link'
  const { getByTestId } = renderWithRouter(
    <SafeNavLink to="/" data-testid={id} />,
    {
      route: '/',
    },
  )
  expect(getByTestId(id).tagName).toEqual('SPAN')
  expect(getByTestId(id).className).toEqual('active')
})

test('should render span element with activeClass when link is match current path', function () {
  const id = 'link'
  const activeClassName = 'test-active'
  const { getByTestId } = renderWithRouter(
    <SafeNavLink to="/" activeClassName={activeClassName} data-testid={id} />,
    {
      route: '/',
    },
  )
  expect(getByTestId(id).tagName).toEqual('SPAN')
  expect(getByTestId(id).className).toEqual(activeClassName)
})

test('should render a element when link is not match current path', function () {
  const id = 'link'
  const to = '/test'
  const { getByTestId } = renderWithRouter(
    <SafeNavLink to={to} data-testid={id} />,
    {
      route: '/',
    },
  )
  expect(getByTestId(id).tagName).toEqual('A')
  expect(getByTestId(id)).toHaveAttribute('href', to)
})

test('should render span element when link is match current path', function () {
  const id = 'link'
  const { getByTestId } = renderWithRouter(
    <SafeNavLink to="/" data-testid={id} />,
    {
      route: '/test',
    },
  )
  expect(getByTestId(id).tagName).toEqual('SPAN')
})

test('should render a element when link is not match current path with exact', function () {
  const id = 'link'
  const { getByTestId } = renderWithRouter(
    <SafeNavLink to="/" exact={true} data-testid={id} />,
    {
      route: '/test',
    },
  )
  expect(getByTestId(id).tagName).toEqual('A')
  expect(getByTestId(id)).toHaveAttribute('href', '/')
})

test('should render a element when link is match current path but isActive return false', function () {
  const id = 'link'
  const { getByTestId } = renderWithRouter(
    <SafeNavLink to="/" data-testid={id} isActive={() => false} />,
    {
      route: '/',
    },
  )
  expect(getByTestId(id).tagName).toEqual('A')
  expect(getByTestId(id)).toHaveAttribute('href', '/')
})
