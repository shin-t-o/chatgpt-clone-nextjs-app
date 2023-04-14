import { useRecoilState, useRecoilValue } from 'recoil'
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { ulid } from 'ulid'
import {
  THREAD_COLLECTION as COLLECTION,
  THREAD_SUBCOLLECTION as SUBCOLLECTION,
} from '@/constant/firebase'
import { db } from '@/firebase/config'
import { sendMessage } from '@/api/chatGpt'
import { makePostData, makeSummarizeTitle } from '@/utils/makePostData'
import { currentThreadIdAtom } from '@/states/atom/currentThreadIdAtom'
import { threadListAtom } from '@/states/atom/threadListAtom'
import { isFirstPostAtom } from '@/states/atom/isFirstPostAtom'
import { messageWithDateAtom as threadMsg } from '@/states/atom/messageWithDateAtom'
import { FirebaseThread } from '@/type'
import { isLoadingAtom } from '@/states/atom/isLoadingAtom'

export const useFirebase = () => {
  const router = useRouter()
  const currentId = useRecoilValue(currentThreadIdAtom)
  const [currentMsg, setCurrentMsg] = useRecoilState(threadMsg(currentId))
  const [threadList, setThreadList] = useRecoilState(threadListAtom)
  const [isFirstPost, setIsFirstPost] = useRecoilState(isFirstPostAtom)
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom)
  const [, setMessages] = useRecoilState(threadMsg(currentId))

  const onClickNew = () => {
    if (isFirstPost) return
    router.push('/')
    setIsFirstPost(true)
    setMessages([])
  }

  const addMessage = async (newMessage: ChatGptMessage, threadId: string) => {
    const now = new Date()
    try {
      addFirestoreDoc(newMessage, threadId)
      const tempMsg = currentMsg
      setCurrentMsg([
        ...tempMsg,
        {
          ...newMessage,
          createdAt: Timestamp.fromDate(now),
        },
      ])
      const res = await sendMessage(
        makePostData({
          baseMessage: tempMsg,
          newMessage: newMessage,
        })
      )
      setCurrentMsg([
        ...tempMsg,
        {
          ...newMessage,
          createdAt: Timestamp.fromDate(now),
        },
        {
          ...res.choices[0].message,
          createdAt: Timestamp.fromDate(new Date()),
        },
      ])
      addFirestoreDoc(res.choices[0].message, threadId)
    } catch (e: any) {
      console.error(e)
    }
  }

  const addFirestoreDoc = async (
    newMessage: ChatGptMessage,
    threadId: string
  ) => {
    const mRef = collection(db, COLLECTION, threadId, SUBCOLLECTION)
    await addDoc(mRef, {
      role: newMessage.role,
      content: newMessage.content,
      createdAt: Timestamp.fromDate(new Date()),
    })
  }

  const addFirestoreDocTitle = async (title: string, threadId: string) => {
    await setDoc(doc(db, COLLECTION, threadId), {
      title: title,
      createdAt: Timestamp.fromDate(new Date()),
    })
  }

  const updateTitle = async (
    newMessage: ChatGptMessage,
    threadId: string,
    currentThreadList: FirebaseThread[]
  ) => {
    const res = await sendMessage(makeSummarizeTitle({ newMessage }))
    const title = res.choices[0].message.content
    setThreadList([
      {
        id: threadId,
        title: title,
        createdAt: Timestamp.fromDate(new Date()),
      },
      ...currentThreadList,
    ])
    addFirestoreDocTitle(title, threadId)
  }

  const addMessages = async (newMessage: ChatGptMessage) => {
    // 同期/非同期処理が混在しているため一時変数に格納してupdate先を指定
    let threadId = currentId
    let currentThreadList = [...threadList].sort(
      // @ts-ignore
      (a, b) => b.createdAt - a.createdAt
    )
    setIsLoading(true)

    // 初回投稿のみスレッド追加
    if (isFirstPost) {
      threadId = ulid()
      setThreadList([
        {
          id: threadId,
          title: '',
          createdAt: Timestamp.fromDate(new Date()),
        },
        ...currentThreadList,
      ])
    }

    // 表示要Recoil, 履歴保持用Firestoreへの格納
    await addMessage(newMessage, threadId)

    // 初回投稿のみタイトル付与
    if (isFirstPost) {
      await updateTitle(newMessage, threadId, currentThreadList)
      setIsFirstPost(false)
    }

    setIsLoading(false)
  }

  return { addMessages, isLoading, onClickNew }
}
