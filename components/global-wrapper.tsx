import 'server-only';

export default function GlobalWrapper({ children }: { children?: React.ReactNode }) {
  return <div className=" m-0 flex min-h-screen flex-col p-0">{children}</div>;
}
