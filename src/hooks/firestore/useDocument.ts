import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  FirestoreError,
  onSnapshot,
} from '@firebase/firestore'
import { DocumentHook, Options } from '@/types/firestore'
import useLoadingValue from './useLoadingValue'
import { useEffect, useMemo } from 'react'
import { useIsFirestoreRefEqual } from './useIsFirestoreQueryEqual'

export const useDocument = <T = DocumentData>(
  docRef?: DocumentReference<T> | null,
  options?: Options,
): DocumentHook<T> => {
  const { error, loading, reset, setError, setValue, value } = useLoadingValue<
    DocumentSnapshot<T>,
    FirestoreError
  >()
  const ref = useIsFirestoreRefEqual<DocumentReference<T>>(docRef, reset)

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

  return useMemo(() => [value, loading, error], [value, loading, error])
}
