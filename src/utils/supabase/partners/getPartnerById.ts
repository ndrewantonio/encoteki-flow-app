import { createClient } from '../client'

export async function getPartnerById(partnerId: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('id', partnerId)
    .single()

  if (error) {
    console.error(`Error fetching Partner Id ${partnerId}:`, error.message)
    throw new Error('Failed to fetch Partner')
  }

  return data
}
