import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs'
import { inferAsyncReturnType } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { supabase } from '@/server/auth'
import { prisma } from '@/server/db/client'

type CreateContextOptions = {
  user: User | undefined
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export function createContextInner(opts: CreateContextOptions) {
  return { prisma, supabase, user: opts.user }
}
export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const supabase2 = createServerSupabaseClient(ctx)
  const { data, error } = await supabase2.auth.getSession()
  console.log(`session ${JSON.stringify(data.session)}`)
  const user = data.session?.user

  return createContextInner({ user })
}

export type Context = inferAsyncReturnType<typeof createContext>
