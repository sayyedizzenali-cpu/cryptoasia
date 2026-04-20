const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Helper function with Next.js cache
async function fetchCG(endpoint, options = {}) {
  const url = `${COINGECKO_API}${endpoint}`;
  
  const defaultOptions = {
    next: { revalidate: 60 }, // Cache for 60 seconds
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    // Handle rate limit errors gracefully
    if (response.status === 429) {
      console.warn('CoinGecko API rate limit reached (429), returning null');
      return null;
    }
    throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// Get top cryptocurrencies by market cap
export async function getTopCoins(currency = 'usd', limit = 100) {
  const params = new URLSearchParams({
    vs_currency: currency,
    order: 'market_cap_desc',
    per_page: limit,
    page: 1,
    sparkline: false,
    price_change_percentage: '1h,24h,7d,30d',
  });

  return fetchCG(`/coins/markets?${params}`);
}

// Get detailed information about a specific cryptocurrency
export async function getCoinDetail(id, localization = false, tickers = true, market_data = true, community_data = true, developer_data = true, sparkline = true) {
  const params = new URLSearchParams({
    localization,
    tickers,
    market_data,
    community_data,
    developer_data,
    sparkline,
  });

  return fetchCG(`/coins/${id}?${params}`);
}

// Get current price of multiple cryptocurrencies
export async function getCoinMultiPrice(ids, currencies = ['usd'], include_market_cap = true, include_24hr_vol = true, include_24hr_change = true, include_last_updated_at = true) {
  const params = new URLSearchParams({
    ids: ids.join(','),
    vs_currencies: currencies.join(','),
    include_market_cap,
    include_24hr_vol,
    include_24hr_change,
    include_last_updated_at,
  });

  return fetchCG(`/simple/price?${params}`);
}

// Get global cryptocurrency market data
export async function getGlobalData() {
  return fetchCG('/global');
}

// Get trending cryptocurrencies
export async function getTrending() {
  return fetchCG('/search/trending');
}

// Search for cryptocurrencies
export async function searchCoins(query) {
  const params = new URLSearchParams({ query });
  return fetchCG(`/search?${params}`);
}

// Format price with appropriate currency symbol and decimal places
export function formatPrice(price, currency = 'usd') {
  if (price === null || price === undefined) return 'N/A';
  
  const currencySymbols = {
    usd: '$',
    eur: '¥',
    gbp: '£',
    jpy: '¥',
    cny: '¥',
    inr: '¥',
    krw: '¥',
    sgd: 'S$',
    hkd: 'HK$',
    myr: 'RM',
    thb: '¥',
    idr: 'Rp',
    php: '¥',
    vnd: '¥',
    pkr: 'Rs',
    bdt: '¥',
    aed: '¥',
    sar: '¥',
    lkr: 'Rs',
    mmk: 'K',
  };

  const symbol = currencySymbols[currency.toLowerCase()] || '';
  
  if (price >= 1) {
    return `${symbol}${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else if (price >= 0.01) {
    return `${symbol}${price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}`;
  } else {
    return `${symbol}${price.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 8 })}`;
  }
}

// Format percentage change with color indicators
export function formatChange(change) {
  if (change === null || change === undefined) return 'N/A';
  
  const formatted = Math.abs(change).toFixed(2) + '%';
  return change >= 0 ? `+${formatted}` : `-${formatted}`;
}

// Format market cap with appropriate suffixes
export function formatMarketCap(marketCap) {
  if (marketCap === null || marketCap === undefined) return 'N/A';
  
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else if (marketCap >= 1e3) {
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  } else {
    return `$${marketCap.toFixed(2)}`;
  }
}

// Array of 20 Asian currencies
export const CURRENCIES = [
  'usd',  // US Dollar (widely used in Asia)
  'cny',  // Chinese Yuan
  'jpy',  // Japanese Yen
  'krw',  // South Korean Won
  'inr',  // Indian Rupee
  'sgd',  // Singapore Dollar
  'hkd',  // Hong Kong Dollar
  'myr',  // Malaysian Ringgit
  'thb',  // Thai Baht
  'idr',  // Indonesian Rupiah
  'php',  // Philippine Peso
  'vnd',  // Vietnamese Dong
  'pkr',  // Pakistani Rupee
  'bdt',  // Bangladeshi Taka
  'aed',  // UAE Dirham
  'sar',  // Saudi Riyal
  'lkr',  // Sri Lankan Rupee
  'mmk',  // Myanmar Kyat
  'npr',  // Nepalese Rupee
  'lak',  // Lao Kip
];

// Array of 15 Asian countries
export const ASIA_COUNTRIES = [
  {
    name: 'Pakistan',
    code: 'PK',
    currency: 'pkr',
    flag: 'PK',
  },
  {
    name: 'India',
    code: 'IN',
    currency: 'inr',
    flag: 'IN',
  },
  {
    name: 'Indonesia',
    code: 'ID',
    currency: 'idr',
    flag: 'ID',
  },
  {
    name: 'Philippines',
    code: 'PH',
    currency: 'php',
    flag: 'PH',
  },
  {
    name: 'Bangladesh',
    code: 'BD',
    currency: 'bdt',
    flag: 'BD',
  },
  {
    name: 'Malaysia',
    code: 'MY',
    currency: 'myr',
    flag: 'MY',
  },
  {
    name: 'Vietnam',
    code: 'VN',
    currency: 'vnd',
    flag: 'VN',
  },
  {
    name: 'Thailand',
    code: 'TH',
    currency: 'thb',
    flag: 'TH',
  },
  {
    name: 'South Korea',
    code: 'KR',
    currency: 'krw',
    flag: 'KR',
  },
  {
    name: 'Singapore',
    code: 'SG',
    currency: 'sgd',
    flag: 'SG',
  },
  {
    name: 'UAE',
    code: 'AE',
    currency: 'aed',
    flag: 'AE',
  },
  {
    name: 'Saudi Arabia',
    code: 'SA',
    currency: 'sar',
    flag: 'SA',
  },
  {
    name: 'China',
    code: 'CN',
    currency: 'cny',
    flag: 'CN',
  },
  {
    name: 'Japan',
    code: 'JP',
    currency: 'jpy',
    flag: 'JP',
  },
  {
    name: 'Sri Lanka',
    code: 'LK',
    currency: 'lkr',
    flag: 'LK',
  },
];
