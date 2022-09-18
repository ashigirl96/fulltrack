import type { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { useHandlerReadyEventState } from '@/hooks/youtube_player'

const Home: NextPage = () => {
  const handlerReadyEventState = useHandlerReadyEventState()

  return (
    <Layout handlerReadyEventState={handlerReadyEventState}>
      <div className="bg-amber-200 flex justify-center">Hello</div>
    </Layout>
  )
}

export default Home
