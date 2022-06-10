import { formatBalance } from '@polkadot/util'
import { useSubstrateState } from './SubstrateContext'  
const Utils = {
  paramConversion: {
    num: [
      'Compact<Balance>',
      'BalanceOf',
      'u8',
      'u16',
      'u32',
      'u64',
      'u128',
      'i8',
      'i16',
      'i32',
      'i64',
      'i128',
    ],
  },
}

const FetchBalance = async (address) => {
  const { api, currentAccount } = useSubstrateState()
  if (!api || !address) {
      return '0.00 DOT'
  }
  const registry = api.registry
  const unit = registry.chainTokens[0].toUpperCase()
  const decimal =  registry.chainDecimals[0]
  formatBalance.setDefaults(
    {
      'decimals': decimal,
      'unit': unit
    }
  )
  const res = await api.query.system.account(address)
  return formatBalance(res.data.free)
}

export {Utils, FetchBalance}
