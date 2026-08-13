"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
export default function ContentListing({
  kind,
}: {
  kind: "articles" | "projects";
}) {
  const [language, setLanguage] = useState<"lt" | "en">("lt"),
    [rows, setRows] = useState<Record<string, string>[]>([]),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("skeptic-language") === "en") setLanguage("en");
    supabase
      .from(kind)
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setRows((data || []) as Record<string, string>[]);
        setLoading(false);
      });
  }, [kind]);
  const lt = language === "lt",
    project = kind === "projects",
    base = project ? "/projektai/" : "/straipsniai/",
    toggle = () => {
      const n = lt ? "en" : "lt";
      setLanguage(n);
      localStorage.setItem("skeptic-language", n);
    };
  return (
    <main className="listing-page">
      <header className="content-nav">
        <a className="brand" href="/">
          <span className="brand-mark">S?</span>
          <span className="brand-name">SKEPTIC YOUTH</span>
        </a>
        <div>
          <a href="/">← {lt ? "Pradžia" : "Home"}</a>
          <button onClick={toggle}>{language.toUpperCase()} ⇄</button>
        </div>
      </header>
      <section className="listing-intro">
        <div className="section-label">
          [{" "}
          {project
            ? lt
              ? "MŪSŲ PROJEKTAI"
              : "OUR PROJECTS"
            : lt
              ? "NAUJAUSIOS MINTYS"
              : "LATEST STORIES"}{" "}
          ]
        </div>
        <h1>
          {project
            ? lt
              ? "Projektai, kurie augina."
              : "Projects that help us grow."
            : lt
              ? "Straipsniai ir idėjos."
              : "Articles and ideas."}
        </h1>
        <p>
          {project
            ? lt
              ? "Tarptautinės partnerystės, jaunimo mainai ir iniciatyvos, kurios žinias paverčia veiksmu."
              : "International partnerships, youth exchanges and initiatives that turn knowledge into action."
            : lt
              ? "Kritinis žvilgsnis į pasaulį, mokslą, visuomenę ir sąmoningą gyvenimą."
              : "A critical view of the world, science, society and conscious living."}
        </p>
      </section>
      <section className="listing-grid">
        {loading ? (
          <p>{lt ? "Kraunama…" : "Loading…"}</p>
        ) : rows.length === 0 ? (
          <p>
            {lt ? "Kol kas paskelbtų įrašų nėra." : "No published entries yet."}
          </p>
        ) : (
          rows.map((r, i) => (
            <a className="listing-card" href={base + r.slug} key={r.id}>
              <div className="listing-image">
                {r.image_url ? (
                  <img src={r.image_url} alt="" />
                ) : (
                  <span>{String(i + 1).padStart(2, "0")}</span>
                )}
              </div>
              <div className="listing-meta">
                <span>
                  {project
                    ? r.programme || "PROJECT"
                    : lt
                      ? "STRAIPSNIS"
                      : "ARTICLE"}
                </span>
                <time>
                  {project
                    ? r.project_year
                    : new Date(r.published_at).getFullYear()}
                </time>
              </div>
              <h2>{r[`title_${language}`] || r.title_lt}</h2>
              <p>{r[`${project ? "summary" : "excerpt"}_${language}`] || ""}</p>
              <b>{lt ? "Skaityti" : "Read"} ↗</b>
            </a>
          ))
        )}
      </section>
    </main>
  );
}
