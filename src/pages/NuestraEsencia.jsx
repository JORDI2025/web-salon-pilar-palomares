import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Leaf, Sparkles, Wind, Globe, Heart, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { registerNS } from '../i18n';
import Button from '../components/Button';
import SEO from '../components/SEO';
import Sello from '../components/Sello';
import nsEs from '../locales/nuestra-esencia/es.json';
import nsEn from '../locales/nuestra-esencia/en.json';
import nsDe from '../locales/nuestra-esencia/de.json';
import nsFr from '../locales/nuestra-esencia/fr.json';

registerNS('nuestra-esencia', { es: nsEs, en: nsEn, de: nsDe, fr: nsFr });

gsap.registerPlugin(ScrollTrigger);

const NuestraEsencia = () => {
    const { t } = useTranslation('nuestra-esencia');
    const mainRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const ctx = gsap.context(() => {
            // Hero Animation with soft blur
            gsap.fromTo('.hero-text', 
                { opacity: 0, y: 30, filter: 'blur(10px)' }, 
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'expo.out', stagger: 0.2 }
            );

            // General Reveal Animation for sections with soft blur
            const revealSections = document.querySelectorAll('.reveal-section');
            revealSections.forEach((section) => {
                gsap.fromTo(section.querySelectorAll('.reveal-item'),
                    { opacity: 0, y: 30, filter: 'blur(5px)' },
                    { 
                        opacity: 1, 
                        y: 0, 
                        filter: 'blur(0px)',
                        duration: 1.2, 
                        stagger: 0.2, 
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });

            // Parallax effect for images
            gsap.utils.toArray('.parallax-img').forEach(img => {
                gsap.to(img, {
                    yPercent: 15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: img,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="bg-offwhite min-h-screen font-sans text-chocolate overflow-x-hidden">
            <SEO
                title={t('seo.title')}
                canonical="/nuestra-esencia"
                description={t('seo.description')}
                keywords={[
                    "belleza consciente malaga",
                    "peluqueria sostenible rincon de la victoria",
                    "cosmetica biodinamica secretos del agua torre de benagalbon",
                    "salon de belleza ecologico anoreta",
                    "estetica natural chilches",
                    "bienestar organico torre del mar",
                    "filosofia secretos del agua málaga"
                ]}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    "name": "Nuestra Esencia - Salón Pilar Palomares",
                    "description": "Descubre la filosofía de belleza consciente, sostenibilidad y cosmética biodinámica de Secretos del Agua en el Salón Pilar Palomares en Torre de Benagalbón, Málaga.",
                    "url": "https://salonpilarpalomares.es/nuestra-esencia",
                    "mainEntity": {
                        "@type": "Organization",
                        "name": "Salón Pilar Palomares",
                        "url": "https://salonpilarpalomares.es",
                        "logo": "https://salonpilarpalomares.es/assets_logos/logo-pilar-palomares.png"
                    }
                }}
            />
            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-chocolate">
                <div className="absolute inset-0 z-0 group">
                    <img 
                        src="/images/nuestra-esencia-filosofia-belleza-organica.webp"
                        alt={t('hero.imgAlt')}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s]"
                    />
                    <div className="absolute inset-0 bg-chocolate/30 transition-colors duration-1000"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sand/10 -translate-y-32 translate-x-32 rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
                    <span className="hero-text inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-aqua/15 border border-accent-aqua/30 text-accent-aqua text-[10px] md:text-xs tracking-[0.25em] font-sans font-bold uppercase mb-8 backdrop-blur-sm shadow-sm select-none">
                        {t('hero.eyebrow')}
                    </span>
                    <h1 className="hero-text text-5xl md:text-7xl font-serif mb-8 leading-tight uppercase tracking-tight text-white drop-shadow-lg">
                        {t('hero.title1')} <br /> <span className="text-accent-aqua">{t('hero.title2')}</span>
                    </h1>
                    <p className="hero-text text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed normal-case">
                        {t('hero.text')}
                    </p>
                </div>

            </section>

            {/* ═══════════════ SECTION 1: NUESTRA HISTORIA / TRAYECTORIA ═══════════════ */}
            <section className="py-24 md:py-32 px-6 lg:px-20 bg-offwhite bg-noise reveal-section overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="reveal-item text-center mb-16 lg:mb-24">
                        <h2 className="eyebrow-badge">{t('historia.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif leading-[1.1] uppercase text-chocolate">{t('historia.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('historia.title2')}</span></h2>
                    </div>
                    
                    {/* Grid de dos columnas para PC */}
                    {/* Mobile/Tablet image immediately below the title */}
                    <div className="w-full lg:hidden mb-12 double-bezel-wrapper aspect-square group max-w-md mx-auto">
                        <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                            <img 
                                src="/images/pilar-palomares-equipo.webp"
                                alt={t('historia.imgAlt')}
                                className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                            />
                            <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors"></div>
                            {/* Sello Firma Pilar Palomares - Mobile */}
                            <div className="absolute bottom-4 right-4 w-16 h-16 z-20 drop-shadow-[0_4px_8px_rgba(60,47,47,0.08)]">
                                <Sello name="pilar-palomares" className="text-chocolate" />
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center reveal-item">
                        
                        {/* Lado de la imagen con Double-Bezel */}
                        <div className="hidden lg:block double-bezel-wrapper aspect-square group">
                            <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                <img 
                                    src="/images/pilar-palomares-equipo.webp"
                                    alt={t('historia.imgAlt')}
                                    className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                />
                                <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors"></div>
                                {/* Sello Firma Pilar Palomares - Desktop */}
                                <div className="absolute bottom-6 right-6 w-20 h-20 lg:w-24 lg:h-24 z-20 hover:scale-110 hover:rotate-12 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_4px_12px_rgba(60,47,47,0.08)]">
                                    <Sello name="pilar-palomares" className="text-chocolate" />
                                </div>
                            </div>
                        </div>

                        {/* Lado del texto */}
                        <div className="space-y-8 text-left">
                            <div className="bg-accent-aqua/80 backdrop-blur-md p-8 md:p-10 rounded-[3rem] border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-accent-aqua/20 transition-all duration-500 transform hover:-translate-y-2 relative group">
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Sparkles size={24} className="text-accent-aqua" />
                                </div>
                                <p className="text-base font-serif italic text-white leading-relaxed m-0">
                                    {t('historia.quote')}
                                </p>
                                <div className="w-12 h-[1px] bg-white/30 mt-6"></div>
                            </div>
                            <div className="pt-4 space-y-6">
                                <p className="text-lg text-chocolate/80 leading-relaxed normal-case">
                                    {t('historia.p1')}
                                </p>
                                <p className="text-lg text-chocolate/80 leading-relaxed normal-case">
                                    {t('historia.p2')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ SECTION 2: LA BELLEZA DEL DESPERTAR ═══════════════ */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-16 px-6 lg:px-20 bg-white bg-noise reveal-section relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="reveal-item mb-16">
                        <h2 className="eyebrow-badge">{t('despertar.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-10 md:mb-12 lg:mb-20 leading-[1.1] uppercase text-chocolate">{t('despertar.title1')} <br className="hidden md:block"/> <span className="text-accent-aqua">{t('despertar.title2')}</span></h2>
                        
                        {/* Imagen de ritual movida y centrada - Restaurada a Cuadrada con Double-Bezel */}
                        <div className="reveal-item w-full max-w-md mx-auto mb-16 px-4 md:px-0 group relative">
                            <div className="double-bezel-wrapper aspect-square">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative z-10">
                                    <img 
                                        src="/images/cultura/belleza-del-despertar-pilar-palomares.webp" 
                                        alt={t('despertar.imgAlt')}
                                        loading="lazy"
                                        className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-all duration-[3s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                    <div className="absolute inset-0 bg-chocolate/5"></div>
                                </div>
                            </div>
                            
                            {/* Tarjeta anidada - Estilo Earth Edition 2026 */}
                            <div className="hidden lg:block absolute bottom-12 -right-24 bg-accent-aqua/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl z-20 max-w-[280px] border border-white/20 transform hover:scale-110 transition-transform duration-500 text-left group">
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                                    <Sparkles size={24} className="text-accent-aqua" />
                                </div>
                                <p className="font-serif text-base italic text-white leading-relaxed">
                                    {t('despertar.quote')}
                                </p>
                                <div className="w-8 h-[1px] bg-white/30 mt-4"></div>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start text-left">
                            <div className="space-y-10">
                                <p className="text-base md:text-lg text-chocolate/80 leading-relaxed normal-case">
                                    {t('despertar.text')}
                                </p>
                                
                                <div className="space-y-8">
                                    <div className="flex gap-6 group">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full border border-chocolate/5 flex items-center justify-center group-hover:bg-sand/30 group-hover:border-sand/40 transition-all duration-500">
                                            <Globe className="text-chocolate/60 group-hover:text-chocolate transition-colors" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-serif uppercase tracking-widest mb-1 text-chocolate">{t('despertar.item1Title')}</h3>
                                            <p className="text-base text-chocolate/80 leading-relaxed">{t('despertar.item1Text')}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 group">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full border border-chocolate/5 flex items-center justify-center group-hover:bg-sand/30 group-hover:border-sand/40 transition-all duration-500">
                                            <Heart className="text-chocolate/60 group-hover:text-chocolate transition-colors" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-serif uppercase tracking-widest mb-1 text-chocolate">{t('despertar.item2Title')}</h3>
                                            <p className="text-base text-chocolate/80 leading-relaxed">{t('despertar.item2Text')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Segunda Columna Image 2 con Double-Bezel */}
                            <div className="relative group max-w-md mx-auto w-full">
                                <div className="double-bezel-wrapper aspect-square">
                                    <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                        <img 
                                            src="/images/cultura/la-belleza-del-despertar-4.webp"
                                            alt={t('despertar.img2Alt')}
                                            className="w-full h-full object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105" 
                                        />
                                    </div>
                                </div>

                                {/* Tarjeta estilo Earth Edition 2026 en móvil/tablet */}
                                <div className="lg:hidden relative bg-accent-aqua/80 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-white/20 mt-[-20px] md:mt-[-30px] mx-4 z-20 text-left shadow-lg hover:shadow-2xl hover:shadow-accent-aqua/20 transition-all duration-500 transform hover:-translate-y-1 group">
                                    <div className="absolute -top-4 -right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                                        <Sparkles size={20} className="text-accent-aqua" />
                                    </div>
                                    <p className="font-serif text-base italic text-white leading-relaxed">
                                        "La belleza real comienza en el momento en que decides ser tú misma."
                                    </p>
                                    <div className="w-8 h-[1px] bg-white/30 mt-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ SECTION 2: VISION DEL SALÓN ═══════════════ */}
            <section className="pt-12 pb-24 md:pt-16 md:pb-32 bg-offwhite bg-noise text-chocolate overflow-hidden reveal-section relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
                    <div className="text-center mb-20 reveal-item">
                        <h2 className="eyebrow-badge">{t('refugio.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-8 leading-[1.1] uppercase text-chocolate">{t('refugio.title1')} <br /> <span className="text-accent-aqua">{t('refugio.title2')}</span></h2>
                        <div className="w-20 h-[1px] bg-chocolate/30 mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 reveal-item">
                        {/* CARD 1 */}
                        <div className="relative h-[450px] group overflow-hidden rounded-[3rem] shadow-lg">
                            <img 
                                src="/images/home/hero1-movil-home-pilar-palomares.webp" 
                                alt={t('refugio.card1Alt')}
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-chocolate/60 group-hover:bg-chocolate/40 transition-colors duration-500"></div>
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                    <Leaf className="text-white" size={24} />
                                </div>
                                <h3 className="text-xl font-serif uppercase tracking-widest mb-3">{t('refugio.card1Title')}</h3>
                                <p className="text-base text-white/90 leading-relaxed normal-case">
                                    {t('refugio.card1Text')}
                                </p>

                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="relative h-[450px] group overflow-hidden rounded-[3rem] shadow-lg">
                            <img 
                                src="/images/chica-luz-pilar-palomares.webp" 
                                alt={t('refugio.card2Alt')}
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover object-top scale-120 md:scale-125 transition-transform duration-1000 group-hover:scale-140"
                            />
                            {/* Overlay degradado suave inferior para legibilidad en lugar de filtro completo */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                                    <Sparkles className="text-white" size={24} />
                                </div>
                                <h3 className="text-xl font-serif uppercase tracking-widest mb-3">{t('refugio.card2Title')}</h3>
                                <p className="text-base text-white/90 leading-relaxed normal-case">
                                    {t('refugio.card2Text')}
                                </p>

                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className="relative h-[450px] group overflow-hidden rounded-[3rem] shadow-lg bg-[#E3D9D1]">
                            <img 
                                src="/images/chicas-pilar-palomares.webp"
                                alt={t('refugio.card3Alt')}
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-contain scale-[1.20] md:scale-100 md:object-cover md:object-[center_20%] transition-transform duration-1000 group-hover:scale-[1.25] md:group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-chocolate/40 group-hover:bg-chocolate/20 transition-colors duration-500"></div>
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                    <Heart className="text-white" size={24} />
                                </div>
                                <h3 className="text-xl font-serif uppercase tracking-widest mb-3">{t('refugio.card3Title')}</h3>
                                <p className="text-base text-white/90 leading-relaxed normal-case">
                                    {t('refugio.card3Text')}
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ SECTION 3: MÉTODO BIODINÁMICO ═══════════════ */}
            <section className="py-24 md:py-32 px-6 lg:px-20 bg-white bg-noise reveal-section overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* TÍTULO EN MÓVIL (Encima de la foto) */}
                        <div className="lg:hidden reveal-item text-center md:text-left w-full">
                            <h3 className="eyebrow-badge">{t('metodo.eyebrow')}</h3>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif leading-[1.1] uppercase text-chocolate">{t('metodo.title1')} <br className="hidden md:block"/> <span className="text-accent-aqua">{t('metodo.title2')}</span></h2>
                        </div>

                        <div className="reveal-item w-full relative group lg:order-1">
                            <div className="absolute -inset-10 bg-sand/5 rounded-full blur-3xl -z-10"></div>
                            <div className="double-bezel-wrapper">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                    <img 
                                        src="/images/agricultura-biodinamica-pilar-palomares.webp" 
                                        alt={t('metodo.imgAlt')}
                                        loading="lazy"
                                        className="w-full h-auto object-cover block scale-[1.03] group-hover:scale-110 transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="reveal-item lg:order-2 w-full">
                            {/* TÍTULO EN ESCRITORIO (Al lado de la foto) */}
                             <div className="hidden lg:block">
                                <h3 className="eyebrow-badge">{t('metodo.eyebrow')}</h3>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-8 leading-[1.1] uppercase text-chocolate">{t('metodo.title1')} <br /> <span className="text-accent-aqua">{t('metodo.title2')}</span></h2>
                            </div>
                            
                            <div className="space-y-8 mt-4 lg:mt-0 text-left">
                                <p className="text-lg text-chocolate/80 leading-relaxed mb-8 normal-case">
                                    {t('metodo.textBefore')}<span className="text-chocolate font-serif italic text-xl">Secretos del Agua</span>{t('metodo.textAfter')}
                                </p>
                                
                                <div className="space-y-12">
                                    <div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <Leaf className="text-chocolate/60" size={20} />
                                            <h3 className="text-2xl font-serif uppercase tracking-widest mb-2 text-chocolate">{t('metodo.item1Title')}</h3>
                                        </div>
                                        <p className="text-base text-chocolate/80 leading-relaxed pl-9">
                                            {t('metodo.item1Text')}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <Droplets className="text-chocolate/60" size={20} />
                                            <h3 className="text-2xl font-serif uppercase tracking-widest mb-2 text-chocolate">{t('metodo.item2Title')}</h3>
                                        </div>
                                        <p className="text-base text-chocolate/80 leading-relaxed pl-9">
                                            {t('metodo.item2Text')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ SECTION 4: RITUALES ═══════════════ */}
            <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-6 lg:px-20 bg-offwhite bg-noise reveal-section relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-6xl mx-auto px-6 lg:px-20 text-center relative z-10">
                    <div className="reveal-item mb-16">
                        <h3 className="eyebrow-badge">{t('rituales.eyebrow')}</h3>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-8 leading-[1.1] uppercase text-chocolate">{t('rituales.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('rituales.title2')}</span></h2>

                        <p className="text-lg text-chocolate/80 leading-relaxed mb-12 max-w-2xl mx-auto normal-case">
                            {t('rituales.text')}
                        </p>

                        {/* Mobile/Tablet image immediately below the intro text */}
                        <div className="w-full lg:hidden mb-12 double-bezel-wrapper aspect-square group relative max-w-md mx-auto">
                            <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                <img 
                                    src="/images/masaje-pindas-corporal-terapia-relajante.webp" 
                                    alt="Ritual con pindas - Experiencia sensorial en Salón Pilar Palomares" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)]" 
                                />
                                <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors"></div>
                            </div>
                        </div>

                        {/* Grid de dos columnas (Cards a un lado, Imagen al otro en tablet y desktop) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto mb-16 text-left">
                            
                            {/* LADO DE LAS TARJETAS (A la izquierda en MD/LG, abajo en móvil) */}
                            <div className="space-y-6">
                                <div className="border-l-2 border-accent-aqua/30 pl-8 bg-white/30 p-8 rounded-r-3xl transition-all duration-300 hover:bg-white hover:shadow-lg">
                                    <h3 className="text-xs uppercase tracking-[0.3em] font-serif font-bold mb-2 text-chocolate/60">{t('rituales.card1Title')}</h3>
                                    <p className="text-base text-chocolate/80 leading-relaxed">{t('rituales.card1Text')}</p>
                                </div>
                                <div className="border-l-2 border-accent-aqua/30 pl-8 bg-white/30 p-8 rounded-r-3xl transition-all duration-300 hover:bg-white hover:shadow-lg">
                                    <h3 className="text-xs uppercase tracking-[0.3em] font-serif font-bold mb-2 text-chocolate/60">{t('rituales.card2Title')}</h3>
                                    <p className="text-base text-chocolate/80 leading-relaxed">{t('rituales.card2Text')}</p>
                                </div>
                                <div className="border-l-2 border-accent-aqua/30 pl-8 bg-white/30 p-8 rounded-r-3xl transition-all duration-300 hover:bg-white hover:shadow-lg">
                                    <h3 className="text-xs uppercase tracking-[0.3em] font-serif font-bold mb-2 text-chocolate/60">{t('rituales.card3Title')}</h3>
                                    <p className="text-base text-chocolate/80 leading-relaxed">{t('rituales.card3Text')}</p>
                                </div>
                            </div>

                            {/* LADO DE LA IMAGEN con Double-Bezel */}
                            <div className="hidden lg:block double-bezel-wrapper aspect-square lg:aspect-auto xl:aspect-square group relative">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                    <img 
                                        src="/images/masaje-pindas-corporal-terapia-relajante.webp" 
                                        alt={t('rituales.imgAlt')}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)]" 
                                    />
                                    <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors"></div>
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-center">
                            <Button
                                to="/reserva"
                                variant="coral"
                            >
                                {t('rituales.cta')}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ SECTION 5: SINCRONÍA CON EL COSMOS ═══════════════ */}
            <section className="pt-12 pb-24 md:pt-16 md:pb-32 bg-white bg-noise reveal-section overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center relative z-10">
                    <div className="max-w-4xl mx-auto reveal-item">
                        <h2 className="eyebrow-badge">{t('cosmos.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-10 leading-[1.1] uppercase text-chocolate">{t('cosmos.title1')} <br /> <span className="text-accent-aqua">{t('cosmos.title2')}</span></h2>
                        {/* Mobile/Tablet image immediately below the title */}
                        <div className="lg:hidden mb-12 relative group max-w-md mx-auto">
                            <div className="absolute -inset-8 bg-sand/10 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-1000"></div>
                            <div className="double-bezel-wrapper aspect-square relative">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                    <img 
                                        src="/images/ritmo-cosmos-calendario-biodinamico-luna.webp" 
                                        alt={t('cosmos.imgAlt')}
                                        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-[3s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                    <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors"></div>
                                </div>
                            </div>
                            {/* Elemento flotante decorativo */}
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-xl flex items-center justify-center border border-sand/20 transform group-hover:-translate-y-4 transition-all duration-700 z-10">
                                <Moon size={32} className="text-chocolate/60" />
                            </div>
                        </div>

                        {/* Contenedor del Grid para Escritorio */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
                            
                            {/* Lado de la Imagen - Cuadrada y estilizada con Double-Bezel */}
                            <div className="hidden lg:block relative group reveal-item">
                                <div className="absolute -inset-8 bg-sand/10 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-1000"></div>
                                <div className="double-bezel-wrapper aspect-square relative">
                                    <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                        <img 
                                            src="/images/ritmo-cosmos-calendario-biodinamico-luna.webp" 
                                            alt={t('cosmos.imgAlt')}
                                            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-[3s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                        />
                                        <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors"></div>
                                    </div>
                                </div>
                                {/* Elemento flotante decorativo */}
                                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/90 backdrop-blur-sm rounded-[2rem] shadow-xl flex items-center justify-center border border-sand/20 transform group-hover:-translate-y-4 transition-all duration-700 z-10">
                                    <Moon size={32} className="text-chocolate/60" />
                                </div>
                            </div>

                            {/* Lado del Contenido y Tarjetas */}
                            <div className="space-y-10 text-left">
                                <div className="space-y-8">
                                    <div className="bg-mint/30 backdrop-blur-sm p-10 rounded-[3rem] border border-mint/40 shadow-lg hover:shadow-2xl hover:shadow-chocolate/5 transition-all duration-500 transform hover:-translate-y-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Moon className="text-chocolate/60" size={24} />
                                            <h3 className="text-xl font-serif uppercase tracking-widest text-chocolate">{t('cosmos.card1Title')}</h3>
                                        </div>
                                        <p className="text-base text-chocolate/80 leading-relaxed">
                                            {t('cosmos.card1Text')}
                                        </p>
                                    </div>

                                    <div className="bg-cream/40 backdrop-blur-sm p-10 rounded-[3rem] border border-cream/60 shadow-lg hover:shadow-2xl hover:shadow-chocolate/5 transition-all duration-500 transform hover:-translate-y-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Sun className="text-chocolate/60" size={24} />
                                            <h3 className="text-xl font-serif uppercase tracking-widest text-chocolate">{t('cosmos.card2Title')}</h3>
                                        </div>
                                        <p className="text-base text-chocolate/80 leading-relaxed">
                                            {t('cosmos.card2Text')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="reveal-item mt-20 lg:mt-24">
                            <p className="text-lg text-chocolate/80 leading-relaxed mb-12 max-w-2xl mx-auto normal-case">
                                {t('cosmos.text')}
                            </p>

                            <Button
                                to="/calendario-biodinamico"
                                variant="primary"
                            >
                                {t('cosmos.cta')}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NuestraEsencia;
