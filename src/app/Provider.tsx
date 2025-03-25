'use client'

import { AuthProvider } from '@/components/Auth/AuthProvider'
import { initializeFirebaseApp } from '@/firebase/config'
import { useEffect } from 'react'

const Provider = ({ children }: { children: React.ReactNode }) => {
  initializeFirebaseApp()

  useEffect(() => {}, [])

  return <AuthProvider>{children}</AuthProvider>
}

export default Provider
