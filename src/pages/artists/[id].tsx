import { Layout } from '@/components/Layout'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import React, { useEffect, useMemo } from 'react'
import { NextRouter } from 'next/router'
import { ArtistFirebaseId, VideoFirestore } from '@/types'
import { artistDocRef } from '@/lib/firestore/artist'
import { query, where } from '@firebase/firestore'
import { videoCollectionRef } from '@/lib/firestore/video'
import { useCollectionData } from '@/hooks/firestore'
import { TrackTable } from '@/components/shared/TrackTable'
import { useSetVideoValues } from '@/atoms/firestore/video'

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
  const artistRef = artistDocRef(artistId)
  const q = query(
    videoCollectionRef,
    where('artists', 'array-contains', artistRef),
  )
  const [videos, isLoading, error] = useCollectionData(q)
  if (isLoading || !videos) return <div>loading fetch...</div>
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
      {/*TODO: 必要なものを考える*/}
      <span>ARTIST!!</span>
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
