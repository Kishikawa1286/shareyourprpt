'use client';

import { useState } from 'react';
import ReactHamburgerMenu from 'react-hamburger-menu';

const HamburgerMenuItem = ({ children, href }: { children?: React.ReactNode; href?: string }) => (
  <a href={href} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
    {children}
  </a>
);

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <ReactHamburgerMenu
        isOpen={isOpen}
        menuClicked={handleClick}
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
          <HamburgerMenuItem href="#">API Token Setting</HamburgerMenuItem>
        </div>
      )}
    </div>
  );
}
