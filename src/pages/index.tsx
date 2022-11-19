import React from 'react'

import { useSignInWithGoogle } from '@/lib/supabase'
import { trpc } from '@/lib/trpc'
import { useUserState } from '@/store/supabase/user'

function Index() {
  const hello = trpc.hello.useQuery({ text: 'Client' })
  const signInWithGoogle = useSignInWithGoogle()
  const { user } = useUserState()
  if (!hello.data) {
    return <div>Loading...</div>
  }
  return (
    <div className="bg-red-100">
      <div>{hello.data.greeting}</div>
      <div>{JSON.stringify(user)}</div>
      <button onClick={signInWithGoogle}>button</button>
    </div>
  )
}

Index.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <React.Suspense fallback={<div>Now loading...</div>}>{page}</React.Suspense>
  )
}

export default Index
