import { PrismaClient } from '@prisma/client'
import { createArtists } from './seed/artists'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  await createArtists(prisma)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
