'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)
  const debounceRef = useRef(null)
  const router = useRouter()

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cryptoasia-recent-searches')
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse recent searches:', e)
      }
    }
  }, [])

  // Save recent searches to localStorage
  const saveRecentSearch = useCallback((coin) => {
    const newRecent = [coin, ...recentSearches.filter(s => s.id !== coin.id)].slice(0, 5)
    setRecentSearches(newRecent)
    localStorage.setItem('cryptoasia-recent-searches', JSON.stringify(newRecent))
  }, [recentSearches])

  // Debounced search function
  const searchCoins = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      if (response.ok) {
        const data = await response.json()
        setResults(data.coins || [])
      }
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Debounce search query
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    
    if (query.trim()) {
      debounceRef.current = setTimeout(() => {
        searchCoins(query)
      }, 300)
    } else {
      setResults([])
      setLoading(false)
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query, searchCoins])

  // Keyboard shortcut (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !inputRef.current.contains(e.target)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true)
      return
    }

    const items = recentSearches.length > 0 && !query.trim() ? recentSearches : results
    const itemCount = items.length

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % itemCount)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + itemCount) % itemCount)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          const selectedItem = items[selectedIndex]
          handleCoinSelect(selectedItem)
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  // Handle coin selection
  const handleCoinSelect = (coin) => {
    saveRecentSearch(coin)
    router.push(`/coins/${coin.id}`)
    setIsOpen(false)
    setQuery('')
    setSelectedIndex(-1)
    inputRef.current?.blur()
  }

  // Handle input focus
  const handleInputFocus = () => {
    setIsOpen(true)
    setSelectedIndex(-1)
  }

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value)
    setSelectedIndex(-1)
  }

  // Format market cap
  const formatMarketCap = (marketCap) => {
    if (!marketCap) return 'N/A'
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
    return `$${marketCap.toLocaleString()}`
  }

  // Get display items
  const getDisplayItems = () => {
    if (!query.trim() && recentSearches.length > 0) {
      return recentSearches
    }
    return results
  }

  const displayItems = getDisplayItems()

  return (
    <div className="nav-search" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search coins..."
          style={{
            width: '100%',
            height: '36px',
            fontSize: '13px',
            padding: '0 12px 0 36px',
            borderRadius: '8px',
            backgroundColor: '#21262d',
            border: '1px solid #30363d',
            color: '#e6edf3',
            outline: 'none'
          }}
        />
        
        {/* Search icon */}
        <div className="absolute right-3 top-2.5 text-gray-400">
          {loading ? (
            <div className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>

        {/* Keyboard shortcut hint */}
        <div className="absolute right-12 top-2.5 text-gray-500 text-xs hidden md:block">
          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">Ctrl</kbd>
          <span className="mx-1">+</span>
          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">K</kbd>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {displayItems.length === 0 ? (
            <div className="p-4 text-gray-400 text-center">
              {query.trim() ? 'No results found' : 'Type to search coins'}
            </div>
          ) : (
            <>
              {/* Recent searches header */}
              {!query.trim() && recentSearches.length > 0 && (
                <div className="px-4 py-2 text-gray-400 text-xs font-semibold border-b border-gray-700">
                  RECENT SEARCHES
                </div>
              )}

              {/* Search results header */}
              {query.trim() && (
                <div className="px-4 py-2 text-gray-400 text-xs font-semibold border-b border-gray-700">
                  SEARCH RESULTS
                </div>
              )}

              {/* Results list */}
              {displayItems.map((coin, index) => (
                <div
                  key={coin.id}
                  onClick={() => handleCoinSelect(coin)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                    index === selectedIndex ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`}
                >
                  {/* Coin image */}
                  <img
                    src={coin.thumb || `https://assets.coingecko.com/coins/images/${coin.id}/thumb/${coin.name.toLowerCase().replace(/\s+/g, '-')}.png`}
                    alt={coin.name}
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      e.target.src = '/placeholder-coin.png'
                    }}
                  />

                  {/* Coin info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{coin.name}</span>
                      <span className="text-gray-400 text-sm uppercase">{coin.symbol}</span>
                    </div>
                    <div className="text-gray-400 text-xs">
                      Rank #{coin.market_cap_rank || 'N/A'}
                    </div>
                  </div>

                  {/* Market cap */}
                  {coin.market_cap && (
                    <div className="text-gray-400 text-sm text-right">
                      {formatMarketCap(coin.market_cap)}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
