import { createClient } from '@/utils/supabase/client'

export async function getDaoOptions(daoId: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('option')
    .select('*')
    .eq('dao_id', daoId)
    .neq('option_name', 'Neutral')

  if (error) {
    console.error('Error fetching DAO Options:', error.message)
    throw new Error('Failed to fetch DAO Options')
  }

  return data
}
