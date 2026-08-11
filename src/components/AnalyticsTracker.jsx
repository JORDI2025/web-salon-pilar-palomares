import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-1MX4E71BLH';

/**
 * Componente de auditoría y seguimiento para Google Analytics 4 (GA4).
 * Garantiza que la variable dataLayer y la función gtag estén correctamente inicializadas
 * y envía eventos de configuración/page_view en cada cambio de ruta SPA.
 */
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Inicialización defensiva de dataLayer y gtag
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
      window.gtag = function () {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };
    }

    // Espera breve para asegurar que React Helmet haya actualizado document.title
    const timer = setTimeout(() => {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [location]);

  return null;
};

export default AnalyticsTracker;
