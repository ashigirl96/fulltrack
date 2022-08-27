import { useGetAuth, useGoogleSignIn, useSignOut } from '@/hooks/firebase'

export function LoginButton() {
  const handleSignIn = useGoogleSignIn()
  const handleSignOut = useSignOut()
  const auth = useGetAuth()

  if (auth.currentUser?.uid) {
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
