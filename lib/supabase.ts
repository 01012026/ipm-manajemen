import { createClient } from '@supabase/supabase-js'

// Tarik kunci rahasia dari Netlify (Environment Variables)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Bikin jembatan ke database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)