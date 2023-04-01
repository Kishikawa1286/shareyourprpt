import 'server-only';

/**
 * Children of GlobalWrapper that has `flex flex-col`
 */
export default function ContentWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <div className="h-full bg-gray-100 md:py-4">
      <div
        className="h-full
        w-full rounded-md
        bg-white md:mx-auto md:py-4
        "
      >
        {children}
      </div>
    </div>
  );
}
