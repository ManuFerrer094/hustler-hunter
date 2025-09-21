import { Guru, Report, Evidence, AppSettings } from '@/types';
import { mockGurus, mockAllReports } from '@/data/mockData';

const STORAGE_KEYS = {
  GURUS: 'hustler-hunter-gurus',
  REPORTS: 'hustler-hunter-reports',
  SETTINGS: 'hustler-hunter-settings',
} as const;

// Storage utility functions
export class StorageService {
  // Settings management
  static getSettings(): AppSettings {
    if (typeof window === 'undefined') {
      return { useMockData: false };
    }
    
    try {
      const stored = sessionStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error reading settings from storage:', error);
    }
    
    // Default settings
    const defaultSettings: AppSettings = { useMockData: false };
    this.saveSettings(defaultSettings);
    return defaultSettings;
  }

  static saveSettings(settings: AppSettings): void {
    if (typeof window === 'undefined') return;
    
    try {
      sessionStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings to storage:', error);
    }
  }

  // Gurus management
  static getGurus(): Guru[] {
    const settings = this.getSettings();
    
    if (settings.useMockData) {
      return mockGurus;
    }
    
    if (typeof window === 'undefined') {
      return [];
    }
    
    try {
      const stored = sessionStorage.getItem(STORAGE_KEYS.GURUS);
      if (stored) {
        const gurus = JSON.parse(stored);
        // Convert date strings back to Date objects
        return gurus.map((guru: Guru & { createdAt: string; updatedAt: string; evidence: Array<Evidence & { createdAt: string }>; reports: Array<Report & { createdAt: string }> }) => ({
          ...guru,
          createdAt: new Date(guru.createdAt),
          updatedAt: new Date(guru.updatedAt),
          evidence: guru.evidence.map((ev) => ({
            ...ev,
            createdAt: new Date(ev.createdAt),
          })),
          reports: guru.reports.map((rep) => ({
            ...rep,
            createdAt: new Date(rep.createdAt),
          })),
        }));
      }
    } catch (error) {
      console.error('Error reading gurus from storage:', error);
    }
    
    return [];
  }

  static saveGurus(gurus: Guru[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      sessionStorage.setItem(STORAGE_KEYS.GURUS, JSON.stringify(gurus));
    } catch (error) {
      console.error('Error saving gurus to storage:', error);
    }
  }

  static getGuruById(id: string): Guru | undefined {
    const gurus = this.getGurus();
    return gurus.find(guru => guru.id === id);
  }

  // Reports management
  static getReports(): Report[] {
    const settings = this.getSettings();
    
    if (settings.useMockData) {
      return mockAllReports;
    }
    
    if (typeof window === 'undefined') {
      return [];
    }
    
    try {
      const stored = sessionStorage.getItem(STORAGE_KEYS.REPORTS);
      if (stored) {
        const reports = JSON.parse(stored);
        return reports.map((report: Report & { createdAt: string }) => ({
          ...report,
          createdAt: new Date(report.createdAt),
        }));
      }
    } catch (error) {
      console.error('Error reading reports from storage:', error);
    }
    
    return [];
  }

  static saveReports(reports: Report[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      sessionStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    } catch (error) {
      console.error('Error saving reports to storage:', error);
    }
  }

  static addReport(report: Report): void {
    const reports = this.getReports();
    reports.push(report);
    this.saveReports(reports);
    
    // Also add the report to the guru's reports array
    const gurus = this.getGurus();
    const guruIndex = gurus.findIndex(g => g.id === report.guruId);
    if (guruIndex !== -1) {
      gurus[guruIndex].reports.push(report);
      gurus[guruIndex].updatedAt = new Date();
      this.saveGurus(gurus);
    }
  }

  // Search and filter
  static searchGurus(query: string, niche?: string): Guru[] {
    const gurus = this.getGurus();
    
    return gurus.filter(guru => {
      const matchesQuery = !query || 
        guru.name.toLowerCase().includes(query.toLowerCase()) ||
        guru.bio.toLowerCase().includes(query.toLowerCase());
        
      const matchesNiche = !niche || guru.niche === niche;
      
      return matchesQuery && matchesNiche;
    });
  }

  // Clear all data
  static clearAll(): void {
    if (typeof window === 'undefined') return;
    
    try {
      sessionStorage.removeItem(STORAGE_KEYS.GURUS);
      sessionStorage.removeItem(STORAGE_KEYS.REPORTS);
      sessionStorage.removeItem(STORAGE_KEYS.SETTINGS);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}