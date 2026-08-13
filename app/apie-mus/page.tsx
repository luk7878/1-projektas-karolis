"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import PageTracker from "../../components/PageTracker";

const team = [
  {
    initials: "TM",
    name: "Tomas Michejevas",
    role: {
      lt: "Prezidentas, treneris ir fasilitatorius",
      en: "President, trainer and facilitator",
    },
    text: {
      lt: "Daugiau nei dešimtmetį dirba su savanoryste, komandomis ir jaunimo iniciatyvomis. Erasmus+ neformaliojo ugdymo veiklose dalyvauja nuo 2017 m., koordinuoja tarptautinius projektus ir jungia analitinį mąstymą su praktine lyderyste.",
      en: "Works with volunteering, teams and youth initiatives for over a decade. Active in Erasmus+ non-formal education since 2017, he coordinates international projects and combines analytical thinking with practical leadership.",
    },
  },
  {
    initials: "LK",
    name: "Laurynas Kavaliauskas",
    role: { lt: "Projektų vadovas", en: "Project manager" },
    text: {
      lt: "Projektų vykdytojas, turintis vadybos, darbo su jaunimu ir bendruomeninių renginių patirties. Organizuoja jaunimo mainus, kritinio mąstymo veiklas ir reguliarius „Skeptics in the Pub“ susitikimus.",
      en: "Project practitioner with experience in management, youth work and community events. He organises youth exchanges, critical-thinking activities and regular Skeptics in the Pub gatherings.",
    },
  },
];

const portfolio = [
  ["2018", "Critical Thinking and Defeasibility", "Erasmus+ KA152"],
  ["2021", "Sardegnagol", "Erasmus+ KA210"],
  ["2024–25", "YOUth Roots", "Erasmus+ KA210"],
  ["2025", "Focus on Photos", "Erasmus+ KA153"],
  ["2025", "SMART on Social Media", "Erasmus+ KA152"],
  ["2025", "Swamp Savers", "Erasmus+ KA152"],
  ["2026", "Youth Detectives Fighting Fake News", "Erasmus+ KA154"],
];

export default function AboutPage() {
  const [lang, setLang] = useState<"lt" | "en">("lt");
  const [liveTeam, setLiveTeam] = useState<Record<string, string>[]>([]),
    [livePartners, setLivePartners] = useState<Record<string, string>[]>([]),
    [settings, setSettings] = useState<Record<string, string | number>>({});
  useEffect(() => {
    if (localStorage.getItem("skeptic-language") === "en") setLang("en");
    void Promise.all([
      supabase
        .from("team_members")
        .select("*")
        .eq("is_visible", true)
        .order("sort_order"),
      supabase
        .from("partners")
        .select("*")
        .eq("is_visible", true)
        .order("sort_order"),
      supabase.from("site_settings").select("*").single(),
    ]).then(([t, p, s]) => {
      setLiveTeam((t.data || []) as Record<string, string>[]);
      setLivePartners((p.data || []) as Record<string, string>[]);
      setSettings(s.data || {});
    });
  }, []);
  const lt = lang === "lt";
  const toggle = () => {
    const next = lt ? "en" : "lt";
    setLang(next);
    localStorage.setItem("skeptic-language", next);
  };
  return (
    <main className="about-page">
      <PageTracker path="/apie-mus" />
      <header className="content-nav">
        <a className="brand" href="/">
          <span className="brand-mark">S?</span>
          <span className="brand-name">SKEPTIC YOUTH</span>
        </a>
        <div>
          <a href="/">← {lt ? "Pradžia" : "Home"}</a>
          <button onClick={toggle}>{lang.toUpperCase()} ⇄</button>
        </div>
      </header>
      <section className="about-hero">
        <div className="section-label light">
          [ {lt ? "APIE MUS" : "ABOUT US"} ]
        </div>
        <h1>
          {lt ? (
            <>
              Atviri protai.
              <br />
              <em>Drąsūs klausimai.</em>
            </>
          ) : (
            <>
              Open minds.
              <br />
              <em>Brave questions.</em>
            </>
          )}
        </h1>
        <p>
          {lt
            ? "Asociacija „Lietuvos skeptiškas jaunimas“ nuo 2018 metų Kaune kuria erdvę racionaliam mąstymui, dialogui ir sąmoningam veikimui."
            : "Since 2018, the Lithuanian Skeptic Youth Association has been creating space in Kaunas for rational thinking, dialogue and conscious action."}
        </p>
      </section>
      <section className="about-manifesto">
        <span>01</span>
        <div>
          <h2>{lt ? "Kodėl egzistuojame" : "Why we exist"}</h2>
          <p>
            {lt
              ? "Vienijame jaunus žmones, vertinančius racionalų mąstymą, atvirumą ir sąmoningą gyvenimą. Skatiname smalsumą, kritinį mąstymą ir realistišką požiūrį pasitelkdami neformaliojo ugdymo metodus."
              : "We unite young people who value rational thinking, openness and conscious living. We promote curiosity, critical thinking and a realistic outlook through non-formal education."}
          </p>
          <p>
            {lt
              ? "Siekiame laisvos, demokratiškos ir tolerantiškos visuomenės, gerbiančios dialogą, žmogaus teises, atsakomybę ir žodžio laisvę. Žinias, kūrybiškumą ir refleksiją naudojame kaip įrankius geriau suprasti pasaulį."
              : "We strive for a free, democratic and tolerant society that respects dialogue, human rights, responsibility and freedom of speech. We use knowledge, creativity and reflection to understand the world more deeply."}
          </p>
        </div>
      </section>
      <section className="impact-page">
        <div className="section-label">
          [ {lt ? "POVEIKIS SKAIČIAIS" : "IMPACT IN NUMBERS"} ]
        </div>
        <div className="impact-big">
          <div>
            <strong>2018</strong>
            <span>{lt ? "įkurta Kaune" : "founded in Kaunas"}</span>
          </div>
          <div>
            <strong>{Number(settings.impact_projects || 7)}+</strong>
            <span>
              {lt ? "tarptautiniai projektai" : "international projects"}
            </span>
          </div>
          <div>
            <strong>{Number(settings.impact_countries || 0) || "EU"}</strong>
            <span>{lt ? "veiklos šalys" : "countries reached"}</span>
          </div>
          <div>
            <strong>{Number(settings.impact_participants || 0) || "∞"}</strong>
            <span>{lt ? "įtraukti dalyviai" : "participants engaged"}</span>
          </div>
        </div>
        <p className="impact-note">
          {lt
            ? "Rodome tik dokumentais pagrįstus organizacijos rodiklius. Augant veikloms, šią skiltį papildysime dalyvių, šalių ir mokymų rezultatais."
            : "We publish only figures supported by organisational records. As our work grows, this section will include participant, country and training outcomes."}
        </p>
      </section>
      <section className="team-section">
        <div className="team-head">
          <div className="section-label light">
            [ {lt ? "KOMANDA" : "TEAM"} ]
          </div>
          <h2>
            {lt ? (
              <>
                Žmonės, kurie
                <br />
                <em>paverčia idėjas veikla.</em>
              </>
            ) : (
              <>
                People who turn
                <br />
                <em>ideas into action.</em>
              </>
            )}
          </h2>
        </div>
        <div className="team-grid">
          {(liveTeam.length
            ? liveTeam
            : team.map((x) => ({
                name: x.name,
                role_lt: x.role.lt,
                role_en: x.role.en,
                bio_lt: x.text.lt,
                bio_en: x.text.en,
                image_url: "",
              }))
          ).map((person) => (
            <article key={person.name}>
              {person.image_url ? (
                <img
                  className="team-avatar team-photo"
                  src={person.image_url}
                  alt={person.name}
                />
              ) : (
                <div className="team-avatar">
                  {person.name
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </div>
              )}
              <small>{person[`role_${lang}`]}</small>
              <h3>{person.name}</h3>
              <p>{person[`bio_${lang}`]}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="portfolio-section">
        <div>
          <div className="section-label">
            [ {lt ? "PATIRTIS" : "EXPERIENCE"} ]
          </div>
          <h2>{lt ? "Projektų kelias" : "Project timeline"}</h2>
        </div>
        <div className="portfolio-list">
          {portfolio.map(([year, name, type]) => (
            <div key={name}>
              <time>{year}</time>
              <strong>{name}</strong>
              <span>{type}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="partners-section">
        <div className="section-label light">
          [ {lt ? "PROGRAMOS IR PARTNERIAI" : "PROGRAMMES & PARTNERS"} ]
        </div>
        <h2>{lt ? "Veikiame ne vieni." : "We do not work alone."}</h2>
        <div className="partner-cloud">
          {(livePartners.length
            ? livePartners.map((x) => x.name)
            : [
                "Erasmus+",
                "European Youth Foundation",
                "Lithuanian–Polish Youth Exchange Fund",
                "PLANBE PLAN IT BE IT",
                "Asociația ASTRID",
                "Associazione ABìCì",
                "KulturNetz e. V.",
              ]
          ).map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
        <p>
          {lt
            ? "Esate jaunimo organizacija, savivaldybė ar edukatorius? Kviečiame kurti projektus kartu."
            : "Are you a youth organisation, municipality or educator? Let’s build projects together."}
        </p>
        <a className="button button-light" href="/kontaktai">
          {lt ? "Siūlyti partnerystę" : "Propose a partnership"} ↗
        </a>
      </section>
    </main>
  );
}
