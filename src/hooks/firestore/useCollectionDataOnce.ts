import {
  DocumentData,
  Query,
  QuerySnapshot,
  SnapshotOptions,
} from '@firebase/firestore'
import { CollectionDataOnceHook, OnceDataOptions } from '@/types/firestore'
import { useMemo } from 'react'
import { useCollectionOnce } from '@/hooks/firestore/useCollectionOnce'

export const useCollectionDataOnce = <T = DocumentData>(
  query?: Query<T> | null,
  options?: OnceDataOptions,
): CollectionDataOnceHook<T> => {
  const snapshotOptions = options?.snapshotOptions
  const [snapshots, loading, error, loadData] = useCollectionOnce<T>(
    query,
    options,
  )
  const values = useValuesFromSnapshots<T>(snapshots, snapshotOptions)
  const resArray: CollectionDataOnceHook<T> = [
    values,
    loading,
    error,
    snapshots,
    loadData,
  ]
  return useMemo(() => resArray, resArray)
}

const useValuesFromSnapshots = <T>(
  snapshots?: QuerySnapshot<T>,
  options?: SnapshotOptions,
) => {
  return useMemo(
    () => snapshots?.docs.map((doc) => doc.data(options)) as T[],
    [snapshots, options],
  )
}
