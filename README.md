# 🚖 Vedan Travels - Premium Car Rental & Outstation Cab Service

Vedan Travels is a state-of-the-art, premium car rental and outstation chauffeur platform based in Coimbatore, Tamil Nadu. Designed with a luxury dark-gold aesthetic, the application provides travellers with a smooth, interactive experience to browse fleets, calculate distances, request custom quotes, track active rides, and register driver partners.

---

## 💎 Features

- **🏆 Luxury Fleet Showcase**: Interactive selection across multiple vehicle categories (Comfort Sedans, MUVs, Executive SUVs, VIP Coaches) featuring complete specifications, passenger/luggage capacities, transmission, and comfort levels.
- **🌐 Dynamic Bilingual System**: Seamless, full-site translations between **English** and **Tamil (தமிழ்)** using a custom React Context state provider (`LanguageContext`).
- **🎫 Real-Time Interactive Booking Terminal**: Dynamic pricing estimations and quote request flows with input sanitization, 10-digit Indian mobile number validation, and automatic data synchronization.
- **📡 Active Dispatch Telematics Simulator**: Interactive console demonstrating live-simulated GPS positioning, cruising speedometers, ETAs, and trip status updates for active vehicles departing from Coimbatore.
- **🤝 Driver Partner Alliance Network**: Onboarding hub for local professional drivers and fleet owners to register their services and vehicles directly into the database.
- **✨ Luxury-Grade UI/UX**: Premium dark mode theme with elegant gold accents, glassmorphic card designs, smooth animations (powered by `motion`), and a fully responsive grid system.

---

## 🛠️ Tech Stack

- **Core Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Styling & Animations**: [Tailwind CSS 4.0](https://tailwindcss.com/), [Motion / Framer Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Database Integration**: Next.js Server-Side Route Handlers & [Firebase Admin SDK](https://firebase.google.com/docs/admin) (Firestore)
- **Language Localization**: Custom React Context Provider

---

## 📂 Project Structure

```
vedan-travels/
├── src/
│   ├── app/                      # Next.js App Router root
│   │   ├── api/                  # Server-side API endpoints
│   │   │   ├── bookings/         # Booking inquiry endpoint
│   │   │   ├── contacts/         # General contact messages
│   │   │   └── driverPartners/   # Driver partner registration
│   │   ├── layout.tsx            # Global app layout
│   │   └── page.tsx              # Main entry page
│   ├── components/               # Custom UI Components
│   │   ├── BookingWidget.tsx     # Booking console & quotation calculator
│   │   ├── Fleet.tsx             # Vehicle list and category display
│   │   ├── TrackerSimulator.tsx  # Simulated live GPS vehicle tracker
│   │   ├── DriverPartner.tsx     # Partner driver application form
│   │   └── ...                   # Hero, Navbar, Services, Testimonials, Footer
│   ├── lib/                      # Helper libraries
│   │   ├── firebaseAdmin.ts      # Firebase Admin Firestore initialization
│   │   └── validation.ts         # Security validation and text sanitization
│   ├── data.ts                   # Static vehicle, service, and destination metadata
│   ├── LanguageContext.tsx       # Translation dictionaries (EN / TA) and hook
│   └── App.tsx                   # Consolidated Single Page Application
├── public/                       # Local static asset hosting (images, logos)
├── firestore.rules               # Security rules for Firestore databases
└── package.json                  # Dependencies & scripts config
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18.x or above recommended).

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/SandeepKumar1232005/TT.git
cd TT
npm install
```

### 2. Configure Environment Variables

Create a file named `.env.local` in the root directory and configure the environment variables as defined in `.env.example`:

```ini
# Gemini API Configuration (if applicable)
GEMINI_API_KEY="your-gemini-api-key"
APP_URL="http://localhost:3000"

# Firebase Credentials (Server-Side Admin SDK)
# Required to write to Firestore databases securely.
FIREBASE_PROJECT_ID="your-firebase-project-id"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@your-firebase-project-id.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQ...\n-----END PRIVATE KEY-----\n"
```

> [!NOTE]
> If Firebase environment variables are not supplied, the application will automatically fall back to **simulated/mock local storage mode**, permitting local testing of booking and driver submissions without service errors.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience the site locally.

### 4. Build for Production

To create an optimized production build of the Next.js app:

```bash
npm run build
npm run start
```

---

## 🛡️ Database Integration

Submissions through the **Booking Widget**, **Driver Registration Portal**, and **Contact Form** interact with Server-Side Route Handlers that safely validate input schema before writing records to Google Firestore. 

Ensure Firestore has appropriate collections structured:
- `bookings` (Stores reservation details, scheduled timings, passenger counts, and vehicle preferences)
- `driverPartners` (Stores provisional driver info, vehicle numbers, cities, and driving experience)
- `contacts` (Stores general customer inquiry logs)

---

## 🤝 Contributing

Contributions to improve Vedan Travels are welcome! Feel free to open issues or submit pull requests with improvements to layouts, animations, features, or localization translations.
