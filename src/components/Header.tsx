import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-red-500 hover:text-red-400 transition-colors">
              Hustler Hunter
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/report" className="text-gray-300 hover:text-white transition-colors">
                Report a Guru
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Exposing questionable gurus
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}