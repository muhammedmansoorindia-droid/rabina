import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export function Reveal({ children, className = '', delay = 0, mode = 'up' }: { children: ReactNode; className?: string; delay?: number; mode?: 'up' | 'left' | 'right' | 'scale' }) {
  const reducedMotion = useReducedMotion()
  const origins = { up: { y: 28 }, left: { x: -34 }, right: { x: 34 }, scale: { scale: 0.94 } }
  return <motion.div className={className} initial={{ opacity: 0, ...(reducedMotion ? {} : origins[mode]) }} whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: reducedMotion ? 0.01 : 0.7, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}
