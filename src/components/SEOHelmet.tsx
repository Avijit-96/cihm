import React, { useEffect } from 'react';

interface SEOHelmetProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  schemaData?: object | object[];
  noindex?: boolean;
}

export const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  twitterCard = 'summary_large_image',
  schemaData,
  noindex = false
}) => {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // Helper to update or create meta tags
    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Meta description
    setMeta('name', 'description', description);

    // 3. Robots
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // 4. OpenGraph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:site_name', 'Central Institute of Healthcare & Management (CIHM)');
    if (canonical) {
      setMeta('property', 'og:url', canonical);
    }

    // 5. Twitter
    setMeta('name', 'twitter:card', twitterCard);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // 6. Canonical Link
    const currentCanonicalUrl = canonical || window.location.origin + window.location.pathname;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentCanonicalUrl);

    // 7. Schema.org JSON-LD
    let scriptTag = document.getElementById('cihm-schema-ld') as HTMLScriptElement;
    if (schemaData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'cihm-schema-ld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schemaData);
    } else if (scriptTag) {
      scriptTag.textContent = '';
    }
  }, [title, description, canonical, ogType, ogImage, twitterCard, schemaData, noindex]);

  return null;
};
