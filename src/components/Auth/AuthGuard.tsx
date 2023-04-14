'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useRef } from 'react'
import { useFirebaseAuth } from './AuthProvider'

type Props = {
  children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const { user } = useFirebaseAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (user === null) {
      router.push('/signin')
    }
  }, [user, router])

  return <>{children}</>
}
