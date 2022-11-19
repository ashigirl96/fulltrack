import * as trpcNext from '@trpc/server/adapters/next'
import { createContext } from '@/server/context'
import { appRouter } from '@/server/routes/_app'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    process.env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`)
        }
      : undefined,
})