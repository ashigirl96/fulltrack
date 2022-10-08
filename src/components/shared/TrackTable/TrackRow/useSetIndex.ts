import { useCallback } from 'react'
import { ReturnTypeUseIndexSelected } from '../useIndexSelected'

export function useSetIndex(
  index: number,
  setIndexSelected: ReturnTypeUseIndexSelected['setIndexSelected'],
) {
  return useCallback(() => {
    setIndexSelected(index)
  }, [index, setIndexSelected])
}
