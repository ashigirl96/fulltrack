import { Layout } from '@/components/Layout'
import { NextRouter } from 'next/router'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import React, { useEffect, useMemo } from 'react'
import { PlaylistStore, UserId, VideoFirestore } from '@/types'
import { PlaylistStoreId, usePlaylistValue } from '@/atoms/firestore/playlist'
import { useMaybeFetchVideos } from '@/hooks/playlist/useMaybeFetchVideos'
import { useSetVideoValues } from '@/atoms/firestore/video'
import { TrackTable, TrackTitle } from '@/components/shared/TrackTable'
import { usePlaylistDoc } from '@/hooks/playlist/usePlaylistDoc'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import { useSetCurrentTrackId } from '@/atoms/youtubePlayer/states'

type RoutingProps = ReturnTypeSetReadyEvent & { router: NextRouter }
function RoutingComponent({ readyEvent, router }: RoutingProps) {
  const { isReady, query } = router
  const playlistId = useMemo(() => query.id, [query.id]) as string
  const playlist = usePlaylistValue(playlistId)
  const currentUserId = useGetCurrentUserId()
  if (!isReady || !currentUserId) {
    return <div>isLoading...</div>
  }
  return playlist ? (
    <FetchingVideosComponent playlist={playlist} readyEvent={readyEvent} />
  ) : (
    <FetchingComponent
      readyEvent={readyEvent}
      playlistId={playlistId}
      currentUserId={currentUserId}
    />
  )
}

type FetchProps = Pick<RoutingProps, 'readyEvent'> & {
  playlistId: PlaylistStoreId
  currentUserId: UserId
}
function FetchingComponent({
  readyEvent,
  playlistId,
  currentUserId,
}: FetchProps) {
  const { playlist, isLoading, error } = usePlaylistDoc(
    playlistId,
    currentUserId,
  )
  if (isLoading) return <div>loading fetch...</div>
  if (!playlist) return <div>no playlist...</div>
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
  const setCurrentTrackId = useSetCurrentTrackId({
    type: 'playlist',
    id: playlistId,
  })
  useEffect(() => {
    setVideoValues()
  }, [setVideoValues])

  return (
    <div className="max-w-full px-4">
      <TrackTitle.Playlist playlistId={playlistId} />
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
