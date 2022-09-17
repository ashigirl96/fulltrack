import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  FirestoreError,
  getDoc,
  getDocFromCache,
  getDocFromServer,
} from '@firebase/firestore'
import { DocumentOnceHook, GetOptions, OnceOptions } from '@/types/firestore'
import useLoadingValue from './useLoadingValue'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useIsFirestoreRefEqual } from './useIsFirestoreQueryEqual'

export const useDocumentOnce = <T = DocumentData>(
  docRef?: DocumentReference<T> | null,
  options?: OnceOptions,
): DocumentOnceHook<T> => {
  const { error, loading, reset, setError, setValue, value } = useLoadingValue<
    DocumentSnapshot<T>,
    FirestoreError
  >()
  const [effectActive, setEffectActive] = useState(true)
  const ref = useIsFirestoreRefEqual<DocumentReference<T>>(docRef, reset)

  const loadData = useCallback(
    async (reference?: DocumentReference<T> | null, options?: OnceOptions) => {
      if (!reference) {
        setValue(undefined)
        return
      }
      const get = getDocFnFromGetOptions(options?.getOptions)

      try {
        const result = await get(reference)
        if (effectActive) {
          setValue(result)
        }
      } catch (error) {
        if (effectActive) {
          setError(error as FirestoreError)
        }
      }
    },
    [effectActive, setError, setValue],
  )

  useEffect(() => {
    if (!ref.current) {
      setValue(undefined)
      return
    }

    loadData(ref.current, options)

    return () => {
      setEffectActive(false)
    }
  }, [loadData, options, ref, setValue])

  return useMemo(
    () => [value, loading, error, () => loadData(ref.current, options)],
    [error, loadData, loading, options, ref, value],
  )
}

const getDocFnFromGetOptions = (
  { source }: GetOptions = { source: 'default' },
) => {
  switch (source) {
    default:
    case 'default':
      return getDoc
    case 'cache':
      return getDocFromCache
    case 'server':
      return getDocFromServer
  }
}
