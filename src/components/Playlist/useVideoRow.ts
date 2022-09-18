import { useVideoValue, VideoFirestoreId } from '@/atoms/firestore/video'
import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { useSetCurrentVideo } from '@/atoms/youtubePlayer/hooks'
import { ReturnTypeReadyEventStateType } from '@/hooks/youtube_player'
import { useCallback, useMemo } from 'react'
import { useIsPlayingVideo } from '@/atoms/youtubePlayer'
import type { ReturnTypeUsePlaylist } from '../Playlist/usePlaylist'
import { VideoFirestore } from '@/types'
import { secsToMS } from '@/lib/time'

function useVideoDuration(video: VideoFirestore | null) {
  if (!video) {
    return '00:00'
  }
  return secsToMS(video.end - video.start)
}

export type ArgsVideoRow = {
  index: number
  videoId: VideoFirestoreId
  playlistId: PlaylistStoreId
  readyEvent: ReturnTypeReadyEventStateType['readyEvent']
} & Pick<ReturnTypeUsePlaylist, 'setIndexSelected' | 'indexSelected'>
export function useVideoRow({
  videoId,
  index,
  setIndexSelected,
  indexSelected,
  readyEvent,
  playlistId,
}: ArgsVideoRow) {
  const video = useVideoValue(videoId)
  const setCurrentVideo = useSetCurrentVideo(playlistId, videoId, readyEvent)
  const duration = useVideoDuration(video)
  const isPlayingVideo = useIsPlayingVideo(videoId)
  const setIndex = useCallback(() => {
    setIndexSelected(index)
  }, [index, setIndexSelected])
  const isSelected = useMemo(
    () => indexSelected === index,
    [index, indexSelected],
  )
  const handleDoubleClick = useCallback(async () => {
    if (isSelected) {
      await setCurrentVideo()
      return
    }
    setIndexSelected(index)
  }, [index, isSelected, setCurrentVideo, setIndexSelected])

  return {
    video,
    duration,
    isSelected,
    setIndex,
    handleDoubleClick,
    isPlayingVideo,
  }
}

export type ReturnTypeUseVideoRow = ReturnType<typeof useVideoRow>
