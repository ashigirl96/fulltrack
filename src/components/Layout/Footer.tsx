import React from 'react'
import { useYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'

export function Footer() {
  const { YouTubePlayer, handleTogglePlayButton, handleReady, playerStatus } =
    useYouTubePlayerComponent()
  return (
    <>
      <YouTubePlayer setReadyEvent={handleReady} playerStatus={playerStatus} />
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
