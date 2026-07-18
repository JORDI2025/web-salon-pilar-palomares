// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Moon, Sun, Star, Sparkles, ArrowRight, Calendar, Droplets } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { registerNS } from '../i18n';
import Button from '../components/Button';
import SEO from '../components/SEO';
import Sello from '../components/Sello';
import nsEs from '../locales/calendario-biodinamico/es.json';
import nsEn from '../locales/calendario-biodinamico/en.json';
import nsDe from '../locales/calendario-biodinamico/de.json';
import nsFr from '../locales/calendario-biodinamico/fr.json';

registerNS('calendario-biodinamico', { es: nsEs, en: nsEn, de: nsDe, fr: nsFr });

gsap.registerPlugin(ScrollTrigger);

const STATIC_STARS = [...Array(30)].map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 2,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
}));

const CalendarioBiodinamico = () => {
    const { t } = useTranslation('calendario-biodinamico');
    const mainRef = useRef(null);
    const detailsRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const ctx = gsap.context(() => {
            // Hero Animation with soft blur
            gsap.fromTo('.hero-text', 
                { opacity: 0, scale: 0.95, y: 30, filter: 'blur(10px)' }, 
                { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 2, ease: 'expo.out', stagger: 0.3 }
            );

            // July sections reveal
            gsap.fromTo('.july-section-reveal',
                { opacity: 0, y: 40, filter: 'blur(6px)' },
                { 
                    opacity: 1, 
                    y: 0, 
                    filter: 'blur(0px)',
                    duration: 1.4, 
                    stagger: 0.3, 
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.july-container',
                        start: 'top 80%',
                    }
                }
            );

            // Floating stars effect
            gsap.to('.star-float', {
                y: -20,
                duration: 'random(2, 4)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: {
                    amount: 2,
                    from: 'random'
                }
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="bg-offwhite min-h-screen font-sans text-chocolate overflow-x-hidden">
            <SEO 
                title={t('seo.title')}
                canonical="/calendario-biodinamico"
                description={t('seo.description')}
                keywords={[
                    "calendario biodinamico capilar",
                    "calendario lunar cortar pelo malaga",
                    "fases lunares cabello secretos del agua",
                    "belleza biodinamica torre de benagalbon",
                    "estetica natural rincon de la victoria",
                    "corte de pelo segun la luna anoreta"
                ]}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "Calendario Biodinámico Lunar y Capilar - Salón Pilar Palomares",
                    "description": "Aprende a cuidar y cortar tu cabello siguiendo los ciclos lunares y ritmos biodinámicos naturales de la tierra con el Salón Pilar Palomares en Torre de Benagalbón, Málaga.",
                    "url": "https://salonpilarpalomares.es/calendario-biodinamico"
                }}
            />
            <section className="relative h-[100dvh] flex items-center justify-center bg-offwhite overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/images/portada-calendario-biodinamico.webp"
                        alt={t('hero.imgAlt')}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-chocolate/5"></div>
                </div>
                
                {/* Decorative Elements */}
                {STATIC_STARS.map((star) => (
                    <Star 
                        key={star.id} 
                        className="absolute text-chocolate/20 star-float opacity-30" 
                        size={star.size}
                        style={{
                            top: star.top,
                            left: star.left,
                        }}
                    />
                ))}

                <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
                    <span className="hero-text inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-aqua/15 border border-accent-aqua/30 text-accent-aqua text-[10px] md:text-xs tracking-[0.25em] font-sans font-bold uppercase mb-8 backdrop-blur-sm shadow-sm select-none">
                        {t('hero.eyebrow')}
                    </span>
                    <h1 className="hero-text text-5xl md:text-7xl font-serif mb-8 leading-tight uppercase tracking-tight text-white drop-shadow-lg">
                        {t('hero.title1')} <br /> <span className="text-accent-aqua">{t('hero.title2')}</span>
                    </h1>
                    <p className="hero-text text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed normal-case">
                        {t('hero.desc')}
                    </p>
                </div>
            </section>

            {/* ═══════════════ CONCEPT SECTION ═══════════════ */}
            <section className="pt-20 pb-24 md:pt-24 md:pb-32 px-6 lg:px-20 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-sand/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="max-w-7xl mx-auto">
                    {/* ═══════════════ EL RITMO DEL AGUA (REDISEÑADO) ═══════════════ */}
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-24 md:mb-32">
                        {/* TÍTULO EN MÓVIL/TABLET (Encima de la foto) */}
                        <div className="lg:hidden reveal-item text-center md:text-left w-full">
                            <span className="eyebrow-badge">{t('agua.eyebrow')}</span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif leading-[1.1] uppercase text-chocolate mb-6">
                                {t('agua.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('agua.title2')}</span>
                            </h2>
                        </div>

                        {/* FOTOGRAFÍA (Abajo del título en móvil, izquierda en PC) */}
                        <div className="reveal-item w-full relative group lg:order-1 mb-8 lg:mb-0 max-w-md mx-auto lg:max-w-none">
                            <div className="double-bezel-wrapper aspect-square md:aspect-[4/5] relative z-10">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                    <img 
                                        src="/images/ritmo-del-agua-cosmos-pilar-palomares.webp"
                                        alt={t('agua.imgAlt')}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                    <div className="absolute inset-0 bg-accent-aqua/10 mix-blend-overlay"></div>
                                </div>
                            </div>
                            <div className="hidden lg:block absolute -bottom-8 -left-8 w-full h-full border border-accent-aqua/20 rounded-[2.5rem] -z-10 translate-x-4 translate-y-4"></div>
                        </div>

                        {/* CONTENIDO (Orden 2 en PC) */}
                        <div className="reveal-item lg:order-2 w-full text-left">
                            {/* TÍTULO EN ESCRITORIO (Al lado de la foto) */}
                            <div className="hidden lg:block mb-10">
                                <span className="eyebrow-badge">{t('agua.eyebrow')}</span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif leading-[1.1] uppercase text-chocolate">
                                    {t('agua.title1')} <br /> <span className="text-accent-aqua">{t('agua.title2')}</span>
                                </h2>
                            </div>
                            
                            <p className="text-base text-chocolate/80 leading-relaxed font-sans normal-case mb-10">
                                {t('agua.desc')}
                            </p>
                            
                            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-chocolate/5">
                                <div className="flex flex-col items-center group text-center">
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent-aqua/10 flex items-center justify-center mb-4 group-hover:bg-accent-aqua group-hover:text-white text-accent-aqua transition-all duration-500 shadow-sm border border-accent-aqua/20 spring-bounce group-hover:-translate-y-1.5 group-hover:shadow-md group-hover:shadow-accent-aqua/20">
                                        <Droplets size={24} />
                                    </div>
                                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-chocolate/60">{t('agua.stat1')}</span>
                                </div>
                                <div className="flex flex-col items-center group text-center">
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent-aqua/10 flex items-center justify-center mb-4 group-hover:bg-accent-aqua group-hover:text-white text-accent-aqua transition-all duration-500 shadow-sm border border-accent-aqua/20 spring-bounce group-hover:-translate-y-1.5 group-hover:shadow-md group-hover:shadow-accent-aqua/20" style={{transitionDelay: "50ms"}}>
                                        <Sun size={24} />
                                    </div>
                                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-chocolate/60">{t('agua.stat2')}</span>
                                </div>
                                <div className="flex flex-col items-center group text-center">
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent-aqua/10 flex items-center justify-center mb-4 group-hover:bg-accent-aqua group-hover:text-white text-accent-aqua transition-all duration-500 shadow-sm border border-accent-aqua/20 spring-bounce group-hover:-translate-y-1.5 group-hover:shadow-md group-hover:shadow-accent-aqua/20" style={{transitionDelay: "100ms"}}>
                                        <Moon size={24} />
                                    </div>
                                    <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-chocolate/60">{t('agua.stat3')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
 
            {/* ═══════════════ DETALLES DEL CALENDARIO DE JULIO ═══════════════ */}
            <div ref={detailsRef} id="july-details" className="july-container bg-offwhite bg-noise relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="text-center pt-16 pb-6 relative z-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif uppercase tracking-tight text-chocolate leading-[1.1] mb-4">
                        {t('julio.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('julio.title2')}</span>
                    </h2>
                    <p className="text-sm md:text-base uppercase tracking-[0.2em] font-sans font-bold text-accent-aqua">
                        {t('julio.eyebrow')}
                    </p>
                </div>

                {/* SECCIÓN INTRO CALENDARIO DE JULIO (Integrada en la sección gris crema) */}
                <section className="pb-16 px-6 lg:px-20 relative overflow-hidden z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Portada - Double Bezel Wrapper */}
                            <div className="reveal w-full max-w-md mx-auto lg:max-w-none">
                                <div className="double-bezel-wrapper aspect-[3/4] relative z-10">
                                    <div className="w-full h-full double-bezel-inner overflow-hidden relative rounded-[2rem]">
                                        <img 
                                            src="/images/calendario-cosmos-julio-portada-pilar-palomares.webp"
                                            alt={t('julio.imgAlt1')}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-chocolate/5"></div>
                                        {/* Sello Calendario Biodinámico */}
                                        <div className="absolute bottom-4 left-4 w-16 h-16 md:bottom-6 md:left-6 md:w-20 md:h-20 lg:w-24 lg:h-24 z-20 hover:scale-110 hover:rotate-12 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_4px_12px_rgba(60,47,47,0.08)]">
                                            <Sello name="calendario-biodinamico" className="text-accent-aqua" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Texto Intro */}
                            <div className="w-full text-left">
                                <span className="eyebrow-badge">{t('julio.title1')} <span className="text-accent-aqua">{t('julio.title2')}</span></span>
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-[1.1] uppercase text-chocolate mb-8">
                                    {t('julio.introTitle1')} <br /> <span className="text-accent-aqua">{t('julio.introTitle2')}</span>
                                </h3>
                                <p className="text-base text-chocolate/80 leading-relaxed font-sans normal-case mb-6">
                                    {t('julio.introText1')}
                                </p>
                                <p className="text-base text-chocolate/80 leading-relaxed font-sans normal-case mb-10">
                                    {t('julio.introText2')}
                                </p>
                                
                                <Button 
                                    href="/calendario-biodinamico-julio-2026.pdf"
                                    download="calendario-biodinamico-julio-2026.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="primary"
                                >
                                    {t('julio.downloadBtn')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 01 · Haircare */}
                <section className="py-12 md:py-20 px-6 lg:px-20 bg-offwhite relative overflow-hidden july-section-reveal">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Imagen Cabello (Derecha en PC) */}
                            <div className="w-full max-w-md mx-auto lg:max-w-none lg:order-2 order-1">
                                <div className="double-bezel-wrapper aspect-[3/4] relative z-10">
                                    <div className="w-full h-full double-bezel-inner overflow-hidden relative rounded-[2rem]">
                                        <img 
                                            src="/images/calendario-cosmos-julio-cabello-pilar-palomares.webp"
                                            alt={t('corte.imgAlt')}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-chocolate/5"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Contenido Cabello (Izquierda en PC) */}
                            <div className="w-full text-left lg:order-1 order-2">
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif uppercase tracking-tight text-chocolate mb-6">
                                    {t('corte.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('corte.title2')}</span>
                                </h3>
                                <p className="text-base text-chocolate/80 leading-relaxed font-sans normal-case mb-10">
                                    {t('corte.desc')}
                                </p>

                                {/* Listado de Fechas */}
                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-4 border-b border-chocolate/5 items-start">
                                        <span className="text-sm font-bold text-accent-aqua font-sans min-w-[120px] shrink-0">{t('corte.label4_6')}</span>
                                        <p className="text-base text-chocolate/80 normal-case leading-relaxed">
                                            {t('corte.d4_6')}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-4 border-b border-chocolate/5 items-start">
                                        <span className="text-sm font-bold text-accent-aqua font-sans min-w-[120px] shrink-0">{t('corte.label6_8')}</span>
                                        <p className="text-base text-chocolate/80 normal-case leading-relaxed">
                                            {t('corte.d6_8')}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-4 border-b border-chocolate/5 items-start">
                                        <span className="text-sm font-bold text-accent-aqua font-sans min-w-[120px] shrink-0">{t('corte.label12_26')}</span>
                                        <p className="text-base text-chocolate/80 normal-case leading-relaxed">
                                            {t('corte.d12_26')}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-4 border-b border-chocolate/5 items-start">
                                        <span className="text-sm font-bold text-accent-aqua font-sans min-w-[120px] shrink-0">{t('corte.label18_22')}</span>
                                        <p className="text-base text-chocolate/80 normal-case leading-relaxed">
                                            {t('corte.d18_22')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 02 · Coloración */}
                <section className="py-12 md:py-20 px-6 lg:px-20 bg-offwhite relative overflow-hidden july-section-reveal">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Contenido Color (Derecha en PC) */}
                            <div className="w-full text-left">
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif uppercase tracking-tight text-chocolate mb-6">
                                    {t('color.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('color.title2')}</span>
                                </h3>
                                <p className="text-base text-chocolate/80 leading-relaxed font-sans normal-case mb-10">
                                    {t('color.desc')}
                                </p>

                                {/* Listado de Fechas */}
                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-4 border-b border-chocolate/5 items-start">
                                        <span className="text-sm font-bold text-coral font-sans min-w-[120px] shrink-0">{t('color.label13_14')}</span>
                                        <p className="text-base text-chocolate/80 normal-case leading-relaxed">
                                            {t('color.d13_14')}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-4 border-b border-chocolate/5 items-start">
                                        <span className="text-sm font-bold text-coral font-sans min-w-[120px] shrink-0">{t('color.label16_18')}</span>
                                        <p className="text-base text-chocolate/80 normal-case leading-relaxed">
                                            {t('color.d16_18')}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-4 border-b border-chocolate/5 items-start">
                                        <span className="text-sm font-bold text-coral font-sans min-w-[120px] shrink-0">{t('color.label18_22')}</span>
                                        <p className="text-base text-chocolate/80 normal-case leading-relaxed">
                                            {t('color.d18_22')}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-4 border-b border-chocolate/5 items-start">
                                        <span className="text-sm font-bold text-coral font-sans min-w-[120px] shrink-0">{t('color.label22_23')}</span>
                                        <p className="text-base text-chocolate/80 normal-case leading-relaxed">
                                            {t('color.d22_23')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Imagen Color (Izquierda en PC) */}
                            <div className="w-full max-w-md mx-auto lg:max-w-none">
                                <div className="double-bezel-wrapper aspect-[3/4] relative z-10">
                                    <div className="w-full h-full double-bezel-inner overflow-hidden relative rounded-[2rem]">
                                        <img 
                                            src="/images/calendario-cosmos-julio-color-pilar-palomares.webp"
                                            alt={t('color.imgAlt')}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-chocolate/5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 03 · Piel / Depilación */}
                <section className="py-12 md:py-20 px-6 lg:px-20 bg-offwhite relative overflow-hidden july-section-reveal">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Imagen Piel (Derecha en PC) */}
                            <div className="w-full max-w-md mx-auto lg:max-w-none lg:order-2 order-1">
                                <div className="double-bezel-wrapper aspect-[3/4] relative z-10">
                                    <div className="w-full h-full double-bezel-inner overflow-hidden relative rounded-[2rem]">
                                        <img 
                                            src="/images/calendario-cosmos-julio-piel-pilar-palomares.webp"
                                            alt={t('depil.imgAlt')}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-chocolate/5"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Contenido Piel (Izquierda en PC) */}
                            <div className="w-full text-left lg:order-1 order-2">
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif uppercase tracking-tight text-chocolate mb-6">
                                    {t('depil.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('depil.title2')}</span>
                                </h3>
                                <p className="text-base text-chocolate/80 leading-relaxed font-sans normal-case mb-10">
                                    {t('depil.desc')}
                                </p>

                                {/* Listado de Fechas */}
                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-4 border-b border-chocolate/5 items-start">
                                        <span className="text-sm font-bold text-accent-aqua font-sans min-w-[120px] shrink-0">{t('depil.label13_14')}</span>
                                        <p className="text-base text-chocolate/80 normal-case leading-relaxed">
                                            {t('depil.d13_14')}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-4 border-b border-chocolate/5 items-start">
                                        <span className="text-sm font-bold text-accent-aqua font-sans min-w-[120px] shrink-0">{t('depil.label22_23')}</span>
                                        <p className="text-base text-chocolate/80 normal-case leading-relaxed">
                                            {t('depil.d22_23')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 04 · Tratamientos faciales y corporales */}
                <section className="py-12 md:py-20 px-6 lg:px-20 bg-offwhite relative overflow-hidden july-section-reveal">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Contenido Tratamientos (Derecha en PC) */}
                            <div className="w-full text-left">
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif uppercase tracking-tight text-chocolate mb-6">
                                    {t('treat.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('treat.title2')}</span>
                                </h3>
                                <p className="text-base text-chocolate/80 leading-relaxed font-sans normal-case mb-10">
                                    {t('treat.desc')}
                                </p>

                                {/* Listado de Fechas */}
                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-4 border-b border-chocolate/5 items-start">
                                        <span className="text-sm font-bold text-coral font-sans min-w-[120px] shrink-0">{t('treat.label6_8')}</span>
                                        <p className="text-base text-chocolate/80 normal-case leading-relaxed">
                                            {t('treat.d6_8')}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-4 border-b border-chocolate/5 items-start">
                                        <span className="text-sm font-bold text-coral font-sans min-w-[120px] shrink-0">{t('treat.label13_22')}</span>
                                        <p className="text-base text-chocolate/80 normal-case leading-relaxed">
                                            {t('treat.d13_22')}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-4 border-b border-chocolate/5 items-start">
                                        <span className="text-sm font-bold text-coral font-sans min-w-[120px] shrink-0">{t('treat.label22_26')}</span>
                                        <p className="text-base text-chocolate/80 normal-case leading-relaxed">
                                            {t('treat.d22_26')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Imagen Tratamientos (Izquierda en PC) */}
                            <div className="w-full max-w-md mx-auto lg:max-w-none">
                                <div className="double-bezel-wrapper aspect-[3/4] relative z-10">
                                    <div className="w-full h-full double-bezel-inner overflow-hidden relative rounded-[2rem]">
                                        <img 
                                            src="/images/calendario-cosmos-julio-tratamientos-pilar-palomares.webp"
                                            alt={t('treat.imgAlt')}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-chocolate/5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CalendarioBiodinamico;
