'use client';

export const setAPIkeyStorage = (apiKey: string) => {
  localStorage.setItem('openAIapiKey', apiKey);
};

/**
 * Can only be called in hooks
 *
 * See: https://stackoverflow.com/questions/70829560/warning-did-not-expect-server-html-to-contain-a-div-in-div
 *
 * @returns {string | null} apiKey
 */
export const getAPIkeyStorage = (): string | null => {
  return localStorage.getItem('openAIapiKey');
};

export const removeAPIkeyStorage = () => {
  localStorage.removeItem('openAIapiKey');
};
