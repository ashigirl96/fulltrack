import { z } from 'zod'
import { protectedProcedure } from '@/server/trpc/trpc'

export const helloYouRouter = protectedProcedure
  .input(
    z.object({
      text: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    // const user = await ctx.prisma.user.findFirst({ where: { id: ctx.user.id } })
    return {
      greeting: `Hello ${input.text} ${ctx.user.id}`,
    }
  })
