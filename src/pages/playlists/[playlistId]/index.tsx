import type { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Playlist } from '@/components/Playlist'
import { useSetReadyEventState } from '@/hooks/youtube_player'

const PlaylistShow: NextPage = () => {
  const router = useRouter()
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  useEffect(() => {
    if (router.isReady) {
      setPlaylistId(router.query.playlistId as string)
    }
  }, [router])
  const [readyEvent, handleReady] = useSetReadyEventState()

  return (
    <Layout setReadyEventState={[readyEvent, handleReady]}>
      {playlistId && (
        <Playlist playlistId={playlistId} readyEvent={readyEvent} />
      )}
    </Layout>
  )
}

export default PlaylistShow
