import { getCoinDetail } from '@/lib/coingecko'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const coin = searchParams.get('coin')
  const days = searchParams.get('days')

  if (!coin) {
    return Response.json(
      { error: 'Coin ID is required' },
      { status: 400 }
    )
  }

  // Default to 1 day if no days specified
  const chartDays = days ? parseFloat(days) : 1

  try {
    const coinData = await getCoinDetail(
      coin,
      false, // localization
      false, // tickers
      true,  // market_data
      false, // community_data
      false, // developer_data
      true   // sparkline
    )

    if (!coinData || !coinData.market_data || !coinData.market_data.sparkline_in_7d) {
      return Response.json(
        { error: 'Chart data not available for this coin' },
        { status: 404 }
      )
    }

    // Get sparkline data (7 days by default)
    let sparklineData = coinData.market_data.sparkline_in_7d?.price || []
    
    // For different time periods, we'll sample the data accordingly
    if (chartDays <= 1) {
      // For 1 day, use last 24 hours of data
      const totalPoints = sparklineData.length
      const pointsToShow = Math.min(24, totalPoints)
      sparklineData = sparklineData.slice(-pointsToShow)
    } else if (chartDays <= 7) {
      // For up to 7 days, use all data
      sparklineData = sparklineData
    } else {
      // For longer periods, we'd need to fetch from different endpoint
      // For now, we'll use the 7-day data
      sparklineData = sparklineData
    }

    // Generate timestamps (simplified - in production, use actual timestamps from API)
    const now = Date.now()
    const timeInterval = (7 * 24 * 60 * 60 * 1000) / sparklineData.length // 7 days in ms divided by number of points
    
    const prices = sparklineData.map((price, index) => [
      now - (sparklineData.length - 1 - index) * timeInterval,
      price
    ])

    // Generate volume data (simplified - in production, fetch actual volume data)
    const volumes = prices.map(([timestamp, price]) => [
      timestamp,
      Math.random() * 1000000 // Mock volume data
    ])

    return Response.json({
      prices,
      volumes,
      current_price: coinData.market_data.current_price?.usd || 0,
      price_change_percentage_24h: coinData.market_data.price_change_percentage_24h || 0
    })

  } catch (error) {
    console.error('Chart API error:', error)
    return Response.json(
      { error: 'Failed to fetch chart data' },
      { status: 500 }
    )
  }
}
