// プレイリストの中から１つの曲を選択したときに呼ばれる
import { VideoFirestoreId } from '@/atoms/firestore/video'
import { YouTubePlayerType } from '@/types'
import {
  useCurrentVideoValue,
  useIsShuffleValue,
  useSetCurrentVideoIds,
  useSetCurrentVideoIndex,
} from '@/atoms/youtubePlayer'
import { useCallback, useMemo } from 'react'
import { shuffleWithFirst } from '@/lib/array'
import { useSetCurrentTrackVideoIds } from '@/atoms/youtubePlayer/states'

export function useSetCurrentVideo(
  videoId: VideoFirestoreId,
  videoIds: VideoFirestoreId[],
  readyEvent: YouTubePlayerType | undefined,
  setCurrentTrack: () => void,
) {
  const currentVideo = useCurrentVideoValue()
  const currentVideoIndex = videoIds.indexOf(videoId)
  const setCurrentVideoIndex = useSetCurrentVideoIndex()
  const setCurrentVideoIds = useSetCurrentVideoIds()
  const setCurrentTrackVideoIds = useSetCurrentTrackVideoIds()
  const isSameVideo = useMemo(
    () => currentVideo && currentVideo.id === videoId,
    [currentVideo, videoId],
  )
  const isShuffle = useIsShuffleValue()

  return useCallback(async () => {
    setCurrentTrackVideoIds(videoIds)

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
    setCurrentTrack()
  }, [
    currentVideo,
    currentVideoIndex,
    isSameVideo,
    isShuffle,
    readyEvent,
    setCurrentTrack,
    setCurrentTrackVideoIds,
    setCurrentVideoIds,
    setCurrentVideoIndex,
    videoId,
    videoIds,
  ])
}

export type ReturnTypeSetCurrentVideo = ReturnType<typeof useSetCurrentVideo>
