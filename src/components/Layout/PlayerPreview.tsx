import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'

type Props = ReturnTypeOfUseYouTubePlayerComponent
export function PlayerPreview({
  YouTubePlayer,
  handleReady,
  readyEvent,
}: Props) {
  return (
    <div className="backdrop-blur-xl bg-green-400 ">
      <YouTubePlayer handleReady={handleReady} readyEvent={readyEvent} />
    </div>
  )
}
