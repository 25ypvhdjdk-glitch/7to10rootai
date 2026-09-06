import { randomUUID } from 'node:crypto';
import { ROOT_ARCHITECTURE, ROOT_VERSION } from './version';

export const ROOT_SYSTEM = `You are ROOT AI, the Command Architecture for ${ROOT_ARCHITECTURE}. Follow DEFINE → DISCOVER → ARCHITECT → EXECUTE → VERIFY → EVOLVE. Human intent comes first. Evidence beats assertion. Never claim an action was completed unless a tool actually completed it. For consequential actions involving money, legal matters, employment, sensitive data, security permissions, irreversible or destructive actions, require human approval. Separate OBSERVED, VERIFIED, ESTIMATED, ASSUMED, and UNKNOWN. Your job is to increase user capability, not replace human authority.`;

export const AGENTS = ['Researcher','Analyst','Architect','Creator','Builder','Simulator','Auditor','Optimizer','Coordinator','Teacher'] as const;

export function classifyRisk(text: string): 'LOW'|'MEDIUM'|'HIGH' {
  const high = /money|payment|purchase|delete|destroy|legal|lawsuit|employment|hire|fire|password|credential|security|medical|diagnosis|send|publish|post|irreversible/i;
  const medium = /email|message|account|upload|download|deploy|website|social|customer/i;
  if (high.test(text)) return 'HIGH';
  if (medium.test(text)) return 'MEDIUM';
  return 'LOW';
}

export function missionPlan(mission: string) {
  const risk = classifyRisk(mission);
  const missionId = randomUUID();
  return {
    version: ROOT_VERSION,
    architecture: ROOT_ARCHITECTURE,
    missionId,
    mission,
    state: 'READY',
    risk,
    planningOnly: true,
    humanApprovalRequired: true,
    humanAuthorityRequired: risk === 'HIGH',
    gates: { intent: true, reality: false, scale: false },
    tasks: [
      {id:1, command:'DEFINE', owner:'Coordinator', status:'READY', purpose:'Clarify objective, outcome, success criteria and constraints.'},
      {id:2, command:'DISCOVER', owner:'Researcher', status:'QUEUED', purpose:'Identify information needs, evidence and unknowns.'},
      {id:3, command:'ARCHITECT', owner:'Architect', status:'QUEUED', purpose:'Design workflow, resources, dependencies and checkpoints.'},
      {id:4, command:'EXECUTE', owner:'Builder', status:'QUEUED', purpose:'Produce the smallest useful real-world result only after required approval.'},
      {id:5, command:'VERIFY', owner:'Auditor', status:'QUEUED', purpose:'Test output against explicit criteria and failure conditions.'},
      {id:6, command:'EVOLVE', owner:'Optimizer', status:'QUEUED', purpose:'Capture feedback and identify the next improvement.'}
    ],
    next: risk === 'HIGH' ? 'APPROVE PLAN → EXECUTE WITH HUMAN GATE → VERIFY' : 'APPROVE PLAN → EXECUTE → VERIFY → EVOLVE'
  };
}
