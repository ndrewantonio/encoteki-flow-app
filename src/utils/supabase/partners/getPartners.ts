import { createClient } from '../server'

export async function getPartners() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching partners:', error.message)
    throw new Error('Failed to fetch partners')
  }

  return data
}
