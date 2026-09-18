import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, MousePointer2, Play, Sparkles } from 'lucide-react'
import { Logo } from '../components/Logo'
import './demo-variants.css'

export type DemoConfig = { slug: string; label: string; title: string; italic: string; description: string; image: string; accent: string; profile: 'cinematic' | 'editorial' | 'kinetic' | 'soft' | 'interface' }

const configs: Record<string, DemoConfig> = {
  food: { slug: 'food', label: 'SALT / RESTAURANT', title: 'Taste', italic: 'in motion.', description: 'A living identity for a restaurant that serves the unexpected.', image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=85', accent: '#d8a24a', profile: 'cinematic' },
  fashion: { slug: 'fashion', label: 'MUSE / ATELIER', title: 'Dress', italic: 'the future.', description: 'A fashion house identity built to move at the speed of culture.', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85', accent: '#c9b6a6', profile: 'editorial' },
  'real-estate': { slug: 'real-estate', label: 'FORM / RESIDENCES', title: 'Room', italic: 'to become.', description: 'Architecture, considered from the first scroll.', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85', accent: '#b9a995', profile: 'cinematic' },
  fitness: { slug: 'fitness', label: 'PULSE / PERFORMANCE', title: 'Find', italic: 'your force.', description: 'A kinetic digital home for people who refuse to stand still.', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=85', accent: '#b7e14a', profile: 'kinetic' },
  dental: { slug: 'dental', label: 'NORTH / DENTAL STUDIO', title: 'A better', italic: 'kind of care.', description: 'Soft confidence for a practice built around the whole person.', image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1800&q=85', accent: '#c4dedb', profile: 'soft' },
  hotel: { slug: 'hotel', label: 'NOCTURNE / HOTEL', title: 'Stay', italic: 'in the moment.', description: 'A digital check-in to somewhere worth remembering.', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1800&q=85', accent: '#d4a36b', profile: 'cinematic' },
  saas: { slug: 'saas', label: 'LOOP / WORKSPACE', title: 'Work', italic: 'with clarity.', description: 'Turning complex product value into an interface people want to use.', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=85', accent: '#aebdff', profile: 'interface' },
  automotive: { slug: 'automotive', label: 'VANTA / AUTOMOTIVE', title: 'Move', italic: 'without permission.', description: 'A high-voltage digital experience for the road ahead.', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85', accent: '#e15d44', profile: 'kinetic' },
}

export function getDemo(slug: string) { return configs[slug] }

export function DemoShell({ config }: { config: DemoConfig }) {
  const { scrollYProgress } = useScroll()
  const reducedMotion = useReducedMotion()
  const imageY = useTransform(scrollYProgress, [0, 1], reducedMotion ? ['0%', '0%'] : ['0%', '18%'])
  const imageScale = useTransform(scrollYProgress, [0, .45], reducedMotion ? [1, 1] : [1.12, 1])
  return <div className={`demo-page demo-${config.profile} demo-${config.slug}`} style={{ '--demo-accent': config.accent } as React.CSSProperties}>
    <header className="demo-nav"><Logo inverse /><span className="demo-label">RABINA / SELECTED EXPERIENCE</span><div className="demo-close"><a href="/?returnTo=showcase">Back to RABINA <ArrowLeft size={16} /></a></div></header>
    <main>
      <section className="demo-hero"><motion.div className="demo-photo" style={{ backgroundImage: `url(${config.image})`, y: imageY, scale: imageScale }} /><div className="demo-shade" /><div className="demo-hero-copy"><p>{config.label}</p><h1>{config.title}<br /><i>{config.italic}</i></h1><span>{config.description}</span><a className="demo-action" href="#demo-story">Enter the experience <ChevronDown /></a></div><div className="demo-index">01 <span>/ 07</span></div></section>
      <section className="demo-story" id="demo-story"><div className="demo-content-head"><p>THE STORY / 02</p><h2>Designed to<br /><i>be entered.</i></h2></div><div className="story-grid"><p>Every brand has a rhythm. We find it, then build a digital world that lets people feel it before they can explain it.</p><strong>Scroll slowly.<br />There is more here.</strong></div></section>
      <section className="demo-featured"><motion.div className="featured-image" style={{ backgroundImage: `url(${config.image})` }} initial={{ scale: 1.18 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} /><div className="featured-overlay"><p>FEATURED / 03</p><h2>{config.profile === 'interface' ? 'Clear the way.' : config.profile === 'kinetic' ? 'Power, in form.' : 'A point of view.'}</h2></div></section>
      <section className="demo-content demo-content-details"><div className="demo-feature"><div className="feature-number">04</div><div><h3>{config.profile === 'interface' ? 'Everything in its right place.' : config.profile === 'kinetic' ? 'Power is a practice.' : 'A point of view, made tangible.'}</h3><p>{config.description} Every interaction is considered to make the next one feel natural.</p></div><div className="demo-cursor"><MousePointer2 size={18} /><span>move through the details</span></div></div><div className="demo-panels"><motion.div whileHover={{ y: -12 }} className="demo-panel panel-a"><span>the detail / 05</span><strong>{config.slug === 'food' ? 'Menu' : config.slug === 'saas' ? 'Dashboard' : 'The edit'}</strong><ArrowUpRight /></motion.div><motion.div whileHover={{ y: -12 }} className="demo-panel panel-b"><span>the feeling / 06</span><strong>{config.slug === 'hotel' ? 'Linger' : config.slug === 'automotive' ? 'Unleashed' : 'Closer'}</strong><Play fill="currentColor" /></motion.div></div></section>
      <section className="demo-end"><Sparkles /><p>Made by Rabina</p><h2>Ready to make<br /><i>your move?</i></h2><a href="/?returnTo=contact">Start a project <ArrowRight /></a></section>
    </main>
    <footer className="demo-footer"><a href="/?returnTo=showcase">← Back to RABINA</a><span>Digital growth. Web. AI.</span><a href="#top">Top ↑</a></footer>
  </div>
}
