import 'server-only';

import './body-wrapper.css';

export default function BodyWrapper({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  const isPCScreen = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    const mediaQueryList = window.matchMedia('(min-width: 768px)');
    console.log(mediaQueryList.matches);
    return mediaQueryList.matches;
  };

  return (
    <div className="lg:px-28">
      <div className={isPCScreen() ? 'wrapper' : 'wrapper'}>
        <div className="left grow">{left}</div>
        <div className="right grow">{right}</div>
      </div>
    </div>
  );
}
