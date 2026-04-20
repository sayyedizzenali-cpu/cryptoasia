import { getCoinDetail, getCoinMultiPrice, formatPrice, formatChange, formatMarketCap } from '@/lib/coingecko'
import Link from 'next/link'

export const revalidate = 3600 // ISR revalidate every hour
export const dynamicParams = true // Enable ISR for all combinations

// Top 20 coins for comparison combinations
const TOP_20_COINS = [
  'bitcoin', 'ethereum', 'tether', 'binance-coin', 'solana', 'xrp', 'usd-coin',
  'cardano', 'avalanche-2', 'dogecoin', 'polkadot-new', 'tron', 'chainlink',
  'polygon-ecosystem-token', 'uniswap', 'litecoin', 'ethereum-classic', 'stellar',
  'filecoin', 'cosmos'
]





export async function generateStaticParams() {
  return [
    {       pair: 'bitcoin-vs-ethereum' },
    {       pair: 'bitcoin-vs-tether' },
    {       pair: 'bitcoin-vs-ripple' },
    {       pair: 'bitcoin-vs-binancecoin' },
    {       pair: 'bitcoin-vs-usd-coin' },
    {       pair: 'bitcoin-vs-solana' },
    {       pair: 'bitcoin-vs-tron' },
    {       pair: 'bitcoin-vs-figure-heloc' },
    {       pair: 'bitcoin-vs-dogecoin' },
    {       pair: 'bitcoin-vs-whitebit' },
    {       pair: 'bitcoin-vs-usds' },
    {       pair: 'bitcoin-vs-hyperliquid' },
    {       pair: 'bitcoin-vs-leo-token' },
    {       pair: 'bitcoin-vs-cardano' },
    {       pair: 'bitcoin-vs-bitcoin-cash' },
    {       pair: 'bitcoin-vs-chainlink' },
    {       pair: 'bitcoin-vs-monero' },
    {       pair: 'bitcoin-vs-memecore' },
    {       pair: 'bitcoin-vs-canton-network' },
    {       pair: 'ethereum-vs-tether' },
    {       pair: 'ethereum-vs-ripple' },
    {       pair: 'ethereum-vs-binancecoin' },
    {       pair: 'ethereum-vs-usd-coin' },
    {       pair: 'ethereum-vs-solana' },
    {       pair: 'ethereum-vs-tron' },
    {       pair: 'ethereum-vs-figure-heloc' },
    {       pair: 'ethereum-vs-dogecoin' },
    {       pair: 'ethereum-vs-whitebit' },
    {       pair: 'ethereum-vs-usds' },
    {       pair: 'ethereum-vs-hyperliquid' },
    {       pair: 'ethereum-vs-leo-token' },
    {       pair: 'ethereum-vs-cardano' },
    {       pair: 'ethereum-vs-bitcoin-cash' },
    {       pair: 'ethereum-vs-chainlink' },
    {       pair: 'ethereum-vs-monero' },
    {       pair: 'ethereum-vs-memecore' },
    {       pair: 'ethereum-vs-canton-network' },
    {       pair: 'tether-vs-ripple' },
    {       pair: 'tether-vs-binancecoin' },
    {       pair: 'tether-vs-usd-coin' },
    {       pair: 'tether-vs-solana' },
    {       pair: 'tether-vs-tron' },
    {       pair: 'tether-vs-figure-heloc' },
    {       pair: 'tether-vs-dogecoin' },
    {       pair: 'tether-vs-whitebit' },
    {       pair: 'tether-vs-usds' },
    {       pair: 'tether-vs-hyperliquid' },
    {       pair: 'tether-vs-leo-token' },
    {       pair: 'tether-vs-cardano' },
    {       pair: 'tether-vs-bitcoin-cash' },
    {       pair: 'tether-vs-chainlink' },
    {       pair: 'tether-vs-monero' },
    {       pair: 'tether-vs-memecore' },
    {       pair: 'tether-vs-canton-network' },
    {       pair: 'ripple-vs-binancecoin' },
    {       pair: 'ripple-vs-usd-coin' },
    {       pair: 'ripple-vs-solana' },
    {       pair: 'ripple-vs-tron' },
    {       pair: 'ripple-vs-figure-heloc' },
    {       pair: 'ripple-vs-dogecoin' },
    {       pair: 'ripple-vs-whitebit' },
    {       pair: 'ripple-vs-usds' },
    {       pair: 'ripple-vs-hyperliquid' },
    {       pair: 'ripple-vs-leo-token' },
    {       pair: 'ripple-vs-cardano' },
    {       pair: 'ripple-vs-bitcoin-cash' },
    {       pair: 'ripple-vs-chainlink' },
    {       pair: 'ripple-vs-monero' },
    {       pair: 'ripple-vs-memecore' },
    {       pair: 'ripple-vs-canton-network' },
    {       pair: 'binancecoin-vs-usd-coin' },
    {       pair: 'binancecoin-vs-solana' },
    {       pair: 'binancecoin-vs-tron' },
    {       pair: 'binancecoin-vs-figure-heloc' },
    {       pair: 'binancecoin-vs-dogecoin' },
    {       pair: 'binancecoin-vs-whitebit' },
    {       pair: 'binancecoin-vs-usds' },
    {       pair: 'binancecoin-vs-hyperliquid' },
    {       pair: 'binancecoin-vs-leo-token' },
    {       pair: 'binancecoin-vs-cardano' },
    {       pair: 'binancecoin-vs-bitcoin-cash' },
    {       pair: 'binancecoin-vs-chainlink' },
    {       pair: 'binancecoin-vs-monero' },
    {       pair: 'binancecoin-vs-memecore' },
    {       pair: 'binancecoin-vs-canton-network' },
    {       pair: 'usd-coin-vs-solana' },
    {       pair: 'usd-coin-vs-tron' },
    {       pair: 'usd-coin-vs-figure-heloc' },
    {       pair: 'usd-coin-vs-dogecoin' },
    {       pair: 'usd-coin-vs-whitebit' },
    {       pair: 'usd-coin-vs-usds' },
    {       pair: 'usd-coin-vs-hyperliquid' },
    {       pair: 'usd-coin-vs-leo-token' },
    {       pair: 'usd-coin-vs-cardano' },
    {       pair: 'usd-coin-vs-bitcoin-cash' },
    {       pair: 'usd-coin-vs-chainlink' },
    {       pair: 'usd-coin-vs-monero' },
    {       pair: 'usd-coin-vs-memecore' },
    {       pair: 'usd-coin-vs-canton-network' },
    {       pair: 'solana-vs-tron' },
    {       pair: 'solana-vs-figure-heloc' },
    {       pair: 'solana-vs-dogecoin' },
    {       pair: 'solana-vs-whitebit' },
    {       pair: 'solana-vs-usds' },
    {       pair: 'solana-vs-hyperliquid' },
    {       pair: 'solana-vs-leo-token' },
    {       pair: 'solana-vs-cardano' },
    {       pair: 'solana-vs-bitcoin-cash' },
    {       pair: 'solana-vs-chainlink' },
    {       pair: 'solana-vs-monero' },
    {       pair: 'solana-vs-memecore' },
    {       pair: 'solana-vs-canton-network' },
    {       pair: 'tron-vs-figure-heloc' },
    {       pair: 'tron-vs-dogecoin' },
    {       pair: 'tron-vs-whitebit' },
    {       pair: 'tron-vs-usds' },
    {       pair: 'tron-vs-hyperliquid' },
    {       pair: 'tron-vs-leo-token' },
    {       pair: 'tron-vs-cardano' },
    {       pair: 'tron-vs-bitcoin-cash' },
    {       pair: 'tron-vs-chainlink' },
    {       pair: 'tron-vs-monero' },
    {       pair: 'tron-vs-memecore' },
    {       pair: 'tron-vs-canton-network' },
    {       pair: 'figure-heloc-vs-dogecoin' },
    {       pair: 'figure-heloc-vs-whitebit' },
    {       pair: 'figure-heloc-vs-usds' },
    {       pair: 'figure-heloc-vs-hyperliquid' },
    {       pair: 'figure-heloc-vs-leo-token' },
    {       pair: 'figure-heloc-vs-cardano' },
    {       pair: 'figure-heloc-vs-bitcoin-cash' },
    {       pair: 'figure-heloc-vs-chainlink' },
    {       pair: 'figure-heloc-vs-monero' },
    {       pair: 'figure-heloc-vs-memecore' },
    {       pair: 'figure-heloc-vs-canton-network' },
    {       pair: 'dogecoin-vs-whitebit' },
    {       pair: 'dogecoin-vs-usds' },
    {       pair: 'dogecoin-vs-hyperliquid' },
    {       pair: 'dogecoin-vs-leo-token' },
    {       pair: 'dogecoin-vs-cardano' },
    {       pair: 'dogecoin-vs-bitcoin-cash' },
    {       pair: 'dogecoin-vs-chainlink' },
    {       pair: 'dogecoin-vs-monero' },
    {       pair: 'dogecoin-vs-memecore' },
    {       pair: 'dogecoin-vs-canton-network' },
    {       pair: 'whitebit-vs-usds' },
    {       pair: 'whitebit-vs-hyperliquid' },
    {       pair: 'whitebit-vs-leo-token' },
    {       pair: 'whitebit-vs-cardano' },
    {       pair: 'whitebit-vs-bitcoin-cash' },
    {       pair: 'whitebit-vs-chainlink' },
    {       pair: 'whitebit-vs-monero' },
    {       pair: 'whitebit-vs-memecore' },
    {       pair: 'whitebit-vs-canton-network' },
    {       pair: 'usds-vs-hyperliquid' },
    {       pair: 'usds-vs-leo-token' },
    {       pair: 'usds-vs-cardano' },
    {       pair: 'usds-vs-bitcoin-cash' },
    {       pair: 'usds-vs-chainlink' },
    {       pair: 'usds-vs-monero' },
    {       pair: 'usds-vs-memecore' },
    {       pair: 'usds-vs-canton-network' },
    {       pair: 'hyperliquid-vs-leo-token' },
    {       pair: 'hyperliquid-vs-cardano' },
    {       pair: 'hyperliquid-vs-bitcoin-cash' },
    {       pair: 'hyperliquid-vs-chainlink' },
    {       pair: 'hyperliquid-vs-monero' },
    {       pair: 'hyperliquid-vs-memecore' },
    {       pair: 'hyperliquid-vs-canton-network' },
    {       pair: 'leo-token-vs-cardano' },
    {       pair: 'leo-token-vs-bitcoin-cash' },
    {       pair: 'leo-token-vs-chainlink' },
    {       pair: 'leo-token-vs-monero' },
    {       pair: 'leo-token-vs-memecore' },
    {       pair: 'leo-token-vs-canton-network' },
    {       pair: 'cardano-vs-bitcoin-cash' },
    {       pair: 'cardano-vs-chainlink' },
    {       pair: 'cardano-vs-monero' },
    {       pair: 'cardano-vs-memecore' },
    {       pair: 'cardano-vs-canton-network' },
    {       pair: 'bitcoin-cash-vs-chainlink' },
    {       pair: 'bitcoin-cash-vs-monero' },
    {       pair: 'bitcoin-cash-vs-memecore' },
    {       pair: 'bitcoin-cash-vs-canton-network' },
    {       pair: 'chainlink-vs-monero' },
    {       pair: 'chainlink-vs-memecore' },
    {       pair: 'chainlink-vs-canton-network' },
    {       pair: 'monero-vs-memecore' },
    {       pair: 'monero-vs-canton-network' },
    {       pair: 'memecore-vs-canton-network' }
  ]
}

export async function generateMetadata({ params }) {
  const { pair } = params
  
  try {
    const [coin1Id, coin2Id] = pair.split('-vs-')
    const [coin1Data, coin2Data] = await Promise.all([
      getCoinDetail(coin1Id, false, false, true, false, false, false),
      getCoinDetail(coin2Id, false, false, true, false, false, false)
    ])

    if (!coin1Data || !coin2Data) {
      throw new Error('Coin data not available')
    }

    return {
      title: `${coin1Data.name} vs ${coin2Data.name} | Price, Market Cap, Performance Comparison`,
      description: `Compare ${coin1Data.name} vs ${coin2Data.name}: price, market cap, volume, technology, and investment analysis. Real-time data and comprehensive comparison for Asian investors.`,
      keywords: [
        `${coin1Data.name.toLowerCase()} vs ${coin2Data.name.toLowerCase()}`,
        `${coin1Data.symbol.toLowerCase()} ${coin2Data.symbol.toLowerCase()} comparison`,
        'cryptocurrency comparison',
        'crypto analysis',
        'investment comparison',
        'asian crypto',
        `${coin1Data.name.toLowerCase()} analysis`,
        `${coin2Data.name.toLowerCase()} analysis`
      ],
      openGraph: {
        title: `${coin1Data.name} vs ${coin2Data.name} Comparison`,
        description: `Comprehensive comparison of ${coin1Data.name} and ${coin2Data.name} with real-time price, market cap, and technical analysis.`,
        type: 'article',
        url: `https://cryptoasia.com/compare/${pair}`,
        images: [
          {
            url: '/og-comparison.png',
            width: 1200,
            height: 630,
            alt: `${coin1Data.name} vs ${coin2Data.name} Comparison`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${coin1Data.name} vs ${coin2Data.name} Comparison`,
        description: `Compare ${coin1Data.name} and ${coin2Data.name} with real-time data and analysis.`,
        images: ['/og-comparison.png'],
      },
      alternates: {
        canonical: `https://cryptoasia.com/compare/${pair}`,
      },
    }
  } catch (error) {
    return {
      title: 'Cryptocurrency Comparison | CryptoAsia',
      description: 'Compare cryptocurrencies with real-time data and analysis.',
    }
  }
}

// Technology comparison data
function getTechnologyData(coinId) {
  const techData = {
    'bitcoin': {
      consensus: 'Proof of Work',
      tps: '3-7',
      blockTime: '10 minutes',
      founded: '2009',
      useCase: 'Digital Gold, Store of Value'
    },
    'ethereum': {
      consensus: 'Proof of Stake',
      tps: '15-30',
      blockTime: '12-15 seconds',
      founded: '2015',
      useCase: 'Smart Contracts, DeFi, dApps'
    },
    'solana': {
      consensus: 'Proof of History + Proof of Stake',
      tps: '65,000',
      blockTime: '400ms',
      founded: '2020',
      useCase: 'High-speed dApps, DeFi'
    },
    'cardano': {
      consensus: 'Proof of Stake',
      tps: '250',
      blockTime: '20 seconds',
      founded: '2017',
      useCase: 'Sustainable Smart Contracts'
    },
    'binance-coin': {
      consensus: 'Proof of Stake Authority',
      tps: '100+',
      blockTime: '3 seconds',
      founded: '2017',
      useCase: 'Exchange Token, BSC Ecosystem'
    },
    'polkadot-new': {
      consensus: 'Nominated Proof of Stake',
      tps: '1,000+',
      blockTime: '6 seconds',
      founded: '2020',
      useCase: 'Multi-chain Interoperability'
    },
    'avalanche-2': {
      consensus: 'Proof of Stake',
      tps: '4,500+',
      blockTime: '2 seconds',
      founded: '2020',
      useCase: 'Custom Blockchains, DeFi'
    },
    'chainlink': {
      consensus: 'Proof of Stake',
      tps: '1,000+',
      blockTime: '2 seconds',
      founded: '2017',
      useCase: 'Oracle Network, Smart Contracts'
    }
  }

  return techData[coinId] || {
    consensus: 'Various',
    tps: 'Varies',
    blockTime: 'Varies',
    founded: 'Unknown',
    useCase: 'Cryptocurrency'
  }
}

export default async function ComparisonPage({ params }) {
  const { pair } = params
  
  try {
    const [coin1Id, coin2Id] = pair.split('-vs-')
    
    const [coin1Data, coin2Data, priceData] = await Promise.all([
      getCoinDetail(coin1Id, false, false, true, false, false, false),
      getCoinDetail(coin2Id, false, false, true, false, false, false),
      getCoinMultiPrice([coin1Id, coin2Id], ['usd'])
    ])

    if (!coin1Data || !coin2Data || !priceData[coin1Id] || !priceData[coin2Id]) {
      throw new Error('Comparison data not available')
    }

    const coin1Price = priceData[coin1Id].usd
    const coin2Price = priceData[coin2Id].usd
    const coin1Tech = getTechnologyData(coin1Id)
    const coin2Tech = getTechnologyData(coin2Id)

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Which is better: ${coin1Data.name} or ${coin2Data.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The choice between ${coin1Data.name} and ${coin2Data.name} depends on your investment goals. ${coin1Data.name} focuses on ${coin1Tech.useCase} while ${coin2Data.name} excels in ${coin2Tech.useCase}. Consider factors like market cap, technology, and use case.`
          }
        },
        {
          "@type": "Question",
          "name": `What is the price difference between ${coin1Data.name} and ${coin2Data.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Current prices: ${coin1Data.name} at $${coin1Price.toLocaleString()} and ${coin2Data.name} at $${coin2Price.toLocaleString()}. The price ratio is ${(coin1Price / coin2Price).toFixed(2)}:1.`
          }
        },
        {
          "@type": "Question",
          "name": `Which has higher market cap: ${coin1Data.name} or ${coin2Data.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${coin1Data.market_data?.market_cap?.usd > coin2Data.market_data?.market_cap?.usd ? coin1Data.name : coin2Data.name} has the higher market cap at $${formatMarketCap(Math.max(coin1Data.market_data?.market_cap?.usd || 0, coin2Data.market_data?.market_cap?.usd || 0))}.`
          }
        },
        {
          "@type": "Question",
          "name": `Which is better for long-term investment?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Long-term investment potential depends on various factors including technology adoption, market position, and use case. ${coin1Data.name} offers ${coin1Tech.useCase.toLowerCase()} while ${coin2Data.name} provides ${coin2Tech.useCase.toLowerCase()}. Research both thoroughly.`
          }
        },
        {
          "@type": "Question",
          "name": `Which has better technology?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${coin1Data.name} uses ${coin1Tech.consensus} with ${coin1Tech.tps} TPS, while ${coin2Data.name} uses ${coin2Tech.consensus} with ${coin2Tech.tps} TPS. Each serves different purposes and use cases.`
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
          "name": "Compare",
          "item": "https://cryptoasia.com/compare"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${coin1Data.name} vs ${coin2Data.name}`,
          "item": `https://cryptoasia.com/compare/${pair}`
        }
      ]
    }

    return (
      <>
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
                <Link href="/compare" className="text-blue-400 hover:text-blue-300">Compare</Link>
                <span className="separator">/</span>
                <span>{coin1Data.name} vs {coin2Data.name}</span>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-8">
            <div className="container">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">
                  {coin1Data.name} vs {coin2Data.name}
                </h1>
                <p className="text-gray-300 text-lg">
                  Comprehensive comparison of price, market cap, technology, and investment potential
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Coin 1 */}
                <div className="text-center">
                  <img
                    src={coin1Data.image.large}
                    alt={coin1Data.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-bold text-white mb-2">{coin1Data.name}</h2>
                  <div className="text-xl text-gray-300 uppercase mb-4">{coin1Data.symbol}</div>
                  <div className="text-3xl font-bold text-white mb-2">
                    ${coin1Price.toLocaleString()}
                  </div>
                  <div className={`text-lg ${coin1Data.market_data?.price_change_percentage_24h >= 0 ? 'text-green' : 'text-red'}`}>
                    {formatChange(coin1Data.market_data?.price_change_percentage_24h || 0)}
                  </div>
                </div>

                {/* VS Divider */}
                <div className="flex items-center justify-center">
                  <div className="text-2xl font-bold text-gray-400">VS</div>
                </div>

                {/* Coin 2 */}
                <div className="text-center">
                  <img
                    src={coin2Data.image.large}
                    alt={coin2Data.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-bold text-white mb-2">{coin2Data.name}</h2>
                  <div className="text-xl text-gray-300 uppercase mb-4">{coin2Data.symbol}</div>
                  <div className="text-3xl font-bold text-white mb-2">
                    ${coin2Price.toLocaleString()}
                  </div>
                  <div className={`text-lg ${coin2Data.market_data?.price_change_percentage_24h >= 0 ? 'text-green' : 'text-red'}`}>
                    {formatChange(coin2Data.market_data?.price_change_percentage_24h || 0)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-8">
            {/* Head to Head Stats */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Head to Head Statistics</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Metric</th>
                      <th className="text-center py-3 px-4 text-gray-400 font-medium">{coin1Data.name}</th>
                      <th className="text-center py-3 px-4 text-gray-400 font-medium">{coin2Data.name}</th>
                      <th className="text-center py-3 px-4 text-gray-400 font-medium">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 px-4 text-white">Price</td>
                      <td className="py-4 px-4 text-center text-white font-medium">
                        ${coin1Price.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-center text-white font-medium">
                        ${coin2Price.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-center text-blue-400">
                        {coin1Price > coin2Price ? coin1Data.name : coin2Data.name}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 px-4 text-white">Market Cap</td>
                      <td className="py-4 px-4 text-center text-white font-medium">
                        {formatMarketCap(coin1Data.market_data?.market_cap?.usd || 0)}
                      </td>
                      <td className="py-4 px-4 text-center text-white font-medium">
                        {formatMarketCap(coin2Data.market_data?.market_cap?.usd || 0)}
                      </td>
                      <td className="py-4 px-4 text-center text-blue-400">
                        {(coin1Data.market_data?.market_cap?.usd || 0) > (coin2Data.market_data?.market_cap?.usd || 0) ? coin1Data.name : coin2Data.name}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 px-4 text-white">24h Volume</td>
                      <td className="py-4 px-4 text-center text-white font-medium">
                        {formatMarketCap(coin1Data.market_data?.total_volume?.usd || 0)}
                      </td>
                      <td className="py-4 px-4 text-center text-white font-medium">
                        {formatMarketCap(coin2Data.market_data?.total_volume?.usd || 0)}
                      </td>
                      <td className="py-4 px-4 text-center text-blue-400">
                        {(coin1Data.market_data?.total_volume?.usd || 0) > (coin2Data.market_data?.total_volume?.usd || 0) ? coin1Data.name : coin2Data.name}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 px-4 text-white">Rank</td>
                      <td className="py-4 px-4 text-center text-white font-medium">
                        #{coin1Data.market_cap_rank}
                      </td>
                      <td className="py-4 px-4 text-center text-white font-medium">
                        #{coin2Data.market_cap_rank}
                      </td>
                      <td className="py-4 px-4 text-center text-blue-400">
                        {coin1Data.market_cap_rank < coin2Data.market_cap_rank ? coin1Data.name : coin2Data.name}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 px-4 text-white">All-Time High</td>
                      <td className="py-4 px-4 text-center text-white font-medium">
                        ${coin1Data.market_data?.ath?.usd?.toLocaleString() || 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-center text-white font-medium">
                        ${coin2Data.market_data?.ath?.usd?.toLocaleString() || 'N/A'}
                      </td>
                      <td className="py-4 px-4 text-center text-blue-400">
                        {(coin1Data.market_data?.ath?.usd || 0) > (coin2Data.market_data?.ath?.usd || 0) ? coin1Data.name : coin2Data.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-white">24h Change</td>
                      <td className={`py-4 px-4 text-center font-medium ${coin1Data.market_data?.price_change_percentage_24h >= 0 ? 'text-green' : 'text-red'}`}>
                        {formatChange(coin1Data.market_data?.price_change_percentage_24h || 0)}
                      </td>
                      <td className={`py-4 px-4 text-center font-medium ${coin2Data.market_data?.price_change_percentage_24h >= 0 ? 'text-green' : 'text-red'}`}>
                        {formatChange(coin2Data.market_data?.price_change_percentage_24h || 0)}
                      </td>
                      <td className="py-4 px-4 text-center text-blue-400">
                        {(coin1Data.market_data?.price_change_percentage_24h || 0) > (coin2Data.market_data?.price_change_percentage_24h || 0) ? coin1Data.name : coin2Data.name}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Technology Comparison */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Technology Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Feature</th>
                      <th className="text-center py-3 px-4 text-gray-400 font-medium">{coin1Data.name}</th>
                      <th className="text-center py-3 px-4 text-gray-400 font-medium">{coin2Data.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 px-4 text-white">Consensus Mechanism</td>
                      <td className="py-4 px-4 text-center text-white">{coin1Tech.consensus}</td>
                      <td className="py-4 px-4 text-center text-white">{coin2Tech.consensus}</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 px-4 text-white">Transactions Per Second</td>
                      <td className="py-4 px-4 text-center text-white">{coin1Tech.tps}</td>
                      <td className="py-4 px-4 text-center text-white">{coin2Tech.tps}</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 px-4 text-white">Block Time</td>
                      <td className="py-4 px-4 text-center text-white">{coin1Tech.blockTime}</td>
                      <td className="py-4 px-4 text-center text-white">{coin2Tech.blockTime}</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 px-4 text-white">Founded</td>
                      <td className="py-4 px-4 text-center text-white">{coin1Tech.founded}</td>
                      <td className="py-4 px-4 text-center text-white">{coin2Tech.founded}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-white">Primary Use Case</td>
                      <td className="py-4 px-4 text-center text-white">{coin1Tech.useCase}</td>
                      <td className="py-4 px-4 text-center text-white">{coin2Tech.useCase}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Which is Better for Investment */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Which is Better for Investment?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-white mb-4">{coin1Data.name} - Investment Case</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Strengths</h4>
                      <ul className="text-gray-300 space-y-1">
                        <li>Established market position (Rank #{coin1Data.market_cap_rank})</li>
                        <li>Strong technology foundation with {coin1Tech.consensus}</li>
                        <li>Clear use case: {coin1Tech.useCase}</li>
                        <li>High transaction capacity: {coin1Tech.tps} TPS</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Best For</h4>
                      <p className="text-gray-300">
                        Investors seeking {coin1Tech.useCase.toLowerCase()} with proven track record and established ecosystem.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-medium text-white mb-4">{coin2Data.name} - Investment Case</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Strengths</h4>
                      <ul className="text-gray-300 space-y-1">
                        <li>Market position (Rank #{coin2Data.market_cap_rank})</li>
                        <li>Innovative {coin2Tech.consensus} technology</li>
                        <li>Specialized for {coin2Tech.useCase}</li>
                        <li>Performance: {coin2Tech.tps} TPS</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Best For</h4>
                      <p className="text-gray-300">
                        Investors interested in {coin2Tech.useCase.toLowerCase()} with modern technology approach.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-700 rounded-lg">
                <h4 className="text-white font-medium mb-2">Investment Recommendation</h4>
                <p className="text-gray-300">
                  The choice between {coin1Data.name} and {coin2Data.name} depends on your investment strategy and risk tolerance. 
                  {coin1Data.name} offers stability and proven track record, while {coin2Data.name} provides innovation and specialized use cases. 
                  Consider diversifying between both or choosing based on your specific investment goals.
                </p>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">
                    Which is better: {coin1Data.name} or {coin2Data.name}?
                  </h4>
                  <p className="text-gray-300">
                    The choice between {coin1Data.name} and {coin2Data.name} depends on your investment goals. {coin1Data.name} focuses on {coin1Tech.useCase} while {coin2Data.name} excels in {coin2Tech.useCase}. Consider factors like market cap, technology, and use case.
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">
                    What is the price difference between {coin1Data.name} and {coin2Data.name}?
                  </h4>
                  <p className="text-gray-300">
                    Current prices: {coin1Data.name} at ${coin1Price.toLocaleString()} and {coin2Data.name} at ${coin2Price.toLocaleString()}. The price ratio is {(coin1Price / coin2Price).toFixed(2)}:1.
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">
                    Which has higher market cap: {coin1Data.name} or {coin2Data.name}?
                  </h4>
                  <p className="text-gray-300">
                    {(coin1Data.market_data?.market_cap?.usd || 0) > (coin2Data.market_data?.market_cap?.usd || 0) ? coin1Data.name : coin2Data.name} has the higher market cap at ${formatMarketCap(Math.max(coin1Data.market_data?.market_cap?.usd || 0, coin2Data.market_data?.market_cap?.usd || 0))}.
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">
                    Which is better for long-term investment?
                  </h4>
                  <p className="text-gray-300">
                    Long-term investment potential depends on various factors including technology adoption, market position, and use case. {coin1Data.name} offers {coin1Tech.useCase.toLowerCase()} while {coin2Data.name} provides {coin2Tech.useCase.toLowerCase()}. Research both thoroughly.
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">
                    Which has better technology?
                  </h4>
                  <p className="text-gray-300">
                    {coin1Data.name} uses {coin1Tech.consensus} with {coin1Tech.tps} TPS, while {coin2Data.name} uses {coin2Tech.consensus} with {coin2Tech.tps} TPS. Each serves different purposes and use cases.
                  </p>
                </div>
              </div>
            </div>

            {/* Other Comparisons */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Other Comparisons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">{coin1Data.name} vs Others</h3>
                  <div className="space-y-2">
                    {TOP_20_COINS.slice(0, 5).filter(coin => coin !== coin1Id).map(coinId => (
                      <Link
                        key={coinId}
                        href={`/compare/${coin1Id}-vs-${coinId}`}
                        className="block p-2 rounded hover:bg-gray-700"
                      >
                        <span className="text-white capitalize">
                          {coin1Data.name} vs {coinId.replace('-', ' ')}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">{coin2Data.name} vs Others</h3>
                  <div className="space-y-2">
                    {TOP_20_COINS.slice(0, 5).filter(coin => coin !== coin2Id).map(coinId => (
                      <Link
                        key={coinId}
                        href={`/compare/${coin2Id}-vs-${coinId}`}
                        className="block p-2 rounded hover:bg-gray-700"
                      >
                        <span className="text-white capitalize">
                          {coin2Data.name} vs {coinId.replace('-', ' ')}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.error('Comparison page error:', error)
    
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Comparison Not Available</h1>
          <p className="text-gray-300 mb-8">
            The comparison for these cryptocurrencies is not available.
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
