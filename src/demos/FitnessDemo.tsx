import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Dumbbell,
  Flame,
  Timer,
  Users,
  Check,
} from "lucide-react";
import "./FitnessDemo.css";

/* =========================================================
   RABINA / FORGE — fitness showcase content.
   Athletic photography sourced from Unsplash.
========================================================= */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85";

const DISCIPLINES = [
  { name: "Strength", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80", note: "Powerlifting & barbell" },
  { name: "Conditioning", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80", note: "HIIT & metabolic" },
  { name: "Mobility", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80", note: "Yoga & recovery" },
];

const COACHES = [
  { name: "Marcus Vale", role: "Strength Coach", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80" },
  { name: "Lena Ortiz", role: "Conditioning", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80" },
  { name: "Priya Raman", role: "Mobility", image: "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=800&q=80" },
  { name: "Theo Bakker", role: "Performance", image: "https://images.unsplash.com/photo-1583468982228-19f19164aee2?auto=format&fit=crop&w=800&q=80" },
];

const STATS = [
  { value: "24/7", label: "GYM ACCESS" },
  { value: "60+", label: "WEEKLY CLASSES" },
  { value: "12", label: "COACHES" },
  { value: "5", label: "TRAINING ZONES" },
];

const PLANS = [
  {
    name: "Daily",
    price: "$12",
    period: "/ day",
    features: ["Full gym access", "Locker & showers", "One group class"],
    featured: false,
  },
  {
    name: "Monthly",
    price: "$69",
    period: "/ month",
    features: ["Unlimited gym access", "All group classes", "Progress tracking", "Guest pass"],
    featured: true,
  },
  {
    name: "Professional",
    price: "$149",
    period: "/ month",
    features: ["Everything in Monthly", "1:1 coaching x4", "Nutrition plan", "Recovery suite"],
    featured: false,
  },
];

const TIPS = [
  { title: "Warm up with intent", body: "Five focused minutes beats twenty distracted ones." },
  { title: "Track the basics", body: "Log the main lifts. Progress hides in small numbers." },
  { title: "Recover like you train", body: "Sleep and food are part of the programme, not optional." },
];

const PRODUCTS = [
  { name: "Hex Dumbbell Set", cat: "Equipment", price: "$189", image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=1000&q=80" },
  { name: "Carbon Lifting Belt", cat: "Accessories", price: "$74", image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1000&q=80" },
  { name: "Whey Isolate", cat: "Protein", price: "$48", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=1000&q=80" },
  { name: "Smart Rower", cat: "Cardio", price: "$1,290", image: "https://images.unsplash.com/photo-1591741535018-d042766c62eb?auto=format&fit=crop&w=1000&q=80" },
  { name: "Kettlebell 24kg", cat: "Equipment", price: "$96", image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1000&q=80" },
  { name: "Resistance Bands", cat: "Accessories", price: "$32", image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=1000&q=80" },
];

const FILTERS = ["All", "Accessories", "Cardio", "Equipment", "Protein"];

/* =========================================================
   MOTION UTILITIES — angular, energetic, scroll-linked.
   Only transform / opacity / clip-path are animated.
========================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;
const CLIP = [0.76, 0, 0.24, 1] as const;

/* Scroll-linked parallax. */
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

type Dir = "up" | "down" | "left" | "right";

/* Angular image reveal — clip wipe from a side + scale settle. */
function ImageReveal({
  src,
  alt,
  className = "",
  from = "up",
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  from?: Dir;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const clip = {
    up: "inset(100% 0% 0% 0%)",
    down: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  }[from];
  return (
    <motion.div
      className={`fit-reveal ${className}`}
      initial={reduced ? { clipPath: "inset(0%)" } : { clipPath: clip }}
      whileInView={{ clipPath: "inset(0%)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduced ? 0.01 : 1, delay: reduced ? 0 : delay, ease: CLIP }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={reduced ? { scale: 1 } : { scale: 1.16 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduced ? 0.01 : 1.3, delay: reduced ? 0 : delay, ease: EASE }}
      />
    </motion.div>
  );
}

/* Directional text reveal. */
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
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
  }[from];
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduced ? 0.01 : 0.8, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* Animated count-up for real numeric values only (no fake claims). */
function StatNumber({ value }: { value: string }) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : "0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    const match = value.match(/^(\d+)/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = Number(match[1]);
    const suffix = value.slice(match[1].length);
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const duration = 1100;
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(`${Math.round(target * eased)}${suffix}`);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, reduced]);

  return <span ref={ref}>{display}</span>;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function FitnessDemo() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Hero scroll handoff. */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], reduced ? [0, 0] : [0, 80]);
  const heroImageScale = useTransform(heroProgress, [0, 1], reduced ? [1, 1] : [1, 1.12]);
  const heroTextY = useTransform(heroProgress, [0, 1], reduced ? [0, 0] : [0, -120]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], reduced ? [1, 1] : [1, 0]);
  const shapeY = useTransform(heroProgress, [0, 1], reduced ? [0, 0] : [0, 150]);

  const visibleProducts =
    filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);

  return (
    <div className="fit-demo">
      <header className={scrolled ? "fit-nav fit-nav--solid" : "fit-nav"}>
        <button className="fit-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="fit-brand-mark">R</span>
          <span>
            RABINA <small>/ FORGE</small>
          </span>
        </button>

        <nav className="fit-nav-links">
          <button onClick={() => scrollToId("disciplines")}>TRAINING</button>
          <button onClick={() => scrollToId("coaches")}>COACHES</button>
          <button onClick={() => scrollToId("pricing")}>PRICING</button>
          <button onClick={() => scrollToId("products")}>SHOP</button>
        </nav>

        <div className="fit-nav-right">
          <a className="fit-nav-back" href="/?returnTo=showcase">
            <ArrowLeft size={14} /> BACK
          </a>
          <button className="fit-nav-cta" onClick={() => scrollToId("join")}>
            JOIN NOW <ArrowUpRight size={14} />
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="fit-hero" ref={heroRef}>
          <motion.div
            className="fit-hero-media"
            style={{ y: heroImageY, scale: heroImageScale }}
            initial={reduced ? { clipPath: "inset(0%)" } : { clipPath: "inset(0% 0% 0% 18%)" }}
            animate={{ clipPath: "inset(0%)" }}
            transition={{ duration: reduced ? 0.01 : 1.7, ease: CLIP }}
          >
            <motion.img
              src={HERO_IMAGE}
              alt="Athlete mid-training"
              initial={reduced ? { scale: 1 } : { scale: 1.14, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: reduced ? 0.01 : 1.9, ease: EASE }}
            />
          </motion.div>

          <motion.div className="fit-hero-shape" style={{ y: shapeY }} aria-hidden="true" />
          <div className="fit-hero-veil" />

          <motion.div className="fit-hero-inner" style={{ y: heroTextY, opacity: heroOpacity }}>
            <motion.p
              className="fit-kicker"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.7, delay: reduced ? 0 : 0.25 }}
            >
              STRENGTH — CONDITIONING — MOBILITY
            </motion.p>

            <h1>
              <motion.span
                className="fit-line"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 80, skewY: 4 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: reduced ? 0.01 : 1, delay: reduced ? 0 : 0.38, ease: EASE }}
              >
                TRAIN
              </motion.span>
              <motion.span
                className="fit-line fit-line--accent"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 80, skewY: 4 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: reduced ? 0.01 : 1, delay: reduced ? 0 : 0.52, ease: EASE }}
              >
                LIKE IT
              </motion.span>
              <motion.span
                className="fit-line"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 80, skewY: 4 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: reduced ? 0.01 : 1, delay: reduced ? 0 : 0.66, ease: EASE }}
              >
                MATTERS.
              </motion.span>
            </h1>

            <motion.p
              className="fit-hero-text"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.8, delay: reduced ? 0 : 0.78 }}
            >
              A performance gym built around real programmes, real coaches and progress you can
              measure.
            </motion.p>

            <motion.div
              className="fit-hero-actions"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.8, delay: reduced ? 0 : 0.92 }}
            >
              <button className="fit-btn fit-btn--solid" onClick={() => scrollToId("pricing")}>
                START TRAINING <ArrowUpRight size={15} />
              </button>
              <button className="fit-btn fit-btn--line" onClick={() => scrollToId("disciplines")}>
                VIEW PROGRAMMES
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* DISCIPLINES / EXPERTISE — overlapping cards */}
        <section className="fit-disciplines" id="disciplines">
          <div className="fit-section-head">
            <Reveal from="up">
              <p className="fit-kicker">01 / TRAINING</p>
              <h2>
                Build your <em>base.</em>
              </h2>
            </Reveal>
          </div>

          <div className="fit-discipline-grid">
            {DISCIPLINES.map((d, index) => (
              <Reveal
                key={d.name}
                className={`fit-discipline${index === 1 ? " fit-discipline--raised" : ""}`}
                delay={index * 0.12}
                from={index === 1 ? "down" : "up"}
              >
                <ImageReveal src={d.image} alt={d.name} from={index % 2 === 0 ? "up" : "left"} className="fit-discipline-media" />
                <div className="fit-discipline-meta">
                  <strong>{d.name}</strong>
                  <small>{d.note}</small>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* MEET COACHES */}
        <section className="fit-coaches" id="coaches">
          <div className="fit-section-head">
            <Reveal from="up">
              <p className="fit-kicker">02 / COACHES</p>
              <h2>
                Meet the <em>team.</em>
              </h2>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <span className="fit-section-note">CERTIFIED COACHES</span>
            </Reveal>
          </div>

          <div className="fit-coach-grid">
            {COACHES.map((c, index) => (
              <Reveal key={c.name} className="fit-coach" delay={index * 0.1} from={index % 2 === 0 ? "left" : "right"}>
                <div className="fit-coach-media">
                  <img src={c.image} alt={c.name} loading="lazy" />
                  <span className="fit-coach-reveal" />
                </div>
                <div className="fit-coach-meta">
                  <strong>{c.name}</strong>
                  <small>{c.role}</small>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* STATS BAND */}
        <section className="fit-stats">
          <div className="fit-stats-diagonal" aria-hidden="true" />
          <div className="fit-stats-inner">
            {STATS.map((s, index) => (
              <Reveal key={s.label} className="fit-stat" delay={index * 0.08} from="up">
                <strong className="fit-stat-value">
                  <StatNumber value={s.value} />
                </strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section className="fit-pricing" id="pricing">
          <div className="fit-section-head">
            <Reveal from="up">
              <p className="fit-kicker">03 / MEMBERSHIP</p>
              <h2>
                Check the <em>pricing.</em>
              </h2>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <span className="fit-section-note">NO CONTRACTS</span>
            </Reveal>
          </div>

          <div className="fit-plan-grid">
            {PLANS.map((plan, index) => (
              <Reveal
                key={plan.name}
                className={`fit-plan${plan.featured ? " fit-plan--featured" : ""}`}
                delay={index * 0.12}
                from={index === 0 ? "left" : index === 2 ? "right" : "up"}
              >
                <div className="fit-plan-card">
                  {plan.featured && <span className="fit-plan-tag">MOST POPULAR</span>}
                  <span className="fit-plan-name">{plan.name}</span>
                  <div className="fit-plan-price">
                    <strong>{plan.price}</strong>
                    <small>{plan.period}</small>
                  </div>
                  <ul className="fit-plan-features">
                    {plan.features.map((f) => (
                      <li key={f}>
                        <Check size={14} /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="fit-plan-btn" onClick={() => scrollToId("join")}>
                    CHOOSE PLAN <ArrowUpRight size={14} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* TIPS OF THE DAY — split */}
        <section className="fit-tips">
          <div className="fit-tips-media">
            <Parallax amount={36}>
              <ImageReveal
                src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1400&q=80"
                alt="Athlete training"
                from="left"
                className="fit-tips-image"
              />
            </Parallax>
          </div>

          <div className="fit-tips-copy">
            <Reveal from="right">
              <p className="fit-kicker">04 / TIPS OF THE DAY</p>
              <h2>
                Small habits.
                <br />
                <em>Big lifts.</em>
              </h2>
            </Reveal>

            <ul className="fit-tips-list">
              {TIPS.map((tip, index) => (
                <Reveal key={tip.title} className="fit-tip" delay={0.14 + index * 0.1} from="right">
                  <span className="fit-tip-index">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{tip.title}</strong>
                    <p>{tip.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* LATEST PRODUCTS */}
        <section className="fit-products" id="products">
          <div className="fit-section-head">
            <Reveal from="up">
              <p className="fit-kicker">05 / SHOP</p>
              <h2>
                Latest <em>products.</em>
              </h2>
            </Reveal>
          </div>

          <Reveal className="fit-filters" from="up" delay={0.08}>
            {FILTERS.map((f) => (
              <button
                key={f}
                className={filter === f ? "fit-filter fit-filter--active" : "fit-filter"}
                onClick={() => setFilter(f)}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </Reveal>

          <div className="fit-product-grid">
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((p, index) => (
                <motion.div
                  key={p.name}
                  className="fit-product"
                  layout
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }}
                  whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.98 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: reduced ? 0.01 : 0.6,
                    delay: reduced ? 0 : (index % 3) * 0.08,
                    ease: EASE,
                  }}
                >
                  <div className="fit-product-media">
                    <img src={p.image} alt={p.name} loading="lazy" />
                    <span className="fit-product-add">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                  <div className="fit-product-body">
                    <span className="fit-product-cat">{p.cat}</span>
                    <strong>{p.name}</strong>
                    <span className="fit-product-price">{p.price}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* FEATURED CONTENT — bridge */}
        <section className="fit-featured">
          <Parallax amount={44} className="fit-featured-media">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000&q=85"
              alt="Athlete under lights"
              loading="lazy"
            />
          </Parallax>
          <div className="fit-featured-veil" />
          <div className="fit-featured-copy">
            <Reveal from="left">
              <p className="fit-kicker">06 / PROGRAMME</p>
              <h2>
                Progress you can
                <br />
                <em>actually measure.</em>
              </h2>
            </Reveal>
            <Reveal from="left" delay={0.14}>
              <p className="fit-featured-text">
                Structured blocks, tracked lifts and coaches who adjust the plan as you get stronger.
              </p>
            </Reveal>
          </div>
        </section>

        {/* JOIN CTA */}
        <section className="fit-join" id="join">
          <div className="fit-join-band" aria-hidden="true" />
          <div className="fit-join-inner">
            <Reveal from="up">
              <p className="fit-kicker">READY WHEN YOU ARE</p>
            </Reveal>
            <Reveal from="up" delay={0.08}>
              <h2>
                Join <em>the forge.</em>
              </h2>
            </Reveal>
            <Reveal from="up" delay={0.16}>
              <div className="fit-join-actions">
                <a className="fit-btn fit-btn--solid" href="/?returnTo=contact">
                  BOOK A FREE SESSION <ArrowUpRight size={15} />
                </a>
                <span className="fit-join-note">
                  <Dumbbell size={15} /> First class on us
                </span>
              </div>
            </Reveal>
          </div>
          <Parallax amount={30} className="fit-join-media">
            <img
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85"
              alt="Coach guiding a lift"
              loading="lazy"
            />
          </Parallax>
        </section>

        {/* PARTNER STRIP */}
        <section className="fit-partners">
          <div className="fit-partners-inner">
            {["PERFORMANCE", "ENDURANCE", "MOBILITY", "NUTRITION", "RECOVERY"].map((brand, index) => (
              <Reveal key={brand} className="fit-partner" delay={index * 0.06} from="up">
                <span>
                  <Flame size={13} /> {brand}
                </span>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="fit-footer">
        <div className="fit-footer-top">
          <div className="fit-footer-brand">
            <span className="fit-brand-mark">R</span>
            <strong>RABINA</strong>
            <small>/ FORGE</small>
            <p>A performance gym concept — training, coaching and gear in one place.</p>
          </div>
          <div className="fit-footer-col">
            <strong>EXPLORE</strong>
            <button onClick={() => scrollToId("disciplines")}>Training</button>
            <button onClick={() => scrollToId("coaches")}>Coaches</button>
            <button onClick={() => scrollToId("pricing")}>Pricing</button>
          </div>
          <div className="fit-footer-col">
            <strong>SUPPORT</strong>
            <button onClick={() => scrollToId("products")}>Shop</button>
            <button onClick={() => scrollToId("join")}>Join</button>
            <a href="/?returnTo=contact">Contact</a>
          </div>
          <div className="fit-footer-col fit-footer-hours">
            <strong>HOURS</strong>
            <span>
              <Timer size={13} /> Open 24 / 7
            </span>
            <span>
              <Users size={13} /> Classes daily
            </span>
          </div>
        </div>
        <div className="fit-footer-bottom">
          <span>CONCEPT WEBSITE — DESIGNED FOR RABINA SHOWCASE</span>
          <div className="fit-footer-links">
            <a href="/?returnTo=showcase">← BACK TO RABINA</a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>TOP ↑</button>
          </div>
        </div>
      </footer>
    </div>
  );
}