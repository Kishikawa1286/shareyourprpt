import { ChatGPTUnofficialProxyAPI, ChatMessage } from 'chatgpt'
import ExpiryMap from 'expiry-map'

const cache = new ExpiryMap(10000) // 10 s
const CACHE_ACCESS_TOKEN_KEY = 'accessToken'

/**
 * Represents the result of an attempt to retrieve an access token from the Chat API.
 *
 * @property {boolean} success - Whether the operation was successful.
 * @property {string} accessToken - The access token, if the operation was successful.
 */
type GetChatGPTaccessTokenResult = {
  success: boolean
  accessToken: string
}
/**
 * Retrieves an access token from the Chat API, either from the cache or by making an API request.
 * @returns A Promise resolving to a `GetChatGPTaccessTokenResult` object, indicating whether the operation was successful and providing the access token (if applicable).
 */
export const getChatGPTaccessToken = async (): Promise<GetChatGPTaccessTokenResult> => {
  const cacheAccessToken = cache.get(CACHE_ACCESS_TOKEN_KEY)
  if (cacheAccessToken) {
    return cacheAccessToken
  }
  const resp = await fetch('https://chat.openai.com/api/auth/session')
  if (resp.status === 403) {
    return { success: false, accessToken: '' }
  }
  const data = await resp.json().catch(() => ({}))
  const { accessToken } = data
  if (typeof accessToken !== 'string') {
    return { success: false, accessToken: '' }
  }
  cache.set(CACHE_ACCESS_TOKEN_KEY, accessToken)
  return { success: true, accessToken: accessToken }
}

/**
 * Sends a chat message using the provided access token.
 * @param accessToken - The access token used to authenticate the request.
 * @param message - The message to be sent.
 * @param conversationId - (Optional) The ID of the conversation in which to send the message.
 * @param parentMessageId - (Optional) The ID of the parent message in a thread to which this message is a reply.
 * @returns A ReadableStream of chat messages, representing the progress of the message sending operation.
 */
export const sendMessage = (
  accessToken: string,
  message: string,
  conversationId?: string,
  parentMessageId?: string
) => {
  const api = new ChatGPTUnofficialProxyAPI({ accessToken })

  const underlyingSource = {
    async start(controller: ReadableStreamDefaultController<ChatMessage>) {
      await api.sendMessage(message, {
        conversationId,
        parentMessageId,
        onProgress: (partialRes) => {
          controller.enqueue(partialRes)
        },
      })
      controller.close()
    },
  }

  const stream = new ReadableStream<ChatMessage>(underlyingSource)
  return stream
}

/*
  for await (const msg of streamAsyncIterable(stream)) {
    do some processing here
  }
*/
