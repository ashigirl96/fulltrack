import { YouTubeEvent } from '@/types'
import { getPropsOptions } from '@/lib/youtube'
import { useCurrentVideoValue } from '@/atoms/youtubePlayer'
import { useHandleStateChange } from './useHandleStateChange'

export type YouTubePlayerArgs = {
  handleReady: (x: YouTubeEvent) => void
}
// TODO: レンダリング多すぎるような気もするから問題の箇所を見つける
// YouTubePlayerに必要な値を渡すためのフック
export function useYouTubePlayer({ handleReady }: YouTubePlayerArgs) {
  const handleStateChange = useHandleStateChange()
  const currentVideo = useCurrentVideoValue()

  // TODO: リファクタリング
  let videoId = ''
  let opts = undefined
  if (currentVideo) {
    const { videoId: _videoId, start, end } = currentVideo
    opts = getPropsOptions({ start, end, controls: 0 })
    videoId = _videoId
  }

  return {
    videoId,
    opts,
    handleStateChange,
    handleReady,
  }
}
