import { FirebaseMessage } from '@/type'
import { atomFamily } from 'recoil'

export const messageAtom = atomFamily<FirebaseMessage[], string | null>(
  {
    key: 'states/atom/messageAtom',
    default: [
      {
        role: 'system',
        content:
          'サービス利用ユーザーからの質問や語りかけがあるので、サービスBotとして返答してください。',
        createdAt: null,
      },
    ],
  }
)
