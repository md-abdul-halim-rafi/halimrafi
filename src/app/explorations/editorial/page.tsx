import type { Metadata } from 'next'
import { EditorialExploration } from '@/components/explorations/editorial/EditorialExploration'

export const metadata: Metadata = {
  title: 'Editorial exploration',
  robots: { index: false, follow: false },
}

export default function EditorialPage() {
  return <EditorialExploration />
}
