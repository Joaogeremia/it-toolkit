import { Check, ShieldCheck, Zap, ArrowLeft, Lock, Sparkles } from 'lucide-react'

export type ProFeature = {
  id: string
  title: string
  description: string
}

export const PRO_FEATURES: ProFeature[] = [
  { id: 'powershell-advanced', title: 'PowerShell avançado', description: 'Geradores completos para tarefas de suporte e administração Windows.' },
  { id: 'linux-advanced', title: 'Bash e Linux avançado', description: 'Comandos e rotinas para administração de servidores Linux.' },
  { id: 'network-advanced', title: 'Networking avançado', description: 'Subnetting, VLAN, DNS, portas e diagnósticos em um só lugar.' },
  { id: 'firewall-rules', title: 'Gerador de regras de firewall', description: 'Monte regras para cenários comuns de rede e segurança.' },
  { id: 'zabbix-templates', title: 'Templates Zabbix', description: 'Modelos e snippets para acelerar monitoramento e troubleshooting.' },
  { id: 'snmp-generator', title: 'Gerador SNMP', description: 'Gere consultas e comandos SNMP para rotinas de infraestrutura.' },
  { id: 'documentation', title: 'Documentação técnica', description: 'Crie documentação padronizada de procedimentos de TI.' },
  { id: 'pdf-export', title: 'Exportação em PDF', description: 'Transforme resultados e documentação em arquivos prontos para compartilhar.' },
  { id: 'history', title: 'Histórico e favoritos', description: 'Salve ferramentas e resultados usados com frequência.' },
]

export function isProFeature(id: string) {
  return PRO_FEATURES.some(feature => feature.id === id)
}

const freeFeatures = [
  '14 ferramentas essenciais',
  'Uso sem cadastro',
  'Ferramentas rápidas e gratuitas',
  'Processamento local quando disponível',
]

export default function ProPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#f5f7fb', padding: '32px 20px 72px' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#aab3c5', textDecoration: 'none', marginBottom: 48 }}>
          <ArrowLeft size={17} /> Voltar para o IT Toolkit
        </a>

        <section style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 12px', border: '1px solid #263044', borderRadius: 999, color: '#8ea2c8', fontSize: 13, fontWeight: 700, letterSpacing: '.08em' }}>
            <Sparkles size={15} /> IT TOOLKIT PRO
          </div>
          <h1 style={{ fontSize: 'clamp(40px, 7vw, 72px)', lineHeight: 1.02, margin: '22px 0 18px', letterSpacing: '-.04em' }}>
            Mais produtividade.<br /><span style={{ color: '#7c9cff' }}>Menos trabalho repetitivo.</span>
          </h1>
          <p style={{ color: '#aab3c5', fontSize: 18, lineHeight: 1.65, margin: 0 }}>
            Ferramentas profissionais para técnicos de suporte, infraestrutura, redes, segurança e desenvolvimento.
          </p>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, alignItems: 'stretch' }}>
          <PlanCard title="Grátis" price="R$ 0" subtitle="Para começar" features={freeFeatures} />
          <PlanCard title="PRO" price="R$ 19,90" subtitle="por mês" featured features={PRO_FEATURES.slice(0, 6).map(feature => feature.title)} />
        </section>

        <section style={{ marginTop: 56, padding: 32, border: '1px solid #273148', borderRadius: 24, background: '#10141d' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 42, height: 42, display: 'grid', placeItems: 'center', borderRadius: 12, background: '#171e2c' }}><ShieldCheck size={21} /></div>
            <div><h2 style={{ margin: 0, fontSize: 24 }}>Tudo que entra no PRO</h2><p style={{ margin: '5px 0 0', color: '#8f9bb0' }}>A estrutura já está preparada para liberar os recursos por assinatura.</p></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {PRO_FEATURES.map(feature => <div key={feature.id} style={{ padding: 18, border: '1px solid #222b3d', borderRadius: 16, background: '#0c1017' }}><div style={{ display: 'flex', gap: 9, alignItems: 'center', fontWeight: 700 }}><Lock size={15} /> {feature.title}</div><p style={{ margin: '9px 0 0', color: '#8995aa', lineHeight: 1.5, fontSize: 14 }}>{feature.description}</p></div>)}
          </div>
        </section>

        <section style={{ textAlign: 'center', marginTop: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#aab3c5', marginBottom: 16 }}><Zap size={16} /> Pagamento será liberado em breve</div>
          <h2 style={{ fontSize: 32, margin: '0 0 12px' }}>Quer ser avisado quando o PRO abrir?</h2>
          <p style={{ color: '#8f9bb0', margin: '0 auto 24px', maxWidth: 620 }}>A assinatura ainda não está ativa. Por enquanto, esta página apresenta a oferta e prepara a estrutura para a futura integração de pagamento.</p>
          <button disabled style={{ border: 0, borderRadius: 12, padding: '14px 24px', fontSize: 16, fontWeight: 800, color: '#717b8d', background: '#202737', cursor: 'not-allowed' }}>Lista de espera em breve</button>
        </section>
      </div>
    </div>
  )
}

function PlanCard({ title, price, subtitle, features, featured = false }: { title: string; price: string; subtitle: string; features: string[]; featured?: boolean }) {
  return (
    <article style={{ position: 'relative', padding: 28, borderRadius: 22, border: featured ? '1px solid #526db5' : '1px solid #252d3d', background: featured ? '#111827' : '#0e121a', boxShadow: featured ? '0 20px 60px rgba(60,90,170,.16)' : 'none' }}>
      {featured && <div style={{ position: 'absolute', top: 18, right: 18, padding: '5px 9px', borderRadius: 999, background: '#26365d', color: '#a9bcff', fontSize: 11, fontWeight: 800 }}>RECOMENDADO</div>}
      <div style={{ color: '#8f9bb0', fontWeight: 700 }}>{title}</div>
      <div style={{ margin: '14px 0 4px', fontSize: 42, fontWeight: 850, letterSpacing: '-.03em' }}>{price}</div>
      <div style={{ color: '#737f94', marginBottom: 28 }}>{subtitle}</div>
      <div style={{ display: 'grid', gap: 13 }}>
        {features.map(feature => <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 9, color: '#d7dce6' }}><Check size={17} /> {feature}</div>)}
      </div>
      <div style={{ marginTop: 28, padding: '12px 14px', borderRadius: 10, background: '#171d29', color: '#7e8aa0', textAlign: 'center', fontSize: 13 }}>Pagamento em breve</div>
    </article>
  )
}
