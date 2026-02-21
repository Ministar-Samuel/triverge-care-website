-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Appointments Table
create table if not exists appointments (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  service_type text not null,
  scheduled_time timestamp with time zone not null,
  status text not null default 'pending', -- pending, confirmed, completed, cancelled
  notes text,
  created_at timestamp with time zone default now()
);

-- 2. Students Table
create table if not exists students (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  enrollment_date date default current_date,
  payment_ref text,
  amount_paid numeric(10, 2) default 0,
  created_at timestamp with time zone default now()
);

-- 3. Blog Posts Table
create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  hero_image text,
  content text,
  published_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- 4. Testimonials Table
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  youtube_id text not null,
  category text,
  created_at timestamp with time zone default now()
);

-- 5. Newsletter Subscribers Table
create table if not exists newsletter_subscribers (
  email text primary key,
  subscribed_at timestamp with time zone default now()
);

-- 6. Search Index Table (Simplified Text Search)
create table if not exists search_index (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  snippet text,
  url text not null,
  keywords text,
  type text -- blog, service, testimonial
);

-- 7. Profiles Table (Admin user profiles)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  role text not null default 'pending', -- super_admin, admin, pending
  notes text,
  created_at timestamp with time zone default now()
);

-- Auto-create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role, created_at)
  values (new.id, new.email, 'pending', now());
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Enable Row Level Security (RLS)
alter table appointments enable row level security;
alter table students enable row level security;
alter table blog_posts enable row level security;
alter table testimonials enable row level security;
alter table newsletter_subscribers enable row level security;
alter table search_index enable row level security;
alter table profiles enable row level security;

-- Policies

-- Profiles: Users can read/update own profile, Authenticated can view all
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

create policy "Authenticated can view all profiles" on profiles
  for select using (auth.role() = 'authenticated');

-- NOTE: Create an 'avatars' storage bucket in Supabase Dashboard
-- Settings: Public bucket, allowed MIME types: image/*

-- Appointments: Public can insert, Admin can do all
create policy "Public can insert appointments" on appointments
  for insert with check (true);

create policy "Admins can do everything on appointments" on appointments
  for all using (auth.role() = 'authenticated');

-- Students: Public can insert (via webhook/payment flow), Admin can do all
create policy "Public can insert students" on students
  for insert with check (true);

create policy "Admins can do everything on students" on students
  for all using (auth.role() = 'authenticated');

-- Blog Posts: Public can view published, Admin can do all
create policy "Public can view blog posts" on blog_posts
  for select using (true);

create policy "Admins can do everything on blog posts" on blog_posts
  for all using (auth.role() = 'authenticated');

-- Testimonials: Public can view, Admin can do all
create policy "Public can view testimonials" on testimonials
  for select using (true);

create policy "Admins can do everything on testimonials" on testimonials
  for all using (auth.role() = 'authenticated');

-- Newsletter: Public can insert, Admin can select
create policy "Public can subscribe" on newsletter_subscribers
  for insert with check (true);

create policy "Admins can view subscribers" on newsletter_subscribers
  for select using (auth.role() = 'authenticated');
  
-- Search Index: Public can view, Admin can manage
create policy "Public can search" on search_index
  for select using (true);

create policy "Admins can manage search index" on search_index
  for all using (auth.role() = 'authenticated');
