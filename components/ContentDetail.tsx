"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabase";
import MarkdownContent from "./MarkdownContent";
import PageTracker from "./PageTracker";
type Kind = "articles" | "projects";
type Row = Record<string, string | boolean | null>;
export default function ContentDetail({ kind }: { kind: Kind }) {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const [item, setItem] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<"lt" | "en">("lt");
  useEffect(() => {
    if (localStorage.getItem("skeptic-language") === "en") setLanguage("en");
  }, []);
  useEffect(() => {
    if (!params?.slug) return;
    let query = supabase.from(kind).select("*").eq("slug", params.slug);
    if (searchParams.get("preview") !== "1")
      query = query.eq("status", "published");
    query.single().then(({ data }) => {
      setItem(data);
      setLoading(false);
    });
  }, [kind, params?.slug, searchParams]);
  const lt = language === "lt",
    project = kind === "projects";
  const toggle = () => {
    const next = lt ? "en" : "lt";
    setLanguage(next);
    localStorage.setItem("skeptic-language", next);
    document.documentElement.lang = next;
  };
  if (loading)
    return (
      <main className="content-state">{lt ? "Kraunama…" : "Loading…"}</main>
    );
  if (!item)
    return (
      <main className="content-state">
        <div className="brand-mark">S?</div>
        <h1>{lt ? "Įrašas nerastas" : "Content not found"}</h1>
        <a href="/">← {lt ? "Grįžti į pradžią" : "Back home"}</a>
      </main>
    );
  const title = String(item[`title_${language}`] || item.title_lt || "");
  const intro = String(
    item[`${project ? "summary" : "excerpt"}_${language}`] || "",
  );
  const body = String(
    item[`${project ? "description" : "content"}_${language}`] || "",
  );
  const gallery = String(item.gallery_urls || "")
    .split(/\n+/)
    .map((x) => x.trim())
    .filter(Boolean);
  const documents = String(item.document_links || "")
    .split(/\n+/)
    .map((x) => {
      if (!x.includes("|")) {
        const url = x.trim();
        return {
          title: decodeURIComponent(
            url.split("/").pop() || "Dokumentas",
          ).replace(/^[a-f0-9-]+-/i, ""),
          url,
        };
      }
      const [title, ...url] = x.split("|");
      return { title: title?.trim(), url: url.join("|").trim() };
    })
    .filter((x) => x.title && x.url);
  return (
    <main className="content-page">
      <PageTracker
        path={`/${project ? "projektai" : "straipsniai"}/${String(item.slug || params.slug)}`}
      />
      <header className="content-nav">
        <a className="brand" href="/">
          <span className="brand-mark">S?</span>
          <span className="brand-name">SKEPTIC YOUTH</span>
        </a>
        <div>
          <a href={project ? "/projektai" : "/straipsniai"}>
            ←{" "}
            {project
              ? lt
                ? "Visi projektai"
                : "All projects"
              : lt
                ? "Visi straipsniai"
                : "All articles"}
          </a>
          <button onClick={toggle}>{language.toUpperCase()} ⇄</button>
        </div>
      </header>
      <article>
        <section className="content-hero">
          <div className="content-kicker">
            <span>
              {project
                ? lt
                  ? "PROJEKTAS"
                  : "PROJECT"
                : lt
                  ? "STRAIPSNIS"
                  : "ARTICLE"}
            </span>
            {project && item.programme ? <b>{String(item.programme)}</b> : null}
          </div>
          <h1>{title}</h1>
          <p>{intro}</p>
          {project && (
            <div className="project-facts">
              {item.project_year && (
                <div>
                  <small>{lt ? "METAI" : "YEAR"}</small>
                  <strong>{String(item.project_year)}</strong>
                </div>
              )}
              {item.project_code && (
                <div>
                  <small>{lt ? "PROJEKTO KODAS" : "PROJECT CODE"}</small>
                  <strong>{String(item.project_code)}</strong>
                </div>
              )}
              {item.partner_name && (
                <div>
                  <small>
                    {lt ? "PARTNERIS / PAREIŠKĖJAS" : "PARTNER / APPLICANT"}
                  </small>
                  <strong>{String(item.partner_name)}</strong>
                </div>
              )}
            </div>
          )}
        </section>
        {item.image_url && (
          <div className="content-cover">
            <img src={String(item.image_url)} alt="" />
          </div>
        )}
        <section className="content-body">
          <div className="content-side">
            <span>✳</span>
            <p>
              {lt
                ? "Smalsumas. Dialogas. Veiksmas."
                : "Curiosity. Dialogue. Action."}
            </p>
          </div>
          <div className="content-copy">
            <MarkdownContent text={body} />
          </div>
        </section>
        {project && (
          <section className="project-detail-grid">
            <div className="project-detail-block goal-block">
              <span className="detail-number">01</span>
              <small>{lt ? "PROJEKTO TIKSLAS" : "PROJECT GOAL"}</small>
              <h2>{lt ? "Kodėl tai darome?" : "Why are we doing it?"}</h2>
              <p>{String(item[`goal_${language}`] || body)}</p>
            </div>
            <div className="project-detail-block audience-block">
              <span className="detail-number">02</span>
              <small>{lt ? "KAM SKIRTA" : "WHO IT IS FOR"}</small>
              <h2>{lt ? "Žmonės — centre." : "People at the centre."}</h2>
              <p>{String(item[`audience_${language}`] || intro)}</p>
            </div>
          </section>
        )}
        {project && (
          <section className="project-lists">
            <div>
              <div className="section-label">
                [ {lt ? "KĄ VEIKIAME" : "WHAT WE DO"} ]
              </div>
              <h2>{lt ? "Pagrindinės veiklos" : "Key activities"}</h2>
              <ol>
                {String(item[`activities_${language}`] || "")
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((x, i) => (
                    <li key={i}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {x}
                    </li>
                  ))}
              </ol>
            </div>
            <div>
              <div className="section-label">
                [ {lt ? "POVEIKIS" : "IMPACT"} ]
              </div>
              <h2>{lt ? "Ką norime pakeisti" : "What we aim to change"}</h2>
              <ol>
                {String(item[`outcomes_${language}`] || "")
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((x, i) => (
                    <li key={i}>
                      <span>✦</span>
                      {x}
                    </li>
                  ))}
              </ol>
            </div>
          </section>
        )}
        {project && gallery.length > 0 && (
          <section className="project-gallery">
            <div className="section-label">
              [ {lt ? "PROJEKTO AKIMIRKOS" : "PROJECT MOMENTS"} ]
            </div>
            <h2>{lt ? "Galerija" : "Gallery"}</h2>
            <div>
              {gallery.map((url, i) => (
                <figure key={url}>
                  <img src={url} alt={`${title} — ${i + 1}`} loading="lazy" />
                </figure>
              ))}
            </div>
          </section>
        )}
        {project && documents.length > 0 && (
          <section className="project-documents">
            <div>
              <div className="section-label light">
                [ {lt ? "REZULTATAI IR MEDŽIAGA" : "OUTPUTS & MATERIALS"} ]
              </div>
              <h2>{lt ? "Projekto dokumentai" : "Project documents"}</h2>
            </div>
            <div>
              {documents.map((doc, i) => (
                <a
                  key={doc.url}
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{doc.title}</strong>
                  <b>ATSISIŲSTI ↗</b>
                </a>
              ))}
            </div>
          </section>
        )}
        <section className="content-end">
          <p>
            {lt
              ? "Turite klausimų arba norite bendradarbiauti?"
              : "Have questions or want to collaborate?"}
          </p>
          <a href="mailto:ngoskepticyouth@gmail.com">
            {lt ? "Susisiekime" : "Get in touch"} ↗
          </a>
        </section>
      </article>
      <footer className="content-footer">
        <span>
          © 2026{" "}
          {lt ? "Lietuvos skeptiškas jaunimas" : "Lithuanian Skeptic Youth"}
        </span>
        <a href="/">{lt ? "Pradžia" : "Home"} ↑</a>
      </footer>
    </main>
  );
}
