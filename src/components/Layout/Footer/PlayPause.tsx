import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'
import { PlayIcon, PauseIcon, ForwardIcon } from '@heroicons/react/24/solid'
import { useMemo } from 'react'

type Props = {
  handleTogglePlay: ReturnTypeOfUseYouTubePlayerComponent['handleTogglePlay']
}
export function PlayPause({ handleTogglePlay }: Props) {
  const [playerStatus, play, setNextVideo] = handleTogglePlay

  const isPause = useMemo(() => playerStatus === 'PAUSED', [playerStatus])

  return (
    <div className="flex justify-center items-center gap-x-2">
      <ForwardIcon
        className="rotate-180 h-6 w-6 text-black-300 cursor-pointer"
        onClick={play}
      />
      {!isPause && (
        <PauseIcon
          className="h-10 w-10 text-black-300 cursor-pointer"
          onClick={play}
        />
      )}
      {isPause && (
        <PlayIcon
          className="h-10 w-10 text-black-300 cursor-pointer"
          onClick={play}
        />
      )}
      <ForwardIcon
        className="h-6 w-6 text-black-300 cursor-pointer"
        onClick={setNextVideo}
      />
    </div>
  )
}
