import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import ScrollToTop from './components/ScrollToTop';
import LanguageProvider from './components/LanguageProvider';
import Home from './pages/Home'; // eager: página de aterrizaje (LCP crítico)

// Resto de páginas con carga diferida (code-splitting por ruta) para
// reducir el JS inicial. Cada ruta se descarga solo cuando se visita.
const NuestraEsencia = lazy(() => import('./pages/NuestraEsencia'));
const CalendarioBiodinamico = lazy(() => import('./pages/CalendarioBiodinamico'));
const Equipo = lazy(() => import('./pages/Equipo'));
const CulturaDeColor = lazy(() => import('./pages/CulturaDeColor'));
const Peluqueria = lazy(() => import('./pages/Peluqueria'));
const Bioterapias = lazy(() => import('./pages/Bioterapias'));
const BioterapiaCapilar = lazy(() => import('./pages/BioterapiaCapilar'));
const BioterapiaFacial = lazy(() => import('./pages/BioterapiaFacial'));
const BioterapiaCorporal = lazy(() => import('./pages/BioterapiaCorporal'));
const CulturaDeLaForma = lazy(() => import('./pages/CulturaDeLaForma'));
const Estetica = lazy(() => import('./pages/Estetica'));
const Eventos = lazy(() => import('./pages/Eventos'));
const Reserva = lazy(() => import('./pages/Reserva'));
const Contacto = lazy(() => import('./pages/Contacto'));
const AvisoLegal = lazy(() => import('./pages/AvisoLegal'));
const PoliticaPrivacidad = lazy(() => import('./pages/PoliticaPrivacidad'));
const Cookies = lazy(() => import('./pages/Cookies'));
const CondicionesVenta = lazy(() => import('./pages/CondicionesVenta'));

// Fallback discreto y on-brand mientras carga el chunk de la ruta.
const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center" aria-busy="true" aria-live="polite">
    <span className="h-8 w-8 rounded-full border-2 border-accent-aqua/30 border-t-accent-aqua animate-spin" />
  </div>
);

// Fundido suave entre rutas. La carga inicial NO se anima (protege el LCP
// y el HTML pre-renderizado); solo las navegaciones posteriores.
// Solo opacidad — sin transform — para no romper elementos fixed internos.
const RouteFade = ({ children }) => {
  const { pathname } = useLocation();
  const [initialPath] = useState(pathname);
  const [hasNavigated, setHasNavigated] = useState(false);
  // Ajuste de estado durante el render (patrón documentado de React):
  // marca que hubo navegación en cuanto la ruta difiere de la inicial.
  if (!hasNavigated && pathname !== initialPath) setHasNavigated(true);
  const animate = hasNavigated || pathname !== initialPath;
  return <FadeMount key={pathname} animate={animate}>{children}</FadeMount>;
};

const FadeMount = ({ animate, children }) => {
  // Capturado en el montaje: la clase no aparece en re-renders posteriores
  // de la misma ruta (evita fundidos espurios).
  const [shouldAnimate] = useState(animate);
  return <div className={shouldAnimate ? 'route-fade-in' : undefined}>{children}</div>;
};

// Definición única de rutas; se instancian para cada idioma
// (sin prefijo = español, /en, /de, /fr).
const routeDefs = [
  { path: '/', element: <Home /> },
  { path: '/nuestra-esencia', element: <NuestraEsencia /> },
  { path: '/calendario-biodinamico', element: <CalendarioBiodinamico /> },
  { path: '/equipo', element: <Equipo /> },
  { path: '/cultura-de-color', element: <CulturaDeColor /> },
  { path: '/peluqueria', element: <Peluqueria /> },
  { path: '/bioterapias', element: <Bioterapias /> },
  { path: '/bioterapia-capilar', element: <BioterapiaCapilar /> },
  { path: '/bioterapia-facial', element: <BioterapiaFacial /> },
  { path: '/bioterapia-corporal', element: <BioterapiaCorporal /> },
  { path: '/bioterapia-facial-corporal', element: <Bioterapias /> },
  { path: '/bioterapia-manos-pies', element: <Bioterapias /> },
  { path: '/cultura-de-la-forma', element: <CulturaDeLaForma /> },
  { path: '/estetica', element: <Estetica /> },
  { path: '/eventos', element: <Eventos /> },
  { path: '/reserva', element: <Reserva /> },
  { path: '/contacto', element: <Contacto /> },
  { path: '/aviso-legal', element: <AvisoLegal /> },
  { path: '/politica-privacidad', element: <PoliticaPrivacidad /> },
  { path: '/cookies', element: <Cookies /> },
  { path: '/condiciones-venta', element: <CondicionesVenta /> },
];

const LANG_PREFIXES = ['', '/en', '/de', '/fr'];

function App() {
  return (
    <Router>
      <LanguageProvider>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-accent-aqua/30 selection:text-chocolate flex flex-col">
        <header>
          <Navbar />
        </header>
        <main className="flex-grow">
          <RouteFade>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              {LANG_PREFIXES.flatMap((prefix) =>
                routeDefs.map(({ path, element }) => (
                  <Route
                    key={`${prefix}${path}`}
                    path={path === '/' ? (prefix || '/') : `${prefix}${path}`}
                    element={element}
                  />
                ))
              )}
            </Routes>
          </Suspense>
          </RouteFade>
        </main>
        <Footer />
        <CookieBanner />
      </div>
      </LanguageProvider>
    </Router>
  )
}

export default App
