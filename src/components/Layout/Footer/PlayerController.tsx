import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid'
import {
  BackwardStepIcon,
  ForwardStepIcon,
  PauseIcon,
  PlayIcon,
  ShuffleIcon,
} from '@/components/icons'
import { DurationController } from './DurationController'

type Props = Pick<
  ReturnTypeOfUseYouTubePlayerComponent,
  'handlePlayerController'
>
export function PlayerController({ handlePlayerController }: Props) {
  const {
    readyEvent,
    isLoop,
    isShuffle,
    isPause,
    handleLoop,
    handlePlayController,
    handleShuffle,
    handlePreviousVideo,
    handleNextVideo,
  } = handlePlayerController

  return (
    <div className="flex flex-col items-center gap-y-3">
      <div className="flex gap-x-4">
        <button onClick={handleShuffle}>
          <ShuffleIcon
            className={`h-4 text-black-300 cursor-pointer ${
              isShuffle && 'text-green-600'
            }`}
          />
        </button>
        <button onClick={handlePreviousVideo}>
          <BackwardStepIcon className="h-6 text-black-300 cursor-pointer" />
        </button>
        <button onClick={handlePlayController} hidden={isPause}>
          <PauseIcon className="h-8 text-black-300 cursor-pointer" />
        </button>
        <button hidden={!isPause} onClick={handlePlayController}>
          <PlayIcon className="h-8 text-black-300 cursor-pointer" />
        </button>
        <button onClick={handleNextVideo}>
          <ForwardStepIcon className="h-6 text-black-300 cursor-pointer" />
        </button>
        <button onClick={handleLoop}>
          <ArrowPathRoundedSquareIcon
            className={`h-6 text-black-300 cursor-pointer ${
              isLoop && 'text-green-600'
            }`}
          />
        </button>
      </div>

      <DurationController readyEvent={readyEvent} />
    </div>
  )
}
