import React from 'react'
import { Border } from './Border'
import { useMenuWidth } from './useMenuWidth'
import { Menu } from './Menu'
import { Footer } from './Footer'
import { PlayerPreview } from './PlayerPreview'
import { useYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'
import { ReturnTypeReadyEventStateType } from '@/hooks/youtube_player'

type LayoutProps = {
  children: React.ReactNode
  handlerReadyEventState: ReturnTypeReadyEventStateType
}
export function Layout({ children, handlerReadyEventState }: LayoutProps) {
  const { width, dragging, onPointerMove, onPointerUp, onPointerDown } =
    useMenuWidth()
  const { YouTubePlayer, handlePlayerController, handleReady, handleVolume } =
    useYouTubePlayerComponent(handlerReadyEventState)

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
            handleReady={handleReady}
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
