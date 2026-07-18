import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLang } from '../langContext';
import { LANGS, DEFAULT_LANG, localizePath } from '../i18n';

const OG_LOCALES = { es: 'es_ES', en: 'en_GB', de: 'de_DE', fr: 'fr_FR' };

const SEO = ({
  title, 
  description, 
  keywords,
  canonical, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  ogType = 'website',
  schemaData,
  noindex = false
}) => {
  const { lang } = useLang();
  const siteTitle = "Salón Pilar Palomares";
  
  // Robust default fallbacks
  const defaultTitle = "Peluquería Orgánica y Bioterapias";
  const defaultDescription = "Belleza, libertad y cambio consciente. Descubre nuestras bioterapias y peluquería orgánica en Torre de Benagalbón, Málaga.";
  const baseUrl = "https://salonpilarpalomares.com";

  const displayTitle = title || defaultTitle;
  const fullTitle = `${displayTitle} | ${siteTitle}`;
  const displayDescription = description || defaultDescription;

  // Global & Secretos del Agua keywords for the entire site (SEO oculto)
  const globalKeywords = [
    // Secretos del Agua & Marca
    "Secretos del Agua",
    "Agua Biopolar",
    "Bioterapias Secretos del Agua",
    "Bioterapia Capilar",
    "Bioterapia Facial",
    "Bioterapia Corporal",
    "Remedios Integrativos",
    "Boutique Secretos del Agua",
    "Salón Autorizado Secretos del Agua",
    // Filosofía & Ingredientes
    "peluquería orgánica",
    "estética orgánica",
    "belleza consciente",
    "activos botánicos puros",
    "coloración con barros",
    "barros capilares",
    "barros 100% naturales",
    "barros botánicos",
    "óleos capilares",
    "cosmética saludable",
    "cosmética sin tóxicos",
    "tratamientos sin siliconas",
    "sin sulfatos",
    "sin parabenos",
    "sin amoníaco",
    "agricultura biodinámica",
    "belleza sin agresión",
    // Localización
    "Torre de Benagalbón",
    "Benagalbón",
    "Rincón de la Victoria",
    "Añoreta",
    "Chilches",
    "Málaga",
    "Axarquía",
    "Vélez-Málaga",
    "Torre del Mar",
    "Nerja",
    "Benajarafe",
    "La Cala del Moral",
    "Chilches Costa"
  ];

  // Combine page-specific keywords with global ones, removing duplicates
  let combinedKeywordsList = [];
  if (Array.isArray(keywords)) {
    combinedKeywordsList = [...keywords];
  } else if (typeof keywords === 'string' && keywords.trim()) {
    combinedKeywordsList = keywords.split(',').map(k => k.trim());
  }
  
  // Add global keywords that aren't already present (case-insensitive deduplication)
  const existingKeywordsSet = new Set(combinedKeywordsList.map(k => k.toLowerCase()));
  globalKeywords.forEach(gk => {
    if (!existingKeywordsSet.has(gk.toLowerCase())) {
      combinedKeywordsList.push(gk);
    }
  });

  const formattedKeywords = combinedKeywordsList.join(', ');

  // Clean canonical link (handling potential trailing slashes for consistency)
  // La prop `canonical` es SIEMPRE la ruta base sin prefijo de idioma
  // ('/reserva'); aquí se localiza para el idioma activo y se generan
  // los alternates hreflang de los 4 idiomas.
  let cleanCanonical = canonical || '';
  if (cleanCanonical && cleanCanonical.endsWith('/') && cleanCanonical !== '/') {
    cleanCanonical = cleanCanonical.slice(0, -1);
  }
  const urlFor = (l) => {
    const p = localizePath(cleanCanonical === '/' ? '/' : cleanCanonical, l);
    return `${baseUrl}${p === '/' ? '' : p}` || baseUrl;
  };
  const canonicalUrl = canonical ? urlFor(lang) : '';

  return (
    <Helmet defer={false}>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={displayDescription} />
      <meta name="keywords" content={formattedKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonicalUrl} />}

      {/* Alternates de idioma para buscadores (hreflang) */}
      {canonical && LANGS.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={urlFor(l)} />
      ))}
      {canonical && <link rel="alternate" hrefLang="x-default" href={urlFor(DEFAULT_LANG)} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={OG_LOCALES[lang] || OG_LOCALES.es} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || displayDescription} />
      {ogImage && <meta property="og:image" content={`${baseUrl}${ogImage}`} />}
      {canonical && <meta property="og:url" content={canonicalUrl} />}

      {/* Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
