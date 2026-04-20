import { getCoinDetail, formatPrice } from '@/lib/coingecko';
import NewsSection from '@/components/NewsSection';
import { generateBreadcrumbSchema } from '@/lib/schemas';

export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const coinName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  
  return {
    title: `${coinName} News Today — Latest ${coinName.toUpperCase()} Cryptocurrency News`,
    description: `Get today's latest ${coinName} news, price analysis, and cryptocurrency updates. Real-time ${coinName} market insights and breaking news.`,
    keywords: [`${coinName} news today`, `latest ${coinName} news`, `${coinName} cryptocurrency news`, `${coinName} price news`, `${coinName} updates`],
    openGraph: {
      title: `${coinName} News Today`,
      description: `Latest ${coinName} cryptocurrency news and updates`,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${coinName} News Today`,
      description: `Latest ${coinName} cryptocurrency news`
    },
    alternates: {
      canonical: `https://cryptoasia.com/news/coin/${params.slug}`
    }
  };
}


export default async function CoinNewsPage({ params }) {
  const coinName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  const coinDetail = await getCoinDetail(params.slug);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'News', url: '/news' },
    { name: 'Coin News', url: '/news/coin' },
    { name: coinName, url: `/news/coin/${params.slug}` }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
                <li>
                  <a href="/news/coin" className="text-gray-500 hover:text-gray-700">Coin News</a>
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
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                {coinName} News Today
              </h1>
              <p className="text-xl opacity-90">
                Latest {coinName} Cryptocurrency News
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

        {/* News Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <NewsSection coinId={params.slug} />
          </div>
        </div>
      </div>
    </>
  );
}
