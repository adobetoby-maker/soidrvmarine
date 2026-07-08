// Built by ATLAS — 2026-07-04
import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'
import { CompareBar } from '@/components/inventory/CompareBar'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main style={{ flex: 1 }}>{children}</main>
      <CompareBar />
      <SiteFooter />
    </>
  )
}
