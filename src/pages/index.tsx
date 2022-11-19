// import { useUser } from '@supabase/auth-helpers-react'
// import { Auth } from '@supabase/ui'
// import React from 'react'
//
// function Index({ supabaseClient }) {
//   const user = useUser()
//   console.log(`supabaseClient ${JSON.stringify(supabaseClient.auth.signIn)}`)
//
//   if (!user)
//     return (
//       <div className="bg-red-700">
//         <Auth.UserContextProvider
//           supabaseClient={supabaseClient}
//           providers={['google']}
//         >
//           <Auth supabaseClient={supabaseClient} />
//         </Auth.UserContextProvider>
//       </div>
//     )
//   if (!hello.data) {
//     return <div>Loading...</div>
//   }
//   return (
//     <div>
//       <div>{hello.data.greeting}</div>
//     </div>
//   )
// }
//
// Index.getLayout = function getLayout(page: React.ReactElement) {
//   return (
//     <React.Suspense fallback={<div>Now loading...</div>}>{page}</React.Suspense>
//   )
// }
//

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { trpc } from '@/lib/trpc'

function Index() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const hello = trpc.hello.useQuery({ text: 'Client' })
  // const hello = trpc.helloYou.useQuery({ text: 'Client' })
  // if (!hello.data) {
  //   return <div>Loading...</div>
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
        </div>
      )}
    </div>
  )
}

export default Index
