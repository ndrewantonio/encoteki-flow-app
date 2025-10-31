import { createClient } from '@/utils/supabase/client'

export async function getUsedNFTId(
  daoId: number,
  walletOfOwner: Array<number>,
  chainId: number,
) {
  const supabase = createClient()

  // Get data of NFT Id that has vote
  const { data: hasVoteNfts, error } = await supabase
    .from('mapping_vote_flow')
    .select('nft_id')
    .eq('dao_id', daoId)
    .eq('chain_id', chainId)
    .in('nft_id', walletOfOwner.length > 0 ? walletOfOwner : [])

  if (error) {
    console.error(`Error Get Votes:`, error.message)
    throw new Error('Failed to fetch mapping vote')
  }

  return hasVoteNfts
}
