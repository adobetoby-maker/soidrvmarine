// Built by ATLAS — 2026-07-04
// Static mock inventory — replaced by Supabase queries once DB is provisioned

export interface InventoryUnit {
  slug: string
  year: number
  make: string
  model: string
  trim?: string
  category: string // 'Travel Trailer' | 'Fifth Wheel' | 'Class A' | 'Class B' | 'Class C' | 'Toy Hauler' | 'Pontoon' | 'Bass Boat' | 'Fishing' | 'Outboard Motor'
  condition: 'New' | 'Used'
  price: number | null
  photo: string
  lengthFt?: number
  sleeps?: number
  slideOuts?: number
  mileage?: number
}

// Picsum IDs confirmed to show outdoor/natural scenes (not coffee, cities, food)
const P = (id: number) => `https://picsum.photos/id/${id}/600/420`

export const RV_INVENTORY: InventoryUnit[] = [
  {
    slug: '2025-grand-design-reflection-311bhs-rv001',
    year: 2025, make: 'Grand Design', model: 'Reflection 311BHS',
    category: 'Fifth Wheel', condition: 'New', price: 74995,
    photo: P(244), lengthFt: 37, sleeps: 10, slideOuts: 4,
  },
  {
    slug: '2024-keystone-montana-3855br-rv002',
    year: 2024, make: 'Keystone', model: 'Montana 3855BR',
    category: 'Fifth Wheel', condition: 'Used', price: 58500,
    photo: P(338), lengthFt: 43, sleeps: 8, slideOuts: 4,
  },
  {
    slug: '2025-forest-river-rockwood-2516s-rv003',
    year: 2025, make: 'Forest River', model: 'Rockwood 2516S',
    category: 'Travel Trailer', condition: 'New', price: 42900,
    photo: P(28), lengthFt: 29, sleeps: 6, slideOuts: 1,
  },
  {
    slug: '2025-keystone-cougar-22rbs-rv004',
    year: 2025, make: 'Keystone', model: 'Cougar 22RBS',
    category: 'Travel Trailer', condition: 'New', price: 31500,
    photo: P(67), lengthFt: 26, sleeps: 5, slideOuts: 1,
  },
  {
    slug: '2025-thor-windsport-34j-rv005',
    year: 2025, make: 'Thor Motor Coach', model: 'Windsport 34J',
    category: 'Class A', condition: 'New', price: 159995,
    photo: P(165), lengthFt: 34, sleeps: 7, slideOuts: 3, mileage: 0,
  },
  {
    slug: '2023-jayco-eagle-ht-284bhok-rv006',
    year: 2023, make: 'Jayco', model: 'Eagle HT 284BHOK',
    category: 'Travel Trailer', condition: 'Used', price: 36750,
    photo: P(398), lengthFt: 32, sleeps: 10, slideOuts: 2,
  },
  {
    slug: '2024-coachmen-leprechaun-319mb-rv007',
    year: 2024, make: 'Coachmen', model: 'Leprechaun 319MB',
    category: 'Class C', condition: 'Used', price: 78000,
    photo: P(417), lengthFt: 32, sleeps: 8, slideOuts: 2, mileage: 18400,
  },
  {
    slug: '2025-heartland-bighorn-3985-rv008',
    year: 2025, make: 'Heartland', model: 'Bighorn 3985',
    category: 'Fifth Wheel', condition: 'New', price: 89995,
    photo: P(442), lengthFt: 44, sleeps: 6, slideOuts: 5,
  },
  {
    slug: '2023-winnebago-minnie-winnie-22m-rv009',
    year: 2023, make: 'Winnebago', model: 'Minnie Winnie 22M',
    category: 'Class C', condition: 'Used', price: 64500,
    photo: P(437), lengthFt: 22, sleeps: 4, slideOuts: 0, mileage: 31200,
  },
  {
    slug: '2024-lance-1685-rv010',
    year: 2024, make: 'Lance', model: '1685',
    category: 'Travel Trailer', condition: 'Used', price: 28900,
    photo: P(180), lengthFt: 21, sleeps: 4, slideOuts: 0,
  },
  {
    slug: '2025-outdoors-rv-timber-ridge-24rks-rv011',
    year: 2025, make: 'Outdoors RV', model: 'Timber Ridge 24RKS',
    category: 'Travel Trailer', condition: 'New', price: 55900,
    photo: P(167), lengthFt: 29, sleeps: 6, slideOuts: 2,
  },
  {
    slug: '2024-grand-design-imagine-xls-17mke-rv012',
    year: 2024, make: 'Grand Design', model: 'Imagine XLS 17MKE',
    category: 'Travel Trailer', condition: 'Used', price: 27500,
    photo: P(257), lengthFt: 22, sleeps: 4, slideOuts: 1,
  },
  {
    slug: '2025-keystone-fuzion-427-rv013',
    year: 2025, make: 'Keystone', model: 'Fuzion 427',
    category: 'Toy Hauler', condition: 'New', price: 94500,
    photo: P(282), lengthFt: 46, sleeps: 8, slideOuts: 3,
  },
  {
    slug: '2024-east-to-west-tandara-340rl-rv014',
    year: 2024, make: 'East to West', model: 'Tandara 340RL',
    category: 'Fifth Wheel', condition: 'Used', price: 49900,
    photo: P(317), lengthFt: 38, sleeps: 6, slideOuts: 3,
  },
]

export const BOAT_INVENTORY: InventoryUnit[] = [
  {
    slug: '2025-bennington-22slxp-boat001',
    year: 2025, make: 'Bennington', model: '22 SLXP',
    category: 'Pontoon', condition: 'New', price: 42900,
    photo: P(67), lengthFt: 22,
  },
  {
    slug: '2024-tracker-pro-175txw-boat002',
    year: 2024, make: 'Tracker', model: 'Pro 175 TXW',
    category: 'Bass Boat', condition: 'Used', price: 18750,
    photo: P(167),
  },
]

export type RvCategory = 'All' | 'Travel Trailer' | 'Fifth Wheel' | 'Class A' | 'Class B' | 'Class C' | 'Toy Hauler'
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
