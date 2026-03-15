# Dynamic Portfolio Website

A full-stack dynamic portfolio website built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and SQLite.

## Features

- **10+ Sections**: Hero, About, Resume, Experience, Education, Projects, Publications, Certifications, Contact
- **Admin Panel**: Full CRUD for all content, file uploads, question management
- **Authentication**: Cookie-based admin auth with credentials from `.env`
- **Database**: SQLite via better-sqlite3 (zero-config, file-based)
- **Animations**: Smooth scroll-triggered animations with Framer Motion
- **Design**: Glassmorphism, gradient accents, premium dark theme
- **Responsive**: Mobile-first, fully responsive layout

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your admin credentials.

3. **Seed the database:**
   ```bash
   npx tsx lib/seed.ts
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Admin Panel

Navigate to `/admin-login` (hidden route, not linked on public site).

Default credentials (from `.env.local`):
- Email: `admin@example.com`
- Password: `changeme123`

## Project Structure

```
├── app/
│   ├── page.tsx              # Main portfolio page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Design system & styles
│   ├── admin-login/          # Admin login page
│   ├── admin/                # Admin panel (protected)
│   │   ├── about/
│   │   ├── resume/
│   │   ├── experience/
│   │   ├── education/
│   │   ├── projects/
│   │   ├── publications/
│   │   ├── certifications/
│   │   └── questions/
│   └── api/upload/           # File upload endpoint
├── components/               # React components
├── actions/                  # Server actions (CRUD)
├── lib/                      # Database & auth utilities
├── public/uploads/           # Uploaded files
└── middleware.ts             # Auth middleware
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database**: SQLite (better-sqlite3)
- **Icons**: Lucide React
