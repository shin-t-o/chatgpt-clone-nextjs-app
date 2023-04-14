'use client'

import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useFirebaseAuth } from '@/components/Auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

type FormData = {
  email: string
  password: string
}

const SignIn = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { user } = useFirebaseAuth()
  const { isLoadingSignIn: isLoading, onSubmitSignIn: onSubmit } = useAuth()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  return (
    <Grid container>
      <Typography>Sign In</Typography>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
        <Stack spacing={3}>
          <TextField
            required
            label="Mail Address"
            type="email"
            {...register('email')}
          />
          <TextField
            required
            label="Password"
            type="password"
            {...register('password')}
          />
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            Sign In
          </Button>
        </Stack>
      </Container>
    </Grid>
  )
}

export default SignIn
