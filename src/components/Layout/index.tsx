import React from 'react'
import { Border } from './Border'
import { useMenuWidth } from './useMenuWidth'
import { Menu } from './Menu'

type LayoutProps = {
  children: React.ReactNode
}
export function Layout({ children }: LayoutProps) {
  const { width, dragging, onPointerMove, onPointerUp, onPointerDown } =
    useMenuWidth()

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <Menu width={width.x} />

        <Border
          width={width}
          dragging={dragging}
          onPointerUp={onPointerUp}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
        />

        <div className="bg-green-50 flex-1">{children}</div>
      </div>
      <div className="h-[10%] bg-red-100">Footer</div>
    </div>
  )
}
