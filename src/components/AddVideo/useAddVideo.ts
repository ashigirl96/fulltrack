import { useCallback, useEffect, useState } from 'react'
import { useHandleStateChange } from './useHandleStateChange'
import { YouTubePlayerType } from '@/types'
import { fetchThumbnailUrl } from '@/lib/youtube/fetchThumbnailUrl'
import { addDoc, documentId } from '@firebase/firestore'
import { videoCollectionRef } from '@/lib/firestore/video'

export function useAddVideo() {
  const [start, setStart] = useState<number | undefined>(1)
  const [end, setEnd] = useState<number | undefined>(undefined)
  const [readyEvent, setReadyEvent] = useState<YouTubePlayerType | undefined>(
    undefined,
  )
  const handleStateChange = useHandleStateChange()
  const [videoId, setVideoId] = useState('')
  const [title, setTitle] = useState('')
  const [originalTitle, setOriginalTitle] = useState('')
  const [artists, setArtists] = useState<string[]>([])
  const [thumbnailUrl, setThumbnailUrl] = useState('')

  const setStartTime = useCallback(async () => {
    const time = (await readyEvent?.getCurrentTime()) || 1
    setStart(Math.floor(time))
  }, [readyEvent])
  const setEndTime = useCallback(async () => {
    const time = (await readyEvent?.getCurrentTime()) || 1
    setEnd(Math.floor(time))
  }, [readyEvent])

  useEffect(() => {
    const f = async () => {
      if (videoId) {
        const url = await fetchThumbnailUrl(videoId)
        if (url) {
          setThumbnailUrl(url)
        }
      }
    }
    f()
  }, [videoId])

  const [uploadedMessage, setUploadedMessage] = useState<string | null>(null)
  const addVideo = useCallback(async () => {
    await addDoc(videoCollectionRef, {
      id: documentId(),
      videoId,
      start,
      end,
      originalTitle,
      title,
      thumbnailUrl,
      artists,
    })
      .then(() => setUploadedMessage(`${videoId}の登録できました`))
      .catch((reason) => setUploadedMessage(`ERROR ${JSON.stringify(reason)}`))
  }, [artists, end, originalTitle, start, thumbnailUrl, title, videoId])

  return {
    videoId,
    setVideoId,
    start,
    end,
    setReadyEvent,
    handleStateChange,
    setStartTime,
    setEndTime,
    title,
    setTitle,
    originalTitle,
    setOriginalTitle,
    artists,
    setArtists,
    thumbnailUrl,
    addVideo,
    uploadedMessage,
    setUploadedMessage,
  }
}
