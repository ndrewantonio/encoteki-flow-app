import { DaoType } from '@/enums/daoType'

export default function DaoBadge({ daoType }: { daoType: number }) {
  const theme: Record<number, string> = {
    [DaoType.proposal]: 'bg-brown-10 text-brown-90',
    [DaoType.pod]: 'bg-blue-10 text-blue-90',
    [DaoType.business]: 'bg-green-10 text-green-90',
  }

  const text: Record<number, string> = {
    [DaoType.proposal]: 'Proposal',
    [DaoType.pod]: 'Proof of donation',
    [DaoType.business]: 'Business Proposal',
  }

  return (
    <div
      className={`w-fit rounded-full px-2 py-1 text-xs tablet:text-sm ${theme[daoType]}`}
    >
      {text[daoType]}
    </div>
  )
}
