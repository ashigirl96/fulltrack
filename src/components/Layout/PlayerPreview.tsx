import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'

type Props = {
  YouTubePlayer: ReturnTypeOfUseYouTubePlayerComponent['YouTubePlayer']
  handleReady: ReturnTypeOfUseYouTubePlayerComponent['handleReady']
}
export function PlayerPreview({ YouTubePlayer, handleReady }: Props) {
  return (
    <div className="backdrop-blur-xl bg-green-400 ">
      <YouTubePlayer handleReady={handleReady} />
    </div>
  )
}
