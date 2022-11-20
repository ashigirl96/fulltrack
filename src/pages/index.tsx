import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { trpc } from '@/lib/trpc'

function Index() {
  const session = useSession()
  const supabase = useSupabaseClient()
  // const hello = trpc.hello.useQuery({ text: 'Client' })
  const hello = trpc.helloYou.useQuery({ text: 'Client' })
  // const hello2 = trpc.helloYou.useQuery({ text: 'Client' })
  if (!hello.data) {
    return <div>Loading...</div>
  }
  // if (!hello2.data) {
  //   return <div>Loading2...</div>
  // }

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
        <div>
          <p> Account page will go here.</p>
          <div>{hello?.data?.greeting ?? 'GREET'}</div>
          <div>
            {JSON.stringify(session.user.user_metadata.name) ?? 'GREET'}
          </div>
        </div>
      )}
    </div>
  )
}

export default Index
