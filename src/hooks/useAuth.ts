import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { FirebaseError } from '@firebase/util'

type FormData = {
  email: string
  password: string
}

export const useAuth = () => {
  const [isLoadingSignIn, setIsLoadingSignIn] = useState<boolean>(false)
  const [isLoadingSignUp, setIsLoadingSignUp] = useState<boolean>(false)

  const onSubmitSignIn: SubmitHandler<FormData> = async (
    formData: FormData
  ) => {
    const { email, password } = formData
    setIsLoadingSignIn(true)
    try {
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    } finally {
      setIsLoadingSignIn(false)
    }
  }

  const onSubmitSignUp: SubmitHandler<FormData> = async (
    formData: FormData
  ) => {
    const { email, password } = formData
    setIsLoadingSignUp(true)
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await sendEmailVerification(userCredential.user)
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    } finally {
      setIsLoadingSignUp(false)
    }
  }

  return {
    isLoadingSignIn,
    onSubmitSignIn,
    isLoadingSignUp,
    onSubmitSignUp,
  }
}
