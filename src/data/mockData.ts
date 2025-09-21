import { Guru, Evidence, Report } from '@/types';

// Mock evidence data
const mockEvidence: Evidence[] = [
  {
    id: 'ev1',
    title: 'Course Success Story',
    description: 'Student claims to have made $10k in first month',
    type: 'success',
    url: 'https://example.com/success-story',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'ev2',
    title: 'Contradictory Advice',
    description: 'Gave completely opposite advice in two different videos',
    type: 'questionable',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 'ev3',
    title: 'Failed Prediction',
    description: 'Predicted market crash that never happened',
    type: 'failure',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'ev4',
    title: 'Verified Results',
    description: 'Independently verified trading results',
    type: 'success',
    url: 'https://example.com/verified-results',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'ev5',
    title: 'Exaggerated Claims',
    description: 'Claims to turn $1000 into $1M in 30 days',
    type: 'questionable',
    createdAt: new Date('2024-02-15'),
  },
];

// Mock reports data
const mockReports: Report[] = [
  {
    id: 'r1',
    guruId: 'guru1',
    title: 'Course Doesn&apos;t Deliver',
    description: 'Paid $2000 for course but content was basic YouTube material',
    category: 'scam',
    evidence: 'Screenshots of course content vs free YouTube videos',
    reporterName: 'Anonymous',
    createdAt: new Date('2024-03-01'),
  },
  {
    id: 'r2',
    guruId: 'guru2',
    title: 'Fake Trading Results',
    description: 'Screenshots appear to be edited and don&apos;t match real broker statements',
    category: 'false_claims',
    evidence: 'Metadata analysis of screenshots',
    reporterName: 'TradingExpert2024',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'r3',
    guruId: 'guru3',
    title: 'Misleading Marketing',
    description: 'Advertises "guaranteed results" which is impossible in trading',
    category: 'misleading',
    evidence: 'Screenshots of ads and marketing material',
    reporterName: 'RegulatedTrader',
    createdAt: new Date('2024-03-05'),
  },
];

// Mock gurus data
export const mockGurus: Guru[] = [
  {
    id: 'guru1',
    name: 'Alex Trading Pro',
    niche: 'Forex Trading',
    rating: 2.5,
    bio: 'Self-proclaimed forex expert with "10 years of experience". Sells expensive courses and trading signals.',
    imageUrl: '/api/placeholder/150/150',
    evidence: [mockEvidence[0], mockEvidence[1]],
    reports: [mockReports[0]],
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-03-15'),
  },
  {
    id: 'guru2',
    name: 'Sarah Crypto Queen',
    niche: 'Cryptocurrency',
    rating: 1.5,
    bio: 'Claims to be a "crypto millionaire" who can teach you to make millions in crypto. Known for flashy lifestyle posts.',
    imageUrl: '/api/placeholder/150/150',
    evidence: [mockEvidence[2], mockEvidence[4]],
    reports: [mockReports[1]],
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2024-03-10'),
  },
  {
    id: 'guru3',
    name: 'Michael Stock Genius',
    niche: 'Stock Trading',
    rating: 3.0,
    bio: 'Former finance professional turned educator. Has some legitimate experience but makes exaggerated claims about returns.',
    imageUrl: '/api/placeholder/150/150',
    evidence: [mockEvidence[3]],
    reports: [mockReports[2]],
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2024-03-12'),
  },
];

export const mockAllReports: Report[] = mockReports;