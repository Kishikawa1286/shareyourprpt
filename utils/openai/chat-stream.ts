import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequestStop,
  OpenAI,
} from 'openai-streams';

/**
 * Copied from [gptlabs/openai-streams](https://github.com/gptlabs/openai-streams/blob/master/src/lib/pinned.ts)
 * Redefine the CreateChatCompletionRequest type to fix the model as "gpt-3.5-turbo"
 */
type CreateChatCompletionRequest = {
  /**
   * ID of the model to use. Currently, only `gpt-3.5-turbo` and `gpt-3.5-turbo-0301` are supported.
   * @type {string}
   * @memberof CreateChatCompletionRequest
   */
  // Model is always `gpt-3.5-turbo`
  // 'model': string;
  /**
   * The messages to generate chat completions for, in the [chat format](/docs/guides/chat/introduction).
   * @type {Array<ChatCompletionRequestMessage>}
   * @memberof CreateChatCompletionRequest
   */
  messages: Array<ChatCompletionRequestMessage>;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.  We generally recommend altering this or `top_p` but not both.
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.  We generally recommend altering this or `temperature` but not both.
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  top_p?: number | null;
  /**
   * How many chat completion choices to generate for each input message.
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  n?: number | null;
  /**
   * If set, partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format) as they become available, with the stream terminated by a `data: [DONE]` message.
   * @type {boolean}
   * @memberof CreateChatCompletionRequest
   */
  stream?: boolean | null;
  /**
   * @type {CreateChatCompletionRequestStop}
   * @memberof CreateChatCompletionRequest
   */
  stop?: CreateChatCompletionRequestStop;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model\'s likelihood to talk about new topics.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  presence_penalty?: number | null;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model\'s likelihood to repeat the same line verbatim.  [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
   * @type {number}
   * @memberof CreateChatCompletionRequest
   */
  frequency_penalty?: number | null;
  /**
   * Modify the likelihood of specified tokens appearing in the completion.  Accepts a json object that maps tokens (specified by their token ID in the tokenizer) to an associated bias value from -100 to 100. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.
   * @type {object}
   * @memberof CreateChatCompletionRequest
   */
  logit_bias?: object | null;
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   * @type {string}
   * @memberof CreateChatCompletionRequest
   */
  user?: string;
};

/**
 * Create a chat session that returns a stream of messages from OpenAI's API.
 * This function takes an API key and a request configuration and returns a transform stream
 * of `ChatCompletionRequestMessage`s. The message content is gradually mutated as more data is received.
 *
 * @param {string} apiKey - Your API key.
 * @param {CreateChatCompletionRequest} args - Request configuration.
 * @returns {ReadableStream<ChatCompletionRequestMessage>} A transform stream of chat messages.
 */
export const chatStream = async (apiKey: string, args: CreateChatCompletionRequest) => {
  // Open a new chat session.
  const stream = await OpenAI(
    'chat',
    {
      model: 'gpt-3.5-turbo', // The name of the GPT-3 model to use.
      ...args, // Other configuration options to pass along.
    },
    {
      apiKey, // Your OpenAI API key.
      mode: 'tokens', // Use a streaming mode optimized for working with tokenized data.
    },
  );

  // We will mutate the following message object as data comes in
  // and enqueue it as a new copy when it is complete
  const message: ChatCompletionRequestMessage = {
    role: 'assistant', // The role of this message sender (either 'user' or 'assistant').
    content: '', // The full text content of this message.
  };

  // These objects are used to decode JSON and encode string data, respectively.
  const decoder = new TextDecoder();

  // This transformer takes the raw bytes from the stream and enqueues completed chat messages on demand..
  const transformer = new TransformStream<Uint8Array, ChatCompletionRequestMessage>({
    transform(chunk, controller) {
      const json = JSON.parse(decoder.decode(chunk)); // Parse the incoming JSON data.
      const role = json.role;
      if (role === 'assistant' || role === 'agent') {
        message.role = role; // Update this message's role based on information from JSON.
      }

      const content = json.content;
      if (typeof content === 'string') {
        message.content += content; // Append any new message content to the current message.
        controller.enqueue({ ...message }); // Enqueue the current message content as a new object.
      }
    },

    flush(controller) {
      // When the stream ends or there is no more content, enqueue the final message object and terminate the stream.
      controller.enqueue({ ...message });
      controller.terminate();
    },
  });

  // Return a pipeline from the stream through our message-assembling transform stream.
  return stream.pipeThrough(transformer);
};