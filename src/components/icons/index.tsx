import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCirclePlay,
  faCirclePause,
  faForwardStep,
  faBackwardStep,
  faShuffle,
} from '@fortawesome/free-solid-svg-icons'

type Props = {
  className: string
}
export function PlayIcon({ className }: Props) {
  return <FontAwesomeIcon className={className} icon={faCirclePlay} />
}

export function PauseIcon({ className }: Props) {
  return <FontAwesomeIcon className={className} icon={faCirclePause} />
}

export function ForwardStepIcon({ className }: Props) {
  return <FontAwesomeIcon className={className} icon={faForwardStep} />
}

export function BackwardStepIcon({ className }: Props) {
  return <FontAwesomeIcon className={className} icon={faBackwardStep} />
}

export function ShuffleIcon({ className }: Props) {
  return <FontAwesomeIcon className={className} icon={faShuffle} />
}
