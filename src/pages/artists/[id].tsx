import { Layout } from '@/components/Layout'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import React, { useEffect, useMemo } from 'react'
import { NextRouter } from 'next/router'
import { ArtistFirebaseId, VideoFirestore } from '@/types'
import { artistDocRef } from '@/lib/firestore/artist'
import { query, where } from '@firebase/firestore'
import { videoCollectionRef } from '@/lib/firestore/video'
import { useCollectionData } from '@/hooks/firestore'
import { TrackTable, TrackTitle } from '@/components/shared/TrackTable'
import { useSetVideoValues } from '@/atoms/firestore/video'
import { useVideosByArtistId } from '@/hooks/video/useVideosByArtistId'

type RoutingProps = ReturnTypeSetReadyEvent & { router: NextRouter }
function RoutingComponent({ readyEvent, router }: RoutingProps) {
  const { isReady, query } = router
  const artistId = useMemo(() => query.id, [query.id]) as string
  if (!isReady) {
    return <div>isLoading...</div>
  }
  return <FetchingComponent readyEvent={readyEvent} artistId={artistId} />
}

type FetchProps = Pick<RoutingProps, 'readyEvent'> & {
  artistId: ArtistFirebaseId
}
function FetchingComponent({ readyEvent, artistId }: FetchProps) {
  const { videos, isLoading, error } = useVideosByArtistId(artistId)
  if (isLoading) return <div>loading fetch...</div>
  if (!videos) return <div>no videos!</div>
  if (error) return <div>error fetching...</div>

  return (
    <Component videos={videos} artistId={artistId} readyEvent={readyEvent} />
  )
}

type Props = Pick<FetchProps, 'readyEvent'> & {
  videos: VideoFirestore[]
  artistId: ArtistFirebaseId
}
function Component({ readyEvent, videos, artistId }: Props) {
  const setVideoValues = useSetVideoValues(videos)
  useEffect(() => {
    setVideoValues()
  }, [setVideoValues])

  return (
    <div className="max-w-full px-4">
      <TrackTitle.Artist artistId={artistId} />
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
