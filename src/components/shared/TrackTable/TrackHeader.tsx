export function TrackHeader() {
  return (
    <div
      className="mb-[16] sticky top-0 bg-primary text-primary-content z-10"
      tabIndex={2}
    >
      <div className="grid-playlist">
        <div className="justify-self-end">#</div>
        <div>タイトル</div>
        <div className="md-hidden">オリジナルタイトル</div>
        <div className="justify-self-end">再生時間</div>
      </div>
    </div>
  )
}
