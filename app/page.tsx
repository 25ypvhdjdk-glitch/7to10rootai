'use client';
import { FormEvent, useState } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };
const agents=['Researcher','Analyst','Architect','Creator','Builder','Simulator','Auditor','Optimizer','Coordinator','Teacher'];

export default function Home(){
 const [messages,setMessages]=useState<Message[]>([{role:'assistant',content:'ROOT AI online. Ask a normal question, request a plan, or describe an action you want help with.'}]);
 const [input,setInput]=useState(''); const [busy,setBusy]=useState(false); const [error,setError]=useState('');
 async function send(e:FormEvent){e.preventDefault();const text=input.trim();if(!text||busy)return;const next=[...messages,{role:'user' as const,content:text}];setMessages(next);setInput('');setError('');setBusy(true);
  try{
   const r=await fetch('/api/agent',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({messages:next.map((m,i)=>({id:String(i+1),role:m.role,parts:[{type:'text',text:m.content}]}))})});
   if(!r.ok){const body=await r.text();throw new Error(body||`ROOT AI request failed (${r.status})`)}
   const reader=r.body?.getReader();if(!reader)throw new Error('ROOT AI returned no response stream.');
   const decoder=new TextDecoder();let buffer='';let answer='';const idx=next.length;setMessages([...next,{role:'assistant',content:'Thinking…'}]);
   while(true){const {value,done}=await reader.read();if(done)break;buffer+=decoder.decode(value,{stream:true});const lines=buffer.split(/\r?\n/);buffer=lines.pop()||'';
    for(const line of lines){
     const m=line.match(/^0:(.*)$/); if(m){try{const parsed=JSON.parse(m[1]);if(typeof parsed==='string')answer+=parsed;}catch{}}
     const d=line.match(/^data:\s?(.*)$/); if(d){try{const parsed=JSON.parse(d[1]);if(typeof parsed==='string')answer+=parsed;else if(parsed?.text)answer+=parsed.text;}catch{}}
    }
    setMessages(cur=>{const copy=[...cur];copy[idx]={role:'assistant',content:answer||'Thinking…'};return copy});
   }
   if(!answer)throw new Error('ROOT AI connected, but the model returned no readable text.');
   setMessages(cur=>{const copy=[...cur];copy[idx]={role:'assistant',content:answer};return copy});
  }catch(err){setError(err instanceof Error?err.message:'Unable to reach ROOT AI.');setMessages(cur=>cur.slice(0,-1));}finally{setBusy(false)}
 }
 return <main className="wrap"><header className="top"><div><div className="eyebrow">7¹⁰ • ROOT AI</div><h1 className="title">THE <span className="gold">COMMAND</span><br/>ARCHITECTURE</h1><p className="muted">Conversation • planning • authority • verification</p></div><div><span className="pill">CHAT</span><span className="pill">MISSION</span><span className="pill">VERIFY</span></div></header>
 <section className="card"><div className="label">ROOT CONSOLE</div><div className="chat" aria-live="polite">{messages.map((m,i)=><div className={`message ${m.role}`} key={i}><div className="messageRole">{m.role==='assistant'?'ROOT':'YOU'}</div><div>{m.content}</div></div>)}</div>
 <form onSubmit={send} className="composer"><textarea className="textarea" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send(e)}}} placeholder="Ask ROOT anything…" disabled={busy}/><button className="btn" type="submit" disabled={!input.trim()||busy}>{busy?'THINKING…':'SEND'}</button></form>{error&&<pre className="status">{error}</pre>}</section>
 <section className="grid"><div className="card"><div className="label">OPERATING TEAM</div>{agents.map(a=><div className="agent" key={a}><span>{a}</span><span className="muted">READY</span></div>)}</div><div className="card"><div className="label">CONTROL LAW</div><p className="metric">INTENT → REALITY → SCALE</p><p className="muted">Normal questions are answered directly. Consequential actions remain subject to tools, verification, and human authority.</p></div></section></main>}
