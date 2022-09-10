import { useCurrentDuration } from '@/atoms/youtubePlayer'
import { YouTubePlayerType } from '@/types'

type Props = {
  readyEvent: YouTubePlayerType | undefined
}
export function DurationController({ readyEvent }: Props) {
  const [duration, setDuration] = useCurrentDuration(readyEvent)
  return (
    <input
      id="steps-range"
      type="range"
      min="0"
      max="100"
      defaultValue={duration}
      step="0.1"
      className="w-[34vw] h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      onChangeCapture={setDuration}
    />
  )
}
