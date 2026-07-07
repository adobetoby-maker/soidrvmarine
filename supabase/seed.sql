-- Seed: real Southern Idaho RV & Marine inventory
-- Built by ATLAS — 2026-07-05, expanded 2026-07-07 (WS2 — inventory parity pass)
-- Source: soidrvmarine.com live scrape — New RV (28) + New Marine (7) + Used RV (21) + Used Marine (11) = 67 units,
-- matching the live site's own "1-30 of 67" total exactly. Nothing invented — see src/lib/inventory.ts header comment.
-- Photos: Endeavor Suite CDN (bf41b29b-1565-450b-9e8b-110c69e10a95) where confirmed; a small number of listings
-- (noted inline) have no real photo on the dealer's own site and keep a labeled Picsum placeholder.
-- Powersports and Used Outboard Motors are real nav categories on the live site but returned zero live units
-- on every filtered URL tried during this scrape (see CONTENT-NEEDED.md) — no rows seeded for either.
-- Run: supabase db reset --linked  OR  psql $DB_URL < seed.sql
-- BLAST-RADIUS: this file only authors SQL. Do NOT run against the live DB without a fresh receipt
-- at ~/.atlas/blast-radius/<host>.md (tenant column, shared-by, rows-affected, backup) per PRD §4.

-- Clear fake demo data first
delete from media  where source = 'manual';
delete from units  where dms_id like 'rv%' or dms_id like 'boat%';

-- ── Units ─────────────────────────────────────────────────────────────────────
insert into units (
  dms_id, stock_number, slug, unit_type, identifier_type,
  condition, status, category, year, make, model,
  price, length_ft, sleeps, slide_outs, mileage, posting_profile
) values
('rv001', 'TG240740', '2026-keystone-hideout-21bwe-new-rv001', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Hideout 21BWE', 22850, 24, 6, 1, null, 'FULL'),
('rv002', 'TG240223', '2026-keystone-hideout-224mlwe-new-rv002', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Hideout 224MLWE', 26495, 25, 4, 1, null, 'FULL'),
('rv020', 'TG240224', '2026-keystone-hideout-224mlwe-new-tg240224', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Hideout 224MLWE', 26495, 25, 4, 1, null, 'FULL'),
('rv003', 'TG242638', '2026-keystone-hideout-262bhswe-new-rv003', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Hideout 262BHSWE', 25250, 29, 8, 1, null, 'FULL'),
('rv021', 'TG242706', '2026-keystone-hideout-262bhswe-new-tg242706', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Hideout 262BHSWE', 25250, 29, 8, 1, null, 'FULL'),
('rv022', 'TG242707', '2026-keystone-hideout-262bhswe-new-tg242707', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Hideout 262BHSWE', 25250, 29, 8, 1, null, 'FULL'),
('rv023', 'TG242730', '2026-keystone-hideout-288brswe-new-tg242730', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Hideout 288BRSWE', 30950, null, null, null, null, 'FULL'),
('rv024', 'TG240508', '2026-keystone-hideout-291brwe-new-tg240508', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Hideout 291BRWE', 29850, null, null, null, null, 'FULL'),
('rv004', 'TX410072', '2026-keystone-passport-170bhwe-new-rv004', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Passport 170BHWE', 22495, 20, 6, 0, null, 'FULL'),
('rv005', 'TC411173', '2026-keystone-passport-210rkcwe-new-rv005', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Passport 210RKCWE', 27250, 24, 4, 1, null, 'FULL'),
('rv006', 'TC411197', '2026-keystone-passport-229bhwe-new-rv006', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Passport 229BHWE', 32995, 26, 8, 1, null, 'FULL'),
('rv007', 'TC411525', '2026-keystone-passport-2450rkwe-new-rv007', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Passport 2450RKWE', 33450, 27, 4, 1, null, 'FULL'),
('rv008', 'TC410702', '2026-keystone-passport-253rdwe-new-rv008', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Passport 253RDWE', 34250, 28, 6, 1, null, 'FULL'),
('rv025', 'TD410247', '2026-keystone-passport-2605rb-new-td410247', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Passport 2605RB', 39750, 30, 4, 2, null, 'FULL'),
('rv009', 'TC410892', '2026-keystone-passport-2605rbwe-new-rv009', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Passport 2605RBWE', 38900, 30, 4, 2, null, 'FULL'),
('rv026', 'TC411145', '2026-keystone-passport-260bhcwe-new-tc411145', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Passport 260BHCWE', 30495, null, null, null, null, 'FULL'),
('rv027', 'TC411157', '2026-keystone-passport-260bhcwe-new-tc411157', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Passport 260BHCWE', 30495, null, null, null, null, 'FULL'),
('rv028', 'TC411156', '2026-keystone-passport-260bhcwe-new-tc411156', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Passport 260BHCWE', 30495, null, null, null, null, 'FULL'),
('rv029', 'TC411514', '2026-keystone-passport-284qbcwe-new-tc411514', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Passport 284QBCWE', 32250, null, null, null, null, 'FULL'),
('rv030', 'TC411515', '2026-keystone-passport-284qbcwe-new-tc411515', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Passport 284QBCWE', 32250, null, null, null, null, 'FULL'),
('rv031', 'TC411227', '2026-keystone-passport-2900bhwe-new-tc411227', 'rv', 'serial', 'new', 'active', 'travel-trailer', 2026, 'Keystone', 'Passport 2900BHWE', 41500, null, null, null, null, 'FULL'),
('rv010', 'TN120468', '2026-forest-river-palomino-rcss-1605-new-rv010', 'rv', 'serial', 'new', 'active', 'pop-up-camper', 2026, 'Forest River', 'Palomino RCSS-1605', 18313, 16, 6, 0, null, 'FULL'),
('rv011', 'TN120300', '2026-forest-river-palomino-szss-1240-new-rv011', 'rv', 'serial', 'new', 'active', 'pop-up-camper', 2026, 'Forest River', 'Palomino SZSS-1240', 19420, 12, 4, 0, null, 'FULL'),
('rv012', 'TN120610', '2026-forest-river-palomino-szss-500-new-rv012', 'rv', 'serial', 'new', 'active', 'pop-up-camper', 2026, 'Forest River', 'Palomino SZSS-500', 16420, 10, 4, 0, null, 'FULL'),
('rv032', 'TN120374', '2026-forest-river-palomino-szss-500-new-tn120374', 'rv', 'serial', 'new', 'active', 'pop-up-camper', 2026, 'Forest River', 'Palomino SZSS-500', 16420, 10, 4, 0, null, 'FULL'),
('rv013', 'TN120834', '2026-forest-river-palomino-szss-550-new-tn120834', 'rv', 'serial', 'new', 'active', 'pop-up-camper', 2026, 'Forest River', 'Palomino SZSS-550', 21006, 11, 5, 0, null, 'FULL'),
('rv033', 'TN120238', '2026-forest-river-palomino-szss-550-new-tn120238', 'rv', 'serial', 'new', 'active', 'pop-up-camper', 2026, 'Forest River', 'Palomino SZSS-550', 18923, 11, 5, 0, null, 'FULL'),
('rv034', 'TN120622', '2026-forest-river-palomino-szss-550-new-tn120622', 'rv', 'serial', 'new', 'active', 'pop-up-camper', 2026, 'Forest River', 'Palomino SZSS-550', 18923, 11, 5, 0, null, 'FULL'),
('rv014', 'NE506743', '2022-heartland-bighorn-37tb-used-rv014', 'rv', 'serial', 'used', 'active', 'fifth-wheel', 2022, 'Heartland', 'Bighorn 37TB', 38850, 42, 6, 4, null, 'FULL'),
('rv015', 'N6320667TR', '2022-crossroads-cruiser-22bbh-used-rv015', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2022, 'CrossRoads', 'Cruiser 22BBH', 21750, 25, 6, 1, null, 'FULL'),
('rv016', 'MM932044', '2021-keystone-coleman-2715rl-used-rv016', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2021, 'Keystone', 'Coleman 2715RL', 19350, 30, 4, 1, null, 'FULL'),
('rv017', 'P7780056', '2023-jayco-jay-flight-265th-used-rv017', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2023, 'Jayco', 'Jay Flight 265TH', 20950, 29, 8, 2, null, 'FULL'),
('rv018', 'LX433546', '2020-keystone-bullet-243bhswe-used-rv018', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2020, 'Keystone', 'Bullet 243BHSWE', 17450, 27, 8, 1, null, 'FULL'),
('rv019', 'K6612082', '2019-grand-design-imagine-3170bh-used-rv019', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2019, 'Grand Design', 'Imagine 3170BH', 20950, 35, 10, 2, null, 'FULL'),
('rv035', 'RW102201', '2024-keystone-springdale-1700fq-used-rw102201', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2024, 'Keystone', 'Springdale 1700FQ', 13950, null, null, null, null, 'FULL'),
('rv036', 'NG103988TR', '2022-keystone-springdale-295bhwe-used-ng103988tr', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2022, 'Keystone', 'Springdale 295BHWE', 19450, null, null, null, null, 'FULL'),
('rv037', 'NB520947', '2022-forest-river-primetime-tracer-260bhsle-used-nb520947', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2022, 'Forest River', 'Primetime Tracer 260BHSLE', 18950, null, null, null, null, 'FULL'),
('rv038', 'NE499145', '2022-heartland-torque-t333-used-ne499145', 'rv', 'serial', 'used', 'active', 'toy-hauler', 2022, 'Heartland', 'Torque T333', 39850, null, null, null, null, 'FULL'),
('rv039', 'M9133282', '2021-forest-river-cherokee-grey-wolf-23mk-used-m9133282', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2021, 'Forest River', 'Cherokee Grey Wolf 23MK', 19550, null, null, null, null, 'FULL'),
('rv040', 'ME461163', '2021-heartland-road-warrior-3965rw-used-me461163', 'rv', 'serial', 'used', 'active', 'toy-hauler', 2021, 'Heartland', 'Road Warrior 3965RW', 48650, null, null, null, null, 'FULL'),
('rv041', 'L1J50060', '2020-jayco-jay-feather-23rbm-used-l1j50060', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2020, 'Jayco', 'Jay Feather 23RBM', 14850, null, null, null, null, 'FULL'),
('rv042', 'KR017159', '2019-eclipse-attitude-231sa-used-kr017159', 'rv', 'serial', 'used', 'active', 'toy-hauler', 2019, 'Eclipse', 'Attitude 231SA', 21500, null, null, null, null, 'FULL'),
('rv043', 'KY931118', '2019-keystone-coleman-17rdwe-used-ky931118', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2019, 'Keystone', 'Coleman 17RDWE', 7750, null, null, null, null, 'FULL'),
('rv044', 'JG600140', '2018-forest-river-impression-26ret-used-jg600140', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2018, 'Forest River', 'Impression 26RET', 23995, null, null, null, null, 'FULL'),
('rv045', 'FJ531963', '2015-airstream-sport-22fb-used-fj531963', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2015, 'Airstream', 'Sport 22FB', 38750, null, null, null, null, 'FULL'),
('rv046', 'NJ973348', '2022-keystone-kodiak-250bhsl-used-nj973348', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2022, 'Keystone', 'Kodiak 250BHSL', 23850, null, null, null, null, 'FULL'),
('rv047', 'B1JZ5205TR', '2011-starcraft-travel-star-176rb-sport-used-b1jz5205tr', 'rv', 'serial', 'used', 'active', 'travel-trailer', 2011, 'Starcraft', 'Travel Star 176RB Sport', 7850, null, null, null, null, 'FULL'),
('rv048', 'RC002764', '1994-cobra-industries-sandpiper-used-rc002764', 'rv', 'serial', 'used', 'active', 'travel-trailer', 1994, 'Cobra Industries', 'Sandpiper', 4950, null, null, null, null, 'FULL'),
('rv049', 'GN044938', '2016-cb-doatv816-5ta-used-gn044938', 'rv', 'serial', 'used', 'active', 'utility-trailer', 2016, 'C&B', 'DOATV816-5TA', 2850, null, null, null, null, 'FULL'),
('boat001', '3841J526', '2026-mirrocraft-f176-new-boat001', 'boat', 'hin', 'new', 'active', 'fishing', 2026, 'MirroCraft', 'F176', 40977, 17, null, null, null, 'FULL'),
('boat002', '3857J526', '2026-mirrocraft-f1768-new-boat002', 'boat', 'hin', 'new', 'active', 'fishing', 2026, 'MirroCraft', 'F1768', 40749, 17, null, null, null, 'FULL'),
('boat003', '3799I526', '2026-mirrocraft-f1768-blk-new-boat003', 'boat', 'hin', 'new', 'active', 'fishing', 2026, 'MirroCraft', 'F1768 BLK Edition', 40017, 17, null, null, null, 'FULL'),
('boat004', '3865J526', '2026-montego-bay-c8516-new-boat004', 'boat', 'hin', 'new', 'active', 'pontoon', 2026, 'Montego Bay', 'C8516', 31668, 16, null, null, null, 'FULL'),
('boat005', '3868J526', '2026-montego-bay-f8518-new-boat005', 'boat', 'hin', 'new', 'active', 'pontoon', 2026, 'Montego Bay', 'F8518', 31166, 18, null, null, null, 'FULL'),
('boat006', '3884K526', '2026-montego-bay-f8522-new-boat006', 'boat', 'hin', 'new', 'active', 'pontoon', 2026, 'Montego Bay', 'F8522', 38889, 22, null, null, null, 'FULL'),
('boat007', '3849J526', '2026-montego-bay-tt8524-new-boat007', 'boat', 'hin', 'new', 'active', 'pontoon', 2026, 'Montego Bay', 'TT8524 Tritoon', 75966, 24, null, null, null, 'FULL'),
('boat008', '1268A323TR', '2023-mirrocraft-f1628h-used-boat008', 'boat', 'hin', 'used', 'active', 'fishing', 2023, 'MirroCraft', 'F1628H', 17950, 16, null, null, null, 'FULL'),
('boat009', '3944K617TR', '2017-mirrocraft-laker-used-boat009', 'boat', 'hin', 'used', 'active', 'fishing', 2017, 'MirroCraft', 'Laker', 8995, 14, null, null, null, 'FULL'),
('boat010', '75CLG405', '2005-bayliner-195cl-used-boat010', 'boat', 'hin', 'used', 'active', 'pontoon', 2005, 'Bayliner', '195CL', 5995, 19, null, null, null, 'FULL'),
('boat011', '2604K122', '2022-starweld-starcraft-19-flex-pro-used-2604k122', 'boat', 'hin', 'used', 'active', 'fishing', 2022, 'Starweld', 'Starcraft 19 Flex Pro', null, 19, null, null, null, 'FULL'),
('boat012', '9912D121', '2021-smoker-craft-ultima-182-used-9912d121', 'boat', 'hin', 'used', 'active', 'fishing', 2021, 'Smoker Craft', 'Ultima 182', 33450, 18, null, null, null, 'FULL'),
('boat013', 'F301F920', '2020-lund-2025-impact-xs-used-f301f920', 'boat', 'hin', 'used', 'active', 'fishing', 2020, 'Lund', '2025 Impact XS', null, 20, null, null, null, 'FULL'),
('boat014', '6700H718', '2018-mb-sports-tomcat-f22-classic-used-6700h718', 'boat', 'hin', 'used', 'active', 'fishing', 2018, 'MB Sports', 'Tomcat F22 Classic', 58450, 22, null, null, null, 'FULL'),
('boat015', '5267D616', '2016-tracker-marine-targa-v-18-combo-used-5267d616', 'boat', 'hin', 'used', 'active', 'fishing', 2016, 'Tracker Marine', 'Targa V-18 Combo', 25500, 18, null, null, null, 'FULL'),
('boat016', '5137L102P2', '2002-fish-rite-custom-jetboat-used-5137l102p2', 'boat', 'hin', 'used', 'active', 'fishing', 2002, 'Fish Rite Boats', 'Custom Jetboat', 38250, null, null, null, null, 'FULL'),
('boat017', '0987L899', '1999-crestliner-1850-sportfish-used-0987l899', 'boat', 'hin', 'used', 'active', 'fishing', 1999, 'Crestliner', '1850 Sportfish', 2400, 18, null, null, null, 'FULL'),
('boat018', '3192E797', '1997-sea-doo-sportster-used-3192e797', 'boat', 'hin', 'used', 'active', 'fishing', 1997, 'Sea-Doo Sport Boats', 'Sportster', 2500, null, null, null, null, 'FULL')

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

-- ── Media (primary photos — Endeavor Suite CDN where confirmed; Picsum placeholder noted inline) ──
insert into media (unit_id, url, sort_order, is_primary, source)
select u.id,
  case u.dms_id
    when 'rv001' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13625754/28f4c2be-ce12-4220-9b68-1195e4ebb127.jpeg'
    when 'rv002' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13481732/a4ee0f19-87f5-4a57-ad2a-84521bc1548a.jpeg'
    when 'rv020' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13501515/c6fe154a-fb0c-4ef4-bbfa-f766e853f9f9.jpeg'
    when 'rv003' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14102224/7b08527f-22da-42a2-9bb0-42cda7be18d3.jpeg'
    when 'rv021' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14153798/d5101ca0-0f44-4cbf-a93a-1f10153d15b3.jpeg'
    when 'rv022' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14186812/29798807-86fe-49d8-a88d-2f918878e6e2.jpeg'
    when 'rv023' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14313209/25ea8c1f-787d-40a0-a8cf-e7cef88196be.jpeg'
    when 'rv024' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13537012/1a21d9d2-f488-4653-b1e7-43223a3780f7.jpeg'
    when 'rv004' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13477275/354b518e-3d2e-454d-a111-a1f369a50bd3.jpeg'
    when 'rv005' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14186825/559dbaf0-7449-4856-a285-54502e1b5594.jpeg'
    when 'rv006' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14105237/baec1d20-0278-45e5-b579-c6d567a8ee08.jpeg'
    when 'rv007' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14375679/fb64fef3-834d-427d-880f-ab03a787a5e9.jpeg'
    when 'rv008' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13629231/879e40c6-c46d-4d9b-9e74-f9d3871f94e4.jpeg'
    when 'rv025' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13524400/3b328619-3b10-44a8-9c3d-187cc47a92a7.jpeg'
    when 'rv009' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14186841/a00c08ac-7e34-4808-b64a-12ee53d8f5d7.jpeg'
    when 'rv026' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14073766/b351ed05-94ba-4c81-9769-58d63490867e.jpeg'
    when 'rv027' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14186835/302f899d-9c10-44e5-94fe-73bcc7b68072.jpeg'
    when 'rv028' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14186838/8403864b-9589-4d4c-a0ea-0aec451f8a47.jpeg'
    when 'rv029' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14375683/52c2e680-f6a7-4591-a9a7-d51838831073.jpeg'
    when 'rv030' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14375685/a4d3f968-645e-4c91-8959-2293b9f3e39f.jpeg'
    when 'rv031' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14375680/4a7a485d-29c9-470f-b6b3-c03a0da3779b.jpeg'
    when 'rv010' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13893186/1aeb7c49-afd3-4789-b14a-8a9e466ac61f.jpeg'
    when 'rv011' then 'https://picsum.photos/id/197/600/420'
    when 'rv012' then 'https://picsum.photos/id/236/600/420'
    when 'rv032' then 'https://picsum.photos/id/236/600/420'
    when 'rv013' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14153799/810d8cb9-b3ff-4c5c-b1b3-e04be000a7ff.jpeg'
    when 'rv033' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14313191/5e93bf9e-f96b-4755-8cfe-54bbc0a6bf21.jpeg'
    when 'rv034' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14313206/789980db-3ab6-4c73-a6a5-7f850449f48c.jpeg'
    when 'rv014' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14334871/c3cf23b3-c218-47fc-9d03-ea8a6411498a.jpeg'
    when 'rv015' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13513659/76005a74-989b-4191-aa7b-13e33e465afa.jpeg'
    when 'rv016' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14203938/4858a129-b785-4b3f-bcfb-6ed74ea8d148.jpeg'
    when 'rv017' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13674851/dbe6d682-a94f-48d3-b537-69f2969fdbd9.jpeg'
    when 'rv018' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13602801/0ee5c9d7-ec2d-45b2-990b-35431f18be75.jpeg'
    when 'rv019' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14313231/0231c18b-b860-4374-b0d9-e8268ec61384.jpeg'
    when 'rv035' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13513661/47d774e1-d7d7-40ee-974f-9087dfa1854c.jpeg'
    when 'rv036' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13602810/2414acf0-b867-469b-a536-ab817867b003.jpeg'
    when 'rv037' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14105230/762dfb0e-ed39-4b9c-a682-bf89f44cfd57.jpeg'
    when 'rv038' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14313227/cfc8be50-f0aa-4e80-ae53-52ab1bcf3015.jpeg'
    when 'rv039' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13917994/f6f63658-8894-440f-92f5-2676936e0404.jpeg'
    when 'rv040' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14313168/fb310c53-78ba-43a0-8aca-ef11dfb8afc0.jpeg'
    when 'rv041' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/12988774/7b7e88d1-4080-4591-a92c-1171df15b8aa.jpeg'
    when 'rv042' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14221936/8d1bf675-c628-4292-9630-fe29b045d7eb.jpeg'
    when 'rv043' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14313234/f741eba1-07f7-4344-88b5-17020ed86fa8.jpeg'
    when 'rv044' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14334872/119c9277-c1ea-4d25-9c9f-afe721155ee4.jpeg'
    when 'rv045' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14303446/a4fe71d3-7e79-4909-8b40-6dc670354fb0.jpeg'
    when 'rv046' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14105250/a39ebf13-f285-47e7-bb7e-adcc76f7d899.jpeg'
    when 'rv047' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/12215773/a115509f-2734-4ddb-9ea3-692046c1c9c5.jpeg'
    when 'rv048' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/12714617/564137e4-cde7-4b71-a771-20f8f7675e58.jpeg'
    when 'rv049' then 'https://picsum.photos/id/1084/600/420'
    when 'boat001' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13844153/3d894568-6112-4531-b3aa-b912c478eb5b.jpeg'
    when 'boat002' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13852859/180e7cc6-bd7f-4e40-b8c7-997a5a146e48.jpeg'
    when 'boat003' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13692385/77b22bde-1403-4a2e-a634-e8df332e8998.jpeg'
    when 'boat004' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13800664/721a2c73-de8e-4279-9d0c-18e5c5b6dd3d.jpeg'
    when 'boat005' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13800665/e79e0857-c1ea-4866-9981-b845b4f4b7e7.jpeg'
    when 'boat006' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13852851/6e864d03-5fc9-4d97-a11c-bfa7279f1dc9.jpeg'
    when 'boat007' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13844149/35968e09-4486-427a-b059-a86a86686609.jpeg'
    when 'boat008' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14094529/a595531c-9b08-49b3-871e-10631aef6e03.jpeg'
    when 'boat009' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/12892042/0de041af-1761-4364-9895-4fe999a11e51.jpeg'
    when 'boat010' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14203148/3fbe1330-f1d8-492c-be2d-d6bd90340354.jpeg'
    when 'boat011' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14335018/cd1b8415-9a83-429c-a965-66e9ecb17f0f.jpeg'
    when 'boat012' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14374249/276e5f99-f9e1-4d54-bd6d-524322752bde.jpeg'
    when 'boat013' then 'https://picsum.photos/id/1080/600/420'
    when 'boat014' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14185933/4788b057-74df-429c-a5ef-d52703b7206e.jpeg'
    when 'boat015' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14203956/b605cc59-86ef-4937-8c98-0c566fe69562.jpeg'
    when 'boat016' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/14153797/0378d440-3680-44a9-a39d-db3a623ae097.jpeg'
    when 'boat017' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/12869582/66f3fb13-0dcc-48b2-a718-e54583452aee.jpeg'
    when 'boat018' then 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory/13341066/f03c68d7-eacd-4383-9b59-bc73a05b6c70.jpeg'
  end as url,
  0 as sort_order,
  true as is_primary,
  'manual' as source
from units u
where u.dms_id in (
  'rv001', 'rv002', 'rv020', 'rv003', 'rv021', 'rv022', 'rv023', 'rv024',
  'rv004', 'rv005', 'rv006', 'rv007', 'rv008', 'rv025', 'rv009', 'rv026',
  'rv027', 'rv028', 'rv029', 'rv030', 'rv031', 'rv010', 'rv011', 'rv012',
  'rv032', 'rv013', 'rv033', 'rv034', 'rv014', 'rv015', 'rv016', 'rv017',
  'rv018', 'rv019', 'rv035', 'rv036', 'rv037', 'rv038', 'rv039', 'rv040',
  'rv041', 'rv042', 'rv043', 'rv044', 'rv045', 'rv046', 'rv047', 'rv048',
  'rv049', 'boat001', 'boat002', 'boat003', 'boat004', 'boat005', 'boat006', 'boat007',
  'boat008', 'boat009', 'boat010', 'boat011', 'boat012', 'boat013', 'boat014', 'boat015',
  'boat016', 'boat017', 'boat018'
)
on conflict do nothing;

-- Picsum placeholder used for 5 units (no real CDN photo found on the live listing): rv011, rv012, rv032, rv049, boat013
