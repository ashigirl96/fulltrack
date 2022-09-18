import {
  TbArrowsShuffle,
  TbRepeat,
  TbRepeatOnce,
  TbPlayerSkipForward,
  TbPlayerSkipBack,
} from 'react-icons/tb'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import { RepeatStatusState } from '@/atoms/youtubePlayer/states'

function classNames(className: string) {
  return `h-6 text-black-300 cursor-pointer ${className}`
}

type Props = {
  className: string
}
export function PlayIcon({ className }: Props) {
  return <FaPlayCircle className={className} />
}

export function PauseIcon({ className }: Props) {
  return <FaPauseCircle className={className} />
}

export function ForwardStepIcon({ className }: Props) {
  return <TbPlayerSkipForward className={className} />
}

export function BackwardStepIcon({ className }: Props) {
  return <TbPlayerSkipBack className={className} />
}

type ShuffleProps = {
  isShuffle: boolean
}
export function ShuffleIcon({ isShuffle }: ShuffleProps) {
  if (isShuffle) {
    return <TbArrowsShuffle className={classNames('text-green-600')} />
  }
  return <TbArrowsShuffle className={classNames('')} />
}

type RepeatProps = {
  status: RepeatStatusState
}
export function RepeatIcon({ status }: RepeatProps) {
  switch (status) {
    case 'default':
      return <TbRepeat className={classNames('')} />
    case 'repeat':
      return <TbRepeat className={classNames('text-green-600')} />
    case 'repeat-one':
      return <TbRepeatOnce className={classNames('text-green-600')} />
  }
}

type SpeakerProps = {
  currentVolume: number
  handleUnmute: () => void
  handleMute: () => void
}
export function SpeakerIcon({
  currentVolume,
  handleMute,
  handleUnmute,
}: SpeakerProps) {
  if (currentVolume === 0) {
    return (
      <SpeakerXMarkIcon
        width={40}
        onClick={handleUnmute}
        className="h-6 cursor-pointer"
      />
    )
  }
  return (
    <SpeakerWaveIcon
      width={40}
      onClick={handleMute}
      className="h-6 cursor-pointer"
    />
  )
}
