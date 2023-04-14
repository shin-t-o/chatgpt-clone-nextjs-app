import { Divider, Stack } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ChatCard } from './ChatCard'
import SubmitForm from './SubmitForm'
import { useFirebase } from '@/hooks/useFirebase'
import { useMessageInitialize as initializeMsg } from '@/hooks/useMessageInitialize'
import { FirebaseMessage } from '@/type'

type FormData = {
  content: string
}

const Chat = () => {
  const { messages } = initializeMsg()
  const { addMessages, isLoading } = useFirebase()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: { content: '' },
  })

  const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
    const newMessage: ChatGptMessage = {
      role: 'user',
      content: formData.content,
    }
    addMessages(newMessage)
    reset()
  }

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <SubmitForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />

      <Divider style={{ backgroundColor: 'grey', borderWidth: 2 }} />

      <Stack m={4} spacing={4}>
        {messages.length > 0 &&
          [...messages]
            .filter((m: FirebaseMessage) => m.role !== 'system')
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((m: FirebaseMessage, index: number) => {
              return <ChatCard key={index} message={m} />
            })}
      </Stack>
    </Stack>
  )
}

export default Chat
