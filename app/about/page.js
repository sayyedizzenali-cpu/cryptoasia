import { ASIA_COUNTRIES } from '@/lib/coingecko';
import { getExchangesByCountry } from '@/lib/exchanges';

export const revalidate = 86400; // 24 hours

export const metadata = {
  title: 'About CryptoAsia | Leading Cryptocurrency Platform for Asian Markets',
  description: 'Learn about CryptoAsia\'s mission to provide comprehensive cryptocurrency data and insights for Asian markets. Discover our data sources, methodology, and team.',
  keywords: [
    'about cryptoasia',
    'cryptocurrency data',
    'asian crypto markets',
    'cryptoasia team',
    'data sources',
    'methodology',
    'coingecko api',
    'cryptocurrency analytics',
  ],
  openGraph: {
    title: 'About CryptoAsia | Leading Cryptocurrency Platform for Asian Markets',
    description: 'Learn about CryptoAsia\'s mission to provide comprehensive cryptocurrency data and insights for Asian markets. Discover our data sources, methodology, and team.',
    type: 'website',
    images: [
      {
        url: '/images/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'About CryptoAsia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CryptoAsia | Leading Cryptocurrency Platform for Asian Markets',
    description: 'Learn about CryptoAsia\'s mission to provide comprehensive cryptocurrency data and insights for Asian markets.',
    images: ['/images/og-about.jpg'],
  },
  alternates: {
    canonical: 'https://cryptoasia.com/about',
  },
};

// JSON-LD schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CryptoAsia',
  url: 'https://cryptoasia.com',
  logo: {
    '@type': 'ImageObject',
    url: '/images/logo.png',
  },
  description: 'Leading cryptocurrency data and analytics platform focused on Asian markets',
  sameAs: [
    'https://twitter.com/cryptoasia',
    'https://facebook.com/cryptoasia',
    'https://linkedin.com/company/cryptoasia',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'support@cryptoasia.com',
    availableLanguage: ['English', 'Chinese', 'Japanese', 'Korean', 'Hindi'],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex text-sm text-gray-600" aria-label="Breadcrumb">
              <a href="/" className="hover:text-gray-900">Home</a>
              <span className="mx-2">/</span>
              <span className="text-gray-900">About</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">About CryptoAsia</h1>
              <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
                Your trusted source for cryptocurrency data and insights focused on Asian markets
              </p>
              <div className="flex items-center justify-center text-sm text-blue-200">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                <span>Serving millions of users across Asia since 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                CryptoAsia is dedicated to providing comprehensive, accurate, and timely cryptocurrency data and insights specifically tailored for Asian markets. We bridge the information gap in the rapidly evolving cryptocurrency landscape, enabling investors, traders, and enthusiasts across Asia to make informed decisions.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our platform focuses on the unique characteristics of Asian cryptocurrency markets, including regional regulatory developments, local trading patterns, and Asia-specific market dynamics. We understand that Asian markets operate differently from Western markets, with distinct trading hours, regulatory environments, and user behaviors.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By providing localized insights, comprehensive market analysis, and user-friendly tools, we empower our users to navigate the complex world of cryptocurrency investments with confidence. Our commitment to accuracy, transparency, and user education makes CryptoAsia the trusted choice for cryptocurrency information across Asia.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Real-Time Data</h3>
                <p className="text-gray-600">Live cryptocurrency prices, market data, and trading volumes updated every minute</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Asian Market Focus</h3>
                <p className="text-gray-600">Specialized coverage of Asian cryptocurrency markets, regulations, and trading patterns</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Educational Resources</h3>
                <p className="text-gray-600">Comprehensive guides, tutorials, and analysis for cryptocurrency education</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">Data Sources & Methodology</h2>
            <div className="prose prose-lg max-w-none">
              <h3 className="text-xl font-semibold mb-4">Primary Data Sources</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                CryptoAsia primarily sources its cryptocurrency data from <strong>CoinGecko</strong>, one of the world's leading cryptocurrency data aggregators. CoinGecko provides comprehensive market data, including prices, trading volumes, market capitalization, and historical data for thousands of cryptocurrencies across hundreds of exchanges worldwide.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 mt-6">Data Accuracy & Reliability</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We ensure data accuracy through multiple validation processes:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Real-time data synchronization with CoinGecko APIs</li>
                <li>Cross-referencing data across multiple exchanges</li>
                <li>Automated anomaly detection and correction</li>
                <li>Regular data quality audits and validation checks</li>
                <li>Historical data consistency verification</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Market Coverage</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our platform covers cryptocurrency markets with special focus on:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Top 100 cryptocurrencies</strong> by market capitalization</li>
                <li><strong>20 Asian currencies</strong> for price conversion and trading pairs</li>
                <li><strong>15 Asian countries</strong> with localized market data and regulations</li>
                <li><strong>Major Asian exchanges</strong> with real-time trading data</li>
                <li><strong>Regional trading patterns</strong> and market sentiment analysis</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4 mt-6">Update Frequency</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our data is updated with the following frequency:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Real-time prices:</strong> Updated every 60 seconds</li>
                <li><strong>Market data:</strong> Refreshed every 5 minutes</li>
                <li><strong>Historical data:</strong> Updated hourly with latest trading information</li>
                <li><strong>Regulatory information:</strong> Reviewed and updated daily</li>
                <li><strong>Exchange data:</strong> Synchronized continuously during trading hours</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-blue-800">
                  <strong>Data Attribution:</strong> Cryptocurrency market data is sourced from CoinGecko. 
                  CoinGecko is an independent data aggregator that collects information from hundreds of 
                  cryptocurrency exchanges worldwide. We acknowledge CoinGecko's contribution to the 
                  cryptocurrency data ecosystem and thank them for providing reliable market data.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team & Expertise */}
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">Our Team & Expertise</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                The CryptoAsia team combines deep expertise in cryptocurrency markets, Asian financial systems, 
                and cutting-edge technology. Our multidisciplinary team includes:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Cryptocurrency Experts</h3>
                  <p className="text-gray-600">
                    Experienced traders and analysts with deep understanding of blockchain technology, 
                    market dynamics, and trading strategies specific to Asian markets.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Financial Analysts</h3>
                  <p className="text-gray-600">
                    Professionals with backgrounds in traditional finance and emerging digital asset markets, 
                    providing insights into market trends and investment opportunities.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Technology Specialists</h3>
                  <p className="text-gray-600">
                    Engineers and developers building robust infrastructure to deliver real-time data, 
                    analytics, and user-friendly platforms for cryptocurrency enthusiasts.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Regional Experts</h3>
                  <p className="text-gray-600">
                    Specialists with deep knowledge of Asian markets, regulations, and cultural factors 
                    influencing cryptocurrency adoption across different countries.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 mt-6">Our Methodology</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our analytical methodology combines quantitative analysis with qualitative insights to provide 
                comprehensive cryptocurrency intelligence:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Quantitative Analysis:</strong> Statistical modeling of price movements, trading volumes, and market correlations</li>
                <li><strong>Technical Analysis:</strong> Chart patterns, indicators, and trend analysis for short and long-term predictions</li>
                <li><strong>Fundamental Analysis:</strong> Project evaluation, technology assessment, and market positioning</li>
                <li><strong>Regulatory Analysis:</strong> Monitoring and interpreting regulatory developments across Asian markets</li>
                <li><strong>Market Sentiment:</strong> Social media analysis, news sentiment, and community engagement metrics</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>support@cryptoasia.com</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span>www.cryptoasia.com</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-blue-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Business Hours</h3>
              <p className="text-gray-600">
                Our support team is available Monday through Friday, 9:00 AM - 6:00 PM (SGT/HKT/JST). 
                We strive to respond to all inquiries within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6">CryptoAsia by the Numbers</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10M+</div>
                <p className="text-gray-600">Monthly Active Users</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">15</div>
                <p className="text-gray-600">Asian Countries Covered</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">5,000+</div>
                <p className="text-gray-600">Cryptocurrencies Tracked</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
                <p className="text-gray-600">Data Accuracy Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
