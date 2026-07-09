import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    // Prevent browser from automatically restoring scroll position
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    useEffect(() => {
        if (hash) {
            const id = hash.substring(1);
            let attempts = 0;
            const tryScroll = () => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else if (attempts < 20) {
                    attempts++;
                    setTimeout(tryScroll, 50);
                }
            };
            // Small initial delay to let rendering start
            setTimeout(tryScroll, 100);
        } else {
            // Instant scroll
            window.scrollTo(0, 0);
            
            // Safety retries to counteract layout shifts from lazy-loaded chunks or GSAP calculations
            const t1 = setTimeout(() => window.scrollTo(0, 0), 50);
            const t2 = setTimeout(() => window.scrollTo(0, 0), 150);
            const t3 = setTimeout(() => window.scrollTo(0, 0), 300);

            return () => {
                clearTimeout(t1);
                clearTimeout(t2);
                clearTimeout(t3);
            };
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
