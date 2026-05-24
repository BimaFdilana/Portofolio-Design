# Apple-Inspired Developer Portfolio & Admin Dashboard

A minimalist, modern, and highly interactive developer portfolio website designed with an Apple-like aesthetic. Built using **Next.js 15**, **Tailwind CSS**, and **Framer Motion**, with **Appwrite Cloud** integrated as the backend/database solution.

---

## ✨ Features

- **Apple Aesthetic**: Premium, clean design using HSL tailored colors (primarily Black, White, and Deep Navy Blue) with glassmorphism and subtle micro-animations.
- **Light/Dark Mode Toggler**: Smooth, instant theme switching between Dark mode (black/navy background, white text) and Light mode (pure white background, slate-blue text, and gold/yellow highlights).
- **Single Page Interface**: Smooth scroll transitions, parallax effects, and scroll-reveal animations.
- **Scroll Navigation Indicator**: Dynamic progress bar and active section highlight on the navbar.
- **Interactive Coffee Donation & Social Links**: A dedicated "Send me coffe" section featuring:
  - Copy-to-clipboard payment details (Bank BCA & GoPay/Dana) with instant feedback checkmarks.
  - QR Code display with automated fallback placeholders.
  - Smooth social connections grid for GitHub, LinkedIn, Twitter/X, Instagram, and Direct Mail.
- **Admin Dashboard (`/admin`)**: Fully interactive admin panel to update Hero, About, Skills, Projects, and Contact details dynamically.
- **Lightweight & High Performance**: Clean bundle size optimized for rapid loading times (<1s).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend / Database**: Appwrite Cloud Web SDK
- **Hosting**: Vercel (recommended)

---

## 📦 Setup & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v20+ recommended) and `npm` installed.

### 1. Clone the repository
```bash
git clone git@github.com:BimaFdilana/Portofolio-Design.git
cd Portofolio-Design
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application. Access the Admin Panel at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 🔒 Appwrite Integration & Planning
For the junior developer or AI model integrating the live Appwrite database:
- Refer to **[issue.md](issue.md)** for detailed instructions regarding collections, schema attributes, authentication logic, and setup guidelines.
- Refer to **[informasi.md](informasi.md)** for Vercel deployment configurations and CORS whitelisting on Appwrite Cloud.
