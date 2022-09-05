import { useRecoilCallback } from 'recoil'
import {
  currentVideoIndexState,
  isLastVideoState,
  isLoopState,
  playerStatusState,
} from '@/atoms/youtube_player'

export function useSetNextVideo() {
  return useRecoilCallback(
    ({ set, reset, snapshot }) =>
      async () => {
        const isLastVideo = await snapshot.getPromise(isLastVideoState)
        const isLoop = await snapshot.getPromise(isLoopState)
        // 最後の曲
        if (isLastVideo) {
          // 初期化する
          reset(currentVideoIndexState)
          // ループしてないならば、完了状態にする
          if (!isLoop) {
            set(playerStatusState, 'ended')
          }
        } else {
          // 最後の曲じゃないなら、インクリメントする
          set(currentVideoIndexState, (x) => x + 1)
        }
      },
    [],
  )
}
