'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Guru, Evidence, Report } from '@/types';
import { StorageService } from '@/lib/storage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const getRatingColor = (rating: number) => {
  if (rating >= 4) return 'text-green-400';
  if (rating >= 3) return 'text-yellow-400';
  if (rating >= 2) return 'text-orange-400';
  return 'text-red-400';
};

const getRatingStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push('★');
  }
  
  if (hasHalfStar) {
    stars.push('☆');
  }
  
  while (stars.length < 5) {
    stars.push('☆');
  }
  
  return stars.join('');
};

const getEvidenceTypeColor = (type: Evidence['type']) => {
  switch (type) {
    case 'success': return 'bg-green-900 text-green-300 border-green-700';
    case 'failure': return 'bg-red-900 text-red-300 border-red-700';
    case 'questionable': return 'bg-yellow-900 text-yellow-300 border-yellow-700';
    default: return 'bg-gray-900 text-gray-300 border-gray-700';
  }
};

const getCategoryColor = (category: Report['category']) => {
  switch (category) {
    case 'scam': return 'bg-red-900 text-red-300';
    case 'misleading': return 'bg-orange-900 text-orange-300';
    case 'false_claims': return 'bg-yellow-900 text-yellow-300';
    case 'other': return 'bg-gray-900 text-gray-300';
    default: return 'bg-gray-900 text-gray-300';
  }
};

export default function GuruProfile() {
  const params = useParams();
  const id = params?.id as string;
  const [guru, setGuru] = useState<Guru | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'evidence' | 'reports'>('evidence');

  useEffect(() => {
    if (id) {
      loadGuru(id);
    }
  }, [id]);

  const loadGuru = (guruId: string) => {
    setIsLoading(true);
    try {
      const guruData = StorageService.getGuruById(guruId);
      setGuru(guruData || null);
    } catch (error) {
      console.error('Error loading guru:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mb-4"></div>
            <p className="text-gray-400">Loading guru profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!guru) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Guru Not Found</h1>
            <p className="text-gray-400 mb-8">The guru you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      
      <main className="flex-1">
        {/* Guru Header */}
        <section className="bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-300">
                    {guru.name.charAt(0)}
                  </span>
                </div>
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {guru.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300">
                    {guru.niche}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg font-medium ${getRatingColor(guru.rating)}`}>
                      {getRatingStars(guru.rating)}
                    </span>
                    <span className="text-lg text-gray-400">
                      ({guru.rating.toFixed(1)})
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg mb-6">
                  {guru.bio}
                </p>
                
                <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                  <span>{guru.evidence.length} evidence entries</span>
                  <span>{guru.reports.length} user reports</span>
                  <span>Added {guru.createdAt.toLocaleDateString()}</span>
                  <span>Updated {guru.updatedAt.toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <Link
                  href={`/report?guruId=${guru.id}`}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Report This Guru
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('evidence')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'evidence'
                    ? 'border-red-500 text-red-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Evidence ({guru.evidence.length})
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reports'
                    ? 'border-red-500 text-red-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                Reports ({guru.reports.length})
              </button>
            </nav>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'evidence' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Evidence</h2>
                {guru.evidence.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No evidence entries found.</p>
                ) : (
                  <div className="grid gap-6">
                    {guru.evidence.map((evidence) => (
                      <div key={evidence.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">{evidence.title}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEvidenceTypeColor(evidence.type)}`}>
                            {evidence.type}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-4">{evidence.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{evidence.createdAt.toLocaleDateString()}</span>
                          {evidence.url && (
                            <a
                              href={evidence.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              View Source →
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">User Reports</h2>
                {guru.reports.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No user reports found.</p>
                ) : (
                  <div className="grid gap-6">
                    {guru.reports.map((report) => (
                      <div key={report.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">{report.title}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(report.category)}`}>
                            {report.category.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-4">{report.description}</p>
                        {report.evidence && (
                          <div className="bg-gray-800 rounded-lg p-4 mb-4">
                            <h4 className="text-sm font-medium text-gray-300 mb-2">Evidence:</h4>
                            <p className="text-sm text-gray-400">{report.evidence}</p>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>Reported by {report.reporterName || 'Anonymous'}</span>
                          <span>{report.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}