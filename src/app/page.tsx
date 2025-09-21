'use client';

import { useState, useEffect } from 'react';
import { Guru } from '@/types';
import { StorageService } from '@/lib/storage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import GuruCard from '@/components/GuruCard';

export default function Home() {
  const [gurus, setGurus] = useState<Guru[]>([]);
  const [filteredGurus, setFilteredGurus] = useState<Guru[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    // Initialize with mock data enabled by default
    const defaultSettings = { useMockData: false };
    StorageService.saveSettings(defaultSettings);
    setUseMockData(false);
    
    loadGurus();
  }, []);

  const loadGurus = () => {
    setIsLoading(true);
    try {
      const guruData = StorageService.getGurus();
      setGurus(guruData);
      setFilteredGurus(guruData);
    } catch (error) {
      console.error('Error loading gurus:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMockData = () => {
    const newUseMockData = !useMockData;
    setUseMockData(newUseMockData);
    StorageService.saveSettings({ useMockData: newUseMockData });
    loadGurus();
  };

  const handleSearch = (query: string, niche?: string) => {
    const results = StorageService.searchGurus(query, niche);
    setFilteredGurus(results);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 to-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Expose the <span className="text-red-500">Hustlers</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A community-driven platform to track and expose questionable gurus, 
              their claims, and user experiences. Help others make informed decisions.
            </p>
            
            {/* Data Source Toggle */}
            <div className="mb-8">
              <label className="inline-flex items-center space-x-3 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={useMockData}
                  onChange={toggleMockData}
                  className="rounded border-gray-600 text-red-500 focus:ring-red-500 focus:ring-offset-gray-900"
                />
                <span>Use mock data (for demo purposes)</span>
              </label>
            </div>
            
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">
                {filteredGurus.length === gurus.length ? 'All Gurus' : 'Search Results'}
              </h2>
              <span className="text-gray-400">
                {filteredGurus.length} gurus found
              </span>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                <p className="text-gray-400 mt-4">Loading gurus...</p>
              </div>
            ) : filteredGurus.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">
                  {gurus.length === 0 
                    ? 'No gurus found. Enable mock data to see sample gurus or add some real data.'
                    : 'No gurus match your search criteria.'
                  }
                </p>
                {gurus.length === 0 && !useMockData && (
                  <button
                    onClick={() => toggleMockData()}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Enable Mock Data
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGurus.map((guru) => (
                  <GuruCard key={guru.id} guru={guru} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        {gurus.length > 0 && (
          <section className="bg-gray-900 py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-500 mb-2">
                    {gurus.length}
                  </div>
                  <div className="text-gray-300">Tracked Gurus</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-500 mb-2">
                    {gurus.reduce((total, guru) => total + guru.reports.length, 0)}
                  </div>
                  <div className="text-gray-300">User Reports</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-500 mb-2">
                    {gurus.reduce((total, guru) => total + guru.evidence.length, 0)}
                  </div>
                  <div className="text-gray-300">Evidence Entries</div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
