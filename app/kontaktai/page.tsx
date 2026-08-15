"use client";
import { FormEvent, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
export default function ContactPage() {
  const [lang, setLang] = useState<"lt" | "en">("lt"),
    [sent, setSent] = useState(false),
    [sending, setSending] = useState(false),
    [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    topic: "general",
    message: "",
  });
  useEffect(() => {
    if (localStorage.getItem("skeptic-language") === "en") setLang("en");
  }, []);
  const lt = lang === "lt";
  async function submit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    const { error } = await supabase
      .from("inquiries")
      .insert({ ...form, language: lang, status: "new" });
    setSending(false);
    if (error)
      return setError(
        lt
          ? "Nepavyko išsiųsti. Bandykite dar kartą."
          : "Could not send. Please try again.",
      );
    setSent(true);
  }
  const toggle = () => {
    const n = lt ? "en" : "lt";
    setLang(n);
    localStorage.setItem("skeptic-language", n);
  };
  return (
    <main className="contact-page">
      <SiteHeader language={lang} onLanguageChange={setLang} />
      <section className="contact-layout">
        <div className="contact-intro">
          <div className="section-label">
            [ {lt ? "SUSISIEKIME" : "LET'S TALK"} ]
          </div>
          <h1>
            {lt ? (
              <>
                Turite gerą
                <br />
                <em>klausimą?</em>
              </>
            ) : (
              <>
                Have a good
                <br />
                <em>question?</em>
              </>
            )}
          </h1>
          <p>
            {lt
              ? "Parašykite apie partnerystę, projektą, savanorystę ar idėją. Atsakysime tiesiai ir be biurokratinio triukšmo."
              : "Write to us about a partnership, project, volunteering or an idea. We’ll reply directly, without bureaucratic noise."}
          </p>
          <div className="contact-direct">
            <a href="mailto:ngoskepticyouth@gmail.com">
              ngoskepticyouth@gmail.com ↗
            </a>
            <span>Papilio g. 9, Kaunas</span>
            <span>+370 633 33887</span>
          </div>
        </div>
        <div className="contact-form-wrap">
          {sent ? (
            <div className="contact-success">
              <span>✓</span>
              <h2>{lt ? "Žinutė gauta." : "Message received."}</h2>
              <p>
                {lt
                  ? "Ačiū — susisieksime jūsų nurodytu el. paštu."
                  : "Thank you — we’ll reply to the email you provided."}
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setForm({
                    name: "",
                    email: "",
                    organization: "",
                    topic: "general",
                    message: "",
                  });
                }}
              >
                {lt ? "Siųsti kitą" : "Send another"}
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="contact-form-head">
                <span>01</span>
                <h2>{lt ? "Papasakokite trumpai" : "Tell us briefly"}</h2>
              </div>
              <div className="contact-row">
                <label>
                  {lt ? "Jūsų vardas" : "Your name"}
                  <input
                    required
                    minLength={2}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={lt ? "Vardas, pavardė" : "Full name"}
                  />
                </label>
                <label>
                  {lt ? "El. paštas" : "Email"}
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="name@email.com"
                  />
                </label>
              </div>
              <label>
                {lt ? "Organizacija (nebūtina)" : "Organisation (optional)"}
                <input
                  value={form.organization}
                  onChange={(e) =>
                    setForm({ ...form, organization: e.target.value })
                  }
                />
              </label>
              <label>
                {lt ? "Kuo galime padėti?" : "How can we help?"}
                <select
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                >
                  <option value="general">
                    {lt ? "Bendras klausimas" : "General question"}
                  </option>
                  <option value="project">
                    {lt ? "Projektas" : "Project"}
                  </option>
                  <option value="partnership">
                    {lt ? "Partnerystė" : "Partnership"}
                  </option>
                  <option value="volunteering">
                    {lt ? "Savanorystė" : "Volunteering"}
                  </option>
                  <option value="media">{lt ? "Žiniasklaida" : "Media"}</option>
                </select>
              </label>
              <label>
                {lt ? "Jūsų žinutė" : "Your message"}
                <textarea
                  required
                  minLength={10}
                  maxLength={5000}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder={
                    lt
                      ? "Kuo daugiau konteksto, tuo tiksliau galėsime atsakyti…"
                      : "The more context, the better our answer…"
                  }
                />
              </label>
              {error && <p className="contact-error">{error}</p>}
              <button className="contact-submit" disabled={sending}>
                {sending
                  ? lt
                    ? "Siunčiama…"
                    : "Sending…"
                  : lt
                    ? "Siųsti užklausą ↗"
                    : "Send inquiry ↗"}
              </button>
              <small>
                {lt
                  ? "Pateikdami formą sutinkate, kad jūsų duomenys būtų naudojami atsakymui į užklausą."
                  : "By submitting, you agree that your data may be used to respond to your inquiry."}
              </small>
            </form>
          )}
        </div>
      </section>
      <SiteFooter language={lang} />
    </main>
  );
}
