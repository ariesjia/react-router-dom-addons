const mockHistoryPush = jest.fn()
const mockHistoryReplace = jest.fn()
const mockHistoryBack = jest.fn()
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => {
    const history = jest.requireActual('react-router').useHistory()
    return {
      ...history,
      push: mockHistoryPush.mockImplementation(history.push),
      replace: mockHistoryReplace.mockImplementation(history.replace),
      goBack: mockHistoryBack.mockImplementation(history.goBack),
    }
  },
}))

import React from 'react'
import { renderWithRouter } from '../test/test-util'
import LeaveGuard from './LeaveGuard'

test('should block the history change', function () {
  const { history } = renderWithRouter(
    <LeaveGuard when={true} shouldBlock={() => true} />,
  )
  history.push('/test')
  expect(history.location.pathname).toEqual('/')
})

test('should trigger onMessage event when history change', function () {
  const fn = jest.fn()
  const { history } = renderWithRouter(
    <LeaveGuard when={true} shouldBlock={() => true} onMessage={fn} />,
  )
  history.push('/test')
  expect(fn).toHaveBeenCalled()
  expect(fn).toHaveBeenCalledWith(
    expect.objectContaining({
      pathname: '/test',
    }),
  )
})

test('should block when message reject', async function () {
  jest.useFakeTimers()
  const { history } = renderWithRouter(
    <LeaveGuard
      when={true}
      shouldBlock={() => true}
      onMessage={() => Promise.reject()}
    />,
  )
  history.push('/test')
  await Promise.resolve()
  expect(history.location.pathname).toEqual('/')
})

test('should block history change until message resolve', async function () {
  jest.useFakeTimers()
  const { history } = renderWithRouter(
    <LeaveGuard
      when={true}
      shouldBlock={() => true}
      onMessage={() =>
        new Promise((resolve) => {
          setTimeout(() => resolve(), 100)
        })
      }
    />,
  )
  history.push('/test')
  expect(history.location.pathname).toEqual('/')
  await jest.runAllTimers()
  expect(history.location.pathname).toEqual('/test')
})

test('should block multi history change until message resolve', async function () {
  jest.useFakeTimers()
  const { history } = renderWithRouter(
    <LeaveGuard
      when={true}
      shouldBlock={() => true}
      onMessage={() =>
        new Promise((resolve) => {
          setTimeout(() => resolve(), 100)
        })
      }
    />,
  )
  history.push('/test')
  history.push('/test')
  expect(history.location.pathname).toEqual('/')
  await jest.runAllTimers()
  expect(history.location.pathname).toEqual('/test')
})

test('should use custom navigate method when navigate props defined', async function () {
  const navigate = jest.fn()
  const { history } = renderWithRouter(
    <LeaveGuard
      when={true}
      shouldBlock={() => true}
      onMessage={() => Promise.resolve()}
      navigate={navigate}
    />,
  )
  history.push('/test')
  await Promise.resolve()
  expect(navigate).toHaveBeenCalled()
  expect(navigate).toHaveBeenCalledWith(
    expect.objectContaining({
      pathname: '/test',
    }),
  )
})

test('should use push when no navigate method props and use push', async function () {
  const { history } = renderWithRouter(
    <LeaveGuard
      when={true}
      shouldBlock={() => true}
      onMessage={() => Promise.resolve()}
    />,
  )
  history.push('/test')
  await Promise.resolve()
  expect(mockHistoryPush).toHaveBeenCalled()
  expect(mockHistoryPush).toHaveBeenCalledWith(
    expect.objectContaining({
      pathname: '/test',
    }),
  )
})

test('should use replace when no navigate method props and use replace', async function () {
  const { history } = renderWithRouter(
    <LeaveGuard
      when={true}
      shouldBlock={() => true}
      onMessage={() => Promise.resolve()}
    />,
  )
  history.replace('/test')
  await Promise.resolve()
  expect(mockHistoryReplace).toHaveBeenCalled()
  expect(mockHistoryReplace).toHaveBeenCalledWith(
    expect.objectContaining({
      pathname: '/test',
    }),
  )
})

test('should use goBack when no navigate method props and use goBack', async function () {
  const { history } = renderWithRouter(
    <LeaveGuard
      when={true}
      shouldBlock={() => true}
      onMessage={() => Promise.resolve()}
    />,
    {
      route: ['/', '/demo'],
    },
  )
  history.goBack()
  await Promise.resolve()
  expect(mockHistoryBack).toHaveBeenCalled()
})
