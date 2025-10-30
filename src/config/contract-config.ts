import { tsbd } from './abis/tsbd'
import { daoImpl } from './abis/daoImpl'
import { bpImpl } from './abis/bpImpl'
import { factory } from './abis/factory'
import { Hex } from 'viem'

const tsbdAddress: Hex = (process.env.NEXT_PUBLIC_TSBD_CA as Hex) ?? '0x00'
const daoImplAddress: Hex =
  (process.env.NEXT_PUBLIC_DAO_IMPL_CA as Hex) ?? '0x00'
const bpImplAddress: Hex = (process.env.NEXT_PUBLIC_BP_IMPL_CA as Hex) ?? '0x00'
const factoryAddress: Hex =
  (process.env.NEXT_PUBLIC_FACTORY_CA as Hex) ?? '0x00'

const contractConfig = {
  tsbd,
  tsbdAddress,
  daoImpl,
  daoImplAddress,
  bpImpl,
  bpImplAddress,
  factory,
  factoryAddress,
} as const

export default contractConfig
