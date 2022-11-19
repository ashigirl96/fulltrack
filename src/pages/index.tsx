import { signIn } from 'next-auth/react'
import React from 'react'
// import { trpc } from '@/lib/trpc'

function Index() {
  // const hello = trpc.hello.useQuery({ text: 'Client' })
  // const helloYou = trpc.helloYou.useQuery({ text: 'World' })
  // if (!hello.data) {
  //   return <div>Loading...</div>
  // }
  // if (!helloYou.data) {
  //   return <div>Loading You...</div>
  // }
  return (
    <div>
      {/*<div>{hello.data.greeting}</div>*/}
      {/*<div>{helloYou.data.greeting}</div>*/}
      <button
        onClick={() =>
          signIn('google', { callbackUrl: 'http://localhost:3000' })
        }
      >
        button
      </button>
    </div>
  )
}

Index.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <React.Suspense fallback={<div>Now loading...</div>}>{page}</React.Suspense>
  )
}

export default Index
