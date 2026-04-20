import { getTopCoins, getCoinDetail, formatPrice, formatChange, formatMarketCap } from '@/lib/coingecko'
import { CURRENCIES } from '@/lib/coingecko'
import PriceChart from '@/components/PriceChart'
import NewsSection from '@/components/NewsSection'
import Link from 'next/link'

export const revalidate = 60 // ISR revalidate every 60 seconds
export const dynamicParams = true // Enable ISR for all coins

// Top 100 coins for static generation
const TOP_100_COINS = [
  'bitcoin', 'ethereum', 'tether', 'binance-coin', 'solana', 'xrp', 'usd-coin',
  'cardano', 'avalanche-2', 'dogecoin', 'polkadot-new', 'tron', 'chainlink',
  'polygon-ecosystem-token', 'uniswap', 'litecoin', 'ethereum-classic', 'stellar',
  'filecoin', 'cosmos', 'near', 'algorand', 'vechain', 'internet-computer',
  'the-sandbox', 'flow', 'aave', 'tezos', 'theta-token', 'helium',
  'ftx-token', 'elrond-erd-2', 'compound', 'wrapped-bitcoin', 'dash',
  'kava', 'pancakeswap-token', 'maker', 'eos', 'curve-dao-token',
  'decentraland', 'iota', 'neo', 'zcash', 'basic-attention-token',
  'quant-network', 'arweave', 'waves', 'holo', 'klay-token',
  'nem', 'chiliz', 'harmony', 'theta-fuel', 'ravencoin',
  'siacoin', 'enjin-coin', 'nano', 'icon', 'bitcoin-cash',
  'steem', 'iotex', 'ocean-protocol', 'qtum', 'husd',
  'pax-gold', 'verge', 'digibyte', '0x', 'zilliqa',
  'status', 'lisk', 'trueusd', 'bitcoin-diamond', 'omisego',
  'augur', 'golem', 'maidsafecoin', 'bytecoin-bcn', 'bitshares',
  'stratis', 'populous', 'wax', 'gxs-monaco', 'paxos-standard',
  'numeraire', 'ark', 'hush', 'digixdao', 'byteball',
  'gulden', 'monacoin', 'emercoin', 'bitcoindark', 'blackcoin',
  'peercoin', 'novacoin', 'primecoin', 'namecoin', 'worldcoin'
]







export async function generateStaticParams() {
  return [
    { slug: 'bitcoin' },
    { slug: 'ethereum' },
    { slug: 'tether' },
    { slug: 'ripple' },
    { slug: 'binancecoin' },
    { slug: 'usd-coin' },
    { slug: 'solana' },
    { slug: 'tron' },
    { slug: 'figure-heloc' },
    { slug: 'dogecoin' },
    { slug: 'whitebit' },
    { slug: 'usds' },
    { slug: 'hyperliquid' },
    { slug: 'leo-token' },
    { slug: 'cardano' },
    { slug: 'bitcoin-cash' },
    { slug: 'chainlink' },
    { slug: 'monero' },
    { slug: 'memecore' },
    { slug: 'canton-network' },
    { slug: 'stellar' },
    { slug: 'ethena-usde' },
    { slug: 'zcash' },
    { slug: 'dai' },
    { slug: 'usd1-wlfi' },
    { slug: 'litecoin' },
    { slug: 'paypal-usd' },
    { slug: 'avalanche-2' },
    { slug: 'hedera-hashgraph' },
    { slug: 'sui' },
    { slug: 'rain' },
    { slug: 'shiba-inu' },
    { slug: 'the-open-network' },
    { slug: 'crypto-com-chain' },
    { slug: 'hashnote-usyc' },
    { slug: 'tether-gold' },
    { slug: 'blackrock-usd-institutional-digital-liquidity-fund' },
    { slug: 'world-liberty-financial' },
    { slug: 'bittensor' },
    { slug: 'pax-gold' },
    { slug: 'global-dollar' },
    { slug: 'polkadot' },
    { slug: 'mantle' },
    { slug: 'uniswap' },
    { slug: 'sky' },
    { slug: 'falcon-finance' },
    { slug: 'pi-network' },
    { slug: 'okb' },
    { slug: 'near' },
    { slug: 'aster-2' },
    { slug: 'htx-dao' },
    { slug: 'pepe' },
    { slug: 'janus-henderson-anemoy-treasury-fund' },
    { slug: 'ripple-usd' },
    { slug: 'internet-computer' },
    { slug: 'aave' },
    { slug: 'ondo-us-dollar-yield' },
    { slug: 'bitget-token' },
    { slug: 'bfusd' },
    { slug: 'usdd' },
    { slug: 'ethereum-classic' },
    { slug: 'ondo-finance' },
    { slug: 'kucoin-shares' },
    { slug: 'gatechain-token' },
    { slug: 'quant-network' },
    { slug: 'morpho' },
    { slug: 'pump-fun' },
    { slug: 'united-stables' },
    { slug: 'eutbl' },
    { slug: 'ethena' },
    { slug: 'polygon-ecosystem-token' },
    { slug: 'kaspa' },
    { slug: 'render-token' },
    { slug: 'cosmos' },
    { slug: 'algorand' },
    { slug: 'nexo' },
    { slug: 'usdtb' },
    { slug: 'worldcoin-wld' },
    { slug: 'superstate-short-duration-us-government-securities-fund-ustb' },
    { slug: 'arbitrum' },
    { slug: 'aptos' },
    { slug: 'blockchain-capital' },
    { slug: 'filecoin' },
    { slug: 'flare-networks' },
    { slug: 'official-trump' },
    { slug: 'dexe' },
    { slug: 'just' },
    { slug: 'hash-2' },
    { slug: 'beldex' },
    { slug: 'vechain' },
    { slug: 'jupiter-exchange-solana' },
    { slug: 'xdce-crowd-sale' },
    { slug: 'ousg' },
    { slug: 'midnight-3' },
    { slug: 'ylds' },
    { slug: 'gho' },
    { slug: 'stable-2' },
    { slug: 'usual-usd' },
    { slug: 'bonk' },
    { slug: 'siren-2' }
  ]
}

export async function generateMetadata({ params }) {
  const { slug } = params
  
  try {
    const coinData = await getCoinDetail(slug, false, false, true, false, false, false)
    
    const currentPrice = coinData?.market_data?.current_price?.usd || 0
    const priceChange24h = coinData?.market_data?.price_change_percentage_24h || 0
    const coinName = coinData?.name || 'Cryptocurrency'
    const coinSymbol = coinData?.symbol?.toUpperCase() || 'CRYPTO'
    
    return {
      title: `${coinName} Price Today ${priceChange24h >= 0 ? 'Up' : 'Down'} ${Math.abs(priceChange24h).toFixed(2)}% | CryptoAsia`,
      description: `Live ${coinName} (${coinSymbol}) price, market cap, charts, and analysis. Real-time updates for Asian markets. Current price: $${currentPrice.toLocaleString()}.`,
      keywords: [
        `${coinName.toLowerCase()} price`,
        `${coinSymbol.toLowerCase()} price`,
        'cryptocurrency price',
        'crypto prices',
        'asian crypto',
        'crypto asia',
        'blockchain',
        'defi',
        'crypto trading',
        'crypto exchange',
        'market cap',
        'crypto analysis',
        `${coinName.toLowerCase()} chart`,
        `${coinSymbol.toLowerCase()} chart`,
        `${coinName.toLowerCase()} prediction`,
        `${coinSymbol.toLowerCase()} prediction`
      ],
      openGraph: {
        title: `${coinName} Price Today - $${currentPrice.toLocaleString()} | CryptoAsia`,
        description: `Live ${coinName} (${coinSymbol}) price, market cap, charts, and analysis for Asian markets. Current price: $${currentPrice.toLocaleString()}.`,
        type: 'article',
        url: `https://cryptoasia.com/coins/${slug}`,
        images: [
          {
            url: coinData?.image?.large || '/og-coin.png',
            width: 1200,
            height: 630,
            alt: `${coinName} Price Chart`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${coinName} Price Today - $${currentPrice.toLocaleString()}`,
        description: `Live ${coinName} (${coinSymbol}) price and market data for Asian markets.`,
        images: [coinData?.image?.large || '/og-coin.png'],
      },
      alternates: {
        canonical: `https://cryptoasia.com/coins/${slug}`,
      },
    }
  } catch (error) {
    return {
      title: 'Cryptocurrency Price | CryptoAsia',
      description: 'Live cryptocurrency prices and market data for Asian markets.',
    }
  }
}

// AI Description Component
async function AIDescription({ coinId, coinName }) {
  try {
    // In production, this would call Claude API
    // For now, return a template-based description
    const description = `${coinName} is a prominent cryptocurrency in the Asian market, offering unique features and use cases that appeal to investors and users across the region. With its innovative technology and growing adoption, ${coinName} has established itself as a significant player in the digital asset ecosystem.

    The cryptocurrency market in Asia has shown tremendous growth, with ${coinName} benefiting from increased institutional interest and retail adoption. Countries like Singapore, Japan, South Korea, and India have become key hubs for cryptocurrency trading and innovation, providing fertile ground for ${coinName}'s expansion and development.

    As the cryptocurrency landscape continues to evolve, ${coinName} remains at the forefront of technological advancement and market adoption. Its performance in Asian markets reflects the broader trend of digital asset integration into traditional financial systems, making it an important consideration for both experienced traders and newcomers to the cryptocurrency space.`

    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">About {coinName}</h3>
        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
          {description}
        </div>
      </div>
    )
  } catch (error) {
    return null
  }
}

// ROI Calculator Component
function ROICalculator({ coinData }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">ROI Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Investment Amount (USD)
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="1000"
            defaultValue="1000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Purchase Price (USD)
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder={coinData?.market_data?.current_price?.usd?.toFixed(2) || '0'}
            defaultValue={coinData?.market_data?.current_price?.usd?.toFixed(2) || '0'}
          />
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">
              ${(1000 / (coinData?.market_data?.current_price?.usd || 1)).toFixed(6)} {coinData?.symbol?.toUpperCase()}
            </div>
            <div className="text-sm text-gray-400">
              Amount of {coinData?.name} you would receive
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function CoinPage({ params }) {
  const { slug } = params
  
  try {
    const coinData = await getCoinDetail(
      slug,
      false, // localization
      false, // tickers
      true,  // market_data
      true,  // community_data
      false, // developer_data
      true   // sparkline
    )

    if (!coinData) {
      throw new Error('Coin not found')
    }

    const currentPrice = coinData.market_data?.current_price?.usd || 0
    const priceChange24h = coinData.market_data?.price_change_percentage_24h || 0
    const marketCap = coinData.market_data?.market_cap?.usd || 0
    const volume24h = coinData.market_data?.total_volume?.usd || 0
    const circulatingSupply = coinData.market_data?.circulating_supply || 0
    const totalSupply = coinData.market_data?.total_supply || 0
    const maxSupply = coinData.market_data?.max_supply || 0
    const ath = coinData.market_data?.ath?.usd || 0
    const athDate = coinData.market_data?.ath_date?.usd || ''
    const atl = coinData.market_data?.atl?.usd || 0
    const atlDate = coinData.market_data?.atl_date?.usd || ''

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What is ${coinData.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${coinData.name} (${coinData.symbol.toUpperCase()}) is a cryptocurrency with a current price of $${currentPrice.toLocaleString()} and a market cap of $${formatMarketCap(marketCap)}. ${coinData.description?.substring(0, 200) || 'It is a digital asset built on blockchain technology.'}`
          }
        },
        {
          "@type": "Question",
          "name": `What is the current price of ${coinData.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The current price of ${coinData.name} is $${currentPrice.toLocaleString()}, with a 24-hour change of ${formatChange(priceChange24h)}.`
          }
        },
        {
          "@type": "Question",
          "name": `Where can I buy ${coinData.name} in Asia?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `You can buy ${coinData.name} on various cryptocurrency exchanges available in Asian markets including Binance, OKX, KuCoin, and others. Always ensure you use reputable exchanges and follow local regulations.`
          }
        },
        {
          "@type": "Question",
          "name": `Is ${coinData.name} a good investment?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Investment decisions should be based on your own research and risk tolerance. ${coinData.name} has shown ${priceChange24h >= 0 ? 'positive' : 'negative'} performance recently, but cryptocurrency markets are highly volatile. Consider consulting with financial advisors.`
          }
        },
        {
          "@type": "Question",
          "name": `What is the market cap of ${coinData.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The market cap of ${coinData.name} is $${formatMarketCap(marketCap)}, making it rank #${coinData.market_cap_rank} among all cryptocurrencies.`
          }
        },
        {
          "@type": "Question",
          "name": `What was the all-time high price of ${coinData.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The all-time high price of ${coinData.name} was $${ath.toLocaleString()} on ${new Date(athDate).toLocaleDateString()}.`
          }
        },
        {
          "@type": "Question",
          "name": `How many ${coinData.name} coins are there?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `There are currently ${circulatingSupply.toLocaleString()} ${coinData.name} coins in circulation out of a total supply of ${totalSupply ? totalSupply.toLocaleString() : 'unlimited'}.${maxSupply ? ` The maximum supply is ${maxSupply.toLocaleString()} coins.` : ''}`
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
          "name": "Cryptocurrencies",
          "item": "https://cryptoasia.com/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${coinData.name} Price`,
          "item": `https://cryptoasia.com/coins/${slug}`
        }
      ]
    }

    // Financial Product Schema
    const financialProductSchema = {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      "name": `${coinData.name} (${coinData.symbol.toUpperCase()})`,
      "description": `${coinData.name} cryptocurrency price and market data for Asian markets`,
      "tickerSymbol": coinData.symbol.toUpperCase(),
      "exchangeName": "Cryptocurrency Exchanges",
      "price": currentPrice,
      "priceCurrency": "USD",
      "marketCap": marketCap,
      "url": `https://cryptoasia.com/coins/${slug}`
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }}
        />
        
        <div className="min-h-screen">
          {/* Breadcrumb */}
          <div className="bg-gray-800 py-3">
            <div className="container">
              <div className="breadcrumb">
                <Link href="/" className="text-blue-400 hover:text-blue-300">Home</Link>
                <span className="separator">/</span>
                <Link href="/" className="text-blue-400 hover:text-blue-300">Cryptocurrencies</Link>
                <span className="separator">/</span>
                <span>{coinData.name} Price</span>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-8">
            <div className="container">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={coinData.image.large}
                      alt={coinData.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-1">
                        {coinData.name}
                      </h1>
                      <div className="flex items-center gap-3">
                        <span className="text-xl text-gray-300 uppercase">
                          {coinData.symbol}
                        </span>
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded">
                          Rank #{coinData.market_cap_rank}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline gap-4 mb-6">
                    <div className="text-4xl font-bold text-white">
                      {formatPrice(currentPrice)}
                    </div>
                    <div className={`text-2xl font-medium ${priceChange24h >= 0 ? 'text-green' : 'text-red'}`}>
                      {formatChange(priceChange24h)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">1h%</div>
                      <div className={`font-medium ${coinData.market_data?.price_change_percentage_1h_in_currency >= 0 ? 'text-green' : 'text-red'}`}>
                        {coinData.market_data?.price_change_percentage_1h_in_currency ? 
                          formatChange(coinData.market_data.price_change_percentage_1h_in_currency) : 
                          'N/A'
                        }
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">7d%</div>
                      <div className={`font-medium ${coinData.market_data?.price_change_percentage_7d_in_currency >= 0 ? 'text-green' : 'text-red'}`}>
                        {coinData.market_data?.price_change_percentage_7d_in_currency ? 
                          formatChange(coinData.market_data.price_change_percentage_7d_in_currency) : 
                          'N/A'
                        }
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">30d%</div>
                      <div className={`font-medium ${coinData.market_data?.price_change_percentage_30d_in_currency >= 0 ? 'text-green' : 'text-red'}`}>
                        {coinData.market_data?.price_change_percentage_30d_in_currency ? 
                          formatChange(coinData.market_data.price_change_percentage_30d_in_currency) : 
                          'N/A'
                        }
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="text-gray-400 text-sm mb-1">1y%</div>
                      <div className={`font-medium ${coinData.market_data?.price_change_percentage_1y_in_currency >= 0 ? 'text-green' : 'text-red'}`}>
                        {coinData.market_data?.price_change_percentage_1y_in_currency ? 
                          formatChange(coinData.market_data.price_change_percentage_1y_in_currency) : 
                          'N/A'
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="w-full md:w-80">
                  <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Key Stats</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Market Cap</span>
                          <span className="text-white font-medium">{formatMarketCap(marketCap)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Volume 24h</span>
                          <span className="text-white font-medium">{formatMarketCap(volume24h)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Circulating Supply</span>
                          <span className="text-white font-medium">{circulatingSupply.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Max Supply</span>
                          <span className="text-white font-medium">
                            {maxSupply ? maxSupply.toLocaleString() : 'Unlimited'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link href={`/exchanges/buy-${coinData.id}`} className="block w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors">
                        Buy {coinData.symbol.toUpperCase()}
                      </Link>
                      <Link href={`/prediction/${coinData.id}`} className="block w-full bg-gray-700 text-white py-3 rounded-lg font-medium text-center hover:bg-gray-600 transition-colors">
                        Price Prediction
                      </Link>
                      <Link href={`/compare/${coinData.id}`} className="block w-full bg-gray-700 text-white py-3 rounded-lg font-medium text-center hover:bg-gray-600 transition-colors">
                        Compare
                      </Link>
                    </div>

                    {coinData.links?.homepage?.[0] && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Official Links</h3>
                        <div className="space-y-2">
                          <a
                            href={coinData.links.homepage[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-400 hover:text-blue-300"
                          >
                            Official Website
                          </a>
                          {coinData.links?.blockchain_site?.[0] && (
                            <a
                              href={coinData.links.blockchain_site[0]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-blue-400 hover:text-blue-300"
                            >
                              Blockchain Explorer
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Price Chart */}
                <PriceChart
                  coinId={coinData.id}
                  coinName={coinData.name}
                  currentPrice={currentPrice}
                />

                {/* Price in Asian Currencies */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {coinData.name} Price in Asian Currencies
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {CURRENCIES.slice(0, 20).map(currency => (
                      <Link
                        key={currency}
                        href={`/price/${coinData.id}/${currency}`}
                        className="bg-gray-700 rounded-lg p-3 text-center hover:bg-gray-600 transition-colors"
                      >
                        <div className="text-white font-medium">
                          {currency.toUpperCase()}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {/* Mock conversion - in production, fetch real rates */}
                          ${(currentPrice * 1.2).toFixed(2)}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* ROI Calculator */}
                <ROICalculator coinData={coinData} />

                {/* AI Description */}
                <AIDescription coinId={coinData.id} coinName={coinData.name} />

                {/* News Section */}
                <NewsSection coinSymbol={coinData.symbol} />

                {/* Historical Milestones */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Historical Milestones</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Metric</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium">Value</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-700">
                          <td className="py-3 px-4 text-white">All-Time High</td>
                          <td className="py-3 px-4 text-right text-white font-medium">
                            {formatPrice(ath)}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-400">
                            {athDate ? new Date(athDate).toLocaleDateString() : 'N/A'}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="py-3 px-4 text-white">All-Time Low</td>
                          <td className="py-3 px-4 text-right text-white font-medium">
                            {formatPrice(atl)}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-400">
                            {atlDate ? new Date(atlDate).toLocaleDateString() : 'N/A'}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-white">Current Price</td>
                          <td className="py-3 px-4 text-right text-white font-medium">
                            {formatPrice(currentPrice)}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-400">
                            Today
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Tokenomics */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Tokenomics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Circulating Supply</span>
                        <span className="text-white font-medium">
                          {circulatingSupply.toLocaleString()} {coinData.symbol.toUpperCase()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: maxSupply ? `${(circulatingSupply / maxSupply) * 100}%` : '100%' }}
                        ></div>
                      </div>
                    </div>
                    {maxSupply && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Max Supply</span>
                        <span className="text-white font-medium">
                          {maxSupply.toLocaleString()} {coinData.symbol.toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Supply</span>
                      <span className="text-white font-medium">
                        {totalSupply ? `${totalSupply.toLocaleString()} ${coinData.symbol.toUpperCase()}` : 'Unlimited'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* FAQs */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-2">
                        What is {coinData.name}?
                      </h4>
                      <p className="text-gray-300">
                        {coinData.name} ({coinData.symbol.toUpperCase()}) is a cryptocurrency with a current price of ${currentPrice.toLocaleString()} and a market cap of $${formatMarketCap(marketCap)}. {coinData.description?.substring(0, 200) || 'It is a digital asset built on blockchain technology.'}
                      </p>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-2">
                        What is the current price of {coinData.name}?
                      </h4>
                      <p className="text-gray-300">
                        The current price of {coinData.name} is ${currentPrice.toLocaleString()}, with a 24-hour change of {formatChange(priceChange24h)}.
                      </p>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-2">
                        Where can I buy {coinData.name} in Asia?
                      </h4>
                      <p className="text-gray-300">
                        You can buy {coinData.name} on various cryptocurrency exchanges available in Asian markets including Binance, OKX, KuCoin, and others. Always ensure you use reputable exchanges and follow local regulations.
                      </p>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-2">
                        Is {coinData.name} a good investment?
                      </h4>
                      <p className="text-gray-300">
                        Investment decisions should be based on your own research and risk tolerance. {coinData.name} has shown {priceChange24h >= 0 ? 'positive' : 'negative'} performance recently, but cryptocurrency markets are highly volatile. Consider consulting with financial advisors.
                      </p>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-2">
                        What is the market cap of {coinData.name}?
                      </h4>
                      <p className="text-gray-300">
                        The market cap of {coinData.name} is $${formatMarketCap(marketCap)}, making it rank #{coinData.market_cap_rank} among all cryptocurrencies.
                      </p>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-2">
                        What was the all-time high price of {coinData.name}?
                      </h4>
                      <p className="text-gray-300">
                        The all-time high price of {coinData.name} was $${ath.toLocaleString()} on {athDate ? new Date(athDate).toLocaleDateString() : 'N/A'}.
                      </p>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-lg font-medium text-white mb-2">
                        How many {coinData.name} coins are there?
                      </h4>
                      <p className="text-gray-300">
                        There are currently {circulatingSupply.toLocaleString()} {coinData.name} coins in circulation out of a total supply of {totalSupply ? totalSupply.toLocaleString() : 'unlimited'}.{maxSupply ? ` The maximum supply is ${maxSupply.toLocaleString()} coins.` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-8">
                {/* Internal Links */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    <Link href={`/price/${coinData.id}/usd`} className="block text-blue-400 hover:text-blue-300">
                      {coinData.name} Price in USD
                    </Link>
                    <Link href={`/price/${coinData.id}/sgd`} className="block text-blue-400 hover:text-blue-300">
                      {coinData.name} Price in SGD
                    </Link>
                    <Link href={`/price/${coinData.id}/jpy`} className="block text-blue-400 hover:text-blue-300">
                      {coinData.name} Price in JPY
                    </Link>
                    <Link href={`/exchanges/buy-${coinData.id}`} className="block text-blue-400 hover:text-blue-300">
                      How to Buy {coinData.name}
                    </Link>
                    <Link href={`/prediction/${coinData.id}`} className="block text-blue-400 hover:text-blue-300">
                      {coinData.name} Price Prediction
                    </Link>
                    <Link href={`/wallet/${coinData.id}`} className="block text-blue-400 hover:text-blue-300">
                      Best {coinData.name} Wallets
                    </Link>
                  </div>
                </div>

                {/* Related Coins */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Related Coins</h3>
                  <div className="space-y-3">
                    <Link href="/coins/bitcoin" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
                      <span className="text-2xl">BTC</span>
                      <div>
                        <div className="text-white font-medium">Bitcoin</div>
                        <div className="text-gray-400 text-sm">The original cryptocurrency</div>
                      </div>
                    </Link>
                    <Link href="/coins/ethereum" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
                      <span className="text-2xl">ETH</span>
                      <div>
                        <div className="text-white font-medium">Ethereum</div>
                        <div className="text-gray-400 text-sm">Smart contract platform</div>
                      </div>
                    </Link>
                    <Link href="/coins/tether" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
                      <span className="text-2xl">USDT</span>
                      <div>
                        <div className="text-white font-medium">Tether</div>
                        <div className="text-gray-400 text-sm">USD-pegged stablecoin</div>
                      </div>
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
    console.error('Coin page error:', error)
    
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Coin Not Found</h1>
          <p className="text-gray-300 mb-8">
            The cryptocurrency you're looking for doesn't exist or has been delisted.
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
