import React from 'react'
import { renderWithRouter } from '../test/test-util'
import LeaveGuard from './LeaveGuard'

test('should block the history change', function () {
  const { history } = renderWithRouter(
    <LeaveGuard when={true} shouldBlock={() => true} />,
    {
      route: '/',
    },
  )
  history.push('/test')
  expect(history.location.pathname).toEqual('/')
})

test('should trigger onMessage event when history change', function () {
  const fn = jest.fn()
  const { history } = renderWithRouter(
    <LeaveGuard when={true} shouldBlock={() => true} onMessage={fn} />,
    {
      route: '/',
    },
  )
  history.push('/test')
  expect(fn).toHaveBeenCalled()
  expect(fn).toHaveBeenCalledWith(
    expect.objectContaining({
      pathname: '/test',
    }),
  )
})
