export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const coin = searchParams.get('coin')

  try {
    // Use CryptoPanic API for crypto news
    const apiUrl = new URL('https://cryptopanic.com/api/v1/posts/')
    
    // Add filters
    const filters = []
    if (coin) {
      filters.push(`(title:${coin} OR tags:${coin})`)
    }
    
    // Focus on news (not opinions)
    filters.push('kind:news')
    
    if (filters.length > 0) {
      apiUrl.searchParams.append('filter', filters.join(' AND '))
    }
    
    // Add API key if available (you'd need to get one from CryptoPanic)
    // apiUrl.searchParams.append('auth_token', process.env.CRYPTOPANIC_API_KEY)
    
    const response = await fetch(apiUrl.toString())
    
    if (!response.ok) {
      throw new Error('Failed to fetch news from CryptoPanic')
    }
    
    const data = await response.json()
    
    // Process and return news items
    const news = data.results?.slice(0, 10).map(item => ({
      id: item.id,
      title: item.title,
      url: item.url,
      source: {
        name: item.source?.title || 'Unknown',
        domain: item.source?.domain || 'unknown'
      },
      published_at: item.published_at,
      sentiment: item.votes?.positive > item.votes?.negative ? 'bullish' : 
                 item.votes?.negative > item.votes?.positive ? 'bearish' : 'neutral',
      currencies: item.currencies || []
    })) || []

    return Response.json({ news })

  } catch (error) {
    console.error('News API error:', error)
    
    // Fallback to mock data if CryptoPanic fails
    const mockNews = [
      {
        id: '1',
        title: `${coin ? coin.toUpperCase() : 'Cryptocurrency'} Market Shows Strong Momentum`,
        url: '#',
        source: {
          name: 'CryptoAsia News',
          domain: 'cryptoasia.com'
        },
        published_at: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
        sentiment: 'bullish',
        currencies: coin ? [coin.toUpperCase()] : []
      },
      {
        id: '2',
        title: 'Asian Crypto Markets See Increased Trading Volume',
        url: '#',
        source: {
          name: 'Asia Blockchain Today',
          domain: 'asiablockchain.today'
        },
        published_at: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
        sentiment: 'bullish',
        currencies: []
      },
      {
        id: '3',
        title: 'Regulatory Developments Impact Digital Asset Trading',
        url: '#',
        source: {
          name: 'Digital Finance Weekly',
          domain: 'digitalfinance.weekly'
        },
        published_at: Math.floor(Date.now() / 1000) - 14400, // 4 hours ago
        sentiment: 'neutral',
        currencies: []
      }
    ]

    return Response.json({ news: mockNews })
  }
}
