type ChatGptMessage = {
  role: 'user' | 'system' | 'assistant'
  content: string
}

type Thread = {
  id: string
  title: string
}
