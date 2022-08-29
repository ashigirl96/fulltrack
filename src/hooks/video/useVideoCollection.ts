import { videoConverter } from './converter'
import { db } from '@/config/firebase'
import { collection } from '@firebase/firestore'

export function useVideoCollection() {
  return collection(db, 'videos').withConverter(videoConverter)
}
