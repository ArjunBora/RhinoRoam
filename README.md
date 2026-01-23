# GUenARK - Tourism & Heritage Intelligence Platform

> **A production-ready, map-centric tourism and heritage discovery platform aligned with SDG 8 (Decent Work & Economic Growth) and SDG 11 (Sustainable Cities & Communities).**

![GUenARK Banner](https://images.unsplash.com/photo-1590059390047-f5e67e4d2c6c?w=1600&q=80)

## 🌟 Overview

GUenARK is a comprehensive tourism platform that helps travelers discover, plan, navigate, and respect India's cultural heritage destinations while supporting local communities. Unlike traditional OTAs, GUenARK focuses on:

- **Heritage Preservation** - Promoting cultural awareness and responsible tourism
- **Community Empowerment** - Direct connections with local artisans, guides, and villages
- **Sustainable Travel** - Environmental and cultural sensitivity at every step
- **AI-Powered Assistance** - Intelligent trip planning and real-time guidance

## ✨ Features

### 🗺️ Heritage Mapping & Discovery
- Interactive map powered by Mapbox GL JS
- 50+ heritage POIs with detailed cultural information
- Thematic walking trails and curated itineraries
- Category-based filtering and search

### 📍 Trip Planning
- "How to Reach" guides with transport options
- Seasonality calendar and best-time recommendations
- AI-generated personalized itineraries
- Stay suggestions with proximity to heritage sites

### 🤖 AI Heritage Assistant
- Context-aware trip planning
- Cultural etiquette and safety information
- Real-time recommendations
- Multi-language support (planned)

### 👥 Community Tourism (CBT)
- Village microsite feature
- Local artisan profiles with workshop bookings
- "Hire a Local Guide" module
- Transparent pricing and community benefit narratives

### 🛡️ Respect & Safety Layer
- Per-POI cultural norms and dress codes
- Safety tips and health advisories
- Environmental guidelines
- Source attribution for information

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4, Custom CSS Variables |
| **Maps** | Mapbox GL JS |
| **Database** | PostgreSQL + PostGIS (via Supabase) |
| **ORM** | Prisma |
| **Auth** | NextAuth.js |
| **AI** | OpenAI GPT-4o-mini |
| **Deployment** | Vercel + Supabase |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or Supabase account)
- Mapbox account (free tier available)
- OpenAI API key (optional for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/guenark.git
   cd guenark
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials:
   ```env
   # Database (Supabase PostgreSQL)
   DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key"
   
   # Mapbox
   NEXT_PUBLIC_MAPBOX_TOKEN="pk.your-mapbox-token"
   
   # OpenAI (optional)
   OPENAI_API_KEY="sk-your-openai-key"
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed sample data** (optional)
   ```bash
   npm run db:seed
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Authentication routes
│   ├── api/                    # API routes
│   │   ├── chat/               # AI chatbot endpoint
│   │   ├── destinations/       # Destinations API
│   │   └── pois/               # Points of Interest API
│   ├── community/              # Community tourism pages
│   ├── destinations/           # Destination pages
│   ├── explore/                # Map explorer page
│   ├── stories/                # Travel stories/UGC
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── chat/                   # AI chatbot widget
│   ├── home/                   # Homepage components
│   ├── map/                    # Map components
│   └── ui/                     # Base UI components
├── lib/
│   ├── db.ts                   # Prisma client
│   └── utils.ts                # Utility functions
└── types/
    └── index.ts                # TypeScript types
```

## 🗄️ Database Schema

The platform uses a comprehensive PostgreSQL schema with PostGIS for spatial queries:

- **Destinations** - Heritage regions with rich metadata
- **POIs** - Points of Interest with cultural information
- **HeritageTrails** - Curated walking routes
- **Stays** - Accommodations with eco-practices
- **Artisans** - Local craftspeople profiles
- **LocalGuides** - Verified guide listings
- **CBTVillages** - Community tourism villages
- **Articles** - User-generated travel content
- **Seasonality** - Monthly destination data

## 🎨 Design System

GUenARK uses a heritage-themed design system:

### Colors
- **Heritage Gold** `#D4A574` - Primary accent
- **Heritage Bronze** `#B8860B` - Secondary
- **Nature Teal** `#2E8B8B` - Eco/nature elements
- **Terracotta** `#E2725B` - Alerts/highlights

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Outfit (sans-serif)

### Components
- Glass-morphism cards
- Heritage-themed badges
- Animated map markers
- Responsive navigation

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing with featured destinations |
| Explore | `/explore` | Interactive map explorer |
| Destinations | `/destinations` | All destinations listing |
| Destination Detail | `/destinations/[slug]` | Individual destination page |
| Community | `/community` | CBT villages, artisans, guides |
| Stories | `/stories` | Travel articles and blogs |

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/destinations` | GET, POST | List/create destinations |
| `/api/destinations/[slug]` | GET | Get destination with all data |
| `/api/pois` | GET, POST | List/create POIs |
| `/api/chat` | POST | AI chatbot interaction |

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 📊 MVP vs Future Roadmap

### ✅ MVP (Current)
- Interactive heritage map
- Destination and POI pages
- AI chatbot assistant
- Community tourism section
- Seasonality calendar
- Mobile-responsive design

### 🔜 Future Phases
- User authentication & profiles
- Full UGC blog system
- Guide booking with payments
- Multi-language support
- Offline PWA mode
- Admin dashboard
- Analytics & reporting

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built for sustainable tourism aligned with UN SDG 8 & SDG 11
- Sample data features Hampi, a UNESCO World Heritage Site
- Inspired by community tourism initiatives across India

---

**Made with ❤️ for heritage preservation and community empowerment**
