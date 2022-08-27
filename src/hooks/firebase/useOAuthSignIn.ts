import { AuthProvider, signInWithPopup } from '@firebase/auth'
import { firebaseAuth } from '@/config/firebase'
import { useCallback } from 'react'

export function useOAuthSignIn() {
  return useCallback((provider: AuthProvider) => {
    return signInWithPopup(firebaseAuth, provider)
      .then((result) => result)
      .catch((err) => console.error(err))
  }, [])
}
