import { VideoFirestore, YouTubePlayerType } from '@/types'
import { useIsPlayingVideo } from '@/atoms/youtubePlayer'
import { Artists } from '@/components/shared/Artists'
import { useSetVideoContext } from '@/atoms/contextMenu'
import { useVideoDuration } from './useVideoDuration'
import { ReturnTypeUseIndexSelected } from '../useIndexSelected'
import { useSetIndex } from './useSetIndex'
import { useIsSelected } from './useIsSelected'
import { useSetCurrentVideo } from '../useSetCurrentVideo'
import { VideoFirestoreId } from '@/atoms/firestore/video'

type Props = {
  index: number
  video: VideoFirestore
  videoIds: VideoFirestoreId[]
  readyEvent: YouTubePlayerType | undefined
  setCurrentTrack: () => void
} & ReturnTypeUseIndexSelected
export function TrackRow({
  index,
  video,
  indexSelected,
  setIndexSelected,
  videoIds,
  readyEvent,
  setCurrentTrack,
}: Props) {
  const duration = useVideoDuration(video)
  const isPlayingVideo = useIsPlayingVideo(video.id)
  const setIndex = useSetIndex(index, setIndexSelected)
  const isSelected = useIsSelected(index, indexSelected)
  const setVideoContext = useSetVideoContext(video.id, index, video.title)
  // TODO: 親にもたせれないか考える
  const handleDoubleClick = useSetCurrentVideo(
    video.id,
    videoIds,
    readyEvent,
    setCurrentTrack,
  )

  //TODO: でかくなりすぎだからリファクタする
  return (
    <div
      role="row"
      className={`group hover:bg-accent h-14 grid-playlist ${
        isSelected && 'bg-secondary'
      } cursor-default`}
      onClick={setIndex}
      onDoubleClick={handleDoubleClick}
      onContextMenu={setVideoContext}
    >
      <div className="flex justify-self-end items-center">{index + 1}</div>
      <div className="flex justify-self-start items-center">
        <div className="ellipsis-one-line">
          <div className="flex gap-2">
            <img
              src={video.thumbnailUrl}
              className="object-cover h-12 w-12"
              alt="thumbnail"
            />
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
            href={`https://youtube.com/watch?v=${video.videoId}?t=${video.start}`}
            className="ellipsis-one-line hover:underline"
          >
            {video.originalTitle}
          </a>
        </div>
      </div>
      <div className="flex justify-self-end items-center cursor-default">
        {duration}
      </div>
    </div>
  )
}
