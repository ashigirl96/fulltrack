import React from 'react'
import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'
import { Speaker } from './Speaker'
import { PlayerController } from './PlayerController'
import { Thumbnail } from './Thumbnail'

type Props = Pick<
  ReturnTypeOfUseYouTubePlayerComponent,
  'handlePlayerController' | 'handleVolume'
>

export function Footer({ handlePlayerController, handleVolume }: Props) {
  return (
    <div className="h-[10%] flex items-center px-4">
      <Thumbnail />
      <PlayerController handlePlayerController={handlePlayerController} />
      <Speaker handleVolume={handleVolume} />
    </div>
  )
}
