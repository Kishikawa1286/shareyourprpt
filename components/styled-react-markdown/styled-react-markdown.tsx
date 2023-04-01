import './github-markdown-light.css';
import './github-markdown.css';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function StyledReactMarkdown({ children }: { children: string }) {
  return (
    <ReactMarkdown className="markdown-body bg-white/0 px-4 py-1 text-xs">{children}</ReactMarkdown>
  );
}
