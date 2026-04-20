import { getTerm, getAllTermSlugs } from '@/lib/glossary'
import { getCoinDetail } from '@/lib/coingecko'
import Link from 'next/link'

export const revalidate = 86400 // ISR revalidate every day

















export async function generateStaticParams() {
  return [
    { slug: 'blockchain' },
    { slug: 'bitcoin' },
    { slug: 'ethereum' },
    { slug: 'defi' },
    { slug: 'nft' },
    { slug: 'smart-contract' },
    { slug: 'proof-of-work' },
    { slug: 'proof-of-stake' },
    { slug: 'wallet' },
    { slug: 'staking' },
    { slug: 'altcoin' },
    { slug: 'stablecoin' },
    { slug: 'gas-fee' },
    { slug: 'mining' },
    { slug: 'dex' },
    { slug: 'halving' },
    { slug: 'dao' },
    { slug: 'web3' },
    { slug: 'market-cap' },
    { slug: 'layer-2' },
    { slug: 'yield-farming' },
    { slug: 'seed-phrase' },
    { slug: 'liquidity-pool' },
    { slug: 'cold-storage' },
    { slug: 'bull-market' },
    { slug: 'bear-market' },
    { slug: 'dca' },
    { slug: 'hodl' },
    { slug: 'amm' },
    { slug: 'tokenomics' },
    { slug: 'apy' },
    { slug: 'private-key' },
    { slug: 'hash-rate' },
    { slug: 'fork' },
    { slug: 'kyc' },
    { slug: 'whale' },
    { slug: 'leverage' },
    { slug: 'futures' },
    { slug: 'volatility' },
    { slug: 'slippage' },
    { slug: 'liquidity' },
    { slug: 'whitepaper' },
    { slug: 'ico' },
    { slug: 'consensus-mechanism' },
    { slug: 'block-reward' },
    { slug: 'decentralization' },
    { slug: 'impermanent-loss' },
    { slug: 'governance' },
    { slug: 'circulating-supply' },
    { slug: 'trading-volume' }
  ]
}

export async function generateMetadata({ params }) {
  const { term } = params
  
  try {
    const termData = getTerm(term)
    
    if (!termData) {
      throw new Error('Term not found')
    }

    return {
      title: `What is ${termData.term}? Definition & Guide | CryptoAsia`,
      description: `Complete definition and explanation of ${termData.term} in cryptocurrency. ${termData.definition}. Learn about ${termData.category} concepts for Asian crypto markets.`,
      keywords: [
        `${termData.term.toLowerCase()} definition`,
        `${termData.term.toLowerCase()} meaning`,
        'cryptocurrency glossary',
        'crypto terms explained',
        'blockchain terminology',
        'defi glossary',
        'crypto education',
        'asian crypto',
        'cryptocurrency guide',
        termData.category.toLowerCase()
      ],
      openGraph: {
        title: `What is ${termData.term}? | CryptoAsia`,
        description: `Complete definition and guide for ${termData.term} in cryptocurrency and blockchain technology.`,
        type: 'article',
        url: `https://cryptoasia.com/glossary/${term}`,
        images: [
          {
            url: '/og-glossary.png',
            width: 1200,
            height: 630,
            alt: `${termData.term} Definition`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `What is ${termData.term}?`,
        description: `Complete definition and guide for ${termData.term} in cryptocurrency.`,
        images: ['/og-glossary.png'],
      },
      alternates: {
        canonical: `https://cryptoasia.com/glossary/${term}`,
      },
    }
  } catch (error) {
    return {
      title: 'Cryptocurrency Glossary | CryptoAsia',
      description: 'Complete cryptocurrency glossary with definitions and explanations.',
    }
  }
}

export default async function GlossaryTermPage({ params }) {
  const { term } = params
  
  try {
    const termData = getTerm(term)
    
    if (!termData) {
      throw new Error('Term not found')
    }

    // Fetch related coins data
    let relatedCoinsData = []
    if (termData.coins && termData.coins.length > 0) {
      try {
        const coinPromises = termData.coins.slice(0, 3).map(coinId => 
          getCoinDetail(coinId, false, false, true, false, false, false)
        )
        relatedCoinsData = await Promise.all(coinPromises)
      } catch (error) {
        console.error('Failed to fetch related coins:', error)
      }
    }

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What is ${termData.term}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": termData.definition
          }
        },
        {
          "@type": "Question",
          "name": `How does ${termData.term} work?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": termData.longDesc?.substring(0, 300) || `${termData.term} operates within the ${termData.category} sector of cryptocurrency, providing essential functionality for blockchain networks and digital asset management.`
          }
        },
        {
          "@type": "Question",
          "name": `Why is ${termData.term} important?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${termData.term} is crucial for cryptocurrency ecosystems, particularly in Asian markets where adoption continues to grow. It enables ${termData.category} operations and supports the broader blockchain infrastructure.`
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
          "name": "Glossary",
          "item": "https://cryptoasia.com/glossary"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": termData.term,
          "item": `https://cryptoasia.com/glossary/${term}`
        }
      ]
    }

    // DefinedTerm Schema
    const definedTermSchema = {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "name": termData.term,
      "description": termData.definition,
      "inDefinedTermSet": "Cryptocurrency Glossary",
      "termCode": termData.slug,
      "category": termData.category,
      "difficulty": termData.difficulty
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
        />
        
        <div className="min-h-screen">
          {/* Breadcrumb */}
          <div className="bg-gray-800 py-3">
            <div className="container">
              <div className="breadcrumb">
                <Link href="/" className="text-blue-400 hover:text-blue-300">Home</Link>
                <span className="separator">/</span>
                <Link href="/glossary" className="text-blue-400 hover:text-blue-300">Glossary</Link>
                <span className="separator">/</span>
                <span>{termData.term}</span>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-8">
            <div className="container">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                    {termData.category}
                  </span>
                  <span className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full">
                    {termData.difficulty}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  What is {termData.term}?
                </h1>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  {termData.definition}
                </p>
              </div>
            </div>
          </div>

          <div className="container py-8">
            {/* Quick Definition Box */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Quick Definition</h2>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {termData.definition}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-gray-400 text-sm">Category:</span>
                <span className="px-2 py-1 bg-gray-700 text-white text-sm rounded">
                  {termData.category}
                </span>
                <span className="text-gray-400 text-sm">Difficulty:</span>
                <span className="px-2 py-1 bg-gray-700 text-white text-sm rounded">
                  {termData.difficulty}
                </span>
              </div>
            </div>

            {/* Full Explanation */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Complete Explanation</h2>
              <div className="prose prose-invert max-w-none">
                {termData.longDesc.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Asian Market Context */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Asian Market Context</h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  {termData.term} plays a significant role in Asian cryptocurrency markets, where adoption rates continue to accelerate across the region. 
                  Countries like Singapore, Japan, South Korea, and India have become major hubs for cryptocurrency innovation and trading.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3">Regional Adoption</h3>
                    <p className="text-gray-300">
                      Asian markets have shown particular interest in {termData.category} technologies, with local companies and developers 
                      contributing significantly to global innovation. Regulatory frameworks are evolving to support cryptocurrency growth.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3">Market Impact</h3>
                    <p className="text-gray-300">
                      The implementation of {termData.term} has influenced trading patterns, investment strategies, and regulatory approaches 
                      across Asian cryptocurrency exchanges and financial institutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Terms */}
            {termData.related && termData.related.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-white mb-6">Related Terms</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {termData.related.map((relatedSlug) => {
                    const relatedTerm = getTerm(relatedSlug)
                    if (!relatedTerm) return null
                    
                    return (
                      <Link
                        key={relatedSlug}
                        href={`/glossary/${relatedSlug}`}
                        className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <div className="text-white font-medium mb-1">{relatedTerm.term}</div>
                        <div className="text-gray-400 text-sm">{relatedTerm.category}</div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Related Coins */}
            {relatedCoinsData.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-white mb-6">Related Cryptocurrencies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedCoinsData.map((coin) => (
                    <Link
                      key={coin.id}
                      href={`/coins/${coin.id}`}
                      className="block p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={coin.image.thumb}
                          alt={coin.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="text-white font-medium">{coin.name}</div>
                          <div className="text-gray-400 text-sm uppercase">{coin.symbol}</div>
                        </div>
                      </div>
                      <div className="text-white font-medium">
                        ${coin.market_data?.current_price?.usd?.toLocaleString() || 'N/A'}
                      </div>
                      <div className={`text-sm ${coin.market_data?.price_change_percentage_24h >= 0 ? 'text-green' : 'text-red'}`}>
                        {coin.market_data?.price_change_percentage_24h?.toFixed(2) || '0'}%
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQs */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">
                    What is {termData.term}?
                  </h4>
                  <p className="text-gray-300">
                    {termData.definition}
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">
                    How does {termData.term} work?
                  </h4>
                  <p className="text-gray-300">
                    {termData.longDesc?.substring(0, 300) || `${termData.term} operates within the ${termData.category} sector of cryptocurrency, providing essential functionality for blockchain networks and digital asset management.`}
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-white mb-2">
                    Why is {termData.term} important?
                  </h4>
                  <p className="text-gray-300">
                    {termData.term} is crucial for cryptocurrency ecosystems, particularly in Asian markets where adoption continues to grow. It enables {termData.category} operations and supports the broader blockchain infrastructure.
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Glossary */}
            <div className="text-center">
              <Link
                href="/glossary"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Back to Glossary
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.error('Glossary term page error:', error)
    
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Term Not Found</h1>
          <p className="text-gray-300 mb-8">
            The cryptocurrency term you're looking for is not available in our glossary.
          </p>
          <Link
            href="/glossary"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Browse Glossary
          </Link>
        </div>
      </div>
    )
  }
}
