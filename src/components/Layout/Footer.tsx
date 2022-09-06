import React from 'react'
import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'

type Props = {
  handleTogglePlay: ReturnTypeOfUseYouTubePlayerComponent['handleTogglePlayButton']
}
export function Footer({ handleTogglePlay }: Props) {
  return (
    <div className="h-[10%] flex justify-between items-center">
      <div>Left</div>
      <div>
        <button onClick={handleTogglePlay}>Play</button>
      </div>
      <div>Right</div>
    </div>
  )
}
