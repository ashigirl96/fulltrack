import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
    </div>
  )
}

export default Index
