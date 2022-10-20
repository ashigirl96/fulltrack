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
import { AiOutlinePlusCircle } from 'react-icons/ai'

function classNames(className: string) {
  return `h-6 text-black-300 cursor-pointer ${className}`
}

type Props = {
  className: string
}
export function PlayIcon({ className }: Props) {
  return <FaPlayCircle size={36} className={className} />
}

export function PauseIcon({ className }: Props) {
  return <FaPauseCircle size={36} className={className} />
}

export function ForwardStepIcon({ className }: Props) {
  return <TbPlayerSkipForward size={20} className={className} />
}

export function BackwardStepIcon({ className }: Props) {
  return <TbPlayerSkipBack size={20} className={className} />
}

type ShuffleProps = {
  isShuffle: boolean
}
export function ShuffleIcon({ isShuffle }: ShuffleProps) {
  if (isShuffle) {
    return <TbArrowsShuffle size={20} className={classNames('text-greedy')} />
  }
  return <TbArrowsShuffle size={20} className={classNames('')} />
}

type RepeatProps = {
  status: RepeatStatusState
}
export function RepeatIcon({ status }: RepeatProps) {
  switch (status) {
    case 'default':
      return <TbRepeat size={20} className={classNames('')} />
    case 'repeat':
      return <TbRepeat size={20} className={classNames('text-greedy')} />
    case 'repeat-one':
      return <TbRepeatOnce size={20} className={classNames('text-greedy')} />
  }
}

type SpeakerProps = {
  handleUnmute: () => void
  handleMute: () => void
  isMuted: boolean
}
export function SpeakerIcon({
  handleMute,
  handleUnmute,
  isMuted,
}: SpeakerProps) {
  if (isMuted) {
    return (
      <SpeakerXMarkIcon
        width={20}
        onClick={handleUnmute}
        className="cursor-pointer"
      />
    )
  }
  return (
    <SpeakerWaveIcon
      width={20}
      onClick={handleMute}
      className="cursor-pointer"
    />
  )
}

export function PlusCircle() {
  return <AiOutlinePlusCircle width={100} />
}

export function MiniSpeakerIcon() {
  return <SpeakerWaveIcon width={16} className="text-greedy" />
}
