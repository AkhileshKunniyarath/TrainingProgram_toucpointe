'use client';
import { useEffect } from 'react';

/* ── Shared nav logo SVG ── */
function CpuIcon({ size = 20, color = 'white' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function SiteNav({ brand }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 100,
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid #e2e8f0', boxShadow: '0 2px 20px rgba(15,23,42,0.06)',
      padding: '0.9rem 0',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{
            width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem',
            background: brand?.logoPath ? 'transparent' : 'var(--gradient-brand)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: brand?.logoPath ? 'none' : '0 4px 12px rgba(79,70,229,0.3)'
          }}>
            {brand?.logoPath ? (
              <img src={brand.logoPath} alt="Logo" style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover' }} />
            ) : (
              <CpuIcon size={16} />
            )}
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
            {brand?.logoTextPrimary || 'Touchpointe'}
            <span style={{ background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              {brand?.logoTextAccent || '.digital'}
            </span>
          </span>
        </a>
        <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="/#why-train" className="nav-link">Why Train?</a>
          <a href="/#smb" className="nav-link">Business Programs</a>
          <a href="/#students" className="nav-link">Student Programs</a>
          <a href="/" className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>Enroll Now</a>
        </div>
      </div>
    </nav>
  );
}

function SiteFooter({ brand }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
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
                  <CpuIcon size={15} />
                )}
              </div>
              <span className="footer-brand-text">
                {brand?.logoTextPrimary || 'Touchpointe'}
                <span style={{ background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  {brand?.logoTextAccent || '.digital'}
                </span>
              </span>
            </div>
            <p className="footer-tagline">
              Transforming businesses and launching careers through advanced training in AI, Cybersecurity, and Digital Marketing.
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Programs</h4>
            <ul className="footer-links">
              <li><a href="/#smb">SMB Training</a></li>
              <li><a href="/#students">Student Programs</a></li>
              <li><a href="#">Corporate Workshops</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              <li><span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>contact@touchpointe.digital</span></li>
              <li><span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>+91 75580 99003</span></li>
              <li style={{ marginTop: '1rem' }}>
                <button className="btn" style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.12)', color: 'white', fontSize: '0.88rem', padding: '0.6rem 1.25rem', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: 9999 }}>
                  Get in Touch
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">© 2026 Touchpointe.digital. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function SyllabusPageContent({ data, brand }) {
  const d = data || {};
  const week1 = d.week1 || {};
  const week2 = d.week2 || {};

  useScrollReveal();

  /* ── Week Header ── */
  const WeekHeader = ({ heading, tone = 'indigo' }) => {
    const isIndigo = tone === 'indigo';
    return (
      <div data-reveal="up" style={{
        textAlign: 'center', margin: '3.5rem 0 2.5rem',
        padding: '2.5rem 2rem',
        background: isIndigo
          ? 'linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%)'
          : 'linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%)',
        borderRadius: '1.25rem',
        border: `1px solid ${isIndigo ? 'rgba(79,70,229,0.15)' : 'rgba(14,165,233,0.15)'}`,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.3rem 0.875rem', borderRadius: 9999,
          background: isIndigo ? 'var(--primary-subtle)' : 'var(--secondary-subtle)',
          color: isIndigo ? 'var(--primary)' : 'var(--secondary)',
          fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase', marginBottom: '0.75rem',
        }}>
          {isIndigo ? 'Week 1' : 'Week 2'}
        </div>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800,
          color: 'var(--text-primary)', margin: 0, lineHeight: 1.2,
          background: isIndigo ? 'var(--gradient-brand)' : 'linear-gradient(135deg,#0ea5e9,#10b981)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
        }}>
          {heading}
        </h2>
      </div>
    );
  };

  /* ── Timeline Day Card ── */
  const TimelineDay = ({ day, tone = 'indigo', index = 0 }) => {
    const isIndigo = tone === 'indigo';
    const accentColor = isIndigo ? 'var(--primary)' : 'var(--secondary)';
    const accentBg = isIndigo ? 'var(--primary-subtle)' : 'var(--secondary-subtle)';

    return (
      <div data-reveal="left" data-reveal-delay={String(index * 100)} style={{ position: 'relative', marginBottom: '2rem' }}>
        {/* Timeline dot */}
        <div style={{
          position: 'absolute', left: '-2.25rem', top: '1.5rem',
          width: '0.875rem', height: '0.875rem', borderRadius: '50%',
          background: isIndigo ? 'var(--gradient-brand)' : 'linear-gradient(135deg,#0ea5e9,#10b981)',
          border: '3px solid white', boxShadow: `0 0 0 2px ${isIndigo ? 'rgba(79,70,229,0.2)' : 'rgba(14,165,233,0.2)'}`,
        }} />

        {/* Card */}
        <div style={{
          background: 'white', border: '1px solid var(--border-color)',
          borderRadius: '1.25rem', padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all 0.25s',
        }}>
          {/* Day heading */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem', background: accentBg, color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 800 }}>
              D{index + 1}
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
              {day.title}
            </h3>
          </div>

          {/* Slots */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {(day.slots || []).map((slot, si) =>
              slot.isBreak ? (
                <div key={si} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', background: 'var(--bg-tertiary)' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', minWidth: 80, textAlign: 'center', background: 'white', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border-color)' }}>
                    {slot.time}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Break</span>
                </div>
              ) : (
                <div key={si} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.65rem 0.875rem', borderRadius: '0.6rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: accentColor, background: accentBg, minWidth: 80, textAlign: 'center', padding: '0.25rem 0.4rem', borderRadius: '0.3rem', flexShrink: 0, marginTop: '1px' }}>
                    {slot.time}
                  </span>
                  <div style={{ fontSize: '0.88rem', lineHeight: 1.55, color: 'var(--text-secondary)' }}>
                    {slot.heading && <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{slot.heading} </strong>}
                    {slot.detail}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <SiteNav brand={brand} />

      <main style={{ paddingTop: '5rem', paddingBottom: '5rem', background: 'var(--bg-secondary)', minHeight: '100vh' }}>
        <div className="container">
          {/* Page Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', paddingTop: '2.5rem' }}>
            {d.badge && (
              <div data-reveal="fade" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', background: 'var(--primary-subtle)', border: '1px solid rgba(79,70,229,0.15)', borderRadius: 9999, color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                {d.badge}
              </div>
            )}
            <h1 data-reveal="up" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              {d.heading || 'Official'}{' '}
              <span style={{ background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                {d.headingHighlight || 'Syllabus'}
              </span>
            </h1>
            {d.subtitle && (
              <p data-reveal="up" data-reveal-delay="100" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
                {d.subtitle}
              </p>
            )}

            {/* Quick tags */}
            <div data-reveal="up" data-reveal-delay="200" style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
              {['2-Week Intensive', 'Hands-On Projects', 'Certificate Included', 'Live Sessions'].map((tag) => (
                <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.875rem', background: 'white', border: '1px solid var(--border-color)', borderRadius: 9999, fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', boxShadow: 'var(--shadow-xs)' }}>
                  <span style={{ color: 'var(--success)', display: 'inline-flex' }}><CheckIcon /></span>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Week 1 */}
          {week1.heading && <WeekHeader heading={week1.heading} tone="indigo" />}
          <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto 1rem', paddingLeft: '2rem', borderLeft: '2px solid rgba(79,70,229,0.2)' }}>
            {(week1.days || []).map((day, i) => (
              <TimelineDay key={i} day={day} tone="indigo" index={i} />
            ))}
          </div>

          {/* Week 2 */}
          {week2.heading && <WeekHeader heading={week2.heading} tone="cyan" />}
          <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto 1rem', paddingLeft: '2rem', borderLeft: '2px solid rgba(14,165,233,0.2)' }}>
            {(week2.days || []).map((day, i) => (
              <TimelineDay key={i} day={day} tone="cyan" index={i} />
            ))}
          </div>

          {/* Back link */}
          <div data-reveal="up" style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <a href="/" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft /> Back to Home
            </a>
          </div>
        </div>
      </main>

      <SiteFooter brand={brand} />

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}
