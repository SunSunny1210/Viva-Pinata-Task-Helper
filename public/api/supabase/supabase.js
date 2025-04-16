import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jtmveubzxvvuoihamweo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0bXZldWJ6eHZ2dW9paGFtd2VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0NjM0NzMsImV4cCI6MjA2MDAzOTQ3M30.5A3LewoDi60_3k4ToGekBvm_05T7eddHd7qCm9foii0'

export const supabase = createClient(supabaseUrl, supabaseKey)