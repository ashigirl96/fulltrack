import { YouTubePlayerType } from '@/types'
import {
  useCurrentVolumeValue,
  useSetCurrentVolume,
} from '@/atoms/youtubePlayer'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

export function useHandleVolume(readyEvent: YouTubePlayerType | undefined) {
  const { setCurrentVolume, currentVolume } = useHandleVolumeState()

  // 手動でボリュームを制御する
  const handleInputVolume = useHandleInputVolume({
    readyEvent,
    setCurrentVolume,
  })
  // ミュートの制御
  const [isMuted, setIsMuted] = useState(false)
  const setMute = useCallback(() => setIsMuted(true), [])
  const setUnmute = useCallback(() => setIsMuted(false), [])
  const handleMute = useHandleMute({
    readyEvent,
    setMute,
  })
  // アンミュートの制御
  const handleUnmute = useHandleUnMute({
    readyEvent,
    setUnmute,
  })

  const volume = useMemo(
    () => (isMuted ? 0 : currentVolume),
    [currentVolume, isMuted],
  )

  return {
    volume,
    handleInputVolume,
    handleMute,
    handleUnmute,
    isMuted,
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

type MuteArgs = Pick<ReturnTypeHandleVolumeState, 'readyEvent'> & {
  setMute: () => void
}
function useHandleMute({ readyEvent, setMute }: MuteArgs) {
  return useCallback(async () => {
    if (readyEvent) {
      setMute()
      await readyEvent.mute()
    }
  }, [readyEvent, setMute])
}

type UnMuteArgs = Pick<ReturnTypeHandleVolumeState, 'readyEvent'> & {
  setUnmute: () => void
}
function useHandleUnMute({ readyEvent, setUnmute }: UnMuteArgs) {
  return useCallback(async () => {
    if (readyEvent) {
      setUnmute()
      await readyEvent.unMute()
    }
  }, [readyEvent, setUnmute])
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
