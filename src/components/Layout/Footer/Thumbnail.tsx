import { useCurrentVideoValue } from '@/atoms/youtubePlayer'
import { Artists } from '@/components/shared/Artists'

export function Thumbnail() {
  const currentVideo = useCurrentVideoValue()
  if (!currentVideo) {
    return <div className="w-[30%] min-w-[100px]" />
  }
  const { thumbnailUrl, artists, title, originalTitle } = currentVideo

  return (
    <div className="flex justify-start items-center w-[30%] min-w-[100px]">
      <div className="flex justify-center items-center gap-x-2.5">
        <img
          src={thumbnailUrl}
          className="object-cover h-16 w-16"
          alt={`thumbnail-${thumbnailUrl}`}
        />
        <div className="flex flex-col gap-y-1">
          <div className="font-medium text-primary">
            <a className="hover:underline" href={originalTitle}>
              {title}
            </a>
          </div>
          <div className="group-hover:text-white text-xs text-accent-content">
            <Artists artistIds={artists} />
          </div>
        </div>
      </div>
    </div>
  )
}
