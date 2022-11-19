import { useEffect } from 'react'
import { getGoogleUser } from '@/lib/supabase'
import { useUserState } from '@/store/supabase/user'

export function Auth() {
  const { setUser } = useUserState()
  useEffect(() => {
    ;(async () => {
      setUser(await getGoogleUser())
    })()
  }, [setUser])

  return null
}
