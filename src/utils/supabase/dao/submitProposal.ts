import { SubmitProposalDto } from '@/types/dao'
import { createClient } from '@/utils/supabase/client'

export async function submitProposal(
  request: SubmitProposalDto,
): Promise<number> {
  const supabase = createClient()

  const { dao_name, dao_content, dao_type, end_date, scoring, proposal } =
    request

  try {
    const { data: proposalData, error: proposalError } = await supabase
      .from('proposal')
      .insert({
        name: proposal.name,
        description: proposal.description,
        business_model: proposal.business_model,
        market_opportunity: proposal.market_opportunity,
        competitive_adv: proposal.competitive_adv,
        management_team: proposal.management_team,
        team_cv: proposal.team_cv,
        pitch_deck: proposal.pitch_deck,
        amount: proposal.amount,
        allocation: proposal.allocation,
      })
      .select()
      .single()

    console.dir(proposalData)

    const { data, error } = await supabase
      .from('dao')
      .insert({
        dao_name,
        dao_content,
        dao_type,
        end_date,
        scoring,
        proposal_id: proposalData.id,
      })
      .select()
      .single()

    console.dir(data)

    if (proposalError || error) {
      console.error('Error submit DAO:', proposalError?.message)
      throw new Error('Failed to submit DAO')
    }

    return data.dao_id
  } catch (error) {
    console.error('Unexpected error:', error)
    return 0
  }
}
