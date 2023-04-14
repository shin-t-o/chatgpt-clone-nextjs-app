'use client'

import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/hooks/useAuth'

type FormData = {
  email: string
  password: string
}

const SignUp = () => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { isLoadingSignUp: isLoading, onSubmitSignUp: onSubmit } = useAuth()

  return (
    <Grid container>
      <Typography>Sign Up</Typography>
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
            Sign Up
          </Button>
        </Stack>
      </Container>
    </Grid>
  )
}

export default SignUp
