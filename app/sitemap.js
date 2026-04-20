import { CURRENCIES, ASIA_COUNTRIES } from '@/lib/coingecko'

// Top 100 cryptocurrencies by market cap (hardcoded for static sitemap)
const TOP_COINS = [
  'bitcoin', 'ethereum', 'tether', 'binance-coin', 'solana', 'xrp', 'usd-coin',
  'cardano', 'avalanche-2', 'dogecoin', 'polkadot-new', 'tron', 'chainlink',
  'polygon-ecosystem-token', 'uniswap', 'litecoin', 'ethereum-classic', 'stellar',
  'filecoin', 'cosmos', 'near', 'algorand', 'vechain', 'internet-computer',
  'the-sandbox', 'flow', 'aave', 'tezos', 'theta-token', 'helium',
  'ftx-token', 'elrond-erd-2', 'compound', 'wrapped-bitcoin', 'dash',
  'kava', 'pancakeswap-token', 'maker', 'eos', 'curve-dao-token',
  'decentraland', 'iota', 'neo', 'zcash', 'basic-attention-token',
  'quant-network', 'arweave', 'waves', 'holo', 'klay-token',
  'nem', 'chiliz', 'harmony', 'theta-fuel', 'ravencoin',
  'siacoin', 'enjin-coin', 'nano', 'icon', 'bitcoin-cash',
  'steem', 'iotex', 'ocean-protocol', 'qtum', 'husd',
  'pax-gold', 'verge', 'digibyte', '0x', 'zilliqa',
  'status', 'lisk', 'trueusd', 'bitcoin-diamond', 'omisego',
  'augur', 'golem', 'maidsafecoin', 'bytecoin-bcn', 'bitshares',
  'stratis', 'populous', 'wax', 'gxs-monaco', 'paxos-standard',
  'numeraire', 'ark', 'hush', 'digixdao', 'byteball',
  'gulden', 'monacoin', 'emercoin', 'bitcoindark', 'blackcoin',
  'peercoin', 'novacoin', 'primecoin', 'namecoin', 'worldcoin'
]

export default function sitemap() {
  const baseUrl = 'https://cryptoasia.com'
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFreq: 'hourly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: currentDate,
      changeFreq: 'hourly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/exchanges`,
      lastModified: currentDate,
      changeFreq: 'daily',
      priority: 0.8
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: currentDate,
      changeFreq: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: currentDate,
      changeFreq: 'weekly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFreq: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFreq: 'monthly',
      priority: 0.5
    }
  ]

  // Coin pages
  const coinPages = TOP_COINS.map(coin => ({
    url: `${baseUrl}/coins/${coin}`,
    lastModified: currentDate,
    changeFreq: 'hourly',
    priority: 0.8
  }))

  // Currency pages
  const currencyPages = CURRENCIES.map(currency => ({
    url: `${baseUrl}/currencies/${currency}`,
    lastModified: currentDate,
    changeFreq: 'daily',
    priority: 0.6
  }))

  // Country pages
  const countryPages = ASIA_COUNTRIES.map(country => ({
    url: `${baseUrl}/countries/${country.code.toLowerCase()}`,
    lastModified: currentDate,
    changeFreq: 'daily',
    priority: 0.6
  }))

  // Exchange pages
  const exchangeSlugs = [
    'binance', 'okx', 'kucoin', 'bybit', 'coinbase', 'kraken', 'gate-io',
    'huobi', 'mexc', 'bitget'
  ]
  
  const exchangePages = exchangeSlugs.map(slug => ({
    url: `${baseUrl}/exchanges/${slug}`,
    lastModified: currentDate,
    changeFreq: 'daily',
    priority: 0.7
  }))

  // Category pages
  const categoryPages = [
    {
      url: `${baseUrl}/categories/defi`,
      lastModified: currentDate,
      changeFreq: 'daily',
      priority: 0.7
    },
    {
      url: `${baseUrl}/categories/nft`,
      lastModified: currentDate,
      changeFreq: 'daily',
      priority: 0.7
    },
    {
      url: `${baseUrl}/categories/metaverse`,
      lastModified: currentDate,
      changeFreq: 'daily',
      priority: 0.7
    },
    {
      url: `${baseUrl}/categories/gaming`,
      lastModified: currentDate,
      changeFreq: 'daily',
      priority: 0.7
    },
    {
      url: `${baseUrl}/categories/layer-1`,
      lastModified: currentDate,
      changeFreq: 'daily',
      priority: 0.7
    },
    {
      url: `${baseUrl}/categories/layer-2`,
      lastModified: currentDate,
      changeFreq: 'daily',
      priority: 0.7
    },
    {
      url: `${baseUrl}/categories/stablecoins`,
      lastModified: currentDate,
      changeFreq: 'daily',
      priority: 0.7
    },
    {
      url: `${baseUrl}/categories/meme-coins`,
      lastModified: currentDate,
      changeFreq: 'daily',
      priority: 0.7
    }
  ]

  // Combine all pages
  const allPages = [
    ...staticPages,
    ...coinPages,
    ...currencyPages,
    ...countryPages,
    ...exchangePages,
    ...categoryPages
  ]

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  })
}
