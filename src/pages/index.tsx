import { Layout } from '@/components/Layout'
import { NextRouter } from 'next/router'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import React, { useEffect } from 'react'
import { Title } from '@/components/shared/TrackTable/TrackTitle'
import { useAlbumCollection } from '@/hooks/playlist/useAlbumCollection'
import { useSetAlbumValues } from '@/atoms/firestore/album'
import { TrackView } from '@/components/shared/TrackView'
import { AlbumStore } from '@/types/playlistStore'

type RoutingProps = { router: NextRouter }
const RoutingComponent = ({ router }: RoutingProps) => {
  const { isReady } = router

  if (!isReady) {
    return <div>isLoading...</div>
  }

  return <FetchingComponent />
}

function FetchingComponent() {
  const { albums, error } = useAlbumCollection()
  if (!albums) return <div suppressHydrationWarning>no playlists...</div>
  if (error) return <div>error fetching...</div>

  return <Component albums={albums} />
}

type Props = {
  albums: AlbumStore[]
}
function Component({ albums }: Props) {
  const setAlbumValues = useSetAlbumValues(albums)
  // 動画一覧を開いた時に、フェッチした公式のプレイリスト一覧をatomにつっこむ
  useEffect(() => {
    setAlbumValues()
  }, [setAlbumValues])
  return (
    <div className="max-w-full px-4">
      <Title text="アルバム" />
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        {albums.map((album) => (
          <TrackView key={`track-view-${album.id}`} track={album} />
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
