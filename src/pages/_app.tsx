import '../styles/globals.css'
import {
  createBrowserSupabaseClient,
  Session,
} from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import Head from 'next/head'
import { ReactElement, ReactNode, useState } from 'react'
import { RecoilRoot } from 'recoil'
import type { AppProps } from 'next/app'
import { trpc } from '@/lib/trpc'

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps<{ initialSession: Session }> & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <RecoilRoot>
        <Head>
          <title>フルトラック</title>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
        </Head>
        {getLayout(
          <Component
            {...pageProps}
            router={router}
            supabaseClient={supabaseClient}
          />,
        )}
      </RecoilRoot>
    </SessionContextProvider>
  )
}

export default trpc.withTRPC(MyApp)
