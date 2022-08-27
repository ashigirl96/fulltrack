import { useGetAuth } from './useGetAuth'
import { useCallback } from 'react'

export function useSignOut() {
  const auth = useGetAuth()
  return useCallback(() => auth.signOut(), [auth])
}
