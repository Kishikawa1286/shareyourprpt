'use client';

export const setAPIkeyStorage = (apiKey: string) => localStorage.setItem('openAIapiKey', apiKey);

export const getAPIkeyStorage = () => localStorage.getItem('openAIapiKey');

export const removeAPIkeyStorage = () => localStorage.removeItem('openAIapiKey');
