import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  Gauge,
  Disc3,
  Wrench,
  Zap,
  ChevronRight,
  Settings,
  ShieldCheck,
  Phone,
  Menu,
  X,
} from "lucide-react";
import "./AutomotiveDemo.css";

/* =========================================================
   RABINA / AUTOMOTIVE — premium editorial car showcase.
   Dark, fast, mechanical. Photography from Unsplash.
========================================================= */

const HERO =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85";
const INTRO =
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85";
const SHOWCASE =
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=2000&q=85";
const WHEEL =
  "https://images.unsplash.com/photo-1600712242805-5f78671b24da?auto=format&fit=crop&w=1600&q=85";
const MEDIA =
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=2000&q=85";
const SPLIT_A =
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1400&q=85";
const SPLIT_B =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85";
const CUSTOM =
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=85";
const FINAL =
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=2000&q=85";
const FINAL_B =
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2000&q=85";

const PARTS = [
  { name: "Coilover Suspension", cat: "Chassis", icon: Settings, text: "Height and damping, tuned to the road." },
  { name: "Performance Brakes", cat: "Braking", icon: ShieldCheck, text: "Consistent stopping under load." },
  { name: "Forged Wheels", cat: "Wheels", icon: Disc3, text: "Light, strong, and finished to order." },
  { name: "Turbo Upgrade", cat: "Power", icon: Zap, text: "Response you can feel immediately." },
  { name: "Sport Exhaust", cat: "Exhaust", icon: Gauge, text: "Tone and flow, engineered together." },
  { name: "Air Intake", cat: "Engine", icon: Wrench, text: "Cleaner breathing for the long drive." },
];

const FEATURES = [
  { title: "Vehicles", text: "A curated line-up, ready to drive.", image: SPLIT_A, icon: Gauge },
  { title: "Our Offers", text: "Seasonal packages and financing guidance.", image: SPLIT_B, icon: Zap },
  { title: "Our Services", text: "Servicing, upgrades and ongoing care.", image: CUSTOM, icon: Wrench },
];

/* =========================================================
   MOTION UTILITIES — fast, precise, mechanical.
========================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;
const WIPE = [0.76, 0, 0.24, 1] as const;

type Dir = "up" | "down" | "left" | "right";

function Parallax({
  children,
  className = "",
  amount = 40,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [amount, -amount]);
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

function ImageReveal({
  src,
  alt,
  className = "",
  from = "left",
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  from?: Dir | "center";
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const clip = {
    up: "inset(100% 0% 0% 0%)",
    down: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
    center: "inset(0% 42% 0% 42%)",
  }[from];
  return (
    <motion.div
      className={`auto-reveal ${className}`}
      initial={reduced ? { clipPath: "inset(0%)" } : { clipPath: clip }}
      whileInView={{ clipPath: "inset(0%)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduced ? 0.01 : 1.05, delay: reduced ? 0 : delay, ease: WIPE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={reduced ? { scale: 1 } : { scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduced ? 0.01 : 1.4, delay: reduced ? 0 : delay, ease: EASE }}
      />
    </motion.div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: Dir;
}) {
  const reduced = useReducedMotion();
  const offset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: -55, y: 0 },
    right: { x: 55, y: 0 },
  }[from];
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduced ? 0.01 : 0.8, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function MaskLine({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className={`auto-mask ${className}`}>
      <motion.span
        className="auto-mask-inner"
        initial={reduced ? { y: "0%" } : { y: "115%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reduced ? 0.01 : 0.9, delay: reduced ? 0 : delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function AutomotiveDemo() {
  const reduced = useReducedMotion();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mediaNote, setMediaNote] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* HERO scroll choreography — layered handoff into the intro. */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const carY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-20, -50]);
  const carScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.06]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -60]);
  const accentY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -18]);
  const heroFade = useTransform(scrollYProgress, [0.6, 1], reduced ? [1, 1] : [1, 0]);

  return (
    <div className="auto-demo">
      {/* HEADER */}
      <header className={solid ? "auto-nav auto-nav--solid" : "auto-nav"}>
        <button className="auto-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="auto-brand-mark">R</span>
          <span>
            RABINA <small>/ AUTOMOTIVE</small>
          </span>
        </button>

        <nav className={menuOpen ? "auto-nav-links auto-nav-links--open" : "auto-nav-links"}>
          <button onClick={() => scrollToId("cars")}>Cars</button>
          <button onClick={() => scrollToId("parts")}>Parts</button>
          <button onClick={() => scrollToId("wheels")}>Wheels</button>
          <button onClick={() => scrollToId("tech")}>Technology</button>
          <button onClick={() => scrollToId("contact")}>Contact</button>
        </nav>

        <div className="auto-nav-right">
          <a className="auto-nav-back" href="/?returnTo=showcase">
            <ArrowLeft size={14} /> BACK
          </a>
          <button className="auto-nav-cta" onClick={() => scrollToId("contact")}>
            Get Started <ArrowUpRight size={14} />
          </button>
          <button
            className="auto-burger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="auto-hero" ref={heroRef}>
          <motion.div
            className="auto-hero-car"
            style={{ y: carY, scale: carScale }}
            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1.1, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: reduced ? 0.01 : 1.35, delay: reduced ? 0 : 0.2, ease: EASE }}
          >
            <img src={HERO} alt="Performance car" />
          </motion.div>

          <div className="auto-hero-veil" />

          <motion.div
            className="auto-hero-accent"
            style={{ y: accentY }}
            initial={reduced ? { opacity: 1 } : { opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: reduced ? 0.01 : 0.9, delay: reduced ? 0 : 0.1, ease: EASE }}
          />

          <motion.div className="auto-hero-copy" style={{ y: heroTextY, opacity: heroFade }}>
            <motion.p
              className="auto-kicker"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.6, delay: reduced ? 0 : 0.3 }}
            >
              RABINA AUTOMOTIVE — PERFORMANCE, CURATED
            </motion.p>

            <h1>
              <span className="auto-mask">
                <motion.span
                  className="auto-mask-inner"
                  initial={reduced ? { y: "0%" } : { y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: reduced ? 0.01 : 1, delay: reduced ? 0 : 0.4, ease: EASE }}
                >
                  SHIFT YOUR
                </motion.span>
              </span>
              <span className="auto-mask">
                <motion.span
                  className="auto-mask-inner auto-text-accent"
                  initial={reduced ? { y: "0%" } : { y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: reduced ? 0.01 : 1, delay: reduced ? 0 : 0.55, ease: EASE }}
                >
                  DRIVE.
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="auto-hero-text"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.75, delay: reduced ? 0 : 0.72 }}
            >
              Performance machines, precision parts and a workshop that speaks your language.
            </motion.p>

            <motion.div
              className="auto-hero-actions"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.75, delay: reduced ? 0 : 0.85 }}
            >
              <button className="auto-btn auto-btn--accent" onClick={() => scrollToId("cars")}>
                View Cars <ArrowRight size={15} />
              </button>
              <button className="auto-btn auto-btn--ghost" onClick={() => scrollToId("parts")}>
                Explore Parts
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="auto-scroll-hint"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: reduced ? 0 : 1.1 }}
          >
            <span>SCROLL</span>
            <i />
          </motion.div>
        </section>

        {/* INTRO / ACCELERATION */}
        <section className="auto-intro" id="intro">
          <div className="auto-intro-inner">
            <Reveal from="left" className="auto-intro-copy">
              <p className="auto-kicker">01 — ACCELERATION</p>
              <h2>
                <MaskLine>Built to move,</MaskLine>
                <MaskLine delay={0.1}>
                  <span className="auto-text-accent">made to last.</span>
                </MaskLine>
              </h2>
              <p className="auto-intro-text">
                Engineering you can feel the moment you press the pedal — and a workshop that keeps
                it that way.
              </p>
              <button className="auto-btn auto-btn--accent" onClick={() => scrollToId("cars")}>
                Discover <ArrowRight size={15} />
              </button>
            </Reveal>

            <Parallax amount={30} className="auto-intro-media">
              <ImageReveal src={INTRO} alt="Automotive detail" from="right" className="auto-intro-image" />
            </Parallax>
          </div>
        </section>

        {/* PRODUCT SHOWCASE — editorial composition */}
        <section className="auto-parts" id="parts">
          <div className="auto-section-head">
            <Reveal from="up">
              <p className="auto-kicker">02 — COMPONENTS</p>
              <h2>
                <MaskLine>Performance, part</MaskLine>
                <MaskLine delay={0.1}>
                  <span className="auto-text-accent">by part.</span>
                </MaskLine>
              </h2>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <p className="auto-section-note">A curated catalogue of upgrades and replacements.</p>
            </Reveal>
          </div>

          <div className="auto-parts-grid">
            {PARTS.map((part, index) => (
              <Reveal key={part.name} className="auto-part" delay={index * 0.07} from="up">
                <div className="auto-part-media">
                  <img
                    src={index % 2 === 0 ? SHOWCASE : INTRO}
                    alt={part.name}
                    loading="lazy"
                  />
                  <span className="auto-part-cat">{part.cat}</span>
                </div>
                <div className="auto-part-body">
                  <span className="auto-part-icon">
                    <part.icon size={18} />
                  </span>
                  <div>
                    <strong>{part.name}</strong>
                    <p>{part.text}</p>
                  </div>
                  <ChevronRight size={16} className="auto-part-arrow" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ORANGE CTA STRIP */}
        <motion.section
          className="auto-strip"
          initial={reduced ? { clipPath: "inset(0)" } : { clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduced ? 0.01 : 1, ease: WIPE }}
        >
          <div className="auto-strip-inner">
            <span>READY WHEN YOU ARE</span>
            <button onClick={() => scrollToId("contact")}>
              Book a test drive <ArrowRight size={18} />
            </button>
          </div>
        </motion.section>

        {/* LARGE CAR SHOWCASE */}
        <section className="auto-showcase" id="cars">
          <Parallax amount={45} className="auto-showcase-media">
            <motion.div
              className="auto-showcase-image"
              initial={reduced ? { clipPath: "inset(0)", scale: 1 } : { clipPath: "inset(0 0 100% 0)", scale: 1.08 }}
              whileInView={{ clipPath: "inset(0)", scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduced ? 0.01 : 1.3, ease: EASE }}
            >
              <img src={SHOWCASE} alt="Featured vehicle" />
            </motion.div>
          </Parallax>

          <div className="auto-showcase-copy">
            <Reveal from="up">
              <p className="auto-kicker">03 — THE LINE-UP</p>
            </Reveal>
            <h2>
              <MaskLine>A car for the</MaskLine>
              <MaskLine delay={0.1}>
                <span className="auto-text-accent">driver in you.</span>
              </MaskLine>
            </h2>
            <Reveal from="up" delay={0.2}>
              <p className="auto-showcase-text">
                Every vehicle in the RABINA line-up is selected for balance, response and the
                long-term ownership experience.
              </p>
              <button className="auto-btn auto-btn--accent" onClick={() => scrollToId("contact")}>
                View the line-up <ArrowRight size={15} />
              </button>
            </Reveal>
          </div>
        </section>

        {/* WHEELS / GALLERY */}
        <section className="auto-wheels" id="wheels">
          <div className="auto-wheels-inner">
            <Parallax amount={35} className="auto-wheel-media">
              <ImageReveal src={WHEEL} alt="Forged wheel" from="center" className="auto-wheel-image" />
            </Parallax>

            <div className="auto-wheels-copy">
              <Reveal from="right">
                <p className="auto-kicker">04 — WHEELS & GRIP</p>
                <h2>
                  <MaskLine>Built for</MaskLine>
                  <MaskLine delay={0.1}>
                    <span className="auto-text-accent">full speed.</span>
                  </MaskLine>
                </h2>
                <p className="auto-wheels-text">
                  Forged wheels, balanced tyres and geometry dialled in — the difference you notice
                  in every corner.
                </p>
              </Reveal>

              <div className="auto-wheel-stats">
                {[
                  { icon: Disc3, label: "Forged rims" },
                  { icon: Gauge, label: "Track ready" },
                  { icon: ShieldCheck, label: "Fully balanced" },
                ].map((s, index) => (
                  <Reveal key={s.label} className="auto-wheel-stat" delay={0.1 + index * 0.1} from="right">
                    <s.icon size={18} />
                    <span>{s.label}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MEDIA / VIDEO-STYLE SECTION */}
        <section className="auto-media">
          <Parallax amount={30} className="auto-media-bg">
            <img src={MEDIA} alt="Automotive cinematics" loading="lazy" />
          </Parallax>
          <div className="auto-media-veil" />
          <Reveal className="auto-media-copy" from="up">
            <p className="auto-kicker">05 — CINEMATIC</p>
            <h2>
              <MaskLine>Feel it before</MaskLine>
              <MaskLine delay={0.1}>
                <span className="auto-text-accent">you drive it.</span>
              </MaskLine>
            </h2>
            <button
              className="auto-media-play"
              aria-label="Play showreel preview"
              onClick={() => setMediaNote(true)}
            >
              <Play size={22} fill="currentColor" />
            </button>
            {mediaNote && (
              <p className="auto-media-note">
                Cinematic still — no video asset is bundled with this showcase.
              </p>
            )}
          </Reveal>
        </section>

        {/* SPLIT — image left / text right */}
        <section className="auto-split">
          <div className="auto-split-inner">
            <Parallax amount={25} className="auto-split-media">
              <ImageReveal src={SPLIT_A} alt="Workshop detail" from="left" className="auto-split-image" />
            </Parallax>
            <Reveal from="right" className="auto-split-copy">
              <p className="auto-kicker">06 — CRAFT</p>
              <h2>
                <MaskLine>Detail is the</MaskLine>
                <MaskLine delay={0.1}>
                  <span className="auto-text-accent">whole point.</span>
                </MaskLine>
              </h2>
              <p>
                From the first inspection to the final torque check, every step is documented and
                explained. No guesswork, no surprises.
              </p>
              <button className="auto-btn auto-btn--accent" onClick={() => scrollToId("services")}>
                Our process <ArrowRight size={15} />
              </button>
            </Reveal>
          </div>
        </section>

        {/* SPLIT — text left / image right */}
        <section className="auto-split auto-split--reverse" id="services">
          <div className="auto-split-inner">
            <Reveal from="left" className="auto-split-copy">
              <p className="auto-kicker">07 — SERVICE</p>
              <h2>
                <MaskLine>Kept on the</MaskLine>
                <MaskLine delay={0.1}>
                  <span className="auto-text-accent">road, always.</span>
                </MaskLine>
              </h2>
              <p>
                Scheduled servicing, upgrades and diagnostics — handled by people who know the
                machines they work on.
              </p>
              <button className="auto-btn auto-btn--accent" onClick={() => scrollToId("contact")}>
                View services <ArrowRight size={15} />
              </button>
            </Reveal>
            <Parallax amount={25} className="auto-split-media">
              <ImageReveal src={SPLIT_B} alt="Service bay" from="right" className="auto-split-image" />
            </Parallax>
          </div>
        </section>

        {/* CUSTOMIZATION / TECHNOLOGY */}
        <section className="auto-tech" id="tech">
          <div className="auto-tech-inner">
            <Reveal from="up" className="auto-tech-copy">
              <p className="auto-kicker">08 — ADAPT</p>
              <h2>
                <MaskLine>Make it</MaskLine>
                <MaskLine delay={0.1}>
                  <span className="auto-text-accent">yours.</span>
                </MaskLine>
              </h2>
              <p>
                Colour, trim, wheels and interior — configure the details that matter and see them
                come together before the build begins.
              </p>
            </Reveal>

            <Parallax amount={30} className="auto-tech-media">
              <ImageReveal src={CUSTOM} alt="Customisation" from="center" className="auto-tech-image" />
            </Parallax>
          </div>
        </section>

        {/* FEATURE SHOWCASE */}
        <section className="auto-features">
          <div className="auto-section-head">
            <Reveal from="up">
              <p className="auto-kicker">09 — EXPLORE</p>
              <h2>
                <MaskLine>Everything, in</MaskLine>
                <MaskLine delay={0.1}>
                  <span className="auto-text-accent">one place.</span>
                </MaskLine>
              </h2>
            </Reveal>
          </div>

          <div className="auto-feature-grid">
            {FEATURES.map((f, index) => (
              <Reveal
                key={f.title}
                className="auto-feature"
                delay={index * 0.1}
                from={index === 0 ? "left" : index === 1 ? "up" : "right"}
              >
                <ImageReveal
                  src={f.image}
                  alt={f.title}
                  className="auto-feature-media"
                  from={index === 1 ? "up" : index === 0 ? "left" : "right"}
                  delay={index * 0.06}
                />
                <div className="auto-feature-body">
                  <span className="auto-feature-icon">
                    <f.icon size={18} />
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  <button className="auto-feature-link" onClick={() => scrollToId("contact")}>
                    Explore <ArrowUpRight size={15} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FINAL CINEMATIC */}
        <section className="auto-final">
          <Parallax amount={40} className="auto-final-bg">
            <motion.img
              src={FINAL}
              alt="Final drive"
              loading="lazy"
              initial={reduced ? { scale: 1 } : { scale: 1.16 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduced ? 0.01 : 1.6, ease: EASE }}
            />
          </Parallax>
          <div className="auto-final-veil" />
          <div className="auto-final-copy">
            <Reveal from="left">
              <p className="auto-kicker">10 — SHIFT UP</p>
              <h2>
                <MaskLine>Drive</MaskLine>
                <MaskLine delay={0.1}>
                  <span className="auto-text-accent">forward.</span>
                </MaskLine>
              </h2>
            </Reveal>
            <Reveal from="up" delay={0.25}>
              <p className="auto-final-text">
                One workshop. One line-up. One standard — the one you set behind the wheel.
              </p>
              <button className="auto-btn auto-btn--accent" onClick={() => scrollToId("contact")}>
                Start your build <ArrowRight size={15} />
              </button>
            </Reveal>
          </div>

          <div className="auto-final-badge">
            <img src={FINAL_B} alt="Automotive detail" loading="lazy" />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="auto-footer" id="contact">
        <div className="auto-footer-top">
          <div className="auto-footer-brand">
            <span className="auto-brand-mark">R</span>
            <strong>RABINA</strong>
            <small>/ AUTOMOTIVE</small>
            <p>Performance vehicles, precision parts and a workshop built around the drive.</p>
          </div>
          <div className="auto-footer-col">
            <strong>EXPLORE</strong>
            <button onClick={() => scrollToId("cars")}>Cars</button>
            <button onClick={() => scrollToId("parts")}>Parts</button>
            <button onClick={() => scrollToId("wheels")}>Wheels</button>
          </div>
          <div className="auto-footer-col">
            <strong>SERVICES</strong>
            <button onClick={() => scrollToId("services")}>Servicing</button>
            <button onClick={() => scrollToId("tech")}>Customisation</button>
            <button onClick={() => scrollToId("contact")}>Contact</button>
          </div>
          <div className="auto-footer-col auto-footer-contact">
            <strong>GET IN TOUCH</strong>
            <span>
              <Phone size={13} /> Speak to the workshop
            </span>
            <a href="/?returnTo=contact">Start a project</a>
          </div>
        </div>
        <div className="auto-footer-bottom">
          <span>CONCEPT WEBSITE — DESIGNED FOR RABINA SHOWCASE</span>
          <div className="auto-footer-links">
            <a href="/?returnTo=showcase">← BACK TO RABINA</a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>TOP ↑</button>
          </div>
        </div>
      </footer>
    </div>
  );
}