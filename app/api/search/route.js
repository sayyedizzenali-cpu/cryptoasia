import { searchCoins } from '@/lib/coingecko'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return Response.json({ coins: [] })
  }

  try {
    const results = await searchCoins(query)
    
    // Return top 8 coins with relevant data
    const coins = results.coins?.slice(0, 8).map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      thumb: coin.thumb,
      market_cap_rank: coin.market_cap_rank,
      market_cap: coin.market_cap
    })) || []

    return Response.json({ coins })
  } catch (error) {
    console.error('Search API error:', error)
    return Response.json(
      { error: 'Failed to search coins', coins: [] },
      { status: 500 }
    )
  }
}
