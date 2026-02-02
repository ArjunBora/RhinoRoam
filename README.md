# RhinoRoam - Discover Assam Through Local Eyes

<div align="center">
  <img src="public/logo.png" alt="RhinoRoam Logo" width="120" />
  
  **RhinoRoam** is a community-powered tourism platform connecting travelers with authentic Assam experiences. Built with passion for Assam's cultural heritage, natural beauty, and the warmth of its communities.

  [![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
</div>

---

## 🌿 Vision

RhinoRoam transforms how travelers discover Assam - moving beyond conventional tourism to create meaningful connections with local communities. We empower local guides, artisans, homestay owners, and cultural ambassadors to share their authentic stories while ensuring tourism benefits reach the grassroots.

---

## ✨ Key Features

### 🗺️ Explore & Navigate
- **Interactive Map** (`/map`) - A dynamic, filterable map powered by Leaflet. Discover POIs across categories like Wildlife, Heritage, Temples, and Tea Gardens with real-time distance and details.
- **Heritage Trails** (`/trails`) - Curated walking and driving routes (e.g., "Ahom Heritage Trail", "Majuli Cultural Trail"). Includes stop-by-stop guides, duration, and tips.
- **District Explorer** (`/districts`) - Comprehensive resources for exploring all 35 districts of Assam, highlighting unique local attractions or specific tribal cultures.

### 🤖 AI & Smart Tools
- **AI Trip Planner** (`/plan`) - Generates personalized itineraries (3-14 days) based on user preferences for budget, pace, interests (Wildlife, Tea, Tribal), and travel dates.
- **AI Travel Assistant** - Integrated Chat Widget that answers queries about local customs, travel logistics, and history in real-time.

### 🌿 Immersive Content
- **Curated Collections** (`/collections`) - Themed travel collections such as "Dibru-Saikhowa Wild Horses", "River Rafting Adventures", and "Tea Garden Stays".
- **Travel Stories** (`/stories`) - A community-driven blog featuring authentic accounts from travelers ("Stories from the Road"), complete with reading times, tags, and author profiles.
- **Festivals Calendar** (`/festivals`) - A detailed calendar of 23+ festivals (Bihu, Baishagu, Ali Aye Ligang) with cultural context and dates.

### 👥 Community & Hosts
- **Verified Local Hosts** - Connect directly with homestay owners and guides who have been vetted for quality and authenticity.
- **Direct Bookings** - Seamless booking flow for experiences and stays.
- **Host Registration** - Easy onboarding for locals to list their services and share their culture.

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       RhinoRoam Platform                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐        │
│  │   Frontend  │   │     API     │   │   Database  │        │
│  │   Next.js   │◄─►│   Routes    │◄─►│  PostgreSQL │        │
│  │   App Dir   │   │  /api/*     │   │   + Prisma  │        │
│  └─────────────┘   └─────────────┘   └─────────────┘        │
│         │                │                                  │
│         ▼                ▼                                  │
│  ┌─────────────┐   ┌─────────────┐                          │
│  │   Design    │   │   External  │                          │
│  │   System    │   │   Services  │                          │
│  │  (globals)  │   │ OpenAI/Maps │                          │
│  └─────────────┘   └─────────────┘                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design System

Our design system draws inspiration from Assam's rich cultural heritage:

| Element | Colors | Inspiration |
|---------|--------|-------------|
| **Tea Garden** | `#1B4D2E` → `#7CB342` | Lush tea gardens of Upper Assam |
| **Brahmaputra** | `#0D3B4C` → `#B8D4DB` | The mighty river |
| **Muga Gold** | `#C9A227` | Assam's golden Muga silk |
| **Mekhela Red** | `#B71C1C` | Traditional Mekhela Sador |
| **Gamusa Pattern** | Decorative borders | Assamese gamusa motifs |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── map/page.tsx                # Interactive Map
│   ├── plan/page.tsx               # AI Trip Planner
│   ├── stories/page.tsx            # Travel Stories & Blog
│   ├── trails/page.tsx             # Heritage Trails
│   ├── festivals/page.tsx          # Festivals Calendar
│   ├── districts/page.tsx          # District Explorer
│   ├── experiences/                # Experiences Listings
│   ├── collections/page.tsx        # Curated Collections
│   ├── communities/page.tsx        # Community Hosts
│   ├── hosts/                      # Host Profiles & Register
│   └── api/                        # Backend API Routes
│       ├── chat/                   # AI Chat Endpoint
│       └── ...                     # Other Resource Endpoints
├── components/
│   ├── map/                        # Map-specific components
│   ├── chat/                       # Chat Widget components
│   ├── layout/                     # Navigation & Footer
│   └── providers/                  # Context Providers
├── lib/
│   ├── prisma.ts                   # DB Client
│   └── utils.ts                    # Helpers
└── globals.css                     # Design System (Tailwind)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm / pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/rhinoroam.git
cd rhinoroam

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed sample data
npm run db:seed:assam

# Start development server
npm run dev
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/rhinoroam"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# AI Integration
OPENAI_API_KEY="your-openai-api-key"

# Maps (Optional/If Mapbox used)
NEXT_PUBLIC_MAPBOX_TOKEN="your-mapbox-token"
```

---

## 📱 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| **Homepage** | `/` | Hero, featured experiences, collections, festivals |
| **Interactive Map** | `/map` | Filters, categories, distance tracking |
| **Heritage Trails** | `/trails` | Curated itineraries & guides |
| **Trip Planner** | `/plan` | AI-powered planning & customization |
| **Travel Stories** | `/stories` | Blog & community stories |
| **Festivals** | `/festivals` | 23+ festivals with cultural context |
| **Districts** | `/districts` | All 35 Assam districts |
| **Experiences** | `/experiences` | Browse all experiences |
| **Collections** | `/collections` | 8 curated collections |
| **Host Profile** | `/hosts/[slug]` | Host details & experiences |
| **Become a Host** | `/hosts/register` | Host registration |

---

## 📅 Roadmap

### ✅ Phase 1: Foundation & Discovery (Complete)
- [x] Design system with Assam-inspired aesthetics
- [x] Homepage with story-driven layout  
- [x] Interactive Experience Map
- [x] Heritage Trails & Collections
- [x] Stories & Blog Section
- [x] Festivals calendar
- [x] AI Trip Planner Interface

### 🔄 Phase 2: Community & Connectivity (In Progress)
- [x] Host Search & Profiles
- [x] Booking System UI
- [x] AI Chat Assistant
- [ ] Payment Gateway Integration
- [ ] User Reviews & Ratings System

### 📋 Phase 3: Expansion (Planned)
- [ ] Host Dashboard for managing listings
- [ ] Mobile PWA with offline support
- [ ] Multilingual Support (Assamese, Hindi)
- [ ] Real-time messaging between hosts and travelers

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ in Assam 🍵</p>
  <p>
    <a href="https://rhinoroam.com">Website</a> •
    <a href="https://twitter.com/rhinoroam">Twitter</a> •
    <a href="https://instagram.com/rhinoroam">Instagram</a>
  </p>
</div>
