// import { usePlaylists } from './usePlaylists'
import { usePlaylists2 } from './usePlaylists2'

// export function Playlists() {
//   const playlists = usePlaylists()
//   if (playlists.state === 'hasValue') {
//     return (
//       <div>
//         {playlists.contents.map((playlist) => {
//           return (
//             <div key={`playlist-${playlist.id}`}>
//               {JSON.stringify(playlist, null, 2)}
//             </div>
//           )
//         })}
//       </div>
//     )
//   }
//   return <div>Please login...</div>
// }
//
export function Playlists({ currentUserId }: { currentUserId: string }) {
  const { playlists, isLoading, error } = usePlaylists2(currentUserId)
  if (!playlists) {
    return <div>Please login...</div>
  }
  return (
    <div>
      {playlists.map((playlist) => {
        return (
          <div key={`playlist-${playlist.id}`}>
            {JSON.stringify(playlist, null, 2)}
          </div>
        )
      })}
    </div>
  )
}
