export type Risk='low'|'medium'|'high'|'critical';
export function classifyRisk(text:string):Risk{const s=text.toLowerCase(); if(/delete|destroy|transfer money|send payment|legal|employment|password|secret|credential|security permission/.test(s)) return 'critical'; if(/publish|purchase|invoice|financial|sensitive|external action/.test(s)) return 'high'; if(/deploy|automate|customer/.test(s)) return 'medium'; return 'low';}
export function requiresHumanApproval(risk:Risk){return risk==='high'||risk==='critical';}
