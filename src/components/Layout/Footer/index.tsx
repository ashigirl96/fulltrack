import React from 'react'
import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'
import { Speaker } from './Speaker'
import { PlayerController } from './PlayerController'

type Props = {
  handleTogglePlay: ReturnTypeOfUseYouTubePlayerComponent['handleTogglePlay']
  handleVolumeWithValue: ReturnTypeOfUseYouTubePlayerComponent['handleVolumeWithValue']
}
export function Footer({ handleTogglePlay, handleVolumeWithValue }: Props) {
  return (
    <div className="h-[10%] flex justify-between items-center p-8">
      <div>Left</div>

      <PlayerController handleTogglePlay={handleTogglePlay} />
      <div>
        <Speaker handleVolumeWithValue={handleVolumeWithValue} />
      </div>
    </div>
  )
}
