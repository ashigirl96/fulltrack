import { VideoFirestore, YouTubePlayerType } from '@/types'
import { TrackHeader } from './TrackHeader'
import { TrackBody } from './TrackBody'
import { useIndexSelected } from './useIndexSelected'
import { TrackRow } from '@/components/shared/TrackTable/TrackRow'
import { useMemo } from 'react'
export { TrackTitle } from './TrackTitle'

type Props = {
  readyEvent: YouTubePlayerType | undefined
  videos: VideoFirestore[]
  setCurrentTrack: () => void
}
export function TrackTable({ readyEvent, videos, setCurrentTrack }: Props) {
  const { indexSelected, setIndexSelected } = useIndexSelected()
  const videoIds = useMemo(() => videos.map((video) => video.id), [videos])

  return (
    <div className="relative" tabIndex={0}>
      <TrackHeader />
      <TrackBody>
        <>
          {videos.map((video, index) => (
            <TrackRow
              readyEvent={readyEvent}
              videoIds={videoIds}
              key={`video-id-${video.id}-${index}`}
              video={video}
              indexSelected={indexSelected}
              setIndexSelected={setIndexSelected}
              setCurrentTrack={setCurrentTrack}
              index={index}
            />
          ))}
        </>
      </TrackBody>
    </div>
  )
}
