import { YouTubePlayerType } from '@/types'
import {
  useCurrentVolumeValue,
  useSetCurrentVolume,
} from '@/atoms/youtubePlayer'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

export function useHandleVolume(readyEvent: YouTubePlayerType | undefined) {
  const { setCurrentVolume, currentVolume } = useHandleVolumeState()

  const { isMuted, setMute, setUnmute } = useSetMute({ currentVolume })
  // 手動でボリュームを制御する
  const handleInputVolume = useHandleInputVolume({
    readyEvent,
    setCurrentVolume,
    setUnmute,
  })

  // ミュートの制御
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

type SetMuteArgs = Pick<ReturnTypeHandleVolumeState, 'currentVolume'>
function useSetMute({ currentVolume }: SetMuteArgs) {
  const [_isMuted, setIsMuted] = useState(false)
  const setMute = useCallback(() => setIsMuted(true), [])
  const setUnmute = useCallback(() => setIsMuted(false), [])
  const isMuted = useMemo(
    () => _isMuted || currentVolume === 0,
    [_isMuted, currentVolume],
  )
  return {
    isMuted,
    setMute,
    setUnmute,
  }
}
type ReturnMute = ReturnType<typeof useSetMute>

type InputVolumeArgs = Pick<
  ReturnTypeHandleVolumeState,
  'readyEvent' | 'setCurrentVolume'
> & {
  setUnmute: () => void
}
function useHandleInputVolume({
  readyEvent,
  setCurrentVolume,
  setUnmute,
}: InputVolumeArgs) {
  return useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (readyEvent) {
        setUnmute()
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

type MuteArgs = Pick<ReturnTypeHandleVolumeState, 'readyEvent'> &
  Pick<ReturnMute, 'setMute'>
function useHandleMute({ readyEvent, setMute }: MuteArgs) {
  return useCallback(async () => {
    if (readyEvent) {
      setMute()
      await readyEvent.mute()
    }
  }, [readyEvent, setMute])
}

type UnMuteArgs = Pick<ReturnTypeHandleVolumeState, 'readyEvent'> &
  Pick<ReturnMute, 'setUnmute'>
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
