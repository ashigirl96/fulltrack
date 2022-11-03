import React, { useCallback } from 'react'

export function useEnterKey(callback: (x: string) => Promise<void>) {
  return useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation()
      if (e.key === 'Enter') {
        await callback(e.currentTarget.value)
      }
    },
    [callback],
  )
}

export function useOnFocus() {
  return useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => e.currentTarget.select(),
    [],
  )
}
