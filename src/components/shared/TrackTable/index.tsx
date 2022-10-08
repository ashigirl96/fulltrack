import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import { VideoFirestore } from '@/types'
import { TrackHeader } from './TrackHeader'
import { TrackTitle } from './TrackTitle'
import { TrackBody } from './TrackBody'
import { useIndexSelected } from './useIndexSelected'
import { TrackRow } from '@/components/shared/TrackTable/TrackRow'

type Props = {
  readyEvent: ReturnTypeSetReadyEvent['readyEvent']
  videos: VideoFirestore[]
}
export function TrackTable({ readyEvent, videos }: Props) {
  const { indexSelected, setIndexSelected } = useIndexSelected()

  return (
    <div className="max-w-full px-4 relative" tabIndex={0}>
      <TrackTitle />
      <TrackHeader />
      <TrackBody>
        <>
          {videos.map((video, index) => (
            <TrackRow
              key={`video-id-${video.videoId}-${index}`}
              video={video}
              readyEvent={readyEvent}
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
