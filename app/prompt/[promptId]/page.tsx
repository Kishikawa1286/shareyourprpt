import 'server-only';
import ReplacementTextarea from '../../../components/prompt-page/replacement-textarea';

const PromptCode = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-1 mb-4 overflow-hidden rounded-md bg-gray-900">
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        <p className="block p-4 text-xs text-gray-400">{children}</p>
      </pre>
    </div>
  );
};

export default function Article({ params }: { params: { promptId: string } }) {
  return (
    <div className="mx-2 flex flex-col">
      <h1 className="mb-4 text-3xl font-bold"> SAMPLE TITLE </h1>

      <h2 className="mb-1 text-xl font-bold"> System Prompt </h2>
      <PromptCode>
        event - compiled successfully in 275 ms (497 modules) wait - compiling... event - compiled
        successfully in 294 ms (497 modules) wait - compiling... event - compiled successfully in
        371 ms (497 modules) wait - compiling... event - compiled successfully in 318 ms (497
        modules) wait - compiling... event - compiled successfully in 321 ms (497 modules) wait -
        compiling... event - compiled successfully in 297 ms (497 modules) wait - compiling...
      </PromptCode>

      <h2 className="mb-1 text-xl font-bold"> User Prompt </h2>
      <PromptCode>
        warn - The `purge`/`content` options have changed in Tailwind CSS v3.0. warn - Update your
        configuration file to eliminate this warning. warn -
        https://tailwindcss.com/docs/upgrade-guide#configure-content-sources warn - The `darkMode`
        option in your Tailwind CSS configuration is set to `false`, which now behaves the same as
        `media`. warn - Change `darkMode` to `media` or remove it entirely. warn -
        https://tailwindcss.com/docs/upgrade-guide#remove-dark-mode-configuration
      </PromptCode>

      <ReplacementTextarea />
    </div>
  );
}
