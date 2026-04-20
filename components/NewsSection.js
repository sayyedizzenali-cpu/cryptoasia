'use client'

import { useState, useEffect } from 'react'

export default function NewsSection({ coinSymbol }) {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      if (!coinSymbol) return
      
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/api/news?coin=${coinSymbol}`)
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        
        const data = await response.json()
        setNews(data.news || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [coinSymbol])

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const newsTime = new Date(timestamp * 1000)
    const diffInMinutes = Math.floor((now - newsTime) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'bullish':
        return 'bg-green-500'
      case 'bearish':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const displayNews = expanded ? news : news.slice(0, 3)

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Latest News</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Latest News</h3>
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">Error loading news</div>
          <div className="text-gray-400 text-sm">{error}</div>
        </div>
      </div>
    )
  }

  if (news.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Latest News</h3>
        <div className="text-center py-8">
          <div className="text-gray-400">No news available</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Latest News</h3>
      
      <div className="space-y-4">
        {displayNews.map((article, index) => (
          <div key={index} className="border-b border-gray-700 last:border-b-0 pb-4 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium mb-1 line-clamp-2">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    {article.title}
                  </a>
                </h4>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <span>{article.source?.domain || 'Unknown'}</span>
                  <span>·</span>
                  <span>{formatTimeAgo(article.published_at)}</span>
                </div>
              </div>
              
              {article.sentiment && (
                <div className="flex-shrink-0">
                  <span className={`inline-block px-2 py-1 text-xs font-medium text-white rounded ${getSentimentColor(article.sentiment)}`}>
                    {article.sentiment.charAt(0).toUpperCase() + article.sentiment.slice(1)}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {news.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full py-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
        >
          {expanded ? 'Show Less' : `Show More (${news.length - 3} more)`}
        </button>
      )}
    </div>
  )
}
