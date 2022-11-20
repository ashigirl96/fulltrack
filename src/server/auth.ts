import { createClient } from '@supabase/supabase-js'
import * as trpcNext from '@trpc/server/adapters/next'
import { parseCookies } from 'nookies'
import { required } from '@/lib/envs'

const supabaseUrl = required(process.env.NEXT_PUBLIC_SUPABASE_URL)
const supabaseKey = required(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
const cookieName = 'RJ-auth' // TODO: なにこれ

export const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '')

export const getUserByCookie = async (
  ctx: trpcNext.CreateNextContextOptions,
) => {
  // TODO: 間違えてるかもしれない
  // const cookieHeader = request.headers.get('Cookie')
  // const cookieHeader = request.headers.cookie

  // if (!cookieHeader) {
  //   return null
  // }
  //
  // const cookies = cookie.parse(cookieHeader)
  const cookies = parseCookies(ctx)
  // console.log(`cookies ${JSON.stringify(cookies, null, 2)}`)
  // console.log(`ctx.req ${JSON.stringify(ctx.req.cookies, null, 2)}`)

  // const value = JSON.parse(cookies[cookieName] || '{}')
  // console.log(`cookies ${JSON.stringify(cookies)}`)
  // console.log(`value ${JSON.stringify(value)}`)

  // const token = value['access-token']
  const token = JSON.parse(cookies['supabase-auth-token'])
  console.log(`ctx.req.headers ${JSON.stringify(ctx.req.headers)}`)

  const { user, error } = supabase.auth.setSession(token)
  // console.log(`token ${JSON.stringify(token)}`)
  // console.log(`user ${JSON.stringify(user)}`)
  // console.log(`error ${JSON.stringify(error)}`)

  if (!token) {
    return null
  }

  const { data } = await supabase.auth.getUser(token)
  console.log(`data ${JSON.stringify(data, null, 2)}`)

  return data
}
