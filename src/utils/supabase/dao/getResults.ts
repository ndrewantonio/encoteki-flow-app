import { OptionsResponse } from '@/types/dao'
import { createClient } from '@/utils/supabase/client'

export async function getDaoResults(daoId: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('mapping_vote')
    .select('option_id, dao_id, option!left(option_name)')
    .eq('dao_id', daoId)
    .eq('isNeutral', false)

  if (error) {
    console.error('Error fetching DAO result:', error.message)
    throw new Error('Failed to fetch DAO result')
  }

  // Group by option_id and count
  const byOption = new Map<number, OptionsResponse>()

  for (const row of data ?? []) {
    const id = row.option_id
    const name = ''
    const dao = row.dao_id ?? daoId

    const curr = byOption.get(id)
    if (curr && curr.votes !== undefined) {
      curr.votes += 1
    } else {
      byOption.set(id, {
        option_id: id,
        option_name: name,
        dao_id: dao,
        votes: 1,
      })
    }
  }

  // Return as array, sorted by votes desc then option_id asc
  return Array.from(byOption.values()).sort(
    (a, b) => (b.votes ?? 0) - (a.votes ?? 0) || a.option_id - b.option_id,
  )
}
