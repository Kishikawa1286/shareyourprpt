export default function PromptCode({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mx-1 mb-4 overflow-hidden rounded-md bg-gray-900">
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        <p className="block p-4 text-xs text-gray-400">{children}</p>
      </pre>
    </div>
  );
}
