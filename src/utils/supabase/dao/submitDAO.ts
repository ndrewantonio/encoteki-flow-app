import { SubmitVoteDto } from '@/types/dao'
import { createClient } from '@/utils/supabase/client'

export async function submitDAO(request: SubmitVoteDto): Promise<boolean> {
  const supabase = createClient()

  const { chain_id, nft_id, dao_id, option_id, isNeutral } = request

  console.log(`chainid: ${chain_id}`)

  try {
    const { error } = await supabase
      .from('mapping_vote')
      .insert([{ chain_id, nft_id, dao_id, option_id, isNeutral }])

    if (error) {
      console.error('Error submit DAO:', error.message)
      throw new Error('Failed to submit DAO')
    }

    return true
  } catch (error) {
    console.error('Unexpected error:', error)
    return false
  }
}
