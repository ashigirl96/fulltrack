import '../styles/globals.css'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import type { AppProps } from 'next/app'
import { Auth } from '@/components/Auth'

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <RecoilRoot>
      <Auth />
      {getLayout(<Component {...pageProps} router={router} />)}
    </RecoilRoot>
  )
}

export default MyApp
