import React from 'react'
import { Border } from './Border'
import { useMenuWidth } from './useMenuWidth'
import { Menu } from './Menu'
import { Footer } from './Footer'
import { PlayerPreview } from './PlayerPreview'
import { useYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'

type LayoutProps = {
  children: React.ReactNode
  handlerSetReadyEvent: ReturnTypeSetReadyEvent
}
export function Layout({
  children,
  handlerSetReadyEvent: { setReadyEvent, readyEvent },
}: LayoutProps) {
  const { width, dragging, onPointerMove, onPointerUp, onPointerDown } =
    useMenuWidth()
  const {
    YouTubePlayer,
    handlePlayerController,
    handleReadyEvent,
    handleVolume,
  } = useYouTubePlayerComponent({ setReadyEvent, readyEvent })

  return (
    <div className="h-screen flex flex-col overflow-x-hidden">
      <div className="flex flex-1 h-[90%]">
        <Menu width={width.x} />

        <Border
          width={width}
          dragging={dragging}
          onPointerUp={onPointerUp}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
        />

        <main className="flex flex-col flex-1">
          <PlayerPreview
            YouTubePlayer={YouTubePlayer}
            handleReadyEvent={handleReadyEvent}
          />

          <div className="flex-1 overflow-y-scroll">{children}</div>
        </main>
      </div>
      <Footer
        handlePlayerController={handlePlayerController}
        handleVolume={handleVolume}
      />
    </div>
  )
}
