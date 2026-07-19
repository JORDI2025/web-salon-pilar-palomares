import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Instagram, Facebook, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLang } from '../langContext';
import { LANGS } from '../i18n';
import { localizePath } from '../i18n';

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
  </svg>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const progressRef = useRef(null);
    const { t } = useTranslation();
    const { lang, lp, basePath } = useLang();

    // Pages without hero section: these should always have a solid header background
    const hasNoHero = ['/reserva', '/aviso-legal', '/politica-privacidad', '/cookies', '/condiciones-venta'].includes(basePath);
    const isSolid = scrolled || isOpen || hasNoHero;

    // Estado "scrolled" (navbar compacta) + barra de progreso de lectura.
    // La barra se actualiza vía ref/transform para no re-renderizar en cada scroll.
    useEffect(() => {
        // Los eventos scroll modernos ya llegan alineados a frame; el trabajo
        // aquí es mínimo (un transform + un setState con bailout de React).
        const update = () => {
            const doc = document.documentElement;
            const max = doc.scrollHeight - window.innerHeight;
            const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
            setScrolled(window.scrollY > 12);
        };
        window.addEventListener('scroll', update, { passive: true });
        update();
        return () => window.removeEventListener('scroll', update);
    }, []);

    const handleLinkClick = (path) => {
        setIsOpen(false);
        const pathNoHash = path.split('#')[0];
        const hash = path.split('#')[1];
        
        if (basePath === pathNoHash) {
            if (hash) {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    // Un enlace del menú está activo si la ruta actual coincide con él
    // o con cualquiera de sus descendientes del desplegable.
    // basePath ya viene sin prefijo de idioma (/en/reserva -> /reserva).
    const currentPath = basePath;
    const linkPaths = (link) => {
        const paths = [link.path];
        link.dropdown?.forEach((d) => {
            if (d.path) paths.push(d.path.split('#')[0]);
            d.subItems?.forEach((s) => paths.push(s.path.split('#')[0]));
        });
        return paths;
    };
    const isGroupActive = (link) =>
        link.path === '/' ? currentPath === '/' : linkPaths(link).includes(currentPath);
    const isPathActive = (path) => path && currentPath === path.split('#')[0];

    const navLinks = [
        { name: t('nav.inicio'), path: '/' },
        {
            name: t('nav.servicios'),
            path: '/bioterapias',
            dropdown: [

                {
                    name: t('nav.bioterapias'),
                    path: '/bioterapias',
                    subItems: [
                        { name: t('nav.bioterapiaFacial'), path: '/bioterapia-facial' },
                        { name: t('nav.bioterapiaCorporal'), path: '/bioterapia-corporal' },
                        { name: t('nav.bioterapiaManosPies'), path: '/bioterapias#manos-pies' },
                    ]
                },
                {
                    name: t('nav.peluqueria'),
                    path: '/peluqueria',
                    subItems: [
                        { name: t('nav.culturaDeColor'), path: '/cultura-de-color' },
                        { name: t('nav.tratamientosCapilares'), path: '/bioterapia-capilar' },
                        { name: t('nav.culturaDeLaForma'), path: '/cultura-de-la-forma' },
                        { name: t('nav.eventos'), path: '/eventos' },
                    ]
                },
                {
                    name: t('nav.estetica'),
                    path: '/estetica'
                },
            ]
        },
        {
            name: t('nav.nosotros'),
            path: '/nuestra-esencia',
            dropdown: [
                { name: t('nav.nuestraEsencia'), path: '/nuestra-esencia' },
                { name: t('nav.equipo'), path: '/equipo' },
                { name: t('nav.contacto'), path: '/contacto' },
                { name: t('nav.calendario'), path: '/calendario-biodinamico' },
            ]
        },
    ];

    // Precise filter for #3C2F2F (Chocolate) starting from black to ensure consistency
    const logoFilter = "brightness(0) saturate(100%) invert(19%) sepia(12%) saturate(995%) hue-rotate(314deg) brightness(93%) contrast(85%)";

    return (
        <>
        <nav
            className={`fixed top-0 left-0 w-full px-6 lg:px-12 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isSolid
                    ? 'bg-white/95 backdrop-blur-md py-2.5 shadow-[0_8px_30px_rgba(60,47,47,0.08)]'
                    : 'bg-transparent py-4 shadow-none'
            }`}
            style={{ zIndex: 9998 }}
        >
            <div className="flex items-center justify-between max-w-7xl mx-auto relative">
                <div className="flex items-center gap-4">
                    <Link to={lp('/')} onClick={() => handleLinkClick('/')} className="flex items-center gap-3">
                        <img 
                            src="/logo-salon-pilar-palomares-malaga.webp" 
                            alt="Logo Salón Pilar Palomares - Peluquería y Estética Orgánica" 
                            className="h-8 md:h-10 w-auto"
                            style={{ 
                                filter: isSolid ? logoFilter : 'brightness(0) invert(1)',
                                transition: 'filter 0.5s ease-[cubic-bezier(0.32,0.72,0,1)]'
                            }}
                        />
                        {/* Branding text restored for more screen sizes */}
                        <div className={`hidden md:flex flex-col border-l pl-3 leading-none transition-colors duration-500 ${isSolid ? 'border-chocolate/20' : 'border-white/20'}`}>
                            <span className={`text-[9px] md:text-[10px] lg:text-xs uppercase tracking-[0.2em] font-medium mb-0.5 transition-colors duration-500 ${isSolid ? 'text-chocolate/40' : 'text-white/60'}`}>Boutique</span>
                            <span className={`text-[11px] lg:text-xs xl:text-sm uppercase tracking-[0.1em] font-bold whitespace-nowrap transition-colors duration-500 ${isSolid ? 'text-chocolate/80' : 'text-white'}`}>Secretos del Agua</span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Links - Adaptive Spacing */}
                <ul className={`hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8 font-sans text-xs lg:text-[13px] xl:text-sm tracking-[0.2em] uppercase transition-colors duration-500 ${isSolid ? 'text-chocolate/70' : 'text-white'}`}>
                    {navLinks.map((link) => (
                        <li key={link.name} className={link.dropdown ? "relative group/nav" : ""}>
                            {link.dropdown ? (
                                <>
                                    <button
                                        className={`relative flex items-center gap-1 cursor-pointer py-2 hover:text-accent-aqua transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-accent-aqua rounded-sm outline-none group/btn ${isGroupActive(link) ? 'text-accent-aqua' : ''}`}
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        {link.name}
                                        <ChevronDown size={14} className="group-hover/nav:rotate-180 transition-transform duration-300" />
                                        <span className={`absolute bottom-0 left-0 h-[1.5px] bg-accent-aqua transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/nav:w-full ${isGroupActive(link) ? 'w-full' : 'w-0'}`}></span>
                                    </button>
                                    <div className={`absolute top-full left-1/2 -translate-x-1/2 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] translate-y-2 group-hover/nav:translate-y-0 pt-4 w-screen ${
                                        link.path === '/bioterapias' ? 'max-w-[320px]' : 'max-w-[280px]'
                                    }`}>
                                        <div className="bg-white rounded-[2rem] border border-sand/30 overflow-hidden p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),_0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                                            <div className="grid grid-cols-1 gap-8 text-center">
                                                {link.dropdown.map((subItem) => (
                                                    <div key={subItem.name} className="flex flex-col space-y-5">
                                                        {subItem.path ? (
                                                            <Link
                                                                to={lp(subItem.path)}
                                                                onClick={() => handleLinkClick(subItem.path)}
                                                                aria-current={isPathActive(subItem.path) ? 'page' : undefined}
                                                                className={`block text-[11px] font-bold tracking-[0.2em] hover:text-accent-aqua transition-colors uppercase border-b border-chocolate/5 pb-3 focus-visible:ring-2 focus-visible:ring-accent-aqua rounded-sm outline-none ${isPathActive(subItem.path) ? 'text-accent-aqua' : 'text-chocolate'}`}
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        ) : (
                                                            <span className="block text-[11px] font-bold tracking-[0.2em] text-chocolate/80 uppercase border-b border-chocolate/5 pb-3">
                                                                {subItem.name}
                                                            </span>
                                                        )}
                                                        {subItem.subItems && (
                                                            <div className="flex flex-col space-y-3">
                                                                {subItem.subItems.map((child) => (
                                                                    <Link
                                                                        key={child.name}
                                                                        to={lp(child.path)}
                                                                        onClick={() => handleLinkClick(child.path)}
                                                                        aria-current={isPathActive(child.path) ? 'page' : undefined}
                                                                        className={`text-[10px] tracking-widest hover:text-accent-aqua transition-colors uppercase leading-relaxed focus-visible:ring-1 focus-visible:ring-accent-aqua rounded-sm outline-none ${isPathActive(child.path) ? 'text-accent-aqua' : 'text-chocolate/50'}`}
                                                                    >
                                                                        {child.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    to={lp(link.path)}
                                    onClick={() => handleLinkClick(link.path)}
                                    aria-current={isGroupActive(link) ? 'page' : undefined}
                                    className={`relative py-2 block hover:text-accent-aqua transition-colors duration-300 group ${isGroupActive(link) ? 'text-accent-aqua' : ''}`}
                                >
                                    {link.name}
                                    <span className={`absolute bottom-0 left-0 h-[1.5px] bg-accent-aqua transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:w-full ${isGroupActive(link) ? 'w-full' : 'w-0'}`}></span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center space-x-3 lg:space-x-4">
                    {/* Selector de idioma (escritorio y tablet) */}
                    <div className="relative group/lang hidden sm:block">
                        <button
                            className={`flex items-center gap-1.5 py-2 px-1 text-xs lg:text-[13px] xl:text-sm tracking-[0.2em] uppercase hover:text-accent-aqua transition-colors duration-500 focus-visible:ring-2 focus-visible:ring-accent-aqua rounded-sm outline-none ${isSolid ? 'text-chocolate/70' : 'text-white'}`}
                            aria-haspopup="true"
                            aria-label={t('nav.idioma')}
                        >
                            <Globe size={14} strokeWidth={1.75} />
                            {lang.toUpperCase()}
                            <ChevronDown size={12} className="group-hover/lang:rotate-180 transition-transform duration-300" />
                        </button>
                        <div className="absolute top-full right-0 opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] translate-y-2 group-hover/lang:translate-y-0 pt-3 w-32">
                            <div className="bg-white rounded-2xl border border-sand/30 overflow-hidden p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),_0_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col gap-1">
                                {LANGS.map((l) => (
                                    <Link
                                        key={l}
                                        to={localizePath(basePath, l)}
                                        aria-current={l === lang ? 'true' : undefined}
                                        className={`px-3 py-2 rounded-xl text-[11px] lg:text-xs font-bold tracking-[0.2em] uppercase transition-colors text-center ${
                                            l === lang
                                                ? 'bg-accent-aqua/10 text-accent-aqua'
                                                : 'text-chocolate/60 hover:text-accent-aqua hover:bg-chocolate/[0.03]'
                                        }`}
                                    >
                                        {{ es: 'Español', en: 'English', de: 'Deutsch', fr: 'Français' }[l]}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link
                        to={lp('/reserva')}
                        onClick={() => handleLinkClick('/reserva')}
                        className="hidden sm:inline-flex btn-primary btn-sm w-[165px] px-2 justify-center text-center"
                    >
                        {t('nav.reservaCita')}
                    </Link>
                    
                    {/* Hamburger Menu Button */}
                    <button 
                        id="hamburger-button"
                        className={`lg:hidden p-2 focus:outline-none relative transition-all duration-300 active:scale-90 rounded-full ${isSolid ? 'text-chocolate hover:bg-chocolate/5' : 'text-white hover:bg-white/10'}`}
                        style={{ zIndex: 10000, position: 'relative' }}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={isOpen ? "true" : "false"}
                    >
                        <div className="flex flex-col gap-1.5 w-6 items-end relative h-5 justify-center">
                            <span className={`h-[1.5px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'rotate-45 translate-y-[5.5px] w-6' : 'w-6'} ${isSolid ? 'bg-chocolate' : 'bg-white'}`}></span>
                            <span className={`h-[1.5px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'opacity-0 w-0' : 'w-4'} ${isSolid ? 'bg-chocolate' : 'bg-white'}`}></span>
                            <span className={`h-[1.5px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? '-rotate-45 -translate-y-[5.5px] w-6' : 'w-6'} ${isSolid ? 'bg-chocolate' : 'bg-white'}`}></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Barra de progreso de lectura (scaleX vía ref, sin re-renders) */}
            <div
                ref={progressRef}
                aria-hidden="true"
                className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-aqua/70 origin-left"
                style={{ transform: 'scaleX(0)' }}
            ></div>
        </nav>

            {/* Premium Mobile Menu Overlay */}
            <div 
                className="fixed inset-0 bg-[#F9F7F2] z-[100] lg:hidden"
                style={{
                    zIndex: 9999,
                    transition: 'transform 0.7s cubic-bezier(0.19,1,0.22,1), opacity 0.7s cubic-bezier(0.19,1,0.22,1)',
                    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    backgroundColor: '#F9F7F2'
                }}
            >
                <div 
                    className="relative w-full h-full flex flex-col p-8 pt-24 overflow-y-auto bg-[#F9F7F2]"
                    style={{ backgroundColor: '#F9F7F2' }}
                >
                    {/* Menu Header with refined branding */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', borderBottom: '1px solid rgba(60,47,47,0.1)', paddingBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#85B7B2', fontWeight: 'bold', marginBottom: '8px' }}>Pilar Palomares</span>
                            <span className="font-serif" style={{ fontSize: '1.1rem', color: '#3c2f2f', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Boutique Secretos del Agua</span>
                        </div>
                    </div>

                    <nav style={{ flexGrow: 1 }}>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {navLinks.map((link, idx) => (
                                <li 
                                    key={link.name} 
                                    style={{ 
                                        overflow: 'hidden',
                                        transitionProperty: 'transform, opacity',
                                        transitionDelay: isOpen ? `${idx * 100}ms` : '0ms',
                                        transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                                        opacity: isOpen ? 1 : 0,
                                        transitionDuration: '800ms',
                                        transitionTimingFunction: 'cubic-bezier(0.19,1,0.22,1)'
                                    }}
                                >
                                    {link.dropdown ? (
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <button 
                                                onClick={() => setOpenSubmenu(openSubmenu === link.name ? null : link.name)}
                                                style={{ 
                                                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                                                    padding: '0.8rem 0', borderBottom: '1px solid rgba(60,47,47,0.05)', 
                                                    background: 'none', border: 'none', cursor: 'pointer',
                                                    borderBottomStyle: 'solid', borderBottomWidth: '1px', borderBottomColor: 'rgba(60,47,47,0.05)'
                                                }}
                                            >
                                                <span className="font-serif" style={{ 
                                                    fontSize: '1.2rem', 
                                                    transition: 'all 0.5s', 
                                                    color: openSubmenu === link.name ? '#85B7B2' : '#3c2f2f',
                                                    transform: openSubmenu === link.name ? 'scale(1.05)' : 'scale(1)',
                                                    display: 'inline-block'
                                                }}>
                                                    {link.name}
                                                </span>
                                                <ChevronDown 
                                                    size={20} 
                                                    style={{
                                                        color: '#85B7B2',
                                                        transition: 'transform 0.5s',
                                                        transform: openSubmenu === link.name ? 'rotate(180deg)' : 'rotate(0deg)'
                                                    }}
                                                />
                                            </button>
                                            
                                            {/* Submenu Accordion */}
                                            <div style={{
                                                overflow: 'hidden',
                                                transition: 'max-height 0.7s ease-in-out, opacity 0.7s ease-in-out, padding 0.7s ease-in-out',
                                                maxHeight: openSubmenu === link.name ? '800px' : '0',
                                                opacity: openSubmenu === link.name ? 1 : 0,
                                                paddingTop: openSubmenu === link.name ? '1rem' : '0',
                                                paddingBottom: openSubmenu === link.name ? '1rem' : '0',
                                            }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: '1rem', borderLeft: '2px solid rgba(71,89,81,0.2)' }}>
                                                    {link.dropdown.map((subItem) => (
                                                        <div key={subItem.name} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                            {subItem.path ? (
                                                                <Link
                                                                    to={lp(subItem.path)}
                                                                    className="font-serif"
                                                                    style={{ fontSize: '1.125rem', color: '#3c2f2f', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
                                                                    onClick={() => handleLinkClick(subItem.path)}
                                                                >
                                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(133,183,178,0.4)', flexShrink: 0 }}></span>
                                                                    {subItem.name}
                                                                </Link>
                                                            ) : (
                                                                <div className="font-serif" style={{ fontSize: '1.125rem', color: '#3c2f2f', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.8 }}>
                                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(133,183,178,0.4)', flexShrink: 0 }}></span>
                                                                    {subItem.name}
                                                                </div>
                                                            )}
                                                            
                                                            {subItem.subItems && (
                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem', borderLeft: '1px solid rgba(60,47,47,0.05)' }}>
                                                                    {subItem.subItems.map((child) => (
                                                                        <Link
                                                                            key={child.name}
                                                                            to={lp(child.path)}
                                                                            style={{ fontSize: '11px', color: 'rgba(60,47,47,0.6)', textTransform: 'uppercase', letterSpacing: '0.15em', padding: '4px 0', textDecoration: 'none' }}
                                                                            onClick={() => handleLinkClick(child.path)}
                                                                        >
                                                                            {child.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            to={lp(link.path)}
                                            className="font-serif"
                                            style={{
                                                display: 'block', padding: '0.8rem 0', borderBottom: '1px solid rgba(60,47,47,0.05)',
                                                fontSize: '1.2rem', color: '#3c2f2f', textDecoration: 'none',
                                                transition: 'all 0.3s'
                                            }}
                                            onClick={() => handleLinkClick(link.path)}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer Area: Enhanced Social & Reserve */}
                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(60,47,47,0.05)' }}>
                        {/* Selector de idioma (móvil) */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(60,47,47,0.4)', fontWeight: 'bold', display: 'block', marginBottom: '0.6rem' }}>{t('nav.idioma')}</span>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {LANGS.map((l) => (
                                    <Link
                                        key={l}
                                        to={localizePath(basePath, l)}
                                        onClick={() => setIsOpen(false)}
                                        className={`px-3.5 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-colors border ${
                                            l === lang
                                                ? 'bg-accent-aqua text-white border-accent-aqua'
                                                : 'text-chocolate/60 border-chocolate/15 hover:border-accent-aqua hover:text-accent-aqua'
                                        }`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        {l.toUpperCase()}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
                            <div>
                                <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(60,47,47,0.4)', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>{t('nav.siguenos')}</span>
                                <div style={{ display: 'flex', gap: '1.25rem' }}>
                                    <a href="https://www.instagram.com/salon_pilar_palomares/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Salón Pilar Palomares" className="text-chocolate/60 hover:text-accent-aqua transition-all duration-300 transform hover:-translate-y-1 block"><Instagram size={20} /></a>
                                    <a href="https://www.facebook.com/Salonpilarpalomares" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Salón Pilar Palomares" className="text-chocolate/60 hover:text-accent-aqua transition-all duration-300 transform hover:-translate-y-1 block"><Facebook size={20} /></a>
                                    <a href="https://www.tiktok.com/@salon.pilarpalomares" target="_blank" rel="noopener noreferrer" aria-label="TikTok de Salón Pilar Palomares" className="text-chocolate/60 hover:text-accent-aqua transition-all duration-300 transform hover:-translate-y-1 block"><TikTokIcon size={19} /></a>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Link
                                    to={lp('/reserva')}
                                    className="btn-primary w-full"
                                    onClick={() => handleLinkClick('/reserva')}
                                >
                                    {t('nav.reserva')}
                                </Link>
                            </div>
                        </div>
                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(60,47,47,0.3)', fontWeight: 500 }}>
                                {t('nav.ubicacion')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
