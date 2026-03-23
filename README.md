# Portfolio Website

A personal portfolio website built with Next.js, TailwindCSS, shadcn/ui, and Keystatic CMS.

## Features

- **Hero Section** - Eye-catching introduction with social links
- **About Section** - Personal bio and details
- **Skills Section** - Showcase your skills by category
- **Projects Section** - Display your work with images and links
- **Services Section** - Highlight services you offer for commissions
- **Blog Section** - Share your thoughts and tutorials
- **Contact Section** - Contact form for inquiries

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS + shadcn/ui
- **CMS**: Keystatic (file-based, Git-backed)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### CMS Admin

Access the Keystatic admin panel at [http://localhost:3000/keystatic](http://localhost:3000/keystatic) to manage content.

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main homepage
│   ├── layout.tsx        # Root layout with navbar/footer
│   ├── keystatic/        # CMS admin panel
│   └── api/keystatic/    # CMS API routes
├── components/
│   ├── layout/           # Navbar, Footer
│   └── sections/         # Page sections (Hero, About, etc.)
├── content/
│   ├── projects/         # Project content
│   ├── skills/           # Skills data
│   ├── services/         # Services data
│   ├── blog/             # Blog posts
│   └── profile/          # Profile info
└── lib/
    └── utils.ts          # Utility functions
```

## Customization

1. **Update Profile**: Edit `src/content/profile/main.json`
2. **Add Projects**: Add new `.mdoc` files to `src/content/projects/`
3. **Update Skills**: Add new `.json` files to `src/content/skills/`
4. **Add Services**: Edit existing or add new files to `src/content/services/`
5. **Write Blog Posts**: Add new `.mdoc` files to `src/content/blog/`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import to Vercel
3. Deploy

For production CMS editing, configure GitHub storage mode in `keystatic.config.ts`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Keystatic Documentation](https://keystatic.com/docs)
