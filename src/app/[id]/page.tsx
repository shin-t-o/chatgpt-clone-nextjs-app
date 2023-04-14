'use client'

import React from 'react'
import { Grid, useMediaQuery, useTheme } from '@mui/material'
import Chat from '@/components/Chat'
import Sidebar from '@/components/Sidebar'
import { drawerWidth } from '@/constant/style'
import { AuthGuard } from '@/components/Auth/AuthGuard'
import { useFirebaseInitialize as initializeApp } from '@/hooks/useFirebaseInitialize'

const AppWithId = ({ params }: { params: { id: string } }) => {
  // path paramを渡すことで初期化処理内で分岐
  initializeApp(params.id)
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  if (typeof window === 'undefined') return <></>

  return (
    <AuthGuard>
      <Grid container>
        <Grid item>
          <Sidebar isMdUp={isMdUp} />
        </Grid>
        <Grid
          item
          style={{
            width: '100%',
            marginLeft: isMdUp ? drawerWidth : 0,
          }}
        >
          <Chat />
        </Grid>
      </Grid>
    </AuthGuard>
  )
}

export default AppWithId
