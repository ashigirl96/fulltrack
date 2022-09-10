import { YouTubePlayerType } from '@/types'
import {
  useCurrentVolumeValue,
  useSetCurrentVolume,
} from '@/atoms/youtubePlayer'
import { ChangeEvent, useCallback } from 'react'

export function useHandleVolume(readyEvent: YouTubePlayerType | undefined) {
  const { setCurrentVolume, currentVolume } = useHandleVolumeState()

  // 手動でボリュームを制御する
  const handleInputVolume = useHandleInputVolume({
    readyEvent,
    setCurrentVolume,
  })
  // ミュートの制御
  const handleMute = useHandleMute({ readyEvent, setCurrentVolume })
  // アンミュートの制御
  const handleUnmute = useHandleUnMute({ readyEvent, setCurrentVolume })

  return {
    currentVolume,
    handleInputVolume,
    handleMute,
    handleUnmute,
  }
}

type InputVolumeArgs = Pick<
  ReturnTypeHandleVolumeState,
  'readyEvent' | 'setCurrentVolume'
>
function useHandleInputVolume({
  readyEvent,
  setCurrentVolume,
}: InputVolumeArgs) {
  return useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (readyEvent) {
        const _volume = Number(event.currentTarget.value)
        setCurrentVolume(_volume)
        if (_volume !== 0 && (await readyEvent.isMuted())) {
          await readyEvent.unMute()
        }
        await readyEvent.setVolume(_volume)
      }
    },
    [readyEvent, setCurrentVolume],
  )
}

type MuteArgs = Pick<
  ReturnTypeHandleVolumeState,
  'readyEvent' | 'setCurrentVolume'
>
function useHandleMute({ readyEvent, setCurrentVolume }: MuteArgs) {
  return useCallback(async () => {
    if (readyEvent) {
      setCurrentVolume(0)
      await readyEvent.mute()
    }
  }, [readyEvent, setCurrentVolume])
}

type UnMuteArgs = Pick<
  ReturnTypeHandleVolumeState,
  'readyEvent' | 'setCurrentVolume'
>
function useHandleUnMute({ readyEvent, setCurrentVolume }: UnMuteArgs) {
  return useCallback(async () => {
    if (readyEvent) {
      await readyEvent.unMute()
      setCurrentVolume(await readyEvent.getVolume())
    }
  }, [readyEvent, setCurrentVolume])
}

function useHandleVolumeState() {
  const setCurrentVolume = useSetCurrentVolume()
  const currentVolume = useCurrentVolumeValue()
  return {
    setCurrentVolume,
    currentVolume,
  }
}
type ReturnTypeHandleVolumeState = ReturnType<typeof useHandleVolumeState> & {
  readyEvent: YouTubePlayerType | undefined
}
