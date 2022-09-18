import { PlaylistStore } from '@/types'

type Args = {
  playlists: PlaylistStore[]
}
export function useOfficialTracks({ playlists }: Args) {
  return { playlists }
}

export type ReturnTypeTracks = ReturnType<typeof useOfficialTracks>
