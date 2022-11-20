import { useSession } from '@supabase/auth-helpers-react'

import Link from 'next/link'
import React from 'react'
import { trpc } from '@/lib/trpc'

function Index() {
  const session = useSession()

  console.log(`session ${JSON.stringify(session)}`)

  return (
    <React.Suspense fallback={<div>LOADING</div>}>
      <Link href={`/`}>
        <a>Index</a>
      </Link>
      {session && <Sessioned />}
    </React.Suspense>
  )
}

function Sessioned() {
  const hello1 = trpc.hello.useQuery({ text: 'Client' })
  const hello2 = trpc.helloYou.useQuery({ text: 'Client' })
  const posts = trpc.posts.all.useQuery({ text: 'POST' })
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
      <div>
        {posts?.data?.posts.map((post) => (
          <div key={post.id} className="flex">
            <p>{post.id}</p>
            <p>{post.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Index
