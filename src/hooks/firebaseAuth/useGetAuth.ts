import { getAuth } from '@firebase/auth'
import { firebaseApp } from '@/config/firebase'

export function useGetAuth() {
  return getAuth(firebaseApp)
}
