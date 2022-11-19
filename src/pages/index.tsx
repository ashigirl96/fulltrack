import React from 'react'

import { useSignInWithGoogle } from '@/lib/supabase'
import { useUserState } from '@/store/supabase/user'

function Index() {
  const signInWithGoogle = useSignInWithGoogle()
  const { user } = useUserState()
  return (
    <div className="bg-red-100">
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
