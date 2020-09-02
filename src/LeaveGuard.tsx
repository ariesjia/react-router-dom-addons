import React, { useRef } from 'react'
import { PromptProps, useHistory } from 'react-router'
import { Location, History, Action } from 'history'
import { Prompt } from 'react-router-dom'

interface LeaveGuardProps {
  when: PromptProps['when']
  shouldBlock: (location: Location) => boolean
  onMessage?: (location: Location) => Promise<void> | undefined
  navigate?: History['push'] | History['replace']
}

function getNavigateMethod(action: Action, history: History) {
  return {
    POP: history.goBack,
    PUSH: history.push,
    REPLACE: history.replace,
  }[action]
}

const LeaveGuard = (props: LeaveGuardProps) => {
  const { when, shouldBlock, onMessage, navigate } = props
  const history = useHistory()

  const confirmedRef = useRef(false)
  const pendingRef = useRef(false)

  function handleBlock(location: Location, action: Action) {
    if (!pendingRef.current && !confirmedRef.current && shouldBlock(location)) {
      const message = onMessage && onMessage(location)
      if (message) {
        pendingRef.current = true
        message.then(
          () => {
            pendingRef.current = false
            confirmedRef.current = true
            const navigateMethod = navigate
              ? navigate
              : getNavigateMethod(action, history)
            navigateMethod(location)
          },
          () => {
            pendingRef.current = false
          },
        )
      }
      return false
    } else if (pendingRef.current) {
      return false
    }
    return true
  }

  return <Prompt message={handleBlock} when={when} />
}

export default LeaveGuard
