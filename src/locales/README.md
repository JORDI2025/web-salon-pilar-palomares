# Guía i18n — Salón Pilar Palomares (es / en / de / fr)

Cómo migrar una página a i18n. Sigue EXACTAMENTE este patrón (es el que usa `src/pages/Home.jsx` — consúltala como referencia canónica).

## 1. Crear los 4 JSON del namespace de la página

`src/locales/<ns>/{es,en,de,fr}.json` — `<ns>` en kebab-case sin "src/pages" (ej.: `bioterapia-facial`).

- `es.json`: extraer TODO el texto visible en español de la página, TAL CUAL está (títulos, eyebrows, párrafos, botones, tabs, acordeones, arrays de datos de tratamientos, alt de imágenes, aria-labels, títulos/descripciones del componente `<SEO>`).
- `en/de/fr.json`: misma estructura de claves, traducción profesional con tono premium de salón de belleza.
- Títulos partidos con `<br/>` → claves `title1`/`title2`.
- Claves anidadas por sección (`hero.*`, `seo.*`, etc.), en camelCase.

## 2. Reglas de traducción

- NO traducir: "Salón Pilar Palomares", "Secretos del Agua", nombres de personas, teléfonos, direcciones, "Boutique".
- "Agua Biopolar™" → EN "Biopolar Water™", DE "Biopolares Wasser™", FR "Eau Biopolaire™".
- "Bioterapia(s)" → EN "Biotherapy/Biotherapies", DE "Biotherapie(n)", FR "Biothérapie(s)".
- Nombres de servicio (coherentes con `common` y `home`): Cultura de Color → EN "Colour Culture" / DE "Farbkultur" / FR "Culture de la Couleur"; Cultura de la Forma → EN "The Culture of Form" / DE "Kultur der Form" / FR "Culture de la Forme"; Estética → EN "Aesthetics" / DE "Kosmetik" / FR "Esthétique"; Peluquería → EN "Hairdressing" / DE "Friseur" / FR "Coiffure".
- Citas literales de clientas (reseñas de Google, testimonios reales con nombre) NO se traducen: se quedan en español y NO se extraen al JSON.
- Alemán: tratamiento "Sie". Francés: "vous".

## 3. Migrar la página

```jsx
import { useTranslation } from 'react-i18next';
import { registerNS } from '../i18n';
import nsEs from '../locales/<ns>/es.json';
import nsEn from '../locales/<ns>/en.json';
import nsDe from '../locales/<ns>/de.json';
import nsFr from '../locales/<ns>/fr.json';

registerNS('<ns>', { es: nsEs, en: nsEn, de: nsDe, fr: nsFr }); // a nivel de módulo

// dentro del componente:
const { t } = useTranslation('<ns>');
```

- Sustituir cada texto por `{t('clave')}`. Los datos en arrays/objetos definidos DENTRO del componente usan `t()` directamente; si están FUERA del componente, moverlos dentro (o convertirlos en función que reciba `t`).
- `<Link to="/ruta">` internos → `to={lp('/ruta')}` con `import { useLang } from '../langContext';` y `const { lp } = useLang();`.
- `<Button to="...">` NO se toca: el componente Button ya localiza sus enlaces.
- `<SEO title={t('seo.title')} description={t('seo.description')} ...>` — `canonical` NO se toca (siempre sin prefijo). `keywords` y `schemaData` se quedan en español tal cual.
- NO cambiar clases, estilos, animaciones GSAP ni estructura JSX.

## 4. Verificar

`npx eslint src/pages/<Pagina>.jsx` sin errores, y `grep` de que no queden literales en español en el JSX (fuera de schemaData/keywords/testimonios).
