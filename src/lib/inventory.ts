// Built by ATLAS — 2026-07-05
// Real inventory from soidrvmarine.com — Keystone, Forest River Palomino, MirroCraft, Montego Bay
// Photos served from dealer's Endeavor Suite CDN (bf41b29b-1565-450b-9e8b-110c69e10a95)
//
// Expanded 2026-07-07 (WS2 — inventory parity pass): scraped the full live search
// (new RV, new Marine, used RV, used Marine) — 28 + 7 + 21 + 11 = 67 units, matching
// the live site's "1–30 of 67" total exactly. Every unit below is real dealer stock as
// of the scrape date; nothing was invented. Powersports and Used Outboard Motors are
// real categories on the live site's nav but returned zero live units on every query
// tried during this pass (404 on every filtered URL) — see POWERSPORTS_INVENTORY and
// MOTOR_INVENTORY below; both are wired for the moment DMS sync populates them.

export interface InventoryUnit {
  slug: string
  year: number
  make: string
  model: string
  trim?: string
  category: string
  condition: 'New' | 'Used'
  price: number | null
  photo: string
  lengthFt?: number
  sleeps?: number
  slideOuts?: number
  mileage?: number
  stockNumber?: string
}

const CDN = 'https://cdnmedia.endeavorsuite.com/images/organizations/stg/bf41b29b-1565-450b-9e8b-110c69e10a95/inventory'
const P = (productId: string, imgId: string) => `${CDN}/${productId}/${imgId}.jpeg`
// Fallback for units whose CDN photo IDs aren't yet confirmed
const F = (n: number) => `https://picsum.photos/id/${n}/600/420`

export const RV_INVENTORY: InventoryUnit[] = [
  // ── New Keystone Hideout Travel Trailers ──────────────────────────────────
  {
    slug: '2026-keystone-hideout-21bwe-new-rv001',
    stockNumber: 'TG240740',
    year: 2026, make: 'Keystone', model: 'Hideout 21BWE',
    category: 'Travel Trailer', condition: 'New', price: 22850,
    photo: P('13625754', '28f4c2be-ce12-4220-9b68-1195e4ebb127'), lengthFt: 24, sleeps: 6, slideOuts: 1,
  },
  {
    slug: '2026-keystone-hideout-224mlwe-new-rv002',
    stockNumber: 'TG240223',
    year: 2026, make: 'Keystone', model: 'Hideout 224MLWE',
    category: 'Travel Trailer', condition: 'New', price: 26495,
    photo: P('13481732', 'a4ee0f19-87f5-4a57-ad2a-84521bc1548a'), lengthFt: 25, sleeps: 4, slideOuts: 1,
  },
  {
    // Duplicate stock unit of the same floorplan — real second unit on the lot
    slug: '2026-keystone-hideout-224mlwe-new-tg240224',
    stockNumber: 'TG240224',
    year: 2026, make: 'Keystone', model: 'Hideout 224MLWE',
    category: 'Travel Trailer', condition: 'New', price: 26495,
    photo: P('13501515', 'c6fe154a-fb0c-4ef4-bbfa-f766e853f9f9'), lengthFt: 25, sleeps: 4, slideOuts: 1,
  },
  {
    slug: '2026-keystone-hideout-262bhswe-new-rv003',
    stockNumber: 'TG242638',
    year: 2026, make: 'Keystone', model: 'Hideout 262BHSWE',
    category: 'Travel Trailer', condition: 'New', price: 25250,
    photo: P('14102224', '7b08527f-22da-42a2-9bb0-42cda7be18d3'),
    lengthFt: 29, sleeps: 8, slideOuts: 1,
  },
  {
    slug: '2026-keystone-hideout-262bhswe-new-tg242706',
    stockNumber: 'TG242706',
    year: 2026, make: 'Keystone', model: 'Hideout 262BHSWE',
    category: 'Travel Trailer', condition: 'New', price: 25250,
    photo: P('14153798', 'd5101ca0-0f44-4cbf-a93a-1f10153d15b3'),
    lengthFt: 29, sleeps: 8, slideOuts: 1,
  },
  {
    slug: '2026-keystone-hideout-262bhswe-new-tg242707',
    stockNumber: 'TG242707',
    year: 2026, make: 'Keystone', model: 'Hideout 262BHSWE',
    category: 'Travel Trailer', condition: 'New', price: 25250,
    photo: P('14186812', '29798807-86fe-49d8-a88d-2f918878e6e2'),
    lengthFt: 29, sleeps: 8, slideOuts: 1,
  },
  {
    slug: '2026-keystone-hideout-288brswe-new-tg242730',
    stockNumber: 'TG242730',
    year: 2026, make: 'Keystone', model: 'Hideout 288BRSWE',
    category: 'Travel Trailer', condition: 'New', price: 30950,
    photo: P('14313209', '25ea8c1f-787d-40a0-a8cf-e7cef88196be'),
  },
  {
    slug: '2026-keystone-hideout-291brwe-new-tg240508',
    stockNumber: 'TG240508',
    year: 2026, make: 'Keystone', model: 'Hideout 291BRWE',
    category: 'Travel Trailer', condition: 'New', price: 29850,
    photo: P('13537012', '1a21d9d2-f488-4653-b1e7-43223a3780f7'),
  },
  // ── New Keystone Passport Travel Trailers ─────────────────────────────────
  {
    slug: '2026-keystone-passport-170bhwe-new-rv004',
    stockNumber: 'TX410072',
    year: 2026, make: 'Keystone', model: 'Passport 170BHWE',
    category: 'Travel Trailer', condition: 'New', price: 22495,
    photo: P('13477275', '354b518e-3d2e-454d-a111-a1f369a50bd3'), lengthFt: 20, sleeps: 6, slideOuts: 0,
  },
  {
    slug: '2026-keystone-passport-210rkcwe-new-rv005',
    stockNumber: 'TC411173',
    year: 2026, make: 'Keystone', model: 'Passport 210RKCWE',
    category: 'Travel Trailer', condition: 'New', price: 27250,
    photo: P('14186825', '559dbaf0-7449-4856-a285-54502e1b5594'), lengthFt: 24, sleeps: 4, slideOuts: 1,
  },
  {
    slug: '2026-keystone-passport-229bhwe-new-rv006',
    stockNumber: 'TC411197',
    year: 2026, make: 'Keystone', model: 'Passport 229BHWE',
    category: 'Travel Trailer', condition: 'New', price: 32995,
    photo: P('14105237', 'baec1d20-0278-45e5-b579-c6d567a8ee08'),
    lengthFt: 26, sleeps: 8, slideOuts: 1,
  },
  {
    slug: '2026-keystone-passport-2450rkwe-new-rv007',
    stockNumber: 'TC411525',
    year: 2026, make: 'Keystone', model: 'Passport 2450RKWE',
    category: 'Travel Trailer', condition: 'New', price: 33450,
    photo: P('14375679', 'fb64fef3-834d-427d-880f-ab03a787a5e9'),
    lengthFt: 27, sleeps: 4, slideOuts: 1,
  },
  {
    // Real listing shows model as 253RDWE (not 253RD) — corrected from live scrape
    slug: '2026-keystone-passport-253rdwe-new-rv008',
    stockNumber: 'TC410702',
    year: 2026, make: 'Keystone', model: 'Passport 253RDWE',
    category: 'Travel Trailer', condition: 'New', price: 34250,
    photo: P('13629231', '879e40c6-c46d-4d9b-9e74-f9d3871f94e4'), lengthFt: 28, sleeps: 6, slideOuts: 1,
  },
  {
    // Non-WE trim, separate stock unit from 2605RBWE below — real distinct listing, $39,750
    slug: '2026-keystone-passport-2605rb-new-td410247',
    stockNumber: 'TD410247',
    year: 2026, make: 'Keystone', model: 'Passport 2605RB',
    category: 'Travel Trailer', condition: 'New', price: 39750,
    photo: P('13524400', '3b328619-3b10-44a8-9c3d-187cc47a92a7'),
    lengthFt: 30, sleeps: 4, slideOuts: 2,
  },
  {
    slug: '2026-keystone-passport-2605rbwe-new-rv009',
    stockNumber: 'TC410892',
    year: 2026, make: 'Keystone', model: 'Passport 2605RBWE',
    category: 'Travel Trailer', condition: 'New', price: 38900,
    photo: P('14186841', 'a00c08ac-7e34-4808-b64a-12ee53d8f5d7'), lengthFt: 30, sleeps: 4, slideOuts: 2,
  },
  {
    slug: '2026-keystone-passport-260bhcwe-new-tc411145',
    stockNumber: 'TC411145',
    year: 2026, make: 'Keystone', model: 'Passport 260BHCWE',
    category: 'Travel Trailer', condition: 'New', price: 30495,
    photo: P('14073766', 'b351ed05-94ba-4c81-9769-58d63490867e'),
  },
  {
    slug: '2026-keystone-passport-260bhcwe-new-tc411157',
    stockNumber: 'TC411157',
    year: 2026, make: 'Keystone', model: 'Passport 260BHCWE',
    category: 'Travel Trailer', condition: 'New', price: 30495,
    photo: P('14186835', '302f899d-9c10-44e5-94fe-73bcc7b68072'),
  },
  {
    slug: '2026-keystone-passport-260bhcwe-new-tc411156',
    stockNumber: 'TC411156',
    year: 2026, make: 'Keystone', model: 'Passport 260BHCWE',
    category: 'Travel Trailer', condition: 'New', price: 30495,
    photo: P('14186838', '8403864b-9589-4d4c-a0ea-0aec451f8a47'),
  },
  {
    slug: '2026-keystone-passport-284qbcwe-new-tc411514',
    stockNumber: 'TC411514',
    year: 2026, make: 'Keystone', model: 'Passport 284QBCWE',
    category: 'Travel Trailer', condition: 'New', price: 32250,
    photo: P('14375683', '52c2e680-f6a7-4591-a9a7-d51838831073'),
  },
  {
    slug: '2026-keystone-passport-284qbcwe-new-tc411515',
    stockNumber: 'TC411515',
    year: 2026, make: 'Keystone', model: 'Passport 284QBCWE',
    category: 'Travel Trailer', condition: 'New', price: 32250,
    photo: P('14375685', 'a4d3f968-645e-4c91-8959-2293b9f3e39f'),
  },
  {
    slug: '2026-keystone-passport-2900bhwe-new-tc411227',
    stockNumber: 'TC411227',
    year: 2026, make: 'Keystone', model: 'Passport 2900BHWE',
    category: 'Travel Trailer', condition: 'New', price: 41500,
    photo: P('14375680', '4a7a485d-29c9-470f-b6b3-c03a0da3779b'),
  },
  // ── New Forest River Palomino Pop-Up Campers ──────────────────────────────
  {
    slug: '2026-forest-river-palomino-rcss-1605-new-rv010',
    stockNumber: 'TN120468',
    year: 2026, make: 'Forest River', model: 'Palomino RCSS-1605',
    category: 'Pop-Up Camper', condition: 'New', price: 18313,
    photo: P('13893186', '1aeb7c49-afd3-4789-b14a-8a9e466ac61f'), lengthFt: 16, sleeps: 6, slideOuts: 0,
  },
  {
    // Confirmed: no real photo exists on dealer site — every current listing serves their own placeholder
    slug: '2026-forest-river-palomino-szss-1240-new-rv011',
    stockNumber: 'TN120300',
    year: 2026, make: 'Forest River', model: 'Palomino SZSS-1240',
    category: 'Pop-Up Camper', condition: 'New', price: 19420,
    photo: F(197), lengthFt: 12, sleeps: 4, slideOuts: 0,
  },
  {
    // Confirmed: no real photo exists on dealer site — every current listing serves their own placeholder
    slug: '2026-forest-river-palomino-szss-500-new-rv012',
    stockNumber: 'TN120610',
    year: 2026, make: 'Forest River', model: 'Palomino SZSS-500',
    category: 'Pop-Up Camper', condition: 'New', price: 16420,
    photo: F(236), lengthFt: 10, sleeps: 4, slideOuts: 0,
  },
  {
    // Duplicate stock unit of the same floorplan, no photo confirmed for this stock either
    slug: '2026-forest-river-palomino-szss-500-new-tn120374',
    stockNumber: 'TN120374',
    year: 2026, make: 'Forest River', model: 'Palomino SZSS-500',
    category: 'Pop-Up Camper', condition: 'New', price: 16420,
    photo: F(236), lengthFt: 10, sleeps: 4, slideOuts: 0,
  },
  {
    slug: '2026-forest-river-palomino-szss-550-new-tn120834',
    stockNumber: 'TN120834',
    year: 2026, make: 'Forest River', model: 'Palomino SZSS-550',
    category: 'Pop-Up Camper', condition: 'New', price: 21006,
    photo: P('14153799', '810d8cb9-b3ff-4c5c-b1b3-e04be000a7ff'),
    lengthFt: 11, sleeps: 5, slideOuts: 0,
  },
  {
    slug: '2026-forest-river-palomino-szss-550-new-tn120238',
    stockNumber: 'TN120238',
    year: 2026, make: 'Forest River', model: 'Palomino SZSS-550',
    category: 'Pop-Up Camper', condition: 'New', price: 18923,
    photo: P('14313191', '5e93bf9e-f96b-4755-8cfe-54bbc0a6bf21'),
    lengthFt: 11, sleeps: 5, slideOuts: 0,
  },
  {
    slug: '2026-forest-river-palomino-szss-550-new-tn120622',
    stockNumber: 'TN120622',
    year: 2026, make: 'Forest River', model: 'Palomino SZSS-550',
    category: 'Pop-Up Camper', condition: 'New', price: 18923,
    photo: P('14313206', '789980db-3ab6-4c73-a6a5-7f850449f48c'),
    lengthFt: 11, sleeps: 5, slideOuts: 0,
  },
  // ── Used RVs ──────────────────────────────────────────────────────────────
  {
    slug: '2022-heartland-bighorn-37tb-used-rv014',
    stockNumber: 'NE506743',
    year: 2022, make: 'Heartland', model: 'Bighorn 37TB',
    category: 'Fifth Wheel', condition: 'Used', price: 38850,
    photo: P('14334871', 'c3cf23b3-c218-47fc-9d03-ea8a6411498a'),
    lengthFt: 42, sleeps: 6, slideOuts: 4,
  },
  {
    // Year corrected 2020→2022 from live scrape (same stock/floorplan, dealer's own listing shows 2022)
    slug: '2022-crossroads-cruiser-22bbh-used-rv015',
    stockNumber: 'N6320667TR',
    year: 2022, make: 'CrossRoads', model: 'Cruiser 22BBH',
    category: 'Travel Trailer', condition: 'Used', price: 21750,
    photo: P('13513659', '76005a74-989b-4191-aa7b-13e33e465afa'), lengthFt: 25, sleeps: 6, slideOuts: 1,
  },
  {
    slug: '2021-keystone-coleman-2715rl-used-rv016',
    stockNumber: 'MM932044',
    year: 2021, make: 'Keystone', model: 'Coleman 2715RL',
    category: 'Travel Trailer', condition: 'Used', price: 19350,
    photo: P('14203938', '4858a129-b785-4b3f-bcfb-6ed74ea8d148'),
    lengthFt: 30, sleeps: 4, slideOuts: 1,
  },
  {
    slug: '2023-jayco-jay-flight-265th-used-rv017',
    stockNumber: 'P7780056',
    year: 2023, make: 'Jayco', model: 'Jay Flight 265TH',
    category: 'Travel Trailer', condition: 'Used', price: 20950,
    photo: P('13674851', 'dbe6d682-a94f-48d3-b537-69f2969fdbd9'),
    lengthFt: 29, sleeps: 8, slideOuts: 2,
  },
  {
    // Price + stock corrected from live scrape (was "Call for price" placeholder — real price is $17,450)
    slug: '2020-keystone-bullet-243bhswe-used-rv018',
    stockNumber: 'LX433546',
    year: 2020, make: 'Keystone', model: 'Bullet 243BHSWE',
    category: 'Travel Trailer', condition: 'Used', price: 17450,
    photo: P('13602801', '0ee5c9d7-ec2d-45b2-990b-35431f18be75'),
    lengthFt: 27, sleeps: 8, slideOuts: 1,
  },
  {
    slug: '2019-grand-design-imagine-3170bh-used-rv019',
    stockNumber: 'K6612082',
    year: 2019, make: 'Grand Design', model: 'Imagine 3170BH',
    category: 'Travel Trailer', condition: 'Used', price: 20950,
    photo: P('14313231', '0231c18b-b860-4374-b0d9-e8268ec61384'),
    lengthFt: 35, sleeps: 10, slideOuts: 2,
  },
  {
    slug: '2024-keystone-springdale-1700fq-used-rw102201',
    stockNumber: 'RW102201',
    year: 2024, make: 'Keystone', model: 'Springdale 1700FQ',
    category: 'Travel Trailer', condition: 'Used', price: 13950,
    photo: P('13513661', '47d774e1-d7d7-40ee-974f-9087dfa1854c'),
  },
  {
    slug: '2022-keystone-springdale-295bhwe-used-ng103988tr',
    stockNumber: 'NG103988TR',
    year: 2022, make: 'Keystone', model: 'Springdale 295BHWE',
    category: 'Travel Trailer', condition: 'Used', price: 19450,
    photo: P('13602810', '2414acf0-b867-469b-a536-ab817867b003'),
  },
  {
    slug: '2022-forest-river-primetime-tracer-260bhsle-used-nb520947',
    stockNumber: 'NB520947',
    year: 2022, make: 'Forest River', model: 'Primetime Tracer 260BHSLE',
    category: 'Travel Trailer', condition: 'Used', price: 18950,
    photo: P('14105230', '762dfb0e-ed39-4b9c-a682-bf89f44cfd57'),
  },
  {
    slug: '2022-heartland-torque-t333-used-ne499145',
    stockNumber: 'NE499145',
    year: 2022, make: 'Heartland', model: 'Torque T333',
    category: 'Toy Hauler', condition: 'Used', price: 39850,
    photo: P('14313227', 'cfc8be50-f0aa-4e80-ae53-52ab1bcf3015'),
  },
  {
    slug: '2021-forest-river-cherokee-grey-wolf-23mk-used-m9133282',
    stockNumber: 'M9133282',
    year: 2021, make: 'Forest River', model: 'Cherokee Grey Wolf 23MK',
    category: 'Travel Trailer', condition: 'Used', price: 19550,
    photo: P('13917994', 'f6f63658-8894-440f-92f5-2676936e0404'),
  },
  {
    slug: '2021-heartland-road-warrior-3965rw-used-me461163',
    stockNumber: 'ME461163',
    year: 2021, make: 'Heartland', model: 'Road Warrior 3965RW',
    category: 'Toy Hauler', condition: 'Used', price: 48650,
    photo: P('14313168', 'fb310c53-78ba-43a0-8aca-ef11dfb8afc0'),
  },
  {
    slug: '2020-jayco-jay-feather-23rbm-used-l1j50060',
    stockNumber: 'L1J50060',
    year: 2020, make: 'Jayco', model: 'Jay Feather 23RBM',
    category: 'Travel Trailer', condition: 'Used', price: 14850,
    photo: P('12988774', '7b7e88d1-4080-4591-a92c-1171df15b8aa'),
  },
  {
    slug: '2019-eclipse-attitude-231sa-used-kr017159',
    stockNumber: 'KR017159',
    year: 2019, make: 'Eclipse', model: 'Attitude 231SA',
    category: 'Toy Hauler', condition: 'Used', price: 21500,
    photo: P('14221936', '8d1bf675-c628-4292-9630-fe29b045d7eb'),
  },
  {
    slug: '2019-keystone-coleman-17rdwe-used-ky931118',
    stockNumber: 'KY931118',
    year: 2019, make: 'Keystone', model: 'Coleman 17RDWE',
    category: 'Travel Trailer', condition: 'Used', price: 7750,
    photo: P('14313234', 'f741eba1-07f7-4344-88b5-17020ed86fa8'),
  },
  {
    slug: '2018-forest-river-impression-26ret-used-jg600140',
    stockNumber: 'JG600140',
    year: 2018, make: 'Forest River', model: 'Impression 26RET',
    category: 'Travel Trailer', condition: 'Used', price: 23995,
    photo: P('14334872', '119c9277-c1ea-4d25-9c9f-afe721155ee4'),
  },
  {
    slug: '2015-airstream-sport-22fb-used-fj531963',
    stockNumber: 'FJ531963',
    year: 2015, make: 'Airstream', model: 'Sport 22FB',
    category: 'Travel Trailer', condition: 'Used', price: 38750,
    photo: P('14303446', 'a4fe71d3-7e79-4909-8b40-6dc670354fb0'),
  },
  {
    slug: '2022-keystone-kodiak-250bhsl-used-nj973348',
    stockNumber: 'NJ973348',
    year: 2022, make: 'Keystone', model: 'Kodiak 250BHSL',
    category: 'Travel Trailer', condition: 'Used', price: 23850,
    photo: P('14105250', 'a39ebf13-f285-47e7-bb7e-adcc76f7d899'),
  },
  {
    slug: '2011-starcraft-travel-star-176rb-sport-used-b1jz5205tr',
    stockNumber: 'B1JZ5205TR',
    year: 2011, make: 'Starcraft', model: 'Travel Star 176RB Sport',
    category: 'Travel Trailer', condition: 'Used', price: 7850,
    photo: P('12215773', 'a115509f-2734-4ddb-9ea3-692046c1c9c5'),
  },
  {
    slug: '1994-cobra-industries-sandpiper-used-rc002764',
    stockNumber: 'RC002764',
    year: 1994, make: 'Cobra Industries', model: 'Sandpiper',
    category: 'Travel Trailer', condition: 'Used', price: 4950,
    photo: P('12714617', '564137e4-cde7-4b71-a771-20f8f7675e58'),
  },
  {
    // Real listing, category is "Car Hauler" on the dealer site — no dedicated trailer
    // array exists yet in this schema, surfaced here under a distinct category so it
    // still filters correctly and never gets mislabeled as an RV floorplan. No CDN
    // photo was available on the live listing either.
    slug: '2016-cb-doatv816-5ta-used-gn044938',
    stockNumber: 'GN044938',
    year: 2016, make: 'C&B', model: 'DOATV816-5TA',
    category: 'Utility Trailer', condition: 'Used', price: 2850,
    photo: F(1084),
  },
]

export const BOAT_INVENTORY: InventoryUnit[] = [
  // ── New MirroCraft Aluminum Fishing Boats ────────────────────────────────
  {
    slug: '2026-mirrocraft-f176-new-boat001',
    stockNumber: '3841J526',
    year: 2026, make: 'MirroCraft', model: 'F176',
    category: 'Fishing', condition: 'New', price: 40977,
    photo: P('13844153', '3d894568-6112-4531-b3aa-b912c478eb5b'), lengthFt: 17,
  },
  {
    slug: '2026-mirrocraft-f1768-new-boat002',
    stockNumber: '3857J526',
    year: 2026, make: 'MirroCraft', model: 'F1768',
    category: 'Fishing', condition: 'New', price: 40749,
    photo: P('13852859', '180e7cc6-bd7f-4e40-b8c7-997a5a146e48'), lengthFt: 17,
  },
  {
    slug: '2026-mirrocraft-f1768-blk-new-boat003',
    stockNumber: '3799I526',
    year: 2026, make: 'MirroCraft', model: 'F1768 BLK Edition',
    category: 'Fishing', condition: 'New', price: 40017,
    photo: P('13692385', '77b22bde-1403-4a2e-a634-e8df332e8998'), lengthFt: 17,
  },
  // ── New Montego Bay Pontoons ──────────────────────────────────────────────
  {
    slug: '2026-montego-bay-c8516-new-boat004',
    stockNumber: '3865J526',
    year: 2026, make: 'Montego Bay', model: 'C8516',
    category: 'Pontoon', condition: 'New', price: 31668,
    photo: P('13800664', '721a2c73-de8e-4279-9d0c-18e5c5b6dd3d'), lengthFt: 16,
  },
  {
    slug: '2026-montego-bay-f8518-new-boat005',
    stockNumber: '3868J526',
    year: 2026, make: 'Montego Bay', model: 'F8518',
    category: 'Pontoon', condition: 'New', price: 31166,
    photo: P('13800665', 'e79e0857-c1ea-4866-9981-b845b4f4b7e7'), lengthFt: 18,
  },
  {
    slug: '2026-montego-bay-f8522-new-boat006',
    stockNumber: '3884K526',
    year: 2026, make: 'Montego Bay', model: 'F8522',
    category: 'Pontoon', condition: 'New', price: 38889,
    photo: P('13852851', '6e864d03-5fc9-4d97-a11c-bfa7279f1dc9'), lengthFt: 22,
  },
  {
    slug: '2026-montego-bay-tt8524-new-boat007',
    stockNumber: '3849J526',
    year: 2026, make: 'Montego Bay', model: 'TT8524 Tritoon',
    category: 'Pontoon', condition: 'New', price: 75966,
    photo: P('13844149', '35968e09-4486-427a-b059-a86a86686609'), lengthFt: 24,
  },
  // ── Used Boats ────────────────────────────────────────────────────────────
  {
    slug: '2023-mirrocraft-f1628h-used-boat008',
    stockNumber: '1268A323TR',
    year: 2023, make: 'MirroCraft', model: 'F1628H',
    category: 'Fishing', condition: 'Used', price: 17950,
    photo: P('14094529', 'a595531c-9b08-49b3-871e-10631aef6e03'), lengthFt: 16,
  },
  {
    slug: '2017-mirrocraft-laker-used-boat009',
    stockNumber: '3944K617TR',
    year: 2017, make: 'MirroCraft', model: 'Laker',
    category: 'Fishing', condition: 'Used', price: 8995,
    photo: P('12892042', '0de041af-1761-4364-9895-4fe999a11e51'), lengthFt: 14,
  },
  {
    slug: '2005-bayliner-195cl-used-boat010',
    stockNumber: '75CLG405',
    year: 2005, make: 'Bayliner', model: '195CL',
    category: 'Pontoon', condition: 'Used', price: 5995,
    photo: P('14203148', '3fbe1330-f1d8-492c-be2d-d6bd90340354'), lengthFt: 19,
  },
  {
    slug: '2022-starweld-starcraft-19-flex-pro-used-2604k122',
    stockNumber: '2604K122',
    year: 2022, make: 'Starweld', model: 'Starcraft 19 Flex Pro',
    category: 'Fishing', condition: 'Used', price: null,
    photo: P('14335018', 'cd1b8415-9a83-429c-a965-66e9ecb17f0f'), lengthFt: 19,
  },
  {
    slug: '2021-smoker-craft-ultima-182-used-9912d121',
    stockNumber: '9912D121',
    year: 2021, make: 'Smoker Craft', model: 'Ultima 182',
    category: 'Fishing', condition: 'Used', price: 33450,
    photo: P('14374249', '276e5f99-f9e1-4d54-bd6d-524322752bde'), lengthFt: 18,
  },
  {
    // No CDN photo available on the live listing — genuinely missing, kept as placeholder
    slug: '2020-lund-2025-impact-xs-used-f301f920',
    stockNumber: 'F301F920',
    year: 2020, make: 'Lund', model: '2025 Impact XS',
    category: 'Fishing', condition: 'Used', price: null,
    photo: F(1080), lengthFt: 20,
  },
  {
    slug: '2018-mb-sports-tomcat-f22-classic-used-6700h718',
    stockNumber: '6700H718',
    year: 2018, make: 'MB Sports', model: 'Tomcat F22 Classic',
    category: 'Fishing', condition: 'Used', price: 58450,
    photo: P('14185933', '4788b057-74df-429c-a5ef-d52703b7206e'), lengthFt: 22,
  },
  {
    slug: '2016-tracker-marine-targa-v-18-combo-used-5267d616',
    stockNumber: '5267D616',
    year: 2016, make: 'Tracker Marine', model: 'Targa V-18 Combo',
    category: 'Fishing', condition: 'Used', price: 25500,
    photo: P('14203956', 'b605cc59-86ef-4937-8c98-0c566fe69562'), lengthFt: 18,
  },
  {
    slug: '2002-fish-rite-custom-jetboat-used-5137l102p2',
    stockNumber: '5137L102P2',
    year: 2002, make: 'Fish Rite Boats', model: 'Custom Jetboat',
    category: 'Fishing', condition: 'Used', price: 38250,
    photo: P('14153797', '0378d440-3680-44a9-a39d-db3a623ae097'),
  },
  {
    slug: '1999-crestliner-1850-sportfish-used-0987l899',
    stockNumber: '0987L899',
    year: 1999, make: 'Crestliner', model: '1850 Sportfish',
    category: 'Fishing', condition: 'Used', price: 2400,
    photo: P('12869582', '66f3fb13-0dcc-48b2-a718-e54583452aee'), lengthFt: 18,
  },
  {
    slug: '1997-sea-doo-sportster-used-3192e797',
    stockNumber: '3192E797',
    year: 1997, make: 'Sea-Doo Sport Boats', model: 'Sportster',
    category: 'Fishing', condition: 'Used', price: 2500,
    photo: P('13341066', 'f03c68d7-eacd-4383-9b59-bc73a05b6c70'),
  },
]

// ── Powersports ───────────────────────────────────────────────────────────
// Real category on the live dealer nav ("Used Powersports"). Every filtered URL
// tried during the 2026-07-07 scrape returned a 404/empty result — the dealer
// currently carries zero live powersports units. Left empty rather than invented;
// wired end-to-end (type, category map, page, filters) so a DMS sync populates it
// automatically the moment stock exists. See CONTENT-NEEDED.md.
export const POWERSPORTS_INVENTORY: InventoryUnit[] = []

// ── Used Outboard Motors ────────────────────────────────────────────────────
// Same situation as powersports: real nav category ("Used Outboard Motors" /
// "New Outboard Motors"), zero live units found on the 2026-07-07 scrape pass.
// The informational Mercury Outboards page (src/app/(public)/motors/mercury-outboards)
// already covers new-motor sales; this array is for used/in-stock individual motor
// units once the DMS has any to sync.
export const MOTOR_INVENTORY: InventoryUnit[] = []

export type RvCategory =
  | 'All'
  | 'Travel Trailer'
  | 'Fifth Wheel'
  | 'Class A'
  | 'Class B'
  | 'Class C'
  | 'Toy Hauler'
  | 'Pop-Up Camper'
  | 'Utility Trailer'
export type ConditionFilter = 'All' | 'New' | 'Used'
export type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc'

export function filterAndSortRvs(
  inventory: InventoryUnit[],
  condition: ConditionFilter,
  category: RvCategory,
  sort: SortOption,
  brand: string = 'All',
): InventoryUnit[] {
  let result = [...inventory]
  if (condition !== 'All') result = result.filter(u => u.condition === condition)
  if (category !== 'All') result = result.filter(u => u.category === category)
  if (brand !== 'All') result = result.filter(u => u.make === brand)
  result.sort((a, b) => {
    const ap = a.price ?? 999999
    const bp = b.price ?? 999999
    switch (sort) {
      case 'price-asc': return ap - bp
      case 'price-desc': return bp - ap
      case 'year-desc': return b.year - a.year
      case 'year-asc': return a.year - b.year
      default: return 0
    }
  })
  return result
}
