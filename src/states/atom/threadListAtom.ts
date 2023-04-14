import { FirebaseThread } from '@/type'
import { Timestamp } from 'firebase/firestore'
import { atom, atomFamily } from 'recoil'

export const threadListAtom = atom<FirebaseThread[]>({
  key: 'states/atom/threadListAtom',
  default: [
    {
      id: '',
      title: '',
      createdAt: Timestamp.fromDate(new Date()),
    },
  ],
})
