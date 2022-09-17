import {
  DocumentData,
  FirestoreError,
  getDocs,
  getDocsFromCache,
  getDocsFromServer,
  Query,
  QuerySnapshot,
} from '@firebase/firestore'
import {
  CollectionOnceHook,
  GetOptions,
  OnceOptions,
  Options,
} from '@/types/firestore'
import useLoadingValue from './useLoadingValue'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useIsFirestoreQueryEqual } from './useIsFirestoreQueryEqual'

export const useCollectionOnce = <T = DocumentData>(
  query?: Query<T> | null,
  options?: OnceOptions,
): CollectionOnceHook<T> => {
  const { error, loading, reset, setError, setValue, value } = useLoadingValue<
    QuerySnapshot<T>,
    FirestoreError
  >()
  const [effectActive, setEffectActive] = useState(true)
  const ref = useIsFirestoreQueryEqual<Query<T>>(query, reset)

  const loadData = useCallback(
    async (query?: Query<T> | null, options?: Options & OnceOptions) => {
      if (!query) {
        setValue(undefined)
        return
      }
      const get = getDocsFnFromGetOptions(options?.getOptions)

      try {
        const result = await get(query)
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
    loadData(ref.current, options)

    return () => {
      setEffectActive(false)
    }
  }, [loadData, options, ref])

  return useMemo(
    () => [value, loading, error, () => loadData(ref.current, options)],
    [value, loading, error, loadData, ref, options],
  )
}

const getDocsFnFromGetOptions = (
  { source }: GetOptions = { source: 'default' },
) => {
  switch (source) {
    default:
    case 'default':
      return getDocs
    case 'cache':
      return getDocsFromCache
    case 'server':
      return getDocsFromServer
  }
}
