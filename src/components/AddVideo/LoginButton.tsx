import {
  useGetCurrentUser,
  useGoogleSignIn,
  useSignOut,
} from '@/hooks/firebaseAuth'

export function LoginButton() {
  const handleSignIn = useGoogleSignIn()
  const handleSignOut = useSignOut()
  const user = useGetCurrentUser()

  if (!user) {
    return (
      <button
        className="btn btn-primary"
        onClick={() => handleSignIn().then(() => window.location.reload())}
      >
        ログイン
      </button>
    )
  }

  if (user.uid) {
    return (
      <button
        className="btn btn-primary"
        onClick={() => handleSignOut().then(() => window.location.reload())}
      >
        ログアウト
      </button>
    )
  }

  return (
    <button
      className="btn btn-primary"
      onClick={() => handleSignIn().then(() => window.location.reload())}
    >
      ログイン
    </button>
  )
}
