import { getCoinDetail, formatPrice } from '@/lib/coingecko';

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const coinName = params.coin.charAt(0).toUpperCase() + params.coin.slice(1);
  
  return {
    title: `Stake ${coinName} — Best ${coinName.toUpperCase()} Staking Rewards 2026`,
    description: `Learn how to stake ${coinName} and earn the best staking rewards in 2026. Complete guide to ${coinName} staking, APY rates, and top staking platforms.`,
    keywords: [`${coinName} staking`, `stake ${coinName}`, `${coinName} rewards`, `${coinName} APY`, `${coinName} validator`],
    openGraph: {
      title: `${coinName} Staking Guide 2026`,
      description: `Best ${coinName} staking rewards and platforms`,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${coinName} Staking`,
      description: `Stake ${coinName} and earn rewards`
    },
    alternates: {
      canonical: `https://cryptoasia.com/staking/${params.coin}`
    }
  };
}


export default async function StakingPage({ params }) {
  const coinName = params.coin.charAt(0).toUpperCase() + params.coin.slice(1);
  const coinDetail = await getCoinDetail(params.coin);
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Staking",
        "item": "/staking"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": coinName,
        "item": `/staking/${params.coin}`
      }
    ]
  };

  const stakingPlatforms = [
    { name: 'Official Network', apy: '5.2%', type: 'Native', minStake: '1', lockPeriod: 'Flexible' },
    { name: 'Binance Staking', apy: '4.8%', type: 'Exchange', minStake: '0.1', lockPeriod: 'Flexible' },
    { name: 'Kraken Staking', apy: '4.5%', type: 'Exchange', minStake: '0.01', lockPeriod: 'Flexible' },
    { name: 'Coinbase Staking', apy: '4.2%', type: 'Exchange', minStake: '0.1', lockPeriod: 'Flexible' },
    { name: 'Ledger Live', apy: '3.8%', type: 'Hardware', minStake: '1', lockPeriod: 'Flexible' }
  ];

  const faqs = [
    {
      question: `What is ${coinName} staking?`,
      answer: `${coinName} staking is the process of locking up your ${coinName} tokens to support network operations and earn rewards in return. It's a way to earn passive income on your crypto holdings while contributing to network security and governance.`
    },
    {
      question: `How much can I earn staking ${coinName}?`,
      answer: `Earnings from ${coinName} staking vary by platform and staking method. APY rates typically range from 3% to 8% annually, depending on lock-up period, network conditions, and the specific staking provider you choose.`
    },
    {
      question: `Is ${coinName} staking safe?`,
      answer: `${coinName} staking is generally safe when using reputable platforms and following security best practices. However, risks include smart contract vulnerabilities, slashing penalties for validator misbehavior, and market volatility of your staked assets.`
    },
    {
      question: `What are the requirements for ${coinName} staking?`,
      answer: `Requirements vary by platform but typically include minimum staking amounts, compatible wallets, and sometimes a lock-up period. Some platforms may require KYC verification, while others offer anonymous staking options.`
    },
    {
      question: `Can I unstake my ${coinName} anytime?`,
      answer: `Unstaking periods vary by platform. Some offer flexible unstaking with immediate access, while others have lock-up periods ranging from hours to weeks. Always check your chosen platform's unstaking terms before staking.`
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center py-3">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <a href="/staking" className="text-gray-500 hover:text-gray-700">Staking</a>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 font-medium">
                  {coinName}
                </li>
              </ol>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                {coinName} Staking Guide
              </h1>
              <p className="text-xl opacity-90">
                Earn Rewards by Staking {coinName}
              </p>
              {coinDetail && (
                <div className="mt-6 text-sm">
                  <span className="opacity-75">Current Price:</span>{' '}
                  <span className="font-semibold">
                    {formatPrice(coinDetail.current_price)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* What is Staking */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              What is {coinName} Staking?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {coinName} staking is the process of actively participating in transaction validation on a proof-of-stake (PoS) blockchain. 
              By locking up your {coinName} tokens, you help secure the network and, in return, receive staking rewards. 
              This creates a win-win situation: you earn passive income while contributing to blockchain security and decentralization.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Unlike traditional mining which requires expensive hardware and high energy consumption, staking is more accessible 
              and environmentally friendly. Anyone with {coinName} tokens can participate and earn rewards based on the amount they stake.
            </p>
          </div>
        </div>

        {/* How to Stake */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              How to Stake {coinName} - Step by Step
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Choose a Staking Platform</h3>
                  <p className="text-gray-600">
                    Select a reputable staking platform that supports {coinName}. Consider factors like APY rates, security, 
                    lock-up periods, and minimum stake requirements.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Set Up Your Wallet</h3>
                  <p className="text-gray-600">
                    Create or connect a compatible wallet that supports {coinName} staking. Ensure your wallet is secure 
                    with proper backup and security measures enabled.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Transfer {coinName}</h3>
                  <p className="text-gray-600">
                    Transfer your {coinName} tokens to your staking wallet or directly to the staking platform. 
                    Double-check the address and network to avoid losing funds.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Start Staking</h3>
                  <p className="text-gray-600">
                    Select your staking options, confirm the terms, and initiate the staking process. 
                    Your tokens will be locked according to the platform's terms.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Monitor Rewards</h3>
                  <p className="text-gray-600">
                    Track your staking rewards and performance through the platform's dashboard. 
                    Rewards are typically distributed daily, weekly, or monthly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Platforms */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Best Platforms to Stake {coinName}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      APY
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Minimum Stake
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lock Period
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stakingPlatforms.map((platform, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {platform.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {platform.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {platform.apy}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {platform.minStake} {coinName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {platform.lockPeriod}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Estimated Rewards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Estimated {coinName} Staking Rewards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">100 {coinName}</h3>
                <p className="text-2xl font-bold text-green-600">4.8 {coinName}/year</p>
                <p className="text-sm text-gray-600 mt-1">~4.8% APY</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">1,000 {coinName}</h3>
                <p className="text-2xl font-bold text-green-600">48 {coinName}/year</p>
                <p className="text-sm text-gray-600 mt-1">~4.8% APY</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">10,000 {coinName}</h3>
                <p className="text-2xl font-bold text-green-600">480 {coinName}/year</p>
                <p className="text-sm text-gray-600 mt-1">~4.8% APY</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">100,000 {coinName}</h3>
                <p className="text-2xl font-bold text-green-600">4,800 {coinName}/year</p>
                <p className="text-sm text-gray-600 mt-1">~4.8% APY</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              *Rewards are estimates and may vary based on network conditions and platform rates
            </p>
          </div>
        </div>

        {/* Risks */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {coinName} Staking Risks
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-red-400 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Market Risk</h3>
                <p className="text-gray-600">
                  The value of your staked {coinName} can decrease due to market volatility. 
                  You may lose more in market value than you earn in staking rewards.
                </p>
              </div>
              <div className="border-l-4 border-yellow-400 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Slashing Risk</h3>
                <p className="text-gray-600">
                  Some networks implement slashing penalties for validator misbehavior, which can result in 
                  partial loss of staked funds. Choose reputable validators to minimize this risk.
                </p>
              </div>
              <div className="border-l-4 border-orange-400 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Liquidity Risk</h3>
                <p className="text-gray-600">
                  Staked tokens are typically locked for a period and cannot be quickly sold or traded. 
                  Consider your liquidity needs before staking large amounts.
                </p>
              </div>
              <div className="border-l-4 border-blue-400 pl-4">
                <h3 className="font-semibold text-gray-900 mb-2">Platform Risk</h3>
                <p className="text-gray-600">
                  Centralized staking platforms may face security breaches, regulatory issues, or insolvency. 
                  Use reputable platforms with strong security measures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Internal Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Related Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href={`/coins/${params.coin}`} className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900 mb-1">{coinName} Price</h3>
                <p className="text-sm text-gray-600">Live price and market data</p>
              </a>
              <a href={`/wallet/${params.coin}/metamask`} className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900 mb-1">{coinName} Wallet</h3>
                <p className="text-sm text-gray-600">Best wallets for {coinName}</p>
              </a>
              <a href={`/learn/${params.coin}-staking`} className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-medium text-gray-900 mb-1">Learn Staking</h3>
                <p className="text-sm text-gray-600">In-depth staking guide</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
