'use client';

import { useEffect, useRef, useState } from 'react';
import ReactHamburgerMenu from 'react-hamburger-menu';
import { getAPIkeyStorage, setAPIkeyStorage } from '../../utils/openai/api-key-storage';

const OPEN_AI_API_KEY_PAGE = 'https://platform.openai.com/account/api-keys';

const HamburgerMenuItem = ({
  children,
  href,
  onClick,
}: {
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) => (
  <a href={href} onClick={onClick} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
    {children}
  </a>
);

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKeyInputValue, setApiKeyInputValue] = useState<string>(getAPIkeyStorage() ?? '');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div ref={menuRef}>
        <ReactHamburgerMenu
          isOpen={isOpen}
          menuClicked={toggleIsOpen}
          width={18}
          height={15}
          strokeWidth={2}
          rotate={0}
          color="#666"
          borderRadius={0}
          animationDuration={0.5}
        />
        {isOpen && (
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-md bg-white py-2 shadow-lg">
            <HamburgerMenuItem href="#">Sign In</HamburgerMenuItem>
            <HamburgerMenuItem href="#">Sign Up</HamburgerMenuItem>
            <HamburgerMenuItem onClick={() => setIsModalOpen(true)}>
              API Token Setting
            </HamburgerMenuItem>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-30 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center bg-gray-800/50 px-4">
            <div
              onClick={() => setIsModalOpen(false)}
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
                    setIsModalOpen(false);
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
