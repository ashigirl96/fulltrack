import { DependencyList, useEffect } from 'react'
import useAsyncFn from './useAsyncFn'
import { FunctionReturningPromise } from './misc/types'

export type { AsyncState, AsyncFnReturn } from './useAsyncFn'

export function useAsync<T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = [],
) {
  const [state, callback] = useAsyncFn(fn, deps, {
    isLoading: true,
  })

  useEffect(() => {
    callback()
  }, [callback])

  return state
}
