# RhinoRoam - Discover Assam Through Local Eyes

<div align="center">
  <img src="public/logo.png" alt="AxomConnect Logo" width="120" />
  
  **AxomConnect** is a community-powered tourism platform connecting travelers with authentic Assam experiences. Built with passion for Assam's cultural heritage, natural beauty, and the warmth of its communities.

  [![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)
  [![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
</div>

---

##  Vision

AxomConnect transforms how travelers discover Assam - moving beyond conventional tourism to create meaningful connections with local communities. We empower local guides, artisans, homestay owners, and cultural ambassadors to share their authentic stories while ensuring tourism benefits reach the grassroots.

---

##  Key Features

### 🏠 For Travelers
- **Curated Experiences** - Wildlife safaris, tea trails, tribal immersions, river journeys
- **Community Hosts** - Connect directly with verified local guides and homestays
- **AI Trip Planner** - Personalized itinerary generation
- **Festivals Calendar** - Never miss Bihu, Bwisagu, Ali Aye Ligang, or any festival
- **District Explorer** - Discover all 35 districts of Assam

###  For Hosts
- **Easy Registration** - 4-step application process
- **Profile Dashboard** - Manage experiences, bookings, and reviews
- **Verification Badge** - Build trust with verified host status
- **Direct Earnings** - Community-first pricing model

---

##  Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      RhinoRoam Platform                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│  │   Frontend  │   │     API     │   │   Database  │       │
│  │   Next.js   │◄─►│   Routes    │◄─►│  PostgreSQL │       │
│  │   App Dir   │   │  /api/*     │   │   + Prisma  │       │
│  └─────────────┘   └─────────────┘   └─────────────┘       │
│         │                │                                   │
│         ▼                ▼                                   │
│  ┌─────────────┐   ┌─────────────┐                          │
│  │   Design    │   │   External  │                          │
│  │   System    │   │   Services  │                          │
│  │  (globals)  │   │ OpenAI/Maps │                          │
│  └─────────────┘   └─────────────┘                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

##  Design System

Our design system draws inspiration from Assam's rich cultural heritage:

| Element | Colors | Inspiration |
|---------|--------|-------------|
| **Tea Garden** | `#1B4D2E` → `#7CB342` | Lush tea gardens of Upper Assam |
| **Brahmaputra** | `#0D3B4C` → `#B8D4DB` | The mighty river |
| **Muga Gold** | `#C9A227` | Assam's golden Muga silk |
| **Mekhela Red** | `#B71C1C` | Traditional Mekhela Sador |
| **Gamusa Pattern** | Decorative borders | Assamese gamusa motifs |

### Typography
- **Headings**: Lora (serif) - Elegant, cultural
- **Body**: Nunito (sans-serif) - Clear, modern

---

##  Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── festivals/page.tsx          # Festivals Calendar
│   ├── districts/page.tsx          # District Explorer
│   ├── experiences/
│   │   ├── page.tsx               # All Experiences
│   │   └── [slug]/page.tsx        # Experience Detail
│   ├── collections/page.tsx        # Curated Collections
│   ├── communities/page.tsx        # Community Hosts
│   ├── hosts/
│   │   ├── [slug]/page.tsx        # Host Profile
│   │   └── register/page.tsx      # Become a Host
│   ├── plan/page.tsx              # AI Trip Planner
│   ├── auth/signin/page.tsx       # Authentication
│   └── api/
│       ├── experiences/route.ts   # Experiences API
│       ├── districts/route.ts     # Districts API
│       ├── festivals/route.ts     # Festivals API
│       ├── hosts/route.ts         # Hosts API
│       ├── bookings/route.ts      # Bookings API
│       ├── collections/route.ts   # Collections API
│       └── chat/route.ts          # AI Chat API
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx         # Site navigation
│   │   └── Footer.tsx             # Site footer
│   ├── booking/
│   │   └── BookingModal.tsx       # Booking wizard
│   └── providers/
│       └── AuthProvider.tsx       # NextAuth provider
├── lib/
│   ├── prisma.ts                  # Prisma client
│   └── utils.ts                   # Utility functions
└── globals.css                     # Design system
```

---

##  Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- pnpm/npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/RhinoRoam.git
cd Rhino Roam

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and API keys

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
DATABASE_URL="postgresql://user:password@localhost:5432/axomconnect"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI (for AI features)
OPENAI_API_KEY="your-openai-api-key"

# Mapbox (for maps)
NEXT_PUBLIC_MAPBOX_TOKEN="your-mapbox-token"
```

---

##  Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| **Homepage** | `/` | Hero, featured experiences, collections, festivals |
| **Festivals** | `/festivals` | 23+ festivals with filters |
| **Districts** | `/districts` | All 35 Assam districts |
| **Experiences** | `/experiences` | Browse all experiences |
| **Experience Detail** | `/experiences/[slug]` | Full booking page |
| **Collections** | `/collections` | 8 curated collections |
| **Community Hosts** | `/communities` | Browse hosts |
| **Host Profile** | `/hosts/[slug]` | Host details & experiences |
| **Become a Host** | `/hosts/register` | Host registration |
| **Trip Planner** | `/plan` | AI-powered planning |
| **Sign In** | `/auth/signin` | Authentication |

---

##  Featured Festivals

| Festival | Month | Type | Community |
|----------|-------|------|-----------|
| Bhogali Bihu | January | State | All |
| Me-Dam-Me-Phi | January | Tribal | Tai-Ahom |
| Jonbeel Mela | January | Regional | Multi-tribal |
| Ali Aye Ligang | February | Tribal | Mising |
| Rongali Bihu | April | State | All |
| Bwisagu | April | Tribal | Bodo |
| Rongker | April | Tribal | Karbi |
| Ambubachi Mela | June | Religious | All |
| Durga Puja | October | State | All |
| Kati Bihu | October | State | All |

---

##  API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/experiences` | GET, POST | List/create experiences |
| `/api/experiences/[slug]` | GET | Get experience details |
| `/api/districts` | GET | List districts |
| `/api/festivals` | GET | List festivals with filters |
| `/api/hosts` | GET, POST | List/register hosts |
| `/api/bookings` | GET, POST | List/create bookings |
| `/api/collections` | GET | List collections |
| `/api/chat` | POST | AI chat responses |

---

##  Roadmap

###  Phase 1: Foundation (Complete)
- [x] Design system with Assam-inspired aesthetics
- [x] Homepage with story-driven layout  
- [x] Festivals calendar with 23+ festivals
- [x] Districts explorer (35 districts)
- [x] Experience listings and detail pages
- [x] Curated collections
- [x] Community hosts directory
- [x] AI trip planner interface
- [x] Database schema for all features

### 🔄 Phase 2: Community Features (In Progress)
- [x] Host profile pages
- [x] Host registration flow
- [x] Booking modal component
- [x] API endpoints for all features
- [ ] Payment integration (Razorpay)
- [ ] Email notifications
- [ ] Reviews system

###  Phase 3: Advanced Features (Planned)
- [ ] Host dashboard
- [ ] User dashboard with bookings
- [ ] Map-based district exploration
- [ ] Offline PWA support
- [ ] Multi-language support (Assamese, Hindi)
- [ ] Real-time chat with hosts

---

##  Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



##  Acknowledgments

- **Assam Tourism** - For inspiring this project
- **Local Communities** - For sharing their stories and traditions
- **Contributors** - For making this platform possible

  <p>
    <a href="https://axomconnect.com">Website</a> •
    <a href="https://twitter.com/axomconnect">Twitter</a> •
    <a href="https://instagram.com/axomconnect">Instagram</a>
  </p>
</div>
