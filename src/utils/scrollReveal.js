// Observador global de scroll-reveal.
// Cualquier elemento con la clase `reveal` se anima al entrar en viewport.
// Es robusto ante navegación SPA: re-observa el DOM tras cada cambio de ruta
// mediante un MutationObserver ligero.

let io = null;

// Selectores de elementos que arrancan ocultos: los `.reveal` (IntersectionObserver)
// y las clases de la coreografía GSAP (ocultas por fromTo/immediateRender).
const GSAP_REVEAL_SELECTOR = '.reveal-eyebrow, .reveal-title, .reveal-image, .reveal-text, .reveal-item, .hero-content';

function isNearViewport(el) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < vh + 60 && rect.bottom > -60 && rect.width > 0 && rect.height > 0;
}

function forceVisible(el) {
  el.classList.add('is-visible');
  el.style.opacity = '1';
  el.style.transform = 'none';
  el.style.filter = 'none';
}

// Red de seguridad: si un elemento lleva ~4s dentro del viewport y sigue
// invisible (IO que no disparó, ScrollTrigger muerto, error de JS...), se
// fuerza su visibilidad. No toca elementos fuera de viewport, así las
// animaciones normales al hacer scroll siguen funcionando.
function initSafetyNet() {
  setInterval(() => {
    try {
      const candidates = [
        ...document.querySelectorAll('.reveal:not(.is-visible)'),
        ...document.querySelectorAll(GSAP_REVEAL_SELECTOR),
      ];
      candidates.forEach((el) => {
        const opacity = parseFloat(window.getComputedStyle(el).opacity);
        if (opacity > 0.05) {
          delete el.dataset.revealStuck;
          return;
        }
        if (!isNearViewport(el)) {
          delete el.dataset.revealStuck;
          return;
        }
        const stuck = (parseInt(el.dataset.revealStuck || '0', 10) || 0) + 1;
        el.dataset.revealStuck = String(stuck);
        // 2 comprobaciones × 2s = ~4s visible pero oculto → rescatar.
        if (stuck >= 2) forceVisible(el);
      });
    } catch {
      // La red de seguridad nunca debe romper nada.
    }
  }, 2000);
}

function ensureObserver() {
  if (io || typeof window === 'undefined' || !('IntersectionObserver' in window)) return io;
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  return io;
}

function observeAll() {
  const obs = ensureObserver();
  if (!obs) return;
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => obs.observe(el));
}

export function initScrollReveal() {
  if (typeof window === 'undefined') return;

  const start = () => {
    observeAll();
    // Re-escanea cuando React monta nuevas páginas (cambios de ruta SPA).
    const mo = new MutationObserver(() => {
      // micro-debounce con rAF para no escanear en cada mutación
      window.requestAnimationFrame(observeAll);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    initSafetyNet();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}
