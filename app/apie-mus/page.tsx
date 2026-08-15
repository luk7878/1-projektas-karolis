"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import PageTracker from "../../components/PageTracker";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

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
  const [livePartners, setLivePartners] = useState<Record<string, string>[]>([]),
    [settings, setSettings] = useState<Record<string, string | number>>({});
  useEffect(() => {
    if (localStorage.getItem("skeptic-language") === "en") setLang("en");
    void Promise.all([
      supabase
        .from("partners")
        .select("*")
        .eq("is_visible", true)
        .order("sort_order"),
      supabase.from("site_settings").select("*").single(),
    ]).then(([p, s]) => {
      setLivePartners((p.data || []) as Record<string, string>[]);
      setSettings(s.data || {});
    });
  }, []);
  const lt = lang === "lt";
  return (
    <main className="about-page">
      <PageTracker path="/apie-mus" />
      <SiteHeader language={lang} onLanguageChange={setLang} />
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
      <SiteFooter language={lang} />
    </main>
  );
}
