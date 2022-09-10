import { PlaylistStoreId, usePlaylistValue } from '@/atoms/firestore/playlist'
import { VideoFirestoreId } from '@/atoms/firestore/video'
import { YouTubePlayerType } from '@/types'
import {
  useCurrentVideoValue,
  useIsShuffleValue,
  useSetCurrentPlaylistId,
  useSetCurrentVideoIds,
  useSetCurrentVideoIndex,
} from '../states'
import { useCallback, useMemo } from 'react'
import { shuffleWithFirst } from '@/lib/array'

// プレイリストの中から１つの曲を選択したときに呼ばれる
export function useSetCurrentVideo(
  playlistId: PlaylistStoreId,
  videoId: VideoFirestoreId,
  readyEvent: YouTubePlayerType | undefined,
) {
  const {
    currentVideo,
    currentVideoIndex,
    isShuffle,
    isSameVideo,
    setCurrentVideoIds,
    setCurrentVideoIndex,
    setPlaylistId,
    videoIds,
  } = useSetCurrentVideoState(playlistId, videoId)

  return useCallback(async () => {
    // set selected video's playlist id
    setPlaylistId(playlistId)
    // if check shuffle, to shuffle video ids
    if (isShuffle) {
      setCurrentVideoIds(shuffleWithFirst([...videoIds], videoId))
      setCurrentVideoIndex(0)
      return
    }
    // if select the same video, restart
    if (isSameVideo && currentVideo && readyEvent) {
      await readyEvent.seekTo(currentVideo.start, true)
      return
    }
    // set default playlist
    setCurrentVideoIds(videoIds)
    setCurrentVideoIndex(currentVideoIndex)
  }, [
    currentVideo,
    currentVideoIndex,
    isShuffle,
    isSameVideo,
    playlistId,
    readyEvent,
    setCurrentVideoIds,
    setCurrentVideoIndex,
    setPlaylistId,
    videoId,
    videoIds,
  ])
}

function useSetCurrentVideoState(
  playlistId: PlaylistStoreId,
  videoId: VideoFirestoreId,
) {
  const playlist = usePlaylistValue(playlistId)
  const setPlaylistId = useSetCurrentPlaylistId()
  const videoIds = useMemo(() => playlist?.videoIds || [], [playlist?.videoIds])
  const currentVideoIndex = videoIds.indexOf(videoId)
  const setCurrentVideoIds = useSetCurrentVideoIds()
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  const isShuffle = useIsShuffleValue()
  const currentVideo = useCurrentVideoValue()
  const isSameVideo = useMemo(
    () => currentVideo && currentVideo.id === videoId,
    [currentVideo, videoId],
  )

  return {
    currentVideo,
    currentVideoIndex,
    isShuffle: isShuffle,
    isSameVideo,
    setCurrentVideoIds,
    setCurrentVideoIndex,
    setPlaylistId,
    videoIds,
  }
}
