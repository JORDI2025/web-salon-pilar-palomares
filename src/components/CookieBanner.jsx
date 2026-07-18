import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie, Settings, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLang } from '../langContext';
import Button from './Button';

// Lee el consentimiento guardado una sola vez (null si no existe o está corrupto)
const readStoredConsent = () => {
  try {
    return JSON.parse(localStorage.getItem('cookie-consent'));
  } catch {
    return null;
  }
};

const CookieBanner = () => {
  const { t } = useTranslation();
  const { lp } = useLang();
  const [storedConsent] = useState(readStoredConsent);
  const [isVisible, setIsVisible] = useState(!storedConsent);
  const [showPreferences, setShowPreferences] = useState(false);

  // Consent state (inicializado desde localStorage, sin setState en efecto)
  const [analyticsConsent, setAnalyticsConsent] = useState(storedConsent?.analytics || false);
  const [marketingConsent, setMarketingConsent] = useState(storedConsent?.marketing || false);

  // Lock page scroll when banner is visible (bulletproof mobile scroll lock)
  useEffect(() => {
    if (isVisible) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isVisible]);

  const saveConsent = (analytics, marketing) => {
    const consentObject = {
      technical: true, // Essential cookies are always active
      analytics,
      marketing,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentObject));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleDenyAll = () => {
    saveConsent(false, false);
  };

  const handleSavePreferences = () => {
    saveConsent(analyticsConsent, marketingConsent);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-chocolate/30 backdrop-blur-[3px] flex items-center md:items-end justify-center md:justify-end p-4 md:p-6 pointer-events-auto animate-[fadeIn_0.5s_ease-out] overflow-y-auto">
      <div className="w-full max-w-md bg-white border border-sand/30 shadow-[0_20px_50px_rgba(60,47,47,0.2)] rounded-[32px] p-6 md:p-8 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] translate-y-0 animate-[slideUp_0.8s_cubic-bezier(0.16,1,0.3,1)] font-sans">
        
        {!showPreferences ? (
          <div className="flex flex-col gap-4">
            {/* Text description */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-chocolate">
                <div className="p-1.5 bg-peach/30 rounded-lg text-accent-aqua">
                  <Cookie size={16} strokeWidth={1.5} />
                </div>
                <h4 className="font-serif text-sm md:text-base uppercase tracking-wider font-semibold">
                  {t('cookies.titulo')}
                </h4>
              </div>
              <p className="text-[12px] md:text-xs text-chocolate/80 leading-relaxed">
                {t('cookies.texto')}{' '}
                <Link to={lp('/cookies')} className="underline hover:text-accent-aqua transition-colors font-medium">
                  {t('cookies.politicaCookies')}
                </Link>{' '}
                {t('cookies.y')}{' '}
                <Link to={lp('/politica-privacidad')} className="underline hover:text-accent-aqua transition-colors font-medium">
                  {t('cookies.privacidad')}
                </Link>.
              </p>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Button 
                variant="outline"
                size="sm"
                onClick={handleDenyAll}
                className="w-full border-chocolate/20 text-chocolate hover:bg-chocolate/5 text-[10px]"
              >
                {t('cookies.denegar')}
              </Button>
              
              <Button 
                variant="primary"
                size="sm"
                onClick={handleAcceptAll}
                className="w-full shadow-md text-[10px]"
              >
                {t('cookies.aceptar')}
              </Button>
            </div>

            <div className="flex justify-center pt-1 border-t border-chocolate/5">
              <button 
                onClick={() => setShowPreferences(true)}
                className="flex items-center space-x-1.5 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-chocolate/60 hover:text-accent-aqua transition-colors"
              >
                <Settings size={12} className="animate-[spin_6s_linear_infinite]" />
                <span>{t('cookies.preferencias')}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Header Preference Panel */}
            <div className="flex justify-between items-start border-b border-chocolate/10 pb-3">
              <div className="flex items-center space-x-2.5 text-chocolate">
                <div className="p-1.5 bg-peach/30 rounded-lg text-accent-aqua">
                  <ShieldCheck size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-serif text-sm uppercase tracking-wider font-semibold">
                    {t('cookies.preferenciasTitulo')}
                  </h4>
                  <p className="text-[10px] text-chocolate/60">{t('cookies.preferenciasSub')}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPreferences(false)}
                className="p-1 hover:bg-chocolate/5 rounded-full text-chocolate/50 hover:text-chocolate transition-colors"
                aria-label={t('cookies.cerrarPreferencias')}
              >
                <X size={16} />
              </button>
            </div>

            {/* Cookie options check vertical stack */}
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 no-scrollbar">
              
              {/* Technical / Required cookies */}
              <div className="p-3 bg-offwhite/50 rounded-xl border border-chocolate/10 flex items-start justify-between">
                <div className="flex-1 pr-3">
                  <span className="font-serif text-xs font-semibold uppercase tracking-wider text-chocolate block">{t('cookies.tecnicas')}</span>
                  <p className="text-[10px] text-chocolate/70 leading-normal mt-0.5">
                    {t('cookies.tecnicasDesc')}
                  </p>
                </div>
                <span className="text-[9px] uppercase tracking-wider bg-chocolate/10 text-chocolate px-2 py-0.5 rounded-full font-bold self-center">{t('cookies.activas')}</span>
              </div>

              {/* Analytical cookies */}
              <label className="p-3 bg-offwhite/50 rounded-xl border border-chocolate/10 flex items-start justify-between cursor-pointer hover:border-accent-aqua/40 transition-all select-none">
                <div className="flex-1 pr-3">
                  <span className="font-serif text-xs font-semibold uppercase tracking-wider text-chocolate block">{t('cookies.analiticas')}</span>
                  <p className="text-[10px] text-chocolate/70 leading-normal mt-0.5">
                    {t('cookies.analiticasDesc')}
                  </p>
                </div>
                <div className="relative inline-flex items-center cursor-pointer self-center">
                  <input 
                    type="checkbox" 
                    checked={analyticsConsent} 
                    onChange={(e) => setAnalyticsConsent(e.target.checked)} 
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4.5 bg-chocolate/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-chocolate/20 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-accent-aqua"></div>
                </div>
              </label>

              {/* Marketing cookies */}
              <label className="p-3 bg-offwhite/50 rounded-xl border border-chocolate/10 flex items-start justify-between cursor-pointer hover:border-accent-aqua/40 transition-all select-none">
                <div className="flex-1 pr-3">
                  <span className="font-serif text-xs font-semibold uppercase tracking-wider text-chocolate block">{t('cookies.marketing')}</span>
                  <p className="text-[10px] text-chocolate/70 leading-normal mt-0.5">
                    {t('cookies.marketingDesc')}
                  </p>
                </div>
                <div className="relative inline-flex items-center cursor-pointer self-center">
                  <input 
                    type="checkbox" 
                    checked={marketingConsent} 
                    onChange={(e) => setMarketingConsent(e.target.checked)} 
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4.5 bg-chocolate/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-chocolate/20 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-accent-aqua"></div>
                </div>
              </label>

            </div>

            {/* Bottom Actions of preference panel */}
            <div className="flex justify-end gap-2 pt-3 border-t border-chocolate/10">
              <button 
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 border border-chocolate/20 text-chocolate hover:bg-chocolate/5 text-[9px] font-bold tracking-[0.2em] uppercase rounded-full transition-all"
              >
                {t('cookies.atras')}
              </button>
              
              <Button 
                variant="primary"
                size="sm"
                onClick={handleSavePreferences}
                className="shadow-md text-[9px]"
              >
                {t('cookies.guardar')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
