import { getTrending, getTopCoins, formatPrice, formatChange } from '@/lib/coingecko'
import Link from 'next/link'

export const revalidate = 300 // ISR revalidate every 5 minutes

export const metadata = {
  title: 'Trending Cryptocurrencies Today | Live Asian Market Data | CryptoAsia',
  description: 'Discover trending cryptocurrencies in Asian markets. Real-time data on top gainers, losers, and most visited coins. Live price updates every 5 minutes.',
  keywords: [
    'trending cryptocurrencies',
    'crypto trending today',
    'top gainers crypto',
    'crypto losers today',
    'asian crypto trends',
    'hot cryptocurrencies',
    'trending altcoins',
    'crypto market trends',
    'live crypto prices',
    'cryptocurrency analysis'
  ],
  openGraph: {
    title: 'Trending Cryptocurrencies Today | CryptoAsia',
    description: 'Real-time trending cryptocurrencies in Asian markets with live price updates and market analysis.',
    type: 'website',
    url: 'https://cryptoasia.com/trending',
    images: [
      {
        url: '/og-trending.png',
        width: 1200,
        height: 630,
        alt: 'Trending Cryptocurrencies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trending Cryptocurrencies Today',
    description: 'Real-time trending cryptocurrencies in Asian markets.',
    images: ['/og-trending.png'],
  },
  alternates: {
    canonical: 'https://cryptoasia.com/trending',
  },
}

export default async function TrendingPage() {
  // Fetch trending and top coins data
  const [trendingData, topCoins] = await Promise.all([
    getTrending(),
    getTopCoins('usd', 100)
  ])

  // Calculate top gainers and losers from top 100 coins
  const gainers = topCoins
    .filter(coin => coin.price_change_percentage_24h > 0)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 10)

  const losers = topCoins
    .filter(coin => coin.price_change_percentage_24h < 0)
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 10)

  // Most visited (mock data - in production, this would come from analytics)
  const mostVisited = topCoins.slice(0, 10)

  // New listings (mock data - in production, this would come from exchange APIs)
  const newListings = [
    { id: 'new-coin-1', name: 'DeFi Asia Token', symbol: 'DAT', price: 0.125, change: 45.2 },
    { id: 'new-coin-2', name: 'Singapore Dollar Coin', symbol: 'SGDC', price: 0.98, change: 12.8 },
    { id: 'new-coin-3', name: 'Tokyo Chain', symbol: 'TKC', price: 2.34, change: 28.5 },
    { id: 'new-coin-4', name: 'Mumbai Protocol', symbol: 'MUM', price: 0.567, change: 67.3 },
    { id: 'new-coin-5', name: 'Bangla Digital', symbol: 'BDG', price: 0.089, change: 34.1 }
  ]

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What cryptocurrencies are trending today?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trending cryptocurrencies today include Bitcoin, Ethereum, and various DeFi tokens. Our trending page shows real-time data on top gainers, losers, and most visited coins in Asian markets."
        }
      },
      {
        "@type": "Question",
        "name": "How often are trending cryptocurrency prices updated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our trending cryptocurrency prices are updated every 5 minutes to provide you with the most current market data from Asian exchanges."
        }
      },
      {
        "@type": "Question",
        "name": "What are crypto gainers and losers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Crypto gainers are cryptocurrencies with the highest price increases over 24 hours, while losers have the biggest price declines. These metrics help identify market momentum and sentiment."
        }
      },
      {
        "@type": "Question",
        "name": "Which cryptocurrencies are most popular in Asia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bitcoin and Ethereum remain the most popular in Asia, followed by regional favorites like Binance Coin, Solana, and various DeFi tokens. Asian markets show strong interest in gaming and metaverse tokens."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-8">
          <div className="container">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <h1 className="text-4xl font-bold text-white">
                  Trending Cryptocurrencies Today
                </h1>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-600 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">LIVE</span>
                </div>
              </div>
              <p className="text-gray-300 text-lg mb-6">
                Real-time trending cryptocurrencies in Asian markets with live price updates
              </p>
              <div className="flex justify-center gap-4 text-sm text-gray-400">
                <span>Updated every 5 minutes</span>
                <span>·</span>
                <span>{topCoins.length} coins tracked</span>
                <span>·</span>
                <span>Asian market focus</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {/* Top 10 Trending Coins */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Top 10 Trending Coins</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {trendingData?.coins?.slice(0, 10).map((coin, index) => (
                <Link
                  key={coin.item.id}
                  href={`/coins/${coin.item.id}`}
                  className="block bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gray-400 text-sm font-bold">#{index + 1}</span>
                    <img
                      src={coin.item.thumb}
                      alt={coin.item.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium text-sm truncate">
                        {coin.item.name}
                      </div>
                      <div className="text-gray-400 text-xs uppercase">
                        {coin.item.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="text-white font-semibold text-sm mb-1">
                    ${coin.item.price_btc?.toFixed(8) || 'N/A'}
                  </div>
                  <div className={`text-xs ${coin.item.price_change_percentage_24h?.btc >= 0 ? 'text-green' : 'text-red'}`}>
                    {coin.item.price_change_percentage_24h?.btc ? 
                      `${coin.item.price_change_percentage_24h.btc >= 0 ? '+' : ''}${coin.item.price_change_percentage_24h.btc.toFixed(2)}%` : 
                      'N/A'
                    }
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Gainers and Losers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Gainers */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6 text-green">
                Top Gainers (24h)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">#</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Coin</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Price</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">24h Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gainers.map((coin, index) => (
                      <tr key={coin.id} className="border-b border-gray-700">
                        <td className="py-3 px-4 text-gray-400 font-medium">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={coin.image}
                              alt={coin.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <div>
                              <div className="text-white font-medium text-sm">
                                {coin.name}
                              </div>
                              <div className="text-gray-400 text-xs uppercase">
                                {coin.symbol}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right text-white font-medium">
                          {formatPrice(coin.current_price)}
                        </td>
                        <td className="py-3 px-4 text-right text-green font-medium">
                          +{coin.price_change_percentage_24h.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Losers */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6 text-red">
                Top Losers (24h)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">#</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Coin</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Price</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">24h Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {losers.map((coin, index) => (
                      <tr key={coin.id} className="border-b border-gray-700">
                        <td className="py-3 px-4 text-gray-400 font-medium">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={coin.image}
                              alt={coin.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <div>
                              <div className="text-white font-medium text-sm">
                                {coin.name}
                              </div>
                              <div className="text-gray-400 text-xs uppercase">
                                {coin.symbol}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right text-white font-medium">
                          {formatPrice(coin.current_price)}
                        </td>
                        <td className="py-3 px-4 text-right text-red font-medium">
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Most Visited */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Most Visited Coins</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {mostVisited.map((coin) => (
                <Link
                  key={coin.id}
                  href={`/coins/${coin.id}`}
                  className="block bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="text-white font-medium text-sm">
                        {coin.name}
                      </div>
                      <div className="text-gray-400 text-xs uppercase">
                        {coin.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="text-white font-semibold text-sm">
                    {formatPrice(coin.current_price)}
                  </div>
                  <div className={`text-xs ${coin.price_change_percentage_24h >= 0 ? 'text-green' : 'text-red'}`}>
                    {formatChange(coin.price_change_percentage_24h)}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* New Listings */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6">New Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newListings.map((coin) => (
                <div key={coin.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-white font-medium">{coin.name}</div>
                      <div className="text-gray-400 text-sm uppercase">{coin.symbol}</div>
                    </div>
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                      NEW
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-white font-semibold">
                      ${coin.price.toFixed(3)}
                    </div>
                    <div className="text-green font-medium text-sm">
                      +{coin.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-medium text-white mb-2">
                  What cryptocurrencies are trending today?
                </h4>
                <p className="text-gray-300">
                  Trending cryptocurrencies today include Bitcoin, Ethereum, and various DeFi tokens. Our trending page shows real-time data on top gainers, losers, and most visited coins in Asian markets.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-medium text-white mb-2">
                  How often are trending cryptocurrency prices updated?
                </h4>
                <p className="text-gray-300">
                  Our trending cryptocurrency prices are updated every 5 minutes to provide you with the most current market data from Asian exchanges.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-medium text-white mb-2">
                  What are crypto gainers and losers?
                </h4>
                <p className="text-gray-300">
                  Crypto gainers are cryptocurrencies with the highest price increases over 24 hours, while losers have the biggest price declines. These metrics help identify market momentum and sentiment.
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-lg font-medium text-white mb-2">
                  Which cryptocurrencies are most popular in Asia?
                </h4>
                <p className="text-gray-300">
                  Bitcoin and Ethereum remain the most popular in Asia, followed by regional favorites like Binance Coin, Solana, and various DeFi tokens. Asian markets show strong interest in gaming and metaverse tokens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
