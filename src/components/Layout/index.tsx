import React, { useCallback, useEffect } from 'react'
import { Border } from './Border'
import { useMenuWidth } from './useMenuWidth'
import { Menu } from './Menu'
import { Footer } from './Footer'
import { PlayerPreview } from './PlayerPreview'
import { useYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import { getPlayerStateKey } from '@/lib/youtube'

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

  const hoge = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      console.log(`Space`)
    }
  }
  const handleKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      if (readyEvent && e.code) {
        const status = getPlayerStateKey(await readyEvent.getPlayerState())
        switch (status) {
          case 'PLAYING':
            await readyEvent.pauseVideo()
            break
          case 'PAUSED':
            await readyEvent.playVideo()
            break
          case 'ENDED':
            await readyEvent.playVideo()
            break
          default:
            break
        }
      }
    },
    [readyEvent],
  )
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

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

          <div className="flex-1 overflow-y-scroll hidden-scrollbar">
            {children}
          </div>
        </main>
      </div>
      <Footer
        handlePlayerController={handlePlayerController}
        handleVolume={handleVolume}
      />
    </div>
  )
}
