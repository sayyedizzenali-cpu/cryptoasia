import { getCoinDetail, getExchangesByCountry } from '@/lib/coingecko'
import { ASIA_COUNTRIES } from '@/lib/coingecko'
import Link from 'next/link'

export const revalidate = 3600 // ISR revalidate every hour
export const dynamicParams = true // Enable ISR for all combinations

// Top 50 coins x 15 Asian countries for static generation
const TOP_50_COINS = [
  'bitcoin', 'ethereum', 'tether', 'binance-coin', 'solana', 'xrp', 'usd-coin',
  'cardano', 'avalanche-2', 'dogecoin', 'polkadot-new', 'tron', 'chainlink',
  'polygon-ecosystem-token', 'uniswap', 'litecoin', 'ethereum-classic', 'stellar',
  'filecoin', 'cosmos', 'near', 'algorand', 'vechain', 'internet-computer',
  'the-sandbox', 'flow', 'aave', 'tezos', 'theta-token', 'helium',
  'ftx-token', 'elrond-erd-2', 'compound', 'wrapped-bitcoin', 'dash',
  'kava', 'pancakeswap-token', 'maker', 'eos', 'curve-dao-token',
  'decentraland', 'iota', 'neo', 'zcash', 'basic-attention-token',
  'quant-network', 'arweave', 'waves', 'holo', 'klay-token'
]





export async function generateStaticParams() {
  return [
    {       coin: 'bitcoin',       country: 'pakistan' },
    {       coin: 'bitcoin',       country: 'india' },
    {       coin: 'bitcoin',       country: 'indonesia' },
    {       coin: 'bitcoin',       country: 'philippines' },
    {       coin: 'bitcoin',       country: 'bangladesh' },
    {       coin: 'bitcoin',       country: 'malaysia' },
    {       coin: 'bitcoin',       country: 'vietnam' },
    {       coin: 'bitcoin',       country: 'thailand' },
    {       coin: 'bitcoin',       country: 'south-korea' },
    {       coin: 'bitcoin',       country: 'singapore' },
    {       coin: 'bitcoin',       country: 'uae' },
    {       coin: 'bitcoin',       country: 'saudi-arabia' },
    {       coin: 'bitcoin',       country: 'sri-lanka' },
    {       coin: 'bitcoin',       country: 'nepal' },
    {       coin: 'bitcoin',       country: 'japan' },
    {       coin: 'bitcoin',       country: 'china' },
    {       coin: 'bitcoin',       country: 'myanmar' },
    {       coin: 'bitcoin',       country: 'cambodia' },
    {       coin: 'bitcoin',       country: 'laos' },
    {       coin: 'bitcoin',       country: 'mongolia' },
    {       coin: 'ethereum',       country: 'pakistan' },
    {       coin: 'ethereum',       country: 'india' },
    {       coin: 'ethereum',       country: 'indonesia' },
    {       coin: 'ethereum',       country: 'philippines' },
    {       coin: 'ethereum',       country: 'bangladesh' },
    {       coin: 'ethereum',       country: 'malaysia' },
    {       coin: 'ethereum',       country: 'vietnam' },
    {       coin: 'ethereum',       country: 'thailand' },
    {       coin: 'ethereum',       country: 'south-korea' },
    {       coin: 'ethereum',       country: 'singapore' },
    {       coin: 'ethereum',       country: 'uae' },
    {       coin: 'ethereum',       country: 'saudi-arabia' },
    {       coin: 'ethereum',       country: 'sri-lanka' },
    {       coin: 'ethereum',       country: 'nepal' },
    {       coin: 'ethereum',       country: 'japan' },
    {       coin: 'ethereum',       country: 'china' },
    {       coin: 'ethereum',       country: 'myanmar' },
    {       coin: 'ethereum',       country: 'cambodia' },
    {       coin: 'ethereum',       country: 'laos' },
    {       coin: 'ethereum',       country: 'mongolia' },
    {       coin: 'tether',       country: 'pakistan' },
    {       coin: 'tether',       country: 'india' },
    {       coin: 'tether',       country: 'indonesia' },
    {       coin: 'tether',       country: 'philippines' },
    {       coin: 'tether',       country: 'bangladesh' },
    {       coin: 'tether',       country: 'malaysia' },
    {       coin: 'tether',       country: 'vietnam' },
    {       coin: 'tether',       country: 'thailand' },
    {       coin: 'tether',       country: 'south-korea' },
    {       coin: 'tether',       country: 'singapore' },
    {       coin: 'tether',       country: 'uae' },
    {       coin: 'tether',       country: 'saudi-arabia' },
    {       coin: 'tether',       country: 'sri-lanka' },
    {       coin: 'tether',       country: 'nepal' },
    {       coin: 'tether',       country: 'japan' },
    {       coin: 'tether',       country: 'china' },
    {       coin: 'tether',       country: 'myanmar' },
    {       coin: 'tether',       country: 'cambodia' },
    {       coin: 'tether',       country: 'laos' },
    {       coin: 'tether',       country: 'mongolia' },
    {       coin: 'ripple',       country: 'pakistan' },
    {       coin: 'ripple',       country: 'india' },
    {       coin: 'ripple',       country: 'indonesia' },
    {       coin: 'ripple',       country: 'philippines' },
    {       coin: 'ripple',       country: 'bangladesh' },
    {       coin: 'ripple',       country: 'malaysia' },
    {       coin: 'ripple',       country: 'vietnam' },
    {       coin: 'ripple',       country: 'thailand' },
    {       coin: 'ripple',       country: 'south-korea' },
    {       coin: 'ripple',       country: 'singapore' },
    {       coin: 'ripple',       country: 'uae' },
    {       coin: 'ripple',       country: 'saudi-arabia' },
    {       coin: 'ripple',       country: 'sri-lanka' },
    {       coin: 'ripple',       country: 'nepal' },
    {       coin: 'ripple',       country: 'japan' },
    {       coin: 'ripple',       country: 'china' },
    {       coin: 'ripple',       country: 'myanmar' },
    {       coin: 'ripple',       country: 'cambodia' },
    {       coin: 'ripple',       country: 'laos' },
    {       coin: 'ripple',       country: 'mongolia' },
    {       coin: 'binancecoin',       country: 'pakistan' },
    {       coin: 'binancecoin',       country: 'india' },
    {       coin: 'binancecoin',       country: 'indonesia' },
    {       coin: 'binancecoin',       country: 'philippines' },
    {       coin: 'binancecoin',       country: 'bangladesh' },
    {       coin: 'binancecoin',       country: 'malaysia' },
    {       coin: 'binancecoin',       country: 'vietnam' },
    {       coin: 'binancecoin',       country: 'thailand' },
    {       coin: 'binancecoin',       country: 'south-korea' },
    {       coin: 'binancecoin',       country: 'singapore' },
    {       coin: 'binancecoin',       country: 'uae' },
    {       coin: 'binancecoin',       country: 'saudi-arabia' },
    {       coin: 'binancecoin',       country: 'sri-lanka' },
    {       coin: 'binancecoin',       country: 'nepal' },
    {       coin: 'binancecoin',       country: 'japan' },
    {       coin: 'binancecoin',       country: 'china' },
    {       coin: 'binancecoin',       country: 'myanmar' },
    {       coin: 'binancecoin',       country: 'cambodia' },
    {       coin: 'binancecoin',       country: 'laos' },
    {       coin: 'binancecoin',       country: 'mongolia' },
    {       coin: 'usd-coin',       country: 'pakistan' },
    {       coin: 'usd-coin',       country: 'india' },
    {       coin: 'usd-coin',       country: 'indonesia' },
    {       coin: 'usd-coin',       country: 'philippines' },
    {       coin: 'usd-coin',       country: 'bangladesh' },
    {       coin: 'usd-coin',       country: 'malaysia' },
    {       coin: 'usd-coin',       country: 'vietnam' },
    {       coin: 'usd-coin',       country: 'thailand' },
    {       coin: 'usd-coin',       country: 'south-korea' },
    {       coin: 'usd-coin',       country: 'singapore' },
    {       coin: 'usd-coin',       country: 'uae' },
    {       coin: 'usd-coin',       country: 'saudi-arabia' },
    {       coin: 'usd-coin',       country: 'sri-lanka' },
    {       coin: 'usd-coin',       country: 'nepal' },
    {       coin: 'usd-coin',       country: 'japan' },
    {       coin: 'usd-coin',       country: 'china' },
    {       coin: 'usd-coin',       country: 'myanmar' },
    {       coin: 'usd-coin',       country: 'cambodia' },
    {       coin: 'usd-coin',       country: 'laos' },
    {       coin: 'usd-coin',       country: 'mongolia' },
    {       coin: 'solana',       country: 'pakistan' },
    {       coin: 'solana',       country: 'india' },
    {       coin: 'solana',       country: 'indonesia' },
    {       coin: 'solana',       country: 'philippines' },
    {       coin: 'solana',       country: 'bangladesh' },
    {       coin: 'solana',       country: 'malaysia' },
    {       coin: 'solana',       country: 'vietnam' },
    {       coin: 'solana',       country: 'thailand' },
    {       coin: 'solana',       country: 'south-korea' },
    {       coin: 'solana',       country: 'singapore' },
    {       coin: 'solana',       country: 'uae' },
    {       coin: 'solana',       country: 'saudi-arabia' },
    {       coin: 'solana',       country: 'sri-lanka' },
    {       coin: 'solana',       country: 'nepal' },
    {       coin: 'solana',       country: 'japan' },
    {       coin: 'solana',       country: 'china' },
    {       coin: 'solana',       country: 'myanmar' },
    {       coin: 'solana',       country: 'cambodia' },
    {       coin: 'solana',       country: 'laos' },
    {       coin: 'solana',       country: 'mongolia' },
    {       coin: 'tron',       country: 'pakistan' },
    {       coin: 'tron',       country: 'india' },
    {       coin: 'tron',       country: 'indonesia' },
    {       coin: 'tron',       country: 'philippines' },
    {       coin: 'tron',       country: 'bangladesh' },
    {       coin: 'tron',       country: 'malaysia' },
    {       coin: 'tron',       country: 'vietnam' },
    {       coin: 'tron',       country: 'thailand' },
    {       coin: 'tron',       country: 'south-korea' },
    {       coin: 'tron',       country: 'singapore' },
    {       coin: 'tron',       country: 'uae' },
    {       coin: 'tron',       country: 'saudi-arabia' },
    {       coin: 'tron',       country: 'sri-lanka' },
    {       coin: 'tron',       country: 'nepal' },
    {       coin: 'tron',       country: 'japan' },
    {       coin: 'tron',       country: 'china' },
    {       coin: 'tron',       country: 'myanmar' },
    {       coin: 'tron',       country: 'cambodia' },
    {       coin: 'tron',       country: 'laos' },
    {       coin: 'tron',       country: 'mongolia' },
    {       coin: 'figure-heloc',       country: 'pakistan' },
    {       coin: 'figure-heloc',       country: 'india' },
    {       coin: 'figure-heloc',       country: 'indonesia' },
    {       coin: 'figure-heloc',       country: 'philippines' },
    {       coin: 'figure-heloc',       country: 'bangladesh' },
    {       coin: 'figure-heloc',       country: 'malaysia' },
    {       coin: 'figure-heloc',       country: 'vietnam' },
    {       coin: 'figure-heloc',       country: 'thailand' },
    {       coin: 'figure-heloc',       country: 'south-korea' },
    {       coin: 'figure-heloc',       country: 'singapore' },
    {       coin: 'figure-heloc',       country: 'uae' },
    {       coin: 'figure-heloc',       country: 'saudi-arabia' },
    {       coin: 'figure-heloc',       country: 'sri-lanka' },
    {       coin: 'figure-heloc',       country: 'nepal' },
    {       coin: 'figure-heloc',       country: 'japan' },
    {       coin: 'figure-heloc',       country: 'china' },
    {       coin: 'figure-heloc',       country: 'myanmar' },
    {       coin: 'figure-heloc',       country: 'cambodia' },
    {       coin: 'figure-heloc',       country: 'laos' },
    {       coin: 'figure-heloc',       country: 'mongolia' },
    {       coin: 'dogecoin',       country: 'pakistan' },
    {       coin: 'dogecoin',       country: 'india' },
    {       coin: 'dogecoin',       country: 'indonesia' },
    {       coin: 'dogecoin',       country: 'philippines' },
    {       coin: 'dogecoin',       country: 'bangladesh' },
    {       coin: 'dogecoin',       country: 'malaysia' },
    {       coin: 'dogecoin',       country: 'vietnam' },
    {       coin: 'dogecoin',       country: 'thailand' },
    {       coin: 'dogecoin',       country: 'south-korea' },
    {       coin: 'dogecoin',       country: 'singapore' },
    {       coin: 'dogecoin',       country: 'uae' },
    {       coin: 'dogecoin',       country: 'saudi-arabia' },
    {       coin: 'dogecoin',       country: 'sri-lanka' },
    {       coin: 'dogecoin',       country: 'nepal' },
    {       coin: 'dogecoin',       country: 'japan' },
    {       coin: 'dogecoin',       country: 'china' },
    {       coin: 'dogecoin',       country: 'myanmar' },
    {       coin: 'dogecoin',       country: 'cambodia' },
    {       coin: 'dogecoin',       country: 'laos' },
    {       coin: 'dogecoin',       country: 'mongolia' },
    {       coin: 'whitebit',       country: 'pakistan' },
    {       coin: 'whitebit',       country: 'india' },
    {       coin: 'whitebit',       country: 'indonesia' },
    {       coin: 'whitebit',       country: 'philippines' },
    {       coin: 'whitebit',       country: 'bangladesh' },
    {       coin: 'whitebit',       country: 'malaysia' },
    {       coin: 'whitebit',       country: 'vietnam' },
    {       coin: 'whitebit',       country: 'thailand' },
    {       coin: 'whitebit',       country: 'south-korea' },
    {       coin: 'whitebit',       country: 'singapore' },
    {       coin: 'whitebit',       country: 'uae' },
    {       coin: 'whitebit',       country: 'saudi-arabia' },
    {       coin: 'whitebit',       country: 'sri-lanka' },
    {       coin: 'whitebit',       country: 'nepal' },
    {       coin: 'whitebit',       country: 'japan' },
    {       coin: 'whitebit',       country: 'china' },
    {       coin: 'whitebit',       country: 'myanmar' },
    {       coin: 'whitebit',       country: 'cambodia' },
    {       coin: 'whitebit',       country: 'laos' },
    {       coin: 'whitebit',       country: 'mongolia' },
    {       coin: 'usds',       country: 'pakistan' },
    {       coin: 'usds',       country: 'india' },
    {       coin: 'usds',       country: 'indonesia' },
    {       coin: 'usds',       country: 'philippines' },
    {       coin: 'usds',       country: 'bangladesh' },
    {       coin: 'usds',       country: 'malaysia' },
    {       coin: 'usds',       country: 'vietnam' },
    {       coin: 'usds',       country: 'thailand' },
    {       coin: 'usds',       country: 'south-korea' },
    {       coin: 'usds',       country: 'singapore' },
    {       coin: 'usds',       country: 'uae' },
    {       coin: 'usds',       country: 'saudi-arabia' },
    {       coin: 'usds',       country: 'sri-lanka' },
    {       coin: 'usds',       country: 'nepal' },
    {       coin: 'usds',       country: 'japan' },
    {       coin: 'usds',       country: 'china' },
    {       coin: 'usds',       country: 'myanmar' },
    {       coin: 'usds',       country: 'cambodia' },
    {       coin: 'usds',       country: 'laos' },
    {       coin: 'usds',       country: 'mongolia' },
    {       coin: 'hyperliquid',       country: 'pakistan' },
    {       coin: 'hyperliquid',       country: 'india' },
    {       coin: 'hyperliquid',       country: 'indonesia' },
    {       coin: 'hyperliquid',       country: 'philippines' },
    {       coin: 'hyperliquid',       country: 'bangladesh' },
    {       coin: 'hyperliquid',       country: 'malaysia' },
    {       coin: 'hyperliquid',       country: 'vietnam' },
    {       coin: 'hyperliquid',       country: 'thailand' },
    {       coin: 'hyperliquid',       country: 'south-korea' },
    {       coin: 'hyperliquid',       country: 'singapore' },
    {       coin: 'hyperliquid',       country: 'uae' },
    {       coin: 'hyperliquid',       country: 'saudi-arabia' },
    {       coin: 'hyperliquid',       country: 'sri-lanka' },
    {       coin: 'hyperliquid',       country: 'nepal' },
    {       coin: 'hyperliquid',       country: 'japan' },
    {       coin: 'hyperliquid',       country: 'china' },
    {       coin: 'hyperliquid',       country: 'myanmar' },
    {       coin: 'hyperliquid',       country: 'cambodia' },
    {       coin: 'hyperliquid',       country: 'laos' },
    {       coin: 'hyperliquid',       country: 'mongolia' },
    {       coin: 'leo-token',       country: 'pakistan' },
    {       coin: 'leo-token',       country: 'india' },
    {       coin: 'leo-token',       country: 'indonesia' },
    {       coin: 'leo-token',       country: 'philippines' },
    {       coin: 'leo-token',       country: 'bangladesh' },
    {       coin: 'leo-token',       country: 'malaysia' },
    {       coin: 'leo-token',       country: 'vietnam' },
    {       coin: 'leo-token',       country: 'thailand' },
    {       coin: 'leo-token',       country: 'south-korea' },
    {       coin: 'leo-token',       country: 'singapore' },
    {       coin: 'leo-token',       country: 'uae' },
    {       coin: 'leo-token',       country: 'saudi-arabia' },
    {       coin: 'leo-token',       country: 'sri-lanka' },
    {       coin: 'leo-token',       country: 'nepal' },
    {       coin: 'leo-token',       country: 'japan' },
    {       coin: 'leo-token',       country: 'china' },
    {       coin: 'leo-token',       country: 'myanmar' },
    {       coin: 'leo-token',       country: 'cambodia' },
    {       coin: 'leo-token',       country: 'laos' },
    {       coin: 'leo-token',       country: 'mongolia' },
    {       coin: 'cardano',       country: 'pakistan' },
    {       coin: 'cardano',       country: 'india' },
    {       coin: 'cardano',       country: 'indonesia' },
    {       coin: 'cardano',       country: 'philippines' },
    {       coin: 'cardano',       country: 'bangladesh' },
    {       coin: 'cardano',       country: 'malaysia' },
    {       coin: 'cardano',       country: 'vietnam' },
    {       coin: 'cardano',       country: 'thailand' },
    {       coin: 'cardano',       country: 'south-korea' },
    {       coin: 'cardano',       country: 'singapore' },
    {       coin: 'cardano',       country: 'uae' },
    {       coin: 'cardano',       country: 'saudi-arabia' },
    {       coin: 'cardano',       country: 'sri-lanka' },
    {       coin: 'cardano',       country: 'nepal' },
    {       coin: 'cardano',       country: 'japan' },
    {       coin: 'cardano',       country: 'china' },
    {       coin: 'cardano',       country: 'myanmar' },
    {       coin: 'cardano',       country: 'cambodia' },
    {       coin: 'cardano',       country: 'laos' },
    {       coin: 'cardano',       country: 'mongolia' },
    {       coin: 'bitcoin-cash',       country: 'pakistan' },
    {       coin: 'bitcoin-cash',       country: 'india' },
    {       coin: 'bitcoin-cash',       country: 'indonesia' },
    {       coin: 'bitcoin-cash',       country: 'philippines' },
    {       coin: 'bitcoin-cash',       country: 'bangladesh' },
    {       coin: 'bitcoin-cash',       country: 'malaysia' },
    {       coin: 'bitcoin-cash',       country: 'vietnam' },
    {       coin: 'bitcoin-cash',       country: 'thailand' },
    {       coin: 'bitcoin-cash',       country: 'south-korea' },
    {       coin: 'bitcoin-cash',       country: 'singapore' },
    {       coin: 'bitcoin-cash',       country: 'uae' },
    {       coin: 'bitcoin-cash',       country: 'saudi-arabia' },
    {       coin: 'bitcoin-cash',       country: 'sri-lanka' },
    {       coin: 'bitcoin-cash',       country: 'nepal' },
    {       coin: 'bitcoin-cash',       country: 'japan' },
    {       coin: 'bitcoin-cash',       country: 'china' },
    {       coin: 'bitcoin-cash',       country: 'myanmar' },
    {       coin: 'bitcoin-cash',       country: 'cambodia' },
    {       coin: 'bitcoin-cash',       country: 'laos' },
    {       coin: 'bitcoin-cash',       country: 'mongolia' },
    {       coin: 'chainlink',       country: 'pakistan' },
    {       coin: 'chainlink',       country: 'india' },
    {       coin: 'chainlink',       country: 'indonesia' },
    {       coin: 'chainlink',       country: 'philippines' },
    {       coin: 'chainlink',       country: 'bangladesh' },
    {       coin: 'chainlink',       country: 'malaysia' },
    {       coin: 'chainlink',       country: 'vietnam' },
    {       coin: 'chainlink',       country: 'thailand' },
    {       coin: 'chainlink',       country: 'south-korea' },
    {       coin: 'chainlink',       country: 'singapore' },
    {       coin: 'chainlink',       country: 'uae' },
    {       coin: 'chainlink',       country: 'saudi-arabia' },
    {       coin: 'chainlink',       country: 'sri-lanka' },
    {       coin: 'chainlink',       country: 'nepal' },
    {       coin: 'chainlink',       country: 'japan' },
    {       coin: 'chainlink',       country: 'china' },
    {       coin: 'chainlink',       country: 'myanmar' },
    {       coin: 'chainlink',       country: 'cambodia' },
    {       coin: 'chainlink',       country: 'laos' },
    {       coin: 'chainlink',       country: 'mongolia' },
    {       coin: 'monero',       country: 'pakistan' },
    {       coin: 'monero',       country: 'india' },
    {       coin: 'monero',       country: 'indonesia' },
    {       coin: 'monero',       country: 'philippines' },
    {       coin: 'monero',       country: 'bangladesh' },
    {       coin: 'monero',       country: 'malaysia' },
    {       coin: 'monero',       country: 'vietnam' },
    {       coin: 'monero',       country: 'thailand' },
    {       coin: 'monero',       country: 'south-korea' },
    {       coin: 'monero',       country: 'singapore' },
    {       coin: 'monero',       country: 'uae' },
    {       coin: 'monero',       country: 'saudi-arabia' },
    {       coin: 'monero',       country: 'sri-lanka' },
    {       coin: 'monero',       country: 'nepal' },
    {       coin: 'monero',       country: 'japan' },
    {       coin: 'monero',       country: 'china' },
    {       coin: 'monero',       country: 'myanmar' },
    {       coin: 'monero',       country: 'cambodia' },
    {       coin: 'monero',       country: 'laos' },
    {       coin: 'monero',       country: 'mongolia' },
    {       coin: 'memecore',       country: 'pakistan' },
    {       coin: 'memecore',       country: 'india' },
    {       coin: 'memecore',       country: 'indonesia' },
    {       coin: 'memecore',       country: 'philippines' },
    {       coin: 'memecore',       country: 'bangladesh' },
    {       coin: 'memecore',       country: 'malaysia' },
    {       coin: 'memecore',       country: 'vietnam' },
    {       coin: 'memecore',       country: 'thailand' },
    {       coin: 'memecore',       country: 'south-korea' },
    {       coin: 'memecore',       country: 'singapore' },
    {       coin: 'memecore',       country: 'uae' },
    {       coin: 'memecore',       country: 'saudi-arabia' },
    {       coin: 'memecore',       country: 'sri-lanka' },
    {       coin: 'memecore',       country: 'nepal' },
    {       coin: 'memecore',       country: 'japan' },
    {       coin: 'memecore',       country: 'china' },
    {       coin: 'memecore',       country: 'myanmar' },
    {       coin: 'memecore',       country: 'cambodia' },
    {       coin: 'memecore',       country: 'laos' },
    {       coin: 'memecore',       country: 'mongolia' },
    {       coin: 'canton-network',       country: 'pakistan' },
    {       coin: 'canton-network',       country: 'india' },
    {       coin: 'canton-network',       country: 'indonesia' },
    {       coin: 'canton-network',       country: 'philippines' },
    {       coin: 'canton-network',       country: 'bangladesh' },
    {       coin: 'canton-network',       country: 'malaysia' },
    {       coin: 'canton-network',       country: 'vietnam' },
    {       coin: 'canton-network',       country: 'thailand' },
    {       coin: 'canton-network',       country: 'south-korea' },
    {       coin: 'canton-network',       country: 'singapore' },
    {       coin: 'canton-network',       country: 'uae' },
    {       coin: 'canton-network',       country: 'saudi-arabia' },
    {       coin: 'canton-network',       country: 'sri-lanka' },
    {       coin: 'canton-network',       country: 'nepal' },
    {       coin: 'canton-network',       country: 'japan' },
    {       coin: 'canton-network',       country: 'china' },
    {       coin: 'canton-network',       country: 'myanmar' },
    {       coin: 'canton-network',       country: 'cambodia' },
    {       coin: 'canton-network',       country: 'laos' },
    {       coin: 'canton-network',       country: 'mongolia' },
    {       coin: 'stellar',       country: 'pakistan' },
    {       coin: 'stellar',       country: 'india' },
    {       coin: 'stellar',       country: 'indonesia' },
    {       coin: 'stellar',       country: 'philippines' },
    {       coin: 'stellar',       country: 'bangladesh' },
    {       coin: 'stellar',       country: 'malaysia' },
    {       coin: 'stellar',       country: 'vietnam' },
    {       coin: 'stellar',       country: 'thailand' },
    {       coin: 'stellar',       country: 'south-korea' },
    {       coin: 'stellar',       country: 'singapore' },
    {       coin: 'stellar',       country: 'uae' },
    {       coin: 'stellar',       country: 'saudi-arabia' },
    {       coin: 'stellar',       country: 'sri-lanka' },
    {       coin: 'stellar',       country: 'nepal' },
    {       coin: 'stellar',       country: 'japan' },
    {       coin: 'stellar',       country: 'china' },
    {       coin: 'stellar',       country: 'myanmar' },
    {       coin: 'stellar',       country: 'cambodia' },
    {       coin: 'stellar',       country: 'laos' },
    {       coin: 'stellar',       country: 'mongolia' },
    {       coin: 'ethena-usde',       country: 'pakistan' },
    {       coin: 'ethena-usde',       country: 'india' },
    {       coin: 'ethena-usde',       country: 'indonesia' },
    {       coin: 'ethena-usde',       country: 'philippines' },
    {       coin: 'ethena-usde',       country: 'bangladesh' },
    {       coin: 'ethena-usde',       country: 'malaysia' },
    {       coin: 'ethena-usde',       country: 'vietnam' },
    {       coin: 'ethena-usde',       country: 'thailand' },
    {       coin: 'ethena-usde',       country: 'south-korea' },
    {       coin: 'ethena-usde',       country: 'singapore' },
    {       coin: 'ethena-usde',       country: 'uae' },
    {       coin: 'ethena-usde',       country: 'saudi-arabia' },
    {       coin: 'ethena-usde',       country: 'sri-lanka' },
    {       coin: 'ethena-usde',       country: 'nepal' },
    {       coin: 'ethena-usde',       country: 'japan' },
    {       coin: 'ethena-usde',       country: 'china' },
    {       coin: 'ethena-usde',       country: 'myanmar' },
    {       coin: 'ethena-usde',       country: 'cambodia' },
    {       coin: 'ethena-usde',       country: 'laos' },
    {       coin: 'ethena-usde',       country: 'mongolia' },
    {       coin: 'zcash',       country: 'pakistan' },
    {       coin: 'zcash',       country: 'india' },
    {       coin: 'zcash',       country: 'indonesia' },
    {       coin: 'zcash',       country: 'philippines' },
    {       coin: 'zcash',       country: 'bangladesh' },
    {       coin: 'zcash',       country: 'malaysia' },
    {       coin: 'zcash',       country: 'vietnam' },
    {       coin: 'zcash',       country: 'thailand' },
    {       coin: 'zcash',       country: 'south-korea' },
    {       coin: 'zcash',       country: 'singapore' },
    {       coin: 'zcash',       country: 'uae' },
    {       coin: 'zcash',       country: 'saudi-arabia' },
    {       coin: 'zcash',       country: 'sri-lanka' },
    {       coin: 'zcash',       country: 'nepal' },
    {       coin: 'zcash',       country: 'japan' },
    {       coin: 'zcash',       country: 'china' },
    {       coin: 'zcash',       country: 'myanmar' },
    {       coin: 'zcash',       country: 'cambodia' },
    {       coin: 'zcash',       country: 'laos' },
    {       coin: 'zcash',       country: 'mongolia' },
    {       coin: 'dai',       country: 'pakistan' },
    {       coin: 'dai',       country: 'india' },
    {       coin: 'dai',       country: 'indonesia' },
    {       coin: 'dai',       country: 'philippines' },
    {       coin: 'dai',       country: 'bangladesh' },
    {       coin: 'dai',       country: 'malaysia' },
    {       coin: 'dai',       country: 'vietnam' },
    {       coin: 'dai',       country: 'thailand' },
    {       coin: 'dai',       country: 'south-korea' },
    {       coin: 'dai',       country: 'singapore' },
    {       coin: 'dai',       country: 'uae' },
    {       coin: 'dai',       country: 'saudi-arabia' },
    {       coin: 'dai',       country: 'sri-lanka' },
    {       coin: 'dai',       country: 'nepal' },
    {       coin: 'dai',       country: 'japan' },
    {       coin: 'dai',       country: 'china' },
    {       coin: 'dai',       country: 'myanmar' },
    {       coin: 'dai',       country: 'cambodia' },
    {       coin: 'dai',       country: 'laos' },
    {       coin: 'dai',       country: 'mongolia' },
    {       coin: 'usd1-wlfi',       country: 'pakistan' },
    {       coin: 'usd1-wlfi',       country: 'india' },
    {       coin: 'usd1-wlfi',       country: 'indonesia' },
    {       coin: 'usd1-wlfi',       country: 'philippines' },
    {       coin: 'usd1-wlfi',       country: 'bangladesh' },
    {       coin: 'usd1-wlfi',       country: 'malaysia' },
    {       coin: 'usd1-wlfi',       country: 'vietnam' },
    {       coin: 'usd1-wlfi',       country: 'thailand' },
    {       coin: 'usd1-wlfi',       country: 'south-korea' },
    {       coin: 'usd1-wlfi',       country: 'singapore' },
    {       coin: 'usd1-wlfi',       country: 'uae' },
    {       coin: 'usd1-wlfi',       country: 'saudi-arabia' },
    {       coin: 'usd1-wlfi',       country: 'sri-lanka' },
    {       coin: 'usd1-wlfi',       country: 'nepal' },
    {       coin: 'usd1-wlfi',       country: 'japan' },
    {       coin: 'usd1-wlfi',       country: 'china' },
    {       coin: 'usd1-wlfi',       country: 'myanmar' },
    {       coin: 'usd1-wlfi',       country: 'cambodia' },
    {       coin: 'usd1-wlfi',       country: 'laos' },
    {       coin: 'usd1-wlfi',       country: 'mongolia' },
    {       coin: 'litecoin',       country: 'pakistan' },
    {       coin: 'litecoin',       country: 'india' },
    {       coin: 'litecoin',       country: 'indonesia' },
    {       coin: 'litecoin',       country: 'philippines' },
    {       coin: 'litecoin',       country: 'bangladesh' },
    {       coin: 'litecoin',       country: 'malaysia' },
    {       coin: 'litecoin',       country: 'vietnam' },
    {       coin: 'litecoin',       country: 'thailand' },
    {       coin: 'litecoin',       country: 'south-korea' },
    {       coin: 'litecoin',       country: 'singapore' },
    {       coin: 'litecoin',       country: 'uae' },
    {       coin: 'litecoin',       country: 'saudi-arabia' },
    {       coin: 'litecoin',       country: 'sri-lanka' },
    {       coin: 'litecoin',       country: 'nepal' },
    {       coin: 'litecoin',       country: 'japan' },
    {       coin: 'litecoin',       country: 'china' },
    {       coin: 'litecoin',       country: 'myanmar' },
    {       coin: 'litecoin',       country: 'cambodia' },
    {       coin: 'litecoin',       country: 'laos' },
    {       coin: 'litecoin',       country: 'mongolia' },
    {       coin: 'paypal-usd',       country: 'pakistan' },
    {       coin: 'paypal-usd',       country: 'india' },
    {       coin: 'paypal-usd',       country: 'indonesia' },
    {       coin: 'paypal-usd',       country: 'philippines' },
    {       coin: 'paypal-usd',       country: 'bangladesh' },
    {       coin: 'paypal-usd',       country: 'malaysia' },
    {       coin: 'paypal-usd',       country: 'vietnam' },
    {       coin: 'paypal-usd',       country: 'thailand' },
    {       coin: 'paypal-usd',       country: 'south-korea' },
    {       coin: 'paypal-usd',       country: 'singapore' },
    {       coin: 'paypal-usd',       country: 'uae' },
    {       coin: 'paypal-usd',       country: 'saudi-arabia' },
    {       coin: 'paypal-usd',       country: 'sri-lanka' },
    {       coin: 'paypal-usd',       country: 'nepal' },
    {       coin: 'paypal-usd',       country: 'japan' },
    {       coin: 'paypal-usd',       country: 'china' },
    {       coin: 'paypal-usd',       country: 'myanmar' },
    {       coin: 'paypal-usd',       country: 'cambodia' },
    {       coin: 'paypal-usd',       country: 'laos' },
    {       coin: 'paypal-usd',       country: 'mongolia' },
    {       coin: 'avalanche-2',       country: 'pakistan' },
    {       coin: 'avalanche-2',       country: 'india' },
    {       coin: 'avalanche-2',       country: 'indonesia' },
    {       coin: 'avalanche-2',       country: 'philippines' },
    {       coin: 'avalanche-2',       country: 'bangladesh' },
    {       coin: 'avalanche-2',       country: 'malaysia' },
    {       coin: 'avalanche-2',       country: 'vietnam' },
    {       coin: 'avalanche-2',       country: 'thailand' },
    {       coin: 'avalanche-2',       country: 'south-korea' },
    {       coin: 'avalanche-2',       country: 'singapore' },
    {       coin: 'avalanche-2',       country: 'uae' },
    {       coin: 'avalanche-2',       country: 'saudi-arabia' },
    {       coin: 'avalanche-2',       country: 'sri-lanka' },
    {       coin: 'avalanche-2',       country: 'nepal' },
    {       coin: 'avalanche-2',       country: 'japan' },
    {       coin: 'avalanche-2',       country: 'china' },
    {       coin: 'avalanche-2',       country: 'myanmar' },
    {       coin: 'avalanche-2',       country: 'cambodia' },
    {       coin: 'avalanche-2',       country: 'laos' },
    {       coin: 'avalanche-2',       country: 'mongolia' },
    {       coin: 'hedera-hashgraph',       country: 'pakistan' },
    {       coin: 'hedera-hashgraph',       country: 'india' },
    {       coin: 'hedera-hashgraph',       country: 'indonesia' },
    {       coin: 'hedera-hashgraph',       country: 'philippines' },
    {       coin: 'hedera-hashgraph',       country: 'bangladesh' },
    {       coin: 'hedera-hashgraph',       country: 'malaysia' },
    {       coin: 'hedera-hashgraph',       country: 'vietnam' },
    {       coin: 'hedera-hashgraph',       country: 'thailand' },
    {       coin: 'hedera-hashgraph',       country: 'south-korea' },
    {       coin: 'hedera-hashgraph',       country: 'singapore' },
    {       coin: 'hedera-hashgraph',       country: 'uae' },
    {       coin: 'hedera-hashgraph',       country: 'saudi-arabia' },
    {       coin: 'hedera-hashgraph',       country: 'sri-lanka' },
    {       coin: 'hedera-hashgraph',       country: 'nepal' },
    {       coin: 'hedera-hashgraph',       country: 'japan' },
    {       coin: 'hedera-hashgraph',       country: 'china' },
    {       coin: 'hedera-hashgraph',       country: 'myanmar' },
    {       coin: 'hedera-hashgraph',       country: 'cambodia' },
    {       coin: 'hedera-hashgraph',       country: 'laos' },
    {       coin: 'hedera-hashgraph',       country: 'mongolia' },
    {       coin: 'sui',       country: 'pakistan' },
    {       coin: 'sui',       country: 'india' },
    {       coin: 'sui',       country: 'indonesia' },
    {       coin: 'sui',       country: 'philippines' },
    {       coin: 'sui',       country: 'bangladesh' },
    {       coin: 'sui',       country: 'malaysia' },
    {       coin: 'sui',       country: 'vietnam' },
    {       coin: 'sui',       country: 'thailand' },
    {       coin: 'sui',       country: 'south-korea' },
    {       coin: 'sui',       country: 'singapore' },
    {       coin: 'sui',       country: 'uae' },
    {       coin: 'sui',       country: 'saudi-arabia' },
    {       coin: 'sui',       country: 'sri-lanka' },
    {       coin: 'sui',       country: 'nepal' },
    {       coin: 'sui',       country: 'japan' },
    {       coin: 'sui',       country: 'china' },
    {       coin: 'sui',       country: 'myanmar' },
    {       coin: 'sui',       country: 'cambodia' },
    {       coin: 'sui',       country: 'laos' },
    {       coin: 'sui',       country: 'mongolia' },
    {       coin: 'rain',       country: 'pakistan' },
    {       coin: 'rain',       country: 'india' },
    {       coin: 'rain',       country: 'indonesia' },
    {       coin: 'rain',       country: 'philippines' },
    {       coin: 'rain',       country: 'bangladesh' },
    {       coin: 'rain',       country: 'malaysia' },
    {       coin: 'rain',       country: 'vietnam' },
    {       coin: 'rain',       country: 'thailand' },
    {       coin: 'rain',       country: 'south-korea' },
    {       coin: 'rain',       country: 'singapore' },
    {       coin: 'rain',       country: 'uae' },
    {       coin: 'rain',       country: 'saudi-arabia' },
    {       coin: 'rain',       country: 'sri-lanka' },
    {       coin: 'rain',       country: 'nepal' },
    {       coin: 'rain',       country: 'japan' },
    {       coin: 'rain',       country: 'china' },
    {       coin: 'rain',       country: 'myanmar' },
    {       coin: 'rain',       country: 'cambodia' },
    {       coin: 'rain',       country: 'laos' },
    {       coin: 'rain',       country: 'mongolia' },
    {       coin: 'shiba-inu',       country: 'pakistan' },
    {       coin: 'shiba-inu',       country: 'india' },
    {       coin: 'shiba-inu',       country: 'indonesia' },
    {       coin: 'shiba-inu',       country: 'philippines' },
    {       coin: 'shiba-inu',       country: 'bangladesh' },
    {       coin: 'shiba-inu',       country: 'malaysia' },
    {       coin: 'shiba-inu',       country: 'vietnam' },
    {       coin: 'shiba-inu',       country: 'thailand' },
    {       coin: 'shiba-inu',       country: 'south-korea' },
    {       coin: 'shiba-inu',       country: 'singapore' },
    {       coin: 'shiba-inu',       country: 'uae' },
    {       coin: 'shiba-inu',       country: 'saudi-arabia' },
    {       coin: 'shiba-inu',       country: 'sri-lanka' },
    {       coin: 'shiba-inu',       country: 'nepal' },
    {       coin: 'shiba-inu',       country: 'japan' },
    {       coin: 'shiba-inu',       country: 'china' },
    {       coin: 'shiba-inu',       country: 'myanmar' },
    {       coin: 'shiba-inu',       country: 'cambodia' },
    {       coin: 'shiba-inu',       country: 'laos' },
    {       coin: 'shiba-inu',       country: 'mongolia' },
    {       coin: 'the-open-network',       country: 'pakistan' },
    {       coin: 'the-open-network',       country: 'india' },
    {       coin: 'the-open-network',       country: 'indonesia' },
    {       coin: 'the-open-network',       country: 'philippines' },
    {       coin: 'the-open-network',       country: 'bangladesh' },
    {       coin: 'the-open-network',       country: 'malaysia' },
    {       coin: 'the-open-network',       country: 'vietnam' },
    {       coin: 'the-open-network',       country: 'thailand' },
    {       coin: 'the-open-network',       country: 'south-korea' },
    {       coin: 'the-open-network',       country: 'singapore' },
    {       coin: 'the-open-network',       country: 'uae' },
    {       coin: 'the-open-network',       country: 'saudi-arabia' },
    {       coin: 'the-open-network',       country: 'sri-lanka' },
    {       coin: 'the-open-network',       country: 'nepal' },
    {       coin: 'the-open-network',       country: 'japan' },
    {       coin: 'the-open-network',       country: 'china' },
    {       coin: 'the-open-network',       country: 'myanmar' },
    {       coin: 'the-open-network',       country: 'cambodia' },
    {       coin: 'the-open-network',       country: 'laos' },
    {       coin: 'the-open-network',       country: 'mongolia' },
    {       coin: 'crypto-com-chain',       country: 'pakistan' },
    {       coin: 'crypto-com-chain',       country: 'india' },
    {       coin: 'crypto-com-chain',       country: 'indonesia' },
    {       coin: 'crypto-com-chain',       country: 'philippines' },
    {       coin: 'crypto-com-chain',       country: 'bangladesh' },
    {       coin: 'crypto-com-chain',       country: 'malaysia' },
    {       coin: 'crypto-com-chain',       country: 'vietnam' },
    {       coin: 'crypto-com-chain',       country: 'thailand' },
    {       coin: 'crypto-com-chain',       country: 'south-korea' },
    {       coin: 'crypto-com-chain',       country: 'singapore' },
    {       coin: 'crypto-com-chain',       country: 'uae' },
    {       coin: 'crypto-com-chain',       country: 'saudi-arabia' },
    {       coin: 'crypto-com-chain',       country: 'sri-lanka' },
    {       coin: 'crypto-com-chain',       country: 'nepal' },
    {       coin: 'crypto-com-chain',       country: 'japan' },
    {       coin: 'crypto-com-chain',       country: 'china' },
    {       coin: 'crypto-com-chain',       country: 'myanmar' },
    {       coin: 'crypto-com-chain',       country: 'cambodia' },
    {       coin: 'crypto-com-chain',       country: 'laos' },
    {       coin: 'crypto-com-chain',       country: 'mongolia' },
    {       coin: 'hashnote-usyc',       country: 'pakistan' },
    {       coin: 'hashnote-usyc',       country: 'india' },
    {       coin: 'hashnote-usyc',       country: 'indonesia' },
    {       coin: 'hashnote-usyc',       country: 'philippines' },
    {       coin: 'hashnote-usyc',       country: 'bangladesh' },
    {       coin: 'hashnote-usyc',       country: 'malaysia' },
    {       coin: 'hashnote-usyc',       country: 'vietnam' },
    {       coin: 'hashnote-usyc',       country: 'thailand' },
    {       coin: 'hashnote-usyc',       country: 'south-korea' },
    {       coin: 'hashnote-usyc',       country: 'singapore' },
    {       coin: 'hashnote-usyc',       country: 'uae' },
    {       coin: 'hashnote-usyc',       country: 'saudi-arabia' },
    {       coin: 'hashnote-usyc',       country: 'sri-lanka' },
    {       coin: 'hashnote-usyc',       country: 'nepal' },
    {       coin: 'hashnote-usyc',       country: 'japan' },
    {       coin: 'hashnote-usyc',       country: 'china' },
    {       coin: 'hashnote-usyc',       country: 'myanmar' },
    {       coin: 'hashnote-usyc',       country: 'cambodia' },
    {       coin: 'hashnote-usyc',       country: 'laos' },
    {       coin: 'hashnote-usyc',       country: 'mongolia' },
    {       coin: 'tether-gold',       country: 'pakistan' },
    {       coin: 'tether-gold',       country: 'india' },
    {       coin: 'tether-gold',       country: 'indonesia' },
    {       coin: 'tether-gold',       country: 'philippines' },
    {       coin: 'tether-gold',       country: 'bangladesh' },
    {       coin: 'tether-gold',       country: 'malaysia' },
    {       coin: 'tether-gold',       country: 'vietnam' },
    {       coin: 'tether-gold',       country: 'thailand' },
    {       coin: 'tether-gold',       country: 'south-korea' },
    {       coin: 'tether-gold',       country: 'singapore' },
    {       coin: 'tether-gold',       country: 'uae' },
    {       coin: 'tether-gold',       country: 'saudi-arabia' },
    {       coin: 'tether-gold',       country: 'sri-lanka' },
    {       coin: 'tether-gold',       country: 'nepal' },
    {       coin: 'tether-gold',       country: 'japan' },
    {       coin: 'tether-gold',       country: 'china' },
    {       coin: 'tether-gold',       country: 'myanmar' },
    {       coin: 'tether-gold',       country: 'cambodia' },
    {       coin: 'tether-gold',       country: 'laos' },
    {       coin: 'tether-gold',       country: 'mongolia' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'pakistan' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'india' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'indonesia' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'philippines' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'bangladesh' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'malaysia' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'vietnam' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'thailand' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'south-korea' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'singapore' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'uae' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'saudi-arabia' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'sri-lanka' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'nepal' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'japan' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'china' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'myanmar' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'cambodia' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'laos' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund',       country: 'mongolia' },
    {       coin: 'world-liberty-financial',       country: 'pakistan' },
    {       coin: 'world-liberty-financial',       country: 'india' },
    {       coin: 'world-liberty-financial',       country: 'indonesia' },
    {       coin: 'world-liberty-financial',       country: 'philippines' },
    {       coin: 'world-liberty-financial',       country: 'bangladesh' },
    {       coin: 'world-liberty-financial',       country: 'malaysia' },
    {       coin: 'world-liberty-financial',       country: 'vietnam' },
    {       coin: 'world-liberty-financial',       country: 'thailand' },
    {       coin: 'world-liberty-financial',       country: 'south-korea' },
    {       coin: 'world-liberty-financial',       country: 'singapore' },
    {       coin: 'world-liberty-financial',       country: 'uae' },
    {       coin: 'world-liberty-financial',       country: 'saudi-arabia' },
    {       coin: 'world-liberty-financial',       country: 'sri-lanka' },
    {       coin: 'world-liberty-financial',       country: 'nepal' },
    {       coin: 'world-liberty-financial',       country: 'japan' },
    {       coin: 'world-liberty-financial',       country: 'china' },
    {       coin: 'world-liberty-financial',       country: 'myanmar' },
    {       coin: 'world-liberty-financial',       country: 'cambodia' },
    {       coin: 'world-liberty-financial',       country: 'laos' },
    {       coin: 'world-liberty-financial',       country: 'mongolia' },
    {       coin: 'bittensor',       country: 'pakistan' },
    {       coin: 'bittensor',       country: 'india' },
    {       coin: 'bittensor',       country: 'indonesia' },
    {       coin: 'bittensor',       country: 'philippines' },
    {       coin: 'bittensor',       country: 'bangladesh' },
    {       coin: 'bittensor',       country: 'malaysia' },
    {       coin: 'bittensor',       country: 'vietnam' },
    {       coin: 'bittensor',       country: 'thailand' },
    {       coin: 'bittensor',       country: 'south-korea' },
    {       coin: 'bittensor',       country: 'singapore' },
    {       coin: 'bittensor',       country: 'uae' },
    {       coin: 'bittensor',       country: 'saudi-arabia' },
    {       coin: 'bittensor',       country: 'sri-lanka' },
    {       coin: 'bittensor',       country: 'nepal' },
    {       coin: 'bittensor',       country: 'japan' },
    {       coin: 'bittensor',       country: 'china' },
    {       coin: 'bittensor',       country: 'myanmar' },
    {       coin: 'bittensor',       country: 'cambodia' },
    {       coin: 'bittensor',       country: 'laos' },
    {       coin: 'bittensor',       country: 'mongolia' },
    {       coin: 'pax-gold',       country: 'pakistan' },
    {       coin: 'pax-gold',       country: 'india' },
    {       coin: 'pax-gold',       country: 'indonesia' },
    {       coin: 'pax-gold',       country: 'philippines' },
    {       coin: 'pax-gold',       country: 'bangladesh' },
    {       coin: 'pax-gold',       country: 'malaysia' },
    {       coin: 'pax-gold',       country: 'vietnam' },
    {       coin: 'pax-gold',       country: 'thailand' },
    {       coin: 'pax-gold',       country: 'south-korea' },
    {       coin: 'pax-gold',       country: 'singapore' },
    {       coin: 'pax-gold',       country: 'uae' },
    {       coin: 'pax-gold',       country: 'saudi-arabia' },
    {       coin: 'pax-gold',       country: 'sri-lanka' },
    {       coin: 'pax-gold',       country: 'nepal' },
    {       coin: 'pax-gold',       country: 'japan' },
    {       coin: 'pax-gold',       country: 'china' },
    {       coin: 'pax-gold',       country: 'myanmar' },
    {       coin: 'pax-gold',       country: 'cambodia' },
    {       coin: 'pax-gold',       country: 'laos' },
    {       coin: 'pax-gold',       country: 'mongolia' },
    {       coin: 'global-dollar',       country: 'pakistan' },
    {       coin: 'global-dollar',       country: 'india' },
    {       coin: 'global-dollar',       country: 'indonesia' },
    {       coin: 'global-dollar',       country: 'philippines' },
    {       coin: 'global-dollar',       country: 'bangladesh' },
    {       coin: 'global-dollar',       country: 'malaysia' },
    {       coin: 'global-dollar',       country: 'vietnam' },
    {       coin: 'global-dollar',       country: 'thailand' },
    {       coin: 'global-dollar',       country: 'south-korea' },
    {       coin: 'global-dollar',       country: 'singapore' },
    {       coin: 'global-dollar',       country: 'uae' },
    {       coin: 'global-dollar',       country: 'saudi-arabia' },
    {       coin: 'global-dollar',       country: 'sri-lanka' },
    {       coin: 'global-dollar',       country: 'nepal' },
    {       coin: 'global-dollar',       country: 'japan' },
    {       coin: 'global-dollar',       country: 'china' },
    {       coin: 'global-dollar',       country: 'myanmar' },
    {       coin: 'global-dollar',       country: 'cambodia' },
    {       coin: 'global-dollar',       country: 'laos' },
    {       coin: 'global-dollar',       country: 'mongolia' },
    {       coin: 'polkadot',       country: 'pakistan' },
    {       coin: 'polkadot',       country: 'india' },
    {       coin: 'polkadot',       country: 'indonesia' },
    {       coin: 'polkadot',       country: 'philippines' },
    {       coin: 'polkadot',       country: 'bangladesh' },
    {       coin: 'polkadot',       country: 'malaysia' },
    {       coin: 'polkadot',       country: 'vietnam' },
    {       coin: 'polkadot',       country: 'thailand' },
    {       coin: 'polkadot',       country: 'south-korea' },
    {       coin: 'polkadot',       country: 'singapore' },
    {       coin: 'polkadot',       country: 'uae' },
    {       coin: 'polkadot',       country: 'saudi-arabia' },
    {       coin: 'polkadot',       country: 'sri-lanka' },
    {       coin: 'polkadot',       country: 'nepal' },
    {       coin: 'polkadot',       country: 'japan' },
    {       coin: 'polkadot',       country: 'china' },
    {       coin: 'polkadot',       country: 'myanmar' },
    {       coin: 'polkadot',       country: 'cambodia' },
    {       coin: 'polkadot',       country: 'laos' },
    {       coin: 'polkadot',       country: 'mongolia' },
    {       coin: 'mantle',       country: 'pakistan' },
    {       coin: 'mantle',       country: 'india' },
    {       coin: 'mantle',       country: 'indonesia' },
    {       coin: 'mantle',       country: 'philippines' },
    {       coin: 'mantle',       country: 'bangladesh' },
    {       coin: 'mantle',       country: 'malaysia' },
    {       coin: 'mantle',       country: 'vietnam' },
    {       coin: 'mantle',       country: 'thailand' },
    {       coin: 'mantle',       country: 'south-korea' },
    {       coin: 'mantle',       country: 'singapore' },
    {       coin: 'mantle',       country: 'uae' },
    {       coin: 'mantle',       country: 'saudi-arabia' },
    {       coin: 'mantle',       country: 'sri-lanka' },
    {       coin: 'mantle',       country: 'nepal' },
    {       coin: 'mantle',       country: 'japan' },
    {       coin: 'mantle',       country: 'china' },
    {       coin: 'mantle',       country: 'myanmar' },
    {       coin: 'mantle',       country: 'cambodia' },
    {       coin: 'mantle',       country: 'laos' },
    {       coin: 'mantle',       country: 'mongolia' },
    {       coin: 'uniswap',       country: 'pakistan' },
    {       coin: 'uniswap',       country: 'india' },
    {       coin: 'uniswap',       country: 'indonesia' },
    {       coin: 'uniswap',       country: 'philippines' },
    {       coin: 'uniswap',       country: 'bangladesh' },
    {       coin: 'uniswap',       country: 'malaysia' },
    {       coin: 'uniswap',       country: 'vietnam' },
    {       coin: 'uniswap',       country: 'thailand' },
    {       coin: 'uniswap',       country: 'south-korea' },
    {       coin: 'uniswap',       country: 'singapore' },
    {       coin: 'uniswap',       country: 'uae' },
    {       coin: 'uniswap',       country: 'saudi-arabia' },
    {       coin: 'uniswap',       country: 'sri-lanka' },
    {       coin: 'uniswap',       country: 'nepal' },
    {       coin: 'uniswap',       country: 'japan' },
    {       coin: 'uniswap',       country: 'china' },
    {       coin: 'uniswap',       country: 'myanmar' },
    {       coin: 'uniswap',       country: 'cambodia' },
    {       coin: 'uniswap',       country: 'laos' },
    {       coin: 'uniswap',       country: 'mongolia' },
    {       coin: 'sky',       country: 'pakistan' },
    {       coin: 'sky',       country: 'india' },
    {       coin: 'sky',       country: 'indonesia' },
    {       coin: 'sky',       country: 'philippines' },
    {       coin: 'sky',       country: 'bangladesh' },
    {       coin: 'sky',       country: 'malaysia' },
    {       coin: 'sky',       country: 'vietnam' },
    {       coin: 'sky',       country: 'thailand' },
    {       coin: 'sky',       country: 'south-korea' },
    {       coin: 'sky',       country: 'singapore' },
    {       coin: 'sky',       country: 'uae' },
    {       coin: 'sky',       country: 'saudi-arabia' },
    {       coin: 'sky',       country: 'sri-lanka' },
    {       coin: 'sky',       country: 'nepal' },
    {       coin: 'sky',       country: 'japan' },
    {       coin: 'sky',       country: 'china' },
    {       coin: 'sky',       country: 'myanmar' },
    {       coin: 'sky',       country: 'cambodia' },
    {       coin: 'sky',       country: 'laos' },
    {       coin: 'sky',       country: 'mongolia' },
    {       coin: 'falcon-finance',       country: 'pakistan' },
    {       coin: 'falcon-finance',       country: 'india' },
    {       coin: 'falcon-finance',       country: 'indonesia' },
    {       coin: 'falcon-finance',       country: 'philippines' },
    {       coin: 'falcon-finance',       country: 'bangladesh' },
    {       coin: 'falcon-finance',       country: 'malaysia' },
    {       coin: 'falcon-finance',       country: 'vietnam' },
    {       coin: 'falcon-finance',       country: 'thailand' },
    {       coin: 'falcon-finance',       country: 'south-korea' },
    {       coin: 'falcon-finance',       country: 'singapore' },
    {       coin: 'falcon-finance',       country: 'uae' },
    {       coin: 'falcon-finance',       country: 'saudi-arabia' },
    {       coin: 'falcon-finance',       country: 'sri-lanka' },
    {       coin: 'falcon-finance',       country: 'nepal' },
    {       coin: 'falcon-finance',       country: 'japan' },
    {       coin: 'falcon-finance',       country: 'china' },
    {       coin: 'falcon-finance',       country: 'myanmar' },
    {       coin: 'falcon-finance',       country: 'cambodia' },
    {       coin: 'falcon-finance',       country: 'laos' },
    {       coin: 'falcon-finance',       country: 'mongolia' },
    {       coin: 'pi-network',       country: 'pakistan' },
    {       coin: 'pi-network',       country: 'india' },
    {       coin: 'pi-network',       country: 'indonesia' },
    {       coin: 'pi-network',       country: 'philippines' },
    {       coin: 'pi-network',       country: 'bangladesh' },
    {       coin: 'pi-network',       country: 'malaysia' },
    {       coin: 'pi-network',       country: 'vietnam' },
    {       coin: 'pi-network',       country: 'thailand' },
    {       coin: 'pi-network',       country: 'south-korea' },
    {       coin: 'pi-network',       country: 'singapore' },
    {       coin: 'pi-network',       country: 'uae' },
    {       coin: 'pi-network',       country: 'saudi-arabia' },
    {       coin: 'pi-network',       country: 'sri-lanka' },
    {       coin: 'pi-network',       country: 'nepal' },
    {       coin: 'pi-network',       country: 'japan' },
    {       coin: 'pi-network',       country: 'china' },
    {       coin: 'pi-network',       country: 'myanmar' },
    {       coin: 'pi-network',       country: 'cambodia' },
    {       coin: 'pi-network',       country: 'laos' },
    {       coin: 'pi-network',       country: 'mongolia' },
    {       coin: 'okb',       country: 'pakistan' },
    {       coin: 'okb',       country: 'india' },
    {       coin: 'okb',       country: 'indonesia' },
    {       coin: 'okb',       country: 'philippines' },
    {       coin: 'okb',       country: 'bangladesh' },
    {       coin: 'okb',       country: 'malaysia' },
    {       coin: 'okb',       country: 'vietnam' },
    {       coin: 'okb',       country: 'thailand' },
    {       coin: 'okb',       country: 'south-korea' },
    {       coin: 'okb',       country: 'singapore' },
    {       coin: 'okb',       country: 'uae' },
    {       coin: 'okb',       country: 'saudi-arabia' },
    {       coin: 'okb',       country: 'sri-lanka' },
    {       coin: 'okb',       country: 'nepal' },
    {       coin: 'okb',       country: 'japan' },
    {       coin: 'okb',       country: 'china' },
    {       coin: 'okb',       country: 'myanmar' },
    {       coin: 'okb',       country: 'cambodia' },
    {       coin: 'okb',       country: 'laos' },
    {       coin: 'okb',       country: 'mongolia' },
    {       coin: 'near',       country: 'pakistan' },
    {       coin: 'near',       country: 'india' },
    {       coin: 'near',       country: 'indonesia' },
    {       coin: 'near',       country: 'philippines' },
    {       coin: 'near',       country: 'bangladesh' },
    {       coin: 'near',       country: 'malaysia' },
    {       coin: 'near',       country: 'vietnam' },
    {       coin: 'near',       country: 'thailand' },
    {       coin: 'near',       country: 'south-korea' },
    {       coin: 'near',       country: 'singapore' },
    {       coin: 'near',       country: 'uae' },
    {       coin: 'near',       country: 'saudi-arabia' },
    {       coin: 'near',       country: 'sri-lanka' },
    {       coin: 'near',       country: 'nepal' },
    {       coin: 'near',       country: 'japan' },
    {       coin: 'near',       country: 'china' },
    {       coin: 'near',       country: 'myanmar' },
    {       coin: 'near',       country: 'cambodia' },
    {       coin: 'near',       country: 'laos' },
    {       coin: 'near',       country: 'mongolia' },
    {       coin: 'aster-2',       country: 'pakistan' },
    {       coin: 'aster-2',       country: 'india' },
    {       coin: 'aster-2',       country: 'indonesia' },
    {       coin: 'aster-2',       country: 'philippines' },
    {       coin: 'aster-2',       country: 'bangladesh' },
    {       coin: 'aster-2',       country: 'malaysia' },
    {       coin: 'aster-2',       country: 'vietnam' },
    {       coin: 'aster-2',       country: 'thailand' },
    {       coin: 'aster-2',       country: 'south-korea' },
    {       coin: 'aster-2',       country: 'singapore' },
    {       coin: 'aster-2',       country: 'uae' },
    {       coin: 'aster-2',       country: 'saudi-arabia' },
    {       coin: 'aster-2',       country: 'sri-lanka' },
    {       coin: 'aster-2',       country: 'nepal' },
    {       coin: 'aster-2',       country: 'japan' },
    {       coin: 'aster-2',       country: 'china' },
    {       coin: 'aster-2',       country: 'myanmar' },
    {       coin: 'aster-2',       country: 'cambodia' },
    {       coin: 'aster-2',       country: 'laos' },
    {       coin: 'aster-2',       country: 'mongolia' }
  ]
}

export async function generateMetadata({ params }) {
  const { coin, country } = params
  
  try {
    const coinData = await getCoinDetail(coin, false, false, true, false, false, false)
    const countryData = ASIA_COUNTRIES.find(c => c.code.toLowerCase() === country.toLowerCase())
    
    const coinName = coinData?.name || 'Cryptocurrency'
    const countryName = countryData?.name || 'Country'
    
    return {
      title: `How to Buy ${coinName} in ${countryName} (2026) | Step by Step Guide`,
      description: `Complete guide on how to buy ${coinName} in ${countryName}. Learn about exchanges, payment methods, regulations, and step-by-step instructions for Asian investors.`,
      keywords: [
        `buy ${coinName.toLowerCase()} ${countryName.toLowerCase()}`,
        `${coinName.toLowerCase()} ${countryName.toLowerCase()} exchange`,
        'cryptocurrency buying guide',
        'asian crypto exchange',
        `crypto ${countryName.toLowerCase()}`,
        `${coinName.toLowerCase()} trading ${countryName.toLowerCase()}`,
        'how to buy crypto',
        'crypto exchange guide',
        'cryptocurrency regulations'
      ],
      openGraph: {
        title: `How to Buy ${coinName} in ${countryName}`,
        description: `Complete step-by-step guide to buy ${coinName} in ${countryName}. Exchanges, payment methods, and regulations.`,
        type: 'article',
        url: `https://cryptoasia.com/buy/${coin}/${country}`,
        images: [
          {
            url: coinData?.image?.large || '/og-buy.png',
            width: 1200,
            height: 630,
            alt: `Buy ${coinName} in ${countryName}`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `How to Buy ${coinName} in ${countryName}`,
        description: `Complete guide to buy ${coinName} in ${countryName} for Asian investors.`,
        images: [coinData?.image?.large || '/og-buy.png'],
      },
      alternates: {
        canonical: `https://cryptoasia.com/buy/${coin}/${country}`,
      },
    }
  } catch (error) {
    return {
      title: 'How to Buy Cryptocurrency | CryptoAsia',
      description: 'Complete guide to buy cryptocurrency in Asian markets.',
    }
  }
}

export default async function BuyPage({ params }) {
  const { coin, country } = params
  
  try {
    const [coinData, exchanges] = await Promise.all([
      getCoinDetail(coin, false, false, true, false, false, false),
      getExchangesByCountry(country)
    ])

    if (!coinData) {
      throw new Error('Coin not found')
    }

    const countryData = ASIA_COUNTRIES.find(c => c.code.toLowerCase() === country.toLowerCase())
    const currentPrice = coinData.market_data?.current_price?.usd || 0
    const marketCap = coinData.market_data?.market_cap?.usd || 0

    // HowTo Schema
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `How to Buy ${coinData.name} in ${countryData?.name || country}`,
      "description": `Step-by-step guide to purchase ${coinData.name} cryptocurrency in ${countryData?.name || country}`,
      "image": coinData.image?.large,
      "totalTime": "PT30M",
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Cryptocurrency Exchange Account",
          "image": "/exchange-account.png"
        },
        {
          "@type": "HowToSupply", 
          "name": "Payment Method",
          "image": "/payment-method.png"
        },
        {
          "@type": "HowToSupply",
          "name": "Digital Wallet",
          "image": "/wallet.png"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Cryptocurrency Exchange",
          "image": "/exchange.png"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Choose a Cryptocurrency Exchange",
          "text": `Select a reputable cryptocurrency exchange that operates in ${countryData?.name || country} and supports ${coinData.name} trading.`
        },
        {
          "@type": "HowToStep", 
          "name": "Create and Verify Your Account",
          "text": "Sign up for an account and complete the identity verification process (KYC) as required by regulations."
        },
        {
          "@type": "HowToStep",
          "name": "Add Payment Method",
          "text": "Link your bank account, credit card, or other supported payment method to fund your account."
        },
        {
          "@type": "HowToStep",
          "name": "Place Your Order",
          "text": `Navigate to the trading interface, select ${coinData.name}, and enter the amount you wish to purchase.`
        },
        {
          "@type": "HowToStep",
          "name": "Secure Your Investment",
          "text": "Transfer your ${coinData.name} to a secure wallet for long-term storage."
        }
      ]
    }

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Is it legal to buy ${coinData.name} in ${countryData?.name || country}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Cryptocurrency regulations vary by country. In ${countryData?.name || country}, ${coinData.name} trading is generally permitted, but always check current local regulations and tax requirements.`
          }
        },
        {
          "@type": "Question",
          "name": `What exchanges can I use to buy ${coinData.name} in ${countryData?.name || country}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Popular exchanges like Binance, OKX, KuCoin, and others operate in ${countryData?.name || country} and support ${coinData.name} trading. Choose exchanges with proper licensing and security measures.`
          }
        },
        {
          "@type": "Question",
          "name": `What payment methods are accepted for buying ${coinData.name} in ${countryData?.name || country}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Common payment methods include bank transfers, credit/debit cards, and local payment systems. Availability varies by exchange and country.`
          }
        },
        {
          "@type": "Question",
          "name": `How much ${coinData.name} can I buy in ${countryData?.name || country}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Purchase limits vary by exchange and verification level. Most exchanges allow daily limits from $1,000 to $50,000 for verified users.`
          }
        },
        {
          "@type": "Question",
          "name": `What are the fees for buying ${coinData.name} in ${countryData?.name || country}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Trading fees typically range from 0.1% to 0.5% per transaction. Additional fees may apply for deposits, withdrawals, or payment processing.`
          }
        }
      ]
    }

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://cryptoasia.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": coinData.name,
          "item": `https://cryptoasia.com/coins/${coin}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `Buy in ${countryData?.name || country}`,
          "item": `https://cryptoasia.com/buy/${coin}/${country}`
        }
      ]
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        
        <div className="min-h-screen">
          {/* Breadcrumb */}
          <div className="bg-gray-800 py-3">
            <div className="container">
              <div className="breadcrumb">
                <Link href="/" className="text-blue-400 hover:text-blue-300">Home</Link>
                <span className="separator">/</span>
                <Link href={`/coins/${coin}`} className="text-blue-400 hover:text-blue-300">
                  {coinData.name}
                </Link>
                <span className="separator">/</span>
                <span>Buy in {countryData?.name || country}</span>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-8">
            <div className="container">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={coinData.image.large}
                      alt={coinData.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-1">
                        How to Buy {coinData.name} in {countryData?.name || country}
                      </h1>
                      <div className="text-xl text-gray-300 uppercase">
                        {coinData.symbol}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-gray-300 mb-4">
                    Current Price: ${currentPrice.toLocaleString()} | Market Cap: ${(marketCap / 1e9).toFixed(2)}B
                  </div>
                  
                  <div className="text-gray-300">
                    Complete step-by-step guide for Asian investors (2026)
                  </div>
                </div>

                <div className="text-center">
                  {countryData?.flag && (
                    <div className="text-6xl mb-2">{countryData.flag}</div>
                  )}
                  <div className="text-white font-medium">{countryData?.name || country}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Step by Step Guide */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Step by Step Guide
                  </h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">
                          Choose a Cryptocurrency Exchange
                        </h3>
                        <p className="text-gray-300">
                          Select a reputable cryptocurrency exchange that operates in {countryData?.name || country} and supports {coinData.name} trading. Look for exchanges with proper licensing, security measures, and good user reviews.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">
                          Create and Verify Your Account
                        </h3>
                        <p className="text-gray-300">
                          Sign up for an account and complete the identity verification process (KYC) as required by regulations. You'll typically need to provide government-issued ID and proof of address.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">
                          Add Payment Method
                        </h3>
                        <p className="text-gray-300">
                          Link your bank account, credit card, or other supported payment method to fund your account. Payment options vary by exchange and country.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        4
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">
                          Place Your Order
                        </h3>
                        <p className="text-gray-300">
                          Navigate to the trading interface, select {coinData.name}, and enter the amount you wish to purchase. Review the fees and confirm your transaction.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        5
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">
                          Secure Your Investment
                        </h3>
                        <p className="text-gray-300">
                          Transfer your {coinData.name} to a secure wallet for long-term storage. Consider hardware wallets for maximum security.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exchange Comparison */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Best Exchanges in {countryData?.name || country}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Exchange</th>
                          <th className="text-center py-3 px-4 text-gray-400 font-medium">Fees</th>
                          <th className="text-center py-3 px-4 text-gray-400 font-medium">Rating</th>
                          <th className="text-center py-3 px-4 text-gray-400 font-medium">Payment Methods</th>
                          <th className="text-center py-3 px-4 text-gray-400 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exchanges.slice(0, 5).map((exchange) => (
                          <tr key={exchange.slug} className="border-b border-gray-700">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  {exchange.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="text-white font-medium">{exchange.name}</div>
                                  <div className="text-gray-400 text-sm">Trust Score: {exchange.trustScore}/10</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-center text-gray-300">
                              {exchange.fees.taker}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <div className="text-yellow-400">{'\u2605'.repeat(Math.floor(exchange.rating))}</div>
                            </td>
                            <td className="py-4 px-4 text-center text-gray-300 text-sm">
                              {exchange.paymentMethods.slice(0, 2).join(', ')}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <Link
                                href={`/exchanges/${exchange.slug}`}
                                className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                              >
                                Trade
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Accepted Payment Methods
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exchanges[0]?.paymentMethods?.slice(0, 6).map((method, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <div className="text-white font-medium mb-2">{method}</div>
                        <div className="text-gray-400 text-sm">
                          {method === 'Bank Transfer' && 'Direct bank transfers with 1-3 business days processing'}
                          {method === 'Credit Card' && 'Instant purchases with 3-5% processing fees'}
                          {method === 'Debit Card' && 'Instant purchases with lower fees than credit cards'}
                          {method === 'P2P Trading' && 'Peer-to-peer trading with various payment options'}
                          {method === 'Cryptocurrency' && 'Deposit other crypto to trade for {coinData.name}'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safety Tips */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Safety Tips
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-white mb-2">
                        Use Reputable Exchanges
                      </h3>
                      <p className="text-gray-300">
                        Only use well-established exchanges with proper licensing and security measures. Check user reviews and regulatory compliance.
                      </p>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-white mb-2">
                        Enable Two-Factor Authentication
                      </h3>
                      <p className="text-gray-300">
                        Always enable 2FA on your exchange accounts and use authenticator apps rather than SMS for better security.
                      </p>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-white mb-2">
                        Store in Secure Wallets
                      </h3>
                      <p className="text-gray-300">
                        Transfer your {coinData.name} to hardware wallets or other secure storage options after purchase.
                      </p>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-white mb-2">
                        Understand Tax Implications
                      </h3>
                      <p className="text-gray-300">
                        Be aware of tax requirements for cryptocurrency transactions in {countryData?.name || country}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Other Countries */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Buy {coinData.name} in Other Countries
                  </h3>
                  <div className="space-y-2">
                    {ASIA_COUNTRIES.slice(0, 8).map((country) => (
                      <Link
                        key={country.code}
                        href={`/buy/${coin}/${country.code.toLowerCase()}`}
                        className="block p-2 rounded hover:bg-gray-700"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white">{country.name}</span>
                          <span className="text-gray-400">{country.flag}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Other Coins */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Buy Other Coins in {countryData?.name || country}
                  </h3>
                  <div className="space-y-2">
                    {TOP_50_COINS.slice(0, 6).map((coinSlug) => (
                      <Link
                        key={coinSlug}
                        href={`/buy/${coinSlug}/${country}`}
                        className="block p-2 rounded hover:bg-gray-700"
                      >
                        <div className="text-white capitalize">
                          {coinSlug.replace('-', ' ')}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-3">
                    <Link href={`/coins/${coin}`} className="block text-blue-400 hover:text-blue-300">
                      {coinData.name} Price
                    </Link>
                    <Link href={`/price/${coin}/usd`} className="block text-blue-400 hover:text-blue-300">
                      {coinData.name} Price Chart
                    </Link>
                    <Link href={`/prediction/${coin}/2025`} className="block text-blue-400 hover:text-blue-300">
                      {coinData.name} Price Prediction
                    </Link>
                    <Link href={`/exchanges`} className="block text-blue-400 hover:text-blue-300">
                      All Exchanges
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.error('Buy page error:', error)
    
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Guide Not Available</h1>
          <p className="text-gray-300 mb-8">
            The buying guide for this cryptocurrency and country combination is not available.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    )
  }
}
