-- Migration 003: RLS policies and auth
-- Built by ATLAS — 2026-07-04

-- Enable RLS on all tables
alter table units enable row level security;
alter table media enable row level security;
alter table channel_listings enable row level security;
alter table sync_jobs enable row level security;
alter table channel_settings enable row level security;
alter table audit_log enable row level security;
alter table channel_category_map enable row level security;

-- ── Public read access (active units + media for the public site) ──────────
-- Active units are publicly visible — the site reads these server-side
create policy "Public can read active units"
  on units for select
  using (status in ('active', 'pending_sale'));

create policy "Public can read active unit media"
  on media for select
  using (exists (
    select 1 from units u
    where u.id = media.unit_id
    and u.status in ('active', 'pending_sale')
  ));

create policy "Public can read category map"
  on channel_category_map for select
  using (true);

-- ── Staff (authenticated) — status board read ─────────────────────────────
create policy "Staff can read all units"
  on units for select
  to authenticated
  using (true);

create policy "Staff can read all media"
  on media for select
  to authenticated
  using (true);

create policy "Staff can read channel listings"
  on channel_listings for select
  to authenticated
  using (true);

create policy "Staff can read sync jobs"
  on sync_jobs for select
  to authenticated
  using (true);

create policy "Staff can read audit log"
  on audit_log for select
  to authenticated
  using (true);

-- ── Admin role — full write access ───────────────────────────────────────
-- Check for admin role via app_metadata (set on Supabase auth user record)
create policy "Admin can write units"
  on units for all
  to authenticated
  using (auth.jwt() ->> 'role' in ('admin', 'staff'))
  with check (auth.jwt() ->> 'role' in ('admin', 'staff'));

create policy "Admin can write channel listings"
  on channel_listings for all
  to authenticated
  using (auth.jwt() ->> 'role' in ('admin', 'staff'))
  with check (auth.jwt() ->> 'role' in ('admin', 'staff'));

-- Channel settings — admin only
create policy "Admin can read channel settings"
  on channel_settings for select
  to authenticated
  using (auth.jwt() ->> 'role' = 'admin');

create policy "Admin can write channel settings"
  on channel_settings for all
  to authenticated
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

create policy "Admin can write media"
  on media for all
  to authenticated
  using (auth.jwt() ->> 'role' = 'admin')
  with check (auth.jwt() ->> 'role' = 'admin');

create policy "Admin can write audit log"
  on audit_log for insert
  to authenticated
  with check (auth.jwt() ->> 'role' in ('admin', 'staff'));
