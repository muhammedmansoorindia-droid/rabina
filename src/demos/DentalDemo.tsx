import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  MapPin,
  MessageCircle,
  CalendarCheck,
  Newspaper,
  Headphones,
  Smartphone,
  Stethoscope,
  HeartPulse,
  Activity,
  Ambulance,
  Brain,
  Star,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import "./DentalDemo.css";

/* =========================================================
   RABINA / HEALTH CARE — medical directory showcase.
   Photography sourced from Unsplash.
========================================================= */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1400&q=85";

const CARE_IMAGE =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=85";

const SERVICES = [
  { name: "Primary Care", icon: Stethoscope, text: "Everyday health, checkups and referrals." },
  { name: "Dental Care", icon: Star, text: "Routine and specialist dental treatment." },
  { name: "Diagnostics", icon: Activity, text: "Imaging, labs and screening services." },
  { name: "Emergency Care", icon: Ambulance, text: "Urgent support when it matters most." },
  { name: "Mental Wellness", icon: Brain, text: "Counselling and wellbeing support." },
  { name: "Specialist Care", icon: HeartPulse, text: "Access to focused medical specialists." },
];

const STEPS = [
  { title: "Search a professional", text: "Filter by specialty, location and availability." },
  { title: "Get an appointment", text: "Book a slot instantly and confirm in a tap." },
  { title: "Leave your feedback", text: "Share your experience to help others choose." },
];

const ARTICLES = [
  {
    cat: "Wellness",
    title: "Building a simpler routine for preventive checkups",
    date: "Mar 14 · 5 min read",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=80",
  },
  {
    cat: "Care",
    title: "How to prepare for a first specialist consultation",
    date: "Mar 06 · 4 min read",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    cat: "Hospitals",
    title: "What to look for in a local care provider",
    date: "Feb 27 · 6 min read",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
  },
];

/* =========================================================
   MOTION UTILITIES — calm, precise, trustworthy.
   Only transform / opacity / clip-path are animated.
========================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;
const CLIP = [0.76, 0, 0.24, 1] as const;

type Dir = "up" | "down" | "left" | "right";

function Parallax({
  children,
  className = "",
  amount = 28,
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
      className={`hc-reveal ${className}`}
      initial={reduced ? { clipPath: "inset(0%)" } : { clipPath: clip }}
      whileInView={{ clipPath: "inset(0%)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduced ? 0.01 : 1.1, delay: reduced ? 0 : delay, ease: CLIP }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={reduced ? { scale: 1 } : { scale: 1.06 }}
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
    up: { y: 34, x: 0 },
    down: { y: -34, x: 0 },
    left: { x: -44, y: 0 },
    right: { x: 44, y: 0 },
  }[from];
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduced ? 0.01 : 0.85, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function DentalDemo() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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
  const heroImageY = useTransform(heroProgress, [0, 1], reduced ? [0, 0] : [0, 46]);
  const heroCopyY = useTransform(heroProgress, [0, 1], reduced ? [0, 0] : [0, -70]);
  const searchY = useTransform(heroProgress, [0, 1], reduced ? [0, 0] : [0, -30]);

  return (
    <div className="hc-demo">
      {/* HEADER */}
      <header className={scrolled ? "hc-nav hc-nav--solid" : "hc-nav"}>
        <button className="hc-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="hc-brand-mark">
            <HeartPulse size={16} />
          </span>
          <span>
            RABINA <small>/ HEALTH CARE</small>
          </span>
        </button>

        <nav className={menuOpen ? "hc-nav-links hc-nav-links--open" : "hc-nav-links"}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</button>
          <button onClick={() => scrollToId("services")}>Services</button>
          <button onClick={() => scrollToId("how")}>How It Works</button>
          <button onClick={() => scrollToId("articles")}>Articles</button>
          <button onClick={() => scrollToId("contact")}>Contact</button>
        </nav>

        <div className="hc-nav-right">
          <a className="hc-nav-back" href="/?returnTo=showcase">
            <ArrowLeft size={14} /> BACK
          </a>
          <button className="hc-nav-cta" onClick={() => scrollToId("search")}>
            Find Care <ArrowUpRight size={14} />
          </button>
          <button
            className="hc-burger"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hc-hero" ref={heroRef}>
          <div className="hc-blob hc-blob--a" aria-hidden="true" />
          <div className="hc-blob hc-blob--b" aria-hidden="true" />

          <div className="hc-hero-inner">
            <motion.div
              className="hc-hero-media"
              style={{ y: heroImageY }}
              initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1.06, y: 26 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: reduced ? 0.01 : 1.5, delay: reduced ? 0 : 0.15, ease: EASE }}
            >
              <img src={HERO_IMAGE} alt="Healthcare professional" />
              <span className="hc-hero-badge">
                <Star size={13} /> Trusted directory
              </span>
            </motion.div>

            <motion.div className="hc-hero-copy" style={{ y: heroCopyY }}>
              <motion.p
                className="hc-eyebrow"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0.01 : 0.7, delay: reduced ? 0 : 0.25 }}
              >
                RABINA HEALTH CARE — FIND CARE NEAR YOU
              </motion.p>

              <h1>
                <motion.span
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 44 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0.01 : 0.95, delay: reduced ? 0 : 0.35, ease: EASE }}
                >
                  Need Care?
                </motion.span>
                <motion.span
                  className="hc-line--blue"
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 44 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0.01 : 0.95, delay: reduced ? 0 : 0.48, ease: EASE }}
                >
                  Find the right
                </motion.span>
                <motion.span
                  className="hc-line--coral"
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 44 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0.01 : 0.95, delay: reduced ? 0 : 0.61, ease: EASE }}
                >
                  care near you.
                </motion.span>
              </h1>

              <motion.p
                className="hc-hero-text"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0.01 : 0.8, delay: reduced ? 0 : 0.74 }}
              >
                Search trusted doctors, clinics and hospitals, and book the care you need — simply
                and clearly.
              </motion.p>

              <motion.div
                className="hc-hero-actions"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0.01 : 0.8, delay: reduced ? 0 : 0.88 }}
              >
                <button className="hc-btn hc-btn--primary" onClick={() => scrollToId("search")}>
                  Find a Doctor <ArrowUpRight size={15} />
                </button>
                <button className="hc-btn hc-btn--ghost" onClick={() => scrollToId("services")}>
                  Find a Hospital
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FLOATING SEARCH PANEL */}
        <section className="hc-search-wrap" id="search">
          <motion.div
            className="hc-search"
            style={{ y: searchY }}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduced ? 0.01 : 0.95, delay: reduced ? 0 : 0.95, ease: EASE }}
          >
            <div className="hc-search-main">
              <h2>Start Your Search</h2>
              <label className="hc-field">
                <Search size={16} />
                <input type="text" placeholder="Search doctors, clinics, hospitals..." aria-label="Search" />
              </label>
              <label className="hc-field">
                <MapPin size={16} />
                <select defaultValue="Any location" aria-label="Location">
                  <option>Any location</option>
                  <option>Kerala</option>
                  <option>Karnataka</option>
                  <option>Tamil Nadu</option>
                  <option>Maharashtra</option>
                </select>
              </label>
              <button className="hc-search-btn" onClick={() => scrollToId("services")}>
                <Search size={16} /> Search
              </button>
              <button className="hc-search-adv" onClick={() => scrollToId("how")}>
                Advanced search
              </button>
            </div>

            <div className="hc-search-aside">
              <span className="hc-search-tag">FOR PROFESSIONALS</span>
              <h3>Are you a healthcare professional?</h3>
              <p>Join our directory and connect with patients searching for care.</p>
              <a className="hc-btn hc-btn--light" href="/?returnTo=contact">
                Join Our Team <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        </section>

        {/* FIVE SERVICE BLOCKS */}
        <section className="hc-strip" id="strip">
          <div className="hc-strip-inner">
            {[
              { label: "Live Chat With", title: "Doctors", icon: MessageCircle, tone: "blue" },
              { label: "Fast Appointment With", title: "Nearest Hospital", icon: CalendarCheck, tone: "coral" },
              { label: "Articles From Top", title: "Hospitals & Doctors", icon: Newspaper, tone: "blue" },
              { label: "24/7 Active", title: "Help Support", icon: Headphones, tone: "coral" },
              { label: "Help on the Go", title: "Download App", icon: Smartphone, tone: "blue" },
            ].map((item, index) => (
              <Reveal key={item.title} className="hc-service-block" delay={index * 0.09} from="up">
                <span className={`hc-service-icon hc-tone--${item.tone}`}>
                  <item.icon size={20} />
                </span>
                <div>
                  <small>{item.label}</small>
                  <strong>{item.title}</strong>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CARE INTRODUCTION */}
        <section className="hc-care" id="care">
          <div className="hc-care-inner">
            <div className="hc-care-copy">
              <Reveal from="left">
                <p className="hc-eyebrow">CARE, SIMPLIFIED</p>
                <h2>
                  Bring care to your home
                  <br />
                  <span className="hc-line--coral">with one click.</span>
                </h2>
              </Reveal>
              <Reveal from="left" delay={0.12}>
                <p className="hc-care-text">
                  RABINA Health Care connects you with the right professionals and facilities, so
                  getting help feels as simple as it should.
                </p>
              </Reveal>
              <Reveal from="left" delay={0.2}>
                <div className="hc-care-actions">
                  <button className="hc-btn hc-btn--primary" onClick={() => scrollToId("services")}>
                    About Us
                  </button>
                  <button className="hc-btn hc-btn--ghost" onClick={() => scrollToId("contact")}>
                    Contact
                  </button>
                </div>
              </Reveal>
            </div>

            <div className="hc-care-media">
              <div className="hc-care-backdrop" aria-hidden="true" />
              <Parallax amount={22}>
                <ImageReveal src={CARE_IMAGE} alt="Care team" from="right" className="hc-care-image" />
              </Parallax>
              <Reveal className="hc-care-card" delay={0.28} from="up">
                <span className="hc-care-card-icon">
                  <Stethoscope size={18} />
                </span>
                <div>
                  <small>CARE PROFESSIONAL</small>
                  <strong>General Practitioner</strong>
                  <span className="hc-care-card-note">Available for consultation</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="hc-how" id="how">
          <Reveal from="up" className="hc-how-head">
            <p className="hc-eyebrow">SIMPLE PROCESS</p>
            <h2>
              How It Works?
            </h2>
            <p className="hc-how-text">
              Three straightforward steps from search to appointment — no confusion, no waiting
              rooms.
            </p>
          </Reveal>

          <div className="hc-steps">
            <div className="hc-steps-line" aria-hidden="true" />
            {STEPS.map((step, index) => (
              <Reveal key={step.title} className="hc-step" delay={0.15 + index * 0.16} from="up">
                <span className="hc-step-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="hc-step-icon">
                  {index === 0 ? (
                    <Search size={20} />
                  ) : index === 1 ? (
                    <CalendarCheck size={20} />
                  ) : (
                    <MessageCircle size={20} />
                  )}
                </span>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* HEALTHCARE SERVICES */}
        <section className="hc-services" id="services">
          <div className="hc-section-head">
            <Reveal from="up">
              <p className="hc-eyebrow">WHAT WE COVER</p>
              <h2>
                Healthcare services
              </h2>
            </Reveal>
            <Reveal from="right" delay={0.1}>
              <button className="hc-btn hc-btn--ghost" onClick={() => scrollToId("articles")}>
                Read articles
              </button>
            </Reveal>
          </div>

          <div className="hc-service-grid">
            {SERVICES.map((s, index) => (
              <Reveal key={s.name} className="hc-service-card" delay={index * 0.07} from="up">
                <span className="hc-service-card-icon">
                  <s.icon size={20} />
                </span>
                <strong>{s.name}</strong>
                <p>{s.text}</p>
                <span className="hc-service-link">
                  Learn more <ChevronRight size={14} />
                </span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* LATEST ARTICLES */}
        <section className="hc-articles" id="articles">
          <div className="hc-section-head">
            <Reveal from="up">
              <p className="hc-eyebrow">FROM THE JOURNAL</p>
              <h2>
                Latest articles
              </h2>
            </Reveal>
          </div>

          <div className="hc-article-grid">
            {ARTICLES.map((a, index) => (
              <Reveal key={a.title} className="hc-article" delay={index * 0.1} from="up">
                <article className="hc-article-card">
                  <ImageReveal
                    src={a.image}
                    alt={a.title}
                    className="hc-article-media"
                    from={index % 2 === 0 ? "left" : "up"}
                    delay={index * 0.06}
                  />
                  <div className="hc-article-body">
                    <span className="hc-article-cat">{a.cat}</span>
                    <h3>{a.title}</h3>
                    <div className="hc-article-foot">
                      <small>{a.date}</small>
                      <span className="hc-article-arrow">
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* DIRECTORY LINKS */}
        <section className="hc-directory">
          <div className="hc-directory-inner">
            {[
              { title: "By Specialty", links: ["Primary Care", "Dental Care", "Diagnostics", "Mental Wellness"] },
              { title: "Healthcare Services", links: ["Find a Doctor", "Find a Hospital", "Book Appointment", "Emergency Care"] },
              { title: "For Patients", links: ["How It Works", "Articles", "Feedback", "Support"] },
              { title: "By Location", links: ["India", "Kerala", "Karnataka", "Tamil Nadu"] },
            ].map((col, index) => (
              <Reveal key={col.title} className="hc-dir-col" delay={index * 0.07} from="up">
                <strong>{col.title}</strong>
                {col.links.map((l) => (
                  <button key={l} onClick={() => scrollToId("services")}>
                    {l}
                  </button>
                ))}
              </Reveal>
            ))}
          </div>
        </section>

        {/* FLOATING CONTACT BAR (overlaps footer boundary) */}
        <section className="hc-contact" id="contact">
          <Reveal className="hc-contact-bar" from="up">
            <div className="hc-contact-item hc-contact-item--accent">
              <span className="hc-contact-icon">
                <Ambulance size={18} />
              </span>
              <div>
                <small>EMERGENCY CARE</small>
                <strong>24 / 7 helpline</strong>
              </div>
            </div>
            <div className="hc-contact-item">
              <span className="hc-contact-icon">
                <Phone size={18} />
              </span>
              <div>
                <small>CALL SUPPORT</small>
                <strong>Speak to our team</strong>
              </div>
            </div>
            <div className="hc-contact-item">
              <span className="hc-contact-icon">
                <Mail size={18} />
              </span>
              <div>
                <small>EMAIL</small>
                <strong>Send us a message</strong>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="hc-footer">
        <div className="hc-footer-top">
          <div className="hc-footer-brand">
            <span className="hc-brand-mark">
              <HeartPulse size={16} />
            </span>
            <strong>RABINA</strong>
            <small>/ HEALTH CARE</small>
            <p>A healthcare discovery concept — find care, book appointments and stay informed.</p>
          </div>
          <div className="hc-footer-col">
            <strong>EXPLORE</strong>
            <button onClick={() => scrollToId("services")}>Services</button>
            <button onClick={() => scrollToId("how")}>How It Works</button>
            <button onClick={() => scrollToId("articles")}>Articles</button>
          </div>
          <div className="hc-footer-col">
            <strong>SUPPORT</strong>
            <button onClick={() => scrollToId("contact")}>Contact</button>
            <button onClick={() => scrollToId("search")}>Find Care</button>
            <a href="/?returnTo=showcase">Back to RABINA</a>
          </div>
          <div className="hc-footer-col hc-footer-contact">
            <strong>STAY IN TOUCH</strong>
            <span>
              <Phone size={13} /> Support available 24 / 7
            </span>
            <span>
              <Mail size={13} /> Messages answered daily
            </span>
          </div>
        </div>
        <div className="hc-footer-bottom">
          <span>CONCEPT WEBSITE — DESIGNED FOR RABINA SHOWCASE</span>
          <div className="hc-footer-links">
            <a href="/?returnTo=showcase">← BACK TO RABINA</a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>TOP ↑</button>
          </div>
        </div>
      </footer>

      {/* FLOATING SUPPORT BUTTON */}
      <button className="hc-support" onClick={() => scrollToId("contact")} aria-label="Help and support">
        <Headphones size={18} />
        <span>Help</span>
      </button>
    </div>
  );
}