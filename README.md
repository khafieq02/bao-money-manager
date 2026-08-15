# Bao Money Manager

Bao is a mobile-first personal money manager built with Next.js and Supabase. It provides a calm place to record transactions, track spending, manage budgets, and set named savings goals.

## Features

- Username and password sign-in, with email used only during registration
- Income and expense tracking with categories and dates
- Interactive Home overview for weekly, monthly, and yearly expense or income activity
- Monthly budgets and spending-by-category analytics
- Main savings target plus multiple named personal goals
- Mobile-friendly layout with an installable web-app experience

## Built with

- Next.js 15 and React 19
- TypeScript and Tailwind CSS
- Supabase Auth and Postgres
- Lucide icons

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` with your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

   Keep `SUPABASE_SERVICE_ROLE_KEY` private. Never expose it as a `NEXT_PUBLIC_` variable.

3. In Supabase SQL Editor, run these files in order:

   - `supabase/schema.sql`
   - `supabase/budgets.sql`
   - `supabase/username-auth.sql`
   - `supabase/personal-goals.sql`

4. Start the app:

   ```bash
   npm run dev
   ```

Visit `http://localhost:3000`.

## Deploy to Vercel

1. Import this GitHub repository into Vercel.
2. Add the three environment variables shown above in **Project Settings → Environment Variables**.
3. Select Production, Preview, and Development as needed.
4. Deploy. Changes to environment variables require a new deployment.

## Scripts

```bash
npm run dev      # Start local development
npm run build    # Create a production build
npm run start    # Run the production build locally
```
