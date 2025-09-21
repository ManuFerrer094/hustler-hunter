'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Guru, Report } from '@/types';
import { StorageService } from '@/lib/storage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function ReportFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedGuruId = searchParams?.get('guruId');
  
  const [gurus, setGurus] = useState<Guru[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    guruId: preselectedGuruId || '',
    title: '',
    description: '',
    category: 'scam' as Report['category'],
    evidence: '',
    reporterName: '',
  });

  useEffect(() => {
    loadGurus();
  }, []);

  useEffect(() => {
    if (preselectedGuruId) {
      setFormData(prev => ({ ...prev, guruId: preselectedGuruId }));
    }
  }, [preselectedGuruId]);

  const loadGurus = () => {
    try {
      const guruData = StorageService.getGurus();
      setGurus(guruData);
    } catch (error) {
      console.error('Error loading gurus:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.guruId || !formData.title || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newReport: Report = {
        id: Date.now().toString(),
        guruId: formData.guruId,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        evidence: formData.evidence || undefined,
        reporterName: formData.reporterName || undefined,
        createdAt: new Date(),
      };

      StorageService.addReport(newReport);
      
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        guruId: '',
        title: '',
        description: '',
        category: 'scam',
        evidence: '',
        reporterName: '',
      });
      
      // Redirect after a delay
      setTimeout(() => {
        router.push(`/gurus/${formData.guruId}`);
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('There was an error submitting your report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Report Submitted Successfully!</h1>
            <p className="text-gray-400 mb-8">Thank you for contributing to the community. Your report will help others make informed decisions.</p>
            <p className="text-sm text-gray-500">Redirecting to guru profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">Report a Guru</h1>
              <p className="text-gray-300">
                Help the community by reporting problematic behavior, false claims, or scams. 
                All reports are anonymous and help others make informed decisions.
              </p>
            </div>

            {gurus.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">No gurus available to report.</p>
                <p className="text-sm text-gray-500 mb-6">
                  Make sure you have enabled mock data or added some gurus to the system.
                </p>
                <Link
                  href="/"
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Guru Selection */}
                <div>
                  <label htmlFor="guruId" className="block text-sm font-medium text-gray-300 mb-2">
                    Select Guru <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="guruId"
                    name="guruId"
                    value={formData.guruId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Choose a guru...</option>
                    {gurus.map((guru) => (
                      <option key={guru.id} value={guru.id}>
                        {guru.name} ({guru.niche})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Report Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Report Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief summary of the issue"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="scam">Scam</option>
                    <option value="misleading">Misleading Claims</option>
                    <option value="false_claims">False Claims</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Detailed Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Provide detailed information about the issue, including what happened, when it occurred, and any relevant context..."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Evidence */}
                <div>
                  <label htmlFor="evidence" className="block text-sm font-medium text-gray-300 mb-2">
                    Supporting Evidence <span className="text-gray-500">(Optional)</span>
                  </label>
                  <textarea
                    id="evidence"
                    name="evidence"
                    value={formData.evidence}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Screenshots, links, documentation, or other evidence that supports your report..."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Reporter Name */}
                <div>
                  <label htmlFor="reporterName" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name <span className="text-gray-500">(Optional - for credibility)</span>
                  </label>
                  <input
                    type="text"
                    id="reporterName"
                    name="reporterName"
                    value={formData.reporterName}
                    onChange={handleInputChange}
                    placeholder="Leave blank to report anonymously"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-6">
                  <Link
                    href="/"
                    className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </Link>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </form>
            )}

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Important Notes:</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• All reports should be factual and based on evidence</li>
                <li>• False or malicious reports may be removed</li>
                <li>• Reports help the community make informed decisions</li>
                <li>• Consider including screenshots or links as evidence</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ReportForm() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mb-4"></div>
            <p className="text-gray-400">Loading form...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <ReportFormContent />
    </Suspense>
  );
}