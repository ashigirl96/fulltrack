import type { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { addDoc, doc, documentId, getDoc } from '@firebase/firestore'
import { firestoreNow } from '@/lib/firestore/playlist'
import { albumCollectionRef } from '@/lib/firestore/album'

import { db } from '@/config/firebase'
import { videoCollectionRef, videoDocRef } from '@/lib/firestore/video'
import { getDocsByIds } from '@/lib/firestore/getDocsByIds'

const AlbumPlaylist: NextPage = () => {
  const [title, setTitle] = useState('')
  const [videoIds, setVideoIds] = useState<string[]>([])
  const [uploadedMessage, setUploadedMessage] = useState<string | null>(null)
  const [_type, setType] = useState<'single' | 'live'>('single')

  const _videoIds = videoIds
    .filter((x) => x)
    .map((x) => doc(db, `videos/${x}`)) as unknown as string[]
  const addPlaylist = useCallback(async () => {
    const thumbnailUrl = (await getDoc(videoDocRef(videoIds[0]))).data()
      ?.thumbnailUrl
    await addDoc(albumCollectionRef, {
      id: documentId(),
      title,
      videoIds: _videoIds,
      thumbnailUrl: thumbnailUrl || '',
      createdAt: firestoreNow(),
      type: _type,
    })
      .then(() =>
        setUploadedMessage(
          `${title} ${JSON.stringify(videoIds[0])}の登録できました`,
        ),
      )
      .catch((reason) => setUploadedMessage(`ERROR ${JSON.stringify(reason)}`))
  }, [_type, _videoIds, title, videoIds])

  const [videoNames, setVideoNames] = useState<string[]>([])
  const confirm = useCallback(async () => {
    const videos = await getDocsByIds(videoCollectionRef, videoIds)
    setVideoNames(videos.map((v) => v.title))
  }, [videoIds])

  return (
    <div className="grid grid-cols-1 gap-y-4 py-4 justify-center">
      <input
        type="text"
        placeholder="Type Title"
        className="input input-bordered input-primary w-full max-w-xl"
        onChangeCapture={(e) => setTitle(e.currentTarget.value)}
        value={title}
      />
      <div className="self-center">Title: {title}</div>
      <input
        type="text"
        placeholder="Type videoIds"
        className="input input-bordered input-primary w-full max-w-xl"
        onChangeCapture={(e) => setVideoIds(e.currentTarget.value.split(','))}
        value={videoIds.join(',')}
      />

      <div className="w-1/2">
        <select
          id="type"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={_type}
          onChange={(e) => setType(e.currentTarget.value as 'live' | 'single')}
        >
          <option value="single">single</option>
          <option value="live">live</option>
        </select>
      </div>
      <div className="self-center">VideoIds: {videoIds.join('/')}</div>
      <button className="btn w-full max-w-xl" onClick={confirm}>
        確認
      </button>
      <button className="btn w-full max-w-xl" onClick={addPlaylist}>
        追加
      </button>
      <div>{uploadedMessage}</div>

      <ul>
        {videoNames.map((name, i) => (
          <li key={`video-name-${i}`}>{name}</li>
        ))}
      </ul>
      <div>type {_type}</div>
    </div>
  )
}

export default AlbumPlaylist
