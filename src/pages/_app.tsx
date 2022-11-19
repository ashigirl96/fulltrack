import '../styles/globals.css'
import { NextPage } from 'next'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactElement, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import type { AppProps } from 'next/app'
import { trpc } from '@/lib/trpc'

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  console.log(`session ${JSON.stringify(pageProps.session)}`)

  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        {getLayout(<Component {...pageProps} router={router} />)}
      </RecoilRoot>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
