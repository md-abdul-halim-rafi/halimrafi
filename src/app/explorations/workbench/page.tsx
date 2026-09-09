import type { Metadata } from 'next'
import { WorkbenchExploration } from '@/components/explorations/workbench/WorkbenchExploration'

export const metadata: Metadata = {
  title: 'Workbench exploration',
  robots: { index: false, follow: false },
}

export default function WorkbenchPage() {
  return <WorkbenchExploration />
}
