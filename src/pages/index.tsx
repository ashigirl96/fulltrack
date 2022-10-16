import { Layout } from '@/components/Layout'
import { NextRouter } from 'next/router'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import React, { useEffect } from 'react'
import { PlaylistStore } from '@/types'
import { Title } from '@/components/shared/TrackTable/TrackTitle'
import { usePlaylistCollection } from '@/hooks/playlist/usePlaylistCollection'
import { useSetPlaylistValues } from '@/atoms/firestore/playlist'
import { TrackView } from '@/components/shared/TrackView'

type RoutingProps = { router: NextRouter }
const RoutingComponent = ({ router }: RoutingProps) => {
  const { isReady } = router

  if (!isReady) {
    return <div>isLoading...</div>
  }

  return <FetchingComponent />
}

function FetchingComponent() {
  const { playlists, error } = usePlaylistCollection()
  if (!playlists) return <div suppressHydrationWarning>no playlists...</div>
  if (error) return <div>error fetching...</div>

  return <Component playlists={playlists} />
}

type Props = {
  playlists: PlaylistStore[]
}
function Component({ playlists }: Props) {
  const setPlaylistValues = useSetPlaylistValues(playlists, true)
  // 動画一覧を開いた時に、フェッチした公式のプレイリスト一覧をatomにつっこむ
  useEffect(() => {
    setPlaylistValues()
  }, [setPlaylistValues])
  return (
    <div className="max-w-full px-4">
      <Title text="アルバム" />
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        {playlists.map((playlist) => (
          <TrackView key={`track-view-${playlist.id}`} playlist={playlist} />
        ))}
      </div>
    </div>
  )
}

RoutingComponent.getLayout = function getLayout(
  page: React.ReactElement,
  props: ReturnTypeSetReadyEvent,
) {
  return <Layout handlerSetReadyEvent={props}>{page}</Layout>
}

export default RoutingComponent
