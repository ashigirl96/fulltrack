import '../styles/globals.css'
import {
  createBrowserSupabaseClient,
  Session,
} from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
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
      <button
        onClick={async () => {
          await supabaseClient.auth.signOut()
          await router.push('/')
        }}
      >
        Logout
      </button>
      <RecoilRoot>
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
