// Top 10 crypto exchanges for CryptoAsia site
export const EXCHANGES = [
  {
    slug: 'binance',
    name: 'Binance',
    logo: '/exchanges/binance.png',
    url: 'https://www.binance.com',
    affiliateUrl: 'https://www.binance.com/en/register?ref=XXXXXXXX',
    fees: {
      maker: '0.10%',
      taker: '0.10%',
      withdrawal: 'Variable'
    },
    rating: 4.8,
    pros: [
      'Largest trading volume globally',
      'Wide range of cryptocurrencies',
      'Low trading fees',
      'Advanced trading features',
      'Strong security measures',
      'Mobile app available'
    ],
    cons: [
      'Complex interface for beginners',
      'Regulatory issues in some countries',
      'Customer support can be slow'
    ],
    countries: ['Singapore', 'South Korea', 'Japan', 'India', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'Pakistan', 'Bangladesh', 'UAE', 'Saudi Arabia'],
    paymentMethods: ['Bank Transfer', 'Credit Card', 'Debit Card', 'P2P Trading', 'Cryptocurrency'],
    founded: 2017,
    volume24h: '$76.5B',
    trustScore: 10
  },
  {
    slug: 'okx',
    name: 'OKX',
    logo: '/exchanges/okx.png',
    url: 'https://www.okx.com',
    affiliateUrl: 'https://www.okx.com/join/XXXXXXXX',
    fees: {
      maker: '0.08%',
      taker: '0.10%',
      withdrawal: 'Variable'
    },
    rating: 4.6,
    pros: [
      'Low trading fees',
      'Good liquidity',
      'DeFi and Web3 features',
      'Staking options',
      'Educational resources',
      'Multiple language support'
    ],
    cons: [
      'Limited fiat options',
      'Complex verification process',
      'Not available in all countries'
    ],
    countries: ['Singapore', 'South Korea', 'Japan', 'India', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'Pakistan', 'Bangladesh', 'UAE', 'Saudi Arabia'],
    paymentMethods: ['Bank Transfer', 'Credit Card', 'P2P Trading', 'Cryptocurrency'],
    founded: 2017,
    volume24h: '$12.3B',
    trustScore: 9
  },
  {
    slug: 'kucoin',
    name: 'KuCoin',
    logo: '/exchanges/kucoin.png',
    url: 'https://www.kucoin.com',
    affiliateUrl: 'https://www.kucoin.com/r/af/XXXXXXXX',
    fees: {
      maker: '0.10%',
      taker: '0.10%',
      withdrawal: 'Variable'
    },
    rating: 4.5,
    pros: [
      'Wide variety of altcoins',
      'User-friendly interface',
      'Good mobile app',
      'Staking and lending',
      'Low minimum deposits',
      '24/7 customer support'
    ],
    cons: [
      'Lower liquidity for some pairs',
      'Limited fiat currency support',
      'Withdrawal fees can be high'
    ],
    countries: ['Singapore', 'South Korea', 'Japan', 'India', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'Pakistan', 'Bangladesh', 'UAE', 'Saudi Arabia'],
    paymentMethods: ['Bank Transfer', 'Credit Card', 'P2P Trading', 'Cryptocurrency', 'Apple Pay', 'Google Pay'],
    founded: 2017,
    volume24h: '$8.7B',
    trustScore: 9
  },
  {
    slug: 'bybit',
    name: 'Bybit',
    logo: '/exchanges/bybit.png',
    url: 'https://www.bybit.com',
    affiliateUrl: 'https://www.bybit.com/en/register?ref=XXXXXXXX',
    fees: {
      maker: '0.10%',
      taker: '0.10%',
      withdrawal: 'Variable'
    },
    rating: 4.4,
    pros: [
      'Strong derivatives market',
      'Good leverage options',
      'Fast trading engine',
      'Advanced charting tools',
      'Copy trading feature',
      'Competitive fees'
    ],
    cons: [
      'Limited spot trading options',
      'Not beginner-friendly',
      'Restricted in some regions'
    ],
    countries: ['Singapore', 'South Korea', 'Japan', 'India', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'UAE', 'Saudi Arabia'],
    paymentMethods: ['Bank Transfer', 'Credit Card', 'Cryptocurrency', 'P2P Trading'],
    founded: 2018,
    volume24h: '$10.2B',
    trustScore: 8
  },
  {
    slug: 'coinbase',
    name: 'Coinbase',
    logo: '/exchanges/coinbase.png',
    url: 'https://www.coinbase.com',
    affiliateUrl: 'https://www.coinbase.com/join/XXXXXXXX',
    fees: {
      maker: '0.40%',
      taker: '0.60%',
      withdrawal: 'Variable'
    },
    rating: 4.3,
    pros: [
      'Very user-friendly',
      'Strong security',
      'Regulated in US',
      'Insurance coverage',
      'Educational resources',
      'Good for beginners'
    ],
    cons: [
      'Higher fees',
      'Limited cryptocurrency selection',
      'Not available in all Asian countries'
    ],
    countries: ['Singapore', 'Japan', 'India', 'Philippines', 'Indonesia', 'UAE'],
    paymentMethods: ['Bank Transfer', 'Credit Card', 'Debit Card', 'PayPal', 'Cryptocurrency'],
    founded: 2012,
    volume24h: '$3.8B',
    trustScore: 10
  },
  {
    slug: 'kraken',
    name: 'Kraken',
    logo: '/exchanges/kraken.png',
    url: 'https://www.kraken.com',
    affiliateUrl: 'https://www.kraken.com/signup?ref=XXXXXXXX',
    fees: {
      maker: '0.16%',
      taker: '0.26%',
      withdrawal: 'Variable'
    },
    rating: 4.4,
    pros: [
      'High security standards',
      'Good reputation',
      'Wide range of cryptocurrencies',
      'Advanced trading features',
      'Fiat currency support',
      'Stable platform'
    ],
    cons: [
      'Higher fees for small trades',
      'Slower verification process',
      'Complex interface for beginners'
    ],
    countries: ['Singapore', 'Japan', 'India', 'Malaysia', 'Thailand', 'Philippines', 'UAE', 'Saudi Arabia'],
    paymentMethods: ['Bank Transfer', 'Wire Transfer', 'Cryptocurrency'],
    founded: 2011,
    volume24h: '$2.1B',
    trustScore: 10
  },
  {
    slug: 'gate-io',
    name: 'Gate.io',
    logo: '/exchanges/gateio.png',
    url: 'https://www.gate.io',
    affiliateUrl: 'https://www.gate.io/referral/XXXXXXXX',
    fees: {
      maker: '0.10%',
      taker: '0.10%',
      withdrawal: 'Variable'
    },
    rating: 4.2,
    pros: [
      'Huge altcoin selection',
      'Low trading fees',
      'Margin trading',
      'IEO platform',
      'Good liquidity',
      'Multiple language support'
    ],
    cons: [
      'Less regulated',
      'Complex interface',
      'Customer support issues'
    ],
    countries: ['Singapore', 'South Korea', 'Japan', 'India', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'Pakistan', 'Bangladesh', 'UAE', 'Saudi Arabia'],
    paymentMethods: ['Bank Transfer', 'Credit Card', 'P2P Trading', 'Cryptocurrency'],
    founded: 2013,
    volume24h: '$5.4B',
    trustScore: 8
  },
  {
    slug: 'huobi',
    name: 'Huobi',
    logo: '/exchanges/huobi.png',
    url: 'https://www.huobi.com',
    affiliateUrl: 'https://www.huobi.com/en-us/register?inviter=XXXXXXXX',
    fees: {
      maker: '0.10%',
      taker: '0.10%',
      withdrawal: 'Variable'
    },
    rating: 4.1,
    pros: [
      'Strong in Asian markets',
      'Good liquidity',
      'Multiple trading products',
      'Staking options',
      'Mobile app',
      'Educational content'
    ],
    cons: [
      'Regulatory concerns',
      'Limited fiat options',
      'Complex fee structure'
    ],
    countries: ['Singapore', 'South Korea', 'Japan', 'India', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'Pakistan', 'Bangladesh'],
    paymentMethods: ['Bank Transfer', 'Credit Card', 'P2P Trading', 'Cryptocurrency'],
    founded: 2013,
    volume24h: '$4.2B',
    trustScore: 8
  },
  {
    slug: 'mexc',
    name: 'MEXC',
    logo: '/exchanges/mexc.png',
    url: 'https://www.mexc.com',
    affiliateUrl: 'https://www.mexc.com/register?inviteCode=XXXXXXXX',
    fees: {
      maker: '0.10%',
      taker: '0.10%',
      withdrawal: 'Variable'
    },
    rating: 4.0,
    pros: [
      'Low trading fees',
      'Wide altcoin selection',
      'Launchpad platform',
      'Good mobile app',
      'Fast withdrawals',
      'Multiple language support'
    ],
    cons: [
      'Lower liquidity',
      'Limited fiat options',
      'Newer platform'
    ],
    countries: ['Singapore', 'South Korea', 'Japan', 'India', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'Pakistan', 'Bangladesh', 'UAE', 'Saudi Arabia'],
    paymentMethods: ['Bank Transfer', 'Credit Card', 'P2P Trading', 'Cryptocurrency'],
    founded: 2018,
    volume24h: '$6.8B',
    trustScore: 7
  },
  {
    slug: 'bitget',
    name: 'Bitget',
    logo: '/exchanges/bitget.png',
    url: 'https://www.bitget.com',
    affiliateUrl: 'https://www.bitget.com/register?ref=XXXXXXXX',
    fees: {
      maker: '0.10%',
      taker: '0.10%',
      withdrawal: 'Variable'
    },
    rating: 4.3,
    pros: [
      'Strong copy trading',
      'Good derivatives market',
      'Low fees',
      'User-friendly interface',
      'Mobile app',
      'Security features'
    ],
    cons: [
      'Limited spot trading',
      'Newer platform',
      'Restricted in some regions'
    ],
    countries: ['Singapore', 'South Korea', 'Japan', 'India', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'Pakistan', 'Bangladesh', 'UAE', 'Saudi Arabia'],
    paymentMethods: ['Bank Transfer', 'Credit Card', 'P2P Trading', 'Cryptocurrency'],
    founded: 2018,
    volume24h: '$7.9B',
    trustScore: 8
  }
];

// Get exchanges available in a specific country
export function getExchangesByCountry(country) {
  return EXCHANGES.filter(exchange => 
    exchange.countries.some(supportedCountry => 
      supportedCountry.toLowerCase() === country.toLowerCase()
    )
  );
}

// Get exchange by slug
export function getExchange(slug) {
  return EXCHANGES.find(exchange => exchange.slug === slug);
}

// Get all exchange slugs
export function getAllExchangeSlugs() {
  return EXCHANGES.map(exchange => exchange.slug);
}

// Get exchanges by rating (minimum rating)
export function getExchangesByMinRating(minRating) {
  return EXCHANGES.filter(exchange => exchange.rating >= minRating);
}

// Get exchanges by payment method
export function getExchangesByPaymentMethod(paymentMethod) {
  return EXCHANGES.filter(exchange => 
    exchange.paymentMethods.some(method => 
      method.toLowerCase() === paymentMethod.toLowerCase()
    )
  );
}

// Get top exchanges by volume
export function getTopExchangesByVolume(limit = 5) {
  return EXCHANGES
    .sort((a, b) => parseFloat(b.volume24h.replace('$', '').replace('B', '')) - parseFloat(a.volume24h.replace('$', '').replace('B', '')))
    .slice(0, limit);
}

// Get exchanges with lowest fees
export function getLowestFeeExchanges(limit = 5) {
  return EXCHANGES
    .sort((a, b) => parseFloat(a.fees.taker) - parseFloat(b.fees.taker))
    .slice(0, limit);
}
