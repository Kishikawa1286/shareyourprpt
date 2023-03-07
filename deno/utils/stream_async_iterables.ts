/**
 * Converts a ReadableStream to an async iterable stream.
 * @param stream - The ReadableStream object to be converted.
 * @returns An async iterable stream of the values in the ReadableStream.
 */
export async function* streamAsyncIterable<T>(stream: ReadableStream<T>) {
  const reader = stream.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        return
      }
      yield value
    }
  } finally {
    reader.releaseLock()
  }
}
