import type { NextPage } from 'next'
import { Layout } from '@/components/Layout'
import { useSetReadyEventState } from '@/hooks/youtube_player'

const Home: NextPage = () => {
  const setReadyEventState = useSetReadyEventState()

  return (
    <Layout setReadyEventState={setReadyEventState}>
      <div className="bg-amber-200 flex justify-center">Hello</div>
    </Layout>
  )
}

export default Home
