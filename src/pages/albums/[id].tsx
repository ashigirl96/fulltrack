import { NextRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { useAlbumValue, AlbumFireStoreId } from '@/atoms/firestore/album'
import { useSetVideoValues } from '@/atoms/firestore/video'
import { useSetCurrentTrackId } from '@/atoms/youtubePlayer/states'
import { Layout } from '@/components/Layout'
import { TrackTable, TrackTitle } from '@/components/shared/TrackTable'
import { useAlbumDoc } from '@/hooks/album/useAlbumDoc'
import { useMaybeFetchVideos } from '@/hooks/playlist/useMaybeFetchVideos'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import { AlbumStore, VideoFirestore } from '@/types'

type RoutingProps = ReturnTypeSetReadyEvent & { router: NextRouter }
function RoutingComponent({ readyEvent, router }: RoutingProps) {
  const { isReady, query } = router
  const albumId = useMemo(() => query.id, [query.id]) as string
  const album = useAlbumValue(albumId)
  if (!isReady) {
    return <div>isLoading...</div>
  }
  return album ? (
    <FetchingVideosComponent album={album} readyEvent={readyEvent} />
  ) : (
    <FetchingComponent readyEvent={readyEvent} albumId={albumId} />
  )
}

type FetchProps = Pick<RoutingProps, 'readyEvent'> & {
  albumId: AlbumFireStoreId
}
function FetchingComponent({ readyEvent, albumId }: FetchProps) {
  const { album, isLoading, error } = useAlbumDoc(albumId)
  if (isLoading) return <div>loading fetch...</div>
  if (!album) return <div>no album...</div>
  if (error) return <div>error fetching...</div>

  return <FetchingVideosComponent album={album} readyEvent={readyEvent} />
}

type FetchVideosProps = Pick<RoutingProps, 'readyEvent'> & {
  album: AlbumStore
}
function FetchingVideosComponent({ readyEvent, album }: FetchVideosProps) {
  const { isLoading, videos, error } = useMaybeFetchVideos(album.videoIds)
  if (isLoading) return <div>loading fetch...</div>
  if (!videos) return <div>no videos...</div>
  if (error) return <div>error fetching...</div>

  return (
    <Component videos={videos} readyEvent={readyEvent} albumId={album.id} />
  )
}

type Props = Pick<FetchProps, 'readyEvent' | 'albumId'> & {
  videos: VideoFirestore[]
}
function Component({ readyEvent, videos, albumId }: Props) {
  const setVideoValues = useSetVideoValues(videos)
  const setCurrentTrackId = useSetCurrentTrackId({ type: 'album', id: albumId })
  useEffect(() => {
    setVideoValues()
  }, [setVideoValues])

  return (
    <div className="max-w-full px-4">
      <TrackTitle.Album albumId={albumId} />
      <TrackTable
        readyEvent={readyEvent}
        videos={videos}
        setCurrentTrack={setCurrentTrackId}
      />
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
