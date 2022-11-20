import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { helloRouter } from '@/server/trpc/routes/helloRouter'
import { helloYouRouter } from '@/server/trpc/routes/helloYouRouter'

export const appRouter = router({
  hello: helloRouter,
  helloYou: helloYouRouter,
  posts: router({
    all: publicProcedure
      .input(
        z.object({
          text: z.string(),
        }),
      )
      .query(({ input }) => {
        return {
          posts: [
            { id: 1, title: input.text },
            { id: 2, title: 'after' },
          ],
        }
      }),
  }),
})

export type AppRouter = typeof appRouter
