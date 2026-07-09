import { createContext, useContext } from 'react';
import { DEFAULT_LANG } from './i18n';

// Contexto de idioma compartido. El valor real lo inyecta
// <LanguageProvider>; este default hace que los componentes
// funcionen también fuera del provider (tests, Storybook...).
export const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  lp: (p) => p,
  basePath: '/',
});

export const useLang = () => useContext(LanguageContext);
