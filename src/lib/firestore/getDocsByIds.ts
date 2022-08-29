import {
  CollectionReference,
  documentId,
  getDocs,
  query,
  where,
} from '@firebase/firestore'

function seekArray<T>(array: T[], seekPoint: number) {
  const queryIds: T[][] = []
  let tmpIds: T[] = []
  array.forEach((id, i) => {
    tmpIds.push(id)
    if (tmpIds.length >= seekPoint || i === array.length - 1) {
      queryIds.push(tmpIds)
      tmpIds = []
    }
  })
  return queryIds
}

export async function getDocsByIds<T>(
  collectionRef: CollectionReference<T>,
  ids: string[],
) {
  const queryIdsArray = seekArray(ids, 10)
  let results: T[] = []
  for (const queryIds of queryIdsArray) {
    const q = query(collectionRef, where(documentId(), 'in', queryIds))
    const data = (await getDocs(q)).docs.map((doc) => doc.data())
    results = results.concat(data)
  }
  return results
}
