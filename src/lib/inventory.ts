// Built by ATLAS — 2026-07-05
// Real inventory from soidrvmarine.com — Keystone, Forest River Palomino, MirroCraft, Montego Bay
// Photos served from dealer's Endeavor Suite CDN (bf41b29b-1565-450b-9e8b-110c69e10a95)

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
    photo: F(167), lengthFt: 24, sleeps: 6, slideOuts: 1,
  },
  {
    slug: '2026-keystone-hideout-224mlwe-new-rv002',
    year: 2026, make: 'Keystone', model: 'Hideout 224MLWE',
    category: 'Travel Trailer', condition: 'New', price: 26495,
    photo: F(250), lengthFt: 25, sleeps: 4, slideOuts: 1,
  },
  {
    slug: '2026-keystone-hideout-262bhswe-new-rv003',
    year: 2026, make: 'Keystone', model: 'Hideout 262BHSWE',
    category: 'Travel Trailer', condition: 'New', price: 25250,
    photo: P('14102224', '7b08527f-22da-42a2-9bb0-42cda7be18d3'),
    lengthFt: 29, sleeps: 8, slideOuts: 1,
  },
  // ── New Keystone Passport Travel Trailers ─────────────────────────────────
  {
    slug: '2026-keystone-passport-170bhwe-new-rv004',
    year: 2026, make: 'Keystone', model: 'Passport 170BHWE',
    category: 'Travel Trailer', condition: 'New', price: 22495,
    photo: F(64), lengthFt: 20, sleeps: 6, slideOuts: 0,
  },
  {
    slug: '2026-keystone-passport-210rkcwe-new-rv005',
    year: 2026, make: 'Keystone', model: 'Passport 210RKCWE',
    category: 'Travel Trailer', condition: 'New', price: 27250,
    photo: F(131), lengthFt: 24, sleeps: 4, slideOuts: 1,
  },
  {
    slug: '2026-keystone-passport-229bhwe-new-rv006',
    year: 2026, make: 'Keystone', model: 'Passport 229BHWE',
    category: 'Travel Trailer', condition: 'New', price: 32995,
    photo: P('14105237', 'baec1d20-0278-45e5-b579-c6d567a8ee08'),
    lengthFt: 26, sleeps: 8, slideOuts: 1,
  },
  {
    slug: '2026-keystone-passport-2450rkwe-new-rv007',
    year: 2026, make: 'Keystone', model: 'Passport 2450RKWE',
    category: 'Travel Trailer', condition: 'New', price: 33450,
    photo: P('14375679', 'fb64fef3-834d-427d-880f-ab03a787a5e9'),
    lengthFt: 27, sleeps: 4, slideOuts: 1,
  },
  {
    slug: '2026-keystone-passport-253rd-new-rv008',
    year: 2026, make: 'Keystone', model: 'Passport 253RD',
    category: 'Travel Trailer', condition: 'New', price: 34250,
    photo: F(257), lengthFt: 28, sleeps: 6, slideOuts: 1,
  },
  {
    slug: '2026-keystone-passport-2605rb-new-rv009',
    year: 2026, make: 'Keystone', model: 'Passport 2605RB',
    category: 'Travel Trailer', condition: 'New', price: 38900,
    photo: F(398), lengthFt: 30, sleeps: 4, slideOuts: 2,
  },
  // ── New Forest River Palomino Pop-Up Campers ──────────────────────────────
  {
    slug: '2026-forest-river-palomino-rcss-1605-new-rv010',
    year: 2026, make: 'Forest River', model: 'Palomino RCSS-1605',
    category: 'Pop-Up Camper', condition: 'New', price: 18313,
    photo: F(91), lengthFt: 16, sleeps: 6, slideOuts: 0,
  },
  {
    slug: '2026-forest-river-palomino-szss-1240-new-rv011',
    year: 2026, make: 'Forest River', model: 'Palomino SZSS-1240',
    category: 'Pop-Up Camper', condition: 'New', price: 19420,
    photo: F(197), lengthFt: 12, sleeps: 4, slideOuts: 0,
  },
  {
    slug: '2026-forest-river-palomino-szss-500-new-rv012',
    year: 2026, make: 'Forest River', model: 'Palomino SZSS-500',
    category: 'Pop-Up Camper', condition: 'New', price: 16420,
    photo: F(236), lengthFt: 10, sleeps: 4, slideOuts: 0,
  },
  {
    slug: '2026-forest-river-palomino-szss-550-new-rv013',
    year: 2026, make: 'Forest River', model: 'Palomino SZSS-550',
    category: 'Pop-Up Camper', condition: 'New', price: 18923,
    photo: P('14153799', '810d8cb9-b3ff-4c5c-b1b3-e04be000a7ff'),
    lengthFt: 11, sleeps: 5, slideOuts: 0,
  },
  // ── Used RVs ──────────────────────────────────────────────────────────────
  {
    slug: '2022-heartland-bighorn-37tb-used-rv014',
    year: 2022, make: 'Heartland', model: 'Bighorn 37TB',
    category: 'Fifth Wheel', condition: 'Used', price: 38850,
    photo: P('14334871', 'c3cf23b3-c218-47fc-9d03-ea8a6411498a'),
    lengthFt: 42, sleeps: 6, slideOuts: 4,
  },
  {
    slug: '2020-crossroads-cruiser-22bbh-used-rv015',
    year: 2020, make: 'CrossRoads', model: 'Cruiser 22BBH',
    category: 'Travel Trailer', condition: 'Used', price: 21750,
    photo: F(317), lengthFt: 25, sleeps: 6, slideOuts: 1,
  },
  {
    slug: '2021-keystone-coleman-2715rl-used-rv016',
    year: 2021, make: 'Keystone', model: 'Coleman 2715RL',
    category: 'Travel Trailer', condition: 'Used', price: 19350,
    photo: P('14203938', '4858a129-b785-4b3f-bcfb-6ed74ea8d148'),
    lengthFt: 30, sleeps: 4, slideOuts: 1,
  },
  {
    slug: '2023-jayco-jay-flight-265th-used-rv017',
    year: 2023, make: 'Jayco', model: 'Jay Flight 265TH',
    category: 'Travel Trailer', condition: 'Used', price: 20950,
    photo: P('13674851', 'dbe6d682-a94f-48d3-b537-69f2969fdbd9'),
    lengthFt: 29, sleeps: 8, slideOuts: 2,
  },
  {
    slug: '2020-keystone-bullet-243bhswe-used-rv018',
    year: 2020, make: 'Keystone', model: 'Bullet 243BHSWE',
    category: 'Travel Trailer', condition: 'Used', price: null,
    photo: P('13602801', '0ee5c9d7-ec2d-45b2-990b-35431f18be75'),
    lengthFt: 27, sleeps: 8, slideOuts: 1,
  },
  {
    slug: '2019-grand-design-imagine-3170bh-used-rv019',
    year: 2019, make: 'Grand Design', model: 'Imagine 3170BH',
    category: 'Travel Trailer', condition: 'Used', price: 20950,
    photo: P('14313231', '0231c18b-b860-4374-b0d9-e8268ec61384'),
    lengthFt: 35, sleeps: 10, slideOuts: 2,
  },
]

export const BOAT_INVENTORY: InventoryUnit[] = [
  // ── New MirroCraft Aluminum Fishing Boats ────────────────────────────────
  {
    slug: '2026-mirrocraft-f176-new-boat001',
    year: 2026, make: 'MirroCraft', model: 'F176',
    category: 'Fishing', condition: 'New', price: 40977,
    photo: P('13844153', '3d894568-6112-4531-b3aa-b912c478eb5b'), lengthFt: 17,
  },
  {
    slug: '2026-mirrocraft-f1768-new-boat002',
    year: 2026, make: 'MirroCraft', model: 'F1768',
    category: 'Fishing', condition: 'New', price: 40749,
    photo: F(119), lengthFt: 17,
  },
  {
    slug: '2026-mirrocraft-f1768-blk-new-boat003',
    year: 2026, make: 'MirroCraft', model: 'F1768 BLK Edition',
    category: 'Fishing', condition: 'New', price: 40017,
    photo: F(158), lengthFt: 17,
  },
  // ── New Montego Bay Pontoons ──────────────────────────────────────────────
  {
    slug: '2026-montego-bay-c8516-new-boat004',
    year: 2026, make: 'Montego Bay', model: 'C8516',
    category: 'Pontoon', condition: 'New', price: 31668,
    photo: P('13800664', '721a2c73-de8e-4279-9d0c-18e5c5b6dd3d'), lengthFt: 16,
  },
  {
    slug: '2026-montego-bay-f8518-new-boat005',
    year: 2026, make: 'Montego Bay', model: 'F8518',
    category: 'Pontoon', condition: 'New', price: 31166,
    photo: F(15), lengthFt: 18,
  },
  {
    slug: '2026-montego-bay-f8522-new-boat006',
    year: 2026, make: 'Montego Bay', model: 'F8522',
    category: 'Pontoon', condition: 'New', price: 38889,
    photo: F(174), lengthFt: 22,
  },
  {
    slug: '2026-montego-bay-tt8524-new-boat007',
    year: 2026, make: 'Montego Bay', model: 'TT8524 Tritoon',
    category: 'Pontoon', condition: 'New', price: 75966,
    photo: P('13844149', '35968e09-4486-427a-b059-a86a86686609'), lengthFt: 24,
  },
  // ── Used Boats ────────────────────────────────────────────────────────────
  {
    slug: '2023-mirrocraft-f1628h-used-boat008',
    year: 2023, make: 'MirroCraft', model: 'F1628H',
    category: 'Fishing', condition: 'Used', price: 17950,
    photo: P('14094529', 'a595531c-9b08-49b3-871e-10631aef6e03'), lengthFt: 16,
  },
  {
    slug: '2017-mirrocraft-laker-used-boat009',
    year: 2017, make: 'MirroCraft', model: 'Laker',
    category: 'Fishing', condition: 'Used', price: 8995,
    photo: P('12892042', '0de041af-1761-4364-9895-4fe999a11e51'), lengthFt: 14,
  },
  {
    slug: '2005-bayliner-195cl-used-boat010',
    year: 2005, make: 'Bayliner', model: '195CL',
    category: 'Pontoon', condition: 'Used', price: 5995,
    photo: P('14203148', '3fbe1330-f1d8-492c-be2d-d6bd90340354'), lengthFt: 19,
  },
]

export type RvCategory = 'All' | 'Travel Trailer' | 'Fifth Wheel' | 'Class A' | 'Class B' | 'Class C' | 'Toy Hauler' | 'Pop-Up Camper'
export type ConditionFilter = 'All' | 'New' | 'Used'
export type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc'

export function filterAndSortRvs(
  inventory: InventoryUnit[],
  condition: ConditionFilter,
  category: RvCategory,
  sort: SortOption,
): InventoryUnit[] {
  let result = [...inventory]
  if (condition !== 'All') result = result.filter(u => u.condition === condition)
  if (category !== 'All') result = result.filter(u => u.category === category)
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
