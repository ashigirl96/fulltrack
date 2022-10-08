import type { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { addDoc, doc, documentId, getDoc } from '@firebase/firestore'
import { firestoreNow, playlistCollectionRef } from '@/lib/firestore/playlist'
import { db } from '@/config/firebase'
import { videoCollectionRef, videoDocRef } from '@/lib/firestore/video'
import { getDocsByIds } from '@/lib/firestore/getDocsByIds'

const AddOfficialPlaylist: NextPage = () => {
  const [title, setTitle] = useState('')
  const [videoIds, setVideoIds] = useState<string[]>([])
  const [uploadedMessage, setUploadedMessage] = useState<string | null>(null)

  const _videoIds = videoIds
    .filter((x) => x)
    .map((x) => doc(db, `videos/${x}`)) as unknown as string[]
  const addPlaylist = useCallback(async () => {
    const thumbnailUrl = (await getDoc(videoDocRef(videoIds[0]))).data()
      ?.thumbnailUrl
    await addDoc(playlistCollectionRef, {
      id: documentId(),
      title,
      videoIds: _videoIds,
      thumbnailUrl: thumbnailUrl || '',
      createdAt: firestoreNow(),
    })
      .then(() =>
        setUploadedMessage(
          `${title} ${JSON.stringify(videoIds[0])}の登録できました`,
        ),
      )
      .catch((reason) => setUploadedMessage(`ERROR ${JSON.stringify(reason)}`))
  }, [_videoIds, title, videoIds])

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
    </div>
  )
}

export default AddOfficialPlaylist
