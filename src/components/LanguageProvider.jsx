import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import i18n, { langFromPath, stripLang, localizePath } from '../i18n';
import { LanguageContext } from '../langContext';

// Sincroniza el idioma con el prefijo de la URL y expone helpers:
//  - lang: idioma activo ('es' | 'en' | 'de' | 'fr')
//  - lp(path): localiza una ruta interna ('/reserva' -> '/de/reserva')
//  - basePath: ruta actual sin prefijo de idioma (para el selector)
export const LanguageProvider = ({ children }) => {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);

  // Cambio síncrono ANTES del render de la página destino, para que
  // useTranslation ya devuelva el idioma correcto en el primer render
  // (crítico para el pre-renderizado y para evitar parpadeos de idioma).
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      lp: (p) => localizePath(p, lang),
      basePath: stripLang(pathname),
    }),
    [lang, pathname]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
