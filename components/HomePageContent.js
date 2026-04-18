'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

/* ─── SVG Icon Map ─── */
const ICON_MAP = {
  'trending-up': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  'trending-down': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" />
    </svg>
  ),
  'shield-check': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  'shield-alert': (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  cpu: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  megaphone: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  ),
  rocket: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  award: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  'x-circle': (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  'check-circle-2': (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  menu: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  ),
  x: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  'arrow-right': (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  'arrow-up-right': (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
    </svg>
  ),
  check: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  sparkles: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  ),
};

function Icon({ name, size = 24, style = {} }) {
  const el = ICON_MAP[name];
  if (!el) return null;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, flexShrink: 0, ...style }}>
      {el}
    </span>
  );
}

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/* ─── NavBar ─── */
function NavBar({ brand, sections }) {
  const navRef = useRef(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const onScroll = () => {
      el.classList.toggle('nav-scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    closeMobile();
  };

  const closeMobile = () => {
    const menu = document.getElementById('hp-mobile-menu');
    if (menu) menu.style.display = 'none';
  };

  const toggleMobile = () => {
    const menu = document.getElementById('hp-mobile-menu');
    if (!menu) return;
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  };

  return (
    <nav ref={navRef} id="navbar" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, transition: 'all 0.3s ease', padding: '1.25rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }} onClick={() => scrollTo('home')}>
          <div style={{
            width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
            background: brand?.logoPath ? 'transparent' : 'var(--gradient-brand)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: brand?.logoPath ? 'none' : '0 4px 12px rgba(79,70,229,0.3)',
            flexShrink: 0
          }}>
            {brand?.logoPath ? (
              <img src={brand.logoPath} alt="Logo" style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover' }} />
            ) : (
              <Icon name="cpu" size={18} style={{ color: 'white' }} />
            )}
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
            {brand?.logoTextPrimary || 'Touchpointe'}
            <span style={{ background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              {brand?.logoTextAccent || '.digital'}
            </span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}>
          {sections.map((s) => (
            <button key={s.id} onClick={() => scrollTo(s.id)} className="nav-link">{s.label}</button>
          ))}
          <a
            href="/register"
            className="btn btn-primary btn-sm"
            style={{ padding: '0.55rem 1.5rem', textDecoration: 'none' }}
          >
            Enroll Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMobile}
          style={{ background: 'none', border: '1.5px solid var(--border-color)', borderRadius: '0.5rem', padding: '0.35rem', color: 'var(--text-primary)', cursor: 'pointer', display: 'none' }}
        >
          <Icon name="menu" size={22} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="hp-mobile-menu"
        style={{
          display: 'none', position: 'absolute', top: '100%', left: 0, width: '100%',
          background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)',
          padding: '1.25rem 1.5rem', flexDirection: 'column', gap: '0.5rem',
          borderBottom: '1px solid var(--border-color)', boxShadow: '0 16px 40px rgba(15,23,42,0.1)',
        }}
      >
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 500, fontSize: '1rem', textAlign: 'left', padding: '0.625rem 0.75rem', borderRadius: '0.5rem', transition: 'all 0.15s', width: '100%' }}
          >
            {s.label}
          </button>
        ))}
        <a className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%', textDecoration: 'none' }} href="/register">
          Enroll Now
        </a>
      </div>
    </nav>
  );
}

/* ─── Stat Card ─── */
function StatCard({ stat, delay }) {
  const colorMap = {
    indigo: { color: 'var(--primary)' },
    cyan: { color: 'var(--secondary)' },
    pink: { color: 'var(--accent)' },
  };
  const clr = colorMap[stat.tone] || colorMap.indigo;

  return (
    <div data-reveal="up" data-reveal-delay={delay} className="stat-card" style={{ textAlign: 'center' }}>
      <div style={{
        width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem',
        background: stat.tone === 'cyan' ? 'var(--secondary-subtle)' : stat.tone === 'pink' ? 'var(--accent-subtle)' : 'var(--primary-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1rem', color: clr.color,
      }}>
        <Icon name={stat.icon} size={22} />
      </div>
      <div className="stat-number">{stat.value}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

/* ─── Program Card ─── */
function ProgramCard({ prog, delay, toneClass = 'indigo' }) {
  return (
    <div data-reveal="up" data-reveal-delay={delay} className={`program-card${prog.featured ? ' featured' : ''}`}>
      {prog.featured && prog.featuredLabel && (
        <div className="featured-tag">{prog.featuredLabel}</div>
      )}
      <div style={{
        width: '3rem', height: '3rem', borderRadius: '0.75rem', marginBottom: '1.25rem',
        background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', boxShadow: '0 4px 14px rgba(79,70,229,0.25)', flexShrink: 0,
      }}>
        <Icon name={prog.icon} size={20} />
      </div>

      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{prog.title}</h3>

      {prog.formats && (
        <div className="program-format-bar">
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Formats:</span>
          {prog.formats.split('•').map((f, j) => (
            <span key={j} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
              {j > 0 && <span style={{ opacity: 0.4, margin: '0 0.1rem' }}>·</span>}
              <strong style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{f.trim()}</strong>
            </span>
          ))}
        </div>
      )}

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, flexGrow: 1, marginBottom: '1.5rem' }}>{prog.description}</p>

      <button
        className="btn btn-secondary"
        style={{
          width: '100%',
          ...(prog.featured ? { borderColor: 'rgba(79,70,229,0.3)', color: 'var(--primary)', background: 'var(--primary-subtle)' } : {}),
        }}
      >
        View Syllabus
        <Icon name="arrow-up-right" size={15} />
      </button>
    </div>
  );
}

/* ─── Main Page ─── */
export default function HomePageContent({ data, brand }) {
  const d = data || {};
  const whySection = d.whySection || {};
  const smbSection = d.smbSection || {};
  const studentsSection = d.studentsSection || {};
  const footer = d.footer || {};
  const stats = d.stats || [];

  // Activate scroll reveal
  useScrollReveal();

  const navSections = [
    { id: 'home', label: 'Home' },
    { id: 'why-train', label: 'Why AI?' },
    { id: 'workshop', label: 'Workshop' },
  ];

  return (
    <>
      <NavBar brand={brand} sections={navSections} />

      <main>
        {/* ═══════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════ */}
        <section id="home" className="hero-section">
          {/* Background decorations */}
          <div className="hero-bg-dots" />
          <div className="hero-glow-top" />
          <div className="hero-glow-bottom" />

          {d.heroBgImage && (
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.04,
              backgroundImage: `url('${d.heroBgImage}')`,
              backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
            }} />
          )}

          <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
            <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>

              {/* Badge */}
              {d.heroBadge && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: 'var(--primary-subtle)', border: '1px solid rgba(79,70,229,0.15)', borderRadius: 9999, color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '1.75rem', animation: 'fadeInUp 0.6s ease-out both' }}>
                  <span style={{ width: 6, height: 6, background: 'var(--primary)', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                  {d.heroBadge}
                </div>
              )}

              {/* Heading */}
              <h1 style={{ marginBottom: '1.25rem', animation: 'fadeInUp 0.6s 0.1s ease-out both', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {d.heroHeading || 'Empowering Futures with'}{' '}
                <span className="text-gradient-animated" style={{ display: 'inline-block' }}>
                  {d.heroHeadingHighlight || 'Advanced Tech Training'}
                </span>
              </h1>

              {/* Subtitle */}
              {d.heroSubtitle && (
                <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', margin: '0 auto 0', maxWidth: 620, lineHeight: 1.75, animation: 'fadeInUp 0.6s 0.2s ease-out both' }}>
                  {d.heroSubtitle}
                </p>
              )}

              {/* CTA Buttons */}
              <div className="hero-cta-group" style={{ animation: 'fadeInUp 0.6s 0.3s ease-out both' }}>
                <a
                  className="btn btn-primary btn-lg"
                  href="/register"
                  style={{ textDecoration: 'none' }}
                >
                  {d.heroCtaStudents || 'Register Now'}
                  <Icon name="arrow-right" size={18} />
                </a>
                <a
                  className="btn btn-secondary btn-lg"
                  href="/syllabus"
                  style={{ textDecoration: 'none' }}
                >
                  {d.heroCtaBusiness || 'View Syllabus'}
                </a>
              </div>

            </div>

            {/* Stats Grid */}
            {stats.length > 0 && (
              <div className="stats-grid" style={{ marginTop: '4.5rem' }}>
                {stats.map((stat, i) => (
                  <StatCard key={i} stat={stat} delay={String(i * 100 + 100)} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            WHY TRAIN
        ═══════════════════════════════════════════ */}
        <section id="why-train" className="section why-section">
          <div className="container">
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div data-reveal="fade" className="section-label" style={{ display: 'inline-flex', margin: '0 auto 1rem' }}>
                <Icon name="sparkles" size={14} />
                The Digital Imperative
              </div>
              <h2 data-reveal="up" style={{ marginBottom: '1rem' }}>
                {whySection.heading || 'Why Tech Training is'}{' '}
                <span className="text-gradient">{whySection.headingHighlight || 'Mandatory'}</span>
              </h2>
              {whySection.subtitle && (
                <p data-reveal="up" data-reveal-delay="100" className="subtitle" style={{ margin: '0 auto' }}>
                  {whySection.subtitle}
                </p>
              )}
            </div>

            {/* Two column layout */}
            <div className="two-col-layout" style={{ display: 'grid', gap: '3.5rem', gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}>

              {/* Points column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {(whySection.points || []).map((point, i) => {
                  const isRed = point.tone === 'red';
                  const iconColor = isRed ? '#dc2626' : point.tone === 'cyan' ? 'var(--secondary)' : 'var(--primary)';
                  const iconBg = isRed ? 'rgba(239,68,68,0.08)' : point.tone === 'cyan' ? 'var(--secondary-subtle)' : 'var(--primary-subtle)';

                  return (
                    <div key={i} data-reveal="left" data-reveal-delay={String(i * 100)} className="why-point-card">
                      <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem', background: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon name={point.icon} size={20} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>{point.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{point.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cost box */}
              <div data-reveal="right" style={{ position: 'sticky', top: '6rem' }}>
                <div className="cost-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem', background: 'rgba(239,68,68,0.08)', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="shield-alert" size={18} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                      {whySection.costBoxTitle || 'The High Cost of Inaction'}
                    </h3>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    Staying behind the technology curve is a competitive liability. Here&apos;s what untrained teams cost you:
                  </p>

                  <ul className="cost-list">
                    {(whySection.costItems || []).map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                        <span style={{ color: '#dc2626', flexShrink: 0, marginTop: '2px', display: 'inline-flex' }}>
                          <Icon name="x-circle" size={17} />
                        </span>
                        {item}
                      </li>
                    ))}

                    <li style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', fontWeight: 600, color: 'var(--success)' }}>
                      <span style={{ flexShrink: 0, marginTop: '2px', display: 'inline-flex' }}>
                        <Icon name="check-circle-2" size={18} />
                      </span>
                      {whySection.costCta || 'Training empowers you to take control.'}
                    </li>
                  </ul>
                </div>

                </div>
              </div>
            </div>
          </section>

        {/* ═══════════════════════════════════════════
            WORKSHOP PROGRAMME
        ═══════════════════════════════════════════ */}
        <section id="workshop" className="section students-section">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              {studentsSection.badge && (
                <div data-reveal="fade" className="section-label section-label-cyan" style={{ display: 'inline-flex', margin: '0 auto 1rem' }}>
                  {studentsSection.badge}
                </div>
              )}
              <h2 data-reveal="up" style={{ marginBottom: '1rem' }}>
                {studentsSection.heading || 'Flagship'}{' '}
                <span className="text-gradient">{studentsSection.headingHighlight || 'Workshop'}</span>
              </h2>
              {studentsSection.subtitle && (
                <p data-reveal="up" data-reveal-delay="100" className="subtitle" style={{ margin: '0 auto' }}>
                  {studentsSection.subtitle}
                </p>
              )}
            </div>

            {/* Featured Program */}
            {studentsSection.featuredProgram && (() => {
              const fp = studentsSection.featuredProgram;
              return (
                <div data-reveal="up" className="featured-program-card">
                  <div style={{ flex: 1, minWidth: 280 }}>
                    {fp.badge && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.3rem 0.875rem', background: 'var(--primary-subtle)', border: '1px solid rgba(79,70,229,0.15)', borderRadius: 9999, color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                        <Icon name="sparkles" size={12} />
                        {fp.badge}
                      </div>
                    )}
                    <h3 style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{fp.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
                      {fp.format && <span style={{ fontWeight: 500 }}>{fp.format}</span>}
                      {fp.ageRequirement && <><span style={{ opacity: 0.4 }}>•</span><span>{fp.ageRequirement}</span></>}
                    </div>
                    {fp.description && <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: 560 }}>{fp.description}</p>}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      {fp.ctaHref && <a href={fp.ctaHref} className="btn btn-primary" style={{ textDecoration: 'none' }}>{fp.ctaLabel || 'View Full Syllabus'} <Icon name="arrow-right" size={16} /></a>}
                      <a href="/register" className="btn btn-secondary" style={{ textDecoration: 'none' }}>{fp.enrollLabel || 'Register Now'}</a>
                    </div>
                  </div>

                  <div className="program-image-placeholder">
                    {fp.image ? (
                      <img src={fp.image} alt={fp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ textAlign: 'center', color: 'white', opacity: 0.9 }}>
                        <Icon name="rocket" size={56} />
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, marginTop: '0.75rem', letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.8 }}>
                          Workshop Programme
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {studentsSection.singleTrackLabel && (
              <h3 data-reveal="fade" style={{ textAlign: 'center', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem', letterSpacing: '0.02em' }}>
                {studentsSection.singleTrackLabel}
              </h3>
            )}

            <div className="grid-3">
              {(studentsSection.programs || []).map((prog, i) => {
                const isCyan = prog.tone === 'cyan';
                const iconColor = isCyan ? 'var(--secondary)' : prog.tone === 'pink' ? 'var(--accent)' : 'var(--primary)';
                const iconBg = isCyan ? 'var(--secondary-subtle)' : prog.tone === 'pink' ? 'var(--accent-subtle)' : 'var(--primary-subtle)';

                return (
                  <div key={i} data-reveal="up" data-reveal-delay={String(i * 100)} className="program-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                      <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%', background: iconBg, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={prog.icon} size={20} />
                      </div>
                      {prog.badge && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.2rem 0.6rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700, background: iconBg, color: iconColor, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                          {prog.badge}
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{prog.title}</h3>
                    {prog.formats && (
                      <div className="program-format-bar">
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Session:</span>
                        <strong style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.82rem' }}>{prog.formats}</strong>
                      </div>
                    )}
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65, flexGrow: 1, marginBottom: '1.5rem' }}>{prog.description}</p>
                    <a href="/syllabus" className="btn btn-secondary" style={{ width: '100%', color: iconColor, borderColor: 'rgba(79,70,229,0.15)', textDecoration: 'none' }}>
                      View Syllabus <Icon name="arrow-up-right" size={14} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div>
              <div className="footer-brand">
                <div style={{
                  width: '2rem', height: '2rem', borderRadius: '0.6rem',
                  background: brand?.logoPath ? 'transparent' : 'var(--gradient-brand)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: brand?.logoPath ? 'none' : '0 4px 10px rgba(79,70,229,0.2)',
                  flexShrink: 0
                }}>
                  {brand?.logoPath ? (
                    <img src={brand.logoPath} alt="Logo" style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover' }} />
                  ) : (
                    <Icon name="cpu" size={14} style={{ color: 'white' }} />
                  )}
                </div>
                <span className="footer-brand-text">
                  {brand?.logoTextPrimary || 'Touchpointe'}<span>{brand?.logoTextAccent || '.digital'}</span>
                </span>
              </div>
              {footer.tagline && <p className="footer-tagline">{footer.tagline}</p>}
              {footer.registrationBadge && (
                <div className="footer-reg-badge">
                  <Icon name="award" size={14} />
                  {footer.registrationBadge}
                </div>
              )}
            </div>

            <div>
              <h4 className="footer-heading">Workshop</h4>
              <ul className="footer-links">
                <li><Link href="/syllabus" style={{ color: 'inherit', textDecoration: 'none' }}>Workshop Syllabus</Link></li>
                <li><Link href="/register" style={{ color: 'inherit', textDecoration: 'none' }}>Student Registration</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="footer-heading">Contact</h4>
              <ul className="footer-links">
                <li><span className="footer-contact-item">{footer.email || 'contact@touchpointe.digital'}</span></li>
                <li><span className="footer-contact-item">{footer.phone || '+91 75580 99003'}</span></li>
                <li style={{ marginTop: '1rem' }}>
                  <button className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)', color: 'white', fontSize: '0.88rem', padding: '0.6rem 1.25rem' }}>
                    Get in Touch
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p className="footer-copyright">{footer.copyright || '© 2026 Touchpointe.digital. All rights reserved.'}</p>
            <div className="footer-legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile menu responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .two-col-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
