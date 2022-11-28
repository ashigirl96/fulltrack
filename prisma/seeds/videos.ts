import { PrismaClient, Artist } from '@prisma/client'

const data = [
  {
    youtubeVideoId: '4RiiI92qGWA',
    start: 27,
    end: 37,
    title: 'ぽんぽこがやってきたshort.2',
    originalTitle: 'ぽんぽこがやってきたぞ',
    thumbnailUrl: 'https://img.youtube.com/vi/4RiiI92qGWA/maxresdefault.jpg',
    artists: ['ぽんぽこ'],
  },
  {
    youtubeVideoId: 'TssreZGLlOo',
    start: 1,
    end: 207,
    title: 'peanut phenomenon',
    originalTitle:
      'PAS TASTA - peanut phenomenon ft. ピーナッツくん (Music Video)',
    thumbnailUrl: 'https://img.youtube.com/vi/TssreZGLlOo/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: '5n0mbVRGV-k',
    start: 32,
    end: 34,
    title: '自作ファミチキ',
    originalTitle:
      '【神】揚げたてのファミチキを家で大量に作れるセットがマジで最高すぎた…！',
    thumbnailUrl: 'https://img.youtube.com/vi/5n0mbVRGV-k/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: '_nXnvHit0R4',
    start: 411,
    end: 533,
    title: 'グミ超うめぇ',
    originalTitle:
      'ピーナッツくん -"VIRTUAFREAK -REWIRE-" Release live @渋谷clubasia',
    thumbnailUrl: 'https://img.youtube.com/vi/_nXnvHit0R4/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: 'am9_BDCyjLU',
    start: 1077,
    end: 1352,
    title: '幽体離脱 (feat.チャンチョ & ぽんぽこ)',
    originalTitle: 'ピーナッツくん × Moment Tokyo XR LIVE『#ONAKAnoNAKA』',
    thumbnailUrl: 'https://img.youtube.com/vi/am9_BDCyjLU/maxresdefault.jpg',
    artists: ['チャンチョ', 'ぽんぽこ'],
  },
  {
    youtubeVideoId: 'am9_BDCyjLU',
    start: 406,
    end: 561,
    title: 'School Boy (feat.もちひよこ)',
    originalTitle: 'ピーナッツくん × Moment Tokyo XR LIVE『#ONAKAnoNAKA』',
    thumbnailUrl: 'https://img.youtube.com/vi/am9_BDCyjLU/maxresdefault.jpg',
    artists: ['ピーナッツくん', 'もちひよこ'],
  },
  {
    youtubeVideoId: 'am9_BDCyjLU',
    start: 2948,
    end: 3098,
    title: 'SuperChat',
    originalTitle: 'ピーナッツくん × Moment Tokyo XR LIVE『#ONAKAnoNAKA』',
    thumbnailUrl: 'https://img.youtube.com/vi/am9_BDCyjLU/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: '_nXnvHit0R4',
    start: 127,
    end: 195,
    title: 'DUNE!',
    originalTitle:
      'ピーナッツくん -"VIRTUAFREAK -REWIRE-" Release live @渋谷clubasia',
    thumbnailUrl: 'https://img.youtube.com/vi/_nXnvHit0R4/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: 'am9_BDCyjLU',
    start: 1826,
    end: 2036,
    title: 'ペパーミントラブ (feat.名取さな)',
    originalTitle: 'ピーナッツくん × Moment Tokyo XR LIVE『#ONAKAnoNAKA』',
    thumbnailUrl: 'https://img.youtube.com/vi/am9_BDCyjLU/maxresdefault.jpg',
    artists: ['ピーナッツくん', '名取さな'],
  },
  {
    youtubeVideoId: '4RiiI92qGWA',
    start: 1,
    end: 301,
    title: 'ぽんぽこがやってきたぞ',
    originalTitle: 'ぽんぽこがやってきたぞっ / ぽんぽこ【歌ってみた】',
    thumbnailUrl: 'https://img.youtube.com/vi/4RiiI92qGWA/maxresdefault.jpg',
    artists: ['ぽんぽこ'],
  },
  {
    youtubeVideoId: 'am9_BDCyjLU',
    start: 1434,
    end: 1602,
    title: 'Tamiflu',
    originalTitle: 'ピーナッツくん × Moment Tokyo XR LIVE『#ONAKAnoNAKA』',
    thumbnailUrl: 'https://img.youtube.com/vi/am9_BDCyjLU/maxresdefault.jpg',
    artists: ['チャンチョ'],
  },
  {
    youtubeVideoId: 'am9_BDCyjLU',
    start: 210,
    end: 379,
    title: '刀ピークリスマスのテーマソング2021',
    originalTitle: 'ピーナッツくん × Moment Tokyo XR LIVE『#ONAKAnoNAKA』',
    thumbnailUrl: 'https://img.youtube.com/vi/am9_BDCyjLU/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: '_nXnvHit0R4',
    start: 733,
    end: 1000,
    title: '幽体離脱',
    originalTitle:
      'ピーナッツくん -"VIRTUAFREAK -REWIRE-" Release live @渋谷clubasia',
    thumbnailUrl: 'https://img.youtube.com/vi/_nXnvHit0R4/maxresdefault.jpg',
    artists: ['チャンチョ', 'ぽんぽこ'],
  },
  {
    youtubeVideoId: '_nXnvHit0R4',
    start: 220,
    end: 407,
    title: 'ピーナッツくんのおまじない',
    originalTitle:
      'ピーナッツくん -"VIRTUAFREAK -REWIRE-" Release live @渋谷clubasia',
    thumbnailUrl: 'https://img.youtube.com/vi/_nXnvHit0R4/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: 'am9_BDCyjLU',
    start: 2280,
    end: 2481,
    title: "Drippin' Life",
    originalTitle: 'ピーナッツくん × Moment Tokyo XR LIVE『#ONAKAnoNAKA』',
    thumbnailUrl: 'https://img.youtube.com/vi/am9_BDCyjLU/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: '_nXnvHit0R4',
    start: 536,
    end: 696,
    title: 'Expecto patronum!',
    originalTitle:
      'ピーナッツくん -"VIRTUAFREAK -REWIRE-" Release live @渋谷clubasia',
    thumbnailUrl: 'https://img.youtube.com/vi/_nXnvHit0R4/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: '_nXnvHit0R4',
    start: 1000,
    end: 1125,
    title: '未来NEXTメシ',
    originalTitle:
      'ピーナッツくん -"VIRTUAFREAK -REWIRE-" Release live @渋谷clubasia',
    thumbnailUrl: 'https://img.youtube.com/vi/_nXnvHit0R4/maxresdefault.jpg',
    artists: ['ピーナッツくん', 'やながみゆき'],
  },
  {
    youtubeVideoId: '_nXnvHit0R4',
    start: 2,
    end: 126,
    title: '笑うピーナッツくん',
    originalTitle:
      'ピーナッツくん -"VIRTUAFREAK -REWIRE-" Release live @渋谷clubasia',
    thumbnailUrl: 'https://img.youtube.com/vi/_nXnvHit0R4/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: '0u7OXZG55js',
    start: 1,
    end: 236,
    title: 'はなとなり',
    originalTitle: 'はなとなり / ぽんぽこ【オリジナルソング】',
    thumbnailUrl: 'https://img.youtube.com/vi/0u7OXZG55js/maxresdefault.jpg',
    artists: ['ぽんぽこ'],
  },
  {
    youtubeVideoId: 'FwPOR-NG18s',
    start: 1,
    end: 234,
    title: 'ハッピーウェディング前ソング',
    originalTitle:
      'ハッピーウェディング前ソング (もちぽこver.) - ヤバイTシャツ屋さん',
    thumbnailUrl: 'https://img.youtube.com/vi/FwPOR-NG18s/maxresdefault.jpg',
    artists: ['もちひよこ', 'ぽんぽこ'],
  },
  {
    youtubeVideoId: 'am9_BDCyjLU',
    start: 886,
    end: 1055,
    title: 'Kick!Punch!Block! (feat.デニムくん)',
    originalTitle: 'ピーナッツくん × Moment Tokyo XR LIVE『#ONAKAnoNAKA』',
    thumbnailUrl: 'https://img.youtube.com/vi/am9_BDCyjLU/maxresdefault.jpg',
    artists: ['ピーナッツくん', 'デニムくん'],
  },
  {
    youtubeVideoId: 'Dr4FL3lnxlA',
    start: 1,
    end: 233,
    title: 'カフカ',
    originalTitle: 'カフカ / ぽんぽこ 【MV】',
    thumbnailUrl: 'https://img.youtube.com/vi/Dr4FL3lnxlA/maxresdefault.jpg',
    artists: ['ぽんぽこ'],
  },
  {
    youtubeVideoId: '_nXnvHit0R4',
    start: 1125,
    end: 1326,
    title: "Drippin' Life",
    originalTitle:
      'ピーナッツくん -"VIRTUAFREAK -REWIRE-" Release live @渋谷clubasia',
    thumbnailUrl: 'https://img.youtube.com/vi/_nXnvHit0R4/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: 'am9_BDCyjLU',
    start: 27,
    end: 208,
    title: 'Expecto patronum!',
    originalTitle: 'ピーナッツくん × Moment Tokyo XR LIVE『#ONAKAnoNAKA』',
    thumbnailUrl: 'https://img.youtube.com/vi/am9_BDCyjLU/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: 'ja2zi8SREBc',
    start: 1,
    end: 175,
    title: '刀ピークリスマスのテーマソング2021',
    originalTitle: '【MV】刀ピークリスマスのテーマソング2021 / ピーナッツくん',
    thumbnailUrl: 'https://img.youtube.com/vi/ja2zi8SREBc/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: 'am9_BDCyjLU',
    start: 2546,
    end: 2732,
    title: 'ピーナッツくんのおまじない (feat.チャンチョ&オレンジ博士)',
    originalTitle: 'ピーナッツくん × Moment Tokyo XR LIVE『#ONAKAnoNAKA』',
    thumbnailUrl: 'https://img.youtube.com/vi/am9_BDCyjLU/maxresdefault.jpg',
    artists: ['チャンチョ', 'オレンジ博士'],
  },
  {
    youtubeVideoId: '0u7OXZG55js',
    start: 1,
    end: 236,
    title: 'はなとなり',
    originalTitle: 'はなとなり / ぽんぽこ【オリジナルソング】',
    thumbnailUrl: 'https://img.youtube.com/vi/0u7OXZG55js/maxresdefault.jpg',
    artists: ['ぽんぽこ'],
  },
  {
    youtubeVideoId: 'am9_BDCyjLU',
    start: 712,
    end: 832,
    title: 'グミ超うめぇ',
    originalTitle: 'ピーナッツくん × Moment Tokyo XR LIVE『#ONAKAnoNAKA』',
    thumbnailUrl: 'https://img.youtube.com/vi/am9_BDCyjLU/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: 'B9BoxtZmmFM',
    start: 1,
    end: 98,
    title: 'Roomrunner!',
    originalTitle: 'ピーナッツくん - Roomrunner! (Live at POP YOURS 2022)',
    thumbnailUrl: 'https://img.youtube.com/vi/B9BoxtZmmFM/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: 'am9_BDCyjLU',
    start: 1643,
    end: 1800,
    title: 'KISS (feat. おめがシスターズ)',
    originalTitle: 'ピーナッツくん × Moment Tokyo XR LIVE『#ONAKAnoNAKA』',
    thumbnailUrl: 'https://img.youtube.com/vi/am9_BDCyjLU/maxresdefault.jpg',
    artists: ['ピーナッツくん', 'おめがシスターズ'],
  },
  {
    youtubeVideoId: 'QZAI270B1bg',
    start: 1,
    end: 124,
    title: 'グミ超うめぇ',
    originalTitle: 'ピーナッツくん - グミ超うめぇ (Live at POP YOURS 2022)',
    thumbnailUrl: 'https://img.youtube.com/vi/QZAI270B1bg/maxresdefault.jpg',
    artists: ['ピーナッツくん'],
  },
  {
    youtubeVideoId: 'oN5cAoM8Acg',
    start: 1,
    end: 82,
    title: '言の葉のうた',
    originalTitle: '【MV】言の葉のうた - 甲賀流忍者ぽんぽこ（Prod.n-buna）',
    thumbnailUrl: 'https://img.youtube.com/vi/oN5cAoM8Acg/maxresdefault.jpg',
    artists: ['ぽんぽこ'],
  },
]

const videoArtists = data
  .map((video) => {
    return video.artists.map((artist) => ({
      youtubeVideoId: video.youtubeVideoId,
      start: video.start,
      end: video.end,
      artistName: artist,
    }))
  })
  .flatMap((x) => x)

export async function createVideos(prisma: PrismaClient, artists_: Artist[]) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _data = data.map(({ artists: _, ...params }) => params)
  await prisma.video.createMany({ data: _data, skipDuplicates: true })
  const videos = await prisma.video.findMany()
  const ArtistIdsVideoIds = videoArtists.map(
    ({ artistName, youtubeVideoId, start, end }) => {
      const videoId = videos.find(
        (v) =>
          v.youtubeVideoId === youtubeVideoId &&
          v.start === start &&
          v.end === end,
      )!.id
      const artistId = artists_.find((a) => a.name === artistName)!.id
      return {
        videoId,
        artistId,
      }
    },
  )
  await prisma.artistOnVideo.createMany({
    data: ArtistIdsVideoIds,
    skipDuplicates: true,
  })
  return videos
}
