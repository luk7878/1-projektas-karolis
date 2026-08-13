"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import PageTracker from "../components/PageTracker";

type Language = "lt" | "en";

const topics = {
  lt: [
    {
      n: "01",
      title: "Kritinis mąstymas",
      text: "Mokomės tikrinti faktus, kelti gerus klausimus ir atpažinti klaidinančią informaciją.",
      color: "lime",
    },
    {
      n: "02",
      title: "Neformalus ugdymas",
      text: "Žinios per patirtį: praktinės dirbtuvės, fasilitavimas, refleksija ir gyvas dialogas.",
      color: "blue",
    },
    {
      n: "03",
      title: "Tarpkultūrinis dialogas",
      text: "Jungiame skirtingų šalių jaunimą, kad įvairovė taptų smalsumo, ne išankstinių nuostatų šaltiniu.",
      color: "coral",
    },
    {
      n: "04",
      title: "Sąmoningas gyvenimas",
      text: "Skatiname atsakomybę, emocinę gerovę, atvirumą ir aktyvų dalyvavimą visuomenėje.",
      color: "yellow",
    },
  ],
  en: [
    {
      n: "01",
      title: "Critical thinking",
      text: "We learn to verify facts, ask better questions and recognise misleading information.",
      color: "lime",
    },
    {
      n: "02",
      title: "Non-formal education",
      text: "Learning through experience: workshops, facilitation, reflection and meaningful dialogue.",
      color: "blue",
    },
    {
      n: "03",
      title: "Intercultural dialogue",
      text: "We connect young people across countries so diversity becomes a source of curiosity, not prejudice.",
      color: "coral",
    },
    {
      n: "04",
      title: "Conscious living",
      text: "We promote responsibility, wellbeing, openness and active participation in society.",
      color: "yellow",
    },
  ],
};

const news = [
  {
    date: "2026",
    tag: "KA154",
    title: "Youth Detectives Fighting Fake News",
    slug: "youth-detectives-fighting-fake-news",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85",
  },
  {
    date: "2024–2025",
    tag: "KA210",
    title: "YOUth Roots: Nurturing Rural Entrepreneurship",
    slug: "youth-roots-rural-entrepreneurship",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85",
  },
  {
    date: "2025",
    tag: "KA152",
    title: "SMART on Social Media",
    slug: "smart-on-social-media",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
  },
];

const copy = {
  lt: {
    nav: ["Veiklos kryptys", "Tarptautinė veikla", "Projektai", "Apie mus"],
    join: "Prisijunk",
    ariaNav: "Pagrindinė navigacija",
    change: "Change to English",
    eyebrow: "JAUNIMO GALIA VEIKTI",
    hero: ["Klausk.", "Tyrinėk.", "Mąstyk laisvai."],
    heroP:
      "Jungiame jaunus žmones, kurie renkasi smalsumą vietoje dogmų, argumentus vietoje triukšmo ir dialogą vietoje išankstinių nuostatų.",
    projects: "Atrask projektus",
    meet: "Susipažinkime",
    orbit: "KARTU ✦ KURIAME ✦ VEIKIAME ✦",
    since: "VEIKIAME\nNUO",
    ticker: ["KAUNAS", "EUROPA", "MOKSLAS", "DIALOGAS", "SMALSUMAS"],
    who: "[ KAS MES ]",
    introA: "Atvirų protų",
    introB: "bendruomenė.",
    introP:
      "Asociacija „Lietuvos skeptiškas jaunimas“ vienija racionalų mąstymą, atvirumą ir sąmoningą gyvenimą vertinančius jaunus žmones.",
    vision:
      "Siekiame laisvos, demokratiškos ir tolerantiškos visuomenės, gerbiančios dialogą, žmogaus teises, atsakomybę ir žodžio laisvę.",
    more: "Daugiau apie mus",
    impacts: [
      "įkurta|Kaune",
      "portfolio|projektai",
      "tarptautinis|tinklas",
      "gerų|klausimų",
    ],
    where: "[ KUR VEIKIAME ]",
    fieldsA: "Keturi laukai.",
    fieldsB: "Viena kryptis.",
    fieldsP:
      "Žinias, kūrybiškumą ir refleksiją naudojame kaip įrankius geriau suprasti pasaulį ir aktyviai jame dalyvauti.",
    open: "ATVIRA ATRANKA",
    your: "[ TAVO EILĖ ]",
    opp: ["Mokykis.", "Dalinkis.", "Veik Europoje."],
    oppP: "Dalyvaujame Erasmus+, Europos jaunimo fondo ir kituose tarptautiniuose formatuose, kuriančiuose erdvę mokymuisi, solidarumui ir savanorystei.",
    partner: "Tapti partneriu",
    pills: ["Erasmus+", "Jaunimo mainai", "Tarptautinės partnerystės"],
    exp: "[ MŪSŲ PATIRTIS ]",
    projA: "Projektai,",
    projB: "kurie augina.",
    propose: "Siūlyti partnerystę",
    read: "Skaityti",
    now: "[ DABAR TU ]",
    ctaA: "Turi gerą",
    ctaB: "klausimą?",
    ctaP: "Prisijunk prie bendruomenės, pasiūlyk idėją ar pakviesk mus į tarptautinę partnerystę.",
    contact: "Susisiekti",
    ring: "KLAUSK ✦ ATRASK ✦ MĄSTYK ✦",
    contacts: "Susisiekime",
    links: "Nuorodos",
    website: "Svetainė",
    back: "Atgal į viršų",
    copyright: "Lietuvos skeptiškas jaunimas",
    alt1: "Draugų grupė kartu leidžia laiką gamtoje",
    alt2: "Jauni žmonės dalyvauja bendruomenės iniciatyvoje",
  },
  en: {
    nav: ["What we do", "International work", "Projects", "About us"],
    join: "Join us",
    ariaNav: "Main navigation",
    change: "Keisti į lietuvių kalbą",
    eyebrow: "YOUTH POWER TO ACT",
    hero: ["Question.", "Explore.", "Think freely."],
    heroP:
      "We connect young people who choose curiosity over dogma, arguments over noise, and dialogue over prejudice.",
    projects: "Explore projects",
    meet: "Get to know us",
    orbit: "TOGETHER ✦ WE CREATE ✦ WE ACT ✦",
    since: "ACTIVE\nSINCE",
    ticker: ["KAUNAS", "EUROPE", "SCIENCE", "DIALOGUE", "CURIOSITY"],
    who: "[ WHO WE ARE ]",
    introA: "A community of",
    introB: "open minds.",
    introP:
      "The Lithuanian Skeptic Youth Association brings together young people who value rational thinking, openness and conscious living.",
    vision:
      "We strive for a free, democratic and tolerant society that respects dialogue, human rights, responsibility and freedom of speech.",
    more: "More about us",
    impacts: [
      "founded in|Kaunas",
      "portfolio|projects",
      "international|network",
      "good|questions",
    ],
    where: "[ WHERE WE ACT ]",
    fieldsA: "Four fields.",
    fieldsB: "One direction.",
    fieldsP:
      "We use knowledge, creativity and reflection as tools to understand the world more deeply and participate in it actively.",
    open: "OPEN CALL",
    your: "[ YOUR TURN ]",
    opp: ["Learn.", "Share.", "Act in Europe."],
    oppP: "We participate in Erasmus+, European Youth Foundation and other international programmes that create space for learning, solidarity and volunteering.",
    partner: "Become a partner",
    pills: ["Erasmus+", "Youth exchanges", "International partnerships"],
    exp: "[ OUR EXPERIENCE ]",
    projA: "Projects",
    projB: "that help us grow.",
    propose: "Propose a partnership",
    read: "Read",
    now: "[ NOW IT'S YOU ]",
    ctaA: "Have a good",
    ctaB: "question?",
    ctaP: "Join the community, suggest an idea or invite us into an international partnership.",
    contact: "Get in touch",
    ring: "QUESTION ✦ EXPLORE ✦ THINK ✦",
    contacts: "Contact us",
    links: "Links",
    website: "Website",
    back: "Back to top",
    copyright: "Lithuanian Skeptic Youth",
    alt1: "A group of friends spending time outdoors",
    alt2: "Young people participating in a community initiative",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("lt");
  const [settings, setSettings] = useState<Record<string, string | number>>({});
  useEffect(() => {
    const saved = window.localStorage.getItem("skeptic-language");
    if (saved === "lt" || saved === "en") setLanguage(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  useEffect(() => {
    void supabase
      .from("site_settings")
      .select("*")
      .single()
      .then(({ data }) => setSettings(data || {}));
  }, []);
  const changeLanguage = () => {
    const next = language === "lt" ? "en" : "lt";
    setLanguage(next);
    window.localStorage.setItem("skeptic-language", next);
  };
  const t = copy[language];
  const activeTopics = topics[language];
  return (
    <main>
      <PageTracker path="/" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Skeptic Youth – home">
          <span className="brand-mark">S?</span>
          <span className="brand-name">SKEPTIC YOUTH</span>
        </a>
        <nav className="desktop-nav" aria-label={t.ariaNav}>
          <a href="#veikla">{t.nav[0]}</a>
          <a href="#galimybes">{t.nav[1]}</a>
          <a href="#naujienos">{t.nav[2]}</a>
          <a href="/apie-mus">{t.nav[3]}</a>
        </nav>
        <div className="nav-actions">
          <button
            className="language"
            aria-label={t.change}
            onClick={changeLanguage}
          >
            {language.toUpperCase()} <span>⇄</span>
          </button>
          <a className="join-small" href="#prisijunk">
            {t.join} <span>↗</span>
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span></span> {t.eyebrow}
          </div>
          <h1>
            {settings[`hero_title_${language}`] ? (
              String(settings[`hero_title_${language}`])
                .split(/\n|\. /)
                .filter(Boolean)
                .map((x, i, a) => (
                  <span key={i}>
                    {i === a.length - 1 ? <em>{x}</em> : x}
                    {i < a.length - 1 && <br />}
                  </span>
                ))
            ) : (
              <>
                {t.hero[0]}
                <br />
                {t.hero[1]}
                <br />
                <em>{t.hero[2]}</em>
              </>
            )}
          </h1>
          <p>{String(settings[`hero_text_${language}`] || t.heroP)}</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#naujienos">
              {t.projects} <span>↗</span>
            </a>
            <a className="text-link" href="#veikla">
              {t.meet} <span>↓</span>
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-wrap">
            <img
              src={String(
                settings.hero_image_url ||
                  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=90",
              )}
              alt={t.alt1}
            />
          </div>
          <div className="orbit orbit-one">{t.orbit}</div>
          <div className="sticker sticker-blue">
            2018
            <small>
              {t.since.split("\n")[0]}
              <br />
              {t.since.split("\n")[1]}
            </small>
          </div>
          <div className="scribble" aria-hidden="true">
            ↝
          </div>
        </div>
        <div className="hero-ticker" aria-hidden="true">
          {t.ticker.map((x) => (
            <span key={x}>
              {x} <b>✦</b>
            </span>
          ))}
        </div>
      </section>

      <section className="intro" id="apie">
        <div className="section-label">{t.who}</div>
        <div className="intro-main">
          <h2>
            {t.introA}
            <br />
            <span>{t.introB}</span>
          </h2>
          <p>{t.introP}</p>
        </div>
        <div className="intro-note">
          <span className="spark">✳</span>
          <p>{t.vision}</p>
          <a href="/apie-mus">{t.more} ↗</a>
        </div>
      </section>

      <section className="impact" aria-label="Mūsų poveikis">
        {(["2018", "7", "EU", "∞"] as const).map((v, i) => (
          <div className="impact-item" key={v}>
            <strong>{v}</strong>
            <span>
              {t.impacts[i].split("|")[0]}
              <br />
              {t.impacts[i].split("|")[1]}
            </span>
          </div>
        ))}
      </section>

      <section className="topics" id="veikla">
        <div className="topics-head">
          <div>
            <div className="section-label light">{t.where}</div>
            <h2>
              {t.fieldsA}
              <br />
              <i>{t.fieldsB}</i>
            </h2>
          </div>
          <p>{t.fieldsP}</p>
        </div>
        <div className="topic-grid">
          {activeTopics.map((topic) => (
            <a
              href="#galimybes"
              className={`topic-card ${topic.color}`}
              key={topic.n}
            >
              <span className="topic-num">{topic.n}</span>
              <div className="topic-icon" aria-hidden="true">
                {topic.n === "01"
                  ? "↗"
                  : topic.n === "02"
                    ? "◌"
                    : topic.n === "03"
                      ? "✦"
                      : "⌁"}
              </div>
              <h3>{topic.title}</h3>
              <p>{topic.text}</p>
              <span className="circle-arrow">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="opportunity" id="galimybes">
        <div className="opportunity-photo">
          <img
            src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1400&q=85"
            alt={t.alt2}
          />
          <span className="photo-label">{t.open}</span>
        </div>
        <div className="opportunity-copy">
          <div className="section-label">{t.your}</div>
          <h2>
            {t.opp[0]}
            <br />
            {t.opp[1]}
            <br />
            <em>{t.opp[2]}</em>
          </h2>
          <p>{t.oppP}</p>
          <a className="button button-coral" href="#prisijunk">
            {t.partner} <span>↗</span>
          </a>
          <div className="mini-meta">
            {t.pills.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="news" id="naujienos">
        <div className="news-head">
          <div>
            <div className="section-label">{t.exp}</div>
            <h2>
              {t.projA}
              <br />
              <i>{t.projB}</i>
            </h2>
          </div>
          <a href="/projektai">
            {language === "lt" ? "Visi projektai" : "All projects"}{" "}
            <span>↗</span>
          </a>
        </div>
        <div className="news-grid">
          {news.map((item, index) => (
            <article className={`news-card news-${index + 1}`} key={item.title}>
              <a href={`/projektai/${item.slug}`} className="news-image">
                <img src={item.image} alt="" />
              </a>
              <div className="news-meta">
                <span>{item.tag}</span>
                <time>{item.date}</time>
              </div>
              <h3>
                <a href={`/projektai/${item.slug}`}>{item.title}</a>
              </h3>
              <a
                className="read-more"
                href={`/projektai/${item.slug}`}
                aria-label={`${t.read}: ${item.title}`}
              >
                {t.read} <span>↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="cta" id="prisijunk">
        <span className="cta-star">✦</span>
        <div className="section-label light">{t.now}</div>
        <h2>
          {t.ctaA}
          <br />
          <em>{t.ctaB}</em>
        </h2>
        <p>{t.ctaP}</p>
        <a
          className="button button-light"
          href="mailto:ngoskepticyouth@gmail.com"
        >
          {t.contact} <span>↗</span>
        </a>
        <div className="cta-ring">{t.ring}</div>
      </section>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark">S?</span>
          <span>SKEPTIC YOUTH</span>
        </div>
        <div className="footer-col">
          <strong>{t.contacts}</strong>
          <a href="/kontaktai">
            {language === "lt" ? "Kontaktų forma" : "Contact form"} ↗
          </a>
          <a href="mailto:ngoskepticyouth@gmail.com">
            ngoskepticyouth@gmail.com
          </a>
          <span>Papilio g. 9, Kaunas</span>
          <span>+370 633 33887</span>
        </div>
        <div className="footer-col">
          <strong>{t.links}</strong>
          <a href="/apie-mus">{t.nav[3]} ↗</a>
          <a href="https://www.facebook.com/skeptiskas.jaunimas/">Facebook ↗</a>
          <a href="/privatumas">
            {language === "lt" ? "Privatumas" : "Privacy"}
          </a>
          <a href="/slapukai">{language === "lt" ? "Slapukai" : "Cookies"}</a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {t.copyright}</span>
          <a href="#top">{t.back} ↑</a>
        </div>
      </footer>
    </main>
  );
}
