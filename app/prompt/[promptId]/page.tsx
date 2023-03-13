import 'server-only';

import ContentWrapper from '../../../components/content-wrapper';
import BodyWrapper from '../../../components/prompt-page/body-wrapper';

import PromptDescriptionPart from '../../../components/prompt-page/prompt-description-part';
import ReplacementTextarea from '../../../components/prompt-page/replacement-textarea';

export default function PromotPage({ params }: { params: { promptId: string } }) {
  return (
    <BodyWrapper
      left={
        <ContentWrapper>
          <div className="mx-2 flex flex-col">
            <PromptDescriptionPart
              title="Prompt 1"
              systemPrompt="System prompt 1"
              userPrompt="User prompt 1"
            />
          </div>
        </ContentWrapper>
      }
      right={
        <ContentWrapper>
          <div className="mx-2 flex flex-col">
            <PromptDescriptionPart
              title="Prompt 1"
              systemPrompt="System prompt 1"
              userPrompt="User prompt 1"
            />
            <h2 className="mb-1 text-xl font-bold"> Start Chat </h2>
            <ReplacementTextarea />
          </div>
        </ContentWrapper>
      }
    />
  );
}
