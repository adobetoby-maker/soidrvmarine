-- Seed: real Southern Idaho RV & Marine inventory
-- Built by ATLAS — 2026-07-05
-- Source: soidrvmarine.com scrape — 19 RVs + 10 boats
-- Photos: Endeavor Suite CDN (bf41b29b-1565-450b-9e8b-110c69e10a95) where confirmed
-- Run: supabase db reset --linked  OR  psql $DB_URL < seed.sql

-- Clear fake demo data first
delete from media  where source = 'manual';
delete from units  where dms_id like 'rv0%' or dms_id like 'boat0%';

-- ── Units ─────────────────────────────────────────────────────────────────────
insert into units (
  dms_id, stock_number, slug, unit_type, identifier_type,
  condition, status, category, year, make, model,
  price, length_ft, sleeps, slide_outs, mileage, posting_profile
) values

-- New Keystone Hideout Travel Trailers
('rv001', 'TG240740', '2026-keystone-hideout-21bwe-new-rv001',   'rv','serial','new','active','travel-trailer',2026,'Keystone','Hideout 21BWE',  22850,24,6,1,null,'FULL'),
('rv002', 'RV002',    '2026-keystone-hideout-224mlwe-new-rv002', 'rv','serial','new','active','travel-trailer',2026,'Keystone','Hideout 224MLWE',26495,25,4,1,null,'FULL'),
('rv003', 'RV003',    '2026-keystone-hideout-262bhswe-new-rv003','rv','serial','new','active','travel-trailer',2026,'Keystone','Hideout 262BHSWE',25250,29,8,1,null,'FULL'),

-- New Keystone Passport Travel Trailers
('rv004', 'RV004',    '2026-keystone-passport-170bhwe-new-rv004', 'rv','serial','new','active','travel-trailer',2026,'Keystone','Passport 170BHWE', 22495,20,6,0,null,'FULL'),
('rv005', 'RV005',    '2026-keystone-passport-210rkcwe-new-rv005','rv','serial','new','active','travel-trailer',2026,'Keystone','Passport 210RKCWE',27250,24,4,1,null,'FULL'),
('rv006', 'RV006',    '2026-keystone-passport-229bhwe-new-rv006', 'rv','serial','new','active','travel-trailer',2026,'Keystone','Passport 229BHWE', 32995,26,8,1,null,'FULL'),
('rv007', 'RV007',    '2026-keystone-passport-2450rkwe-new-rv007','rv','serial','new','active','travel-trailer',2026,'Keystone','Passport 2450RKWE',33450,27,4,1,null,'FULL'),
('rv008', 'RV008',    '2026-keystone-passport-253rd-new-rv008',   'rv','serial','new','active','travel-trailer',2026,'Keystone','Passport 253RD',   34250,28,6,1,null,'FULL'),
('rv009', 'RV009',    '2026-keystone-passport-2605rb-new-rv009',  'rv','serial','new','active','travel-trailer',2026,'Keystone','Passport 2605RB',  38900,30,4,2,null,'FULL'),

-- New Forest River Palomino Pop-Up Campers
('rv010', 'RV010',    '2026-forest-river-palomino-rcss-1605-new-rv010','rv','serial','new','active','pop-up-camper',2026,'Forest River','Palomino RCSS-1605',18313,16,6,0,null,'FULL'),
('rv011', 'RV011',    '2026-forest-river-palomino-szss-1240-new-rv011','rv','serial','new','active','pop-up-camper',2026,'Forest River','Palomino SZSS-1240',19420,12,4,0,null,'FULL'),
('rv012', 'RV012',    '2026-forest-river-palomino-szss-500-new-rv012', 'rv','serial','new','active','pop-up-camper',2026,'Forest River','Palomino SZSS-500', 16420,10,4,0,null,'FULL'),
('rv013', 'RV013',    '2026-forest-river-palomino-szss-550-new-rv013', 'rv','serial','new','active','pop-up-camper',2026,'Forest River','Palomino SZSS-550', 18923,11,5,0,null,'FULL'),

-- Used RVs
('rv014', 'RV014',    '2022-heartland-bighorn-37tb-used-rv014',      'rv','serial','used','active','fifth-wheel',   2022,'Heartland',  'Bighorn 37TB',    38850,42,6,4,null,'FULL'),
('rv015', 'RV015',    '2020-crossroads-cruiser-22bbh-used-rv015',    'rv','serial','used','active','travel-trailer',2020,'CrossRoads', 'Cruiser 22BBH',   21750,25,6,1,null,'FULL'),
('rv016', 'RV016',    '2021-keystone-coleman-2715rl-used-rv016',     'rv','serial','used','active','travel-trailer',2021,'Keystone',   'Coleman 2715RL',  19350,30,4,1,null,'FULL'),
('rv017', 'RV017',    '2023-jayco-jay-flight-265th-used-rv017',      'rv','serial','used','active','travel-trailer',2023,'Jayco',      'Jay Flight 265TH',20950,29,8,2,null,'FULL'),
('rv018', 'RV018',    '2020-keystone-bullet-243bhswe-used-rv018',    'rv','serial','used','active','travel-trailer',2020,'Keystone',   'Bullet 243BHSWE', null, 27,8,1,null,'FULL'),
('rv019', 'RV019',    '2019-grand-design-imagine-3170bh-used-rv019', 'rv','serial','used','active','travel-trailer',2019,'Grand Design','Imagine 3170BH',  20950,35,10,2,null,'FULL'),

-- New MirroCraft Aluminum Fishing Boats
('boat001','BOAT001', '2026-mirrocraft-f176-new-boat001',       'boat','hin','new','active','fishing',2026,'MirroCraft','F176',          40977,17,null,null,null,'FULL'),
('boat002','BOAT002', '2026-mirrocraft-f1768-new-boat002',      'boat','hin','new','active','fishing',2026,'MirroCraft','F1768',         40749,17,null,null,null,'FULL'),
('boat003','BOAT003', '2026-mirrocraft-f1768-blk-new-boat003',  'boat','hin','new','active','fishing',2026,'MirroCraft','F1768 BLK Edition',40017,17,null,null,null,'FULL'),

-- New Montego Bay Pontoons
('boat004','BOAT004', '2026-montego-bay-c8516-new-boat004',     'boat','hin','new','active','pontoon',2026,'Montego Bay','C8516',        31668,16,null,null,null,'FULL'),
('boat005','BOAT005', '2026-montego-bay-f8518-new-boat005',     'boat','hin','new','active','pontoon',2026,'Montego Bay','F8518',        31166,18,null,null,null,'FULL'),
('boat006','BOAT006', '2026-montego-bay-f8522-new-boat006',     'boat','hin','new','active','pontoon',2026,'Montego Bay','F8522',        38889,22,null,null,null,'FULL'),
('boat007','BOAT007', '2026-montego-bay-tt8524-new-boat007',    'boat','hin','new','active','pontoon',2026,'Montego Bay','TT8524 Tritoon',75966,24,null,null,null,'FULL'),

-- Used Boats
('boat008','BOAT008', '2023-mirrocraft-f1628h-used-boat008',    'boat','hin','used','active','fishing',2023,'MirroCraft','F1628H',       17950,16,null,null,null,'FULL'),
('boat009','BOAT009', '2017-mirrocraft-laker-used-boat009',     'boat','hin','used','active','fishing',2017,'MirroCraft','Laker',         8995,14,null,null,null,'FULL'),
('boat010','BOAT010', '2005-bayliner-195cl-used-boat010',       'boat','hin','used','active','pontoon',2005,'Bayliner',  '195CL',         5995,19,null,null,null,'FULL')

on conflict (dms_id) do update set
  stock_number  = excluded.stock_number,
  slug          = excluded.slug,
  condition     = excluded.condition,
  status        = excluded.status,
  category      = excluded.category,
  year          = excluded.year,
  make          = excluded.make,
  model         = excluded.model,
  price         = excluded.price,
  length_ft     = excluded.length_ft,
  sleeps        = excluded.sleeps,
  slide_outs    = excluded.slide_outs,
  mileage       = excluded.mileage,
  posting_profile = excluded.posting_profile;

-- ── Media (primary photos — Endeavor Suite CDN where confirmed) ────────────────
insert into media (unit_id, url, sort_order, is_primary, source)
select u.id,
  case u.dms_id
    -- CDN photos confirmed from dealer site
    when 'rv003'    then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14102224/7b08527f-22da-42a2-9bb0-42cda7be18d3.jpeg'
    when 'rv006'    then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14105237/baec1d20-0278-45e5-b579-c6d567a8ee08.jpeg'
    when 'rv007'    then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14375679/fb64fef3-834d-427d-880f-ab03a787a5e9.jpeg'
    when 'rv013'    then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14153799/810d8cb9-b3ff-4c5c-b1b3-e04be000a7ff.jpeg'
    when 'rv014'    then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14334871/c3cf23b3-c218-47fc-9d03-ea8a6411498a.jpeg'
    when 'rv016'    then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14203938/4858a129-b785-4b3f-bcfb-6ed74ea8d148.jpeg'
    when 'rv017'    then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13674851/dbe6d682-a94f-48d3-b537-69f2969fdbd9.jpeg'
    when 'rv018'    then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13602801/0ee5c9d7-ec2d-45b2-990b-35431f18be75.jpeg'
    when 'rv019'    then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14313231/0231c18b-b860-4374-b0d9-e8268ec61384.jpeg'
    when 'boat001'  then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13844153/3d894568-6112-4531-b3aa-b912c478eb5b.jpeg'
    when 'boat004'  then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13800664/721a2c73-de8e-4279-9d0c-18e5c5b6dd3d.jpeg'
    when 'boat007'  then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13844149/35968e09-4486-427a-b059-a86a86686609.jpeg'
    when 'boat008'  then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14094529/a595531c-9b08-49b3-871e-10631aef6e03.jpeg'
    when 'boat009'  then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/12892042/0de041af-1761-4364-9895-4fe999a11e51.jpeg'
    when 'boat010'  then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14203148/3fbe1330-f1d8-492c-be2d-d6bd90340354.jpeg'
    -- Picsum fallback for units without confirmed CDN photo IDs yet
    when 'rv001'    then 'https://picsum.photos/id/167/800/560'
    when 'rv002'    then 'https://picsum.photos/id/250/800/560'
    when 'rv004'    then 'https://picsum.photos/id/64/800/560'
    when 'rv005'    then 'https://picsum.photos/id/131/800/560'
    when 'rv008'    then 'https://picsum.photos/id/12/800/560'
    when 'rv009'    then 'https://picsum.photos/id/257/800/560'
    when 'rv010'    then 'https://picsum.photos/id/91/800/560'
    when 'rv011'    then 'https://picsum.photos/id/197/800/560'
    when 'rv012'    then 'https://picsum.photos/id/236/800/560'
    when 'rv015'    then 'https://picsum.photos/id/317/800/560'
    when 'boat002'  then 'https://picsum.photos/id/119/800/560'
    when 'boat003'  then 'https://picsum.photos/id/158/800/560'
    when 'boat005'  then 'https://picsum.photos/id/15/800/560'
    when 'boat006'  then 'https://picsum.photos/id/174/800/560'
  end as url,
  0 as sort_order,
  true as is_primary,
  'manual' as source
from units u
where u.dms_id in (
  'rv001','rv002','rv003','rv004','rv005','rv006','rv007','rv008','rv009',
  'rv010','rv011','rv012','rv013','rv014','rv015','rv016','rv017','rv018','rv019',
  'boat001','boat002','boat003','boat004','boat005','boat006','boat007',
  'boat008','boat009','boat010'
)
on conflict do nothing;
