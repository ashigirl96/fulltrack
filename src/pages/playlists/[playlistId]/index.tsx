import type { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { NextRouter } from 'next/router'
import { PlaylistWrapper } from '@/components/Playlist'
import { useHandlerReadyEventState } from '@/hooks/youtube_player'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'

type Props = ReturnTypeSetReadyEvent & { router: NextRouter }
const Component: NextPage<Props> = ({ readyEvent, setReadyEvent, router }) => {
  const { isReady, query } = router
  const handlerReadyEventState = useHandlerReadyEventState({
    readyEvent,
    setReadyEvent,
  })

  if (!isReady) {
    return <div>isLoading...</div>
  }

  const playlist = query.playlistId as string

  return (
    <Layout handlerReadyEventState={handlerReadyEventState}>
      <PlaylistWrapper
        playlistId={playlist}
        readyEvent={handlerReadyEventState.readyEvent}
      />
    </Layout>
  )
}

export default Component
