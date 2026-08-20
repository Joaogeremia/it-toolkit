import { useMemo, useState } from 'react'
import {
  Activity, ArrowLeft, Calculator, Check, ChevronRight, Copy, FileJson,
  KeyRound, Menu, Network, Search, ShieldCheck, Sparkles, Terminal,
  Wifi, X, Zap
} from 'lucide-react'

type ToolId = 'home' | 'subnet' | 'password' | 'json' | 'port'

const tools = [
  { id:'subnet' as ToolId, name:'Calculadora IPv4 / CIDR', desc:'Descubra rede, broadcast, hosts e máscara.', cat:'Redes', icon:Network },
  { id:'password' as ToolId, name:'Gerador de senhas', desc:'Crie senhas fortes e personalizáveis.', cat:'Segurança', icon:KeyRound },
  { id:'json' as ToolId, name:'JSON Formatter', desc:'Formate e valide JSON rapidamente.', cat:'Desenvolvimento', icon:FileJson },
  { id:'port' as ToolId, name:'Port Checker', desc:'Valide uma porta e veja como testar conectividade.', cat:'Redes', icon:Wifi },
]

function App() {
  const [active, setActive] = useState<ToolId>('home')
  const [query, setQuery] = useState('')
  const [mobile, setMobile] = useState(false)

  const filtered = useMemo(() => tools.filter(t =>
    `${t.name} ${t.desc} ${t.cat}`.toLowerCase().includes(query.toLowerCase())
  ), [query])

  const navigate = (id: ToolId) => { setActive(id); setMobile(false); window.scrollTo({top:0,behavior:'smooth'}) }

  return <div className="app">
    <header className="topbar">
      <button className="brand" onClick={()=>navigate('home')}><span className="brand-mark"><Zap size={19}/></span><span>IT<span className="accent">Toolkit</span></span></button>
      <nav className={mobile ? 'nav open':'nav'}>
        <button className={active==='home'?'active':''} onClick={()=>navigate('home')}>Início</button>
        <a href="#ferramentas" onClick={()=>setMobile(false)}>Ferramentas</a>
        <a href="#pro" onClick={()=>setMobile(false)}>PRO</a>
      </nav>
      <button className="mobile-btn" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
    </header>

    <main>
      {active === 'home' ? <Home query={query} setQuery={setQuery} tools={filtered} navigate={navigate}/> : <ToolPage id={active} back={()=>navigate('home')}/>}
    </main>

    <footer><div><span className="brand-mini"><Zap size={15}/> ITToolkit</span><span>Ferramentas rápidas para quem trabalha com TI.</span></div><span>© 2026 IT Toolkit</span></footer>
  </div>
}

function Home({query,setQuery,tools,navigate}:{query:string,setQuery:(v:string)=>void,tools:any[],navigate:(id:ToolId)=>void}) {
  return <>
    <section className="hero">
      <div className="eyebrow"><Sparkles size={15}/> TOOLKIT PARA PROFISSIONAIS DE TI</div>
      <h1>Resolva tarefas de TI<br/><span>em poucos segundos.</span></h1>
      <p>Uma coleção de ferramentas práticas para redes, segurança, desenvolvimento e infraestrutura. Rápidas, gratuitas e sem complicação.</p>
      <div className="search"><Search size={20}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar uma ferramenta..." /><kbd>⌘ K</kbd></div>
      <div className="quick"><span><Check size={14}/> Gratuito</span><span><Check size={14}/> Sem cadastro</span><span><Check size={14}/> Processamento local</span></div>
    </section>

    <section id="ferramentas" className="section">
      <div className="section-head"><div><span className="eyebrow small">FERRAMENTAS</span><h2>Escolha uma ferramenta</h2></div><span className="count">{tools.length} disponíveis</span></div>
      <div className="tool-grid">
        {tools.map((t:any)=><button className="tool-card" key={t.id} onClick={()=>navigate(t.id)}>
          <div className="icon-box"><t.icon size={22}/></div><div className="tool-text"><span className="tag">{t.cat}</span><h3>{t.name}</h3><p>{t.desc}</p></div><ChevronRight className="arrow" size={19}/>
        </button>)}
        {!tools.length && <div className="empty">Nenhuma ferramenta encontrada.</div>}
      </div>
    </section>

    <section className="pro" id="pro">
      <div className="pro-glow"></div>
      <div className="pro-content"><span className="eyebrow pro-eye"><ShieldCheck size={15}/> EM BREVE</span><h2>IT Toolkit <span>PRO</span></h2><p>Recursos avançados para quem trabalha com TI todos os dias.</p>
        <div className="pro-list"><span><Check/> Geradores avançados de PowerShell</span><span><Check/> Templates Zabbix</span><span><Check/> Exportação de documentação em PDF</span><span><Check/> Pacotes de scripts para Windows e Linux</span></div>
      </div>
      <div className="pro-card"><Sparkles size={28}/><strong>R$ 19,90</strong><span>/ mês (futuramente)</span><button disabled>Entrar na lista de espera</button></div>
    </section>
  </>
}

function ToolPage({id,back}:{id:Exclude<ToolId,'home'>,back:()=>void}) {
  const data:any = {subnet:['Calculadora IPv4 / CIDR','Redes',Network],password:['Gerador de senhas','Segurança',KeyRound],json:['JSON Formatter','Desenvolvimento',FileJson],port:['Port Checker','Redes',Wifi]}[id]
  const Icon=data[2]
  return <section className="tool-page"><button className="back" onClick={back}><ArrowLeft size={17}/> Voltar</button><div className="tool-title"><div className="icon-box big"><Icon/></div><div><span className="tag">{data[1]}</span><h1>{data[0]}</h1></div></div>{id==='subnet'?<Subnet/>:id==='password'?<Password/>:id==='json'?<JsonTool/>:<PortTool/>}</section>
}

function Subnet() {
  const [cidr,setCidr]=useState('192.168.1.0/24')
  const result=useMemo(()=>calcCIDR(cidr),[cidr])
  return <div className="panel"><label>Endereço IPv4 / CIDR<input value={cidr} onChange={e=>setCidr(e.target.value)} placeholder="192.168.1.0/24"/></label>{result?<div className="result-grid">{Object.entries(result).map(([k,v])=><div className="result" key={k}><span>{k}</span><strong>{v as string}</strong></div>)}</div>:<div className="error">Informe um CIDR válido, por exemplo 192.168.1.0/24.</div>}</div>
}
function calcCIDR(value:string) {
  const m=value.trim().match(/^(\d{1,3}(?:\.\d{1,3}){3})\/(\d{1,2})$/); if(!m)return null
  const oct=m[1].split('.').map(Number), p=Number(m[2]); if(oct.some(n=>n>255)||p<0||p>32)return null
  const ip=oct.reduce((a,n)=>(a<<8)+n,0)>>>0
  const mask=p===0?0:(0xffffffff << (32-p))>>>0, net=(ip&mask)>>>0, broadcast=(net|(~mask>>>0))>>>0
  const fmt=(n:number)=>[(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.')
  const hosts=p>=31?Math.max(0,2**(32-p)):(2**(32-p)-2)
  return {'Rede':fmt(net),'Broadcast':fmt(broadcast),'Máscara':fmt(mask),'Prefixo':`/${p}`,'Hosts utilizáveis':String(hosts),'Primeiro host':p<31?fmt(net+1):'—','Último host':p<31?fmt(broadcast-1):'—'}
}
function Password() {
  const [len,setLen]=useState(18), [upper,setUpper]=useState(true), [numbers,setNumbers]=useState(true), [symbols,setSymbols]=useState(true), [value,setValue]=useState('')
  const generate=()=>{let chars='abcdefghijklmnopqrstuvwxyz';if(upper)chars+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';if(numbers)chars+='0123456789';if(symbols)chars+='!@#$%&*_-+=?';let out='';for(let i=0;i<len;i++)out+=chars[Math.floor(Math.random()*chars.length)];setValue(out)}
  return <div className="panel"><div className="password-output"><code>{value||'Clique em gerar para criar uma senha'}</code>{value&&<CopyButton text={value}/>}</div><div className="range"><label>Tamanho: <b>{len}</b></label><input type="range" min="8" max="64" value={len} onChange={e=>setLen(Number(e.target.value))}/></div><div className="checks"><label><input type="checkbox" checked={upper} onChange={e=>setUpper(e.target.checked)}/> Maiúsculas</label><label><input type="checkbox" checked={numbers} onChange={e=>setNumbers(e.target.checked)}/> Números</label><label><input type="checkbox" checked={symbols} onChange={e=>setSymbols(e.target.checked)}/> Símbolos</label></div><button className="primary" onClick={generate}><KeyRound size={17}/> Gerar senha</button></div>
}
function CopyButton({text}:{text:string}) { const [ok,setOk]=useState(false); return <button className="copy" onClick={()=>{navigator.clipboard.writeText(text);setOk(true);setTimeout(()=>setOk(false),1200)}}>{ok?<Check size={17}/>:<Copy size={17}/>}</button> }
function JsonTool() {
  const [text,setText]=useState('{"servidor":"srv01","status":"online","portas":[80,443]}'),[out,setOut]=useState(''),[err,setErr]=useState('')
  const format=()=>{try{setOut(JSON.stringify(JSON.parse(text),null,2));setErr('')}catch(e){setOut('');setErr('JSON inválido. Verifique vírgulas, aspas e chaves.')}}
  return <div className="panel"><div className="json-grid"><textarea value={text} onChange={e=>setText(e.target.value)} spellCheck={false}/><div className="json-out">{out?<pre>{out}</pre>:<span>Resultado aparecerá aqui.</span>}</div></div>{err&&<div className="error">{err}</div>}<div className="actions"><button className="primary" onClick={format}><FileJson size={17}/> Formatar e validar</button>{out&&<CopyButton text={out}/>}</div></div>
}
function PortTool() {
  const [host,setHost]=useState('example.com'),[port,setPort]=useState('443')
  return <div className="panel"><div className="notice"><Activity size={20}/><div><strong>Limitação do navegador</strong><p>Uma página web não consegue realizar uma verificação TCP arbitrária de portas como o <code>nc</code>. Use os dados abaixo com uma ferramenta local.</p></div></div><div className="two"><label>Host<input value={host} onChange={e=>setHost(e.target.value)}/></label><label>Porta<input type="number" value={port} onChange={e=>setPort(e.target.value)}/></label></div><div className="terminal"><Terminal size={17}/><code>nc -vz {host || 'host'} {port || 'porta'}</code></div><p className="muted">Linux/macOS: execute no terminal. Windows: <code>Test-NetConnection {host || 'host'} -Port {port || 'porta'}</code></p></div>
}
export default App
