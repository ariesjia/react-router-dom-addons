import React, { FC, useRef } from 'react'
import { PromptProps, useHistory } from 'react-router'
import { Location, History, Action } from 'history'
import { Prompt } from 'react-router-dom'

interface LeaveGuardProps {
  when: PromptProps['when']
  shouldBlock: (location: Location) => boolean
  onMessage?: (location: Location) => Promise<void> | undefined
  navigate?: History['push'] | History['replace']
}

const LeaveGuard = (props: LeaveGuardProps) => {
  const { when, shouldBlock, onMessage, navigate } = props
  const history = useHistory()

  const confirmedRef = useRef(false)
  const pendingRef = useRef(false)

  function handleBlock(location, action) {
    if (!pendingRef.current && !confirmedRef.current && shouldBlock(location)) {
      const message = onMessage && onMessage(location)
      if (message) {
        pendingRef.current = true
        message
          .then(() => {
            confirmedRef.current = true
            const navigateMethod = navigate
              ? navigate
              : action === Action.Replace
              ? history.replace
              : history.push
            navigateMethod(location)
          })
          .finally(() => {
            pendingRef.current = false
          })
      }
      return false
    }
    return true
  }

  return <Prompt message={handleBlock} when={when} />
}

export default LeaveGuard
