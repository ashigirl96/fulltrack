import { useCurrentDurationPercent } from '@/atoms/youtubePlayer/hooks'
import { YouTubePlayerType } from '@/types'

type Props = {
  readyEvent: YouTubePlayerType | undefined
}
export function DurationController({ readyEvent }: Props) {
  const { durationPercent, setHandleInputPercent, elapsedMS, endHS } =
    useCurrentDurationPercent(readyEvent)
  return (
    <div className="flex justify-center items-center gap-x-2.5">
      <div>{elapsedMS}</div>
      <input
        id="steps-range"
        type="range"
        min="0"
        max="100"
        step={0.01}
        className="w-[34vw] h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        value={durationPercent}
        onInput={setHandleInputPercent}
      />
      <div>{endHS}</div>
    </div>
  )
}
