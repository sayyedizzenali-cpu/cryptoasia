import { getExchangesByCountry } from '@/lib/coingecko'
import { ASIA_COUNTRIES } from '@/lib/coingecko'
import Link from 'next/link'

export const revalidate = 86400 // ISR revalidate every day
export const dynamicParams = true // Enable ISR for all countries

export async function generateStaticParams() {
  return ASIA_COUNTRIES.map(country => ({
    country: country.code.toLowerCase()
  }))
}

export async function generateMetadata({ params }) {
  const { country } = params
  
  try {
    const countryData = ASIA_COUNTRIES.find(c => c.code.toLowerCase() === country.toLowerCase())
    const countryName = countryData?.name || country
    
    return {
      title: `Best Crypto Exchanges in ${countryName} (2026) | Top 5 Reviewed`,
      description: `Find the best cryptocurrency exchanges in ${countryName}. Compare top 5 exchanges with fees, ratings, pros, cons, and affiliate links. Complete guide for Asian crypto traders.`,
      keywords: [
        `crypto exchanges ${countryName.toLowerCase()}`,
        `best ${countryName.toLowerCase()} crypto exchange`,
        `${countryName.toLowerCase()} cryptocurrency exchange`,
        'asian crypto exchanges',
        'crypto trading platforms',
        'exchange reviews',
        'crypto fees',
        'buy cryptocurrency',
        'crypto trading guide'
      ],
      openGraph: {
        title: `Best Crypto Exchanges in ${countryName}`,
        description: `Top 5 cryptocurrency exchanges in ${countryName} with detailed reviews, fees, and ratings.`,
        type: 'article',
        url: `https://cryptoasia.com/exchange/${country}`,
        images: [
          {
            url: '/og-exchange.png',
            width: 1200,
            height: 630,
            alt: `Best Crypto Exchanges in ${countryName}`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Best Crypto Exchanges in ${countryName}`,
        description: `Top 5 cryptocurrency exchanges in ${countryName} with detailed reviews.`,
        images: ['/og-exchange.png'],
      },
      alternates: {
        canonical: `https://cryptoasia.com/exchange/${country}`,
      },
    }
  } catch (error) {
    return {
      title: 'Best Crypto Exchanges | CryptoAsia',
      description: 'Find the best cryptocurrency exchanges for Asian markets.',
    }
  }
}

export default async function ExchangePage({ params }) {
  const { country } = params
  
  try {
    const exchanges = getExchangesByCountry(country)
    const countryData = ASIA_COUNTRIES.find(c => c.code.toLowerCase() === country.toLowerCase())
    const countryName = countryData?.name || country

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Which is the best crypto exchange in ${countryName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The best crypto exchange in ${countryName} depends on your needs. Binance, OKX, and KuCoin are popular choices offering low fees, high liquidity, and strong security features. Consider factors like trading volume, fees, and supported cryptocurrencies.`
          }
        },
        {
          "@type": "Question",
          "name": `Are crypto exchanges legal in ${countryName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Cryptocurrency exchange regulations vary in ${countryName}. Many international exchanges operate legally, but always check local regulations and compliance requirements before trading.`
          }
        },
        {
          "@type": "Question",
          "name": `What fees do crypto exchanges charge in ${countryName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Trading fees typically range from 0.1% to 0.5% per transaction. Additional fees may apply for deposits, withdrawals, and currency conversions. Binance offers some of the lowest fees at 0.1%.`
          }
        },
        {
          "@type": "Question",
          "name": `How do I choose a crypto exchange in ${countryName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Consider factors like security, fees, liquidity, customer support, supported cryptocurrencies, and regulatory compliance. Read reviews and compare features before making your choice.`
          }
        },
        {
          "@type": "Question",
          "name": `What payment methods are accepted on ${countryName} exchanges?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Common payment methods include bank transfers, credit/debit cards, P2P trading, and local payment systems. Availability varies by exchange and country regulations.`
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
          "name": "Exchanges",
          "item": "https://cryptoasia.com/exchanges"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": countryName,
          "item": `https://cryptoasia.com/exchange/${country}`
        }
      ]
    }

    // ItemList Schema
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `Top Crypto Exchanges in ${countryName}`,
      "itemListElement": exchanges.slice(0, 5).map((exchange, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Organization",
          "name": exchange.name,
          "url": `https://cryptoasia.com/exchanges/${exchange.slug}`,
          "description": `${exchange.name} cryptocurrency exchange with ${exchange.rating}/5 rating and ${exchange.fees.taker} trading fees.`
        }
      }))
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
        
        <div className="min-h-screen">
          {/* Breadcrumb */}
          <div className="bg-gray-800 py-3">
            <div className="container">
              <div className="breadcrumb">
                <Link href="/" className="text-blue-400 hover:text-blue-300">Home</Link>
                <span className="separator">/</span>
                <Link href="/exchanges" className="text-blue-400 hover:text-blue-300">Exchanges</Link>
                <span className="separator">/</span>
                <span>{countryName}</span>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-8">
            <div className="container">
              <div className="text-center">
                {countryData?.flag && (
                  <div className="text-6xl mb-4">{countryData.flag}</div>
                )}
                <h1 className="text-4xl font-bold text-white mb-4">
                  Best Crypto Exchanges in {countryName}
                </h1>
                <p className="text-gray-300 text-lg mb-6">
                  Top 5 cryptocurrency exchanges for {countryName} traders with detailed reviews, fees, and ratings
                </p>
                <div className="flex justify-center gap-4 text-sm text-gray-400">
                  <span>Updated: 2026</span>
                  <span>·</span>
                  <span>{exchanges.length} Exchanges Reviewed</span>
                  <span>·</span>
                  <span>Asian Market Focus</span>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-8">
            {/* Top 5 Exchanges Table */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Top 5 Crypto Exchanges</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Exchange</th>
                      <th className="text-center py-3 px-4 text-gray-400 font-medium">Fees</th>
                      <th className="text-center py-3 px-4 text-gray-400 font-medium">Rating</th>
                      <th className="text-center py-3 px-4 text-gray-400 font-medium">Trust Score</th>
                      <th className="text-center py-3 px-4 text-gray-400 font-medium">Volume 24h</th>
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
                              <div className="text-gray-400 text-sm">Founded {exchange.founded}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-300">
                          {exchange.fees.taker}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="text-yellow-400">{'\u2605'.repeat(Math.floor(exchange.rating))}</div>
                          <div className="text-gray-400 text-sm">{exchange.rating}/5</div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="text-white font-medium">{exchange.trustScore}/10</div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-300">
                          ${(exchange.volume24h / 1e9).toFixed(1)}B
                        </td>
                        <td className="py-4 px-4 text-center">
                          <a
                            href={exchange.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                          >
                            Trade
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed Review Cards */}
            <div className="space-y-8 mb-8">
              {exchanges.slice(0, 5).map((exchange) => (
                <div key={exchange.slug} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                      {exchange.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{exchange.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span>Founded {exchange.founded}</span>
                        <span>·</span>
                        <span>Trust Score: {exchange.trustScore}/10</span>
                        <span>·</span>
                        <span>Rating: {'\u2605'.repeat(Math.floor(exchange.rating))} ({exchange.rating}/5)</span>
                      </div>
                      <a
                        href={exchange.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition-colors"
                      >
                        Visit {exchange.name}
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Pros</h4>
                      <ul className="text-gray-300 space-y-2">
                        {exchange.pros.map((pro, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green mt-1">+</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-3">Cons</h4>
                      <ul className="text-gray-300 space-y-2">
                        {exchange.cons.map((con, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red mt-1">-</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400 mb-1">Trading Fee</div>
                        <div className="text-white font-medium">{exchange.fees.taker}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-1">Volume 24h</div>
                        <div className="text-white font-medium">${(exchange.volume24h / 1e9).toFixed(1)}B</div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-1">Countries</div>
                        <div className="text-white font-medium">{exchange.countries?.length || 0}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-1">Payment Methods</div>
                        <div className="text-white font-medium">{exchange.paymentMethods?.length || 0}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Methods Section */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Payment Methods in {countryName}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exchanges[0]?.paymentMethods?.slice(0, 9).map((method, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4">
                    <div className="text-white font-medium mb-2">{method}</div>
                    <div className="text-gray-400 text-sm">
                      {method === 'Bank Transfer' && 'Direct bank transfers with 1-3 business days processing'}
                      {method === 'Credit Card' && 'Instant purchases with 3-5% processing fees'}
                      {method === 'Debit Card' && 'Instant purchases with lower fees than credit cards'}
                      {method === 'P2P Trading' && 'Peer-to-peer trading with various payment options'}
                      {method === 'Cryptocurrency' && 'Deposit other crypto to trade for different assets'}
                      {method === 'E-wallet' && 'Digital wallet services for quick deposits'}
                      {method === 'Cash' && 'Physical cash deposits through partner locations'}
                      {method === 'Mobile Payment' && 'Mobile payment apps integration'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulation Status */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Regulation Status in {countryName}</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  Cryptocurrency regulations in {countryName} continue to evolve. Here's the current status:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Legal Status</h4>
                    <p className="text-gray-300">
                      Most international exchanges operate legally in {countryName} with proper compliance measures. 
                      Always verify the exchange's regulatory status before trading.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Tax Requirements</h4>
                    <p className="text-gray-300">
                      Cryptocurrency gains may be subject to taxation. Consult with local tax authorities 
                      for specific requirements regarding crypto trading and reporting.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">AML/KYC</h4>
                    <p className="text-gray-300">
                      Exchanges operating in {countryName} require identity verification and comply with 
                      anti-money laundering regulations to ensure secure trading.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Consumer Protection</h4>
                    <p className="text-gray-300">
                      Look for exchanges with strong security measures, insurance funds, and responsive 
                      customer support for better protection of your assets.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Beginner Guide */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Beginner's Guide to Crypto Trading in {countryName}</h2>
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-3">1. Choose the Right Exchange</h3>
                  <p className="text-gray-300">
                    Select an exchange that operates in {countryName}, offers good security, reasonable fees, 
                    and supports the cryptocurrencies you want to trade.
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-3">2. Create and Verify Your Account</h3>
                  <p className="text-gray-300">
                    Sign up for an account and complete the identity verification process. You'll typically need 
                    government-issued ID and proof of address.
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-3">3. Add Funds</h3>
                  <p className="text-gray-300">
                    Deposit funds using your preferred payment method. Bank transfers, credit cards, and 
                    P2P trading are common options in {countryName}.
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-3">4. Start Trading</h3>
                  <p className="text-gray-300">
                    Begin with small trades to understand the platform. Use limit orders for better price 
                    control and stop-loss orders to manage risk.
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-3">5. Secure Your Assets</h3>
                  <p className="text-gray-300">
                    Consider using hardware wallets for long-term storage. Enable two-factor authentication 
                    and keep your login credentials secure.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">
                    Which is the best crypto exchange in {countryName}?
                  </h4>
                  <p className="text-gray-300">
                    The best crypto exchange in {countryName} depends on your needs. Binance, OKX, and KuCoin are popular choices offering low fees, high liquidity, and strong security features. Consider factors like trading volume, fees, and supported cryptocurrencies.
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">
                    Are crypto exchanges legal in {countryName}?
                  </h4>
                  <p className="text-gray-300">
                    Cryptocurrency exchange regulations vary in {countryName}. Many international exchanges operate legally, but always check local regulations and compliance requirements before trading.
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">
                    What fees do crypto exchanges charge in {countryName}?
                  </h4>
                  <p className="text-gray-300">
                    Trading fees typically range from 0.1% to 0.5% per transaction. Additional fees may apply for deposits, withdrawals, and currency conversions. Binance offers some of the lowest fees at 0.1%.
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">
                    How do I choose a crypto exchange in {countryName}?
                  </h4>
                  <p className="text-gray-300">
                    Consider factors like security, fees, liquidity, customer support, supported cryptocurrencies, and regulatory compliance. Read reviews and compare features before making your choice.
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">
                    What payment methods are accepted on {countryName} exchanges?
                  </h4>
                  <p className="text-gray-300">
                    Common payment methods include bank transfers, credit/debit cards, P2P trading, and local payment systems. Availability varies by exchange and country regulations.
                  </p>
                </div>
              </div>
            </div>

            {/* Other Countries */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Crypto Exchanges in Other Countries</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {ASIA_COUNTRIES.filter(c => c.code.toLowerCase() !== country.toLowerCase()).map((country) => (
                  <Link
                    key={country.code}
                    href={`/exchange/${country.code.toLowerCase()}`}
                    className="block p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{country.flag}</div>
                      <div className="text-white text-sm">{country.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.error('Exchange page error:', error)
    
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Exchange Guide Not Available</h1>
          <p className="text-gray-300 mb-8">
            The exchange guide for this country is not available.
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
