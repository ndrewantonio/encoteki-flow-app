import { Hex } from 'viem'

export interface DAOResponse {
  dao_id: number
  dao_name: string
  dao_content: string
  dao_type: number
  start_date: string
  end_date: string
  proposal_id: number
  scoring: string
  id: number
  address: Hex
}

export interface OptionsResponse {
  option_id: number
  option_name: string
  dao_id: number
  votes: number
}

export interface SubmitVoteDto {
  chain_id?: number
  nft_id: number
  dao_id: number
  option_id?: number
  isNeutral: boolean
}

export interface ProposalDto {
  name: string
  description: string
  business_model: string
  market_opportunity: string
  competitive_adv: string
  management_team: string
  team_cv: string
  pitch_deck: string
  amount: number
  allocation: number
}

export interface SubmitProposalDto {
  dao_name: string
  dao_content: string
  dao_type: number
  end_date: string
  scoring: string
  proposal: ProposalDto
}
