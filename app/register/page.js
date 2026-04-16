import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Cpu,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import { getSiteContent } from '../../lib/content-store';

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

function renderField(field) {
  const commonProps = {
    id: field.id,
    className: `form-input registration-input${field.type === 'select' ? ' registration-select' : ''}${field.type === 'textarea' ? ' registration-textarea' : ''}`,
    placeholder: field.placeholder,
    required: Boolean(field.required),
  };

  if (field.type === 'select') {
    return (
      <select {...commonProps} defaultValue="">
        <option value="">Select {field.label.toLowerCase()}</option>
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'textarea') {
    return <textarea {...commonProps} rows={field.rows || 4}></textarea>;
  }

  return (
    <input
      {...commonProps}
      type={field.type || 'text'}
      min={field.min}
      max={field.max}
    />
  );
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
      <div className="registration-page-shell">
        <div className="bg-glow-blob blob-top-right"></div>
        <div className="bg-glow-blob blob-bottom-left" style={{ bottom: '8%', left: '8%' }}></div>

      <nav
        id="navbar"
        className="nav-scrolled"
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 100,
          transition: 'all 0.3s ease',
          padding: '1rem 0',
        }}
      >
        <div className="container flex justify-between items-center">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 14px rgba(99,102,241,0.2)' }}>
              <Cpu className="text-white" style={{ width: '20px', height: '20px' }} suppressHydrationWarning />
            </div>
            <span className="font-bold text-xl text-white" style={{ letterSpacing: '-0.05em' }}>
              {site.brand.logoTextPrimary}
              <span style={{ color: 'var(--primary-light)' }}>{site.brand.logoTextAccent}</span>
            </span>
          </Link>
          <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link href={page.nav.backHref} className="nav-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ArrowLeft suppressHydrationWarning style={{ width: '16px', height: '16px' }} /> {page.nav.backLabel}
            </Link>
          </div>
        </div>
      </nav>

        <main className="registration-main">
        <div className="container registration-layout">
          <section className="registration-intro animate-fade-in">
            <div className="registration-badge">
              <span>{page.intro.badge}</span>
            </div>
            <h1 className="registration-title">{page.intro.title}</h1>
            <p className="registration-copy">{page.intro.description}</p>

            <div className="registration-highlight-list">
              {page.intro.highlights.map((item) => (
                <div key={item} className="registration-highlight-item">
                  <CheckCircle2 suppressHydrationWarning style={{ width: '18px', height: '18px' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="registration-stat-row">
              {page.intro.stats.map((stat) => {
                const Icon = statIconMap[stat.icon] || BookOpen;

                return (
                  <div key={stat.title} className="registration-stat-card">
                    <div className="registration-stat-icon">
                      <Icon suppressHydrationWarning />
                    </div>
                    <strong>{stat.title}</strong>
                    <span>{stat.description}</span>
                  </div>
                );
              })}
            </div>
          </section>

          <section
            className="glass-card animate-fade-in registration-form-card"
            style={{
              border: '1px solid rgba(99,102,241,0.35)',
              boxShadow: '0 24px 70px rgba(0,0,0,0.45)',
              background: 'linear-gradient(180deg, rgba(15,23,42,0.92) 0%, rgba(9,14,24,0.9) 100%)',
            }}
          >
            <div className="registration-form-header">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)', boxShadow: '0 10px 30px rgba(99,102,241,0.3)' }}>
                <UserPlus suppressHydrationWarning className="text-white" style={{ width: '30px', height: '30px' }} />
              </div>
              <div>
                <p className="registration-eyebrow">{page.form.eyebrow}</p>
                <h2 className="registration-form-title">{page.form.title}</h2>
                <p className="text-muted">{page.form.description}</p>
              </div>
            </div>

            <form className="registration-form-grid">
              {page.form.sections.map((section) => (
                <div key={section.title} className="registration-section">
                  <div className="registration-section-heading">
                    <h3>{section.title}</h3>
                    <p className="text-muted">{section.description}</p>
                  </div>
                  <div className="registration-fields two-column-fields">
                    {section.fields.map((field) => (
                      <div
                        key={field.id}
                        className={`registration-field${field.fullWidth ? ' full-width-field' : ''}`}
                      >
                        <label htmlFor={field.id}>{field.label}</label>
                        {renderField(field)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="registration-commitments">
                {page.form.commitments.map((commitment, index) => {
                  const Icon = commitmentIcons[index] || CheckCircle2;

                  return (
                    <div key={commitment} className="registration-commitment-item">
                      <Icon suppressHydrationWarning style={{ width: '18px', height: '18px' }} />
                      <span>{commitment}</span>
                    </div>
                  );
                })}
              </div>

              <button type="submit" className="btn btn-primary registration-submit">
                {page.form.submitLabel}{' '}
                <ArrowRight suppressHydrationWarning style={{ width: '18px', height: '18px' }} />
              </button>
              <p className="text-xs text-center text-muted" style={{ lineHeight: '1.6' }}>
                By registering, you agree to our{' '}
                <a href={site.legal.termsHref} style={{ color: 'var(--primary-light)' }}>
                  {site.legal.termsLabel}
                </a>{' '}
                and{' '}
                <a href={site.legal.privacyHref} style={{ color: 'var(--primary-light)' }}>
                  {site.legal.privacyLabel}
                </a>
                .
              </p>
            </form>
          </section>
        </div>
        </main>
      </div>
    </>
  );
}
