import { createClient } from '@/utils/supabase/client'

export async function getDaoById(daoId: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('dao')
    .select('*')
    .eq('dao_id', daoId)
    .single()

  if (error) {
    console.error(`Error fetching DAO Id ${daoId}:`, error.message)
    throw new Error('Failed to fetch DAO')
  }

  return data
}
