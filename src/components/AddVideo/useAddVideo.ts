import { useState } from 'react'
import { useHandleStateChange } from './useHandleStateChange'
import { YoutubePlayer } from '@/types'

export function useAddVideo() {
  const [videoId, setVideoId] = useState('')
  const [start, setStart] = useState<number | undefined>(1)
  const [end, setEnd] = useState<number | undefined>(undefined)
  const [readyEvent, setReadyEvent] = useState<YoutubePlayer | undefined>(
    undefined,
  )
  const handleStateChange = useHandleStateChange()
  return {
    videoId,
    setVideoId,
    start,
    setStart,
    end,
    setEnd,
    readyEvent,
    setReadyEvent,
    handleStateChange,
  }
}
