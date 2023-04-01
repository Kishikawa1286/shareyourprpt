import 'server-only';

import './body-wrapper.css';

export default function BodyWrapper({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="wrapper grow lg:px-28">
      <div className="left grow">{left}</div>
      <div className="right" style={{ flexBasis: '50%' }}>
        {right}
      </div>
    </div>
  );
}
