import { Artist, PrismaClient } from '@prisma/client'

type IArtist = Pick<Artist, 'name' | 'channelId'>

const DATASETS: IArtist[] = [
  {
    name: 'ピーナッツくん',
    channelId: '@Peanutskun',
  },
  {
    name: 'ぽんぽこ',
    channelId: '@pokopea',
  },
]

export async function createArtists(client: PrismaClient) {
  return await client.artist.createMany({
    data: DATASETS,
    skipDuplicates: true,
  })
}
