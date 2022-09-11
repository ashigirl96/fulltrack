import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'

type Props = {
  handleVolume: ReturnTypeOfUseYouTubePlayerComponent['handleVolume']
}
export function Speaker({ handleVolume }: Props) {
  const { currentVolume, handleInputVolume, handleMute, handleUnmute } =
    handleVolume
  return (
    <div className="flex justify-end items-center w-[30%] min-w-[100px]">
      <div className="flex flex-row justify-center items-center gap-x-2">
        {currentVolume === 0 ? (
          <SpeakerXMarkIcon
            className="h-6 w-6 text-black-300 cursor-pointer"
            onClick={handleUnmute}
          />
        ) : (
          <SpeakerWaveIcon
            className="h-6 w-6 text-black-300 cursor-pointer"
            onClick={handleMute}
          />
        )}
        <input
          id="steps-range"
          type="range"
          min="0"
          max="100"
          defaultValue={currentVolume}
          step="0.1"
          className="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          onChange={handleInputVolume}
        />
      </div>
    </div>
  )
}
