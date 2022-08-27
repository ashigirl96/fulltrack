import { YouTubeOptions } from '@/types'

type GetPropsOptions = {
  start?: number
  end?: number
}
export function getPropsOptions({
  start,
  end,
}: GetPropsOptions): YouTubeOptions {
  // Look https://developers.google.com/youtube/player_parameters
  return {
    playerVars: {
      fs: 0,
      disablekb: 1, // 画面操作を許可しない
      controls: 0, // 動画プレイヤーのコントロールを表示するかどうか
      autoplay: 1, // プレーヤーを読み込んだときに最初の動画を自動再生するかどうか
      start: start ?? 1, // 0sだと開始しないので、最小値を1sにする
      end,
      origin: window.location.origin,
    },
  }
}
