import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { MdLogout } from 'react-icons/md'

const AuthListItem = ({ handleSignOut }: { handleSignOut: () => void }) => {
  return (
    <ListItemButton sx={{ height: 60 }} onClick={handleSignOut}>
      <ListItemIcon>
        <MdLogout style={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary={'Logout'} />
    </ListItemButton>
  )
}

export default AuthListItem
