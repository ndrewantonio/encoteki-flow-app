import { createClient } from '@/utils/supabase/client'

export async function getDAOs() {
  const supabase = createClient()

  const { data, error } = await supabase.from('dao_flow').select('*')

  if (error) {
    console.error('Error fetching data:', error.message)
    throw new Error('Failed to fetch DAOs')
  }

  return data
}
