import type { FirebaseThread } from '@/type'
import { Timestamp } from 'firebase/firestore'
import { atom } from 'jotai'

export const threadListAtom = atom<FirebaseThread[]>([
  {
    id: '',
    title: '',
    createdAt: Timestamp.fromDate(new Date()),
  },
])
