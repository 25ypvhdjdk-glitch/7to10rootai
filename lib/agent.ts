import { ToolLoopAgent, tool, stepCountIs } from 'ai';
import { z } from 'zod';
import { ROOT_SYSTEM } from './root';

export const rootAgent = new ToolLoopAgent({
  model: 'openai/gpt-5.5',
  instructions: `${ROOT_SYSTEM}\n\nCONVERSATION RULE: Answer ordinary informational, creative, explanatory, and brainstorming questions directly. Do not require a connected tool merely to answer a question. Use mission planning only when the user asks for a plan/workflow or a real-world outcome. Use tools when they add necessary capability. Never invent tool results or claim external actions occurred.`,
  tools: {
    createMissionPlan: tool({
      description: 'Create a ROOT mission plan. This is planning only and never executes consequential actions.',
      inputSchema: z.object({ mission: z.string().min(1) }),
      execute: async ({ mission }) => ({
        mission,
        workflow: ['DEFINE','DISCOVER','ARCHITECT','EXECUTE','VERIFY','EVOLVE'],
        humanApproval: true,
        note: 'Plan generated. Execution remains subject to verification and human authority.'
      })
    }),
    verifyOutput: tool({
      description: 'Evaluate a proposed result against explicit criteria without claiming external verification.',
      inputSchema: z.object({ result: z.string(), criteria: z.array(z.string()).default([]) }),
      execute: async ({ result, criteria }) => ({
        status: 'NEEDS_HUMAN_VERIFICATION',
        criteria,
        observed: result.slice(0, 2000),
        verified: [],
        unknown: ['External-world truth has not been independently checked.']
      })
    })
  },
  stopWhen: stepCountIs(6)
});
