import { useCreateUserPlaylist } from '@/hooks/playlist/useCreateUserPlaylist'
import { UserId } from '@/types'

type Props = {
  currentUserId: UserId
}
export function CreateUserPlaylist({ currentUserId }: Props) {
  const handleClick = useCreateUserPlaylist({ userId: currentUserId })

  return (
    <div>
      <button onClick={handleClick}>プレイリストを作成する</button>
    </div>
  )
}
