import { atomFamily, useRecoilValue, useSetRecoilState } from 'recoil'
import type { UserId, UserFirestore } from '@/types'

export type UserFirestoreId = string

export const userState = atomFamily<UserFirestore | null, UserFirestoreId>({
  key: 'userState',
  default: null,
})

export function useUserValue(userId: UserId) {
  return useRecoilValue(userState(userId))
}

export function useSetUser(userId: UserId) {
  return useSetRecoilState(userState(userId))
}
