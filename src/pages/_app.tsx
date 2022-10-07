import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import {
  ReturnTypeSetReadyEvent,
  useSetReadyEvent,
} from '@/hooks/youtube_player/useSetReadyEvent'
import { ContextMenu } from '@/components/shared/ContextMenu'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (
    page: ReactElement,
    props: Pick<ReturnTypeSetReadyEvent, 'handleReadyEvent' | 'readyEvent'>,
  ) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const { readyEvent, setReadyEvent, handleReadyEvent } = useSetReadyEvent()
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <RecoilRoot>
      {getLayout(
        <Component
          {...pageProps}
          readyEvent={readyEvent}
          setReadyEvent={setReadyEvent}
          router={router}
        />,
        { handleReadyEvent, readyEvent },
      )}
      <ContextMenu />
    </RecoilRoot>
  )
}

export default MyApp
