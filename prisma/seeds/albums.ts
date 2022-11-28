import { PrismaClient, Video, AlbumType } from '@prisma/client'

const data = [
  {
    thumbnailUrl: 'https://img.youtube.com/vi/TssreZGLlOo/maxresdefault.jpg',
    title: 'PAS TASTA - peanut phenomenon ft. ピーナッツくん (Music Video)',
    type: 'single',
    videos: [
      {
        youtubeVideoId: 'TssreZGLlOo',
        start: 1,
        end: 207,
      },
    ],
  },
  {
    thumbnailUrl: 'https://img.youtube.com/vi/QZAI270B1bg/maxresdefault.jpg',
    title: 'Live at POP YOURS 2022',
    type: 'live',
    videos: [
      {
        youtubeVideoId: 'B9BoxtZmmFM',
        start: 1,
        end: 98,
      },
      {
        youtubeVideoId: 'QZAI270B1bg',
        start: 1,
        end: 124,
      },
    ],
  },
  {
    thumbnailUrl: 'https://img.youtube.com/vi/oN5cAoM8Acg/maxresdefault.jpg',
    title: '【MV】言の葉のうた - 甲賀流忍者ぽんぽこ（Prod.n-buna）',
    type: 'single',
    videos: [
      {
        youtubeVideoId: 'oN5cAoM8Acg',
        start: 1,
        end: 82,
      },
    ],
  },
  {
    thumbnailUrl: 'https://img.youtube.com/vi/0u7OXZG55js/maxresdefault.jpg',
    title: 'はなとなり / ぽんぽこ【オリジナルソング】',
    type: 'single',
    videos: [
      {
        youtubeVideoId: '0u7OXZG55js',
        start: 1,
        end: 236,
      },
    ],
  },
  {
    thumbnailUrl: 'https://img.youtube.com/vi/Dr4FL3lnxlA/maxresdefault.jpg',
    title: 'カフカ / ぽんぽこ 【MV】',
    type: 'single',
    videos: [
      {
        youtubeVideoId: 'Dr4FL3lnxlA',
        start: 1,
        end: 233,
      },
    ],
  },
  {
    thumbnailUrl: 'https://img.youtube.com/vi/ja2zi8SREBc/maxresdefault.jpg',
    title: '刀ピークリスマスのテーマソング2021',
    type: 'single',
    videos: [
      {
        youtubeVideoId: 'ja2zi8SREBc',
        start: 1,
        end: 175,
      },
    ],
  },
  {
    thumbnailUrl: 'https://img.youtube.com/vi/FwPOR-NG18s/maxresdefault.jpg',
    title: 'ハッピーウェディング前ソング (もちぽこver.)',
    type: 'single',
    videos: [
      {
        youtubeVideoId: 'FwPOR-NG18s',
        start: 1,
        end: 234,
      },
    ],
  },
  {
    thumbnailUrl: 'https://img.youtube.com/vi/am9_BDCyjLU/maxresdefault.jpg',
    title: 'ピーナッツくん × Moment Tokyo XR LIVE『#ONAKAnoNAKA』',
    type: 'live',
    videos: [
      {
        youtubeVideoId: 'am9_BDCyjLU',
        start: 1077,
        end: 1352,
      },
      {
        youtubeVideoId: 'am9_BDCyjLU',
        start: 406,
        end: 561,
      },
      {
        youtubeVideoId: 'am9_BDCyjLU',
        start: 1826,
        end: 2036,
      },
      {
        youtubeVideoId: 'am9_BDCyjLU',
        start: 1434,
        end: 1602,
      },
      {
        youtubeVideoId: 'am9_BDCyjLU',
        start: 210,
        end: 379,
      },
      {
        youtubeVideoId: 'am9_BDCyjLU',
        start: 2280,
        end: 2481,
      },
      {
        youtubeVideoId: 'am9_BDCyjLU',
        start: 886,
        end: 1055,
      },
      {
        youtubeVideoId: 'am9_BDCyjLU',
        start: 27,
        end: 208,
      },
      {
        youtubeVideoId: 'am9_BDCyjLU',
        start: 712,
        end: 832,
      },
      {
        youtubeVideoId: 'am9_BDCyjLU',
        start: 1643,
        end: 1800,
      },
      {
        youtubeVideoId: 'am9_BDCyjLU',
        start: 2948,
        end: 3098,
      },
      {
        youtubeVideoId: 'am9_BDCyjLU',
        start: 2546,
        end: 2732,
      },
    ],
  },
  {
    thumbnailUrl: 'https://img.youtube.com/vi/4RiiI92qGWA/maxresdefault.jpg',
    title: 'ぽんぽこがやってきたぞっ / ぽんぽこ【歌ってみた】',
    type: 'single',
    videos: [
      {
        youtubeVideoId: '4RiiI92qGWA',
        start: 1,
        end: 301,
      },
    ],
  },
  {
    thumbnailUrl: 'https://img.youtube.com/vi/_nXnvHit0R4/maxresdefault.jpg',
    title: 'VIRTUAFREAK -REWIRE-',
    type: 'live',
    videos: [
      {
        youtubeVideoId: '_nXnvHit0R4',
        start: 411,
        end: 533,
      },
      {
        youtubeVideoId: '_nXnvHit0R4',
        start: 127,
        end: 195,
      },
      {
        youtubeVideoId: '_nXnvHit0R4',
        start: 733,
        end: 1000,
      },
      {
        youtubeVideoId: '_nXnvHit0R4',
        start: 220,
        end: 407,
      },
      {
        youtubeVideoId: '_nXnvHit0R4',
        start: 536,
        end: 696,
      },
      {
        youtubeVideoId: '_nXnvHit0R4',
        start: 1000,
        end: 1125,
      },
      {
        youtubeVideoId: '_nXnvHit0R4',
        start: 2,
        end: 126,
      },
      {
        youtubeVideoId: '_nXnvHit0R4',
        start: 1125,
        end: 1326,
      },
    ],
  },
]

const albumData = data.map(({ title, type, thumbnailUrl }) => {
  return {
    title,
    type: type === 'live' ? AlbumType.LIVE : AlbumType.SINGLE,
    thumbnailUrl,
  }
})

const AlbumsVideos = data
  .map((album) => {
    return album.videos.map(({ youtubeVideoId, start, end }) => ({
      youtubeVideoId,
      start,
      end,
      albumTitle: album.title,
    }))
  })
  .flatMap((x) => x)

export async function createAlbum(prisma: PrismaClient, videos: Video[]) {
  await prisma.album.createMany({
    data: albumData,
    skipDuplicates: true,
  })
  const albums = await prisma.album.findMany()
  const AlbumIdsVideoIds = AlbumsVideos.map(
    ({ youtubeVideoId, start, end, albumTitle }) => {
      const videoId = videos.find(
        (v) =>
          v.youtubeVideoId === youtubeVideoId &&
          v.start === start &&
          v.end === end,
      )!.id
      const albumId = albums.find((a) => a.title === albumTitle)!.id
      return {
        videoId,
        albumId,
      }
    },
  )
  await prisma.albumVideo.createMany({
    data: AlbumIdsVideoIds,
    skipDuplicates: true,
  })
}
