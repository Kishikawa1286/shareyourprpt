import { ChatCompletionRequestMessage } from "openai-streams";
import { useState } from "preact/hooks";
import { chatStream } from "../client_provider/chat_gpt/chat_gpt.ts";

type ChatGPTmessage = {
  type: "question" | "response";
  text: string;
};

const ChatGPTcard = () => {
  const [apiKey, setApiKey] = useState<string>(
    "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",
  );
  const [numberOfMessages, setNumberOfMessages] = useState<number>(0);
  const incrementNumberOfMessages = () => setNumberOfMessages((prev) => prev++);
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  const sendMessage = async (newMessages: ChatCompletionRequestMessage[]) => {
    incrementNumberOfMessages();
    setMessages(newMessages); // Add user message

    const stream = await chatStream(apiKey, { messages: newMessages });

    incrementNumberOfMessages();
    for await (const message of stream) {
      console.log(message);
      const messagesCopy = messages.slice(); // Deep copy
      if (messagesCopy.length === numberOfMessages) {
        messagesCopy[numberOfMessages] = message; // Replace the last item
      } else {
        messagesCopy.push(message);
      }
      setMessages(messagesCopy);
    }
  };

  if (apiKey.length === 0) {
    return (
      <div>
        <p>
          Please set your api key from Open AI dashboard.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p>
        {apiKey}
      </p>
      <button
        onClick={() => {
          sendMessage([{
            role: "user",
            content: "My promise has dead. How can I do?",
          }]);
        }}
      >
        click here to start conversation
      </button>
      {messages.map((message) => {
        return (
          <div>
            <p>
              {message.role}: {message.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatGPTcard;
