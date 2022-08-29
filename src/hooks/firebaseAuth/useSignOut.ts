import { useGetAuth, useGetCurrentUser } from './useGetCurrentUser'
import { useCallback } from 'react'

export function useSignOut() {
  const auth = useGetAuth()
  return useCallback(() => auth.signOut(), [auth])
}
