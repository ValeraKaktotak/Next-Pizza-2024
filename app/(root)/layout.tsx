import type { Metadata } from 'next'
import { Suspense } from 'react'

//Components
import { Header } from '@/shared/components/shared'

export const metadata: Metadata = {
  title: 'Next Pizza',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <div className='min-h-screen'>
      <Suspense>
        <Header />
      </Suspense>
      {children}
      {modal}
    </div>
  )
}
