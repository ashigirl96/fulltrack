import React from 'react'
import { Border } from './Border'
import { useMenuWidth } from './useMenuWidth'
import { Menu } from './Menu'
import { Footer } from './Footer'

type LayoutProps = {
  children: React.ReactNode
}
export function Layout({ children }: LayoutProps) {
  const { width, dragging, onPointerMove, onPointerUp, onPointerDown } =
    useMenuWidth()

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 h-[90%]">
        <Menu width={width.x} />

        <Border
          width={width}
          dragging={dragging}
          onPointerUp={onPointerUp}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
        />

        <div className="bg-green-50 flex-1 overflow-y-scroll">{children}</div>
      </div>
      <Footer />
    </div>
  )
}
