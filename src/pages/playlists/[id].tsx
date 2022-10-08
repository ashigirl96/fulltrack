import { Layout } from '@/components/Layout'
import { NextRouter } from 'next/router'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import React, { useEffect, useMemo } from 'react'
import { PlaylistStore, VideoFirestore } from '@/types'
import { PlaylistStoreId } from '@/atoms/firestore/playlist'
import { useMaybeFetchVideos } from '@/hooks/playlist/useMaybeFetchVideos'
import { useSetVideoValues } from '@/atoms/firestore/video'
import { TrackTable, TrackTitle } from '@/components/shared/TrackTable'
import { usePlaylistDoc } from '@/hooks/playlist/usePlaylistDoc'

type RoutingProps = ReturnTypeSetReadyEvent & { router: NextRouter }
function RoutingComponent({ readyEvent, router }: RoutingProps) {
  const { isReady, query } = router
  const playlistId = useMemo(() => query.id, [query.id]) as string
  if (!isReady) {
    return <div>isLoading...</div>
  }
  return <FetchingComponent readyEvent={readyEvent} playlistId={playlistId} />
}

type FetchProps = Pick<RoutingProps, 'readyEvent'> & {
  playlistId: PlaylistStoreId
}
function FetchingComponent({ readyEvent, playlistId }: FetchProps) {
  // TODO: あれば、fetchしないようにする
  const { playlist, isLoading, error } = usePlaylistDoc(playlistId)
  if (isLoading) return <div>loading fetch...</div>
  if (!playlist) return <div>no videos...</div>
  if (error) return <div>error fetching...</div>

  return <FetchingVideosComponent playlist={playlist} readyEvent={readyEvent} />
}

type FetchVideosProps = Pick<RoutingProps, 'readyEvent'> & {
  playlist: PlaylistStore
}
function FetchingVideosComponent({ readyEvent, playlist }: FetchVideosProps) {
  const { isLoading, videos, error } = useMaybeFetchVideos(playlist.videoIds)
  if (isLoading) return <div>loading fetch...</div>
  if (!videos) return <div>no videos...</div>
  if (error) return <div>error fetching...</div>

  return (
    <Component
      videos={videos}
      readyEvent={readyEvent}
      playlistId={playlist.id}
    />
  )
}

type Props = Pick<FetchProps, 'readyEvent' | 'playlistId'> & {
  videos: VideoFirestore[]
}
function Component({ readyEvent, videos, playlistId }: Props) {
  const setVideoValues = useSetVideoValues(videos)
  useEffect(() => {
    setVideoValues()
  }, [setVideoValues])

  return (
    <div className="max-w-full px-4">
      <TrackTitle.Playlist playlistId={playlistId} />
      <TrackTable readyEvent={readyEvent} videos={videos} />
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
