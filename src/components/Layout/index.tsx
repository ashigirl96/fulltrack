import React from 'react'
import { Border } from './Border'
import { useMenuWidth } from './useMenuWidth'
import { Menu } from './Menu'
import { Footer } from './Footer'
import { PlayerPreview } from './PlayerPreview'

import { useYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'

type LayoutProps = {
  children: React.ReactNode
}
export function Layout({ children }: LayoutProps) {
  const { width, dragging, onPointerMove, onPointerUp, onPointerDown } =
    useMenuWidth()
  const { YouTubePlayer, handleTogglePlayButton, handleReady } =
    useYouTubePlayerComponent()

  return (
    <div className="h-screen flex flex-col">
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

          <div className="bg-green-50 flex-1 overflow-y-scroll">{children}</div>
        </main>
      </div>
      <Footer handleTogglePlay={handleTogglePlayButton} />
    </div>
  )
}
