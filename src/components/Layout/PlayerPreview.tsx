import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'

type Props = Pick<
  ReturnTypeOfUseYouTubePlayerComponent,
  'YouTubePlayer' | 'handleReadyEvent'
>
export function PlayerPreview({ YouTubePlayer, handleReadyEvent }: Props) {
  return (
    <div className="blur-sm border border-transparent bg-inherit bg-clip-border">
      <YouTubePlayer handleReadyEvent={handleReadyEvent} />
    </div>
  )
}
