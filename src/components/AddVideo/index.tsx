import React from 'react'
import { useAddVideo } from './useAddVideo'
import { getPropsOptions } from '@/lib/youtube'
import YouTube from 'react-youtube'
import { getVideoIdFromUrl } from '@/lib/youtube/getVideoIdFromUrl'
import { secsToHMS } from '@/lib/time'
import { LoginButton } from './LoginButton'

export default function AddVideo() {
  const {
    videoId,
    setVideoId,
    start,
    end,
    handleStateChange,
    setStartTime,
    setEndTime,
    title,
    setTitle,
    originalTitle,
    setOriginalTitle,
    artists,
    setArtists,
    thumbnailUrl,
    addVideo,
    uploadedMessage,
    setUploadedMessage,
    handleReadyEvent,
  } = useAddVideo()

  const opts = getPropsOptions({ start, end, controls: 1 })
  return (
    <div>
      <div className="mt-4 ml-4">
        <LoginButton />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-start gap-x-10">
          <div className="flex flex-col gap-y-2">
            <label className="input-group w-full">
              <span>Youtube URL</span>
              <input
                type="text"
                className="input input-bordered flex-1"
                onChange={(e) =>
                  setVideoId(getVideoIdFromUrl(e.currentTarget.value) || '')
                }
              />
            </label>

            <label className="input-group w-full">
              <span>タイトル</span>
              <input
                type="text"
                className="input input-bordered flex-1"
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </label>

            <label className="input-group w-full">
              <span>オリジナルのタイトル</span>
              <input
                type="text"
                className="input input-bordered flex-1"
                onChange={(e) => setOriginalTitle(e.currentTarget.value)}
              />
            </label>

            <label className="input-group w-full">
              <span>アーティスト名</span>
              <input
                type="text"
                className="input input-bordered flex-1"
                onChange={(e) => setArtists(e.currentTarget.value.split(','))}
              />
            </label>

            <div className="flex gap-x-7">
              <button className="btn" onClick={setStartTime}>
                開始時間セット
              </button>
              <button className="btn" onClick={setEndTime}>
                終了時間セット
              </button>
            </div>

            <div>
              <YouTube
                videoId={videoId}
                opts={opts}
                onStateChange={handleStateChange}
                onReady={handleReadyEvent}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-4 w-80">
            <div>VideoId: {videoId}</div>
            <div>開始時間: {secsToHMS(start || 0)}</div>
            <div>終了時間: {secsToHMS(end || 0)}</div>
            <div>タイトル: {title}</div>
            <div>オリジナルのタイトル: {originalTitle}</div>
            <div>アーティスト名: {artists.join('/')}</div>
            {thumbnailUrl && (
              <div>
                <div>{thumbnailUrl}</div>
                <img src={thumbnailUrl} alt="thumbnail" />
              </div>
            )}
            <div>
              <button className="btn" onClick={addVideo}>
                追加する
              </button>
            </div>
          </div>
        </div>
      </div>
      {uploadedMessage && (
        <div className="toast" onClick={() => setUploadedMessage(null)}>
          <div className="alert alert-info">
            <div>
              <span>{uploadedMessage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
