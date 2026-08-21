import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ProPage from './ProPage'
import './styles.css'

type RouteMeta = { slug: string; name: string; title: string; description: string }

const routes: RouteMeta[] = [
  { slug: 'calculadora-ipv4-cidr', name: 'Calculadora IPv4 / CIDR', title: 'Calculadora IPv4 / CIDR online grátis | IT Toolkit', description: 'Calcule rede, broadcast, máscara, prefixo e hosts utilizáveis de uma rede IPv4/CIDR.' },
  { slug: 'gerador-de-senhas', name: 'Gerador de senhas', title: 'Gerador de Senhas Fortes Online | IT Toolkit', description: 'Gere senhas fortes, personalizáveis e aleatórias diretamente no navegador.' },
  { slug: 'json-formatter', name: 'JSON Formatter', title: 'JSON Formatter e Validator Online | IT Toolkit', description: 'Formate, organize e valide JSON online de forma rápida e gratuita.' },
  { slug: 'port-checker', name: 'Port Checker', title: 'Port Checker: Teste de Porta TCP | IT Toolkit', description: 'Gere comandos para testar conectividade TCP em portas de servidores.' },
  { slug: 'dns-lookup', name: 'DNS Lookup', title: 'DNS Lookup Online | Consulta DNS | IT Toolkit', description: 'Consulte registros DNS A, AAAA, MX, TXT, CNAME e NS rapidamente.' },
  { slug: 'conversor-de-ip', name: 'Conversor de IP', title: 'Conversor de IP IPv4 para Decimal, Binário e Hex | IT Toolkit', description: 'Converta endereços IPv4 entre decimal, binário e hexadecimal.' },
  { slug: 'gerador-de-hash', name: 'Gerador de Hash', title: 'Gerador de Hash SHA-256, SHA-384 e SHA-512 | IT Toolkit', description: 'Gere hashes SHA-256, SHA-384 e SHA-512 localmente no navegador.' },
  { slug: 'base64-encoder-decoder', name: 'Base64 Encoder / Decoder', title: 'Base64 Encoder e Decoder Online | IT Toolkit', description: 'Codifique e decodifique texto em Base64 online, sem instalar programas.' },
  { slug: 'jwt-decoder', name: 'JWT Decoder', title: 'JWT Decoder Online | Decodificar JSON Web Token | IT Toolkit', description: 'Decodifique o header e o payload de um JWT diretamente no navegador.' },
  { slug: 'http-headers-checker', name: 'HTTP Headers Checker', title: 'HTTP Headers Checker Online | IT Toolkit', description: 'Consulte cabeçalhos HTTP de um endereço quando o servidor permitir CORS.' },
  { slug: 'gerador-powershell', name: 'Gerador PowerShell', title: 'Gerador de Comandos PowerShell | IT Toolkit', description: 'Gere comandos PowerShell úteis para suporte e administração Windows.' },
  { slug: 'gerador-comandos-linux', name: 'Gerador de Comandos Linux', title: 'Gerador de Comandos Linux | IT Toolkit', description: 'Monte comandos Linux rápidos para administração de servidores e suporte técnico.' },
  { slug: 'mac-address-lookup', name: 'MAC Address Lookup', title: 'MAC Address Lookup: Consulte Fabricante | IT Toolkit', description: 'Consulte o fabricante associado a um endereço MAC.' },
  { slug: 'calculadora-ipv6-cidr', name: 'Calculadora IPv6 / CIDR', title: 'Calculadora IPv6 / CIDR Online | IT Toolkit', description: 'Calcule prefixo, rede e intervalo de endereços IPv6 usando CIDR.' },
  { slug: 'pro', name: 'IT Toolkit PRO', title: 'IT Toolkit PRO — Ferramentas Profissionais para TI | IT Toolkit', description: 'Conheça o IT Toolkit PRO: ferramentas avançadas para suporte, redes, infraestrutura, segurança e desenvolvimento.' },
]

const homeMeta: RouteMeta = { slug: '', name: 'IT Toolkit', title: 'IT Toolkit — Ferramentas Online para Profissionais de TI', description: 'Ferramentas rápidas e gratuitas para redes, segurança, Windows, Linux e desenvolvimento.' }

function getRoute() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '')
  return routes.find(route => route.slug === path) ?? homeMeta
}

function setMeta(route: RouteMeta) {
  document.title = route.title
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (description) description.content = route.description
  let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
  if (!robots) { robots = document.createElement('meta'); robots.name = 'robots'; document.head.appendChild(robots) }
  robots.content = 'index,follow'
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
  canonical.href = route.slug ? `${window.location.origin}/${route.slug}` : window.location.origin
  const setProperty = (property: string, content: string) => {
    let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag) }
    tag.content = content
  }
  setProperty('og:title', route.title)
  setProperty('og:description', route.description)
  setProperty('og:url', window.location.href)
  setProperty('og:type', 'website')
  let schema = document.getElementById('it-toolkit-schema') as HTMLScriptElement | null
  if (!schema) { schema = document.createElement('script'); schema.id = 'it-toolkit-schema'; schema.type = 'application/ld+json'; document.head.appendChild(schema) }
  schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: route.name, url: window.location.href, description: route.description, applicationCategory: 'DeveloperApplication', operatingSystem: 'Any', offers: route.slug === 'pro' ? { '@type': 'Offer', price: '19.90', priceCurrency: 'BRL' } : { '@type': 'Offer', price: '0', priceCurrency: 'BRL' } })
}

function AppShell() {
  const [path, setPath] = useState(window.location.pathname)
  const route = getRoute()
  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  useEffect(() => {
    setMeta(route)
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const card = target.closest<HTMLElement>('.tool-card')
      const back = target.closest<HTMLElement>('.back')
      const brand = target.closest<HTMLElement>('.brand')
      const proLink = target.closest<HTMLAnchorElement>('a[href="#pro"]')
      const navLink = target.closest<HTMLAnchorElement>('a[href="#ferramentas"]')
      if (proLink) { event.preventDefault(); history.pushState({}, '', '/pro'); setPath('/pro'); window.scrollTo({ top: 0, behavior: 'smooth' }); return }
      if (back || brand || navLink) { event.preventDefault(); history.pushState({}, '', '/'); setPath('/'); return }
      if (card && card.tagName === 'BUTTON') {
        const name = card.querySelector('h3')?.textContent?.trim()
        const match = routes.find(item => item.name === name)
        if (match) { event.preventDefault(); history.pushState({}, '', `/${match.slug}`); setPath(`/${match.slug}`) }
      }
    }
    document.addEventListener('click', onClick, true)

    // On a direct SEO URL, App starts on its home view. Activate the matching
    // card once so the requested tool is displayed without changing the URL.
    let openTimer: number | undefined
    if (route.slug && route.slug !== 'pro') {
      openTimer = window.setTimeout(() => {
        const card = Array.from(document.querySelectorAll<HTMLElement>('.tool-card')).find(element => {
          return element.querySelector('h3')?.textContent?.trim() === route.name
        })
        card?.click()
      }, 0)
    }

    return () => {
      document.removeEventListener('click', onClick, true)
      if (openTimer) window.clearTimeout(openTimer)
    }
  }, [path])
  return route.slug === 'pro' ? <ProPage /> : <App key={path} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><AppShell /></React.StrictMode>)
