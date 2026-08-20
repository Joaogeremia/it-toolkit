# IT Toolkit

Plataforma de ferramentas rápidas para profissionais de TI.

## Stack

- React
- TypeScript
- Vite
- Lucide React
- CSS responsivo

## Ferramentas

### Redes
- Calculadora IPv4 / CIDR
- Port Checker
- DNS Lookup
- Conversor de IPv4 para decimal, binário e hexadecimal
- MAC Address Lookup
- Calculadora IPv6 / CIDR

### Segurança
- Gerador de senhas
- Gerador de SHA-256, SHA-384 e SHA-512

### Desenvolvimento / Web
- JSON Formatter / Validator
- Base64 Encoder / Decoder
- JWT Decoder
- HTTP Headers Checker

### Windows / Linux
- Gerador de comandos PowerShell
- Gerador de comandos Linux

Todas as ferramentas que não dependem de backend pesado processam os dados localmente no navegador. Consultas de rede dependem das políticas de CORS e dos serviços públicos utilizados.

## Rodar localmente

```bash
npm install
npm run dev
```

Depois abra a URL exibida pelo Vite, normalmente `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

## Próximos passos

1. Criar páginas/rotas SEO para cada ferramenta.
2. Adicionar metadados, sitemap e conteúdo explicativo para busca orgânica.
3. Criar backend para consultas de rede que exigem acesso externo.
4. Adicionar ferramentas avançadas de PowerShell, Linux e Zabbix.
5. Publicar na Vercel ou Cloudflare Pages.
