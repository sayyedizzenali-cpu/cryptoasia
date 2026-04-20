'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export default function PriceChart({ coinId, coinName, currentPrice }) {
  const [period, setPeriod] = useState('1D')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hoveredPoint, setHoveredPoint] = useState(null)
  
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const animationRef = useRef(null)

  // Period configurations
  const periods = [
    { key: '1H', label: '1H', days: 1/24 },
    { key: '1D', label: '1D', days: 1 },
    { key: '7D', label: '7D', days: 7 },
    { key: '30D', label: '30D', days: 30 },
    { key: '1Y', label: '1Y', days: 365 }
  ]

  // Fetch chart data
  const fetchChartData = useCallback(async () => {
    if (!coinId) return
    
    setLoading(true)
    setError(null)
    
    try {
      const currentPeriod = periods.find(p => p.key === period)
      const response = await fetch(`/api/chart?coin=${coinId}&days=${currentPeriod.days}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch chart data')
      }
      
      const chartData = await response.json()
      setData(chartData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [coinId, period])

  // Fetch data when period or coinId changes
  useEffect(() => {
    fetchChartData()
  }, [fetchChartData])

  // Format price
  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    } else if (price >= 0.01) {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}`
    } else {
      return `$${price.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 8 })}`
    }
  }

  // Format date/time
  const formatDate = (timestamp, periodKey) => {
    const date = new Date(timestamp)
    
    switch (periodKey) {
      case '1H':
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      case '1D':
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      case '7D':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      case '30D':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      case '1Y':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      default:
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  // Draw chart
  const drawChart = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !data || !data.prices) return
    
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    
    // Set canvas size
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    
    const width = rect.width
    const height = rect.height
    const padding = { top: 40, right: 60, bottom: 60, left: 60 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height)
    
    // Calculate price range
    const prices = data.prices.map(p => p[1])
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice
    
    // Calculate volume range
    const volumes = data.volumes || []
    const maxVolume = volumes.length > 0 ? Math.max(...volumes.map(v => v[1])) : 0
    
    // Determine if price is up or down
    const firstPrice = prices[0]
    const lastPrice = prices[prices.length - 1]
    const isPositive = lastPrice >= firstPrice
    const lineColor = isPositive ? '#00d26a' : '#ed4c59'
    
    // Draw grid lines
    ctx.strokeStyle = '#2a2a2a'
    ctx.lineWidth = 1
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
      
      // Y-axis labels (price)
      const price = maxPrice - (priceRange / 5) * i
      ctx.fillStyle = '#808080'
      ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(formatPrice(price), padding.left - 10, y + 4)
    }
    
    // Vertical grid lines
    const xSteps = Math.min(6, prices.length)
    for (let i = 0; i < xSteps; i++) {
      const x = padding.left + (chartWidth / (xSteps - 1)) * i
      ctx.beginPath()
      ctx.moveTo(x, padding.top)
      ctx.lineTo(x, height - padding.bottom)
      ctx.stroke()
      
      // X-axis labels (date)
      const dataIndex = Math.floor((prices.length / (xSteps - 1)) * i)
      const timestamp = data.prices[dataIndex][0]
      ctx.fillStyle = '#808080'
      ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(formatDate(timestamp, period), x, height - padding.bottom + 20)
    }
    
    // Draw volume bars
    if (volumes.length > 0) {
      const volumeHeight = chartHeight * 0.2
      const volumeTop = height - padding.bottom - volumeHeight
      
      volumes.forEach((volume, index) => {
        const x = padding.left + (chartWidth / (volumes.length - 1)) * index
        const barWidth = chartWidth / volumes.length
        const barHeight = (volume[1] / maxVolume) * volumeHeight
        const y = volumeTop + volumeHeight - barHeight
        
        ctx.fillStyle = 'rgba(128, 128, 128, 0.3)'
        ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight)
      })
    }
    
    // Draw price line
    ctx.beginPath()
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2
    
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom)
    gradient.addColorStop(0, isPositive ? 'rgba(0, 210, 106, 0.3)' : 'rgba(237, 76, 89, 0.3)')
    gradient.addColorStop(1, 'rgba(0, 210, 106, 0)' || 'rgba(237, 76, 89, 0)')
    
    prices.forEach((price, index) => {
      const x = padding.left + (chartWidth / (prices.length - 1)) * index
      const y = padding.top + ((maxPrice - price) / priceRange) * chartHeight
      
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    
    ctx.stroke()
    
    // Fill area under line
    ctx.lineTo(width - padding.right, height - padding.bottom)
    ctx.lineTo(padding.left, height - padding.bottom)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()
    
    // Draw hover crosshair and tooltip
    if (hoveredPoint !== null) {
      const x = padding.left + (chartWidth / (prices.length - 1)) * hoveredPoint
      const price = prices[hoveredPoint]
      const y = padding.top + ((maxPrice - price) / priceRange) * chartHeight
      const timestamp = data.prices[hoveredPoint][0]
      
      // Crosshair lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.lineWidth = 1
      ctx.setLineDash([5, 5])
      
      // Vertical line
      ctx.beginPath()
      ctx.moveTo(x, padding.top)
      ctx.lineTo(x, height - padding.bottom)
      ctx.stroke()
      
      // Horizontal line
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
      
      ctx.setLineDash([])
      
      // Tooltip
      const tooltipText = `${formatPrice(price)}`
      const dateText = formatDate(timestamp, period)
      
      ctx.fillStyle = '#1a1a1a'
      ctx.strokeStyle = '#2a2a2a'
      ctx.lineWidth = 1
      
      // Tooltip background
      const tooltipPadding = 8
      const tooltipX = Math.min(x + 10, width - padding.right - 100)
      const tooltipY = y - 30
      
      ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif'
      const priceWidth = ctx.measureText(tooltipText).width
      const dateWidth = ctx.measureText(dateText).width
      const tooltipWidth = Math.max(priceWidth, dateWidth) + tooltipPadding * 2
      const tooltipHeight = 40
      
      ctx.fillRect(tooltipX, tooltipY - tooltipHeight, tooltipWidth, tooltipHeight)
      ctx.strokeRect(tooltipX, tooltipY - tooltipHeight, tooltipWidth, tooltipHeight)
      
      // Tooltip text
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'left'
      ctx.fillText(tooltipText, tooltipX + tooltipPadding, tooltipY - tooltipHeight + 16)
      ctx.fillStyle = '#808080'
      ctx.fillText(dateText, tooltipX + tooltipPadding, tooltipY - tooltipHeight + 32)
    }
  }, [data, period, hoveredPoint])

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      drawChart()
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [drawChart])

  // Redraw when data or hover changes
  useEffect(() => {
    drawChart()
  }, [drawChart])

  // Handle mouse move
  const handleMouseMove = useCallback((e) => {
    if (!canvasRef.current || !data || !data.prices) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const padding = { left: 60, right: 60 }
    const chartWidth = rect.width - padding.left - padding.right
    
    if (x >= padding.left && x <= rect.width - padding.right) {
      const dataIndex = Math.round(((x - padding.left) / chartWidth) * (data.prices.length - 1))
      setHoveredPoint(Math.max(0, Math.min(dataIndex, data.prices.length - 1)))
    } else {
      setHoveredPoint(null)
    }
  }, [data])

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setHoveredPoint(null)
  }, [])

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-800 rounded-lg animate-pulse">
        <div className="flex gap-2 p-4 border-b border-gray-700">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-12 h-8 bg-gray-700 rounded"></div>
          ))}
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="text-gray-400">Loading chart...</div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">Error loading chart</div>
          <div className="text-gray-400 text-sm">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-gray-800 rounded-lg" ref={containerRef}>
      {/* Period tabs */}
      <div className="flex gap-2 p-4 border-b border-gray-700">
        {periods.map(p => (
          <button
            key={p.key}
            onClick={() => setPeriod(p.key)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              period === p.key
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      
      {/* Chart container */}
      <div className="relative h-80">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        
        {/* Current price indicator */}
        {currentPrice && (
          <div className="absolute top-4 right-4 text-right">
            <div className="text-white font-semibold">{formatPrice(currentPrice)}</div>
            <div className="text-gray-400 text-xs">{coinName}</div>
          </div>
        )}
      </div>
    </div>
  )
}
