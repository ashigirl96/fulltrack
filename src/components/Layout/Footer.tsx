import React from 'react'
import YouTubePlayer from '@/components/shared/YouTubePlayer'

export function Footer() {
  return (
    <>
      <div className="h-[10%] flex justify-between items-center">
        <div>Left</div>
        <div>Center</div>
        <div>Right</div>
      </div>
      <YouTubePlayer />
    </>
  )
}
