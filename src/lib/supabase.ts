import { createClient } from '@supabase/supabase-js'
import { required } from '@/lib/envs'
import { useCallback } from 'react'

const supabaseUrl = required(process.env.NEXT_PUBLIC_SUPABASE_URL)
const supabaseKey = required(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '')

export async function getGoogleUser() {
  return await supabase.auth.getUser()
}

export async function getSession() {
  return await supabase.auth.getSession()
}

export function useSignInWithGoogle() {
  return useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    return {
      data,
      error,
    }
  }, [])
}
