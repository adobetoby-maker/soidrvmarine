-- Seed: current static inventory → units + media tables
-- Built by ATLAS — 2026-07-04
-- Source: src/lib/inventory.ts (14 RVs + 2 boats)

insert into units (
  dms_id, stock_number, slug, unit_type, identifier_type,
  condition, status, category, year, make, model,
  price, length_ft, sleeps, slide_outs, mileage, posting_profile
) values

-- ── RVs ───────────────────────────────────────────────────────────────────
('rv001', 'RV001', '2025-grand-design-reflection-311bhs-rv001', 'rv', 'serial',
  'new', 'active', 'fifth-wheel', 2025, 'Grand Design', 'Reflection 311BHS',
  74995, 37, 10, 4, null, 'FULL'),

('rv002', 'RV002', '2024-keystone-montana-3855br-rv002', 'rv', 'serial',
  'used', 'active', 'fifth-wheel', 2024, 'Keystone', 'Montana 3855BR',
  58500, 43, 8, 4, null, 'FULL'),

('rv003', 'RV003', '2025-forest-river-rockwood-2516s-rv003', 'rv', 'serial',
  'new', 'active', 'travel-trailer', 2025, 'Forest River', 'Rockwood 2516S',
  42900, 29, 6, 1, null, 'FULL'),

('rv004', 'RV004', '2025-keystone-cougar-22rbs-rv004', 'rv', 'serial',
  'new', 'active', 'travel-trailer', 2025, 'Keystone', 'Cougar 22RBS',
  31500, 26, 5, 1, null, 'FULL'),

('rv005', 'RV005', '2025-thor-windsport-34j-rv005', 'rv', 'serial',
  'new', 'active', 'class-a', 2025, 'Thor Motor Coach', 'Windsport 34J',
  159995, 34, 7, 3, 0, 'FULL'),

('rv006', 'RV006', '2023-jayco-eagle-ht-284bhok-rv006', 'rv', 'serial',
  'used', 'active', 'travel-trailer', 2023, 'Jayco', 'Eagle HT 284BHOK',
  36750, 32, 10, 2, null, 'FULL'),

('rv007', 'RV007', '2024-coachmen-leprechaun-319mb-rv007', 'rv', 'serial',
  'used', 'active', 'class-c', 2024, 'Coachmen', 'Leprechaun 319MB',
  78000, 32, 8, 2, 18400, 'FULL'),

('rv008', 'RV008', '2025-heartland-bighorn-3985-rv008', 'rv', 'serial',
  'new', 'active', 'fifth-wheel', 2025, 'Heartland', 'Bighorn 3985',
  89995, 44, 6, 5, null, 'FULL'),

('rv009', 'RV009', '2023-winnebago-minnie-winnie-22m-rv009', 'rv', 'serial',
  'used', 'active', 'class-c', 2023, 'Winnebago', 'Minnie Winnie 22M',
  64500, 22, 4, 0, 31200, 'FULL'),

('rv010', 'RV010', '2024-lance-1685-rv010', 'rv', 'serial',
  'used', 'active', 'travel-trailer', 2024, 'Lance', '1685',
  28900, 21, 4, 0, null, 'FULL'),

('rv011', 'RV011', '2025-outdoors-rv-timber-ridge-24rks-rv011', 'rv', 'serial',
  'new', 'active', 'travel-trailer', 2025, 'Outdoors RV', 'Timber Ridge 24RKS',
  55900, 29, 6, 2, null, 'FULL'),

('rv012', 'RV012', '2024-grand-design-imagine-xls-17mke-rv012', 'rv', 'serial',
  'used', 'active', 'travel-trailer', 2024, 'Grand Design', 'Imagine XLS 17MKE',
  27500, 22, 4, 1, null, 'FULL'),

('rv013', 'RV013', '2025-keystone-fuzion-427-rv013', 'rv', 'serial',
  'new', 'active', 'toy-hauler', 2025, 'Keystone', 'Fuzion 427',
  94500, 46, 8, 3, null, 'FULL'),

('rv014', 'RV014', '2024-east-to-west-tandara-340rl-rv014', 'rv', 'serial',
  'used', 'active', 'fifth-wheel', 2024, 'East to West', 'Tandara 340RL',
  49900, 38, 6, 3, null, 'FULL'),

-- ── Boats ─────────────────────────────────────────────────────────────────
('boat001', 'BOAT001', '2025-bennington-22slxp-boat001', 'boat', 'serial',
  'new', 'active', 'pontoon', 2025, 'Bennington', '22 SLXP',
  42900, 22, null, null, null, 'FULL'),

('boat002', 'BOAT002', '2024-tracker-pro-175txw-boat002', 'boat', 'serial',
  'used', 'active', 'bass-boat', 2024, 'Tracker', 'Pro 175 TXW',
  18750, null, null, null, null, 'FULL')

on conflict (dms_id) do nothing;

-- ── Media (primary photos — picsum IDs matching inventory.ts) ─────────────
insert into media (unit_id, url, sort_order, is_primary, source)
select u.id,
  case u.dms_id
    when 'rv001'   then 'https://picsum.photos/id/244/800/560'
    when 'rv002'   then 'https://picsum.photos/id/338/800/560'
    when 'rv003'   then 'https://picsum.photos/id/28/800/560'
    when 'rv004'   then 'https://picsum.photos/id/67/800/560'
    when 'rv005'   then 'https://picsum.photos/id/165/800/560'
    when 'rv006'   then 'https://picsum.photos/id/398/800/560'
    when 'rv007'   then 'https://picsum.photos/id/417/800/560'
    when 'rv008'   then 'https://picsum.photos/id/442/800/560'
    when 'rv009'   then 'https://picsum.photos/id/437/800/560'
    when 'rv010'   then 'https://picsum.photos/id/180/800/560'
    when 'rv011'   then 'https://picsum.photos/id/167/800/560'
    when 'rv012'   then 'https://picsum.photos/id/257/800/560'
    when 'rv013'   then 'https://picsum.photos/id/282/800/560'
    when 'rv014'   then 'https://picsum.photos/id/317/800/560'
    when 'boat001' then 'https://picsum.photos/id/67/800/560'
    when 'boat002' then 'https://picsum.photos/id/167/800/560'
  end as url,
  0 as sort_order,
  true as is_primary,
  'manual' as source
from units u
where u.dms_id in (
  'rv001','rv002','rv003','rv004','rv005','rv006','rv007','rv008',
  'rv009','rv010','rv011','rv012','rv013','rv014','boat001','boat002'
)
on conflict do nothing;
