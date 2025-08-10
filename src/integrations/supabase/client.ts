
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://cquqzkelvvxqwnjkvzta.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdXF6a2VsdnZ4cXduamt2enRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MDc0MTIsImV4cCI6MjA3MDM4MzQxMn0.65EmBiyczaD8DWK0YBiLtdWzMGz-mPCpf5ggg9oC6dA'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
