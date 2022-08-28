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

  const resArray: DocumentDataOnceHook<T> = [
    value,
    loading,
    error,
    snapshot,
    loadData,
  ]
  return useMemo(() => resArray, resArray)
}
