import React from 'react'
import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'
import { Speaker } from './Speaker'

type Props = {
  handleTogglePlay: ReturnTypeOfUseYouTubePlayerComponent['handleTogglePlayButton']
  handleVolumeWithValue: ReturnTypeOfUseYouTubePlayerComponent['handleVolumeWithValue']
}
export function Footer({ handleTogglePlay, handleVolumeWithValue }: Props) {
  return (
    <div className="h-[10%] flex justify-between items-center p-8">
      <div>Left</div>
      <div>
        <button onClick={handleTogglePlay}>Play</button>
      </div>
      <div className="flex justify-center items-center gap-x-2">
        <Speaker handleVolumeWithValue={handleVolumeWithValue} />
      </div>
    </div>
  )
}
