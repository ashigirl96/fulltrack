import { router } from '../trpc'
import { helloRouter } from '@/server/routes/helloRouter'
// import { helloYouRouter } from '@/server/routes/helloYouRouter'

export const appRouter = router({
  hello: helloRouter,
  // helloYou: helloYouRouter,
})

export type AppRouter = typeof appRouter
