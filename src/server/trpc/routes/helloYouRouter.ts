import { z } from 'zod'
import { protectedProcedure } from '@/server/trpc/trpc'

export const helloYouRouter = protectedProcedure
  .input(
    z.object({
      text: z.string(),
    }),
  )
  .query(({ input, ctx }) => {
    return {
      greeting: `Hello ${input.text} ${ctx.user.id}`,
    }
  })
