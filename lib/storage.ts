export type StoreStatus={provider:'postgres'|'memory';configured:boolean};
export function storageStatus():StoreStatus{return process.env.DATABASE_URL?{provider:'postgres',configured:true}:{provider:'memory',configured:false};}
export function noteEvent(eventType:string,payload:unknown){return {eventType,payload,at:new Date().toISOString()};}
