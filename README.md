# Hustler Hunter 🕵️‍♂️

A Next.js community-driven platform to track and expose questionable gurus, their claims, and user experiences. Help others make informed decisions by sharing evidence and reports about online personalities in the trading, crypto, and business coaching space.

## 🚀 Features

- **Homepage with Search**: Search and filter gurus by name, niche, and rating
- **Guru Profiles**: Detailed profiles showing ratings, evidence, and community reports
- **Report System**: Submit reports about questionable behavior or false claims
- **Dark Theme**: Modern dark UI with black, red, and gray color scheme
- **Mock Data Support**: Toggle between mock data and real data via sessionStorage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local State Management**: All data managed via sessionStorage for demo purposes

## 🎯 Key Pages

### Homepage (`/`)
- Hero section with search functionality
- Guru cards displaying key information
- Filter by niche and search by name/description
- Statistics showing tracked gurus, reports, and evidence entries
- Toggle for mock data vs real data

### Guru Profile (`/gurus/[id]`)
- Detailed guru information including name, niche, rating, and bio
- Tabbed interface showing evidence and user reports
- Color-coded evidence types (success, failure, questionable)
- Report categories (scam, misleading, false claims, other)
- Direct link to report the guru

### Report Form (`/report`)
- Form to submit reports about problematic gurus
- Required fields: guru selection, title, description, category
- Optional fields: supporting evidence, reporter name
- Success confirmation with redirect to guru profile

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Styling**: Tailwind CSS 4.x with custom dark theme
- **TypeScript**: Full type safety throughout the application
- **State Management**: sessionStorage with custom utility functions
- **UI Components**: Custom React components with consistent styling

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ManuFerrer094/hustler-hunter.git
   cd hustler-hunter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🚀 Deploy to Vercel

### Option 1: Deploy via Git (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your `hustler-hunter` repository
   - Vercel will automatically detect it's a Next.js project

3. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - You'll receive a production URL

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Environment Configuration

No environment variables are required for basic functionality since the app uses sessionStorage for data management.

## 📊 Data Management

### Mock Data
The application includes 3 sample gurus with realistic data:

1. **Alex Trading Pro** (Forex Trading) - Rating: 2.5/5
2. **Sarah Crypto Queen** (Cryptocurrency) - Rating: 1.5/5  
3. **Michael Stock Genius** (Stock Trading) - Rating: 3.0/5

### Data Switching
Use the checkbox on the homepage to toggle between:
- **Mock Data**: Predefined sample data for demonstration
- **Real Data**: User-generated data stored in sessionStorage

### Storage Structure
Data is stored in sessionStorage with these keys:
- `hustler-hunter-gurus`: Array of guru objects
- `hustler-hunter-reports`: Array of report objects
- `hustler-hunter-settings`: Application settings including mock data flag

## 🔮 Future MongoDB Integration

The application is designed to easily transition to MongoDB:

### Planned Schema

```javascript
// Guru Collection
{
  _id: ObjectId,
  name: String,
  niche: String,
  rating: Number,
  bio: String,
  imageUrl: String,
  evidence: [EvidenceSchema],
  reports: [ReportSchema],
  createdAt: Date,
  updatedAt: Date
}

// Report Collection
{
  _id: ObjectId,
  guruId: ObjectId,
  title: String,
  description: String,
  category: String,
  evidence: String,
  reporterName: String,
  createdAt: Date
}
```

### Migration Steps
1. Set up MongoDB Atlas cluster
2. Create API routes in `/app/api/`
3. Replace `StorageService` calls with API calls
4. Add authentication for report submissions
5. Implement admin moderation features

## 🎨 Design System

### Color Palette
- **Primary**: Black (`#000000`)
- **Secondary**: Dark Gray (`#1f2937`, `#374151`)
- **Accent**: Red (`#dc2626`, `#b91c1c`)
- **Text**: Light Gray (`#f5f5f5`, `#6b7280`)

### Typography
- **Font Stack**: `system-ui, -apple-system, sans-serif`
- **Headings**: Bold, white text with red accents
- **Body**: Light gray text with good contrast

### Components
- **Cards**: Dark gray backgrounds with subtle borders
- **Buttons**: Red primary, gray secondary with hover effects
- **Forms**: Dark inputs with red focus rings
- **Navigation**: Sticky header with red branding

## 📱 Responsive Breakpoints

- **Mobile**: `sm` (640px+)
- **Tablet**: `md` (768px+)
- **Desktop**: `lg` (1024px+)
- **Large**: `xl` (1280px+)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This platform is for educational and informational purposes. All information is user-submitted and should be independently verified. We encourage factual, evidence-based reporting and do not endorse false or malicious claims.

## 🔗 Links

- **Live Demo**: [Deploy to see your live URL]
- **Repository**: [https://github.com/ManuFerrer094/hustler-hunter](https://github.com/ManuFerrer094/hustler-hunter)
- **Issues**: [Report bugs or request features](https://github.com/ManuFerrer094/hustler-hunter/issues)

---

Built with ❤️ using Next.js and Tailwind CSS
