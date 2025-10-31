'use client'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { Input } from '@heroui/input'
import { Textarea } from '@heroui/input'
import { Button, Form } from '@heroui/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GoogleGenAI, Type } from '@google/genai'
import InfoTip from '@/components/shared/infoTip'
import { ProposalDto, SubmitProposalDto } from '../../../types/dao'
import { submitProposal } from '@/utils/supabase/dao/submitProposal'
import { useAccount, useReadContract } from 'wagmi'
import contractConfig from '@/config/contract-config'

interface ProposalFormData {
  projectname?: string
  description?: string
  businessmodel?: string
  marketopportunity?: string
  competitiveadvantage?: string
  managementteam?: string
  teamcv?: string
  pitchdeck?: string
  currency?: string
  amount?: number
  allocation?: number
}

export default function CreateForm() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const businessproposal = [
    {
      title: 'Business Model',
      name: 'businessmodel',
      description:
        'Score based on monetization clarity, scalability, unit economics, and long-term profitability',
    },
    {
      title: 'Market Opportunity',
      name: 'marketopportunity',
      description:
        'Score based on TAM/SAM size, market growth, validation, pricing power  ',
    },
    {
      title: 'Competitive Advantage',
      name: 'competitiveadvantage',
      description:
        'Score based on defensibility, uniqueness, barriers, and sustainability',
    },
    {
      title: 'Management Team',
      name: 'managementteam',
      description:
        'Score based on expertise, track record, execution capability',
    },
  ]

  const rules = `As an expert venture analyst, score these factors (1-10) using ONLY provided data. Apply strict criteria below as scoring rules:
    Business model: ${businessproposal[0].description}
    Market opportunity: ${businessproposal[1].description}
    Competitive advantage: ${businessproposal[2].description}
    Management team: ${businessproposal[3].description}
    Rationale max 100 char per factors
    Overall average of the four scoring factors
    Scale as below:
    10: Exceptional (no weaknesses)
    7-9: Strong (minor gaps)
    4-6: moderate (material risks)
    1-3: weak (critical flaws)`

  const { isConnected, address } = useAccount()

  // Get nft id of address wallet
  const { data: count } = useReadContract({
    abi: contractConfig.tsbd,
    address: contractConfig.tsbdAddress,
    functionName: 'walletOfOwner',
    args: [address ?? '0x1c3294B823cF9ac62940c64E16bce6ebAf7dca5B'],
  })

  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const data = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as ProposalFormData

    try {
      const prompt = `${rules}
      Business model: ${data.businessmodel}
      Market opportunity: ${data.marketopportunity}
      Competitive advantage: ${data.competitiveadvantage}
      Management team: ${data.managementteam}
      just give result based on the config of structured output`

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                scoring: {
                  type: Type.NUMBER,
                },
                rationale: {
                  type: Type.STRING,
                },
              },
              propertyOrdering: ['scoring', 'rationale'],
            },
          },
        },
      })

      const twoWeeksLater = new Date()
      twoWeeksLater.setDate(twoWeeksLater.getDate() + 14)

      const proposalDto: ProposalDto = {
        name: data.projectname ?? '',
        description: data.description ?? '',
        business_model: data.businessmodel ?? '',
        market_opportunity: data.marketopportunity ?? '',
        competitive_adv: data.competitiveadvantage ?? '',
        management_team: data.managementteam ?? '',
        team_cv: data.teamcv ?? '',
        pitch_deck: data.pitchdeck ?? '',
        amount: data.amount ?? 0,
        allocation: data.allocation ?? 0,
      }

      const req: SubmitProposalDto = {
        dao_name: data.projectname ?? '',
        dao_content: data.description ?? '',
        dao_type: 3,
        end_date: twoWeeksLater.toISOString(),
        scoring: response.text ?? '',
        proposal: proposalDto,
      }

      const daoId: number = await submitProposal(req)
      router.push(`/dao/${daoId}`)
    } catch (error) {
      console.error('API call failed:', error)
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto my-16 min-h-screen w-[calc(100%-32px)] max-w-[912px] space-y-12 tablet:my-32">
        {/* Header */}
        <header className="space-y-8">
          <div className="space-y-[18px]">
            <h1 className="text-3xl font-medium tablet:text-5xl">
              Business Proposal
            </h1>
            <p className="text-base tablet:text-lg">
              Create your proposal to be funded by the Encoteki DAO.
            </p>
          </div>
        </header>

        <Form
          className="flex flex-col gap-6 text-xl tablet:gap-12"
          onSubmit={onSubmit}
        >
          <Input
            isRequired
            isClearable
            fullWidth
            size="lg"
            className="text-xl"
            errorMessage="Please enter a valid email"
            isInvalid={false}
            label="Project Name"
            type="text"
            variant="bordered"
            labelPlacement="inside"
            name="projectname"
          />
          <Textarea
            isRequired
            isClearable
            fullWidth
            size="lg"
            label="Description"
            // color="success"
            variant="bordered"
            // eslint-disable-next-line no-console
            onClear={() => console.log('textarea cleared')}
            name="description"
            maxLength={100}
          />

          {businessproposal.map((item, index) => {
            return (
              <div key={index} className="w-full space-y-4">
                <div className="flex gap-4 align-middle">
                  <h1 className="text-xl font-medium tablet:text-2xl">
                    {item.title}
                  </h1>
                  <InfoTip text={item.description} />
                </div>
                <Textarea
                  isRequired
                  isClearable
                  size="lg"
                  fullWidth
                  // color="success"
                  variant="bordered"
                  // eslint-disable-next-line no-console
                  onClear={() => console.log('textarea cleared')}
                  name={item.name}
                  maxLength={1000}
                />
              </div>
            )
          })}

          <div className="flex w-full justify-between gap-8">
            <Input
              size="lg"
              isRequired
              fullWidth={true}
              className="text-xl"
              errorMessage="Please enter a valid URL"
              isInvalid={false}
              label="Team CV"
              type="url"
              variant="bordered"
              labelPlacement="inside"
              isClearable
              name="teamcv"
              description="Submit link."
            />
            <Input
              size="lg"
              isRequired
              fullWidth
              className="text-xl"
              errorMessage="Please enter a valid URL"
              isInvalid={false}
              label="Pitch Deck"
              type="url"
              variant="bordered"
              labelPlacement="inside"
              isClearable
              name="pitchdeck"
              description="Submit link."
            />
          </div>

          <div className="flex w-full justify-between gap-4">
            <Input
              isRequired
              name="amount"
              endContent={
                <div className="flex items-center">
                  <label className="sr-only text-xl" htmlFor="currency">
                    Currency
                  </label>
                  <select
                    className="border-0 bg-transparent text-default-400 outline-none text-small"
                    id="currency"
                    name="currency"
                  >
                    <option>USDT</option>
                    <option>IDRX</option>
                  </select>
                </div>
              }
              className=""
              label="Amount Requested"
              labelPlacement="inside"
              size="lg"
              type="number"
            />

            <Input
              size="lg"
              isRequired
              fullWidth
              className="max-w-xs text-xl"
              errorMessage="Please enter a valid URL"
              isInvalid={false}
              label="Allocation Percentage"
              type="number"
              variant="bordered"
              labelPlacement="inside"
              isClearable
              name="allocation"
              description="Allocation percentage of the total amount requested."
            />
          </div>

          <Button
            disabled={!isConnected || !count}
            className={`${!isConnected || !count ? 'bg-gray-400' : 'bg-primary-green'} text-white`}
            type="submit"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      </main>
      <Footer />
    </>
  )
}
