'use client'

import DaoBadge from '@/components/badge/daoBadge'
import { DAOResponse } from '@/types/dao'
import calculateDayDifference from '@/utils/calculateDayDifference'
import { getDAOs } from '@/utils/supabase/dao/getDaos'
import Link from 'next/link'
import Image from 'next/image'
import EmptyBox from '@/assets/dao/empty-box.svg'
import { useEffect, useState } from 'react'
import LoadingSection from '@/components/loading/loadingSection'

export default function DAOList() {
  const [loading, setLoading] = useState(true)
  const [daoList, setDaoList] = useState<DAOResponse[]>([])

  useEffect(() => {
    const fetchDAO = async () => {
      try {
        const daos: DAOResponse[] = await getDAOs()
        setDaoList(daos)
      } catch (error) {
        console.error('Fetch DAO list failed:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDAO()
  }, [])

  return (
    <>
      {loading ? (
        <LoadingSection />
      ) : (
        <>
          {daoList.length > 0 ? (
            <div className="flex flex-col gap-4 tablet:gap-8">
              {daoList.map((dao, index) => {
                return (
                  <Link key={index} href={`/dao/${dao.dao_id}`}>
                    <div className="w-full space-y-1 rounded-2xl border border-white bg-white p-4 transition duration-500 hover:border-primary-green tablet:rounded-[32px] tablet:p-6">
                      <DaoBadge daoType={dao.dao_type} />
                      <h2 className="text-lg font-medium tablet:text-2xl">
                        {dao.dao_name}
                      </h2>
                      <div className="flex justify-between text-sm tablet:text-base">
                        <p>
                          Voting ends in {calculateDayDifference(dao.end_date)}
                          {calculateDayDifference(dao.end_date) > 1
                            ? ' days'
                            : ' day'}
                        </p>
                        <p className="text-neutral-40">
                          Created{' '}
                          {calculateDayDifference(dao.start_date) > 0
                            ? calculateDayDifference(dao.start_date)
                            : ''}
                          {calculateDayDifference(dao.start_date) > 0
                            ? ' days ago'
                            : ' today'}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="h-auto w-[calc(100%-64px)] max-w-[377px] space-y-3 text-center">
                <Image
                  src={EmptyBox}
                  alt="empty"
                  className="mx-auto size-[164px] tablet:size-[256px]"
                />
                <p className="text-xl font-medium tablet:text-2xl">
                  No proposals available
                </p>
                <p className="text-base text-neutral-30 tablet:text-lg">
                  Proposals you can vote for will appear here. Check back later!
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
