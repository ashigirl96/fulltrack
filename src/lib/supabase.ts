import { createClient } from '@supabase/supabase-js'
import { required } from '@/lib/envs'

const supabaseUrl = required(process.env.NEXT_PUBLIC_SUPABASE_URL)
const supabaseKey = required(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '')
