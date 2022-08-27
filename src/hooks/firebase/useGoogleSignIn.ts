import { useOAuthSignIn } from './useOAuthSignIn'
import { useCallback } from 'react'
import { GoogleAuthProvider } from '@firebase/auth'

export function useGoogleSignIn() {
  const signIn = useOAuthSignIn()
  return useCallback(() => signIn(new GoogleAuthProvider()), [signIn])
}
