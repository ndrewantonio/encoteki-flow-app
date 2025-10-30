import { createClient } from '@/utils/supabase/client'

export async function getProposal(proposal_id: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('proposal')
    .select('*')
    .eq('id', proposal_id)
    .single()

  if (error) {
    console.error(`Error fetching Proposal Id ${proposal_id}:`, error.message)
    throw new Error('Failed to fetch DAO')
  }

  return data
}
