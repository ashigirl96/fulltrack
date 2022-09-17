import { DocumentData, DocumentReference } from '@firebase/firestore'
import { DataOptions, DocumentDataHook } from '@/types/firestore'
import { useMemo } from 'react'
import { useDocument } from './useDocument'

export const useDocumentData = <T = DocumentData>(
  docRef?: DocumentReference<T> | null,
  options?: DataOptions,
): DocumentDataHook<T> => {
  const snapshotOptions = options?.snapshotOptions
  const [snapshot, loading, error] = useDocument<T>(docRef, options)
  const value = useMemo(
    () => snapshot?.data(snapshotOptions) as T,
    [snapshot, snapshotOptions],
  )

  return useMemo(
    () => [value, loading, error, snapshot],
    [value, loading, error, snapshot],
  )
}
