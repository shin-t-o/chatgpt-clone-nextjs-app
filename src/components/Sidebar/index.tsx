'use client'

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useAtomValue } from 'jotai'
import { ThreadList } from './ThreadList'
import { drawerWidth } from '@/constant/style'
import { threadListAtom } from '@/states/atom/threadListAtom'
import { useFirebase } from '@/hooks/useFirebase'
import { useFirebaseAuth } from '../Auth/AuthProvider'
import AuthListItem from './AuthListItem'
import UnAuthListItem from './UnAuthListItem'
import { getAuth, signOut } from 'firebase/auth'

const Sidebar = ({ isMdUp }: { isMdUp: boolean }) => {
  const { user } = useFirebaseAuth()
  const threadList = useAtomValue(threadListAtom)
  const { onClickNew } = useFirebase()

  const handleSignOut = async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Drawer
        className={'SideDrawer'}
        variant={isMdUp ? 'permanent' : 'temporary'}
        open={isMdUp}
        PaperProps={{
          sx: {
            backgroundColor: '#202123',
            color: 'white',
            width: drawerWidth,
            display: isMdUp ? 'block' : 'none',
          },
        }}
      >
        <Box
          role="presentation"
          sx={{
            padding: 2,
            position: 'relative',
          }}
        >
          <List>
            <ListItemButton
              key={'createChat'}
              sx={{
                height: 40,
                backgroundColor: '#343541',
                borderColor: 'grey',
                borderRadius: 2,
                borderStyle: 'solid',
                borderWidth: 1,
              }}
              onClick={onClickNew}
            >
              <ListItemText
                primary={' + New Chat'}
                primaryTypographyProps={{
                  fontSize: 12,
                }}
              />
            </ListItemButton>
          </List>
        </Box>

        <ThreadList threadList={threadList} />

        <Box
          role="presentation"
          sx={{
            position: 'absolute',
            bottom: 0,
            height: '20%',
            left: '16px',
            right: '16px',
          }}
        >
          <List>
            <Divider style={{ backgroundColor: 'grey' }} />
            {user ? (
              <AuthListItem handleSignOut={handleSignOut} />
            ) : (
              <UnAuthListItem />
            )}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Sidebar
