import React, { useCallback, useEffect, useState } from 'react'
import { useHandleStateChange } from './useHandleStateChange'
import { YouTubeEvent, YouTubePlayerType } from '@/types'
import { fetchThumbnailUrl } from '@/lib/youtube/fetchThumbnailUrl'
import { addDoc, documentId, getDocs, query, where } from '@firebase/firestore'
import { videoCollectionRef } from '@/lib/firestore/video'
import { artistCollectionRef, artistDocRef } from '@/lib/firestore/artist'

export function useAddVideo() {
  const [start, setStart] = useState<number>(1)
  const [end, setEnd] = useState<number>(1)
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
    if (readyEvent) {
      const time = (await readyEvent.getCurrentTime()) || 1
      setStart(Math.floor(time))
    }
  }, [readyEvent])
  const setEndTime = useCallback(async () => {
    if (readyEvent) {
      const time = await readyEvent.getCurrentTime()
      setEnd(Math.floor(time))
    }
  }, [readyEvent])

  const setRawStartTime = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const [hours, minutes, seconds] = e.currentTarget.value
        .split(':')
        .map((x) => Number(x))
      setStart(hours * 3600 + minutes * 60 + seconds)
    },
    [],
  )
  const setRawEndTime = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const [hours, minutes, seconds] = e.currentTarget.value
        .split(':')
        .map((x) => Number(x))
      setEnd(hours * 3600 + minutes * 60 + seconds)
    },
    [],
  )

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

  const handleReadyEvent = useCallback(async (event: YouTubeEvent) => {
    if (event) {
      setReadyEvent(event.target)
      const duration = await event.target.getDuration()
      setEnd(duration)
    }
  }, [])

  const [uploadedMessage, setUploadedMessage] = useState<string | null>(null)
  const addVideo = useCallback(async () => {
    const q = query(artistCollectionRef, where('name', 'in', artists))
    const _artists = (await getDocs(q)).docs.map((x) => artistDocRef(x.id))
    console.log(JSON.stringify(_artists))
    await addDoc(videoCollectionRef, {
      id: documentId(),
      videoId,
      start,
      end,
      originalTitle,
      title,
      thumbnailUrl,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      artists: _artists,
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
    handleReadyEvent,
    setRawStartTime,
    setRawEndTime,
  }
}
