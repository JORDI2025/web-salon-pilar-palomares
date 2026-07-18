// Genera public/sitemap.xml con las URLs de los 4 idiomas (es sin prefijo,
// /en, /de, /fr) y alternates hreflang. Las páginas legales solo van en
// español (su contenido no está traducido).
// Uso: node scripts/generate-sitemap.js
import fs from 'fs';
import path from 'path';

const BASE = 'https://salonpilarpalomares.com';
const LANGS = ['es', 'en', 'de', 'fr'];
const TODAY = new Date().toISOString().slice(0, 10);

const contentRoutes = [
  { path: '/', priority: '1.0' },
  { path: '/bioterapias', priority: '0.9' },
  { path: '/bioterapia-capilar', priority: '0.8' },
  { path: '/bioterapia-facial', priority: '0.8' },
  { path: '/bioterapia-corporal', priority: '0.8' },
  { path: '/peluqueria', priority: '0.8' },
  { path: '/cultura-de-color', priority: '0.8' },
  { path: '/cultura-de-la-forma', priority: '0.8' },
  { path: '/estetica', priority: '0.8' },
  { path: '/eventos', priority: '0.7' },
  { path: '/reserva', priority: '0.9' },
  { path: '/contacto', priority: '0.8' },
  { path: '/nuestra-esencia', priority: '0.7' },
  { path: '/equipo', priority: '0.6' },
  { path: '/calendario-biodinamico', priority: '0.5' },
];

const legalRoutes = [
  '/aviso-legal',
  '/politica-privacidad',
  '/cookies',
  '/condiciones-venta',
];

const loc = (p, lang) => {
  const prefixed = lang === 'es' ? p : (p === '/' ? `/${lang}` : `/${lang}${p}`);
  return `${BASE}${prefixed === '/' ? '/' : prefixed}`;
};

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

for (const { path: p, priority } of contentRoutes) {
  for (const lang of LANGS) {
    xml += '  <url>\n';
    xml += `    <loc>${loc(p, lang)}</loc>\n`;
    for (const alt of LANGS) {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt}" href="${loc(p, alt)}"/>\n`;
    }
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc(p, 'es')}"/>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  }
}

for (const p of legalRoutes) {
  xml += '  <url>\n';
  xml += `    <loc>${BASE}${p}</loc>\n`;
  xml += `    <lastmod>${TODAY}</lastmod>\n`;
  xml += '    <changefreq>yearly</changefreq>\n';
  xml += '    <priority>0.3</priority>\n';
  xml += '  </url>\n';
}

xml += '</urlset>\n';

const out = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(out, xml, 'utf-8');
console.log(`Sitemap generado: ${out} (${contentRoutes.length * LANGS.length + legalRoutes.length} URLs)`);
