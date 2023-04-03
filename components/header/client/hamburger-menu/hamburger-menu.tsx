'use client';

import { useEffect, useRef, useState } from 'react';
import ReactHamburgerMenu from 'react-hamburger-menu';
import { useSupabase } from '../../../supabase-provider';
import APItokenModal from './api-token-modal';
import SignInModal from './sign-in-modal';

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
  const context = useSupabase();
  if (!context) return null;
  const { supabase } = context;

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSignInModal, setIsOpenSignInModal] = useState(false);
  const [isOpenAPItokenModal, setIsOpenAPItokenModal] = useState(false);
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
            {!context.session && (
              <HamburgerMenuItem onClick={() => setIsOpenSignInModal(true)}>
                Sign In / Sign Up
              </HamburgerMenuItem>
            )}
            {context.session && (
              <HamburgerMenuItem
                onClick={async () => {
                  try {
                    await supabase.auth.signOut();
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                Sign Out
              </HamburgerMenuItem>
            )}
            <HamburgerMenuItem onClick={() => setIsOpenAPItokenModal(true)}>
              API Token Setting
            </HamburgerMenuItem>
          </div>
        )}
      </div>
      <SignInModal
        open={isOpenSignInModal}
        onClickBackground={() => setIsOpenSignInModal(false)}
        onSigningIn={() => setIsOpenSignInModal(false)}
      />
      <APItokenModal
        open={isOpenAPItokenModal}
        onClickBackground={() => setIsOpenAPItokenModal(false)}
        onClickSaveButton={() => setIsOpenAPItokenModal(false)}
      />
    </>
  );
}
