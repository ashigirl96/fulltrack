import type { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Playlist } from '@/components/Playlist'

const PlaylistShow: NextPage = () => {
  const router = useRouter()
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  useEffect(() => {
    if (router.isReady) {
      setPlaylistId(router.query.playlistId as string)
    }
  }, [router])

  return <Layout>{playlistId && <Playlist playlistId={playlistId} />}</Layout>
}

export default PlaylistShow
