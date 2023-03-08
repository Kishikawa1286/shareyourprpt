import { sendMessage } from "client_provider/chat_gpt.ts"
import { useEffect, useState } from 'preact/hooks'

type ChatGPTmessage = {
  type: 'question' | 'response'
  text: string
}

const ChatGPTcard = () => {
  const [accessToken, setAccessToken] = useState<string>('')
  const [conversation, setConversation] = useState<ChatGPTmessage[]>([]);

  // check cache and session
  useEffect(() => {
    // getChatGPTaccessToken().then((result) => {
    //   if (!result) {
    //     return
    //   }
    //   setAccessToken(result.accessToken)
    // })
    setAccessToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJrZW50YXJvaXNoaWthd2ExMjg2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW9pcF9jb3VudHJ5IjoiSlAifSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLWtwTno5Sk1YeVh3dTRNUHRBS2JaZGpaTiJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDM5MDI4OTQ4OTk4MzM4NDQ3NDAiLCJhdWQiOlsiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MSIsImh0dHBzOi8vb3BlbmFpLm9wZW5haS5hdXRoMGFwcC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc3OTI4MzcyLCJleHAiOjE2NzkxMzc5NzIsImF6cCI6IlRkSkljYmUxNldvVEh0Tjk1bnl5d2g1RTR5T282SXRHIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBtb2RlbC5yZWFkIG1vZGVsLnJlcXVlc3Qgb3JnYW5pemF0aW9uLnJlYWQgb2ZmbGluZV9hY2Nlc3MifQ.C-vTEt5rwQcyHH1u06_ZV_jmVSLw9aGODCQRZB3fcc9ogQwfAjZ-49vXaQNfkL1c-9tdi7wHro_WhY1bdoUY7heFm2ZTMj54AjM1HxzTfkU6G0JXdZH8dGp_xxySNOCO_qX-Cr4SexTgeSwY3NbDH_4S4y_T_QpxULu5Ge3HaXu9Qn-5e--nAHEsm46SbMvM77oBdJl_MtzalZmMwjFnX7mWQFfa0ZPkPJsK7WdXV3QKZAUsB_yyApGYpLg0AVNLpnOEUiTG5G8CoHXdAbk3EJuj2ok8oLzyXJoxn-cYfCKlSIgjPs_h7BBZyexDbb0b52NaH7LaXxVYFIUFrOuvvA")
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

  return <div>
    <p>
      {accessToken}
    </p>
    <button onClick={() => sendMessage(accessToken, "hi, world").getReader().read().then(console.log)}>
      seendMessage
    </button>

    <iframe src="https://chat.openai.com/chat" title="Chat GPT"></iframe>
  </div>
}

export default ChatGPTcard
