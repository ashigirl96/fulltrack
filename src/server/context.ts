import { inferAsyncReturnType } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
// import { useSession } from '@supabase/auth-helpers-react'
// import * as trpcNext from '@trpc/server/adapters/next'
// import { Session } from 'next-auth'
// import { getSession } from '@/lib/supabase'
// import { ISODateString } from 'next-auth/core/types'
// import { getSession } from 'next-auth/react'
// import { getGoogleUser } from '@/lib/supabase'
// import supabase from '@/pages/api/auth/[...supabase]'
// import { getGoogleUser } from '@/lib/supabase'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  // const session = await getSession()
  // console.error(`session ${JSON.stringify(session)}`)
  // // const session = useSession()
  //
  // // const session_: Session = {
  // //   user: {
  // //     name: 'hoge',
  // //     email: 'fuga',
  // //     image: 'https://example.com',
  // //   },
  // //   expires: '100',
  // // }
  // //
  // // return {
  // //   session: session_,
  // // }
  // console.log(`req ${JSON.stringify(req)}`)
  // console.log(`res ${JSON.stringify(res)}`)

  return {
    req,
    res,
    // prisma
  }
}

// export async function createContext(opts: trpcNext.CreateNextContextOptions) {
//   // const session = await getSession({ req: opts.req })
//
//   console.log(`opts ${JSON.stringify(opts)}`)
//   // console.log(`session ${JSON.stringify(session)}`)
//
//   const session_: Session = {
//     user: {
//       name: 'hoge',
//       email: 'fuga',
//       image: 'https://example.com',
//     },
//     expires: '100',
//   }
//
//   return {
//     session: session_,
//   }
// }

export type Context = inferAsyncReturnType<typeof createContext>
