import { usePlaylistTitle } from './usePlaylistTitle'
import type { ArgsPlaylistTitle } from './usePlaylistTitle'
import { EditPlaylistTitleModal } from './EditPlaylistTitleModal'

type Props = ArgsPlaylistTitle
export function PlaylistTitle({ playlist }: Props) {
  const { title, handleClick, isOpenEditor, setIsOpenEditor, playlistId } =
    usePlaylistTitle({ playlist })

  if (playlist.isOfficial) {
    return <h1 className="text-3xl cursor-default">{title}</h1>
  }

  return (
    <>
      <EditPlaylistTitleModal
        title={title}
        isOpenEditor={isOpenEditor}
        setIsOpenEditor={setIsOpenEditor}
        playlistId={playlistId}
      />
      <h1 className="text-3xl">
        <button onClick={handleClick}>{title}</button>
      </h1>
    </>
  )
}
