import { useState } from "react"

export const useAsyncState = (initialState) => {
  const [state, setState] = useState(initialState)

  const getState = async () => {
    let state

    await new Promise((resolve) => {
      resolve(
        setState((currentState) => {
          state = currentState
          return currentState
        })
      )
    })

    return  state
  }

  return [ state, setState, getState ]
}