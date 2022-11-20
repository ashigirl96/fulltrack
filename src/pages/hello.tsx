import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { trpc } from '@/lib/trpc'

function Index() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div>
      {!session ? (
        <Auth
          providers={['google']}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      ) : (
        <Sessioned />
      )}
    </div>
  )
}

function Sessioned() {
  const hello1 = trpc.hello.useQuery({ text: 'Client' })
  const hello2 = trpc.helloYou.useQuery({ text: 'Client' })
  if (!hello1.data) {
    return <div>Loading...</div>
  }
  if (!hello2.data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p> Account page will go here.</p>
      <div>{hello1?.data?.greeting ?? 'GREET'}</div>
      <div>{hello2?.data?.greeting ?? 'GREET'}</div>
    </div>
  )
}

export default Index
