export interface Guru {
  id: string;
  name: string;
  niche: string;
  rating: number; // 1-5 scale
  bio: string;
  imageUrl?: string;
  evidence: Evidence[];
  reports: Report[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Evidence {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'failure' | 'questionable';
  url?: string;
  createdAt: Date;
}

export interface Report {
  id: string;
  guruId: string;
  title: string;
  description: string;
  category: 'scam' | 'misleading' | 'false_claims' | 'other';
  evidence?: string;
  reporterName?: string;
  createdAt: Date;
}

export interface SearchFilters {
  query: string;
  niche?: string;
  minRating?: number;
  maxRating?: number;
}

export interface AppSettings {
  useMockData: boolean;
}