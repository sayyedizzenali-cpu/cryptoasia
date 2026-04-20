'use client'

import { useState, useEffect } from 'react'
import { CURRENCIES } from '@/lib/coingecko'

export default function PriceCalculator({ coinId, coinSymbol, coinName }) {
  const [amount, setAmount] = useState('1')
  const [currency, setCurrency] = useState('usd')
  const [conversionType, setConversionType] = useState('crypto-to-fiat')
  const [currentPrice, setCurrentPrice] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch current price
  useEffect(() => {
    const fetchPrice = async () => {
      if (!coinId) return
      
      setLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/api/prices?ids=${coinId}&vs_currencies=${currency}`)
        if (!response.ok) {
          throw new Error('Failed to fetch price')
        }
        
        const data = await response.json()
        const price = data[coinId]?.[currency]
        
        if (price !== undefined) {
          setCurrentPrice(price)
        } else {
          throw new Error('Price not available')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPrice()
  }, [coinId, currency])

  // Calculate conversion
  const calculateConversion = () => {
    if (!currentPrice || !amount) return '0'
    
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount)) return '0'
    
    if (conversionType === 'crypto-to-fiat') {
      return (numAmount * currentPrice).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: currency === 'jpy' || currency === 'krw' ? 0 : 2
      })
    } else {
      return (numAmount / currentPrice).toLocaleString(undefined, {
        minimumFractionDigits: 8,
        maximumFractionDigits: 8
      })
    }
  }

  // Get currency symbol
  const getCurrencySymbol = (currencyCode) => {
    const symbols = {
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
      nep: 'Rs',
      lak: 'K'
    }
    return symbols[currencyCode.toLowerCase()] || currencyCode.toUpperCase()
  }

  // Common amounts for conversion table
  const commonAmounts = [0.1, 0.5, 1, 5, 10, 50, 100]

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Price Calculator</h3>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-700 rounded"></div>
          <div className="h-20 bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Price Calculator</h3>
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">Error loading price</div>
          <div className="text-gray-400 text-sm">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Price Calculator</h3>
      
      {/* Conversion Type Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setConversionType('crypto-to-fiat')}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            conversionType === 'crypto-to-fiat'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {coinSymbol} to {currency.toUpperCase()}
        </button>
        <button
          onClick={() => setConversionType('fiat-to-crypto')}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            conversionType === 'fiat-to-crypto'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {currency.toUpperCase()} to {coinSymbol}
        </button>
      </div>

      {/* Input Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {conversionType === 'crypto-to-fiat' ? coinSymbol : currency.toUpperCase()} Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="Enter amount"
            min="0"
            step="any"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            {CURRENCIES.map(curr => (
              <option key={curr} value={curr}>
                {curr.toUpperCase()} - {getCurrencySymbol(curr)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Conversion Result */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-2">
            {conversionType === 'crypto-to-fiat' ? (
              <>{getCurrencySymbol(currency)}{calculateConversion()}</>
            ) : (
              <>{calculateConversion()} {coinSymbol.toUpperCase()}</>
            )}
          </div>
          <div className="text-sm text-gray-400">
            1 {coinSymbol.toUpperCase()} = {getCurrencySymbol(currency)}{currentPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: currency === 'jpy' || currency === 'krw' ? 0 : 2
            })}
          </div>
        </div>
      </div>

      {/* Conversion Table */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Quick Conversion</h4>
        <div className="space-y-2">
          {commonAmounts.map(commonAmount => {
            const convertedValue = conversionType === 'crypto-to-fiat' 
              ? (commonAmount * currentPrice).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: currency === 'jpy' || currency === 'krw' ? 0 : 2
                })
              : (commonAmount / currentPrice).toLocaleString(undefined, {
                  minimumFractionDigits: 8,
                  maximumFractionDigits: 8
                })
            
            return (
              <div key={commonAmount} className="flex justify-between items-center py-2 px-3 bg-gray-700 rounded">
                <span className="text-gray-300">
                  {conversionType === 'crypto-to-fiat' ? (
                    <>{commonAmount} {coinSymbol.toUpperCase()}</>
                  ) : (
                    <>{getCurrencySymbol(currency)}{commonAmount.toLocaleString()}</>
                  )}
                </span>
                <span className="text-white font-medium">
                  {conversionType === 'crypto-to-fiat' ? (
                    <>{getCurrencySymbol(currency)}{convertedValue}</>
                  ) : (
                    <>{convertedValue} {coinSymbol.toUpperCase()}</>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
