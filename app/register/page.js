import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Cpu,
  GraduationCap,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import { getSiteContent } from '../../lib/content-store';
import RegistrationForm from '../../components/RegistrationForm';

const statIconMap = {
  'book-open': BookOpen,
  'calendar-days': CalendarDays,
  'graduation-cap': GraduationCap,
};

const commitmentIcons = [CheckCircle2, ShieldCheck, Sparkles];

function parseKeywords(value) {
  return (value || '')
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

export async function generateMetadata() {
  const content = await getSiteContent();
  const page = content.pages.register;
  const seo = content.site?.seo || {};
  const pageKeywords = parseKeywords(seo.registerKeywords || seo.siteKeywords);

  return {
    title: page.metadata.title,
    description: page.intro.description,
    keywords: pageKeywords,
    alternates: {
      canonical: '/register',
    },
    openGraph: {
      title: page.metadata.title,
      description: page.intro.description,
      url: '/register',
    },
    twitter: {
      title: page.metadata.title,
      description: page.intro.description,
    },
  };
}

export default async function RegisterPage() {
  const content = await getSiteContent();
  const site = content.site;
  const page = content.pages.register;
  const seo = site.seo || {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const registerSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.metadata.title,
    description: page.intro.description,
    url: `${siteUrl}/register`,
    keywords: parseKeywords(seo.registerKeywords || seo.siteKeywords),
    potentialAction: {
      '@type': 'RegisterAction',
      target: `${siteUrl}/register`,
      name: page.form.submitLabel,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(registerSchema) }}
      />
      <div className="registration-page-shell" style={{ backgroundColor: '#fff', color: 'var(--text-primary)', minHeight: '100vh' }}>
        {/* Subtle decorative blobs for the light theme */}
        <div className="bg-glow-blob" style={{ position: 'fixed', top: '-10%', right: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(79,70,229,0.05) 0%, transparent 70%)', zIndex: 0 }}></div>
        <div className="bg-glow-blob" style={{ position: 'fixed', bottom: '-10%', left: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)', zIndex: 0 }}></div>

      <nav
        id="navbar"
        className="nav-scrolled"
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 100,
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-color)',
          transition: 'all 0.3s ease',
          padding: '1rem 0',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <div style={{
              width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
              background: site.brand.logoPath ? 'transparent' : 'var(--gradient-brand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: site.brand.logoPath ? 'none' : '0 4px 12px rgba(79,70,229,0.2)',
              flexShrink: 0
            }}>
              {site.brand.logoPath ? (
                <img src={site.brand.logoPath} alt="Logo" style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover' }} />
              ) : (
                <Cpu className="text-white" style={{ width: '20px', height: '20px' }} suppressHydrationWarning />
              )}
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
              {site.brand.logoTextPrimary}
              <span style={{ background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                {site.brand.logoTextAccent}
              </span>
            </span>
          </Link>
          <div className="desktop-menu">
            <Link href={page.nav.backHref} className="nav-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>
              <ArrowLeft suppressHydrationWarning style={{ width: '16px', height: '16px' }} /> {page.nav.backLabel}
            </Link>
          </div>
        </div>
      </nav>

        <main className="registration-main" style={{ paddingTop: '8rem', paddingBottom: '6rem', position: 'relative', zIndex: 1 }}>
        <div className="container registration-layout">
          <section className="registration-intro animate-fade-in">
            <div style={{ display: 'inline-flex', padding: '0.4rem 1rem', background: 'var(--primary-subtle)', borderRadius: 9999, color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              {page.intro.badge}
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.1 }}>{page.intro.title}</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2.5rem' }}>{page.intro.description}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              {page.intro.highlights.map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  <div style={{ color: 'var(--success)', display: 'flex' }}>
                    <CheckCircle2 suppressHydrationWarning style={{ width: '20px', height: '20px' }} />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="registration-stats-grid">
              {page.intro.stats.map((stat) => {
                const Icon = statIconMap[stat.icon] || BookOpen;

                return (
                  <div key={stat.title} style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Icon suppressHydrationWarning style={{ width: '18px', height: '18px' }} />
                    </div>
                    <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{stat.title}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{stat.description}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="registration-form-card animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '1rem', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(79,70,229,0.2)' }}>
                <UserPlus suppressHydrationWarning className="text-white" style={{ width: '24px', height: '24px' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', marginBottom: '0.25rem' }}>{page.form.eyebrow}</p>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{page.form.title}</h2>
              </div>
            </div>

            <RegistrationForm page={page} />
            
            <p style={{ fontSize: '0.75rem', textAlign: 'center', color: 'var(--text-muted)', lineHeight: '1.6', marginTop: '2rem' }}>
              By enrolling, you agree to our{' '}
              <a href={site.legal.termsHref} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                {site.legal.termsLabel}
              </a>{' '}
              and{' '}
              <a href={site.legal.privacyHref} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                {site.legal.privacyLabel}
              </a>
              .
            </p>
          </section>
        </div>
        </main>
      </div>
    </>
  );
}
