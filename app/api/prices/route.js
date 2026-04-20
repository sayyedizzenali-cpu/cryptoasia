import { getCoinMultiPrice } from '@/lib/coingecko'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const ids = searchParams.get('ids')
  const vsCurrencies = searchParams.get('vs_currencies') || 'usd'

  if (!ids) {
    return Response.json(
      { error: 'Coin IDs are required' },
      { status: 400 }
    )
  }

  try {
    const coinIds = ids.split(',').map(id => id.trim()).filter(id => id)
    const currencies = vsCurrencies.split(',').map(curr => curr.trim()).filter(curr => curr)

    // Limit to reasonable number of coins to avoid API limits
    const limitedIds = coinIds.slice(0, 50)
    
    const priceData = await getCoinMultiPrice(
      limitedIds,
      currencies,
      true,  // include_market_cap
      true,  // include_24hr_vol
      true,  // include_24hr_change
      true   // include_last_updated_at
    )

    return Response.json(priceData)

  } catch (error) {
    console.error('Prices API error:', error)
    return Response.json(
      { error: 'Failed to fetch prices' },
      { status: 500 }
    )
  }
}
