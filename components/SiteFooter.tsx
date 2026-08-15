"use client";
import { useEffect, useState } from "react";

export default function SiteFooter({ language }: { language?: "lt" | "en" }) {
  const [saved, setSaved] = useState<"lt" | "en">("lt");
  useEffect(() => { if (!language && localStorage.getItem("skeptic-language") === "en") setSaved("en"); }, [language]);
  const lt = (language || saved) === "lt";
  return <footer className="site-footer">
    <div className="site-footer-top">
      <div className="footer-brand"><span className="brand-mark">S?</span><span>SKEPTIC YOUTH</span></div>
      <h2>{lt ? "Smalsumas keičia pasaulį." : "Curiosity changes the world."}</h2>
      <a href="/kontaktai">{lt ? "Susisiekti" : "Get in touch"} ↗</a>
    </div>
    <div className="site-footer-links">
      <div><strong>{lt ? "Naršyti" : "Explore"}</strong><a href="/apie-mus">{lt ? "Apie mus" : "About us"}</a><a href="/projektai">{lt ? "Projektai" : "Projects"}</a><a href="/straipsniai">{lt ? "Straipsniai" : "Articles"}</a></div>
      <div><strong>{lt ? "Kontaktai" : "Contact"}</strong><a href="mailto:ngoskepticyouth@gmail.com">ngoskepticyouth@gmail.com</a><a href="tel:+37063333887">+370 633 33887</a><span>Papilio g. 9, Kaunas</span></div>
      <div><strong>{lt ? "Informacija" : "Information"}</strong><a href="/privatumas">{lt ? "Privatumas" : "Privacy"}</a><a href="/slapukai">{lt ? "Slapukai" : "Cookies"}</a><a href="https://www.facebook.com/skeptiskas.jaunimas/">Facebook ↗</a></div>
    </div>
    <div className="site-footer-bottom"><span>© 2026 {lt ? "Lietuvos skeptiškas jaunimas" : "Lithuanian Skeptic Youth"}</span><a href="#top">{lt ? "Į viršų" : "Back to top"} ↑</a></div>
  </footer>;
}
