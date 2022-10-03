import React, { useCallback } from 'react'

export function useEnterKey(callback: () => void) {
  return useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        await callback()
      }
    },
    [callback],
  )
}

export function useOnChange(callback: (x: string) => void) {
  return useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      callback(e.currentTarget.value)
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
