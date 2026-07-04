-- Migration 001: Canonical inventory schema
-- Southern Idaho RV & Marine
-- Built by ATLAS — 2026-07-04

-- Enums
create type unit_type_enum as enum ('rv', 'boat', 'motor', 'trailer');
create type identifier_type_enum as enum ('vin', 'hin', 'serial');
create type unit_status_enum as enum ('draft', 'active', 'pending_sale', 'sold', 'pending_removal', 'archived');
create type condition_enum as enum ('new', 'used');
create type posting_profile_enum as enum ('FULL', 'LOCAL', 'FREE', 'SITE_ONLY', 'CUSTOM');
create type profile_source_enum as enum ('dms', 'manual');
create type title_status_enum as enum ('clean', 'salvage', 'flood', 'na');

-- ── units ─────────────────────────────────────────────────────────────────
create table units (
  -- Core identity
  id                uuid primary key default gen_random_uuid(),
  dms_id            text unique not null,           -- DeskManager stock # — the diff key
  stock_number      text not null,                  -- Displayed dealer stock #
  unit_type         unit_type_enum not null,
  identifier_type   identifier_type_enum not null,
  identifier        text,                           -- VIN / HIN / serial — validated per type at ingest

  -- Classification
  condition         condition_enum not null default 'used',
  status            unit_status_enum not null default 'draft',
  category          text not null,                  -- e.g. 'travel-trailer', 'pontoon', 'outboard-motor'
  title_status      title_status_enum not null default 'na',

  -- Universal listing fields
  year              integer not null check (year between 1950 and 2100),
  make              text not null,
  model             text not null,
  trim              text,

  -- Pricing
  price             numeric(10,2),
  msrp              numeric(10,2),
  sale_price        numeric(10,2),

  -- Content
  description       text,

  -- Location (fixed — 60 Bob Barton Rd, Jerome ID)
  location          jsonb not null default '{
    "address": "60 Bob Barton Road",
    "city": "Jerome",
    "state": "ID",
    "zip": "83338",
    "county": "Jerome",
    "lat": 42.7258,
    "lng": -114.5191,
    "craigslist_area": "twinfalls"
  }'::jsonb,

  -- Posting profile (Section 4.3)
  posting_profile   posting_profile_enum not null default 'FULL',
  custom_channels   text[],                         -- Only when posting_profile = 'CUSTOM'
  profile_source    profile_source_enum not null default 'manual',
  dms_profile_raw   text,                           -- Raw DMS field value for audit
  profile_updated_at timestamptz,                   -- For last-write-wins precedence

  -- ── RV extension columns ──────────────────────────────────
  rv_class          text,                           -- 'Class A' | 'Class B' | 'Class C' | 'Fifth Wheel' | 'Travel Trailer' etc
  length_ft         numeric(5,1),
  sleeps            integer,
  slide_outs        integer,
  gvwr_lbs          integer,
  dry_weight_lbs    integer,
  fresh_water_gal   integer,
  black_water_gal   integer,
  fuel_type         text,                           -- 'gas' | 'diesel' | 'electric' | 'na'
  mileage           integer,                        -- motorized RVs only
  engine_make       text,
  chassis           text,
  awnings           integer,
  ac_units          integer,
  generator         boolean,
  floorplan_name    text,

  -- ── Boat extension columns ────────────────────────────────
  boat_class        text,                           -- 'Pontoon' | 'Bass Boat' | 'Deck Boat' etc
  -- length_ft shared with RV
  beam_ft           numeric(5,1),
  hull_material     text,                           -- 'fiberglass' | 'aluminum' | 'wood' | 'steel'
  engine_count      integer,
  -- engine_make shared with RV
  engine_model      text,
  engine_hp         integer,
  engine_hours      integer,
  -- fuel_type shared with RV
  drive_type        text,                           -- 'inboard' | 'outboard' | 'i/o' | 'jet'
  trailer_included  boolean,
  trailer_vin       text,                           -- Boat+trailer package — channels want both
  max_capacity_persons integer,

  -- ── Motor extension columns ───────────────────────────────
  motor_hp          integer,
  shaft_length      text,                           -- 'short' | 'long' | 'extra-long'
  motor_stroke      text,                           -- '2-stroke' | '4-stroke'
  motor_weight_lbs  integer,
  warranty_months   integer,                        -- Mercury factory-direct warranty — surface on site

  -- Timestamps
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  sold_at           timestamptz,
  dms_last_seen_at  timestamptz                     -- For pending_removal detection
);

-- VIN validation (17-char alphanumeric, no I/O/Q)
create or replace function validate_vin(v text) returns boolean as $$
  select v ~ '^[A-HJ-NPR-Z0-9]{17}$'
$$ language sql immutable;

-- HIN validation (12-char, format MIC-XXXXX-YY per USCG)
create or replace function validate_hin(h text) returns boolean as $$
  select h ~ '^[A-Z]{3}[A-Z0-9]{5}[A-Z0-9]{4}$'
$$ language sql immutable;

-- Partial unique indexes for VIN/HIN per type
create unique index units_vin_unique on units (identifier)
  where identifier_type = 'vin' and identifier is not null;

create unique index units_hin_unique on units (identifier)
  where identifier_type = 'hin' and identifier is not null;

-- Search + filter indexes
create index units_unit_type_idx on units (unit_type);
create index units_status_idx on units (status);
create index units_category_idx on units (category);
create index units_make_model_idx on units (make, model);
create index units_price_idx on units (price);
create index units_year_idx on units (year);
create index units_posting_profile_idx on units (posting_profile);
create index units_updated_at_idx on units (updated_at desc);

-- Full-text search
create index units_fts_idx on units using gin (
  to_tsvector('english', coalesce(make,'') || ' ' || coalesce(model,'') || ' ' ||
    coalesce(trim,'') || ' ' || coalesce(description,'') || ' ' || coalesce(category,''))
);

-- Auto-update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger units_updated_at
  before update on units
  for each row execute function update_updated_at_column();


-- ── media ─────────────────────────────────────────────────────────────────
create table media (
  id          uuid primary key default gen_random_uuid(),
  unit_id     uuid not null references units(id) on delete cascade,
  url         text not null,
  width       integer,
  height      integer,
  sort_order  integer not null default 0,
  is_primary  boolean not null default false,
  source      text not null default 'dms',          -- 'dms' | 'manual_upload'
  created_at  timestamptz not null default now()
);

create index media_unit_id_idx on media (unit_id, sort_order);
create index media_primary_idx on media (unit_id) where is_primary = true;


-- ── audit_log ─────────────────────────────────────────────────────────────
create table audit_log (
  id          uuid primary key default gen_random_uuid(),
  unit_id     uuid references units(id) on delete set null,
  action      text not null,                        -- 'ingest_new' | 'ingest_update' | 'price_change' | 'status_change' | 'profile_change' | 'manual_override'
  actor       text not null default 'system',       -- 'system' | user email
  old_values  jsonb,
  new_values  jsonb,
  notes       text,
  created_at  timestamptz not null default now()
);

create index audit_log_unit_id_idx on audit_log (unit_id, created_at desc);
create index audit_log_action_idx on audit_log (action, created_at desc);
