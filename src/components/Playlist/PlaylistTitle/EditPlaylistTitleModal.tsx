import { ReturnTypePlaylistTitle } from './usePlaylistTitle'
import { useCallback, useEffect, useRef, useState } from 'react'
import { userPlaylistDocRef } from '@/lib/firestore/userPlaylist'
import { useGetCurrentUserId } from '@/hooks/firebaseAuth'
import { updateDoc } from '@firebase/firestore'

type HeaderProps = Pick<Props, 'setIsOpenEditor'>
function Header({ setIsOpenEditor }: HeaderProps) {
  return (
    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
      <h3 className="text-2xl font-semibold">タイトルを編集する</h3>
      <button
        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
        onClick={() => setIsOpenEditor(false)}
      >
        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
          ×
        </span>
      </button>
    </div>
  )
}

type BodyProps = Pick<ReturnTypeEdit, 'titleRef' | 'setTitle' | 'title'>
function Body({ setTitle, titleRef, title }: BodyProps) {
  // const isSelected = useMemo(() => document.activeElement === ref.current, [])
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus()
    }
  }, [titleRef])

  return (
    <div className="p-6 flex-auto">
      <div className="relative">
        <label
          className={`text-xs font-bold before:content-['Name'] absolute -top-2 left-3`}
        />
        <input
          ref={titleRef}
          defaultValue={title}
          className="border border-gray-500"
          onFocus={(e) => e.currentTarget.select()}
          onChangeCapture={(e) => setTitle(e.currentTarget.value)}
        />
      </div>
    </div>
  )
}

type FooterProps = Pick<ReturnTypeEdit, 'saveDetails'>
function Footer({ saveDetails }: FooterProps) {
  return (
    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
      <button
        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={saveDetails}
      >
        保存
      </button>
    </div>
  )
}

type Props = Pick<
  ReturnTypePlaylistTitle,
  'isOpenEditor' | 'setIsOpenEditor' | 'title' | 'playlistId'
>
export function EditPlaylistTitleModal({
  isOpenEditor,
  setIsOpenEditor,
  title: original,
  playlistId,
}: Props) {
  const { setTitle, title, titleRef, saveDetails } = useEditPlaylistTitleModal({
    title: original,
    playlistId,
    setIsOpenEditor,
  })
  if (!isOpenEditor) {
    return null
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <Header setIsOpenEditor={setIsOpenEditor} />
            <Body title={title} setTitle={setTitle} titleRef={titleRef} />
            <Footer saveDetails={saveDetails} />
          </div>
        </div>
      </div>
      <div
        className="opacity-50 fixed inset-0 z-40 bg-black"
        onClick={() => setIsOpenEditor(false)}
      ></div>
    </>
  )
}

type Args = Pick<Props, 'title' | 'playlistId' | 'setIsOpenEditor'>
function useEditPlaylistTitleModal({
  title: original,
  playlistId,
  setIsOpenEditor,
}: Args) {
  const [title, setTitle] = useState(original)
  const titleRef = useRef<HTMLInputElement>(null)

  const currentUserId = useGetCurrentUserId() || ''
  const saveDetails = useCallback(async () => {
    if (currentUserId) {
      const playlistRef = userPlaylistDocRef(currentUserId, playlistId)
      await updateDoc(playlistRef, { title })
      setIsOpenEditor(false)
    }
  }, [currentUserId, playlistId, setIsOpenEditor, title])

  return {
    title,
    setTitle,
    titleRef,
    saveDetails,
  }
}

type ReturnTypeEdit = ReturnType<typeof useEditPlaylistTitleModal>
