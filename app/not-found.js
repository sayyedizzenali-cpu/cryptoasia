import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="container max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <p className="text-gray-300 text-center mb-4">
            Try searching for a cryptocurrency:
          </p>
          <div className="max-w-md mx-auto">
            <SearchBar />
          </div>
        </div>

        {/* Popular Coins */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            Popular Coins
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/coins/bitcoin"
              className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors"
            >
              <div className="text-white font-medium">Bitcoin</div>
              <div className="text-gray-400 text-sm">BTC</div>
            </Link>
            <Link
              href="/coins/ethereum"
              className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors"
            >
              <div className="text-white font-medium">Ethereum</div>
              <div className="text-gray-400 text-sm">ETH</div>
            </Link>
            <Link
              href="/coins/binance-coin"
              className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors"
            >
              <div className="text-white font-medium">Binance Coin</div>
              <div className="text-gray-400 text-sm">BNB</div>
            </Link>
            <Link
              href="/coins/solana"
              className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors"
            >
              <div className="text-white font-medium">Solana</div>
              <div className="text-gray-400 text-sm">SOL</div>
            </Link>
          </div>
        </div>

        {/* Popular Pages */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/"
              className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors"
            >
              <div className="text-white font-medium">Homepage</div>
              <div className="text-gray-400 text-sm">View all cryptocurrency prices</div>
            </Link>
            <Link
              href="/trending"
              className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors"
            >
              <div className="text-white font-medium">Trending Coins</div>
              <div className="text-gray-400 text-sm">See what's hot in Asian markets</div>
            </Link>
            <Link
              href="/exchanges"
              className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors"
            >
              <div className="text-white font-medium">Exchanges</div>
              <div className="text-gray-400 text-sm">Find the best crypto exchanges</div>
            </Link>
            <Link
              href="/glossary"
              className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors"
            >
              <div className="text-white font-medium">Crypto Glossary</div>
              <div className="text-gray-400 text-sm">Learn crypto terminology</div>
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
