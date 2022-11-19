import { inferAsyncReturnType } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { getSession } from 'next-auth/react'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  console.error(`opts ${JSON.stringify(opts)}`)

  const session = await getSession({ req: opts.req })

  return {
    session,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
