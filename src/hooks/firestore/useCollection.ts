import {
  DocumentData,
  FirestoreError,
  onSnapshot,
  Query,
  QuerySnapshot,
} from '@firebase/firestore'
import { CollectionHook, Options } from '@/types/firestore'
import useLoadingValue from './useLoadingValue'
import { useEffect, useMemo } from 'react'
import { useIsFirestoreQueryEqual } from './useIsFirestoreQueryEqual'

export const useCollection = <T = DocumentData>(
  query?: Query<T> | null,
  options?: Options,
): CollectionHook<T> => {
  const { error, loading, reset, setError, setValue, value } = useLoadingValue<
    QuerySnapshot<T>,
    FirestoreError
  >()
  const ref = useIsFirestoreQueryEqual<Query<T>>(query, reset)

  useEffect(() => {
    if (!ref.current) {
      setValue(undefined)
      return
    }
    const unsubscribe = options?.snapshotListenOptions
      ? onSnapshot(
          ref.current,
          options.snapshotListenOptions,
          setValue,
          setError,
        )
      : onSnapshot(ref.current, setValue, setError)

    return () => {
      unsubscribe()
    }
  }, [options?.snapshotListenOptions, ref, setError, setValue])

  return useMemo(
    () => [value, loading, error],
    [value, loading, error],
  ) as CollectionHook<T>
}
