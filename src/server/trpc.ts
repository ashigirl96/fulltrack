import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import type { Context } from './context'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

export const middleware = t.middleware

const isAuthed = middleware(({ next, ctx }) => {
  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: ctx.session,
    },
  })
})

export const router = t.router

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed)
