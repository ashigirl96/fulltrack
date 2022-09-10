import React from 'react'
import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'
import { Speaker } from './Speaker'
import { PlayerController } from './PlayerController'

type Props = Pick<
  ReturnTypeOfUseYouTubePlayerComponent,
  'handlePlayerController' | 'handleVolume'
>

export function Footer({ handlePlayerController, handleVolume }: Props) {
  return (
    <div className="h-[10%] flex justify-between items-center p-8">
      <div>Left</div>

      <PlayerController handlePlayerController={handlePlayerController} />
      <Speaker handleVolume={handleVolume} />
    </div>
  )
}
