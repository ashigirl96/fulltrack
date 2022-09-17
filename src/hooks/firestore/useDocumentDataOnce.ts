import { DocumentData, DocumentReference } from '@firebase/firestore'
import { DocumentDataOnceHook, OnceDataOptions } from '@/types/firestore'
import { useMemo } from 'react'
import { useDocumentOnce } from '@/hooks/firestore/useDocumentOnce'

export const useDocumentDataOnce = <T = DocumentData>(
  docRef?: DocumentReference<T> | null,
  options?: OnceDataOptions,
): DocumentDataOnceHook<T> => {
  const snapshotOptions = options?.snapshotOptions
  const [snapshot, loading, error, loadData] = useDocumentOnce<T>(
    docRef,
    options,
  )
  const value = useMemo(
    () => snapshot?.data(snapshotOptions) as T,
    [snapshot, snapshotOptions],
  )

  return useMemo(
    () => [value, loading, error, snapshot, loadData],
    [value, loading, error, snapshot, loadData],
  )
}
