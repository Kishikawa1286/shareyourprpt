'use client';

import { useEffect, useState } from 'react';
import { getAPIkeyStorage, setAPIkeyStorage } from '../../../../utils/openai/api-key-storage';

const OPEN_AI_API_KEY_PAGE = 'https://platform.openai.com/account/api-keys';

export default function APItokenModal({
  open,
  onClickBackground,
  onClickSaveButton,
}: {
  open: boolean;
  onClickBackground?: () => void;
  onClickSaveButton?: (value: string) => void;
}) {
  const [apiKeyInputValue, setApiKeyInputValue] = useState<string>('');

  useEffect(() => {
    setApiKeyInputValue(getAPIkeyStorage() ?? '');
  });

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center bg-gray-800/50 px-4">
            <div
              onClick={onClickBackground}
              className="fixed inset-0 z-40 bg-gray-500 opacity-75"
            />
            <div className="z-50 inline-block overflow-hidden rounded-lg bg-white p-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <p className="mb-2 text-center font-bold">
                Please enter{' '}
                <a className="underline" href={OPEN_AI_API_KEY_PAGE} target="_blank">
                  your API key
                </a>
              </p>
              <div className="mb-2 flex justify-center">
                <input
                  type="text"
                  className="w-64 rounded border border-gray-400 px-4 py-2 text-sm outline-none"
                  placeholder="sk-xxxxxx"
                  value={apiKeyInputValue}
                  onChange={(event) => setApiKeyInputValue(event.target.value)}
                />
                <button
                  className="rounded-r bg-gray-600 px-4 py-2 text-white"
                  onClick={() => {
                    setAPIkeyStorage(apiKeyInputValue);
                    if (onClickSaveButton) {
                      onClickSaveButton(apiKeyInputValue);
                    }
                  }}
                >
                  Save
                </button>
              </div>
              <p className="mt-2 text-center text-xs font-bold">(saved in local storage)</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
