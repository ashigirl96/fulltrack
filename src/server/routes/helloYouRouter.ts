import superjson from 'superjson'
import { z } from 'zod'
import { protectedProcedure } from '@/server/trpc'

export const helloYouRouter = protectedProcedure
  .input(
    z.object({
      text: z.string(),
    }),
  )
  .query(({ input, ctx }) => {
    return {
      greeting: `hello ${input.text}, Mr. ${superjson.stringify(
        ctx.session,
      )} req ${ctx.req.query.text}`,
    }
  })
