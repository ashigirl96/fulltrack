import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'

type Props = Pick<
  ReturnTypeOfUseYouTubePlayerComponent,
  'YouTubePlayer' | 'handleReady'
>
export function PlayerPreview({ YouTubePlayer, handleReady }: Props) {
  return (
    <div className="blur-sm border border-transparent bg-inherit bg-clip-border">
      <YouTubePlayer handleReady={handleReady} />
    </div>
  )
}
