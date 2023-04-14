type Props = {
  url: string
  messages: ChatGptMessage[]
}

export const fetcherForChatGpt = async ([url, messages]: [
  url: string,
  message: ChatGptMessage[]
]) => {
  const apiKey = process.env.OPENAI_APIKEY
  const body = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: messages,
  })

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  })
    .then((r) => r.json())
    .then((r) => r.choices[0].message)
    .catch((e) => new Error(e))
}

const requestAPI = async (url: string, messages: ChatGptMessage[]) => {
  const apiKey = process.env.OPENAI_APIKEY

  const body = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: messages,
  })

  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  })

  if (!result.ok) {
    let err = new Error(await result.json())
    throw err
  }
  return await result.json()
}

export const sendMessage = async (messages: ChatGptMessage[]) => {
  return requestAPI('/api/chatGpt', messages)
}
