import React, {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'

type DaoContextType = {
  nftIdsForWallet: Array<number>
  setnftIdsForWallet: Dispatch<SetStateAction<Array<number>>>
  voteSuccess: boolean
  setVoteSuccess: Dispatch<SetStateAction<boolean>>
}

const DaoContext = createContext<DaoContextType | undefined>(undefined)

export const DaoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [nftIdsForWallet, setnftIdsForWallet] = useState<Array<number>>([])
  const [voteSuccess, setVoteSuccess] = useState(false)

  return (
    <DaoContext.Provider
      value={{
        nftIdsForWallet,
        setnftIdsForWallet,
        voteSuccess,
        setVoteSuccess,
      }}
    >
      {children}
    </DaoContext.Provider>
  )
}

export const useDaoCtx = () => {
  const context = useContext(DaoContext)
  if (!context) {
    throw new Error('useDao must be used within a DaoProvider')
  }
  return context
}
