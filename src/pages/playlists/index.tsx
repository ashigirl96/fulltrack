import { Layout } from '@/components/Layout'
import { NextRouter } from 'next/router'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import React from 'react'
import { OfficialTracks } from '@/components/Playlist/OfficialTracks'

type Props = ReturnTypeSetReadyEvent & { router: NextRouter }
const Component = ({ router }: Props) => {
  const { isReady } = router

  if (!isReady) {
    return <div>isLoading...</div>
  }

  return <OfficialTracks />
}

Component.getLayout = function getLayout(
  page: React.ReactElement,
  props: ReturnTypeSetReadyEvent,
) {
  return <Layout handlerSetReadyEvent={props}>{page}</Layout>
}

export default Component
