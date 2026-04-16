'use client';

import { useEffect, useRef } from 'react';

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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
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
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  'x-circle': (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  'check-circle-2': (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  'arrow-right': (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
};

const TONE_CLASSES = {
  indigo: { bg: 'bg-indigo-500-10', text: 'text-indigo-400', border: 'border-indigo-500-20' },
  cyan:   { bg: 'bg-cyan-500-10',   text: 'text-cyan-400',   border: '' },
  pink:   { bg: 'bg-pink-500-10',   text: 'text-pink-400',   border: '' },
  red:    { bg: 'rgba(239,68,68,0.1)', text: 'rgb(248,113,113)', border: '' },
};

function Icon({ name, size = 24, className = '' }) {
  const el = ICON_MAP[name];
  if (!el) return null;
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>
      {el}
    </span>
  );
}

function NavBar({ brand, sections }) {
  const navRef = useRef(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const handler = () => {
      if (window.scrollY > 50) el.classList.add('nav-scrolled');
      else el.classList.remove('nav-scrolled');
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('hp-mobile-menu')?.style.setProperty('display', 'none');
  };

  const toggleMobile = () => {
    const menu = document.getElementById('hp-mobile-menu');
    if (!menu) return;
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  };

  return (
    <nav ref={navRef} id="navbar" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, transition: 'all 0.3s ease', padding: '1.5rem 0' }}>
      <div className="container flex justify-between items-center">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => scrollTo('home')}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 14px rgba(99,102,241,0.2)' }}>
            <Icon name="cpu" size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl" style={{ letterSpacing: '-0.05em' }}>
            {brand?.logoTextPrimary || 'Touchpointe'}<span style={{ color: 'var(--primary-light)' }}>{brand?.logoTextAccent || '.digital'}</span>
          </span>
        </div>

        <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {sections.map((s) => (
            <button key={s.id} onClick={() => scrollTo(s.id)} className="nav-link">{s.label}</button>
          ))}
          <button className="btn btn-primary text-sm" style={{ padding: '0.5rem 1.5rem' }} onClick={() => scrollTo('smb')}>Enroll Now</button>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobile} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'none' }}>
          <Icon name="menu" size={24} />
        </button>
      </div>

      <div id="hp-mobile-menu" style={{ display: 'none', position: 'absolute', top: '100%', left: 0, width: '100%', background: 'rgba(20,27,45,0.95)', backdropFilter: 'blur(16px)', padding: '1rem', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        {sections.map((s) => (
          <button key={s.id} onClick={() => scrollTo(s.id)} className="nav-link text-xl" style={{ textAlign: 'left' }}>{s.label}</button>
        ))}
        <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={() => scrollTo('smb')}>Enroll Now</button>
      </div>
    </nav>
  );
}

export default function HomePageContent({ data }) {
  const d = data || {};
  const whySection = d.whySection || {};
  const smbSection = d.smbSection || {};
  const studentsSection = d.studentsSection || {};
  const footer = d.footer || {};
  const stats = d.stats || [];

  const navSections = [
    { id: 'why-train', label: 'Why Train?' },
    { id: 'smb',       label: 'Business Programs' },
    { id: 'students',  label: 'Student Programs' },
  ];

  return (
    <>
      {/* Nav */}
      <NavBar brand={{}} sections={navSections} />

      <div className="bg-glow-blob blob-top-right" />
      <div className="bg-glow-blob blob-bottom-left" style={{ bottom: '10%', left: '10%' }} />

      <main>
        {/* ── HERO ─────────────────────────────────────────── */}
        <section id="home" className="section flex items-center relative" style={{ minHeight: '100vh', paddingTop: '8rem', overflow: 'hidden' }}>
          {d.heroBgImage && (
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${d.heroBgImage}')`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-color))', zIndex: 0 }} />

          <div className="container relative" style={{ zIndex: 10 }}>
            <div className="text-center" style={{ maxWidth: 800, margin: '0 auto' }}>
              {d.heroBadge && (
                <div className="animate-fade-in inline-flex items-center gap-2 rounded-full font-medium text-sm mb-8 text-indigo-400 py-2 px-4" style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
                  <div style={{ width: 8, height: 8, background: 'rgba(99,102,241,1)', borderRadius: '50%' }} className="animate-pulse" />
                  {d.heroBadge}
                </div>
              )}

              <h1 className="mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                {d.heroHeading || 'Empowering Futures with'} <br />
                <span className="text-gradient animate-pulse-glow" style={{ display: 'inline-block' }}>
                  {d.heroHeadingHighlight || 'Advanced Tech Training'}
                </span>
              </h1>

              {d.heroSubtitle && (
                <p className="subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>{d.heroSubtitle}</p>
              )}

              <div className="flex items-center justify-center gap-4 mt-10 animate-fade-in" style={{ animationDelay: '0.3s', flexWrap: 'wrap' }}>
                <button onClick={() => document.getElementById('smb')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary" style={{ minWidth: 200 }}>
                  {d.heroCtaBusiness || 'For Businesses'}
                  <Icon name="arrow-right" size={18} />
                </button>
                <button onClick={() => document.getElementById('students')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-secondary" style={{ minWidth: 200 }}>
                  {d.heroCtaStudents || 'For Students'}
                </button>
              </div>
            </div>

            {/* Stats */}
            {stats.length > 0 && (
              <div className="grid-3 mt-24 animate-fade-in relative" style={{ animationDelay: '0.5s', zIndex: 10 }}>
                {stats.map((stat, i) => {
                  const tone = TONE_CLASSES[stat.tone] || TONE_CLASSES.indigo;
                  return (
                    <div key={i} className="glass-card flex flex-col items-center text-center p-8" style={i === 1 ? { transform: 'translateY(-20px)' } : {}}>
                      <div className={`w-16 h-16 rounded-2xl ${tone.bg} flex items-center justify-center mb-6`}>
                        <Icon name={stat.icon} size={24} className={tone.text} />
                      </div>
                      <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                      <p className="text-muted">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── WHY TRAIN ────────────────────────────────────── */}
        <section id="why-train" className="section relative">
          <div className="container">
            <div className="text-center">
              <h2 className="animate-fade-in">
                {whySection.heading || 'Why Tech Training is'} <span className="text-gradient">{whySection.headingHighlight || 'Mandatory'}</span>
              </h2>
              {whySection.subtitle && <p className="subtitle animate-fade-in">{whySection.subtitle}</p>}
            </div>

            <div className="two-col-layout mt-16" style={{ display: 'grid', gap: '4rem', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {(whySection.points || []).map((point, i) => {
                  const isRed = point.tone === 'red';
                  const tone = TONE_CLASSES[point.tone] || TONE_CLASSES.indigo;
                  return (
                    <div key={i} className="glass-card flex gap-6 p-6"
                      style={i === 1 ? { borderColor: 'rgba(99,102,241,0.3)', boxShadow: '0 0 30px rgba(99,102,241,0.1)' } : {}}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: isRed ? 'rgba(239,68,68,0.1)' : undefined, flexShrink: 0 }}
                        {...(!isRed ? { className: `w-12 h-12 rounded-xl flex items-center justify-center ${tone.bg}` } : {})}>
                        <Icon name={point.icon} size={20} style={isRed ? { color: 'rgb(248,113,113)' } : undefined} className={!isRed ? tone.text : ''} />
                      </div>
                      <div>
                        <h3 className="text-xl mb-2 text-white">{point.title}</h3>
                        <p className="text-muted text-sm">{point.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="relative">
                <div className="glass-card flex flex-col justify-center" style={{ aspectRatio: '1', maxWidth: 500, margin: '0 auto', padding: '2.5rem', overflow: 'hidden' }}>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1), transparent)' }} />
                  <div className="relative" style={{ zIndex: 1 }}>
                    <h3 className="text-3xl font-bold mb-6">{whySection.costBoxTitle || 'The High Cost of Inaction'}</h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {(whySection.costItems || []).map((item, i) => (
                        <li key={i} className="flex items-center gap-4">
                          <span style={{ color: 'rgb(248,113,113)', flexShrink: 0, display: 'inline-flex' }}><Icon name="x-circle" size={20} /></span>
                          <span className="text-muted">{item}</span>
                        </li>
                      ))}
                      <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '1.5rem 0' }} />
                      <li className="flex items-center gap-4">
                        <span style={{ color: 'rgb(74,222,128)', flexShrink: 0, display: 'inline-flex' }}><Icon name="check-circle-2" size={20} /></span>
                        <span className="text-white font-medium">{whySection.costCta || 'Training empowers you to take control.'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SMB SECTION ──────────────────────────────────── */}
        <section id="smb" className="section relative" style={{ background: 'rgba(7,10,18,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container">
            <div className="text-center mb-16">
              {smbSection.badge && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm mb-4 bg-indigo-500-10 text-indigo-400">
                  {smbSection.badge}
                </div>
              )}
              <h2>
                {smbSection.heading || 'Business'} <span className="text-gradient">{smbSection.headingHighlight || 'Training Programs'}</span>
              </h2>
              {smbSection.subtitle && <p className="subtitle">{smbSection.subtitle}</p>}
            </div>

            <div className="grid-3">
              {(smbSection.programs || []).map((prog, i) => (
                <div key={i} className="glass-card flex flex-col" style={{ position: 'relative', overflow: 'hidden', ...(prog.featured ? { borderColor: 'rgba(99,102,241,0.5)' } : {}) }}>
                  {prog.featured && prog.featuredLabel && (
                    <div className="absolute" style={{ top: 0, right: 0, padding: '0.25rem 0.75rem', background: 'linear-gradient(to right, rgb(236,72,153), rgb(99,102,241))', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', borderBottomLeftRadius: '0.5rem' }}>
                      {prog.featuredLabel}
                    </div>
                  )}
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'var(--gradient-primary)' }}>
                    <Icon name={prog.icon} size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl mb-2">{prog.title}</h3>
                  {prog.formats && (
                    <div className="flex items-center text-xs mb-4 pb-4" style={{ color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', gap: '0.25rem' }}>
                      Formats: {prog.formats.split('•').map((f, j) => (
                        <span key={j}>{j > 0 && <span style={{ margin: '0 0.25rem' }}>•</span>}<strong style={{ color: '#fff' }}>{f.trim()}</strong></span>
                      ))}
                    </div>
                  )}
                  <p className="text-muted text-sm flex-grow mb-6">{prog.description}</p>
                  <button className="btn btn-secondary w-full" style={prog.featured ? { background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.3)' } : {}}>
                    View Syllabus
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STUDENTS SECTION ─────────────────────────────── */}
        <section id="students" className="section relative">
          <div className="container">
            <div className="text-center mb-16">
              {studentsSection.badge && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm mb-4 bg-cyan-500-10 text-cyan-400" style={{ border: '1px solid rgba(6,182,212,0.2)' }}>
                  {studentsSection.badge}
                </div>
              )}
              <h2>
                {studentsSection.heading || 'Student'} <span className="text-gradient">{studentsSection.headingHighlight || 'Career Launchpad'}</span>
              </h2>
              {studentsSection.subtitle && <p className="subtitle">{studentsSection.subtitle}</p>}
            </div>

            {/* Featured program */}
            {studentsSection.featuredProgram && (() => {
              const fp = studentsSection.featuredProgram;
              return (
                <div className="glass-card mb-12" style={{ background: 'linear-gradient(to right, rgba(99,102,241,0.05), rgba(6,182,212,0.05))', border: '1px solid rgba(99,102,241,0.3)', padding: '2.5rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ flex: 1, minWidth: 300 }}>
                      {fp.badge && (
                        <div className="inline-flex items-center gap-2 rounded-full font-medium text-xs mb-4 text-indigo-400 py-1 px-3" style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
                          {fp.badge}
                        </div>
                      )}
                      <h3 className="text-3xl mb-3">{fp.title}</h3>
                      <div className="flex items-center text-sm mb-4 pb-4" style={{ color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.05)', gap: '0.5rem' }}>
                        {fp.format && <span>{fp.format}</span>}
                        {fp.ageRequirement && <><span style={{ margin: '0 0.25rem' }}>•</span><span>{fp.ageRequirement}</span></>}
                      </div>
                      {fp.description && <p className="text-muted mb-6" style={{ maxWidth: 600 }}>{fp.description}</p>}
                      <div className="flex items-center gap-4" style={{ flexWrap: 'wrap' }}>
                        {fp.ctaHref && <a href={fp.ctaHref} className="btn btn-primary" style={{ textDecoration: 'none' }}>{fp.ctaLabel || 'View Full Syllabus'}</a>}
                        <button className="btn btn-secondary">{fp.enrollLabel || 'Enroll for Next Batch'}</button>
                      </div>
                    </div>
                    <div style={{ width: '15rem', height: '15rem', flexShrink: 0, background: 'rgba(99,102,241,0.1)', borderRadius: '1rem', border: '1px solid rgba(99,102,241,0.2)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }} />
                      {fp.image ? (
                        <img src={fp.image} alt={fp.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 10, borderRadius: '1rem' }} />
                      ) : (
                        <Icon name="rocket" size={80} className="text-indigo-400" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            {studentsSection.singleTrackLabel && (
              <h3 className="text-xl mb-8 text-center text-muted">{studentsSection.singleTrackLabel}</h3>
            )}

            <div className="grid-3">
              {(studentsSection.programs || []).map((prog, i) => {
                const tone = TONE_CLASSES[prog.tone] || TONE_CLASSES.cyan;
                return (
                  <div key={i} className="glass-card flex flex-col">
                    <div className="flex justify-between mb-6">
                      <div className={`w-12 h-12 rounded-full ${tone.bg} flex items-center justify-center`}>
                        <Icon name={prog.icon} size={20} className={tone.text} />
                      </div>
                      {prog.badge && (
                        <span className={`${tone.bg} ${tone.text} font-semibold`} style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', height: 'fit-content' }}>{prog.badge}</span>
                      )}
                    </div>
                    <h3 className="text-2xl mb-2">{prog.title}</h3>
                    {prog.formats && (
                      <div className="flex items-center text-xs mb-4 pb-4" style={{ color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', gap: '0.25rem' }}>
                        Formats: {prog.formats.split('•').map((f, j) => (
                          <span key={j}>{j > 0 && <span style={{ margin: '0 0.25rem' }}>•</span>}<strong style={{ color: '#fff' }}>{f.trim()}</strong></span>
                        ))}
                      </div>
                    )}
                    <p className="text-muted text-sm flex-grow mb-6">{prog.description}</p>
                    <button className="btn btn-secondary w-full" style={{ color: tone.text }}>{prog.ctaLabel || 'Apply Now'}</button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{ background: 'rgba(7,10,18,1)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 0 2rem', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="grid-3 mb-12">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                  <Icon name="cpu" size={16} className="text-white" />
                </div>
                <span className="font-bold text-lg" style={{ color: 'white' }}>
                  Touchpointe<span style={{ color: 'var(--primary-light)' }}>.digital</span>
                </span>
              </div>
              {footer.tagline && <p className="text-muted text-sm" style={{ paddingRight: '2rem', marginBottom: '1rem' }}>{footer.tagline}</p>}
              {footer.registrationBadge && (
                <div className="inline-flex items-center gap-2 rounded-full font-medium text-xs text-indigo-400 py-1 px-3" style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
                  <Icon name="award" size={14} />
                  {footer.registrationBadge}
                </div>
              )}
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Programs</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><a href="#smb" className="nav-link text-muted text-sm">SMB Training</a></li>
                <li><a href="#students" className="nav-link text-muted text-sm">Student Programs</a></li>
                <li><a href="#" className="nav-link text-muted text-sm">Corporate Workshops</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Contact</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li className="text-muted text-sm">{footer.email || 'contact@touchpointe.digital'}</li>
                <li className="text-muted text-sm">{footer.phone || '+91 75580999003'}</li>
                <li style={{ marginTop: '1rem' }}>
                  <button className="btn btn-secondary w-full py-2">Get in Touch</button>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p className="text-muted text-xs">{footer.copyright || '© 2026 Touchpointe.digital. All rights reserved.'}</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" className="text-muted text-xs nav-link">Privacy Policy</a>
              <a href="#" className="text-muted text-xs nav-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile nav CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .two-col-layout { grid-template-columns: 1fr !important; }
        }
        .w-full { width: 100%; }
        .flex-grow { flex-grow: 1; }
      `}</style>
    </>
  );
}
