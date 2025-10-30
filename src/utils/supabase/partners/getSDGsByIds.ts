import { createClient } from '../client'
import { getMappingSDGs } from './getMappingSDGs'

export async function getSDGsByIds(partnerid: number) {
  const supabase = createClient()

  const sdgIds: number[] = []

  const mappings = await getMappingSDGs(partnerid)

  if (mappings) {
    for (const mapping of mappings) {
      sdgIds.push(mapping.sdg_id)
    }
  }

  const { data, error } = await supabase
    .from('sdg')
    .select('*')
    .in('id', sdgIds)

  if (error) {
    console.error('Error fetching SDGs:', error.message)
    throw new Error('Failed to fetch SDGs')
  }

  return data
}
