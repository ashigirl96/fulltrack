import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const AddVideo = dynamic(() => import('@/components/AddVideo'), { ssr: false })

const AddVideoIndex: NextPage = () => {
  return <AddVideo />
}

export default AddVideoIndex
