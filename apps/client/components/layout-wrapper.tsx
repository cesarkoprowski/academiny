'use client'

import { usePathname } from 'next/navigation'
import { NavHeader } from './nav-header'

const publicRoutes = ['/auth/login', '/auth/cadastro']

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPublicRoute = publicRoutes.includes(pathname)

  return (
    <>
      {!isPublicRoute && <NavHeader />}
      {children}
    </>
  )
}
