import { YouTubeProps } from 'react-youtube'

export type YouTubeOptions = YouTubeProps['opts']

type GetPropsOptions = {
  start?: number
  end?: number
  controls?: 0 | 1
}
export function getPropsOptions({
  controls = 0,
}: GetPropsOptions): YouTubeOptions {
  // start: 0sだと開始しないので、最小値を1sにする
  // Look https://developers.google.com/youtube/player_parameters
  return {
    width: '100%',
    height: '800rem',
    playerVars: {
      fs: 0,
      disablekb: 1, // 画面操作を許可しない
      controls, // 動画プレイヤーのコントロールを表示するかどうか
      autoplay: 1, // プレーヤーを読み込んだときに最初の動画を自動再生するかどうか
      origin: window.location.origin,
    },
  }
}
