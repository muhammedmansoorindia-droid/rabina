import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  Search,
  Phone,
} from "lucide-react";
import "./RealEstateDemo.css";

/* =========================================================
   RABINA / FORM — real estate showcase content.
   Property photography sourced from Unsplash.
   Hero copy preserved from the existing demo config.
========================================================= */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=85";

const STATS = [
  { value: "24", label: "CITIES COVERED" },
  { value: "1.8K", label: "LISTINGS CURATED" },
  { value: "96%", label: "CLIENT RETURN RATE" },
  { value: "40", label: "ADVISORS" },
];

const CATEGORIES = [
  { name: "Apartment", count: "482 homes", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80" },
  { name: "Villa", count: "166 homes", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80" },
  { name: "House", count: "310 homes", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80" },
  { name: "Office", count: "94 spaces", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" },
  { name: "Commercial", count: "58 spaces", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80" },
  { name: "Land", count: "27 plots", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80" },
];

const PROPERTIES = [
  {
    id: "01",
    status: "FOR SALE",
    name: "The Meridian Residence",
    price: "$2,450,000",
    location: "Hillsborough, California",
    beds: 5,
    baths: 4,
    area: "4,120 sq ft",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "02",
    status: "FOR RENT",
    name: "Lakeside Pavilion",
    price: "$8,900 / mo",
    location: "Lake Oswego, Oregon",
    beds: 3,
    baths: 3,
    area: "2,480 sq ft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "03",
    status: "FOR SALE",
    name: "Aster Court Townhouse",
    price: "$1,180,000",
    location: "Georgetown, Washington",
    beds: 4,
    baths: 3,
    area: "2,950 sq ft",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
];

const AGENTS = [
  { name: "Amara Osei", role: "Principal Advisor", listings: "32 listings", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
  { name: "Daniel Mercer", role: "Residential Lead", listings: "28 listings", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80" },
  { name: "Priya Nair", role: "Commercial Advisor", listings: "21 listings", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" },
  { name: "Jonah Feld", role: "New Developments", listings: "19 listings", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" },
];

const LOCATIONS = [
  { name: "Napa Valley", count: "128 listings", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80", dir: "left" as const },
  { name: "Brooklyn Heights", count: "86 listings", image: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=1200&q=80", dir: "right" as const },
  { name: "Lake Tahoe", count: "54 listings", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80", dir: "down" as const },
];

const REVIEWS = [
  { quote: "They understood the brief instantly and never wasted our time. Every viewing felt considered.", name: "H. Alvarez", meta: "Seller — Hillsborough" },
  { quote: "The most organised process we've been through. Clear numbers, honest advice, zero pressure.", name: "M. Lindqvist", meta: "Buyer — Georgetown" },
  { quote: "An advisory team that treats a lease like it matters. Rare, and genuinely appreciated.", name: "S. Rahman", meta: "Tenant — Lake Oswego" },
];

const ARTICLES = [
  { cat: "Market", title: "What a rate pause means for first-time buyers", date: "Mar 12 · 6 min read", image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1000&q=80" },
  { cat: "Design", title: "Passive cooling, explained for warmer cities", date: "Mar 04 · 5 min read", image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=80" },
  { cat: "Guide", title: "How to read a floor plan like an architect", date: "Feb 26 · 4 min read", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80" },
];

/* =========================================================
   MOTION UTILITIES — scroll-linked, transform/opacity/clip only.
========================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;
const CLIP = [0.76, 0, 0.24, 1] as const;

/* Scroll-linked parallax on Y or X. */
function Parallax({
  children,
  className = "",
  amount = 40,
  axis = "y",
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  axis?: "x" | "y";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [amount, -amount]);
  const x = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [amount, -amount]);
  return (
    <motion.div ref={ref} className={className} style={axis === "y" ? { y } : { x }}>
      {children}
    </motion.div>
  );
}

/* Editorial image reveal: bottom→top clip + inner scale settle. */
function ImageReveal({
  src,
  alt,
  className = "",
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`re-reveal ${className}`}
      initial={reduced ? { clipPath: "inset(0%)" } : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0%)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduced ? 0.01 : 1, delay: reduced ? 0 : delay, ease: CLIP }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={reduced ? { scale: 1 } : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0.01 : 1.4, delay: reduced ? 0 : delay, ease: EASE }}
      />
    </motion.div>
  );
}

/* Staggered directional reveal for text blocks. */
function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "down" | "left" | "right";
}) {
  const reduced = useReducedMotion();
  const offset = {
    up: { y: 34, x: 0 },
    down: { y: -34, x: 0 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
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

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function RealEstateDemo() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

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
  const heroImageY = useTransform(heroProgress, [0, 1], reduced ? [0, 0] : [0, 70]);
  const heroImageScale = useTransform(heroProgress, [0, 1], reduced ? [1, 1] : [1, 1.1]);
  const heroTextY = useTransform(heroProgress, [0, 1], reduced ? [0, 0] : [0, -110]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], reduced ? [1, 1] : [1, 0]);
  const searchY = useTransform(heroProgress, [0, 1], reduced ? [0, 0] : [0, -46]);

  const [query, setQuery] = useState({ location: "Any location", type: "Any type", price: "Any price" });

  return (
    <div className="re-demo">
      <header className={scrolled ? "re-nav re-nav--solid" : "re-nav"}>
        <button className="re-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="re-brand-mark">R</span>
          <span>
            RABINA <small>/ REAL ESTATE</small>
          </span>
        </button>

        <nav className="re-nav-links">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>HOME</button>
          <button onClick={() => scrollToId("properties")}>LISTINGS</button>
          <button onClick={() => scrollToId("locations")}>LOCATIONS</button>
          <button onClick={() => scrollToId("agents")}>AGENTS</button>
          <button onClick={() => scrollToId("articles")}>JOURNAL</button>
        </nav>

        <div className="re-nav-right">
          <a className="re-nav-back" href="/?returnTo=showcase">
            <ArrowLeft size={14} /> BACK
          </a>
          <button className="re-nav-cta" onClick={() => scrollToId("contact")}>
            <Phone size={13} /> CONTACT
          </button>
        </div>
      </header>

      <main>
        {/* HERO / SEARCH */}
        <section className="re-hero" ref={heroRef}>
          <motion.div
            className="re-hero-media"
            style={{ y: heroImageY, scale: heroImageScale }}
            initial={reduced ? { scale: 1 } : { scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduced ? 0.01 : 1.7, ease: EASE }}
          >
            <img src={HERO_IMAGE} alt="Contemporary residence exterior" />
          </motion.div>
          <div className="re-hero-veil" />

          <motion.div className="re-hero-inner" style={{ y: heroTextY, opacity: heroOpacity }}>
            <motion.p
              className="re-kicker"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.7, delay: reduced ? 0 : 0.25 }}
            >
              FORM / RESIDENCES — ADVISORY SINCE 2009
            </motion.p>

            <motion.h1
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.01 : 1, delay: reduced ? 0 : 0.4, ease: EASE }}
            >
              Room to <em>become.</em>
            </motion.h1>

            <motion.p
              className="re-hero-text"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.8, delay: reduced ? 0 : 0.62 }}
            >
              Architecture, considered from the first scroll. A curated marketplace for homes,
              workplaces and land.
            </motion.p>
          </motion.div>

          {/* Property search panel */}
          <motion.div
            className="re-search"
            style={{ y: searchY }}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.9, delay: reduced ? 0 : 0.78, ease: EASE }}
          >
            <label className="re-field">
              <span>LOCATION</span>
              <select value={query.location} onChange={(e) => setQuery({ ...query, location: e.target.value })}>
                <option>Any location</option>
                <option>California</option>
                <option>Oregon</option>
                <option>Washington</option>
                <option>New York</option>
              </select>
            </label>

            <label className="re-field">
              <span>PROPERTY TYPE</span>
              <select value={query.type} onChange={(e) => setQuery({ ...query, type: e.target.value })}>
                <option>Any type</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>House</option>
                <option>Office</option>
                <option>Land</option>
              </select>
            </label>

            <label className="re-field">
              <span>PRICE</span>
              <select value={query.price} onChange={(e) => setQuery({ ...query, price: e.target.value })}>
                <option>Any price</option>
                <option>Under $1M</option>
                <option>$1M – $2.5M</option>
                <option>$2.5M +</option>
              </select>
            </label>

            <button className="re-search-btn" onClick={() => scrollToId("properties")}>
              <Search size={16} /> SEARCH
            </button>
          </motion.div>
        </section>

        {/* STATS */}
        <section className="re-stats">
          <div className="re-stats-inner">
            {STATS.map((stat, index) => (
              <Reveal key={stat.label} className="re-stat" delay={index * 0.08}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="re-categories" id="categories">
          <div className="re-section-head">
            <Reveal from="up">
              <p className="re-kicker">01 / BROWSE</p>
              <h2>
                Find your <em>category.</em>
              </h2>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <span className="re-section-note">6 CATEGORIES</span>
            </Reveal>
          </div>

          <div className="re-cat-grid">
            {CATEGORIES.map((cat, index) => (
              <Reveal key={cat.name} className="re-cat" delay={index * 0.06}>
                <button className="re-cat-card">
                  <div className="re-cat-image">
                    <Parallax amount={index % 2 === 0 ? 22 : -22}>
                      <img src={cat.image} alt={cat.name} loading="lazy" />
                    </Parallax>
                  </div>
                  <div className="re-cat-meta">
                    <strong>{cat.name}</strong>
                    <small>{cat.count}</small>
                  </div>
                  <ArrowUpRight size={16} className="re-cat-arrow" />
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FEATURED PROPERTIES */}
        <section className="re-properties" id="properties">
          <div className="re-section-head">
            <Reveal from="up">
              <p className="re-kicker">02 / FEATURED</p>
              <h2>
                Selected <em>properties.</em>
              </h2>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <span className="re-section-note">CURATED WEEKLY</span>
            </Reveal>
          </div>

          <div className="re-property-grid">
            {PROPERTIES.map((prop, index) => (
              <Reveal
                key={prop.id}
                className={`re-property${index === 0 ? " re-property--wide" : ""}`}
                delay={index * 0.12}
              >
                <article className="re-property-card">
                  <ImageReveal src={prop.image} alt={prop.name} className="re-property-media" delay={index * 0.08} />
                  <span className="re-badge">{prop.status}</span>
                  <div className="re-property-body">
                    <div className="re-property-top">
                      <span className="re-property-loc">
                        <MapPin size={13} /> {prop.location}
                      </span>
                      <span className="re-property-price">{prop.price}</span>
                    </div>
                    <h3>{prop.name}</h3>
                    <div className="re-property-facts">
                      <span>
                        <BedDouble size={15} /> {prop.beds} Beds
                      </span>
                      <span>
                        <Bath size={15} /> {prop.baths} Baths
                      </span>
                      <span>
                        <Maximize size={15} /> {prop.area}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* AGENTS */}
        <section className="re-agents" id="agents">
          <div className="re-section-head">
            <Reveal from="up">
              <p className="re-kicker">03 / ADVISORS</p>
              <h2>
                The people <em>behind it.</em>
              </h2>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <span className="re-section-note">40 ADVISORS</span>
            </Reveal>
          </div>

          <div className="re-agent-grid">
            {AGENTS.map((agent, index) => (
              <Reveal key={agent.name} className="re-agent" delay={index * 0.1} from={index % 2 === 0 ? "up" : "down"}>
                <div className="re-agent-photo">
                  <img src={agent.image} alt={agent.name} loading="lazy" />
                </div>
                <div className="re-agent-meta">
                  <strong>{agent.name}</strong>
                  <small>{agent.role}</small>
                </div>
                <span className="re-agent-listings">{agent.listings}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* LOCATIONS — asymmetric tiles */}
        <section className="re-locations" id="locations">
          <div className="re-section-head">
            <Reveal from="up">
              <p className="re-kicker">04 / PLACES</p>
              <h2>
                Top <em>locations.</em>
              </h2>
            </Reveal>
          </div>

          <div className="re-location-grid">
            {LOCATIONS.map((loc, index) => (
              <Reveal
                key={loc.name}
                className={`re-location${index === 0 ? " re-location--large" : ""}`}
                delay={index * 0.08}
                from={loc.dir}
              >
                <div className="re-location-media">
                  <Parallax amount={index === 0 ? 34 : 24}>
                    <img src={loc.image} alt={loc.name} loading="lazy" />
                  </Parallax>
                  <div className="re-location-overlay">
                    <strong>{loc.name}</strong>
                    <span>{loc.count}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* REVIEWS — manual slider (no autoplay) */}
        <section className="re-reviews" id="reviews">
          <div className="re-reviews-inner">
            <Reveal from="left">
              <p className="re-kicker">05 / REVIEWS</p>
              <h2>
                Said about <em>the work.</em>
              </h2>
            </Reveal>

            <Reveal className="re-review-track" from="right" delay={0.12}>
              {REVIEWS.map((rev) => (
                <blockquote className="re-review" key={rev.name}>
                  <p>“{rev.quote}”</p>
                  <footer>
                    <strong>{rev.name}</strong>
                    <span>{rev.meta}</span>
                  </footer>
                </blockquote>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ARTICLES */}
        <section className="re-articles" id="articles">
          <div className="re-section-head">
            <Reveal from="up">
              <p className="re-kicker">06 / JOURNAL</p>
              <h2>
                Latest <em>notes.</em>
              </h2>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <span className="re-section-note">FROM THE DESK</span>
            </Reveal>
          </div>

          <div className="re-article-grid">
            {ARTICLES.map((article, index) => (
              <Reveal key={article.title} className="re-article" delay={index * 0.1}>
                <div className="re-article-card">
                  <ImageReveal src={article.image} alt={article.title} className="re-article-media" delay={index * 0.06} />
                  <div className="re-article-body">
                    <span className="re-article-cat">{article.cat}</span>
                    <h3>{article.title}</h3>
                    <small>{article.date}</small>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="re-cta" id="contact">
          <div className="re-cta-band" aria-hidden="true" />
          <div className="re-cta-inner">
            <Reveal from="up">
              <p className="re-kicker">NEXT STEP</p>
            </Reveal>
            <Reveal from="up" delay={0.08}>
              <h2>
                Do you have <em>questions?</em>
              </h2>
            </Reveal>
            <div className="re-cta-foot">
              <Reveal from="left" delay={0.16}>
                <p>Talk to an advisor about buying, selling or leasing. No pressure, clear numbers.</p>
              </Reveal>
              <Reveal from="right" delay={0.22}>
                <a className="re-cta-btn" href="/?returnTo=contact">
                  BOOK A CONSULTATION <ArrowUpRight size={15} />
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="re-footer">
        <div className="re-footer-brand">
          <span className="re-brand-mark">R</span>
          <strong>RABINA</strong>
          <small>/ REAL ESTATE</small>
        </div>
        <span>CONCEPT WEBSITE — DESIGNED FOR RABINA SHOWCASE</span>
        <div className="re-footer-links">
          <a href="/?returnTo=showcase">← BACK TO RABINA</a>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>TOP ↑</button>
        </div>
      </footer>
    </div>
  );
}
