import { DependencyList, useCallback, useRef, useState } from 'react'
import useMountedState from './useMountedState'
import { FunctionReturningPromise, PromiseType } from './misc/types'

export type AsyncState<T> =
  | {
      isLoading: boolean
      error?: undefined
      value?: undefined
    }
  | {
      isLoading: true
      error?: Error | undefined
      value?: T
    }
  | {
      isLoading: false
      error: Error
      value?: undefined
    }
  | {
      isLoading: false
      error?: undefined
      value: T
    }

type StateFromFunctionReturningPromise<T extends FunctionReturningPromise> =
  AsyncState<PromiseType<ReturnType<T>>>

export type AsyncFnReturn<
  T extends FunctionReturningPromise = FunctionReturningPromise,
> = [StateFromFunctionReturningPromise<T>, T]

export default function useAsyncFn<T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = [],
  initialState: StateFromFunctionReturningPromise<T> = { isLoading: false },
): AsyncFnReturn<T> {
  const lastCallId = useRef(0)
  const isMounted = useMountedState()
  const [state, set] =
    useState<StateFromFunctionReturningPromise<T>>(initialState)

  const callback = useCallback((...args: Parameters<T>): ReturnType<T> => {
    const callId = ++lastCallId.current

    if (!state.isLoading) {
      set((prevState) => ({ ...prevState, isLoading: true }))
    }

    return fn(...args).then(
      (value) => {
        isMounted() &&
          callId === lastCallId.current &&
          set({ value, isLoading: false })

        return value
      },
      (error) => {
        isMounted() &&
          callId === lastCallId.current &&
          set({ error, isLoading: false })

        return error
      },
    ) as ReturnType<T>
  }, deps)

  return [state, callback as unknown as T]
}
