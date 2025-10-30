import { createClient } from '../server'

export async function getFamily() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('family')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching family:', error.message)
    throw new Error('Failed to fetch family')
  }

  return data
}
