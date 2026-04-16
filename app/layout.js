import "./globals.css";
import Script from "next/script";
import { Suspense } from "react";
import LegacyClientInit from "../components/LegacyClientInit";
import AnalyticsTracker from "../components/AnalyticsTracker";
import { getSiteContent } from "../lib/content-store";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const sharedLogoPath = "/site-logo.jpeg";

function parseKeywords(value) {
  return (value || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

export async function generateMetadata() {
  const content = await getSiteContent();
  const site = content.site || {};
  const seo = site.seo || {};
  const siteTitle = seo.siteTitle || site.brand?.name || "TouchPointe Digital";
  const siteDescription =
    seo.siteDescription || "Training programs, digital learning, and tech-focused growth opportunities.";
  const defaultOgImage = seo.defaultOgImage || sharedLogoPath;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: siteDescription,
    keywords: parseKeywords(seo.siteKeywords),
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: seo.googleSiteVerification || undefined,
    },
    icons: {
      icon: sharedLogoPath,
      shortcut: sharedLogoPath,
      apple: sharedLogoPath,
    },
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      type: "website",
      url: siteUrl,
      siteName: siteTitle,
      images: [
        {
          url: defaultOgImage,
          width: 768,
          height: 768,
          alt: `${siteTitle} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [defaultOgImage],
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const content = await getSiteContent();
  const site = content.site || {};
  const seo = site.seo || {};
  const analytics = site.analytics || {};
  const siteTitle = seo.siteTitle || site.brand?.name || "TouchPointe Digital";
  const siteDescription =
    seo.siteDescription || "Training programs, digital learning, and tech-focused growth opportunities.";
  const organizationName = site.brand?.name || siteTitle;
  const organizationEmail = site.contact?.email || undefined;
  const organizationPhone = site.contact?.phone || undefined;
  const defaultOgImage = seo.defaultOgImage || sharedLogoPath;
  const socialLinks = (site.socialLinks || [])
    .map((item) => item?.href)
    .filter((href) => href && href !== "#");
  const googleAnalyticsId = analytics.gaMeasurementId || "";
  const googleTagManagerId = analytics.gtmId || "";
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organizationName,
    url: siteUrl,
    logo: `${siteUrl}${sharedLogoPath}`,
    ...(organizationEmail ? { email: organizationEmail } : {}),
    ...(organizationPhone ? { telephone: organizationPhone } : {}),
    ...(socialLinks.length ? { sameAs: socialLinks } : {}),
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteTitle,
    url: siteUrl,
    description: siteDescription,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: organizationName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${sharedLogoPath}`,
      },
    },
    image: `${siteUrl}${defaultOgImage}`,
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        {googleTagManagerId ? (
          <>
            <Script id="google-tag-manager" strategy="afterInteractive">
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${googleTagManagerId}');
              `}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        ) : null}
        {googleAnalyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                  send_page_view: false,
                });
              `}
            </Script>
          </>
        ) : null}
        <Suspense fallback={null}>
          <AnalyticsTracker
            gaMeasurementId={googleAnalyticsId}
            gtmId={googleTagManagerId}
          />
        </Suspense>
        <Script src="https://unpkg.com/lucide@latest" strategy="afterInteractive" />
        <LegacyClientInit />
        {children}
      </body>
    </html>
  );
}
