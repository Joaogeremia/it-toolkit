import React from 'react'

type Faq = { q: string; a: string }

const faqs: Record<string, Faq[]> = {
  'calculadora-ipv4-cidr': [
    { q: 'O que é CIDR?', a: 'CIDR é uma forma de representar uma rede IP usando um endereço e um prefixo, como 192.168.1.0/24.' },
    { q: 'O que a calculadora IPv4 mostra?', a: 'Ela calcula rede, broadcast, máscara, prefixo, primeiro host, último host e quantidade de hosts utilizáveis.' },
  ],
  'gerador-de-senhas': [
    { q: 'As senhas são enviadas para um servidor?', a: 'Não. A geração acontece no navegador, sem necessidade de cadastro ou envio do texto para uma API.' },
    { q: 'Posso escolher o tamanho da senha?', a: 'Sim. O gerador permite ajustar o tamanho e incluir maiúsculas, números e símbolos.' },
  ],
  'json-formatter': [
    { q: 'O que é JSON Formatter?', a: 'É uma ferramenta para organizar, identar e validar documentos JSON.' },
    { q: 'O JSON é enviado para algum servidor?', a: 'Não. A formatação e validação são executadas no navegador.' },
  ],
  'port-checker': [
    { q: 'O Port Checker abre uma conexão diretamente pelo navegador?', a: 'Não. Por limitações de segurança do navegador, a ferramenta gera comandos como nc e Test-NetConnection para o teste TCP.' },
    { q: 'Qual comando usar no Windows?', a: 'Use Test-NetConnection host -Port porta no PowerShell.' },
  ],
  'dns-lookup': [
    { q: 'O que é DNS Lookup?', a: 'É uma consulta aos registros DNS de um domínio, como A, AAAA, MX, TXT, CNAME e NS.' },
    { q: 'Qual serviço a ferramenta usa?', a: 'A consulta utiliza DNS-over-HTTPS do Google para retornar os registros DNS no navegador.' },
  ],
  'conversor-de-ip': [
    { q: 'Quais formatos de IPv4 posso converter?', a: 'A ferramenta converte IPv4 entre decimal, binário e hexadecimal.' },
    { q: 'Para que serve converter um IP?', a: 'A conversão é útil para estudos de redes, troubleshooting, ACLs, máscaras e análise de endereços.' },
  ],
  'gerador-de-hash': [
    { q: 'Quais algoritmos estão disponíveis?', a: 'SHA-256, SHA-384 e SHA-512.' },
    { q: 'Hash é criptografia?', a: 'Não. Hash é uma função unidirecional usada para integridade, identificação e outros usos; não é uma forma de recuperar o texto original.' },
  ],
  'base64-encoder-decoder': [
    { q: 'O que é Base64?', a: 'Base64 é uma codificação que representa dados binários usando caracteres ASCII.' },
    { q: 'Base64 criptografa meus dados?', a: 'Não. Base64 é codificação, não criptografia, e não deve ser usada como mecanismo de proteção de dados.' },
  ],
  'jwt-decoder': [
    { q: 'O JWT Decoder valida a assinatura?', a: 'Não. Ele apenas decodifica o header e o payload para inspeção. A assinatura não é validada.' },
    { q: 'Posso colar um token real?', a: 'Tenha cuidado. Tokens podem conter informações sensíveis ou permitir acesso a sistemas. Prefira tokens de teste.' },
  ],
  'http-headers-checker': [
    { q: 'Por que alguns sites não funcionam na consulta?', a: 'O navegador pode bloquear a requisição por CORS ou o servidor pode não aceitar o método HEAD.' },
    { q: 'O que são HTTP headers?', a: 'São metadados enviados junto às requisições e respostas HTTP, como Content-Type, Cache-Control e políticas de segurança.' },
  ],
  'gerador-powershell': [
    { q: 'Para que serve o gerador PowerShell?', a: 'Ele oferece comandos comuns para suporte e administração de máquinas Windows.' },
    { q: 'Os comandos executam automaticamente?', a: 'Não. A ferramenta apenas gera o comando para você revisar e executar no ambiente adequado.' },
  ],
  'gerador-comandos-linux': [
    { q: 'Quais tarefas Linux estão disponíveis?', a: 'Há comandos para rede, portas, disco, memória, processos, logs e configuração DNS.' },
    { q: 'Os comandos alteram o servidor?', a: 'Não. O gerador apenas apresenta comandos; a execução é feita por você no terminal.' },
  ],
  'mac-address-lookup': [
    { q: 'O que é OUI?', a: 'OUI é o prefixo inicial de um endereço MAC usado para identificar o fabricante associado ao bloco.' },
    { q: 'A consulta de fabricante é garantida?', a: 'A disponibilidade depende do serviço público de consulta utilizado e da conectividade.' },
  ],
  'calculadora-ipv6-cidr': [
    { q: 'O que é um prefixo IPv6?', a: 'É a parte inicial do endereço que identifica a rede. Um exemplo comum é 2001:db8::/64.' },
    { q: 'Quantos endereços existem em um /64?', a: 'Um bloco /64 possui 2^64 endereços IPv6.' },
  ],
}

const related: Record<string, string[]> = {
  'calculadora-ipv4-cidr': ['dns-lookup', 'conversor-de-ip', 'calculadora-ipv6-cidr'],
  'dns-lookup': ['port-checker', 'http-headers-checker', 'conversor-de-ip'],
  'port-checker': ['dns-lookup', 'gerador-powershell', 'gerador-comandos-linux'],
  'calculadora-ipv6-cidr': ['calculadora-ipv4-cidr', 'dns-lookup', 'conversor-de-ip'],
}

const names: Record<string, string> = {
  'calculadora-ipv4-cidr': 'Calculadora IPv4 / CIDR', 'dns-lookup': 'DNS Lookup', 'port-checker': 'Port Checker', 'conversor-de-ip': 'Conversor de IP', 'calculadora-ipv6-cidr': 'Calculadora IPv6 / CIDR', 'http-headers-checker': 'HTTP Headers Checker', 'gerador-powershell': 'Gerador PowerShell', 'gerador-comandos-linux': 'Gerador de Comandos Linux'
}

export default function SeoFaq({ slug }: { slug: string }) {
  const items = faqs[slug]
  if (!items) return null
  return <section className="seo-faq" aria-labelledby="faq-title">
    <div className="seo-faq-inner">
      <span className="eyebrow small">DÚVIDAS FREQUENTES</span>
      <h2 id="faq-title">Perguntas frequentes</h2>
      <div className="faq-list">{items.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
      {related[slug] && <div className="related-tools"><strong>Ferramentas relacionadas</strong><div>{related[slug].map(r => <a key={r} href={`/${r}`}>{names[r]}</a>)}</div></div>}
    </div>
  </section>
}
