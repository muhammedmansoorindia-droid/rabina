import { useEffect, useState, type ComponentType } from "react";

import {
  Navigation,
  Hero,
  Capability,
  Services,
  Showcase,
  Industries,
  Why,
  Process,
  AISection,
  About,
  FAQ,
  CTA,
  Footer,
} from "./sections/HomeSections";

import FoodDemo from "./demos/FoodDemo";
import FashionDemo from "./demos/FashionDemo";
import RealEstateDemo from "./demos/RealEstateDemo";
import FitnessDemo from "./demos/FitnessDemo";
import DentalDemo from "./demos/DentalDemo";
import HotelDemo from "./demos/HotelDemo";
import SaaSDemo from "./demos/SaaSDemo";
import AutomotiveDemo from "./demos/AutomotiveDemo";

import "./App.css";
import "./components/services-fix.css";

/*
|--------------------------------------------------------------------------
| Demo pages
|--------------------------------------------------------------------------
*/

const demos: Record<string, ComponentType> = {
  food: FoodDemo,
  fashion: FashionDemo,
  "real-estate": RealEstateDemo,
  fitness: FitnessDemo,
  dental: DentalDemo,
  hotel: HotelDemo,
  saas: SaaSDemo,
  automotive: AutomotiveDemo,
};

/*
|--------------------------------------------------------------------------
| Home Page
|--------------------------------------------------------------------------
*/

function Home() {
  /*
   * Handle navigation from other pages back to a specific section.
   *
   * Example:
   * /?returnTo=showcase
   * /?returnTo=contact
   */
  useEffect(() => {
    const returnTo = new URLSearchParams(
      window.location.search
    ).get("returnTo");

    /*
     * If there is a returnTo value, scroll to that section.
     */
    if (returnTo) {
      const timer = window.setTimeout(() => {
        const target = document.getElementById(returnTo);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 150);

      return () => {
        window.clearTimeout(timer);
      };
    }

    /*
     * IMPORTANT:
     * When the homepage is opened normally or refreshed,
     * always start from the very top.
     */
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  return (
    <>
      <Navigation />

      <main id="top">
        <Hero />

        <section id="capability">
          <Capability />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="showcase">
          <Showcase />
        </section>

        <section id="industries">
          <Industries />
        </section>

        <section id="why">
          <Why />
        </section>

        <section id="process">
          <Process />
        </section>

        <section id="ai">
          <AISection />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="faq">
          <FAQ />
        </section>

        <section id="contact">
          <CTA />
        </section>
      </main>

      <Footer />
    </>
  );
}

/*
|--------------------------------------------------------------------------
| Main App
|--------------------------------------------------------------------------
*/

function App() {
  const [path, setPath] = useState(window.location.pathname);

  /*
   * Browser navigation handling.
   */
  useEffect(() => {
    /*
     * Prevent Chrome from restoring the previous scroll position
     * when refreshing the page.
     */
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  /*
   * When the route changes, scroll to the top unless
   * the URL contains a hash.
   */
  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }
  }, [path]);

  /*
   * Make sure / works as the homepage.
   */
  useEffect(() => {
    if (path === "/") {
      /*
       * Small delay allows React to finish rendering
       * before forcing the page to the top.
       */
      const timer = window.setTimeout(() => {
        if (!window.location.hash) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto",
          });
        }
      }, 50);

      return () => {
        window.clearTimeout(timer);
      };
    }
  }, [path]);

  /*
   * Determine whether the current URL is a demo page.
   *
   * Examples:
   * /demos/food
   * /demos/hotel
   * /demos/fashion
   */
  const isDemoPage = path.startsWith("/demos/");

  /*
   * Extract demo slug.
   */
  const slug = isDemoPage
    ? path
        .replace("/demos/", "")
        .replace(/\/$/, "")
    : "";

  /*
   * Find the requested demo component.
   */
  const Demo = demos[slug];

  /*
   * Render demo if the route exists.
   */
  if (isDemoPage && Demo) {
    return <Demo />;
  }

  /*
   * If someone enters an invalid demo URL,
   * send them back to the homepage.
   */
  if (isDemoPage && !Demo) {
    return <Home />;
  }

  /*
   * Normal homepage.
   */
  return <Home />;
}

export default App;