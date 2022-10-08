import { useState } from 'react'

export function useIndexSelected() {
  const [indexSelected, setIndexSelected] = useState<number | null>(null)
  return {
    indexSelected,
    setIndexSelected,
  }
}

export type ReturnTypeUseIndexSelected = ReturnType<typeof useIndexSelected>
