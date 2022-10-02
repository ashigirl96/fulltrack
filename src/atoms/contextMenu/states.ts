import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { PlaylistFirestoreId } from '@/types'
import { VideoFirestoreId } from '@/atoms/firestore/video'

type ContextType =
  | {
      type: null
    }
  | {
      type: 'playlist'
      playlistId: PlaylistFirestoreId
    }
  | {
      type: 'video'
      videoId: VideoFirestoreId
    }

const selectedContext = atom<ContextType>({
  key: 'contextMenu/selectedContext',
  default: { type: null },
})

export function useSetSelectedContext() {
  return useSetRecoilState(selectedContext)
}

export function useSelectedContext() {
  return useRecoilValue(selectedContext)
}
