import 'server-only';

/**
 * Children of GlobalWrapper that has `flex flex-col`
 */
export default function ContentWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-gray-100 md:py-8">
      <div
        className="w-full
        rounded-md bg-white
        md:mx-auto md:h-full md:py-4
        "
      >
        {children}
      </div>
    </div>
  );
}
