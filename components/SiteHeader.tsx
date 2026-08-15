"use client";

import { useEffect, useState } from "react";

type Language = "lt" | "en";

export default function SiteHeader({
  language,
  onLanguageChange,
  overlay = false,
}: {
  language?: Language;
  onLanguageChange?: (value: Language) => void;
  overlay?: boolean;
}) {
  const [localLanguage, setLocalLanguage] = useState<Language>(language || "lt");
  const [open, setOpen] = useState(false);
  const current = language || localLanguage;
  const lt = current === "lt";
  useEffect(() => {
    if (!language && localStorage.getItem("skeptic-language") === "en") setLocalLanguage("en");
  }, [language]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const changeLanguage = () => {
    const next: Language = current === "lt" ? "en" : "lt";
    localStorage.setItem("skeptic-language", next);
    document.documentElement.lang = next;
    onLanguageChange ? onLanguageChange(next) : setLocalLanguage(next);
  };
  const links = [
    ["/", lt ? "Pradžia" : "Home"],
    ["/apie-mus", lt ? "Apie mus" : "About us"],
    ["/projektai", lt ? "Projektai" : "Projects"],
    ["/straipsniai", lt ? "Straipsniai" : "Articles"],
    ["/kontaktai", lt ? "Kontaktai" : "Contact"],
  ];
  return (
    <header className={`site-header${overlay ? " site-header-overlay" : ""}`}>
      <a className="brand" href="/" aria-label={lt ? "Pradžia" : "Home"}><span className="brand-mark">S?</span><span className="brand-name">SKEPTIC YOUTH</span></a>
      <nav className="site-desktop-nav" aria-label={lt ? "Pagrindinė navigacija" : "Main navigation"}>
        {links.slice(1).map(([href, label]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <div className="site-actions">
        <button className="site-language" onClick={changeLanguage}>{current.toUpperCase()} ⇄</button>
        <a className="site-contact" href="/kontaktai">{lt ? "Susisiekti" : "Get in touch"} ↗</a>
        <button className={`menu-toggle${open ? " is-open" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}><span /><span /></button>
      </div>
      <div className={`mobile-menu${open ? " is-open" : ""}`}>
        <nav>{links.map(([href, label], index) => <a href={href} onClick={() => setOpen(false)} key={href}><small>0{index + 1}</small>{label}</a>)}</nav>
        <div><button onClick={changeLanguage}>{current.toUpperCase()} ⇄</button><a href="mailto:ngoskepticyouth@gmail.com">ngoskepticyouth@gmail.com</a></div>
      </div>
    </header>
  );
}
