-- Migration 002: Channel infrastructure
-- Built by ATLAS — 2026-07-04

-- Channel status enum
create type channel_id_enum as enum (
  'site', 'rv_trader', 'boats_group', 'rv_universe', 'meta', 'google_vl', 'craigslist'
);

create type listing_status_enum as enum (
  'queued', 'live', 'pending', 'failed', 'needs_review', 'removed'
);

-- ── channel_listings ──────────────────────────────────────────────────────
-- This table IS the status board.
create table channel_listings (
  id                uuid primary key default gen_random_uuid(),
  unit_id           uuid not null references units(id) on delete cascade,
  channel_id        channel_id_enum not null,
  status            listing_status_enum not null default 'queued',
  external_id       text,                           -- The ID assigned by the channel
  external_url      text,                           -- Link back to listing on the channel
  last_synced_at    timestamptz,
  last_error        text,                           -- Raw error from channel for debug
  first_published_at timestamptz,
  removed_at        timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  unique (unit_id, channel_id)
);

create index channel_listings_unit_id_idx on channel_listings (unit_id);
create index channel_listings_channel_status_idx on channel_listings (channel_id, status);
create index channel_listings_status_idx on channel_listings (status) where status in ('failed', 'needs_review');
create index channel_listings_updated_at_idx on channel_listings (updated_at desc);

create trigger channel_listings_updated_at
  before update on channel_listings
  for each row execute function update_updated_at_column();


-- ── sync_jobs ─────────────────────────────────────────────────────────────
-- pg-boss tracks these; this table mirrors key metadata for the monitoring view
create table sync_jobs (
  id          uuid primary key default gen_random_uuid(),
  job_id      text,                                 -- pg-boss job id
  unit_id     uuid references units(id) on delete set null,
  channel_id  channel_id_enum,
  action      text not null,                        -- 'publish' | 'update' | 'unpublish' | 'ingest' | 'feed_generate'
  attempts    integer not null default 0,
  result      jsonb,
  queued_at   timestamptz not null default now(),
  started_at  timestamptz,
  completed_at timestamptz,
  failed_at   timestamptz
);

create index sync_jobs_unit_channel_idx on sync_jobs (unit_id, channel_id);
create index sync_jobs_queued_at_idx on sync_jobs (queued_at desc);


-- ── channel_category_map ──────────────────────────────────────────────────
-- Maps canonical taxonomy to per-channel codes
create table channel_category_map (
  id                    uuid primary key default gen_random_uuid(),
  canonical_category    text not null,
  channel_id            channel_id_enum not null,
  channel_code          text not null,              -- The value the channel expects
  channel_label         text,                       -- Human-readable label for that channel
  notes                 text,

  unique (canonical_category, channel_id)
);

-- Seed canonical categories and known mappings
insert into channel_category_map (canonical_category, channel_id, channel_code, channel_label) values
  -- RV categories → RV Trader (TI codes TBD — placeholder until feed spec arrives)
  ('class-a-motorhome',    'rv_trader',   'class-a',        'Class A Motorhome'),
  ('class-b-motorhome',    'rv_trader',   'class-b',        'Class B Motorhome'),
  ('class-c-motorhome',    'rv_trader',   'class-c',        'Class C Motorhome'),
  ('fifth-wheel',          'rv_trader',   'fifth-wheel',    'Fifth Wheel'),
  ('travel-trailer',       'rv_trader',   'travel-trailer', 'Travel Trailer'),
  ('toy-hauler',           'rv_trader',   'toy-hauler',     'Toy Hauler'),
  ('pop-up-camper',        'rv_trader',   'pop-up',         'Pop-Up Camper'),
  -- Craigslist categories
  ('class-a-motorhome',    'craigslist',  'rvd',            'RVs by Dealer'),
  ('class-b-motorhome',    'craigslist',  'rvd',            'RVs by Dealer'),
  ('class-c-motorhome',    'craigslist',  'rvd',            'RVs by Dealer'),
  ('fifth-wheel',          'craigslist',  'rvd',            'RVs by Dealer'),
  ('travel-trailer',       'craigslist',  'rvd',            'RVs by Dealer'),
  ('toy-hauler',           'craigslist',  'rvd',            'RVs by Dealer'),
  ('pop-up-camper',        'craigslist',  'rvd',            'RVs by Dealer'),
  ('pontoon',              'craigslist',  'bod',            'Boats by Dealer'),
  ('bass-boat',            'craigslist',  'bod',            'Boats by Dealer'),
  ('deck-boat',            'craigslist',  'bod',            'Boats by Dealer'),
  ('ski-boat',             'craigslist',  'bod',            'Boats by Dealer'),
  ('outboard-motor',       'craigslist',  'bod',            'Boats by Dealer'),
  -- Boats Group (covers Boat Trader + YachtWorld + boats.com — codes TBD)
  ('pontoon',              'boats_group', 'pontoon',        'Pontoon Boats'),
  ('bass-boat',            'boats_group', 'bass-boat',      'Bass Boats'),
  ('deck-boat',            'boats_group', 'deck-boat',      'Deck Boats'),
  ('ski-boat',             'boats_group', 'ski-boat',       'Ski & Wakeboard'),
  -- Google vehicle listings (uses vehicle_type values per Google spec)
  ('class-a-motorhome',    'google_vl',   'motorhome',      'Motorhomes'),
  ('class-b-motorhome',    'google_vl',   'motorhome',      'Motorhomes'),
  ('class-c-motorhome',    'google_vl',   'motorhome',      'Motorhomes'),
  ('fifth-wheel',          'google_vl',   'fifth-wheel',    'Fifth Wheels'),
  ('travel-trailer',       'google_vl',   'travel-trailer', 'Travel Trailers'),
  ('toy-hauler',           'google_vl',   'toy-hauler',     'Toy Haulers'),
  -- Meta vehicle catalog (body_style values per Meta vehicle catalog spec)
  ('class-a-motorhome',    'meta',        'MOTORHOME',      'Motorhome'),
  ('fifth-wheel',          'meta',        'FIFTH_WHEEL',    'Fifth Wheel'),
  ('travel-trailer',       'meta',        'TRAVEL_TRAILER', 'Travel Trailer');


-- ── channel_settings ──────────────────────────────────────────────────────
-- Per-channel credentials and configuration (admin-only view 4)
create table channel_settings (
  channel_id        channel_id_enum primary key,
  enabled           boolean not null default false,
  credentials       jsonb,                          -- Encrypted or env-ref; never log
  config            jsonb,                          -- Feed URLs, rate limits, spend caps
  last_feed_at      timestamptz,
  last_error        text,
  notes             text,
  updated_at        timestamptz not null default now()
);

-- Insert all channels as disabled stubs
insert into channel_settings (channel_id, enabled) values
  ('site',       true),   -- Site is always enabled; it's a DB read
  ('rv_trader',  false),
  ('boats_group',false),
  ('rv_universe',false),
  ('meta',       false),
  ('google_vl',  false),
  ('craigslist', false);

create trigger channel_settings_updated_at
  before update on channel_settings
  for each row execute function update_updated_at_column();
