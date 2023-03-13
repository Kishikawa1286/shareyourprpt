import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center">
          <div className="px-5 py-2">
            <Link href="/terms-of-use" passHref>
              <span className="cursor-pointer text-xs text-gray-500 hover:text-gray-900">
                Terms of use
              </span>
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="/privacy-policy" passHref>
              <span className="cursor-pointer text-xs text-gray-500 hover:text-gray-900">
                Privacy policy
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
