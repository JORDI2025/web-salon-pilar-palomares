import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Namespace "common" (Navbar, Footer, CookieBanner, SEO por defecto):
// se importa estáticamente porque se necesita en todas las páginas.
import commonEs from './locales/common/es.json';
import commonEn from './locales/common/en.json';
import commonDe from './locales/common/de.json';
import commonFr from './locales/common/fr.json';

export const LANGS = ['es', 'en', 'de', 'fr'];
export const DEFAULT_LANG = 'es';

i18n.use(initReactI18next).init({
  resources: {
    es: { common: commonEs },
    en: { common: commonEn },
    de: { common: commonDe },
    fr: { common: commonFr },
  },
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  defaultNS: 'common',
  interpolation: { escapeValue: false }, // React ya escapa
  returnEmptyString: false,
});

// Cada página registra su propio namespace desde su chunk (code-splitting):
//   registerNS('home', { es, en, de, fr })
// Así las traducciones de una página solo se descargan con esa página.
export function registerNS(ns, resources) {
  LANGS.forEach((lang) => {
    if (resources[lang] && !i18n.hasResourceBundle(lang, ns)) {
      i18n.addResourceBundle(lang, ns, resources[lang], true, false);
    }
  });
}

// Deriva el idioma del prefijo de la URL: /en/..., /de/..., /fr/... (sin prefijo = es)
export function langFromPath(pathname) {
  const seg = pathname.split('/')[1];
  return LANGS.includes(seg) && seg !== DEFAULT_LANG ? seg : DEFAULT_LANG;
}

// Quita el prefijo de idioma de una ruta: /en/reserva -> /reserva
export function stripLang(pathname) {
  const lang = langFromPath(pathname);
  if (lang === DEFAULT_LANG) return pathname;
  const rest = pathname.slice(lang.length + 1) || '/';
  return rest.startsWith('/') ? rest : `/${rest}`;
}

// Añade el prefijo de idioma a una ruta interna: ('/reserva', 'de') -> /de/reserva
export function localizePath(path, lang) {
  if (!path || !path.startsWith('/')) return path; // externas, anclas, tel:, etc.
  if (lang === DEFAULT_LANG) return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

export default i18n;
