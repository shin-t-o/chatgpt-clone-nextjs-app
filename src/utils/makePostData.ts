import { FirebaseMessage } from '@/type'

type MakePostProps = {
  baseMessage: FirebaseMessage[] | []
  newMessage: ChatGptMessage
}

export const makePostData = ({ baseMessage, newMessage }: MakePostProps) => {
  const msg = baseMessage.map((m) => {
    return {
      role: m.role,
      content: m.content,
    }
  })
  return [
    // 質問数が増えすぎたらtoken節約のためにカット
    ...(msg.length === 6
      ? [msg[0], ...msg.slice(msg.length - 4, 6)]
      : [...msg]),
    newMessage,
  ]
}

export const makeSummarizeTitle = ({
  newMessage,
}: {
  newMessage: ChatGptMessage
}) => {
  return [
    {
      role: 'system',
      content:
        'Please summarize the following statement by user in 100 character count or less in English, excluding the subject line(no need to start with "The user ..."). If you need fewer words, do not increase the word count.',
    },
    newMessage,
  ] as ChatGptMessage[]
}
