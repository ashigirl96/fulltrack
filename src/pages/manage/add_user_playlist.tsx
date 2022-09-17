import type { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { addDoc, collection, doc } from '@firebase/firestore'
import { db } from '@/config/firebase'

const AddUserPlaylist: NextPage = () => {
  const [userId, setUserId] = useState('')
  const [title, setTitle] = useState('')
  const [videoIds, setVideoIds] = useState<string[]>([])
  const [uploadedMessage, setUploadedMessage] = useState<string | null>(null)

  const _videoIds = videoIds
    .filter((x) => x)
    .map((x) => doc(db, `videos/${x}`)) as unknown as string[]
  const addPlaylist = useCallback(async () => {
    const playlists = collection(db, 'users', userId, 'playlists')
    await addDoc(playlists, {
      title,
      videoIds: _videoIds,
    })
      .then(() => setUploadedMessage(`${title}の登録できました`))
      .catch((reason) => setUploadedMessage(`ERROR ${JSON.stringify(reason)}`))
  }, [_videoIds, title])

  return (
    <div className="grid grid-cols-1 gap-y-4 py-4 justify-center">
      <input
        type="text"
        placeholder="Type UserId"
        className="input input-bordered input-primary w-full max-w-xl"
        onChangeCapture={(e) => setUserId(e.currentTarget.value)}
        value={userId}
      />
      <div className="self-center">UserId: {userId}</div>
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
      <button className="btn w-full max-w-xl" onClick={addPlaylist}>
        追加
      </button>
      <div>{uploadedMessage}</div>
    </div>
  )
}

export default AddUserPlaylist
