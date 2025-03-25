import type { FirebaseMessage } from '@/type'
import { atom } from 'jotai'

export const messageAtom = atom<FirebaseMessage[]>([
  {
    role: 'system',
    content:
      'サービス利用ユーザーからの質問や語りかけがあるので、サービスBotとして返答してください。',
    createdAt: null,
  },
])
