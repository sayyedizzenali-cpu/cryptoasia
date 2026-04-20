'use client'

import { useState, useMemo } from 'react'
import { GLOSSARY_TERMS, getAllCategories, getTermsByCategory } from '@/lib/glossary'
import Link from 'next/link'

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Get all categories
  const categories = useMemo(() => ['All', ...getAllCategories()], [])

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    let terms = GLOSSARY_TERMS

    // Filter by category
    if (selectedCategory !== 'All') {
      terms = getTermsByCategory(selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      terms = terms.filter(term => 
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return terms
  }, [searchTerm, selectedCategory])

  // Group terms by category for display
  const termsByCategory = useMemo(() => {
    const grouped = {}
    
    if (selectedCategory === 'All') {
      // Group all terms by category
      getAllCategories().forEach(category => {
        grouped[category] = getTermsByCategory(category).filter(term => 
          searchTerm === '' || 
          term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
          term.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    } else {
      // Show only selected category
      grouped[selectedCategory] = filteredTerms
    }

    return grouped
  }, [filteredTerms, selectedCategory, searchTerm])

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-600'
      case 'Intermediate':
        return 'bg-yellow-600'
      case 'Advanced':
        return 'bg-red-600'
      default:
        return 'bg-gray-600'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-8">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Cryptocurrency Glossary
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Complete guide to cryptocurrency terminology and concepts for Asian markets
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search terms, definitions, or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-300">
            Showing {filteredTerms.length} of {GLOSSARY_TERMS.length} terms
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Terms Display */}
        {Object.entries(termsByCategory).map(([category, terms]) => (
          terms.length > 0 && (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-6">
                {category} ({terms.length})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {terms.map((term) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="block bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-medium text-white">
                        {term.term}
                      </h3>
                      <span className={`px-2 py-1 text-xs text-white rounded-full ${getDifficultyColor(term.difficulty)}`}>
                        {term.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {term.definition}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">
                        {term.category}
                      </span>
                      <span className="text-blue-400 text-sm hover:text-blue-300">
                        Learn more
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        ))}

        {/* No Results */}
        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-4">
              No terms found
            </h3>
            <p className="text-gray-300 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Popular Terms */}
        {searchTerm === '' && selectedCategory === 'All' && (
          <div className="mt-12 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Popular Terms
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {GLOSSARY_TERMS.filter(term => 
                ['blockchain', 'bitcoin', 'ethereum', 'defi', 'nft', 'mining', 'staking', 'wallet'].includes(term.slug)
              ).map((term) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  className="block p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-center"
                >
                  <div className="text-white font-medium text-sm">
                    {term.term}
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    {term.category}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Learning Path */}
        {searchTerm === '' && selectedCategory === 'All' && (
          <div className="mt-12 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Learning Path
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">Beginner</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Start with fundamental concepts to understand cryptocurrency basics.
                </p>
                <Link
                  href="/glossary?category=Technology&difficulty=Beginner"
                  className="text-blue-400 text-sm hover:text-blue-300"
                >
                  Start Learning
                </Link>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">Intermediate</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Explore advanced topics like DeFi, trading strategies, and technical analysis.
                </p>
                <Link
                  href="/glossary?category=DeFi&difficulty=Intermediate"
                  className="text-blue-400 text-sm hover:text-blue-300"
                >
                  Continue Learning
                </Link>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">Advanced</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Master complex concepts including Layer 2, interoperability, and advanced protocols.
                </p>
                <Link
                  href="/glossary?category=Technology&difficulty=Advanced"
                  className="text-blue-400 text-sm hover:text-blue-300"
                >
                  Advanced Topics
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
