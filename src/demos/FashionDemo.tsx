import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import "./FashionDemo.css";

/* =========================================================
   RABINA / ATELIER — fashion showcase content.
   Editorial photography sourced from Unsplash.
========================================================= */

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2200&q=85";

const INTRO_IMAGE =
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=85";

const EDITORIAL_IMAGE =
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2400&q=85";

const STORY_IMAGE =
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=85";

const COLLECTION = [
  {
    id: "01",
    name: "Noir Tailoring",
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=85",
    layout: "fashion-look--a",
  },
  {
    id: "02",
    name: "Soft Structure",
    category: "Ready-to-wear",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
    layout: "fashion-look--b",
  },
  {
    id: "03",
    name: "Warm Minimal",
    category: "Knitwear",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85",
    layout: "fashion-look--c",
  },
  {
    id: "04",
    name: "After Hours",
    category: "Evening",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85",
    layout: "fashion-look--d",
  },
  {
    id: "05",
    name: "Quiet Luxury",
    category: "Essentials",
    image:
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=1200&q=85",
    layout: "fashion-look--e",
  },
];

const LOOKBOOK = [
  {
    name: "Atelier Coat",
    meta: "Wool / Bone",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1100&q=85",
    className: "fashion-card--tall",
  },
  {
    name: "Silk Column Dress",
    meta: "Silk / Ink",
    image:
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1100&q=85",
    className: "fashion-card--short",
  },
  {
    name: "Layered Knit",
    meta: "Cashmere / Sand",
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1100&q=85",
    className: "fashion-card--mid",
  },
  {
    name: "Structured Leather",
    meta: "Leather / Shadow",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1100&q=85",
    className: "fashion-card--mid",
  },
];

/* =========================================================
   MOTION UTILITIES
   Scroll-linked effects are isolated here so the motion
   language stays consistent and performant (transform /
   opacity / clip-path only, driven by MotionValues).
========================================================= */

type Direction = "up" | "down" | "left" | "right";

const CLIP_FROM: Record<Direction, string> = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/* Scroll-linked parallax. Vertical by default, horizontal optional. */
function Parallax({
  children,
  className = "",
  amount = 70,
  axis = "y",
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  axis?: "x" | "y";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [amount, -amount]);
  const x = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [amount, -amount]);

  return (
    <motion.div ref={ref} className={className} style={axis === "y" ? { y } : { x }}>
      {children}
    </motion.div>
  );
}

/* Cinematic image reveal: clip-path wipe + inner scale settle. */
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
  from?: Direction;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`fashion-reveal ${className}`}
      initial={reduced ? { clipPath: "inset(0%)" } : { clipPath: CLIP_FROM[from] }}
      whileInView={{ clipPath: "inset(0%)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: reduced ? 0.01 : 1.1,
        delay: reduced ? 0 : delay,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={reduced ? { scale: 1 } : { scale: 1.28 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: reduced ? 0.01 : 1.5,
          delay: reduced ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.div>
  );
}

/* Scroll-linked cinematic image: clip reveal + continuous scale/parallax. */
function CineImage({
  src,
  alt,
  className = "",
  from = "up",
  yRange = [-50, 50],
  scaleRange = [1.08, 1],
}: {
  src: string;
  alt: string;
  className?: string;
  from?: Direction;
  yRange?: [number, number];
  scaleRange?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : yRange);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : scaleRange);

  return (
    <motion.div
      ref={ref}
      className={`fashion-reveal ${className}`}
      initial={reduced ? { clipPath: "inset(0%)" } : { clipPath: CLIP_FROM[from] }}
      whileInView={{ clipPath: "inset(0%)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduced ? 0.01 : 1.3, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.img src={src} alt={alt} loading="lazy" style={{ y, scale }} />
    </motion.div>
  );
}

/* Staggered directional text reveal. */
function TextReveal({
  children,
  className = "",
  delay = 0,
  from = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: Direction;
}) {
  const reduced = useReducedMotion();
  const offset = {
    up: { y: 42, x: 0 },
    down: { y: -42, x: 0 },
    left: { x: -48, y: 0 },
    right: { x: 48, y: 0 },
  }[from];

  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: reduced ? 0.01 : 0.85,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function FashionDemo() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  /* Nav adapts once the hero has been passed (single boolean toggle). */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Hero layered scroll choreography, driven by the taller hero wrap
     so the pinned hero can hand off to the next overlapping section. */
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroWrapRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "24%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], reduced ? [1, 1] : [1, 1.16]);
  const heroCopyY = useTransform(heroProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "-110%"]);
  const heroCopyScale = useTransform(heroProgress, [0, 1], reduced ? [1, 1] : [1, 0.92]);
  const heroCopyOpacity = useTransform(heroProgress, [0, 0.72], reduced ? [1, 1] : [1, 0]);
  const heroVeilOpacity = useTransform(heroProgress, [0, 0.9], reduced ? [1, 1] : [1, 0.35]);
  const heroMetaY = useTransform(heroProgress, [0, 1], reduced ? ["0%", "0%"] : ["0%", "-160%"]);

  return (
    <div className="fashion-demo">
      <div className="fashion-grain" aria-hidden="true" />

      <header className={scrolled ? "fashion-nav fashion-nav--solid" : "fashion-nav"}>
        <button
          className="fashion-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="RABINA home"
        >
          <span className="fashion-brand-mark">R</span>
          <span>
            RABINA <small>/ ATELIER</small>
          </span>
        </button>

        <nav className="fashion-nav-links">
          <button onClick={() => scrollToId("collection")}>COLLECTIONS</button>
          <button onClick={() => scrollToId("editorial")}>ATELIER</button>
          <button onClick={() => scrollToId("lookbook")}>LOOKBOOK</button>
          <button onClick={() => scrollToId("contact")}>CONTACT</button>
        </nav>

        <div className="fashion-nav-right">
          <a className="fashion-nav-back" href="/?returnTo=showcase">
            <ArrowLeft size={14} /> BACK
          </a>
          <button className="fashion-nav-cta" onClick={() => scrollToId("contact")}>
            BOOK A FITTING <ArrowUpRight size={14} />
          </button>
        </div>
      </header>

      <main>
        {/* HERO — pinned within a tall wrap so it hands off to the intro */}
        <div className="fashion-hero-wrap" ref={heroWrapRef}>
          <section className="fashion-hero">
            <motion.div
              className="fashion-hero-media"
              style={{ y: heroImageY, scale: heroImageScale }}
              initial={reduced ? { clipPath: "inset(0%)" } : { clipPath: "inset(14% 10% 14% 10%)" }}
              animate={{ clipPath: "inset(0%)" }}
              transition={{ duration: reduced ? 0.01 : 1.7, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.img
                src={HERO_IMAGE}
                alt="RABINA atelier editorial"
                initial={reduced ? { scale: 1 } : { scale: 1.16, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: reduced ? 0.01 : 1.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            <motion.div className="fashion-hero-veil" style={{ opacity: heroVeilOpacity }} />

            <motion.div
              className="fashion-hero-inner"
              style={{ y: heroCopyY, scale: heroCopyScale, opacity: heroCopyOpacity }}
            >
            <motion.p
              className="fashion-kicker"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.7, delay: reduced ? 0 : 0.15 }}
            >
              PARIS — MILAN — EVERYWHERE / EST. 2026
            </motion.p>

            <h1>
              <motion.span
                className="fashion-line"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0.01 : 1.05, delay: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Dress the
              </motion.span>
              <motion.span
                className="fashion-line fashion-line--accent"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0.01 : 1.05, delay: reduced ? 0 : 0.46, ease: [0.22, 1, 0.36, 1] }}
              >
                future.
              </motion.span>
            </h1>

            <motion.p
              className="fashion-hero-text"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.8, delay: reduced ? 0 : 0.72 }}
            >
              A fashion house identity built to move at the speed of culture. Editorial, precise and
              unmistakably modern.
            </motion.p>

            <motion.div
              className="fashion-hero-actions"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.01 : 0.8, delay: reduced ? 0 : 0.9 }}
            >
              <button className="fashion-btn fashion-btn--solid" onClick={() => scrollToId("collection")}>
                ENTER THE ARCHIVE <ArrowUpRight size={15} />
              </button>
              <button className="fashion-btn fashion-btn--line" onClick={() => scrollToId("editorial")}>
                THE HOUSE
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="fashion-hero-meta"
            style={{ y: heroMetaY }}
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0.01 : 1, delay: reduced ? 0 : 1.2 }}
          >
            <span>01 / 06</span>
            <span className="fashion-hero-scroll">
              <i /> SCROLL
            </span>
            <span>AUTUMN / WINTER</span>
          </motion.div>
          </section>
        </div>

        {/* INTRO — overlaps hero */}
        <section className="fashion-intro" id="intro">
          <div className="fashion-intro-card">
            <div className="fashion-intro-head">
              <TextReveal className="fashion-kicker" from="left">
                THE HOUSE / 02
              </TextReveal>
              <TextReveal from="up" delay={0.08}>
                <h2>
                  Made for
                  <br />
                  <em>movement.</em>
                </h2>
              </TextReveal>
            </div>

            <div className="fashion-intro-grid">
              <TextReveal from="up" delay={0.16}>
                <p>
                  Every silhouette is drawn around the way a body actually moves. We build
                  collections that feel effortless on the first wear and unforgettable on the
                  hundredth.
                </p>
                <p className="fashion-intro-note">
                  Cut in small numbers. Finished by hand. Designed to outlive the season.
                </p>
              </TextReveal>

              <CineImage
                src={INTRO_IMAGE}
                alt="RABINA tailoring detail"
                from="left"
                yRange={[-40, 40]}
              />
            </div>
          </div>
        </section>

        {/* COLLECTION — asymmetric parallax */}
        <section className="fashion-collection" id="collection">
          <div className="fashion-section-head">
            <TextReveal from="up">
              <p className="fashion-kicker">THE EDIT / 03</p>
              <h2>
                The <em>collection.</em>
              </h2>
            </TextReveal>
            <TextReveal from="right" delay={0.12}>
              <span className="fashion-section-count">05 LOOKS</span>
            </TextReveal>
          </div>

          <div className="fashion-look-grid">
            {COLLECTION.map((look, index) => (
              <Parallax
                key={look.id}
                className={`fashion-look ${look.layout}`}
                axis={index === 1 || index === 3 ? "x" : "y"}
                amount={index === 1 ? 46 : index === 3 ? -46 : index % 2 === 0 ? 60 : 100}
              >
                <TextReveal from="up" delay={index * 0.05}>
                  <ImageReveal
                    src={look.image}
                    alt={look.name}
                    from={index % 2 === 0 ? "up" : "right"}
                    className="fashion-look-image"
                  />
                  <div className="fashion-look-meta">
                    <span>{look.id}</span>
                    <div>
                      <strong>{look.name}</strong>
                      <small>{look.category}</small>
                    </div>
                    <ArrowUpRight size={16} />
                  </div>
                </TextReveal>
              </Parallax>
            ))}
          </div>
        </section>

        {/* LARGE EDITORIAL IMAGE */}
        <section className="fashion-editorial" id="editorial">
          <div className="fashion-editorial-inner">
            <motion.div
              className="fashion-editorial-media"
              initial={reduced ? { clipPath: "inset(0%)" } : { clipPath: "inset(12% 8% 12% 8%)" }}
              whileInView={{ clipPath: "inset(0%)" }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduced ? 0.01 : 1.4, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.img
                src={EDITORIAL_IMAGE}
                alt="RABINA campaign editorial"
                initial={reduced ? { scale: 1 } : { scale: 1.22 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: reduced ? 0.01 : 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            <Parallax className="fashion-editorial-copy" amount={90}>
              <TextReveal from="left">
                <p className="fashion-kicker">CAMPAIGN / 04</p>
                <h2>
                  A point
                  <br />
                  of <em>view.</em>
                </h2>
              </TextReveal>
              <TextReveal from="left" delay={0.15}>
                <p className="fashion-editorial-note">
                  Autumn / Winter — shot on location, styled in motion.
                </p>
              </TextReveal>
            </Parallax>

            <Parallax className="fashion-editorial-tag" amount={140}>
              <span>AW/26</span>
            </Parallax>
          </div>
        </section>

        {/* STORY */}
        <section className="fashion-story" id="story">
          <div className="fashion-story-media">
            <CineImage
              src={STORY_IMAGE}
              alt="RABINA atelier studio"
              from="down"
              yRange={[-55, 55]}
              scaleRange={[1.06, 1]}
            />
            <Parallax className="fashion-story-badge" amount={40}>
              <span>THE ATELIER</span>
            </Parallax>
          </div>

          <div className="fashion-story-copy">
            <TextReveal from="right">
              <p className="fashion-kicker">THE CRAFT / 05</p>
              <h2>
                Slow made.
                <br />
                <em>Quietly loud.</em>
              </h2>
            </TextReveal>
            <TextReveal from="right" delay={0.12}>
              <p>
                From first sketch to final stitch, each piece passes through the same small team. It
                is a slower way to make clothes — and the reason they last.
              </p>
            </TextReveal>
            <TextReveal from="right" delay={0.2}>
              <div className="fashion-story-stats">
                <div>
                  <strong>14</strong>
                  <small>ARTISANS</small>
                </div>
                <div>
                  <strong>100%</strong>
                  <small>TRACEABLE</small>
                </div>
                <div>
                  <strong>1</strong>
                  <small>ATELIER</small>
                </div>
              </div>
            </TextReveal>
          </div>
        </section>

        {/* LOOKBOOK */}
        <section className="fashion-lookbook" id="lookbook">
          <div className="fashion-section-head">
            <TextReveal from="up">
              <p className="fashion-kicker">THE LOOKBOOK / 06</p>
              <h2>
                Pieces, <em>in detail.</em>
              </h2>
            </TextReveal>
          </div>

          <div className="fashion-card-grid">
            {LOOKBOOK.map((piece, index) => (
              <TextReveal
                key={piece.name}
                className={`fashion-card ${piece.className}`}
                from="up"
                delay={index * 0.08}
              >
                <div className="fashion-card-image">
                  <Parallax
                    className="fashion-card-parallax"
                    amount={index % 2 === 0 ? 28 : -28}
                  >
                    <img src={piece.image} alt={piece.name} loading="lazy" />
                  </Parallax>
                  <span className="fashion-card-open">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
                <div className="fashion-card-meta">
                  <strong>{piece.name}</strong>
                  <small>{piece.meta}</small>
                </div>
              </TextReveal>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="fashion-finale" id="contact">
          <div className="fashion-finale-band" aria-hidden="true" />
          <div className="fashion-finale-inner">
            <TextReveal from="up">
              <p className="fashion-kicker">NEXT / 07</p>
            </TextReveal>
            <TextReveal from="up" delay={0.1}>
              <h2>
                Let's make
                <br />
                something <em>worth wearing.</em>
              </h2>
            </TextReveal>
            <div className="fashion-finale-foot">
              <TextReveal from="left" delay={0.2}>
                <p>
                  RABINA builds fashion identities, campaigns and commerce experiences that move.
                </p>
              </TextReveal>
              <TextReveal from="right" delay={0.28}>
                <a className="fashion-btn fashion-btn--solid" href="/?returnTo=contact">
                  START A PROJECT <ArrowUpRight size={15} />
                </a>
              </TextReveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="fashion-footer">
        <div className="fashion-footer-brand">
          <span className="fashion-brand-mark">R</span>
          <strong>RABINA</strong>
          <small>/ FASHION</small>
        </div>
        <span>CONCEPT WEBSITE — DESIGNED FOR RABINA SHOWCASE</span>
        <div className="fashion-footer-links">
          <a href="/?returnTo=showcase">← BACK TO RABINA</a>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>TOP ↑</button>
        </div>
      </footer>
    </div>
  );
}
