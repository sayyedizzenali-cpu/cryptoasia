import { BreadcrumbList, FAQPage } from '@/schemas';
import NewsSection from '@/components/NewsSection';
import { getBreadcrumbJsonLd } from '@/lib/breadcrumbs';

export const dynamicParams = true;
export const revalidate = 300;





export async function generateStaticParams() {
  return [
    { slug: 'pakistan' },
    { slug: 'india' },
    { slug: 'indonesia' },
    { slug: 'philippines' },
    { slug: 'bangladesh' },
    { slug: 'malaysia' },
    { slug: 'vietnam' },
    { slug: 'thailand' },
    { slug: 'south-korea' },
    { slug: 'singapore' },
    { slug: 'uae' },
    { slug: 'saudi-arabia' },
    { slug: 'sri-lanka' },
    { slug: 'nepal' },
    { slug: 'japan' },
    { slug: 'china' },
    { slug: 'myanmar' },
    { slug: 'cambodia' },
    { slug: 'hong-kong' },
    { slug: 'taiwan' },
    { slug: 'iran' },
    { slug: 'iraq' },
    { slug: 'jordan' },
    { slug: 'kuwait' },
    { slug: 'qatar' },
    { slug: 'oman' },
    { slug: 'bahrain' },
    { slug: 'turkey' },
    { slug: 'egypt' },
    { slug: 'nigeria' },
    { slug: 'kenya' },
    { slug: 'ghana' },
    { slug: 'south-africa' },
    { slug: 'ethiopia' },
    { slug: 'tanzania' },
    { slug: 'cameroon' },
    { slug: 'senegal' },
    { slug: 'morocco' },
    { slug: 'algeria' },
    { slug: 'tunisia' },
    { slug: 'libya' },
    { slug: 'sudan' },
    { slug: 'uganda' },
    { slug: 'zimbabwe' },
    { slug: 'zambia' },
    { slug: 'mozambique' },
    { slug: 'angola' },
    { slug: 'botswana' },
    { slug: 'namibia' },
    { slug: 'lesotho' },
    { slug: 'swaziland' },
    { slug: 'rwanda' },
    { slug: 'burundi' }
  ]
}

export async function generateMetadata({ params }) {
  const countryName = params.country.charAt(0).toUpperCase() + params.country.slice(1);
  
  return {
    title: `Crypto News ${countryName} — Latest Cryptocurrency News Today`,
    description: `Stay updated with the latest cryptocurrency news in ${countryName}. Get real-time crypto market updates, regulatory changes, and investment opportunities for ${countryName} investors.`,
    keywords: [`crypto news ${countryName}`, `${countryName} cryptocurrency`, `${countryName} crypto market`, `${countryName} blockchain news`, `${countryName} crypto regulations`],
    openGraph: {
      title: `Crypto News ${countryName}`,
      description: `Latest cryptocurrency news and updates for ${countryName}`,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `Crypto News ${countryName}`,
      description: `Latest cryptocurrency news and updates for ${countryName}`
    },
    alternates: {
      canonical: `https://cryptoasia.com/news/${params.country}`
    }
  };
}

export async function generateJsonLd({ params }) {
  const countryName = params.country.charAt(0).toUpperCase() + params.country.slice(1);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: `CryptoAsia ${countryName} News`,
    description: `Latest cryptocurrency news and updates for ${countryName}`,
    url: `https://cryptoasia.com/news/${params.country}`,
    coverage: {
      '@type': 'Thing',
      name: `${countryName} cryptocurrency market`
    }
  };
}

export default function NewsPage({ params }) {
  const countryName = params.country.charAt(0).toUpperCase() + params.country.slice(1);
  
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'News', url: '/news' },
    { name: countryName, url: `/news/${params.country}` }
  ]);

  const topCoins = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 45000, change: '+2.5%' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 2800, change: '+1.8%' },
    { id: 'solana', name: 'Solana', symbol: 'SOL', price: 105, change: '+3.1%' },
    { id: 'bnb', name: 'BNB', symbol: 'BNB', price: 320, change: '+1.2%' },
    { id: 'xrp', name: 'XRP', symbol: 'XRP', price: 0.65, change: '+0.8%' }
  ];

  const faqs = [
    {
      question: `What are the latest crypto regulations in ${countryName}?`,
      answer: `${countryName} continues to develop its cryptocurrency regulatory framework. Recent updates focus on investor protection, anti-money laundering measures, and taxation policies for crypto assets.`
    },
    {
      question: `How can I buy cryptocurrency in ${countryName}?`,
      answer: `Residents of ${countryName} can buy cryptocurrency through various exchanges, P2P platforms, and local payment methods. Popular options include international exchanges with local support and regional crypto platforms.`
    },
    {
      question: `Is cryptocurrency legal in ${countryName}?`,
      answer: `Cryptocurrency regulations in ${countryName} are evolving. While there are restrictions on certain activities, crypto trading and investment are generally permitted with proper compliance and reporting requirements.`
    },
    {
      question: `What crypto exchanges operate in ${countryName}?`,
      answer: `Several cryptocurrency exchanges serve ${countryName} market, including both international platforms with local support and regional exchanges. Always choose exchanges with proper licensing and security measures.`
    },
    {
      question: `How are crypto gains taxed in ${countryName}?`,
      answer: `${countryName} has specific tax regulations for cryptocurrency gains. Generally, crypto profits are subject to capital gains tax, and reporting requirements may apply based on transaction amounts.`
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
        })}
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
                  <a href="/news" className="text-gray-500 hover:text-gray-700">News</a>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 font-medium">
                  {countryName}
                </li>
              </ol>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">
                Crypto News {countryName}
              </h1>
              <p className="text-xl opacity-90">
                Latest Cryptocurrency News Today
              </p>
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <NewsSection country={params.country} />
          </div>
        </div>

        {/* Top Coins */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Top Cryptocurrencies in {countryName}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Symbol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price (USD)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      24h Change
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topCoins.map((coin, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{coin.name}</div>
                            <div className="text-sm text-gray-500">{coin.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {coin.symbol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${coin.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          coin.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {coin.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Related Exchanges */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Popular Crypto Exchanges in {countryName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                href={`/exchange/${params.country}`}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium text-gray-900">Crypto Exchanges in {countryName}</h3>
                <p className="text-sm text-gray-600 mt-1">Find the best exchanges for {countryName} users</p>
              </a>
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
      </div>
    </>
  );
}
