import { getTopCoins, getGlobalData, getTrending, formatPrice, formatChange, formatMarketCap } from '@/lib/coingecko'

export const revalidate = 60 // ISR revalidate every 60 seconds

export const metadata = {
  title: 'CryptoAsia - Live Cryptocurrency Prices by Market Cap',
  description: 'Real-time cryptocurrency prices and market data. Track Bitcoin, Ethereum, and thousands of altcoins with comprehensive analysis tools.',
  keywords: [
    'cryptocurrency',
    'bitcoin price',
    'ethereum price',
    'crypto prices',
    'market cap',
    'crypto trading',
    'crypto exchange',
    'blockchain',
    'defi',
    'nft'
  ],
  openGraph: {
    title: 'CryptoAsia - Live Cryptocurrency Prices by Market Cap',
    description: 'Real-time cryptocurrency prices and market data for thousands of cryptocurrencies.',
    type: 'website',
    url: 'https://cryptoasia.com',
    images: [
      {
        url: '/og-homepage.png',
        width: 1200,
        height: 630,
        alt: 'CryptoAsia - Live Cryptocurrency Prices',
      },
    ],
  },
}

export default async function HomePage() {
  let coins = []
  let globalData = null
  let trending = []

  try {
    const [coinsData, global, trendingData] = await Promise.allSettled([
      getTopCoins('usd', 100),
      getGlobalData(),
      getTrending()
    ])
    coins = coinsData.status === 'fulfilled' ? (coinsData.value || []) : []
    globalData = global.status === 'fulfilled' ? global.value : null
    trending = trendingData.status === 'fulfilled' ? (trendingData.value?.coins || []) : []
  } catch(e) {
    console.log('API error, using empty data:', e.message)
  }

  // Calculate global stats
  const globalStats = {
    totalMarketCap: globalData?.total_market_cap?.usd || 0,
    totalVolume: globalData?.total_volume?.usd || 0,
    btcDominance: globalData?.market_cap_percentage?.btc || 0,
    ethDominance: globalData?.market_cap_percentage?.eth || 0,
    activeCryptocurrencies: globalData?.active_cryptocurrencies || 0
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0d1117' }}>
      {/* Global Stats Bar */}
      <div className="border-b" style={{ borderColor: '#30363d', backgroundColor: '#0d1117' }}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-sm" style={{ color: '#8b949e' }}>
            <div className="flex items-center space-x-6">
              <div>
                <span className="mr-2">Total Market Cap:</span>
                <span style={{ color: '#e6edf3', fontWeight: '600' }}>
                  {formatMarketCap(globalStats.totalMarketCap)}
                </span>
              </div>
              <div className="text-gray-500">|</div>
              <div>
                <span className="mr-2">24H Volume:</span>
                <span style={{ color: '#e6edf3', fontWeight: '600' }}>
                  {formatMarketCap(globalStats.totalVolume)}
                </span>
              </div>
              <div className="text-gray-500">|</div>
              <div>
                <span className="mr-2">BTC Dominance:</span>
                <span style={{ color: '#e6edf3', fontWeight: '600' }}>
                  {globalStats.btcDominance.toFixed(1)}%
                </span>
              </div>
              <div className="text-gray-500">|</div>
              <div>
                <span className="mr-2">ETH Dominance:</span>
                <span style={{ color: '#e6edf3', fontWeight: '600' }}>
                  {globalStats.ethDominance.toFixed(1)}%
                </span>
              </div>
              <div className="text-gray-500">|</div>
              <div>
                <span className="mr-2">Active Coins:</span>
                <span style={{ color: '#e6edf3', fontWeight: '600' }}>
                  {globalStats.activeCryptocurrencies.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Coins */}
      <div className="py-4" style={{ backgroundColor: '#161b22' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-3">
            <span className="mr-2">{'\ud83d\udd25'}</span>
            <h2 className="text-lg font-semibold" style={{ color: '#e6edf3' }}>TRENDING</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {trending?.slice(0, 8).map((coin, index) => (
              <a
                key={coin.item.id}
                href={`/coins/${coin.item.id}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors flex-shrink-0"
                style={{ 
                  backgroundColor: '#0d1117',
                  border: '1px solid #30363d',
                  textDecoration: 'none'
                }}
              >
                <img
                  src={coin.item.thumb}
                  alt={coin.item.name}
                  width={20}
                  height={20}
                  style={{ borderRadius: '50%' }}
                />
                <div>
                  <span className="font-medium text-sm" style={{ color: '#e6edf3' }}>
                    {coin.item.name}
                  </span>
                  <span className="ml-2 text-xs" style={{ 
                    color: coin.price_change_percentage_24h >= 0 ? '#00d4aa' : '#ff4d6a',
                    fontWeight: '600'
                  }}>
                    {coin.price_change_percentage_24h ? 
                      `${coin.price_change_percentage_24h >= 0 ? '+' : ''}${coin.price_change_percentage_24h.toFixed(1)}%` : 
                      'N/A'
                    }
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold" style={{ color: '#e6edf3' }}>
              Live Cryptocurrency Prices by Market Cap
            </h1>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#00d4aa' }}></div>
              <span className="text-sm" style={{ color: '#8b949e' }}>
                Auto-updating
              </span>
            </div>
          </div>
          <p className="text-sm" style={{ color: '#8b949e' }}>
            CryptoAsia tracks 17,000+ cryptocurrencies. Data updated every 60 seconds.
          </p>
        </div>
      </div>

      {/* Coins Table */}
      <div className="pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: '#161b22', border: '1px solid #30363d' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #30363d' }}>
                    <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider" style={{ color: '#8b949e' }}>
                      #
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider" style={{ color: '#8b949e' }}>
                      Coin
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-xs uppercase tracking-wider" style={{ color: '#8b949e' }}>
                      Price
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-xs uppercase tracking-wider" style={{ color: '#8b949e' }}>
                      1h%
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-xs uppercase tracking-wider" style={{ color: '#8b949e' }}>
                      24h%
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-xs uppercase tracking-wider" style={{ color: '#8b949e' }}>
                      7d%
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-xs uppercase tracking-wider hidden md:table-cell" style={{ color: '#8b949e' }}>
                      Market Cap
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-xs uppercase tracking-wider hidden lg:table-cell" style={{ color: '#8b949e' }}>
                      Volume(24h)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {coins?.map((coin, index) => (
                    <tr
                      key={coin.id}
                      className="hover:bg-gray-800 transition-colors"
                      style={{ 
                        borderBottom: '1px solid #30363d',
                        backgroundColor: index % 2 === 0 ? 'transparent' : '#0d1117'
                      }}
                    >
                      <td className="py-3 px-4" style={{ color: '#8b949e', fontWeight: '500' }}>
                        {index + 1}
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={`/coins/${coin.id}`}
                          className="flex items-center gap-3"
                          style={{ textDecoration: 'none' }}
                        >
                          <img
                            src={coin.image}
                            alt={coin.name}
                            width={32}
                            height={32}
                            style={{ borderRadius: '50%' }}
                          />
                          <div>
                            <div className="font-medium" style={{ color: '#e6edf3' }}>
                              {coin.name}
                            </div>
                            <div className="text-xs px-2 py-1 rounded inline-block" style={{ 
                              backgroundColor: '#30363d',
                              color: '#8b949e'
                            }}>
                              {coin.symbol.toUpperCase()}
                            </div>
                          </div>
                        </a>
                      </td>
                      <td className="py-3 px-4 text-right font-medium" style={{ color: '#e6edf3' }}>
                        {formatPrice(coin.current_price)}
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${
                        coin.price_change_percentage_1h_in_currency >= 0 ? 'text-green-500' : 'text-red-500'
                      }`} style={{ 
                        color: coin.price_change_percentage_1h_in_currency >= 0 ? '#00d4aa' : '#ff4d6a'
                      }}>
                        {coin.price_change_percentage_1h_in_currency ? 
                          formatChange(coin.price_change_percentage_1h_in_currency) : 
                          'N/A'
                        }
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${
                        coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                      }`} style={{ 
                        color: coin.price_change_percentage_24h >= 0 ? '#00d4aa' : '#ff4d6a'
                      }}>
                        {formatChange(coin.price_change_percentage_24h)}
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${
                        coin.price_change_percentage_7d_in_currency >= 0 ? 'text-green-500' : 'text-red-500'
                      }`} style={{ 
                        color: coin.price_change_percentage_7d_in_currency >= 0 ? '#00d4aa' : '#ff4d6a'
                      }}>
                        {coin.price_change_percentage_7d_in_currency ? 
                          formatChange(coin.price_change_percentage_7d_in_currency) : 
                          'N/A'
                        }
                      </td>
                      <td className="py-3 px-4 text-right hidden md:table-cell" style={{ color: '#e6edf3' }}>
                        {formatMarketCap(coin.market_cap)}
                      </td>
                      <td className="py-3 px-4 text-right hidden lg:table-cell" style={{ color: '#e6edf3' }}>
                        {formatMarketCap(coin.total_volume)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Load More Button */}
          <div className="mt-6 text-center">
            <button
              className="px-6 py-2 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: '#161b22',
                border: '1px solid #30363d',
                color: '#e6edf3'
              }}
            >
              Load More Coins
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}
