import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'
import { SpeakerIcon } from '@/components/icons'

type Props = Pick<ReturnTypeOfUseYouTubePlayerComponent, 'handleVolume'>
export function Speaker({ handleVolume }: Props) {
  const { volume, handleInputVolume, handleMute, handleUnmute, isMuted } =
    handleVolume
  return (
    <div className="flex justify-end items-center w-[30%] min-w-[100px]">
      <div className="flex flex-row justify-center items-center gap-x-2">
        <SpeakerIcon
          handleUnmute={handleUnmute}
          handleMute={handleMute}
          isMuted={isMuted}
        />
        <input
          id="steps-range"
          type="range"
          min="0"
          max="100"
          value={volume}
          step="0.1"
          className="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          onInput={handleInputVolume}
        />
      </div>
    </div>
  )
}
