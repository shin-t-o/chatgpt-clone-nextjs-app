import { useEffect } from 'react'
import { useSetAtom, useAtomValue } from 'jotai'
import { collection, getDocs } from 'firebase/firestore'
import {
  THREAD_COLLECTION as COLLECTION,
  THREAD_SUBCOLLECTION as SUBCOLLECTION,
} from '@/constant/firebase'
import { db } from '@/firebase/config'
import { currentThreadIdAtom } from '@/states/atom/currentThreadIdAtom'
import { isFirstPostAtom } from '@/states/atom/isFirstPostAtom'
import { messageAtom as threadMsg } from '@/states/atom/messageAtom'

export const useMessageInitialize = () => {
  const currentId = useAtomValue(currentThreadIdAtom)
  const setMessages = useSetAtom(threadMsg)
  const messages = useAtomValue(threadMsg)
  const setIsFirstPost = useSetAtom(isFirstPostAtom)
  const setThreadId = useSetAtom(currentThreadIdAtom)

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
  }, [currentId, setIsFirstPost, setThreadId, setMessages])

  return { messages }
}
