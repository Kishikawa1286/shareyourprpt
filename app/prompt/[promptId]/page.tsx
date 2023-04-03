import 'server-only';

import Client from '../../../components/client';
import ContentWrapper from '../../../components/content-wrapper';
import BodyWrapper from '../../../components/prompt-page/body-wrapper';
import ChatPart from '../../../components/prompt-page/chat-part';
import PromptDescriptionPart from '../../../components/prompt-page/prompt-description-part';
import { createServerClient } from '../../../utils/supabase/supabase-server';

export default async function PromotPage({ params }: { params: { promptId: string } }) {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

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
          <Client session={session}>
            <ChatPart />
          </Client>
        </ContentWrapper>
      }
    />
  );
}
