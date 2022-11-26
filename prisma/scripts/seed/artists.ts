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
  {
    name: 'チャンチョ',
    channelId: '@Peanutskun',
  },
  {
    name: 'もちひよこ',
    channelId: '',
  },
  {
    name: 'おめがシスターズ',
    channelId: '',
  },
  {
    name: '名取さな',
    channelId: '',
  },
  {
    name: 'デニムくん',
    channelId: '@Peanutskun',
  },
  {
    name: 'やながみゆき',
    channelId: '',
  },
  {
    name: '',
    channelId: '',
  },
]

export async function createArtists(client: PrismaClient) {
  return await client.artist.createMany({
    data: DATASETS,
    skipDuplicates: true,
  })
}
