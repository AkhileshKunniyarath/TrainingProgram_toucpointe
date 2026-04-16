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
      text: 'var(--secondary-light)',
      bg: 'rgba(6,182,212,0.18)',
      card: 'rgba(6,182,212,0.05)',
      border: 'rgba(6,182,212,0.2)',
    },
    pink: {
      text: 'rgb(244, 114, 182)',
      bg: 'rgba(236,72,153,0.18)',
      card: 'rgba(236,72,153,0.05)',
      border: 'rgba(236,72,153,0.2)',
    },
    indigo: {
      text: 'var(--primary-light)',
      bg: 'rgba(99,102,241,0.18)',
      card: 'rgba(99,102,241,0.05)',
      border: 'rgba(99,102,241,0.2)',
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
    alternates: {
      canonical: '/training',
    },
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
      courseMode: page.program.stats?.find((item) => item.title === 'Mode')?.value || 'Online and offline',
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
      <div style={{ overflowX: 'hidden', position: 'relative', width: '100%', maxWidth: '100vw' }}>
        <div className="bg-glow-blob blob-top-right"></div>
        <div className="bg-glow-blob blob-bottom-left" style={{ bottom: '10%', left: '10%' }}></div>

        <nav id="navbar" className="nav-scrolled" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, transition: 'all 0.3s ease', padding: '1rem 0' }}>
          <div className="container flex justify-between items-center" style={{ width: '100%' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 14px rgba(99,102,241,0.2)' }}>
                <Cpu className="text-white" style={{ width: '20px', height: '20px' }} suppressHydrationWarning />
              </div>
              <span className="font-bold text-xl text-white" style={{ letterSpacing: '-0.05em' }}>
                {site.brand.logoTextPrimary}
                <span style={{ color: 'var(--primary-light)' }}>{site.brand.logoTextAccent}</span>
              </span>
            </Link>

            <div className="desktop-menu flex items-center" style={{ gap: '2.5rem' }}>
              {page.nav.links.map((link) => (
                <a key={link.href} href={link.href} className="nav-link" style={{ textDecoration: 'none', fontWeight: '500' }}>
                  {link.label}
                </a>
              ))}
              <Link href={page.nav.cta.href} className="btn btn-primary text-sm shadow-none" style={{ padding: '0.6rem 1.8rem', textDecoration: 'none', borderRadius: '8px' }}>
                {page.nav.cta.label}
              </Link>
            </div>
          </div>
        </nav>

        <main style={{ paddingTop: '8rem', paddingBottom: '4rem', overflowX: 'hidden' }}>
        <section id="hero" className="section relative" style={{ minHeight: '90vh', padding: '4rem 0', display: 'flex', alignItems: 'center' }}>
          <div className="container relative" style={{ zIndex: 10, width: '100%' }}>
            <div className="two-col-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '4rem', alignItems: 'center' }}>
              <div className="text-left">
                <div className="animate-fade-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', borderRadius: '9999px', fontWeight: '600', fontSize: '0.8rem', marginBottom: '1.5rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', color: 'rgb(129, 140, 248)', padding: '0.5rem 1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <div style={{ width: '8px', height: '8px', background: 'rgba(99,102,241,1)', borderRadius: '50%' }} className="animate-pulse"></div>
                  {page.hero.badge}
                </div>

                <h1 className="mb-6 animate-fade-in text-white" style={{ animationDelay: '0.1s', lineHeight: '1.15', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800' }}>
                  {page.hero.title.replace(page.hero.highlightedTitle, '').trim()} <br />
                  <span className="text-gradient animate-pulse-glow" style={{ display: 'inline-block', filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.3))' }}>
                    {page.hero.highlightedTitle}
                  </span>
                </h1>

                <p className="subtitle animate-fade-in text-left text-white" style={{ animationDelay: '0.2s', fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)', margin: '0 0 2.5rem 0', maxWidth: '600px', lineHeight: '1.6' }}>
                  {page.hero.description}
                </p>

                <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s', flexWrap: 'wrap' }}>
                  <Link href={page.hero.secondaryCta.href} className="btn btn-secondary" style={{ minWidth: '200px', fontSize: '1.05rem', textDecoration: 'none', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                    {page.hero.secondaryCta.label}
                  </Link>
                  <Link href={page.hero.primaryCta.href} className="btn btn-primary" style={{ minWidth: '200px', fontSize: '1.05rem', textDecoration: 'none', padding: '1rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(99,102,241,0.4)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                    <Zap suppressHydrationWarning style={{ width: '20px', height: '20px' }} /> {page.hero.primaryCta.label}
                  </Link>
                </div>
              </div>

              <div className="relative animate-fade-in hidden-md-down" style={{ animationDelay: '0.4s', borderRadius: '2rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 60px rgba(0,0,0,0.6)', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                <div className="absolute inset-0" style={{ background: 'rgba(99,102,241,0.1)', mixBlendMode: 'overlay', zIndex: 1 }}></div>
                <img src={page.hero.image.src} alt={page.hero.image.alt} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '4/3' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), transparent)', zIndex: 1 }}></div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section relative" style={{ zIndex: 5 }}>
          <div className="container">
            <div className="glass-card transition-all" style={{ border: '1px solid rgba(99,102,241,0.3)', padding: 'clamp(2rem, 5vw, 5rem)', background: 'linear-gradient(145deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.9) 100%)', borderRadius: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              <div className="two-col-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: '0.75rem', marginBottom: '1.5rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: 'rgb(129, 140, 248)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {page.about.badge}
                  </div>
                  <h2 style={{ textAlign: 'left', marginBottom: '1.5rem', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800' }}>
                    About <span className="text-gradient">{page.about.highlightedTitle}</span>
                  </h2>
                  <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    {page.about.paragraphs.map((paragraph, index) => (
                      <span key={paragraph}>
                        {paragraph}
                        {index < page.about.paragraphs.length - 1 ? <><br /><br /></> : null}
                      </span>
                    ))}
                  </p>
                </div>
                <div style={{ position: 'relative', height: '100%', minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ background: 'rgba(99,102,241,0.2)', filter: 'blur(60px)', zIndex: 0 }}></div>
                  <div className="glass-card flex flex-col justify-center items-center text-center p-8" style={{ width: '100%', maxWidth: '350px', zIndex: 1, border: '1px solid rgba(99,102,241,0.5)', background: 'rgba(20,27,45,0.6)', backdropFilter: 'blur(20px)', borderRadius: '2rem' }}>
                    <Globe suppressHydrationWarning className="text-white" style={{ width: '80px', height: '80px', marginBottom: '1.5rem', color: 'var(--primary-light)', filter: 'drop-shadow(0 0 15px rgba(129,140,248,0.5))' }} />
                    <h3 className="text-2xl font-bold mb-2 text-white">{page.about.card.title}</h3>
                    <p className="text-indigo-400 font-medium tracking-wide">{page.about.card.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="hatti-ai" className="section relative">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="animate-fade-in" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '800' }}>
                Introducing <span className="text-gradient">{page.hattiAi.highlightedTitle}</span>
              </h2>
              <p className="subtitle animate-fade-in" style={{ fontSize: '1.15rem' }}>{page.hattiAi.subtitle}</p>
            </div>

            <div className="glass-card mb-12" style={{ background: 'linear-gradient(to bottom right, rgba(236,72,153,0.05), rgba(99,102,241,0.08))', border: '1px solid rgba(236,72,153,0.3)', padding: 'clamp(2rem, 5vw, 5rem)', borderRadius: '2rem' }}>
              <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
                <p className="text-white" style={{ fontSize: '1.2rem', lineHeight: '1.8', opacity: 0.9 }}>
                  {page.hattiAi.description}
                </p>
              </div>

              <div className="grid-3" style={{ gap: '2rem' }}>
                {page.hattiAi.features.map((feature) => {
                  const FeatureIcon = getIcon(feature.icon);
                  const tone = getToneStyles(feature.tone);

                  return (
                    <div
                      key={feature.title}
                      className="glass-card flex flex-col items-center text-center p-8 transition-all"
                      style={{
                        background: tone.card,
                        borderColor: tone.border,
                        borderRadius: '1.5rem',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                        transform: feature.featured ? 'translateY(-10px)' : undefined,
                      }}
                    >
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm" style={{ background: tone.bg }}>
                        <FeatureIcon suppressHydrationWarning style={{ width: '32px', height: '32px', color: tone.text }} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                      <p className="text-muted" style={{ fontSize: '1rem', lineHeight: '1.6' }}>{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="program" className="section relative">
          <div className="container">
            <div className="text-center mb-16">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: '0.75rem', marginBottom: '1rem', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', color: 'rgb(34, 211, 238)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {page.program.badge}
              </div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '800' }}>
                AI <span className="text-gradient">{page.program.highlightedTitle}</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
              {page.program.stats.map((stat) => {
                const StatIcon = getIcon(stat.icon);
                const tone = getToneStyles(stat.tone);

                return (
                  <div key={stat.title} className="glass-card p-8 flex flex-col items-center text-center shadow-md" style={{ borderRadius: '1.5rem', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <StatIcon suppressHydrationWarning className="text-white mb-4" style={{ width: '40px', height: '40px', color: tone.text }} />
                    <h4 className="text-white font-bold text-lg mb-2">{stat.title}</h4>
                    <span style={{ color: tone.text, fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</span>
                  </div>
                );
              })}
            </div>

            <h3 className="text-center mb-10" style={{ fontSize: '2rem', fontWeight: '800', color: 'white' }}>
              {page.program.learnTitle}
            </h3>
            <div className="grid-2 gap-6">
              {page.program.learnItems.map((item) => {
                const ItemIcon = getIcon(item.icon);
                const tone = getToneStyles(item.tone);

                return (
                  <div key={item.title} className="glass-card flex gap-6 p-6 items-center shadow-sm" style={{ borderRadius: '1.5rem', border: '1px solid rgba(99,102,241,0.1)' }}>
                    <div className="rounded-2xl flex items-center justify-center flex-shrink-0" style={{ width: '60px', height: '60px', background: tone.bg }}>
                      <ItemIcon suppressHydrationWarning style={{ width: '28px', height: '28px', color: tone.text }} />
                    </div>
                    <div>
                      <h4 className="text-xl text-white mb-1 font-bold">{item.title}</h4>
                      <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="trainer" className="section relative">
          <div className="container">
            <div className="glass-card relative overflow-hidden" style={{ border: '1px solid rgba(99,102,241,0.3)', padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: '2rem', background: 'rgba(15,23,42,0.95)' }}>
              <div className="absolute inset-0 z-0" style={{ background: 'rgba(99,102,241,0.1)', filter: 'blur(100px)' }}></div>
              <div className="two-col-layout relative z-10" style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 300px) 1fr', gap: '4rem', alignItems: 'center' }}>
                <div style={{ aspectRatio: '1', borderRadius: '2rem', border: '2px solid rgba(99,102,241,0.4)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative', width: '100%', maxWidth: '300px', margin: '0 auto' }}>
                  <img src={page.trainer.image.src} alt={page.trainer.image.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 50%)' }}></div>
                  <div className="absolute bottom-4 left-4 font-bold text-white tracking-widest uppercase text-xs opacity-80">{page.trainer.image.note}</div>
                </div>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: '0.75rem', marginBottom: '1.5rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: 'rgb(129, 140, 248)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {page.trainer.badge}
                  </div>
                  <h2 style={{ textAlign: 'left', marginBottom: '1rem', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '800' }}>
                    Meet Your <span className="text-gradient">{page.trainer.highlightedTitle}</span>
                  </h2>
                  <h3 className="text-xl text-white mb-4 font-semibold" style={{ color: 'var(--primary-light)' }}>{page.trainer.role}</h3>
                  <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    {page.trainer.description}
                  </p>
                  <ul className="mt-6" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
                    {page.trainer.points.map((point) => (
                      <li key={point} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'white', fontWeight: '500' }}>
                        <CheckCircle suppressHydrationWarning className="text-cyan-400" style={{ width: '20px', height: '20px' }} /> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="register" className="section relative">
          <div className="container">
            <div className="glass-card text-center" style={{ background: 'var(--gradient-primary)', border: 'none', padding: 'clamp(3rem, 5vw, 5rem) 2rem', borderRadius: '2rem', boxShadow: '0 30px 60px rgba(99,102,241,0.4)', position: 'relative', overflow: 'hidden' }}>
              <div className="absolute inset-0 bg-glow-blob blob-bottom-left" style={{ opacity: 0.3, zIndex: 0 }}></div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 className="text-white mb-4" style={{ color: 'white', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800' }}>{page.cta.title}</h2>
                <p className="text-white mb-8" style={{ maxWidth: '700px', margin: '0 auto 2.5rem auto', opacity: 0.95, fontSize: '1.15rem', lineHeight: '1.6' }}>
                  {page.cta.description}
                </p>
                <div className="flex justify-center flex-wrap" style={{ gap: '1rem' }}>
                  <Link href={page.cta.secondary.href} className="btn btn-secondary" style={{ minWidth: '200px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', textDecoration: 'none', padding: '1rem', borderRadius: '12px', fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {page.cta.secondary.label}
                  </Link>
                  <Link href={page.cta.primary.href} className="btn btn-primary" style={{ minWidth: '200px', background: 'white', color: 'var(--primary-dark)', textDecoration: 'none', padding: '1rem', borderRadius: '12px', fontSize: '1.05rem', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Zap suppressHydrationWarning style={{ width: '18px', height: '18px' }} />
                    {page.cta.primary.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        </main>

        <footer style={{ background: 'rgba(7, 10, 18, 1)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '5rem 0 2rem 0', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="grid-3 mb-12">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginBottom: '1.5rem' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                  <Cpu suppressHydrationWarning className="text-white" style={{ width: '20px', height: '20px' }} />
                </div>
                <span className="font-bold text-xl" style={{ color: 'white' }}>
                  {site.brand.logoTextPrimary}
                  <span style={{ color: 'var(--primary-light)' }}>{site.brand.logoTextAccent}</span>
                </span>
              </div>
              <p className="text-muted text-sm pr-8 mb-6" style={{ lineHeight: '1.6' }}>
                {page.footer.description}
              </p>
            </div>

            <div>
              <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.15rem' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
                {page.footer.quickLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="nav-link text-muted text-sm" style={{ textDecoration: 'none' }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.15rem' }}>Contact</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
                <li className="text-muted text-sm flex items-center gap-2"><Mail suppressHydrationWarning style={{ width: '16px', height: '16px' }} /> {site.contact.email}</li>
                <li className="text-muted text-sm flex items-center gap-2"><Phone suppressHydrationWarning style={{ width: '16px', height: '16px' }} /> {site.contact.phone}</li>
                <li className="mt-4 flex gap-4">
                  {site.socialLinks.map((social) => {
                    const SocialIcon = getIcon(social.icon);
                    return (
                      <a key={social.label} href={social.href} className="text-muted nav-link hover:text-white transition-all" style={{ display: 'inline-block' }} aria-label={social.label}>
                        <SocialIcon suppressHydrationWarning style={{ width: '20px', height: '20px' }} />
                      </a>
                    );
                  })}
                </li>
              </ul>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p className="text-muted text-sm mb-0">
              &copy; {new Date().getFullYear()} {site.brand.name}. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href={site.legal.privacyHref} className="text-muted text-sm nav-link" style={{ textDecoration: 'none' }}>{site.legal.privacyLabel}</a>
              <a href={site.legal.termsHref} className="text-muted text-sm nav-link" style={{ textDecoration: 'none' }}>{site.legal.termsLabel}</a>
            </div>
          </div>
        </div>
        </footer>
      </div>
    </>
  );
}
