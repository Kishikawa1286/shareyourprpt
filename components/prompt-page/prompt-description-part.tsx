import 'server-only';

import PromptCode from './prompt-code';

export default function PromptDescriptionPart({
  title,
  systemPrompt,
  userPrompt,
}: {
  title: string;
  systemPrompt: string;
  userPrompt: string;
}) {
  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-3xl font-bold"> {title} </h1>

      {/* summery comes here */}

      <h2 className="mb-1 text-xl font-bold"> System Prompt </h2>
      <PromptCode>{systemPrompt}</PromptCode>

      <h2 className="mb-1 text-xl font-bold"> User Prompt </h2>
      <PromptCode>{userPrompt}</PromptCode>

      {/* parameter (like temperature) comes here */}
    </div>
  );
}
