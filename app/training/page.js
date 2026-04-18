import {
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle,
  Cpu,
  Globe,
  Layers,
  LayoutPanelTop,
  Mail,
  MessageSquare,
  Monitor,
  Phone,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { getSiteContent } from '../../lib/content-store';

const iconMap = {
  'bar-chart-3': BarChart3,
  'book-open': BookOpen,
  briefcase: Briefcase,
  calendar: Calendar,
  cpu: Cpu,
  globe: Globe,
  instagram: Globe,
  layers: Layers,
  linkedin: Briefcase,
  'layout-panel-top': LayoutPanelTop,
  'message-square': MessageSquare,
  monitor: Monitor,
  'shield-check': ShieldCheck,
  x: Cpu,
  zap: Zap,
};

function getIcon(name) {
  return iconMap[name] || Cpu;
}

function getToneStyles(tone) {
  const tones = {
    cyan: {
      text: 'var(--secondary)',
      bg: 'var(--secondary-subtle)',
      border: 'rgba(14,165,233,0.2)',
      gradient: 'linear-gradient(135deg,#f0f9ff,#ecfdf5)',
    },
    pink: {
      text: 'var(--accent)',
      bg: 'var(--accent-subtle)',
      border: 'rgba(236,72,153,0.2)',
      gradient: 'linear-gradient(135deg,#fdf2f8,#fce7f3)',
    },
    indigo: {
      text: 'var(--primary)',
      bg: 'var(--primary-subtle)',
      border: 'rgba(79,70,229,0.2)',
      gradient: 'linear-gradient(135deg,#f5f3ff,#eff6ff)',
    },
  };
  return tones[tone] || tones.indigo;
}

function parseKeywords(value) {
  return (value || '')
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

export async function generateMetadata() {
  const content = await getSiteContent();
  const page = content.pages.training;
  const seo = content.site?.seo || {};
  const pageKeywords = parseKeywords(seo.trainingKeywords || seo.siteKeywords);

  return {
    title: page.metadata.title,
    description: page.metadata.description,
    keywords: pageKeywords,
    alternates: { canonical: '/training' },
    openGraph: {
      title: page.metadata.title,
      description: page.metadata.description,
      url: '/training',
    },
    twitter: {
      title: page.metadata.title,
      description: page.metadata.description,
    },
  };
}

export default async function TrainingLandingPage() {
  const content = await getSiteContent();
  const site = content.site;
  const page = content.pages.training;
  const seo = site.seo || {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: page.program.title || page.metadata.title,
    description: page.metadata.description,
    provider: {
      '@type': 'Organization',
      name: site.brand?.name || 'TouchPointe Digital',
      sameAs: siteUrl,
    },
    url: `${siteUrl}/training`,
    image: `${siteUrl}/site-logo.jpeg`,
    keywords: parseKeywords(seo.trainingKeywords || seo.siteKeywords),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode:
        page.program.stats?.find((item) => item.title === 'Mode')?.value || 'Online and offline',
      instructor: {
        '@type': 'Person',
        name: page.trainer?.role || 'Training Team',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', maxWidth: '100vw', background: '#ffffff' }}>

        {/* ════════════════════════════════════════
            NAVBAR - White Sticky
        ════════════════════════════════════════ */}
        <nav id="training-nav" style={{
          position: 'fixed', top: 0, width: '100%', zIndex: 100,
          background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #e2e8f0', boxShadow: '0 2px 20px rgba(15,23,42,0.06)',
          padding: '0.9rem 0',
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
              <div style={{
                width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
                background: site.brand.logoPath ? 'transparent' : 'var(--gradient-brand)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: site.brand.logoPath ? 'none' : '0 4px 12px rgba(79,70,229,0.3)',
                flexShrink: 0
              }}>
                {site.brand.logoPath ? (
                  <img src={site.brand.logoPath} alt="Logo" style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover' }} />
                ) : (
                  <Cpu style={{ width: '18px', height: '18px', color: 'white' }} suppressHydrationWarning />
                )}
              </div>
              <span style={{ fontFamily: 'var(--font-display,sans-serif)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.04em', color: '#0f172a' }}>
                {site.brand.logoTextPrimary}
                <span style={{ background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  {site.brand.logoTextAccent}
                </span>
              </span>
            </Link>

            <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              {page.nav.links.map((link) => (
                <a key={link.href} href={link.href} style={{ textDecoration: 'none', fontWeight: 500, fontSize: '0.92rem', color: '#475569', transition: 'color 0.15s' }}>
                  {link.label}
                </a>
              ))}
              <Link
                href={page.nav.cta.href}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1.5rem', background: 'linear-gradient(135deg,#4f46e5,#0ea5e9)', color: 'white', borderRadius: 9999, fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none', boxShadow: '0 4px 14px rgba(79,70,229,0.3)' }}
              >
                {page.nav.cta.label} <ArrowRight style={{ width: 14, height: 14 }} suppressHydrationWarning />
              </Link>
            </div>
          </div>
        </nav>

        <main style={{ paddingTop: '5rem', overflowX: 'hidden' }}>

          {/* ════════════════════════════════════════
              HERO — Split Layout
          ════════════════════════════════════════ */}
          <section id="hero" style={{
            minHeight: '92vh', display: 'flex', alignItems: 'center',
            background: 'linear-gradient(135deg,#f8fafc 0%,#eff6ff 50%,#f0fdf4 100%)',
            position: 'relative', overflow: 'hidden', padding: '6rem 0 4rem',
          }}>
            {/* Dot grid */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(79,70,229,0.06) 1px,transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '-150px', right: '-100px', width: '600px', height: '600px', background: 'radial-gradient(circle,rgba(79,70,229,0.09) 0%,transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(14,165,233,0.07) 0%,transparent 65%)', pointerEvents: 'none' }} />

            <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
              <div className="two-col-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px,1fr) minmax(280px,1fr)', gap: '4rem', alignItems: 'center' }}>

                {/* Left: Copy */}
                <div>
                  {/* Badge */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.15)', borderRadius: 9999, color: '#4f46e5', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>
                    <span style={{ width: 6, height: 6, background: '#4f46e5', borderRadius: '50%', display: 'inline-block' }} />
                    {page.hero.badge}
                  </div>

                  <h1 style={{ fontSize: 'clamp(2.2rem,4.5vw,3.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.25rem', color: '#0f172a' }}>
                    {page.hero.title.replace(page.hero.highlightedTitle, '').trim()}{' '}
                    <span style={{ background: 'linear-gradient(135deg,#4f46e5,#0ea5e9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                      {page.hero.highlightedTitle}
                    </span>
                  </h1>

                  <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: 520 }}>
                    {page.hero.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link
                      href={page.hero.primaryCta.href}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.85rem', background: 'linear-gradient(135deg,#4f46e5,#0ea5e9)', color: 'white', borderRadius: 9999, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 8px 24px rgba(79,70,229,0.25)' }}
                    >
                      <Zap style={{ width: 18, height: 18 }} suppressHydrationWarning />
                      {page.hero.primaryCta.label}
                    </Link>
                    <Link
                      href={page.hero.secondaryCta.href}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.9rem 1.85rem', background: 'white', color: '#0f172a', border: '1.5px solid #e2e8f0', borderRadius: 9999, fontWeight: 600, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(15,23,42,0.06)' }}
                    >
                      {page.hero.secondaryCta.label}
                    </Link>
                  </div>
                </div>

                {/* Right: Hero Image */}
                <div className="hidden-md-down" style={{ borderRadius: '1.75rem', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 24px 64px rgba(15,23,42,0.1)', position: 'relative', aspectRatio: '4/3' }}>
                  <img
                    src={page.hero.image.src}
                    alt={page.hero.image.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {/* Overlay gradient */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(79,70,229,0.06),transparent)' }} />
                  {/* Floating badge */}
                  <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', border: '1px solid #e2e8f0', borderRadius: '0.875rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 8px 24px rgba(15,23,42,0.1)' }}>
                    <Star style={{ width: 16, height: 16, color: '#f59e0b', fill: '#f59e0b' }} suppressHydrationWarning />
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>Industry-Led Curriculum</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════
              ABOUT SECTION
          ════════════════════════════════════════ */}
          <section id="about" style={{ padding: '6rem 0', background: '#fff' }}>
            <div className="container">
              <div style={{
                background: 'linear-gradient(135deg,#f5f3ff 0%,#eff6ff 100%)',
                border: '1px solid rgba(79,70,229,0.15)', borderRadius: '2rem',
                padding: 'clamp(2rem,5vw,4rem)', boxShadow: '0 8px 40px rgba(79,70,229,0.08)',
              }}>
                <div className="two-col-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '3.5rem', alignItems: 'center' }}>
                  {/* Text */}
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.875rem', background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.15)', borderRadius: 9999, color: '#4f46e5', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
                      {page.about.badge}
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.7rem,3.5vw,2.6rem)', fontWeight: 800, letterSpacing: '-0.025em', textAlign: 'left', marginBottom: '1.25rem', color: '#0f172a' }}>
                      About{' '}
                      <span style={{ background: 'linear-gradient(135deg,#4f46e5,#0ea5e9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                        {page.about.highlightedTitle}
                      </span>
                    </h2>
                    <div style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.8 }}>
                      {page.about.paragraphs.map((p, i) => (
                        <p key={i} style={{ margin: i < page.about.paragraphs.length - 1 ? '0 0 1rem' : 0 }}>{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* Card */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: 'white', border: '1px solid rgba(79,70,229,0.15)', borderRadius: '1.75rem', padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 12px 40px rgba(79,70,229,0.1)', width: '100%', maxWidth: 320 }}>
                      <div style={{ width: '5rem', height: '5rem', borderRadius: '1.25rem', background: 'linear-gradient(135deg,#4f46e5,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 8px 24px rgba(79,70,229,0.3)' }}>
                        <Globe style={{ width: 36, height: 36, color: 'white' }} suppressHydrationWarning />
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>{page.about.card.title}</h3>
                      <p style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.03em' }}>{page.about.card.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════
              HATTI AI SECTION
          ════════════════════════════════════════ */}
          <section id="hatti-ai" style={{ padding: '6rem 0', background: '#f8fafc' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 1rem', background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.15)', borderRadius: 9999, color: '#ec4899', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '1rem' }}>
                  <Sparkles style={{ width: 13, height: 13 }} suppressHydrationWarning />
                  AI-Powered
                </div>
                <h2 style={{ fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.025em', color: '#0f172a', marginBottom: '1rem' }}>
                  Introducing{' '}
                  <span style={{ background: 'linear-gradient(135deg,#4f46e5,#0ea5e9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                    {page.hattiAi.highlightedTitle}
                  </span>
                </h2>
                <p style={{ fontSize: '1.1rem', color: '#475569', maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
                  {page.hattiAi.subtitle}
                </p>
              </div>

              <div style={{ background: 'white', border: '1px solid rgba(236,72,153,0.15)', borderRadius: '2rem', padding: 'clamp(2rem,5vw,4rem)', boxShadow: '0 8px 40px rgba(236,72,153,0.07)', marginBottom: '3rem' }}>
                <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#475569', maxWidth: 760, margin: '0 auto 3rem', lineHeight: 1.78 }}>
                  {page.hattiAi.description}
                </p>

                <div className="grid-3" style={{ gap: '1.5rem' }}>
                  {page.hattiAi.features.map((feature) => {
                    const FeatureIcon = getIcon(feature.icon);
                    const tone = getToneStyles(feature.tone);

                    return (
                      <div key={feature.title} style={{
                        background: tone.gradient,
                        border: `1px solid ${tone.border}`,
                        borderRadius: '1.25rem',
                        padding: '2rem 1.5rem',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                        transition: 'all 0.25s',
                        ...(feature.featured ? { transform: 'translateY(-8px)', boxShadow: '0 16px 48px rgba(79,70,229,0.12)' } : {}),
                      }}>
                        <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '1rem', background: tone.bg, color: tone.text, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                          <FeatureIcon style={{ width: 28, height: 28 }} suppressHydrationWarning />
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem' }}>{feature.title}</h3>
                        <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════
              PROGRAM SECTION (Stats + Learn Items)
          ════════════════════════════════════════ */}
          <section id="program" style={{ padding: '6rem 0', background: '#fff' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 1rem', background: 'var(--secondary-subtle)', border: '1px solid rgba(14,165,233,0.15)', borderRadius: 9999, color: 'var(--secondary)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '1rem' }}>
                  {page.program.badge}
                </div>
                <h2 style={{ fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 800, letterSpacing: '-0.025em', color: '#0f172a', marginBottom: '0.5rem' }}>
                  AI{' '}
                  <span style={{ background: 'linear-gradient(135deg,#4f46e5,#0ea5e9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                    {page.program.highlightedTitle}
                  </span>
                </h2>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.25rem', marginBottom: '4.5rem' }}>
                {page.program.stats.map((stat) => {
                  const StatIcon = getIcon(stat.icon);
                  const tone = getToneStyles(stat.tone);
                  return (
                    <div key={stat.title} style={{ background: tone.gradient, border: `1px solid ${tone.border}`, borderRadius: '1.25rem', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}>
                      <StatIcon style={{ width: 32, height: 32, color: tone.text, marginBottom: '0.875rem' }} suppressHydrationWarning />
                      <h4 style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{stat.title}</h4>
                      <span style={{ color: tone.text, fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.2 }}>{stat.value}</span>
                    </div>
                  );
                })}
              </div>

              {/* Learn Items */}
              <h3 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: '#0f172a', marginBottom: '2rem' }}>
                {page.program.learnTitle}
              </h3>
              <div className="grid-2" style={{ gap: '1.25rem' }}>
                {page.program.learnItems.map((item) => {
                  const ItemIcon = getIcon(item.icon);
                  const tone = getToneStyles(item.tone);
                  return (
                    <div key={item.title} style={{ background: 'white', border: `1px solid ${tone.border}`, borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1.25rem', boxShadow: '0 2px 8px rgba(15,23,42,0.04)', transition: 'all 0.25s' }}>
                      <div style={{ width: '3rem', height: '3rem', borderRadius: '0.875rem', background: tone.bg, color: tone.text, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <ItemIcon style={{ width: 24, height: 24 }} suppressHydrationWarning />
                      </div>
                      <div>
                        <h4 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem', fontSize: '1rem' }}>{item.title}</h4>
                        <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════
              TRAINER SECTION
          ════════════════════════════════════════ */}
          <section id="trainer" style={{ padding: '6rem 0', background: '#f8fafc' }}>
            <div className="container">
              <div style={{ background: 'white', border: '1px solid rgba(79,70,229,0.12)', borderRadius: '2rem', padding: 'clamp(2rem,5vw,4rem)', boxShadow: '0 8px 40px rgba(15,23,42,0.06)' }}>
                <div className="two-col-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px,280px) 1fr', gap: '3.5rem', alignItems: 'center' }}>

                  {/* Trainer image */}
                  <div style={{ borderRadius: '1.75rem', overflow: 'hidden', border: '2px solid rgba(79,70,229,0.15)', boxShadow: '0 16px 48px rgba(15,23,42,0.1)', position: 'relative', width: '100%', maxWidth: 280, margin: '0 auto', aspectRatio: '1' }}>
                    <img src={page.trainer.image.src} alt={page.trainer.image.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(15,23,42,0.65) 0%,transparent 50%)' }} />
                    <div style={{ position: 'absolute', bottom: '0.875rem', left: '0.875rem', right: '0.875rem', color: 'white', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.85 }}>
                      {page.trainer.image.note}
                    </div>
                  </div>

                  {/* Trainer info */}
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', padding: '0.3rem 0.875rem', background: 'rgba(79,70,229,0.08)', border: '1px solid rgba(79,70,229,0.15)', borderRadius: 9999, color: '#4f46e5', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
                      {page.trainer.badge}
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.7rem,3.5vw,2.5rem)', fontWeight: 800, letterSpacing: '-0.025em', textAlign: 'left', marginBottom: '0.75rem', color: '#0f172a' }}>
                      Meet Your{' '}
                      <span style={{ background: 'linear-gradient(135deg,#4f46e5,#0ea5e9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                        {page.trainer.highlightedTitle}
                      </span>
                    </h2>
                    <p style={{ color: '#6366f1', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', letterSpacing: '0.01em' }}>{page.trainer.role}</p>
                    <p style={{ color: '#475569', fontSize: '0.97rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>{page.trainer.description}</p>

                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0 }}>
                      {page.trainer.points.map((point) => (
                        <li key={point} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0f172a', fontWeight: 500, fontSize: '0.95rem' }}>
                          <CheckCircle style={{ width: 18, height: 18, color: '#10b981', flexShrink: 0 }} suppressHydrationWarning />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════
              CTA SECTION
          ════════════════════════════════════════ */}
          <section id="register" style={{ padding: '6rem 0', background: '#fff' }}>
            <div className="container">
              <div style={{ background: 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#0ea5e9 100%)', borderRadius: '2rem', padding: 'clamp(3rem,6vw,5rem) 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 60px rgba(79,70,229,0.3)' }}>
                {/* Shine overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(255,255,255,0.08),transparent)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', background: 'radial-gradient(circle,rgba(255,255,255,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 1rem', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 9999, color: 'white', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '1.25rem', backdropFilter: 'blur(8px)' }}>
                    <Sparkles style={{ width: 13, height: 13 }} suppressHydrationWarning />
                    Limited Seats
                  </div>
                  <h2 style={{ color: 'white', fontSize: 'clamp(1.9rem,4vw,3rem)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.025em' }}>{page.cta.title}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 640, margin: '0 auto 2.5rem', fontSize: '1.1rem', lineHeight: 1.7 }}>
                    {page.cta.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link href={page.cta.secondary.href} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.9rem 2rem', background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: 9999, fontWeight: 600, fontSize: '1rem', textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
                      {page.cta.secondary.label}
                    </Link>
                    <Link href={page.cta.primary.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem', background: 'white', color: '#4f46e5', borderRadius: 9999, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
                      <Zap style={{ width: 18, height: 18 }} suppressHydrationWarning />
                      {page.cta.primary.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════ */}
        <footer style={{ background: '#0f172a', paddingTop: '5rem', paddingBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
          {/* Top gradient line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg,#4f46e5,#0ea5e9)' }} />
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
              {/* Brand */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
                    background: site.brand.logoPath ? 'transparent' : 'var(--gradient-brand)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: site.brand.logoPath ? 'none' : '0 4px 12px rgba(79,70,229,0.4)',
                    flexShrink: 0
                  }}>
                    {site.brand.logoPath ? (
                      <img src={site.brand.logoPath} alt="Logo" style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover' }} />
                    ) : (
                      <Cpu style={{ width: '16px', height: '16px', color: 'white' }} suppressHydrationWarning />
                    )}
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.03em', color: 'white' }}>
                    {site.brand.logoTextPrimary}
                    <span style={{ background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                      {site.brand.logoTextAccent}
                    </span>
                  </span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  {page.footer.description}
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 style={{ color: 'white', marginBottom: '1.25rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quick Links</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0 }}>
                  {page.footer.quickLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.15s' }}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 style={{ color: 'white', marginBottom: '1.25rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Contact</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                    <Mail style={{ width: 14, height: 14, flexShrink: 0 }} suppressHydrationWarning />
                    {site.contact.email}
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
                    <Phone style={{ width: 14, height: 14, flexShrink: 0 }} suppressHydrationWarning />
                    {site.contact.phone}
                  </li>
                  <li style={{ marginTop: '0.5rem', display: 'flex', gap: '0.875rem' }}>
                    {site.socialLinks.map((social) => {
                      const SocialIcon = getIcon(social.icon);
                      return (
                        <a key={social.label} href={social.href} aria-label={social.label} style={{ color: 'rgba(255,255,255,0.45)', display: 'inline-flex', transition: 'color 0.15s' }}>
                          <SocialIcon style={{ width: 18, height: 18 }} suppressHydrationWarning />
                        </a>
                      );
                    })}
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem' }}>
                © {new Date().getFullYear()} {site.brand.name}. All rights reserved.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a href={site.legal.privacyHref} style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem', textDecoration: 'none' }}>{site.legal.privacyLabel}</a>
                <a href={site.legal.termsHref} style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem', textDecoration: 'none' }}>{site.legal.termsLabel}</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .hidden-md-down { display: none !important; }
          .two-col-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1024px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
