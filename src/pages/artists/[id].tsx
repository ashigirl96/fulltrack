import { Layout } from '@/components/Layout'
import { ReturnTypeSetReadyEvent } from '@/hooks/youtube_player/useSetReadyEvent'
import React from 'react'
//
// type Props = ReturnTypeSetReadyEvent & { router: NextRouter }
// function Component({ readyEvent, router }: Props) {
//   const { isReady, query } = router
//   if (!isReady) {
//     return <div>isLoading...</div>
//   }
//   const artistId = query.id as string
//
//   return <C artistId={artistId} readyEvent={readyEvent} />
// }
//
// function C({ artistId, readyEvent }) {
//   const artistRef = artistDocRef(artistId)
//   const q = query(
//     videoCollectionRef,
//     where('artists', 'array-contains', artistRef),
//   )
//   const [videos, isLoading, error] = useCollectionData(q)
//
//   console.log(`videos ${JSON.stringify(videos && videos[0])}`)
//
//   return (
//     <>
//       <div className="grid-playlist">
//         <div className="justify-self-end">#</div>
//         <div>タイトル</div>
//         <div className="md-hidden">オリジナルタイトル</div>
//         <div className="justify-self-end">再生時間</div>
//       </div>
//       <div className="max-h-[2296px]">
//         <div className="translate-y-0">
//           {videos?.map((video, index) => (
//             // <VideoRow
//             //   key={`${video.id}-${index}`}
//             //   videoId={video.id}
//             //   playlistId={''}
//             //   readyEvent={readyEvent}
//             //   index={index}
//             //   indexSelected={0}
//             //   setIndexSelected={() => {}}
//             // />
//             <div>
//               {video.title}
//               {video.videoId}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }
//

function Component() {
  return <div>Artists</div>
}

Component.getLayout = function getLayout(
  page: React.ReactElement,
  props: ReturnTypeSetReadyEvent,
) {
  return <Layout handlerSetReadyEvent={props}>{page}</Layout>
}

export default Component
