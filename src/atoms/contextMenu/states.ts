import { atom, useRecoilValue, useSetRecoilState } from 'recoil'
import { PlaylistFirestoreId } from '@/types'
import { VideoFirestoreId } from '@/atoms/firestore/video'
import React, { useCallback, useMemo } from 'react'
import { AlbumFireStoreId } from '@/atoms/firestore/album'

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
      videoIndex: number
    }
  | {
      type: 'album'
      albumId: AlbumFireStoreId
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

export function useInitializeContext() {
  const setter = useSetSelectedContext()
  return useCallback(() => setter({ type: null }), [setter])
}

export function useSetVideoContext(
  videoId: VideoFirestoreId,
  videoIndex: number,
) {
  const setter = useSetSelectedContext()
  return useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setter({ type: 'video', videoId, videoIndex })
    },
    [setter, videoId, videoIndex],
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

export function useSetAlbumContext(albumId: AlbumFireStoreId) {
  const setter = useSetSelectedContext()
  return useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setter({ type: 'album', albumId })
    },
    [albumId, setter],
  )
}

const isEditPlaylistNameState = atom<PlaylistFirestoreId | null>({
  key: 'contextMenu/isEditPlaylistNameState',
  default: null,
})

export function useSetIsEditPlaylistName(
  playlistId: PlaylistFirestoreId | null,
) {
  const setter = useSetRecoilState(isEditPlaylistNameState)
  return useCallback(() => {
    setter(playlistId)
  }, [playlistId, setter])
}

export function useIsEditPlaylistNameValue(playlistId: PlaylistFirestoreId) {
  const currentEditPlaylistId = useRecoilValue(isEditPlaylistNameState)
  return useMemo(
    () => currentEditPlaylistId === playlistId,
    [currentEditPlaylistId, playlistId],
  )
}
