import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { PlaylistFirestoreId } from '@/types'
import { VideoFirestoreId } from '@/atoms/firestore/video'
import React, { useCallback } from 'react'

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

export function useInitialContext() {
  const setter = useSetSelectedContext()
  return useCallback(() => setter({ type: null }), [setter])
}

export function useSetVideoContext(videoId: VideoFirestoreId) {
  const setter = useSetSelectedContext()
  return useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setter({ type: 'video', videoId })
    },
    [setter, videoId],
  )
}

export function useSetPlaylistContext(playlistId: PlaylistFirestoreId) {
  const setter = useSetSelectedContext()
  return useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setter({ type: 'playlist', playlistId })
    },
    [playlistId, setter],
  )
}
