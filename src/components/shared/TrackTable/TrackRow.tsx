import { VideoFirestore } from '@/types'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import type { ReturnTypeUseIndexSelected } from './useIndexSelected'
import { useCallback, useMemo } from 'react'
import { secsToMS } from '@/lib/time'
import { useIsPlayingVideo } from '@/atoms/youtubePlayer'
import { Artists } from '@/components/shared/Artists'
import { useSetVideoContext } from '@/atoms/contextMenu'

function useVideoDuration(video: VideoFirestore | null) {
  if (!video) {
    return '00:00'
  }
  return secsToMS(video.end - video.start)
}

type Props = {
  index: number
  video: VideoFirestore
  readyEvent: ReturnTypeSetReadyEvent['readyEvent']
} & ReturnTypeUseIndexSelected
export function TrackRow({
  index,
  video,
  readyEvent,
  indexSelected,
  setIndexSelected,
}: Props) {
  const duration = useVideoDuration(video)
  const isPlayingVideo = useIsPlayingVideo(video.id)
  const setIndex = useCallback(() => {
    setIndexSelected(index)
  }, [index, setIndexSelected])
  const isSelected = useMemo(
    () => indexSelected === index,
    [index, indexSelected],
  )
  const setVideoContext = useSetVideoContext(video.id, index)

  return (
    <div
      role="row"
      className={`group hover:bg-accent h-14 grid-playlist ${
        isSelected && 'bg-secondary'
      }`}
      onClick={setIndex}
      // TODO: impl here
      // onDoubleClick={handleDoubleClick}
      onContextMenu={setVideoContext}
    >
      <div className="flex justify-self-end items-center">{index + 1}</div>
      <div className="flex justify-self-start items-center">
        <div className="ellipsis-one-line">
          <div className="flex gap-2">
            <img src={video.thumbnailUrl} className="object-cover h-12 w-12" />
            <div className="flex flex-col gap-1">
              <div className="group-hover:text-white cursor-default">
                <span
                  className={`ellipsis-one-line ${
                    isPlayingVideo && 'text-green-600'
                  }`}
                >
                  {video.title}
                </span>
              </div>
              <div className="group-hover:text-white text-xs ellipsis-one-line">
                <Artists artistIds={video.artists} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md-hidden">
        <div className="flex justify-self-start items-center">
          <a
            href={`https://youtube.com/watch?v=${video.videoId}`}
            className="ellipsis-one-line"
          >
            {video.originalTitle}
          </a>
        </div>
      </div>
      <div className="flex justify-self-end items-center">{duration}</div>
    </div>
  )
}
