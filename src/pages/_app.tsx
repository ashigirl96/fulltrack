import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
// import dynamic from 'next/dynamic'
// const RecoilizeDebugger = dynamic(() => import('recoilize'), { ssr: false })
// const [root, setRoot] = useState<HTMLElement | null>(null)
// useEffect(() => {
//   if (typeof window.document !== 'undefined') {
//     setRoot(document.getElementById('__next'))
//   }
// }, [root])
{
  /*<RecoilizeDebugger root={root} />*/
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
