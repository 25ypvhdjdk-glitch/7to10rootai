import { createAgentUIStreamResponse } from 'ai';
import { rootAgent } from '@/lib/agent';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const uiMessages = Array.isArray(body?.messages) ? body.messages : [];

    if (!uiMessages.length) {
      return Response.json({ error: 'MESSAGES_REQUIRED' }, { status: 400 });
    }

    const stream = await createAgentUIStreamResponse({
      agent: rootAgent,
      uiMessages,
    });

    return stream;
  } catch (error) {
    console.error('ROOT_AGENT_ERROR', error);
    return Response.json(
      { error: 'AGENT_EXECUTION_FAILED', humanAuthority: true },
      { status: 500 },
    );
  }
}
