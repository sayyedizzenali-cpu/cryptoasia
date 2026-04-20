import './globals.css'
import SearchBar from '@/components/SearchBar'

export const metadata = {
  title: {
    template: '%s | CryptoAsia',
    default: 'CryptoAsia - Asian Cryptocurrency Prices & Market Data'
  },
  description: 'Real-time cryptocurrency prices and market data for Asian markets. Track Bitcoin, Ethereum, and thousands of altcoins with comprehensive analysis tools tailored for Asian investors.',
  keywords: [
    'cryptocurrency',
    'bitcoin price',
    'ethereum price',
    'crypto prices',
    'asian crypto',
    'crypto asia',
    'blockchain',
    'defi',
    'nft',
    'crypto trading',
    'crypto exchange',
    'market cap',
    'crypto news',
    'crypto analysis',
    'asian markets',
    'singapore crypto',
    'japan crypto',
    'korea crypto',
    'india crypto',
    'china crypto'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cryptoasia.com',
    title: 'CryptoAsia - Asian Cryptocurrency Prices & Market Data',
    description: 'Real-time cryptocurrency prices and market data for Asian markets. Track Bitcoin, Ethereum, and thousands of altcoins with comprehensive analysis tools.',
    siteName: 'CryptoAsia',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CryptoAsia - Asian Cryptocurrency Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoAsia - Asian Cryptocurrency Prices & Market Data',
    description: 'Real-time cryptocurrency prices and market data for Asian markets.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://cryptoasia.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CryptoAsia",
              "url": "https://cryptoasia.com",
              "logo": "https://cryptoasia.com/logo.png",
              "description": "Real-time cryptocurrency prices and market data for Asian markets",
              "sameAs": [
                "https://twitter.com/cryptoasia",
                "https://facebook.com/cryptoasia",
                "https://linkedin.com/company/cryptoasia"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://cryptoasia.com/contact"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "SG",
                "addressLocality": "Singapore"
              }
            })
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        {/* Navbar */}
        <nav className="navbar">
          <div className="nav-inner">
            <a href="/" className="logo">
              <span>Asia</span>
            </a>
            
            <div className="flex items-center gap-4 flex-1">
              <SearchBar />
            </div>
            
            <ul className="nav-links">
              <li>
                <a href="/prices">Prices</a>
              </li>
              <li>
                <a href="/trending">Trending</a>
              </li>
              <li>
                <a href="/exchanges">Exchanges</a>
              </li>
              <li>
                <a href="/glossary">Glossary</a>
              </li>
              <li>
                <a href="/learn">Learn</a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Live Price Ticker */}
        <div className="ticker bg-black border-b border-gray-800 py-2 overflow-hidden">
          <div className="price-ticker flex gap-8 text-sm">
            <span className="text-green">BTC $43,521.25 (+2.34%)</span>
            <span className="text-red">ETH $2,234.18 (-1.12%)</span>
            <span className="text-green">BNB $312.45 (+0.89%)</span>
            <span className="text-green">SOL $98.67 (+3.45%)</span>
            <span className="text-red">XRP $0.6234 (-0.78%)</span>
            <span className="text-green">ADA $0.4521 (+1.23%)</span>
            <span className="text-red">DOGE $0.0823 (-2.15%)</span>
            <span className="text-green">AVAX $36.78 (+4.12%)</span>
            <span className="text-red">DOT $7.89 (-1.67%)</span>
            <span className="text-green">MATIC $0.9234 (+2.78%)</span>
            {/* Duplicate for continuous scroll */}
            <span className="text-green">BTC $43,521.25 (+2.34%)</span>
            <span className="text-red">ETH $2,234.18 (-1.12%)</span>
            <span className="text-green">BNB $312.45 (+0.89%)</span>
            <span className="text-green">SOL $98.67 (+3.45%)</span>
            <span className="text-red">XRP $0.6234 (-0.78%)</span>
            <span className="text-green">ADA $0.4521 (+1.23%)</span>
            <span className="text-red">DOGE $0.0823 (-2.15%)</span>
            <span className="text-green">AVAX $36.78 (+4.12%)</span>
            <span className="text-red">DOT $7.89 (-1.67%)</span>
            <span className="text-green">MATIC $0.9234 (+2.78%)</span>
          </div>
        </div>

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-grid">
              {/* About CryptoAsia */}
              <div className="footer-column">
                <h4>About CryptoAsia</h4>
                <ul>
                  <li>
                    <a href="/about">About Us</a>
                  </li>
                  <li>
                    <a href="/careers">Careers</a>
                  </li>
                  <li>
                    <a href="/press">Press</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                  <li>
                    <a href="/api">API</a>
                  </li>
                </ul>
              </div>

              {/* Popular Coins */}
              <div className="footer-column">
                <h4>Popular Coins</h4>
                <ul>
                  <li>
                    <a href="/coins/bitcoin">Bitcoin (BTC)</a>
                  </li>
                  <li>
                    <a href="/coins/ethereum">Ethereum (ETH)</a>
                  </li>
                  <li>
                    <a href="/coins/tether">Tether (USDT)</a>
                  </li>
                  <li>
                    <a href="/coins/binance-coin">Binance Coin (BNB)</a>
                  </li>
                  <li>
                    <a href="/coins/solana">Solana (SOL)</a>
                  </li>
                  <li>
                    <a href="/coins/xrp">XRP (XRP)</a>
                  </li>
                  <li>
                    <a href="/coins/cardano">Cardano (ADA)</a>
                  </li>
                  <li>
                    <a href="/coins">All Coins</a>
                  </li>
                </ul>
              </div>

              {/* Asian Countries */}
              <div className="footer-column">
                <h4>Asian Countries</h4>
                <ul>
                  <li>
                    <a href="/regulation/singapore">Singapore</a>
                  </li>
                  <li>
                    <a href="/regulation/japan">Japan</a>
                  </li>
                  <li>
                    <a href="/regulation/south-korea">South Korea</a>
                  </li>
                  <li>
                    <a href="/regulation/india">India</a>
                  </li>
                  <li>
                    <a href="/regulation/china">China</a>
                  </li>
                  <li>
                    <a href="/regulation/indonesia">Indonesia</a>
                  </li>
                  <li>
                    <a href="/regulation/philippines">Philippines</a>
                  </li>
                  <li>
                    <a href="/countries">All Countries</a>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className="footer-column">
                <h4>Resources</h4>
                <ul>
                  <li>
                    <a href="/learn">Learn</a>
                  </li>
                  <li>
                    <a href="/glossary">Crypto Glossary</a>
                  </li>
                  <li>
                    <a href="/exchanges">Exchanges</a>
                  </li>
                  <li>
                    <a href="/blog">Blog</a>
                  </li>
                  <li>
                    <a href="/news">Crypto News</a>
                  </li>
                  <li>
                    <a href="/tools">Tools</a>
                  </li>
                  <li>
                    <a href="/calculator">Crypto Calculator</a>
                  </li>
                  <li>
                    <a href="/portfolio">Portfolio Tracker</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>&copy; 2024 CryptoAsia. All rights reserved.</p>
              <p className="mt-2">Powered by CoinGecko API</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
