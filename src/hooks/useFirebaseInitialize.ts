import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { collection, getDocs } from 'firebase/firestore'
import { THREAD_COLLECTION as COLLECTION } from '@/constant/firebase'
import { db } from '@/firebase/config'
import { currentThreadIdAtom } from '@/states/atom/currentThreadIdAtom'
import { threadListAtom } from '@/states/atom/threadListAtom'
import { isFirstPostAtom } from '@/states/atom/isFirstPostAtom'
import type { FirebaseThread } from '@/type'

export const useFirebaseInitialize = (currentId: string) => {
  const setCurrentId = useSetAtom(currentThreadIdAtom)
  const setThreadList = useSetAtom(threadListAtom)
  const setIsFirstPost = useSetAtom(isFirstPostAtom)

  useEffect(() => {
    setIsFirstPost(currentId === '')
    ;(async () => {
      // 初回描画用threadId list 取得
      const querySnapshot = await getDocs(collection(db, COLLECTION))
      const tList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        createdAt: doc.data().createdAt,
      })) as FirebaseThread[]
      setCurrentId(currentId)
      setThreadList(tList)
    })()
  }, [currentId, setCurrentId, setThreadList, setIsFirstPost])
}
