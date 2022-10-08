import { VideoFirestore, YouTubePlayerType } from '@/types'
import { TrackHeader } from './TrackHeader'
import { TrackTitle } from './TrackTitle'
import { TrackBody } from './TrackBody'
import { useIndexSelected } from './useIndexSelected'
import { TrackRow } from '@/components/shared/TrackTable/TrackRow'
import { useMemo } from 'react'

type Props = {
  readyEvent: YouTubePlayerType | undefined
  videos: VideoFirestore[]
}
export function TrackTable({ readyEvent, videos }: Props) {
  const { indexSelected, setIndexSelected } = useIndexSelected()
  const videoIds = useMemo(() => videos.map((video) => video.id), [videos])

  return (
    <div className="max-w-full px-4 relative" tabIndex={0}>
      <TrackTitle />
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
              index={index}
            />
          ))}
        </>
      </TrackBody>
    </div>
  )
}
