import { useMemo } from 'react'
import { ReturnTypeUseIndexSelected } from '../useIndexSelected'

export function useIsSelected(
  index: number,
  indexSelected: ReturnTypeUseIndexSelected['indexSelected'],
) {
  return useMemo(() => indexSelected === index, [index, indexSelected])
}
