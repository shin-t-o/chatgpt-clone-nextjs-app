import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { collection, getDocs } from 'firebase/firestore'
import {
  THREAD_COLLECTION as COLLECTION,
  THREAD_SUBCOLLECTION as SUBCOLLECTION,
} from '@/constant/firebase'
import { db } from '@/firebase/config'
import { currentThreadIdAtom } from '@/states/atom/currentThreadIdAtom'
import { isFirstPostAtom } from '@/states/atom/isFirstPostAtom'
import { messageWithDateAtom as threadMsg } from '@/states/atom/messageWithDateAtom'

export const useMessageInitialize = () => {
  const currentId = useRecoilValue(currentThreadIdAtom)
  const [, setMessages] = useRecoilState(threadMsg(currentId))
  const messages = useRecoilValue(threadMsg(currentId))
  const [, setIsFirstPost] = useRecoilState(isFirstPostAtom)
  const [, setThreadId] = useRecoilState(currentThreadIdAtom)

  useEffect(() => {
    if (currentId === '') {
      setIsFirstPost(true)
      return
    }
    setThreadId(currentId)
    ;(async () => {
      const querySnapshot = await getDocs(
        collection(db, COLLECTION, currentId, SUBCOLLECTION)
      )
      const messages = querySnapshot.docs.map((doc) => {
        return {
          role: doc.data().role,
          content: doc.data().content,
          createdAt: doc.data().createdAt,
        }
      })
      setMessages(messages)
    })()
    return () => {}
  }, [currentId])

  return { messages }
}
