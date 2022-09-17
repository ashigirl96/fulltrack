import { usePlaylistTitle } from './usePlaylistTitle'
import type { ArgsPlaylistTitle } from './usePlaylistTitle'
import { EditPlaylistTitleModal } from './EditPlaylistTitleModal'

type Props = ArgsPlaylistTitle
export function PlaylistTitle({ playlist }: Props) {
  const { title, handleClick, isOpenEditor, setIsOpenEditor, playlistId } =
    usePlaylistTitle({ playlist })

  return (
    <>
      <EditPlaylistTitleModal
        title={title}
        isOpenEditor={isOpenEditor}
        setIsOpenEditor={setIsOpenEditor}
        playlistId={playlistId}
      />
      <h1 className="text-3xl my-10">
        <button onClick={handleClick}>{title}</button>
      </h1>
    </>
  )
}
