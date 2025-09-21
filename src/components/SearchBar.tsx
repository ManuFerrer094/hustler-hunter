'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, niche?: string) => void;
  placeholder?: string;
}

const NICHES = [
  'All Niches',
  'Forex Trading',
  'Cryptocurrency',
  'Stock Trading',
  'Real Estate',
  'Drop Shipping',
  'Digital Marketing',
  'Course Creation',
  'Other'
];

export default function SearchBar({ onSearch, placeholder = "Search gurus..." }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('All Niches');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const niche = selectedNiche === 'All Niches' ? undefined : selectedNiche;
    onSearch(query, niche);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // Trigger search on every keystroke for real-time results
    const niche = selectedNiche === 'All Niches' ? undefined : selectedNiche;
    onSearch(newQuery, niche);
  };

  const handleNicheChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newNiche = e.target.value;
    setSelectedNiche(newNiche);
    
    const niche = newNiche === 'All Niches' ? undefined : newNiche;
    onSearch(query, niche);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="relative">
          <select
            value={selectedNiche}
            onChange={handleNicheChange}
            className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none cursor-pointer min-w-[150px]"
          >
            {NICHES.map((niche) => (
              <option key={niche} value={niche} className="bg-gray-900">
                {niche}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        <button
          type="submit"
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors font-medium"
        >
          Search
        </button>
      </div>
    </form>
  );
}