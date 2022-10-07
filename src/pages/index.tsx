import { Layout } from '@/components/Layout'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import React from 'react'

const Component = () => {
  return <div className="bg-amber-200 flex justify-center">Hello</div>
}

Component.getLayout = function getLayout(
  page: React.ReactElement,
  props: Pick<ReturnTypeSetReadyEvent, 'handleReadyEvent' | 'readyEvent'>,
) {
  return <Layout handlerReadyEventState={props}>{page}</Layout>
}

export default Component
