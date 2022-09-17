import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { useDocumentData } from '@/hooks/firestore'
import { userDocRef } from '@/lib/firestore/user'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import { useSetUser, useUserValue } from '@/atoms/firestore/user'
// import dynamic from 'next/dynamic'
// const RecoilizeDebugger = dynamic(() => import('recoilize'), { ssr: false })

type UserProps = { currentUserId: string }
function User({ currentUserId }: UserProps) {
  const [user] = useDocumentData(userDocRef(currentUserId))
  const setUser = useSetUser(currentUserId)
  const hoge = useUserValue(currentUserId)
  console.log(`user ${JSON.stringify(hoge, null, 2)}`)
  if (user) {
    setUser(user)
  }
  return null
}

function MyApp({ Component, pageProps }: AppProps) {
  // const [root, setRoot] = useState<HTMLElement | null>(null)
  // useEffect(() => {
  //   if (typeof window.document !== 'undefined') {
  //     setRoot(document.getElementById('__next'))
  //   }
  // }, [root])
  const currentUserId = useGetCurrentUserId()
  return (
    <RecoilRoot>
      {/*<RecoilizeDebugger root={root} />*/}
      {currentUserId && <User currentUserId={currentUserId} />}
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
