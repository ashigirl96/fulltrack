import React from 'react'
import { useVideoRow } from './useVideoRow'
import type { ArgsVideoRow } from './useVideoRow'
import { useSetVideoContext } from '@/atoms/contextMenu'

type Props = ArgsVideoRow
export function VideoRow({
  videoId,
  playlistId,
  index,
  readyEvent,
  indexSelected,
  setIndexSelected,
}: Props) {
  const {
    video,
    isPlayingVideo,
    setIndex,
    isSelected,
    handleDoubleClick,
    duration,
  } = useVideoRow({
    videoId,
    index,
    setIndexSelected,
    indexSelected,
    readyEvent,
    playlistId,
  })
  const setVideoContext = useSetVideoContext(videoId)

  if (!video) {
    return <div>loading..</div>
  }

  return (
    <div
      role="row"
      className={`group hover:bg-accent h-14 grid-playlist ${
        isSelected && 'bg-secondary'
      }`}
      onClick={setIndex}
      onDoubleClick={handleDoubleClick}
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
                {video.artists.join(',')}
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
