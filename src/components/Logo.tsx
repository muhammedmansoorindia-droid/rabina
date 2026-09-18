import './logo.css'

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return <a className={`brand-logo ${inverse ? 'inverse' : ''}`} href="/" aria-label="RABINA home"><img src="/rabina-logo.png" alt="RABINA" /></a>
}
