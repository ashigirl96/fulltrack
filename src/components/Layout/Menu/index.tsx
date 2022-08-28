type Props = {
  width: number
}
export function Menu({ width }: Props) {
  return (
    <div className="flex-shrink" style={{ width }}>
      <div>Home</div>
    </div>
  )
}
