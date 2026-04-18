import { getLegacyPage } from '../lib/legacyPages';
import HomePageContent from '../components/HomePageContent';
import { getSiteContent } from '../lib/content-store';

function parseKeywords(value) {
  return (value || '')
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

export async function generateMetadata() {
  const content = await getSiteContent();
  const page = content.pages.index;
  const seo = content.site?.seo || {};

  return {
    title: page.title,
    description: page.heroSubtitle,
    keywords: parseKeywords(seo.homeKeywords || seo.siteKeywords),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: page.title,
      description: page.heroSubtitle,
      url: '/',
    },
    twitter: {
      title: page.title,
      description: page.heroSubtitle,
    },
  };
}

export default async function Page() {
  const pageData = await getLegacyPage('index');
  const content = await getSiteContent();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const page = content.pages.index;
  const seo = content.site?.seo || {};
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: content.site.brand?.name || 'TouchPointe Digital',
    url: siteUrl,
    logo: `${siteUrl}/site-logo.jpeg`,
    description: page.heroSubtitle,
    keywords: parseKeywords(seo.homeKeywords || seo.siteKeywords),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <HomePageContent data={page} brand={content.site?.brand} />
    </>
  );
}
