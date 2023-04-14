import { FirebaseThread } from '@/type'
import { Box, Divider, List, ListItemButton, ListItemText } from '@mui/material'
import { useRouter } from 'next/navigation'

export const ThreadList = ({
  threadList,
}: {
  threadList: FirebaseThread[]
}) => {
  const router = useRouter()

  return (
    <Box
      role="presentation"
      sx={{
        paddingRight: 2,
        paddingLeft: 2,
        position: 'relative',
        height: '70%',
        overflow: 'auto',
      }}
    >
      <List>
        {[...threadList]
          // @ts-ignore: ts-2362/2363
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((thread) => (
            <div key={thread.id}>
              <ListItemButton
                sx={{ height: 50 }}
                onClick={() => router.push(`/${thread.id}`)}
              >
                <ListItemText
                  primary={
                    thread.title.length > 60
                      ? thread.title.slice(0, 60) + '...'
                      : thread.title
                  }
                  primaryTypographyProps={{ fontSize: 12 }}
                />
              </ListItemButton>
              <Box
                style={{
                  backgroundColor: 'grey',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  marginTop: 4,
                  marginBottom: 4,
                }}
              >
                <Divider />
              </Box>
            </div>
          ))}
      </List>
    </Box>
  )
}
