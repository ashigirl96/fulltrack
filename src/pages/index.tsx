import type { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { useHandlerReadyEventState } from '@/hooks/youtube_player'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'

type Props = ReturnTypeSetReadyEvent
const Home: NextPage<Props> = ({ setReadyEvent, readyEvent }) => {
  const handlerReadyEventState = useHandlerReadyEventState({
    setReadyEvent,
    readyEvent,
  })

  return (
    <Layout handlerReadyEventState={handlerReadyEventState}>
      <div className="bg-amber-200 flex justify-center">Hello</div>
    </Layout>
  )
}

export default Home
