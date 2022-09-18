import type { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Playlist } from '@/components/Playlist'
import { useHandlerReadyEventState } from '@/hooks/youtube_player'

const PlaylistShow: NextPage = () => {
  const router = useRouter()
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  useEffect(() => {
    if (router.isReady) {
      setPlaylistId(router.query.playlistId as string)
    }
  }, [router])
  const handlerReadyEventState = useHandlerReadyEventState()

  return (
    <Layout handlerReadyEventState={handlerReadyEventState}>
      {playlistId && (
        <Playlist
          playlistId={playlistId}
          readyEvent={handlerReadyEventState.readyEvent}
        />
      )}
    </Layout>
  )
}

export default PlaylistShow
