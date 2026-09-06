'use client';
import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

const agents=['Researcher','Analyst','Architect','Creator','Builder','Simulator','Auditor','Optimizer','Coordinator','Teacher'];

export default function Home(){
 const [input,setInput]=useState('');
 const { messages, sendMessage, status, error } = useChat({
  transport: new DefaultChatTransport({ api: '/api/agent' }),
 });
 const busy=status==='submitted'||status==='streaming';
 function submit(e:React.FormEvent){e.preventDefault();const text=input.trim();if(!text||busy)return;sendMessage({text});setInput('');}
 return <main className="wrap"><header className="top"><div><div className="eyebrow">7¹⁰ • ROOT AI</div><h1 className="title">THE <span className="gold">COMMAND</span><br/>ARCHITECTURE</h1><p className="muted">Conversation • planning • authority • verification</p></div><div><span className="pill">CHAT</span><span className="pill">MISSION</span><span className="pill">VERIFY</span></div></header>
 <section className="card"><div className="label">ROOT CONSOLE</div><div className="chat" aria-live="polite">
  {messages.map(m=><div className={`message ${m.role==='user'?'user':'assistant'}`} key={m.id}><div className="messageRole">{m.role==='user'?'YOU':'ROOT'}</div><div>{m.parts?.map((part,i)=>part.type==='text'?<span key={i}>{part.text}</span>:null)}</div></div>)}
  {messages.length===0&&<div className="message assistant"><div className="messageRole">ROOT</div><div>ROOT AI online. Ask a normal question, request a plan, or describe an action you want help with.</div></div>}
  {busy&&<div className="message assistant"><div className="messageRole">ROOT</div><div>Thinking…</div></div>}
 </div>
 <form onSubmit={submit} className="composer"><textarea className="textarea" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();submit(e)}}} placeholder="Ask ROOT anything…" disabled={busy}/><button className="btn" type="submit" disabled={!input.trim()||busy}>{busy?'THINKING…':'SEND'}</button></form>{error&&<pre className="status">{error.message||'ROOT AI could not complete the response.'}</pre>}</section>
 <section className="grid"><div className="card"><div className="label">OPERATING TEAM</div>{agents.map(a=><div className="agent" key={a}><span>{a}</span><span className="muted">READY</span></div>)}</div><div className="card"><div className="label">CONTROL LAW</div><p className="metric">INTENT → REALITY → SCALE</p><p className="muted">Normal questions are answered directly. Consequential actions remain subject to tools, verification, and human authority.</p></div></section></main>}
