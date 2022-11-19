import { z } from 'zod'
import { publicProcedure } from '@/server/trpc'

export const helloRouter = publicProcedure
  .input(
    z.object({
      text: z.string(),
    }),
  )
  .query(({ input }) => {
    return {
      greeting: `hello ${input.text}`,
    }
  })
