'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function buildUrl(pathname, searchParams) {
  const query = searchParams?.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export default function AnalyticsTracker({ gaMeasurementId, gtmId }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pagePath = buildUrl(pathname || '/', searchParams);
    const pageLocation = typeof window !== 'undefined' ? window.location.href : pagePath;
    const pageTitle = typeof document !== 'undefined' ? document.title : undefined;

    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];

      if (gtmId) {
        window.dataLayer.push({
          event: 'page_view',
          page_path: pagePath,
          page_location: pageLocation,
          page_title: pageTitle,
        });
      }

      if (gaMeasurementId && typeof window.gtag === 'function') {
        window.gtag('config', gaMeasurementId, {
          page_path: pagePath,
          page_location: pageLocation,
          page_title: pageTitle,
        });
      }
    }
  }, [gaMeasurementId, gtmId, pathname, searchParams]);

  return null;
}
