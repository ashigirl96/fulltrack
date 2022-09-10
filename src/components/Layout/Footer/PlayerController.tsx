import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid'
import {
  PlayIcon,
  PauseIcon,
  ForwardStepIcon,
  BackwardStepIcon,
  ShuffleIcon,
} from '@/components/icons'

import { useMemo } from 'react'
import { useIsLoopValue, useIsRandomOrderValue } from '@/atoms/youtubePlayer'

type Props = {
  handleTogglePlay: ReturnTypeOfUseYouTubePlayerComponent['handleTogglePlay']
}
export function PlayerController({ handleTogglePlay }: Props) {
  const [
    playerStatus,
    play,
    setNextVideo,
    setPreviousVideo,
    setLoop,
    setRandomOrder,
  ] = handleTogglePlay

  const isPause = useMemo(() => playerStatus === 'PAUSED', [playerStatus])
  const isLoop = useIsLoopValue()
  const isRandomOrder = useIsRandomOrderValue()

  return (
    <div className={`flex justify-center items-center gap-x-5`}>
      <button onClick={setRandomOrder}>
        <ShuffleIcon
          className={`h-4 text-black-300 cursor-pointer ${
            isRandomOrder && 'text-green-800'
          }`}
        />
      </button>
      <button onClick={setPreviousVideo}>
        <BackwardStepIcon className="h-6 text-black-300 cursor-pointer" />
      </button>
      <button onClick={play} hidden={isPause}>
        <PauseIcon className="h-10 text-black-300 cursor-pointer" />
      </button>
      <button hidden={!isPause} onClick={play}>
        <PlayIcon className="h-10 text-black-300 cursor-pointer" />
      </button>
      <button onClick={setNextVideo}>
        <ForwardStepIcon className="h-6 text-black-300 cursor-pointer" />
      </button>
      <button onClick={setLoop}>
        <ArrowPathRoundedSquareIcon
          className={`h-6 text-black-300 cursor-pointer ${
            isLoop && 'text-green-600'
          }`}
        />
      </button>
    </div>
  )
}
