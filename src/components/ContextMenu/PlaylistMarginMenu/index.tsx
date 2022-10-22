import { UserId } from '@/types'
import { CreatePlaylist } from '@/components/ContextMenu/PlaylistMenu'

export function PlaylistMarginMenu({ userId }: { userId: UserId }) {
  return <CreatePlaylist currentUserId={userId} />
}
