import { ReactElement } from 'react'

type Props = { children: ReactElement }
export function TrackBody({ children }: Props) {
  return (
    <div className="max-h-[2296px]">
      <div className="translate-y-0">{children}</div>
    </div>
  )
}
