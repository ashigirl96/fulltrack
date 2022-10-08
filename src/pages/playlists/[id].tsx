import { Layout } from '@/components/Layout'
import { NextRouter } from 'next/router'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import React, { useEffect, useMemo } from 'react'
import { VideoFirestore } from '@/types'
import { PlaylistStoreId, usePlaylistValue } from '@/atoms/firestore/playlist'
import { useMaybeFetchVideos } from '@/hooks/playlist/useMaybeFetchVideos'
import { useSetVideoValues } from '@/atoms/firestore/video'
import { TrackTable, TrackTitle } from '@/components/shared/TrackTable'

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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const playlist = usePlaylistValue(playlistId) // TODO: サイドメニューがプレイリストをフェッチしてることを前提にしてる
  const { isLoading, videos, error } = useMaybeFetchVideos(playlist?.videoIds)
  if (isLoading) return <div>loading fetch...</div>
  if (!videos) return <div>no videos...</div>
  if (error) return <div>error fetching...</div>

  return <Component videos={videos} readyEvent={readyEvent} />
}

type Props = Pick<FetchProps, 'readyEvent'> & {
  videos: VideoFirestore[]
}
function Component({ readyEvent, videos }: Props) {
  const setVideoValues = useSetVideoValues(videos)
  useEffect(() => {
    setVideoValues()
  }, [setVideoValues])

  return (
    <div>
      <TrackTitle.Playlist />
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
