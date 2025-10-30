import { createClient } from '@/utils/supabase/client'

export async function getMappingSDGs(partnerId: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('mapping_partner_sdg')
    .select('sdg_id')
    .eq('partner_id', partnerId)

  if (error) {
    console.error('Error fetching data:', error.message)
    throw new Error('Failed to fetch mapping SDGs')
  }

  return data
}
