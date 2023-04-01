import 'server-only';

import ContentWrapper from '../../../components/content-wrapper';
import BodyWrapper from '../../../components/prompt-page/body-wrapper';
import ChatPart from '../../../components/prompt-page/chat-part';

import PromptDescriptionPart from '../../../components/prompt-page/prompt-description-part';

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
          <ChatPart />
        </ContentWrapper>
      }
    />
  );
}
