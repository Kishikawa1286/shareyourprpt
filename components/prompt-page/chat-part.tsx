'use client';

import { ChatCompletionRequestMessage } from 'openai-streams';
import { useState } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import { getAPIkeyStorage, setAPIkeyStorage } from '../../utils/openai/api-key-storage';
import { chatStream } from '../../utils/openai/chat-stream';
import StyledReactMarkdown from '../styled-react-markdown/styled-react-markdown';

const OPEN_AI_API_KEY_PAGE = 'https://platform.openai.com/account/api-keys';

const chatMessageBackgroundClass = (role: string) => {
  switch (role) {
    case 'user':
      return 'bg-white';
    case 'assistant':
      return 'bg-gray-200';
    default:
      return 'bg-white';
  }
};

const ChatMessage = ({ message }: { message: ChatCompletionRequestMessage }) => (
  <div className={`${chatMessageBackgroundClass(message.role)}`}>
    <p className="pl-2 pt-1 text-xs font-bold">{message.role}:</p>
    <StyledReactMarkdown>{message.content}</StyledReactMarkdown>
  </div>
);

export default function ChatPart() {
  const [apiKey, setApiKey] = useState(getAPIkeyStorage() ?? '');
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [messageUpdating, setMessageUpdating] = useState<boolean>(false);
  const [textareaValue, setTextAreaValue] = useState<string>('');
  const [textareaDisabled, setTextAreaDisabled] = useState<boolean>(false);
  const [apiKeyInputValue, setApiKeyInputValue] = useState<string>('');

  const sendMessage = async (userMessageContent: string) => {
    if (apiKey === '') {
      return;
    }

    const userMessage: ChatCompletionRequestMessage = { role: 'user', content: userMessageContent };

    const stream = await chatStream(apiKey, {
      messages: [...messages, userMessage],
    });

    setTextAreaDisabled(true);
    const reader = stream.getReader();
    const startAt = Date.now();
    while (Date.now() < startAt + 120000) {
      try {
        const { done, value } = await reader.read();
        if (value) {
          if (messageUpdating) {
            // replace the last item
            setMessages([...messages.slice(0, -1), userMessage, value]);
          } else {
            // add a new item (assistant message)
            setTextAreaValue('');
            setMessages([...messages, userMessage, value]);
          }
          setMessageUpdating(true);
        }
        if (done) break;
      } catch (e) {
        console.error(e);
        break;
      }
    }

    setMessageUpdating(false);
    setTextAreaDisabled(false);
  };

  return (
    <div className="flex h-full flex-col">
      <Scrollbar className="grow" style={{ position: 'relative' }}>
        {messages.map((message, i) => (
          <ChatMessage message={message} key={`message_${i}`} />
        ))}
      </Scrollbar>
      <div className="relative overflow-hidden border-t-2">
        <textarea
          className="block w-full p-4 text-xs"
          style={{ whiteSpace: 'pre-wrap', resize: 'none', outline: 'none' }}
          value={textareaValue}
          placeholder="Ask a question..."
          onChange={(event) => setTextAreaValue(event.target.value)}
          rows={10}
        />
        <button
          className="absolute right-0 bottom-0 mr-2 mb-3 rounded-md bg-gray-800 px-4 py-2 text-white"
          onClick={() => sendMessage(textareaValue)}
          disabled={textareaDisabled}
        >
          Submit
        </button>
        {!apiKey && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800/50">
            <p className="mb-2 font-bold text-white">
              Please enter{' '}
              <a className="underline" href={OPEN_AI_API_KEY_PAGE} target="_blank">
                your API key
              </a>
            </p>
            <div className="mb-2 flex">
              <input
                type="text"
                className="w-64 rounded-l-md px-4 py-2 text-sm"
                style={{ outline: 'none' }}
                placeholder="API key"
                value={apiKeyInputValue}
                onChange={(event) => setApiKeyInputValue(event.target.value)}
              />
              <button
                className="rounded-r-md bg-gray-600 px-4 py-2 text-white"
                onClick={() => {
                  setApiKey(apiKeyInputValue);
                  setAPIkeyStorage(apiKeyInputValue);
                }}
              >
                Save
              </button>
            </div>
            <p className="mb-2 text-xs font-bold text-white">(saved in local storage)</p>
          </div>
        )}
      </div>
    </div>
  );
}
