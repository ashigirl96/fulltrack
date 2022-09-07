import React from 'react'
import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'
import { Speaker } from './Speaker'
import { PlayPause } from './PlayPause'

type Props = {
  handleTogglePlay: ReturnTypeOfUseYouTubePlayerComponent['handleTogglePlay']
  handleVolumeWithValue: ReturnTypeOfUseYouTubePlayerComponent['handleVolumeWithValue']
}
export function Footer({ handleTogglePlay, handleVolumeWithValue }: Props) {
  return (
    <div className="h-[10%] flex justify-between items-center p-8">
      <div>Left</div>

      <div>
        <PlayPause handleTogglePlay={handleTogglePlay} />
      </div>
      <div>
        <Speaker handleVolumeWithValue={handleVolumeWithValue} />
      </div>
    </div>
  )
}
