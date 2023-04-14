'use client'

import { AuthProvider } from '@/components/Auth/AuthProvider'
import { initializeFirebaseApp } from '@/firebase/config'
import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'

const Provider = ({ children }: { children: React.ReactNode }) => {
  initializeFirebaseApp()

  useEffect(() => {}, [])

  return (
    <AuthProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </AuthProvider>
  )
}

export default Provider
