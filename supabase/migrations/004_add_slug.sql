-- Migration 004: Add slug column for URL-friendly unit identifiers
-- Built by ATLAS — 2026-07-04

alter table units add column if not exists slug text unique;

-- Index for slug-based lookups (detail pages)
create index if not exists units_slug_idx on units (slug);
