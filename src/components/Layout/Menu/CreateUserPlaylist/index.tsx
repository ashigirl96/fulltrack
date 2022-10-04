import { useCreateUserPlaylist } from '@/hooks/playlist/useCreateUserPlaylist'

export function CreateUserPlaylist() {
  const handleClick = useCreateUserPlaylist()

  return (
    <div>
      <button onClick={handleClick}>プレイリストを作成する</button>
    </div>
  )
}
