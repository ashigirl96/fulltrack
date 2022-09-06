import React from 'react'
import { useYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'

export function Footer() {
  const { YouTubePlayer, handleTogglePlayButton, handleReady, readyEvent } =
    useYouTubePlayerComponent()
  return (
    <>
      <YouTubePlayer readyEvent={readyEvent} setReadyEvent={handleReady} />
      <div className="h-[10%] flex justify-between items-center">
        <div>Left</div>
        <div>
          <button onClick={() => handleTogglePlayButton()}>Play</button>
        </div>
        <div>Right</div>
      </div>
    </>
  )
}
