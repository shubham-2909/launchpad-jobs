import { AdminNavbar } from '@/components/AdminNavbar'
import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin',
}

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <AdminNavbar />
      {children}
    </ClerkProvider>
  )
}
