import {
  DocumentData,
  Query,
  QuerySnapshot,
  SnapshotOptions,
} from '@firebase/firestore'
import { CollectionDataHook, DataOptions } from '@/types/firestore'
import { useMemo } from 'react'
import { useCollection } from './useCollection'

export const useCollectionData = <T = DocumentData>(
  query?: Query<T> | null,
  options?: DataOptions,
): CollectionDataHook<T> => {
  const snapshotOptions = options?.snapshotOptions
  const [snapshots, loading, error] = useCollection<T>(query, options)
  const values = useValuesFromSnapshots<T>(snapshots, snapshotOptions)
  return useMemo(
    () => [values, loading, error, snapshots],
    [values, loading, error, snapshots],
  )
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
