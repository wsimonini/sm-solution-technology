"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Menu,
  X,
  Building2,
  Network,
  Cpu,
  ShieldCheck,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Instagram,
  Linkedin,
  Quote,
  CheckCircle2,
  Send,
  ChevronRight,
} from "lucide-react";

const LOGO_SRC = "/logo.png";
const LOGOTRANSPARENT_SRC = "/logo-transparent.png";


/* ---------------------------------------------------------
   Reveal-on-scroll hook — powers the fade/rise-in animations
--------------------------------------------------------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------
   Decorative circuit-trace divider — the signature motif,
   echoing the traces in the SM mark itself
--------------------------------------------------------- */
function CircuitDivider({ flip = false }) {
  return (
    <div
      className={`sm-circuit-divider ${flip ? "sm-circuit-flip" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path
          className="sm-circuit-path"
          d="M0,30 L120,30 L150,10 L210,10 L240,30 L420,30 L450,50 L560,50 L590,30 L760,30 L790,10 L900,10 L930,30 L1200,30"
          fill="none"
        />
        <circle className="sm-circuit-node" cx="150" cy="10" r="3.5" />
        <circle className="sm-circuit-node" cx="450" cy="50" r="3.5" />
        <circle className="sm-circuit-node" cx="790" cy="10" r="3.5" />
        <circle className="sm-circuit-node" cx="930" cy="30" r="3.5" />
      </svg>
    </div>
  );
}

/* --------------------------------------------------------- */

const NAV_LINKS = [
  { id: "home", label: "Início" },
  { id: "sobre", label: "Sobre nós" },
  { id: "servicos", label: "Serviços" },
  { id: "portfolio", label: "Cases" },
  { id: "contato", label: "Contato" },
];

const SERVICES = [
  {
    icon: Cpu,
    title: "TI para empresas",
    desc: "Infraestrutura, suporte e segurança de rede pensados para operações que não podem parar — do servidor ao posto de trabalho.",
    points: ["Suporte técnico contínuo", "Redes e servidores", "Segurança da informação"],
  },
  {
    icon: Building2,
    title: "Plataformas para condomínios",
    desc: "Sistemas de portaria, reservas de áreas comuns e comunicação com moradores em um único painel, simples para síndico e morador.",
    points: ["Portaria digital", "Reserva de espaços", "Comunicação com moradores"],
  },
  {
    icon: Network,
    title: "Automação de processos",
    desc: "Eliminamos tarefas repetitivas com integrações e fluxos automatizados, liberando o seu time para o que realmente importa.",
    points: ["Integração de sistemas", "Fluxos automatizados", "Relatórios em tempo real"],
  },
];

const CASES = [
  {
    tag: "Condomínio residencial",
    title: "Portaria 100% digital em 42 unidades",
    result: "Redução de 70% nas ligações do porteiro para moradores.",
  },
  {
    tag: "Rede de escritórios",
    title: "Migração de infraestrutura sem downtime",
    result: "Zero minutos de parada durante a virada de sistema.",
  },
  {
    tag: "Administradora de condomínios",
    title: "Automação de boletos e comunicados",
    result: "18 horas por semana devolvidas à equipe administrativa.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "A SM Solution organizou nossa portaria e nosso financeiro em uma única plataforma. Os moradores notaram a diferença já no primeiro mês.",
    name: "Síndica profissional",
    role: "Condomínio em São Paulo, SP",
  },
  {
    quote:
      "Precisávamos de um parceiro de TI que entendesse o ritmo da empresa. A equipe resolve antes de virar problema.",
    name: "Gerente administrativo",
    role: "Empresa de logística",
  },
];

export default function Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const handleNavClick = useCallback((id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setFormSent(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <div className="sm-root">
      <style>{`
        :root {
          --sm-bg: #0a0c10;
          --sm-bg-alt: #0d1117;
          --sm-surface: #12161d;
          --sm-surface-hi: #171c25;
          --sm-border: #232a35;
          --sm-text: #e9edf3;
          --sm-text-dim: #9aa5b4;
          --sm-blue: #2f6fff;
          --sm-blue-soft: #6d9bff;
          --sm-green: #39ff9e;
          --sm-green-dim: #1f8f5b;
          --sm-font-display: 'Poppins', 'Inter', sans-serif;
          --sm-font-body: 'Inter', 'Poppins', sans-serif;
        }
        .sm-root {
          background: var(--sm-bg);
          color: var(--sm-text);
          font-family: var(--sm-font-body);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        .sm-root * { box-sizing: border-box; }
        .sm-font-display { font-family: var(--sm-font-display); }
        .sm-text-dim { color: var(--sm-text-dim); }
        .sm-blue { color: var(--sm-blue); }
        .sm-green { color: var(--sm-green); }
        .sm-bg-surface { background: var(--sm-surface); }
        .sm-border { border-color: var(--sm-border); }

        .sm-gradient-text {
          background: linear-gradient(90deg, var(--sm-blue-soft) 0%, var(--sm-green) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .sm-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(10px);
          background: rgba(10,12,16,0.82);
          border-bottom: 1px solid var(--sm-border);
        }
        .sm-nav-link {
          color: var(--sm-text-dim);
          font-size: 0.92rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: color 0.25s ease;
          position: relative;
          padding-bottom: 4px;
        }
        .sm-nav-link:hover { color: var(--sm-text); }
        .sm-nav-link.active { color: var(--sm-text); }
        .sm-nav-link.active::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: -6px;
          height: 2px;
          background: linear-gradient(90deg, var(--sm-blue), var(--sm-green));
          border-radius: 2px;
        }

        .sm-btn-primary {
          background: linear-gradient(90deg, var(--sm-blue) 0%, #1f4fd6 100%);
          color: #fff;
          font-weight: 600;
          border-radius: 9999px;
          padding: 0.85rem 1.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 0 0 rgba(47,111,255,0);
        }
        .sm-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px -8px rgba(47,111,255,0.55);
        }
        .sm-btn-ghost {
          border: 1px solid var(--sm-border);
          color: var(--sm-text);
          border-radius: 9999px;
          padding: 0.85rem 1.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease;
        }
        .sm-btn-ghost:hover {
          border-color: var(--sm-green);
          color: var(--sm-green);
          background: rgba(57,255,158,0.06);
        }

        .sm-hero {
          position: relative;
          padding-top: clamp(3.5rem, 8vw, 6rem);
          padding-bottom: clamp(3rem, 8vw, 6rem);
          overflow: hidden;
        }
        .sm-hero-glow {
          position: absolute;
          inset: -20% -10% auto -10%;
          height: 700px;
          background:
            radial-gradient(circle at 20% 20%, rgba(47,111,255,0.22), transparent 55%),
            radial-gradient(circle at 80% 10%, rgba(57,255,158,0.16), transparent 50%);
          pointer-events: none;
          filter: blur(10px);
        }
        .sm-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 42px 42px;
          -webkit-mask-image: radial-gradient(ellipse 60% 60% at 50% 20%, black, transparent);
          mask-image: radial-gradient(ellipse 60% 60% at 50% 20%, black, transparent);
          pointer-events: none;
        }

        .sm-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid var(--sm-border);
          background: rgba(255,255,255,0.02);
          color: var(--sm-text-dim);
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.4rem 0.9rem;
          border-radius: 9999px;
        }
        .sm-dot { width: 6px; height: 6px; border-radius: 999px; background: var(--sm-green); box-shadow: 0 0 8px var(--sm-green); animation: sm-pulse 2s ease-in-out infinite; }
        @keyframes sm-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }

        .sm-card {
          background: var(--sm-surface);
          border: 1px solid var(--sm-border);
          border-radius: 20px;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .sm-card:hover {
          border-color: rgba(57,255,158,0.35);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px -20px rgba(0,0,0,0.6);
        }
        .sm-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(47,111,255,0.18), rgba(57,255,158,0.12));
          border: 1px solid var(--sm-border);
        }

        .sm-circuit-divider { width: 100%; line-height: 0; margin: 0 auto; max-width: 1200px; padding: 0 1rem; }
        .sm-circuit-divider svg { width: 100%; height: 40px; display: block; }
        .sm-circuit-flip svg { transform: scaleX(-1); }
        .sm-circuit-path {
          stroke: var(--sm-border);
          stroke-width: 1.5;
        }
        .sm-circuit-node { fill: var(--sm-green); opacity: 0.8; }

        .sm-section-label {
          font-size: 0.8rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--sm-blue-soft);
          font-weight: 600;
        }

        .sm-input {
          width: 100%;
          background: var(--sm-bg-alt);
          border: 1px solid var(--sm-border);
          border-radius: 12px;
          padding: 0.85rem 1rem;
          color: var(--sm-text);
          font-family: var(--sm-font-body);
          font-size: 0.95rem;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .sm-input::placeholder { color: #5b6472; }
        .sm-input:focus {
          outline: none;
          border-color: var(--sm-blue);
          box-shadow: 0 0 0 3px rgba(47,111,255,0.18);
        }

        .sm-whatsapp {
          position: fixed;
          bottom: 22px;
          right: 22px;
          z-index: 60;
          width: 58px;
          height: 58px;
          border-radius: 999px;
          background: #21c063;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px -8px rgba(33,192,99,0.65);
          transition: transform 0.25s ease;
        }
        .sm-whatsapp:hover { transform: scale(1.08); }
        .sm-whatsapp-ring {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 2px solid #21c063;
          animation: sm-ring 2.2s ease-out infinite;
        }
        @keyframes sm-ring {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.7); opacity: 0; }
        }

        a, button { -webkit-tap-highlight-color: transparent; }
        .sm-focusable:focus-visible {
          outline: 2px solid var(--sm-green);
          outline-offset: 3px;
          border-radius: 8px;
        }

        @media (prefers-reduced-motion: reduce) {
          .sm-dot, .sm-whatsapp-ring { animation: none; }
          * { transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* ================= NAV ================= */}
      <header className="sm-nav">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[72px]">
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 sm-focusable"
            aria-label="SM Solution Technology — início"
          >
            <img src={LOGO_SRC} alt="Logo SM Solution Technology" className="h-9 w-9 object-contain" />
            <span className="sm-font-display font-semibold text-[0.95rem] tracking-wide hidden sm:block">
              SM SOLUTION <span className="sm-text-dim font-normal">TECHNOLOGY</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`sm-nav-link sm-focusable ${activeSection === link.id ? "active" : ""}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <button onClick={() => handleNavClick("contato")} className="sm-btn-primary sm-focusable text-sm">
              Fale conosco <ArrowRight size={16} />
            </button>
          </div>

          <button
            className="md:hidden sm-focusable p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t sm-border px-5 pb-5 pt-2 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`sm-nav-link sm-focusable text-left py-2.5 ${activeSection === link.id ? "active" : ""}`}
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => handleNavClick("contato")} className="sm-btn-primary sm-focusable text-sm justify-center mt-2">
              Fale conosco <ArrowRight size={16} />
            </button>
          </div>
        )}
      </header>

      {/* ================= HOME / HERO ================= */}
      <section id="home" className="sm-hero">
        <div className="sm-hero-glow" />
        <div className="sm-grid-overlay" />
        <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
          <Reveal>
            <div className="flex flex-col items-center text-center gap-7 pt-6 pb-4">
              <img
                src={LOGOTRANSPARENT_SRC}
                alt="SM Solution Technology"
                className="h-36 sm:h-40 w-auto object-contain"
              />
              <span className="sm-badge">
                <span className="sm-dot" /> TI &amp; automação para empresas e condomínios
              </span>
              <h1 className="sm-font-display font-bold text-[2.1rem] sm:text-[3.1rem] leading-[1.12] max-w-3xl">
                Construímos soluções para sua{" "}
                <span className="sm-gradient-text">empresa</span>, seu{" "}
                <span className="sm-gradient-text">condomínio</span> e para a sua vida.
              </h1>
              <p className="sm-text-dim text-base sm:text-lg max-w-xl">
                Tecnologia aplicada de forma prática: infraestrutura de TI, plataformas de gestão
                condominial e automação de processos, tudo sob um mesmo parceiro.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button onClick={() => handleNavClick("servicos")} className="sm-btn-primary sm-focusable">
                  Conheça nossas soluções <ArrowRight size={18} />
                </button>
                <button onClick={() => handleNavClick("contato")} className="sm-btn-ghost sm-focusable">
                  Falar com um especialista
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CircuitDivider />

      {/* ================= SOBRE ================= */}
      <section id="sobre" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid md:grid-cols-2 gap-14 items-start">
          <Reveal>
            <div>
              <span className="sm-section-label">Sobre nós</span>
              <h2 className="sm-font-display font-bold text-3xl sm:text-4xl mt-3 mb-6 leading-tight">
                Nascemos para simplificar a tecnologia do dia a dia
              </h2>
              <p className="sm-text-dim leading-relaxed mb-4">
                A SM Solution Technology surgiu da constatação de que empresas e condomínios
                enfrentam os mesmos problemas: processos manuais, comunicação fragmentada e
                sistemas que não conversam entre si. Reunimos experiência em infraestrutura de TI
                e em gestão condominial para propor um caminho mais simples.
              </p>
              <p className="sm-text-dim leading-relaxed">
                Hoje atendemos empresas de diferentes portes e condomínios residenciais e
                comerciais, sempre com o mesmo princípio: tecnologia só vale a pena quando resolve
                um problema real, para quem usa no dia a dia.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid sm:grid-cols-1 gap-4">
              {[
                {
                  title: "Missão",
                  text: "Simplificar a operação de empresas e condomínios por meio de tecnologia acessível e bem implementada.",
                },
                {
                  title: "Visão",
                  text: "Ser reconhecida como a parceira de tecnologia mais confiável para negócios e comunidades da nossa região.",
                },
                {
                  title: "Valores",
                  text: "Transparência, proximidade com o cliente e foco em inovação e automação que geram resultado prático.",
                },
              ].map((item) => (
                <div key={item.title} className="sm-card p-6">
                  <h3 className="sm-font-display font-semibold text-lg mb-2 sm-green">
                    {item.title}
                  </h3>
                  <p className="sm-text-dim text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CircuitDivider flip />

      {/* ================= SERVIÇOS ================= */}
      <section id="servicos" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="sm-section-label">Serviços</span>
            <h2 className="sm-font-display font-bold text-3xl sm:text-4xl mt-3 mb-4 leading-tight">
              Três frentes, um único parceiro
            </h2>
            <p className="sm-text-dim">
              Da infraestrutura ao atendimento ao morador, cuidamos de cada camada da sua operação.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 120}>
                <div className="sm-card p-7 h-full flex flex-col">
                  <div className="sm-icon-wrap mb-5">
                    <Icon size={24} className="sm-blue" />
                  </div>
                  <h3 className="sm-font-display font-semibold text-xl mb-3">{service.title}</h3>
                  <p className="sm-text-dim text-sm leading-relaxed mb-5">{service.desc}</p>
                  <ul className="mt-auto flex flex-col gap-2.5">
                    {service.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 size={16} className="sm-green flex-shrink-0" />
                        <span className="sm-text-dim">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CircuitDivider />

      {/* ================= PORTFÓLIO / CASES ================= */}
      <section id="portfolio" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="sm-section-label">Cases de sucesso</span>
            <h2 className="sm-font-display font-bold text-3xl sm:text-4xl mt-3 mb-4 leading-tight">
              Resultado é o que conta
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {CASES.map((c, i) => (
            <Reveal key={c.title} delay={i * 120}>
              <div className="sm-card p-7 h-full">
                <span className="sm-badge mb-4">{c.tag}</span>
                <h3 className="sm-font-display font-semibold text-lg mb-3 leading-snug">
                  {c.title}
                </h3>
                <p className="sm-green text-sm font-medium flex items-start gap-2">
                  <ChevronRight size={16} className="flex-shrink-0 mt-0.5" />
                  {c.result}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <div className="sm-card p-7 h-full relative">
                <Quote size={28} className="sm-blue opacity-40 mb-3" />
                <p className="text-[0.98rem] leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="sm-text-dim text-xs">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CircuitDivider flip />

      {/* ================= CONTATO ================= */}
      <section id="contato" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid md:grid-cols-2 gap-14">
          <Reveal>
            <div>
              <span className="sm-section-label">Contato</span>
              <h2 className="sm-font-display font-bold text-3xl sm:text-4xl mt-3 mb-4 leading-tight">
                Vamos conversar sobre o seu projeto
              </h2>
              <p className="sm-text-dim mb-8 leading-relaxed">
                Preencha o formulário ou fale diretamente com a nossa equipe pelos canais abaixo.
                Retornamos em até um dia útil.
              </p>

              <div className="flex flex-col gap-5 mb-8">
                <div className="flex items-center gap-3.5">
                  <div className="sm-icon-wrap !w-11 !h-11"><Phone size={18} className="sm-green" /></div>
                  <div>
                    <p className="text-sm font-medium">(11) 98454-0495</p>
                    <p className="sm-text-dim text-xs">Seg. a sex., 9h às 18h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="sm-icon-wrap !w-11 !h-11"><Mail size={18} className="sm-green" /></div>
                  <div>
                    <p className="text-sm font-medium">condoconnect3@gmail.com</p>
                    <p className="sm-text-dim text-xs">Resposta em até 24h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="sm-icon-wrap !w-11 !h-11"><MapPin size={18} className="sm-green" /></div>
                  <div>
                    <p className="text-sm font-medium">São Paulo, SP</p>
                    <p className="sm-text-dim text-xs">Atendimento presencial sob agendamento</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a href="#" aria-label="Instagram" className="sm-icon-wrap !w-11 !h-11 sm-focusable">
                  <Instagram size={18} />
                </a>
                <a href="#" aria-label="LinkedIn" className="sm-icon-wrap !w-11 !h-11 sm-focusable">
                  <Linkedin size={18} />
                </a>
                <a href="#" aria-label="WhatsApp" className="sm-icon-wrap !w-11 !h-11 sm-focusable">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={handleSubmit} className="sm-card p-7 sm:p-8 flex flex-col gap-4" noValidate>
              <div>
                <label htmlFor="name" className="text-sm font-medium block mb-2">Nome</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  className="sm-input"
                  value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium block mb-2">E-mail</label>
                <input
                  id="email"
                  type="email"
                  placeholder="voce@email.com"
                  className="sm-input"
                  value={formState.email}
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium block mb-2">Mensagem</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Conte um pouco sobre o que você precisa"
                  className="sm-input resize-none"
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  required
                />
              </div>
              <button type="submit" className="sm-btn-primary sm-focusable justify-center mt-2">
                Enviar mensagem <Send size={16} />
              </button>
              {formSent && (
                <p className="sm-green text-sm flex items-center gap-2 mt-1">
                  <CheckCircle2 size={16} /> Mensagem enviada. Retornaremos em breve!
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t sm-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <button onClick={() => handleNavClick("home")} className="flex items-center gap-3 sm-focusable">
              <img src={LOGO_SRC} alt="Logo SM Solution Technology" className="h-8 w-8 object-contain" />
              <span className="sm-font-display font-semibold text-sm">SM SOLUTION TECHNOLOGY</span>
            </button>

            <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Links rápidos">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="sm-nav-link sm-focusable"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-10 pt-6 border-t sm-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="sm-text-dim text-xs">
              © {new Date().getFullYear()} SM Solution Technology. Todos os direitos reservados.
            </p>
            <a href="#" className="sm-text-dim text-xs hover:underline sm-focusable">
              Política de privacidade
            </a>
          </div>
        </div>
      </footer>

      {/* ================= WHATSAPP FLUTUANTE ================= */}
      <a
        href="https://wa.me/5511400000000"
        target="_blank"
        rel="noopener noreferrer"
        className="sm-whatsapp sm-focusable"
        aria-label="Falar no WhatsApp"
      >
        <span className="sm-whatsapp-ring" aria-hidden="true" />
        <MessageCircle size={26} color="#fff" />
      </a>
    </div>
  );
}
