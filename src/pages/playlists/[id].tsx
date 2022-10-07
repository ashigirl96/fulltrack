import { Layout } from '@/components/Layout'
import { NextRouter } from 'next/router'
import { PlaylistWrapper } from '@/components/Playlist'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import React from 'react'

type Props = ReturnTypeSetReadyEvent & { router: NextRouter }
const Component = ({ readyEvent, router }: Props) => {
  const { isReady, query } = router

  if (!isReady) {
    return <div>isLoading...</div>
  }

  const playlistId = query.id as string

  return <PlaylistWrapper playlistId={playlistId} readyEvent={readyEvent} />
}

Component.getLayout = function getLayout(
  page: React.ReactElement,
  props: ReturnTypeSetReadyEvent,
) {
  return <Layout handlerSetReadyEvent={props}>{page}</Layout>
}

export default Component
