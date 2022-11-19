import { UserResponse } from '@supabase/supabase-js'
import { atom, useRecoilState } from 'recoil'

const userState = atom<UserResponse | null>({
  key: 'supabase/userState',
  default: null,
})
export function useUserState() {
  const [user, setUser] = useRecoilState(userState)
  return {
    user,
    setUser,
  }
}
