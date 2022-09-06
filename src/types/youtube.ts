import { YouTubeProps, YouTubeEvent as _YouTubeEvent } from 'react-youtube'
import { YouTubePlayer as _YouTubePlayer } from 'youtube-player/dist/types'

export type YouTubeOptions = YouTubeProps['opts']
export type YouTubeEvent = _YouTubeEvent<unknown>
export type YouTubePlayerType = _YouTubePlayer
