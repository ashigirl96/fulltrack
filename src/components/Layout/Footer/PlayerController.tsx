import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'
import {
  BackwardStepIcon,
  ForwardStepIcon,
  PauseIcon,
  PlayIcon,
  ShuffleIcon,
  RepeatIcon,
} from '@/components/icons'
import { DurationController } from './DurationController'

type Props = Pick<
  ReturnTypeOfUseYouTubePlayerComponent,
  'handlePlayerController'
>
export function PlayerController({ handlePlayerController }: Props) {
  const {
    readyEvent,
    isShuffle,
    isPause,
    handlePlayController,
    handleShuffle,
    handlePreviousVideo,
    handleNextVideo,
    repeatStatus,
    handleRepeat,
  } = handlePlayerController

  return (
    <div className="flex flex-col items-center gap-y-3 w-[40%] max-w-[722px]">
      <div className="flex gap-x-4">
        <button onClick={handleShuffle}>
          <ShuffleIcon isShuffle={isShuffle} />
        </button>
        <button onClick={handlePreviousVideo}>
          <BackwardStepIcon className="h-6 cursor-pointer" />
        </button>
        <button onClick={handlePlayController} hidden={isPause}>
          <PauseIcon className="h-8 cursor-pointer" />
        </button>
        <button hidden={!isPause} onClick={handlePlayController}>
          <PlayIcon className="h-8 cursor-pointer" />
        </button>
        <button onClick={handleNextVideo}>
          <ForwardStepIcon className="h-6 cursor-pointer" />
        </button>
        <button onClick={handleRepeat}>
          <RepeatIcon status={repeatStatus} />
        </button>
      </div>

      <DurationController readyEvent={readyEvent} />
    </div>
  )
}
