import { valueof } from '@/types'

export const PLAYER_STATES = {
  BUFFERING: 3,
  ENDED: 0,
  PAUSED: 2,
  PLAYING: 1,
  UN_STARTED: -1,
  VIDEO_CUED: 5,
} as const

export type PlayerStateKey = keyof typeof PLAYER_STATES
export type PlayerStateValue = valueof<typeof PLAYER_STATES>
