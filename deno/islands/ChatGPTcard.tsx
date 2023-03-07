import { getChatGPTaccessToken } from 'client_provider/chat_gpt.ts'
import { useEffect, useState } from 'preact/hooks'

type ChatGPTmessage = {
  type: 'question' | 'response'
  text: string
}

const ChatGPTcard = () => {
  const [accessToken, setAccessToken] = useState<string>('')
  // const [conversation, setConversation] = useState<ChatGPTmessage[]>([]);

  // check cache and session
  useEffect(() => {
    getChatGPTaccessToken().then((result) => {
      if (!result) {
        return
      }
      setAccessToken(result.accessToken)
    })
  })

  if (accessToken.length === 0) {
    return (
      <div>
        <p>
          <a href="https://chat.openai.com" target="_blank" rel="noreferrer">
            Click here to login to Open AI
          </a>
        </p>
      </div>
    )
  }

  return <p>{accessToken}</p>
}

export default ChatGPTcard
