import { getLegacyPage } from '../../lib/legacyPages';
import SyllabusPageContent from '../../components/SyllabusPageContent';
import { getSiteContent } from '../../lib/content-store';

function parseKeywords(value) {
  return (value || '')
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

export async function generateMetadata() {
  const content = await getSiteContent();
  const page = content.pages.syllabus;
  const seo = content.site?.seo || {};
  const pageKeywords = parseKeywords(seo.syllabusKeywords || seo.siteKeywords);

  return {
    title: page.title,
    description: page.subtitle,
    keywords: pageKeywords,
    alternates: {
      canonical: '/syllabus',
    },
    openGraph: {
      title: page.title,
      description: page.subtitle,
      url: '/syllabus',
    },
    twitter: {
      title: page.title,
      description: page.subtitle,
    },
  };
}

export default async function Page() {
  const pageData = await getLegacyPage('syllabus');
  const content = await getSiteContent();
  const page = content.pages.syllabus;
  const seo = content.site?.seo || {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const syllabusSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: page.title,
    description: page.subtitle,
    url: `${siteUrl}/syllabus`,
    keywords: parseKeywords(seo.syllabusKeywords || seo.siteKeywords),
    provider: {
      '@type': 'Organization',
      name: content.site.brand?.name || 'TouchPointe Digital',
      sameAs: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(syllabusSchema) }}
      />
      <SyllabusPageContent data={pageData} />
    </>
  );
}
