import { router } from '../trpc'
import { helloRouter } from '@/server/trpc/routes/helloRouter'
import { helloYouRouter } from '@/server/trpc/routes/helloYouRouter'

export const appRouter = router({
  hello: helloRouter,
  helloYou: helloYouRouter,
})

export type AppRouter = typeof appRouter
