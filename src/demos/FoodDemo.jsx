import React, { useEffect, useRef, useState } from "react";
import "./FoodDemo.css";

const dishes = [
  {
    name: "Charred Citrus Salmon",
    category: "FROM THE SEA",
    price: "$24",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Truffle Garden Pasta",
    category: "PASTA",
    price: "$19",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Fire-Roasted Steak",
    category: "FROM THE FIRE",
    price: "$31",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Garden Burrata",
    category: "SMALL PLATES",
    price: "$15",
    image:
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Crispy Herb Chicken",
    category: "FROM THE FIRE",
    price: "$22",
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Seasonal Tiramisu",
    category: "DESSERT",
    price: "$11",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=85",
  },
];

const menu = [
  ["Sourdough + Cultured Butter", "$7"],
  ["Burrata, Tomato + Basil Oil", "$13"],
  ["Charred Octopus + Lemon", "$18"],
  ["Wild Mushroom Risotto", "$21"],
  ["Fire-Roasted Ribeye", "$34"],
  ["Citrus Olive Oil Cake", "$10"],
];

function Reveal({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("food-reveal--visible");
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`food-reveal ${className}`}>
      {children}
    </div>
  );
}

export default function FoodDemo() {
  const [activeDish, setActiveDish] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDish((current) => (current + 1) % dishes.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <div className="food-demo">
      <div className="food-noise" aria-hidden="true" />

      {/* NAVIGATION */}
      <header className="food-nav">
        <button
          className="food-brand"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <span className="food-brand-mark">R</span>

          <span>
            RABINA <small>/ FOOD</small>
          </span>
        </button>

        <nav
          className={
            menuOpen
              ? "food-nav-links food-nav-links--open"
              : "food-nav-links"
          }
        >
          <button onClick={() => scrollTo("story")}>STORY</button>
          <button onClick={() => scrollTo("dishes")}>DISHES</button>
          <button onClick={() => scrollTo("menu")}>MENU</button>
          <button onClick={() => scrollTo("visit")}>VISIT</button>
        </nav>

        <button
          className="food-reserve"
          onClick={() => scrollTo("visit")}
        >
          RESERVE <span>↗</span>
        </button>

        <button
          className="food-mobile-toggle"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </header>

      <main>
        {/* HERO */}
        <section className="food-hero">
          <div className="food-hero-copy">
            <Reveal>
              <p className="food-kicker">
                EST. 2026 / PALATE &amp; FIRE
              </p>

              <h1>
                Food made
                <em> to be remembered.</em>
              </h1>

              <p className="food-hero-text">
                A contemporary dining experience built around open fire,
                seasonal produce and plates worth slowing down for.
              </p>

              <div className="food-hero-actions">
                <button
                  onClick={() => scrollTo("dishes")}
                  className="food-primary-btn"
                >
                  EXPLORE THE MENU <span>↓</span>
                </button>

                <button
                  onClick={() => scrollTo("visit")}
                  className="food-text-btn"
                >
                  FIND A TABLE ↗
                </button>
              </div>
            </Reveal>
          </div>

          <div className="food-hero-visual">
            <div className="food-hero-image-wrap">
              {dishes.map((dish, index) => (
                <img
                  key={dish.name}
                  src={dish.image}
                  alt={dish.name}
                  className={
                    index === activeDish
                      ? "food-hero-image is-active"
                      : "food-hero-image"
                  }
                />
              ))}
            </div>

            <div className="food-hero-label">
              <span>01</span>
              <span>—</span>
              <span>06</span>

              <b>
                {String(activeDish + 1).padStart(2, "0")}
              </b>
            </div>

            <div className="food-hero-stamp">
              OPEN
              <br />
              KITCHEN
            </div>
          </div>

          <div className="food-scroll-line">
            <span>SCROLL TO TASTE</span>
            <i />
          </div>
        </section>

        {/* STORY */}
        <section id="story" className="food-story">
          <Reveal className="food-story-image">
            <img
              src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=85"
              alt="Chef preparing food"
            />

            <span>THE KITCHEN / 01</span>
          </Reveal>

          <Reveal className="food-story-copy">
            <p className="food-kicker">
              OUR POINT OF VIEW
            </p>

            <h2>
              Simple ingredients.
              <em> Serious attention.</em>
            </h2>

            <p>
              We build every plate from a small number of beautiful
              ingredients, then let fire, texture and time do the talking.
            </p>

            <div className="food-signature">
              <span>Chef's note</span>

              <strong>
                “Make it honest. Make it memorable.”
              </strong>
            </div>
          </Reveal>
        </section>

        {/* DISHES */}
        <section id="dishes" className="food-dishes">
          <div className="food-section-heading">
            <Reveal>
              <p className="food-kicker">
                FROM THE KITCHEN
              </p>

              <h2>
                Signature <em>dishes.</em>
              </h2>
            </Reveal>

            <span className="food-heading-number">
              02 / 04
            </span>
          </div>

          <div className="food-dish-grid">
            {dishes.map((dish, index) => (
              <Reveal
                key={dish.name}
                className={`food-dish-card food-dish-card--${
                  index + 1
                }`}
              >
                <button
                  className="food-dish-image"
                  onClick={() => setActiveDish(index)}
                  aria-label={`View ${dish.name}`}
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                  />

                  <span className="food-dish-arrow">
                    ↗
                  </span>
                </button>

                <div className="food-dish-meta">
                  <span>{dish.category}</span>
                  <span>{dish.price}</span>
                </div>

                <h3>{dish.name}</h3>
              </Reveal>
            ))}
          </div>
        </section>

        {/* MENU */}
        <section id="menu" className="food-menu-section">
          <div className="food-menu-left">
            <Reveal>
              <p className="food-kicker">
                THE EVENING MENU
              </p>

              <h2>
                A little <em>fire.</em>
                <br />
                A lot of flavour.
              </h2>

              <p>
                Our menu changes with the market. These are a few favourites
                from the current table.
              </p>

              <button
                className="food-outline-btn"
                onClick={() => scrollTo("visit")}
              >
                VIEW FULL MENU ↗
              </button>
            </Reveal>
          </div>

          <Reveal className="food-menu-list">
            {menu.map(([name, price], index) => (
              <div
                className="food-menu-row"
                key={name}
              >
                <span className="food-menu-index">
                  0{index + 1}
                </span>

                <span className="food-menu-name">
                  {name}
                </span>

                <span className="food-menu-dots" />

                <span className="food-menu-price">
                  {price}
                </span>
              </div>
            ))}
          </Reveal>
        </section>

        {/* RESTAURANT INTERIOR */}
        <section className="food-feature">
          <div className="food-feature-image">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85"
              alt="Restaurant interior"
            />
          </div>

          <div className="food-feature-copy">
            <p className="food-kicker">
              THE ROOM
            </p>

            <h2>
              Come for dinner.
              <br />
              <em>Stay for the night.</em>
            </h2>

            <p>
              Warm light, long tables and an open kitchen make the room feel
              alive from the first pour to the last plate.
            </p>

            <button
              onClick={() => scrollTo("visit")}
              className="food-text-btn food-text-btn--light"
            >
              PLAN YOUR VISIT ↗
            </button>
          </div>
        </section>

        {/* VISIT / RESERVATION */}
        <section id="visit" className="food-visit">
          <Reveal>
            <p className="food-kicker">
              YOUR TABLE AWAITS
            </p>

            <h2>
              Make an evening <em>of it.</em>
            </h2>

            <p className="food-visit-copy">
              Thursday — Sunday / 5:30 PM — 11:00 PM
              <br />
              18 Market Street, Downtown
            </p>

            <button
              className="food-primary-btn"
              onClick={() =>
                alert(
                  "Demo only — connect this button to your booking system."
                )
              }
            >
              RESERVE A TABLE <span>↗</span>
            </button>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="food-footer">
        <div className="food-footer-brand">
          <span className="food-brand-mark">
            R
          </span>

          <strong>RABINA</strong>

          <small>/ FOOD CONCEPT</small>
        </div>

        <span>
          CONCEPT WEBSITE — DESIGNED FOR RABINA SHOWCASE
        </span>

        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          ↑ TOP
        </button>
      </footer>
    </div>
  );
}