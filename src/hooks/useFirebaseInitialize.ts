import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { collection, getDocs } from 'firebase/firestore'
import { THREAD_COLLECTION as COLLECTION } from '@/constant/firebase'
import { db } from '@/firebase/config'
import { currentThreadIdAtom } from '@/states/atom/currentThreadIdAtom'
import { threadListAtom } from '@/states/atom/threadListAtom'
import { isFirstPostAtom } from '@/states/atom/isFirstPostAtom'
import { FirebaseThread } from '@/type'

export const useFirebaseInitialize = (currentId: string) => {
  const [, setCurrentId] = useRecoilState(currentThreadIdAtom)
  const [, setThreadList] = useRecoilState(threadListAtom)
  const [, setIsFirstPost] = useRecoilState(isFirstPostAtom)

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
  }, [])
}
