import {
  PLAYER_STATES,
  PlayerStateKey,
  PlayerStateValue,
} from '@/constants/youtube'

export function getPlayerStateKey(state: PlayerStateValue): PlayerStateKey {
  const index = Object.values(PLAYER_STATES).indexOf(state)
  return <PlayerStateKey>Object.keys(PLAYER_STATES)[index]
}
