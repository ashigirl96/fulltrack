import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // const artists = await createArtists(prisma)
  // const videos = await createVideos(prisma, artists)
  // await createAlbum(prisma, videos)
  // const videos = (
  //   await prisma.albumVideo.findMany({
  //     where: {
  //       albumId: 'clb1177xq001cr3l8rofq98rs',
  //     },
  //     include: {
  //       video: true,
  //     },
  //   })
  // ).map(({ video }) => video)
  // console.log(`videos ${JSON.stringify(videos, null, 2)}`)
}

main().finally(async () => {
  await prisma.$disconnect()
})
