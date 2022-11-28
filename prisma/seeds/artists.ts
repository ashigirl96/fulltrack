import { PrismaClient } from '@prisma/client'

const data = [
  {
    name: 'ピーナッツくん',
    channelId: 'Peanutskun',
  },
  {
    name: 'チャンチョ',
    channelId: 'Peanutskun',
  },
  {
    name: 'もちひよこ',
    channelId: 'mochi8hiyoko',
  },
  {
    name: 'おめがシスターズ',
    channelId: 'omesis',
  },
  {
    name: '名取さな',
    channelId: 'sana_natori',
  },
  {
    name: 'デニムくん',
    channelId: 'Peanutskun',
  },
  {
    name: 'ぽんぽこ',
    channelId: 'pokopea',
  },
  {
    name: 'やながみゆき',
    channelId: '2486182',
  },
  {
    name: 'オレンジ博士',
    channelId: 'Peanutskun',
  },
]

export async function createArtists(prisma: PrismaClient) {
  await prisma.artist.createMany({ data, skipDuplicates: true })
  return await prisma.artist.findMany()
}

// export async function deleteArtists(prisma: PrismaClient) {
//   await prisma.artist.deleteMany()
// }
