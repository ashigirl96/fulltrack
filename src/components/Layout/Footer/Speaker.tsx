import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline'
import { ReturnTypeOfUseYouTubePlayerComponent } from '@/components/shared/YouTubePlayer'

type Props = {
  handleVolumeWithValue: ReturnTypeOfUseYouTubePlayerComponent['handleVolumeWithValue']
}
export function Speaker({ handleVolumeWithValue }: Props) {
  const [volume, setVolume, setMute, setUnmute] = handleVolumeWithValue
  return (
    <div className="flex justify-center items-center gap-x-2">
      {volume === 0 ? (
        <SpeakerXMarkIcon
          className="h-6 w-6 text-black-300 cursor-pointer"
          onClick={setUnmute}
        />
      ) : (
        <SpeakerWaveIcon
          className="h-6 w-6 text-black-300 cursor-pointer"
          onClick={setMute}
        />
      )}
      <input
        id="steps-range"
        type="range"
        min="0"
        max="100"
        defaultValue={volume}
        step="0.1"
        className="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        onChange={setVolume}
      />
    </div>
  )
}
