import { createClient } from '@supabase/supabase-js';

// Kita ambil kuncinya, atau kasih kunci bohongan pas lagi proses 'build' di Netlify biar dia nggak nangis
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pengaman-build.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'pengaman-key-123';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);