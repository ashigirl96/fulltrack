import { getAuth, User } from '@firebase/auth'
import { firebaseApp } from '@/config/firebase'
import { useEffect, useMemo, useState } from 'react'

export function useGetAuth() {
  return useMemo(() => getAuth(firebaseApp), [])
}

export function useGetCurrentUser() {
  const [user, setUser] = useState<User | null>(null)
  const auth = useGetAuth()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      }
    })
    return unsubscribe()
  }, [auth])
  return user
}

export function useGetCurrentUserId() {
  const user = useGetCurrentUser()
  return useMemo(() => (user ? user.uid : null), [user])
}
