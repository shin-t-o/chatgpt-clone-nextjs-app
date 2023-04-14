import { Timestamp } from 'firebase/firestore'

type FirebaseMessage = {
  createdAt: Timestamp | null
} & ChatGptMessage

type FirebaseThread = {
  createdAt: Timestamp
} & Thread
