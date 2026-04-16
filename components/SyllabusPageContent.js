export default function SyllabusPageContent({ data }) {
  const d = data || {};
  const week1 = d.week1 || {};
  const week2 = d.week2 || {};

  const TimelineDay = ({ day, tone = 'indigo' }) => {
    const badgeBg = tone === 'cyan'
      ? 'rgba(6,182,212,0.1)'
      : tone === 'pink'
      ? 'rgba(236,72,153,0.1)'
      : 'rgba(99,102,241,0.1)';
    const badgeColor = tone === 'cyan'
      ? 'rgb(34,211,238)'
      : tone === 'pink'
      ? 'rgb(244,114,182)'
      : 'rgb(129,140,248)';
    const dotBg = 'var(--gradient-primary)';

    return (
      <div style={{ position: 'relative', marginBottom: '3rem' }}>
        {/* Timeline dot */}
        <div style={{ position: 'absolute', left: '-2.7rem', top: 0, width: '1.25rem', height: '1.25rem', borderRadius: '50%', background: dotBg, border: '4px solid var(--bg-color)' }} />

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 className="text-2xl mb-4 text-white">{day.title}</h3>
          {(day.slots || []).map((slot, si) => (
            slot.isBreak ? (
              <div key={si} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'flex-start', padding: '0.75rem', borderRadius: '0.5rem', background: 'transparent', border: '1px solid transparent' }}>
                <div style={{ flexShrink: 0, background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600, minWidth: 90, textAlign: 'center' }}>
                  {slot.time}
                </div>
                <div className="text-muted">Break</div>
              </div>
            ) : (
              <div key={si} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'flex-start', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ flexShrink: 0, background: badgeBg, color: badgeColor, padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600, minWidth: 90, textAlign: 'center' }}>
                  {slot.time}
                </div>
                <div>
                  {slot.heading && <strong className="text-white">{slot.heading} </strong>}
                  {slot.detail}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    );
  };

  const WeekHeader = ({ heading, tone = 'indigo' }) => {
    const color = tone === 'cyan' ? 'rgb(34,211,238)' : tone === 'pink' ? 'rgb(244,114,182)' : 'rgb(129,140,248)';
    const bg = tone === 'cyan'
      ? 'linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent)'
      : 'linear-gradient(90deg, transparent, rgba(99,102,241,0.1), transparent)';
    return (
      <div style={{ textAlign: 'center', padding: '2rem 0', margin: '3rem 0', background: bg, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 style={{ fontSize: '1.875rem', color, margin: 0 }}>{heading}</h2>
      </div>
    );
  };

  return (
    <>
      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, padding: '1.5rem 0', backgroundColor: 'rgba(11,15,25,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container flex justify-between items-center">
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 14px rgba(99,102,241,0.2)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
                <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
                <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
              </svg>
            </div>
            <span className="font-bold text-xl text-white" style={{ letterSpacing: '-0.05em' }}>
              Touchpointe<span style={{ color: 'var(--primary-light)' }}>.digital</span>
            </span>
          </a>
          <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <a href="/#why-train" className="nav-link" style={{ textDecoration: 'none' }}>Why Train?</a>
            <a href="/#smb" className="nav-link" style={{ textDecoration: 'none' }}>Business Programs</a>
            <a href="/#students" className="nav-link" style={{ textDecoration: 'none' }}>Student Programs</a>
            <a href="/" className="btn btn-primary text-sm" style={{ padding: '0.5rem 1.5rem', textDecoration: 'none' }}>Enroll Now</a>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            {d.badge && (
              <div className="inline-flex items-center gap-2 rounded-full font-medium text-sm mb-4 text-indigo-400 py-2 px-4" style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
                {d.badge}
              </div>
            )}
            <h1 className="mb-4">
              {d.heading || 'Official'} <span className="text-gradient">{d.headingHighlight || 'Syllabus'}</span>
            </h1>
            {d.subtitle && <p className="subtitle">{d.subtitle}</p>}
          </div>

          {/* Week 1 */}
          {week1.heading && <WeekHeader heading={week1.heading} tone="indigo" />}
          <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', paddingLeft: '2rem', borderLeft: '2px solid rgba(99,102,241,0.3)' }}>
            {(week1.days || []).map((day, i) => (
              <TimelineDay key={i} day={day} tone="indigo" />
            ))}
          </div>

          {/* Week 2 */}
          {week2.heading && <WeekHeader heading={week2.heading} tone="cyan" />}
          <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', paddingLeft: '2rem', borderLeft: '2px solid rgba(6,182,212,0.3)' }}>
            {(week2.days || []).map((day, i) => (
              <TimelineDay key={i} day={day} tone="cyan" />
            ))}
          </div>

          {/* Back link */}
          <div className="text-center mt-16">
            <a href="/" className="btn btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Home
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: 'rgba(7,10,18,1)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 0 2rem', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="grid-3 mb-12">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
                    <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
                    <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
                  </svg>
                </div>
                <span className="font-bold text-lg" style={{ color: 'white' }}>Touchpointe<span style={{ color: 'var(--primary-light)' }}>.digital</span></span>
              </div>
              <p className="text-muted text-sm" style={{ paddingRight: '2rem' }}>
                Transforming businesses and launching careers through advanced training in AI, Cybersecurity, and Digital Marketing.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Programs</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><a href="/#smb" className="nav-link text-muted text-sm" style={{ textDecoration: 'none' }}>SMB Training</a></li>
                <li><a href="/#students" className="nav-link text-muted text-sm" style={{ textDecoration: 'none' }}>Student Programs</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Contact</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li className="text-muted text-sm">contact@touchpointe.digital</li>
                <li className="text-muted text-sm">+91 75580999003</li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', textAlign: 'center' }}>
            <p className="text-muted text-xs">© 2026 Touchpointe.digital.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}
