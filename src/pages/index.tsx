import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Desktop = dynamic(() => import('@/components/shared/DesktopExample'), {
  ssr: false,
})
const Mobile = dynamic(() => import('@/components/shared/MobileExample'), {
  ssr: false,
})

function Index() {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  const router = useRouter()
  return (
    <div>
      <button
        onClick={async () => {
          await supabaseClient.auth.signOut()
          await router.push('/').finally(() => location.reload())
        }}
      >
        Logout
      </button>
      <button
        onClick={async () => {
          await supabaseClient.auth.signInWithOAuth({ provider: 'google' })
        }}
      >
        Login
      </button>

      <Link href={`/hello`}>
        <a>Hello</a>
      </Link>
      <Link href={`/Ios`}>
        <a>ios</a>
      </Link>

      <Desktop />
      <Mobile />
    </div>
  )
}

export default Index
