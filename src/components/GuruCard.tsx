import { Guru } from '@/types';
import Link from 'next/link';

interface GuruCardProps {
  guru: Guru;
}

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

export default function GuruCard({ guru }: GuruCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
      <Link href={`/gurus/${guru.id}`}>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-300">
                {guru.name.charAt(0)}
              </span>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white mb-1 hover:text-red-400 transition-colors">
              {guru.name}
            </h3>
            
            <div className="flex items-center space-x-4 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300">
                {guru.niche}
              </span>
              
              <div className="flex items-center space-x-1">
                <span className={`text-sm font-medium ${getRatingColor(guru.rating)}`}>
                  {getRatingStars(guru.rating)}
                </span>
                <span className="text-sm text-gray-400">
                  ({guru.rating.toFixed(1)})
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-300 line-clamp-2 mb-3">
              {guru.bio}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>
                {guru.evidence.length} evidence entries
              </span>
              <span>
                {guru.reports.length} reports
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}