-- ============================================================
-- NADUPA AFRICA FOUNDATION - fresh Supabase project setup
-- ============================================================
-- Run this ONCE in the SQL Editor of a NEW Supabase project.
-- It creates every table the current site code uses, with RLS.
-- Replaces the incremental scripts 01-13 (kept for history).
-- Safe to re-run: uses IF NOT EXISTS / OR REPLACE throughout.
-- ============================================================

-- 1) Documents published on the site (admin panel + /resources page)
create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  category text not null,
  file_url text not null,
  file_size text default 'Unknown',
  file_type text default 'PDF',
  is_featured boolean default false,
  reference_links text,
  created_at timestamptz not null default now()
);

-- 2) Contact form submissions
--    Note: /api/contact inserts first_name/last_name/phone with the ANON key;
--    the server action inserts a single "name" via the service role.
--    Both shapes are supported, hence the nullable columns.
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  first_name text,
  last_name text,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- 3) Volunteer applications
create table if not exists public.volunteer_signups (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  motivation text not null,
  additional_info text,
  area_of_interest text,
  availability text,
  skills text,
  created_at timestamptz not null default now()
);

-- 4) Donation interest submissions
create table if not exists public.donation_interest (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  donation_amount numeric,
  custom_amount numeric,
  payment_method text not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- The site's server code uses the service role key (bypasses RLS)
-- for everything EXCEPT /api/contact, which inserts with the anon
-- key and therefore needs an explicit insert policy.
-- ============================================================
alter table public.resources enable row level security;
alter table public.contact_messages enable row level security;
alter table public.volunteer_signups enable row level security;
alter table public.donation_interest enable row level security;

drop policy if exists "anon can submit contact form" on public.contact_messages;
create policy "anon can submit contact form"
  on public.contact_messages for insert
  to anon
  with check (true);

-- No anon select/update/delete anywhere: submissions are write-only
-- from the public site, and all reads go through the service role.
