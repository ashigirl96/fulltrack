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
import { useEffect, useMemo } from 'react'
import { useIsFirestoreQueryEqual } from './useIsFirestoreQueryEqual'

export const useCollectionOnce = <T = DocumentData>(
  query?: Query<T> | null,
  options?: OnceOptions,
): CollectionOnceHook<T> => {
  const { error, loading, reset, setError, setValue, value } = useLoadingValue<
    QuerySnapshot<T>,
    FirestoreError
  >()
  let effectActive = true
  const ref = useIsFirestoreQueryEqual<Query<T>>(query, reset)

  const loadData = async (
    query?: Query<T> | null,
    options?: Options & OnceOptions,
  ) => {
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
  }

  useEffect(() => {
    loadData(ref.current, options)

    return () => {
      effectActive = false
    }
  }, [ref.current])

  const resArray: CollectionOnceHook<T> = [
    value as QuerySnapshot<T>,
    loading,
    error,
    () => loadData(ref.current, options),
  ]
  return useMemo(() => resArray, resArray)
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
