import { useEffect, useState } from 'react'
import type { ComponentType } from 'react'
import { Navigation, Hero, Capability, Services, Showcase, Industries, Why, Process, AISection, About, FAQ, CTA, Footer } from './sections/HomeSections'
import FoodDemo from './demos/FoodDemo'
import FashionDemo from './demos/FashionDemo'
import RealEstateDemo from './demos/RealEstateDemo'
import FitnessDemo from './demos/FitnessDemo'
import DentalDemo from './demos/DentalDemo'
import HotelDemo from './demos/HotelDemo'
import SaaSDemo from './demos/SaaSDemo'
import AutomotiveDemo from './demos/AutomotiveDemo'
import './App.css'
import './components/services-fix.css'

const demos: Record<string, ComponentType> = { food: FoodDemo, fashion: FashionDemo, 'real-estate': RealEstateDemo, fitness: FitnessDemo, dental: DentalDemo, hotel: HotelDemo, saas: SaaSDemo, automotive: AutomotiveDemo }

function Home() {
  useEffect(() => {
    const returnTo = new URLSearchParams(window.location.search).get('returnTo')
    const targetId = returnTo === 'showcase' ? 'showcase-industries' : returnTo === 'contact' ? 'contact' : ['capability', 'services', 'showcase', 'industries'].includes(returnTo || '') ? returnTo : ''
    window.scrollTo({ top: 0, behavior: 'auto' })
    if (!targetId) return
    const timer = window.setTimeout(() => {
      const target = document.getElementById(targetId)
      if (!target) return
      const top = target.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'smooth' })
      window.history.replaceState(null, '', '/')
    })
    return () => window.clearTimeout(timer)
  }, [])
  return <><Navigation /><main id="top"><Hero /><Capability /><Services /><Showcase /><Industries /><Why /><Process /><AISection /><About /><FAQ /><CTA /></main><Footer /></>
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => { window.removeEventListener('popstate', onPop); window.history.scrollRestoration = 'auto' }
  }, [])
  useEffect(() => { if (path === '/' && window.location.hash) window.history.replaceState(null, '', '/') }, [path])
  const slug = path.startsWith('/demos/') ? path.replace('/demos/', '').replace(/\/$/, '') : ''
  const Demo = demos[slug]
  return Demo ? <Demo /> : <Home />
}

export default App
