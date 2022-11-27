import React from 'react'
import { useMediaQuery } from 'react-responsive'

type Props = {
  children: React.ReactElement
}
function Desktop({ children }: Props) {
  const isTablet = useMediaQuery({ minWidth: 768 })
  return isTablet ? children : null
}

function Mobile({ children }: Props) {
  const isMobile = useMediaQuery({ maxWidth: 768 })
  return isMobile ? children : null
}

export const Media = {
  Desktop,
  Mobile,
} as const
