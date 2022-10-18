import { useCreatePlaylist } from '@/hooks/playlist/useCreatePlaylist'
import { UserId } from '@/types'
import { PlusCircle } from '@/components/icons'
import { useGoogleSignIn } from '@/hooks/firebaseAuth'
import { useCallback } from 'react'

type Props = {
  currentUserId: UserId
}
export function CreatePlaylist({ currentUserId }: Props) {
  const handleClick = useCreatePlaylist({ userId: currentUserId })

  return <Component handleClick={handleClick} />
}

export function SignIn() {
  const signIn = useGoogleSignIn()
  const handleSignIn = useCallback(async () => {
    await signIn()
    window.location.reload()
  }, [signIn])

  return <Component handleClick={handleSignIn} />
}

function Component({ handleClick }: { handleClick: () => void }) {
  return (
    <div className="flex items-center gap-x-1.5 cursor-pointer">
      <PlusCircle />
      <span className="ellipsis-one-line" onClick={handleClick}>
        プレイリストを作成する
      </span>
    </div>
  )
}
