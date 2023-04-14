import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import { MdLogin, MdPersonAddAlt } from 'react-icons/md'
import { useRouter } from 'next/navigation'

const UnAuthListItem = () => {
  const router = useRouter()
  return (
    <>
      <ListItemButton
        sx={{ height: 60 }}
        onClick={() => router.push('/signin')}
      >
        <ListItemIcon>
          <MdLogin style={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary={'Sign In'} />
      </ListItemButton>
      <ListItemButton
        sx={{ height: 60 }}
        onClick={() => router.push('/signup')}
      >
        <ListItemIcon>
          <MdPersonAddAlt style={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary={'Sign Up'} />
      </ListItemButton>
    </>
  )
}

export default UnAuthListItem
