// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Activity, Scissors, Sparkles, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLang } from '../langContext';
import { registerNS } from '../i18n';
import Button from '../components/Button';
import SEO from '../components/SEO';
import nsEs from '../locales/estetica/es.json';
import nsEn from '../locales/estetica/en.json';
import nsDe from '../locales/estetica/de.json';
import nsFr from '../locales/estetica/fr.json';

registerNS('estetica', { es: nsEs, en: nsEn, de: nsDe, fr: nsFr });

gsap.registerPlugin(ScrollTrigger);

const Estetica = () => {
    const { t } = useTranslation('estetica');
    const { lp } = useLang();
    const mainRef = useRef(null);
    const [activeMiradaTab, setActiveMiradaTab] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo('.fade-in',
                { opacity: 0, y: 30, filter: 'blur(10px)' },
                {
                    opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'expo.out', scrollTrigger: {
                        trigger: '.hero-section',
                        start: 'top 80%',
                    }
                }
            );

            const revealSections = document.querySelectorAll('.reveal-section');
            revealSections.forEach((section) => {
                gsap.fromTo(section.querySelectorAll('.reveal-item'),
                    { opacity: 0, y: 30, filter: 'blur(5px)' },
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 1.2,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const facialTreatments = [
        { name: t('faciales.items.sensitiva.name'), desc: t('faciales.items.sensitiva.desc'), price: t('faciales.priceLabel'), link: "/bioterapia-facial#sensitiva" },
        { name: t('faciales.items.iluminante.name'), desc: t('faciales.items.iluminante.desc'), price: t('faciales.priceLabel'), link: "/bioterapia-facial#iluminante" },
        { name: t('faciales.items.antiaging.name'), desc: t('faciales.items.antiaging.desc'), price: t('faciales.priceLabel'), link: "/bioterapia-facial#antiaging" },
        { name: t('faciales.items.detox.name'), desc: t('faciales.items.detox.desc'), price: t('faciales.priceLabel'), link: "/bioterapia-facial#detox" }
    ];

    const miradaServices = [
        {
            name: t('mirada.items.cejas.name'),
            desc: t('mirada.items.cejas.desc'),
            icon: Scissors
        },
        {
            name: t('mirada.items.lifting.name'),
            desc: t('mirada.items.lifting.desc'),
            icon: Sparkles
        },
        {
            name: t('mirada.items.extensiones.name'),
            desc: t('mirada.items.extensiones.desc'),
            icon: Eye
        },
        {
            name: t('mirada.items.micropigmentacion.name'),
            desc: t('mirada.items.micropigmentacion.desc'),
            icon: Heart
        }
    ];

    return (
        <div ref={mainRef} className="bg-offwhite min-h-screen font-sans text-chocolate overflow-x-hidden">
            <SEO 
                title={t('seo.title')}
                canonical="/estetica"
                description={t('seo.description')}
                keywords={[
                    "estetica organica malaga",
                    "maderoterapia corporal rincon de la victoria",
                    "depilacion con hilo torre de benagalbon",
                    "diseño de cejas anoreta",
                    "manicura natural chilches",
                    "micropigmentacion cejas torre del mar",
                    "esteticistas profesionales velez malaga",
                    "estetica nerja"
                ]}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "serviceType": "Estética Integrativa y Maderoterapia",
                    "provider": {
                        "@type": "BeautySalon",
                        "name": "Salón Pilar Palomares",
                        "url": "https://salonpilarpalomares.es"
                    },
                    "areaServed": [
                        { "@type": "AdministrativeArea", "name": "Torre de Benagalbón" },
                        { "@type": "AdministrativeArea", "name": "Benagalbón" },
                        { "@type": "AdministrativeArea", "name": "Rincón de la Victoria" },
                        { "@type": "AdministrativeArea", "name": "Añoreta" },
                        { "@type": "AdministrativeArea", "name": "Chilches" },
                        { "@type": "AdministrativeArea", "name": "Vélez Málaga" },
                        { "@type": "AdministrativeArea", "name": "Torre del Mar" },
                        { "@type": "AdministrativeArea", "name": "Nerja" },
                        { "@type": "AdministrativeArea", "name": "La Caleta de Vélez" }
                    ],
                    "description": "Servicios de estética orgánica y natural, maderoterapia corporal, depilación con hilo, diseño de mirada y tratamientos de belleza integrativa para la piel."
                }}
            />

            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
                <div className="absolute inset-0 z-0 group">
                    <img
                        src="/images/home/estetica-consciente-servicio-pilar-palomares.webp"
                        alt={t('hero.imgAlt')}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[3s]"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl fade-in text-white">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-aqua/15 border border-accent-aqua/30 text-accent-aqua text-[10px] md:text-xs tracking-[0.25em] font-sans font-bold uppercase mb-8 backdrop-blur-sm shadow-sm select-none">
                        {t('hero.eyebrow')}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight uppercase tracking-tight text-white drop-shadow-lg">
                        {t('hero.title1')} <br /> <span className="text-accent-aqua">{t('hero.title2')}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed normal-case">
                        {t('hero.text')}
                    </p>
                </div>
            </section>

            {/* ═══════════════ INTRO ═══════════════ */}
            <section className="py-20 md:py-32 px-6 lg:px-20 bg-offwhite bg-noise reveal-section border-b border-chocolate/5 relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
                        <div className="reveal-item">
                            <h2 className="eyebrow-badge">{t('intro.eyebrow')}</h2>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase mb-8 tracking-tight">{t('intro.title')}</h2>
                            
                            {/* Mobile Image: Shown only on small screens below the title */}
                            <div className="lg:hidden mb-8 double-bezel-wrapper">
                                <div className="aspect-square overflow-hidden double-bezel-inner group shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)]">
                                    <img 
                                        src="/images/bioterapias/bioterapia-facial-tratamiento-bioterapia-secretos-del-agua-pilar-palomares.webp" 
                                        alt={t('intro.imgAlt')}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[4s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                </div>
                            </div>

                            <p className="text-lg text-chocolate/80 leading-relaxed mb-10 normal-case">
                                {t('intro.desc')}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-5 md:p-6 flex flex-col justify-center bg-accent-aqua/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0">
                                            <Shield size={16} />
                                        </div>
                                        <h3 className="text-xs md:text-sm font-serif uppercase tracking-widest text-white leading-tight [text-shadow:0_2px_4px_rgba(35,64,59,0.5),0_1px_2px_rgba(255,255,255,0.3)]">
                                            {t('intro.card1Title')}
                                        </h3>
                                    </div>
                                    <p className="text-[10px] md:text-[11px] text-white/95 leading-relaxed uppercase tracking-wider font-medium">
                                        {t('intro.card1Desc')}
                                    </p>
                                </div>
                                <div className="p-5 md:p-6 flex flex-col justify-center bg-accent-aqua/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0">
                                            <Activity size={16} />
                                        </div>
                                        <h3 className="text-xs md:text-sm font-serif uppercase tracking-widest text-white leading-tight [text-shadow:0_2px_4px_rgba(35,64,59,0.5),0_1px_2px_rgba(255,255,255,0.3)]">
                                            {t('intro.card2Title')}
                                        </h3>
                                    </div>
                                    <p className="text-[10px] md:text-[11px] text-white/95 leading-relaxed uppercase tracking-wider font-medium">
                                        {t('intro.card2Desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="reveal-item hidden lg:block relative group">
                            <div className="double-bezel-wrapper aspect-square z-10">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                    <img 
                                        src="/images/bioterapias/bioterapia-facial-tratamiento-bioterapia-secretos-del-agua-pilar-palomares.webp" 
                                        alt={t('intro.imgAlt')}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[4s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-full h-full bg-peach/30 rounded-[2rem] -z-10 translate-x-4 translate-y-4 border border-peach/40"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ DISEÑO DE LA MIRADA ═══════════════ */}
            <section id="mirada" className="py-20 md:py-32 px-6 lg:px-20 bg-white bg-noise reveal-section border-t border-chocolate/5 relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* LEFT COLUMN: TABS & CONTENT */}
                        <div className="reveal-item flex flex-col justify-center">
                            <span className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] md:tracking-[0.5em] text-chocolate/60 font-serif font-bold mb-4 block leading-relaxed">
                                {t('mirada.eyebrow')}
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase mb-8 tracking-tight">
                                {t('mirada.title')}
                            </h2>
                            
                            {/* Mobile Image: Shown only on small screens below the title */}
                            <div className="lg:hidden mb-8 max-w-[280px] sm:max-w-xs mx-auto double-bezel-wrapper">
                                <div className="aspect-[3/4] overflow-hidden double-bezel-inner group shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)]">
                                    <img
                                        src="/images/bioterapias/diseno-cejas-mirada-pilar-palomares.webp"
                                        alt={t('mirada.imgAlt')}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                </div>
                            </div>

                            <p className="text-lg text-chocolate/80 leading-relaxed mb-10 normal-case">
                                {t('mirada.desc')}
                            </p>

                            {/* TABS CONTAINER */}
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4">
                                    {miradaServices.map((service, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveMiradaTab(idx)}
                                            className={`px-2 py-3 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.1em] transition-all rounded-xl select-none w-full flex items-center justify-center text-center leading-tight min-h-[44px] ${
                                                activeMiradaTab === idx 
                                                    ? 'bg-accent-aqua text-white shadow-md shadow-accent-aqua/20' 
                                                    : 'bg-chocolate/5 text-chocolate/60 hover:bg-chocolate/10 hover:text-chocolate/85'
                                            }`}
                                        >
                                            {service.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Active Tab Content */}
                                <div className="p-6 md:p-8 bg-offwhite/50 border border-chocolate/5 rounded-3xl shadow-sm transition-all duration-300 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-aqua/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                                    <div className="relative z-10 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-accent-aqua/10 flex items-center justify-center text-accent-aqua flex-shrink-0">
                                                {React.createElement(miradaServices[activeMiradaTab].icon, { size: 20, strokeWidth: 1.5 })}
                                            </div>
                                            <h3 className="font-serif text-base sm:text-lg text-chocolate uppercase tracking-wider">
                                                {miradaServices[activeMiradaTab].name}
                                            </h3>
                                        </div>
                                        <div className="w-8 h-[1px] bg-accent-aqua/30"></div>
                                        <p className="text-sm sm:text-base text-chocolate/75 leading-relaxed font-sans normal-case">
                                            {miradaServices[activeMiradaTab].desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="reveal-item hidden lg:block double-bezel-wrapper">
                            <div className="aspect-[3/4] overflow-hidden double-bezel-inner group shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)]">
                                <img
                                    src="/images/bioterapias/diseno-cejas-mirada-pilar-palomares.webp"
                                    alt={t('mirada.imgAlt')}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ DEPILACIÓN & MAQUILLAJE ═══════════════ */}
            <section id="depilacion-maquillaje" className="py-20 md:py-32 px-6 lg:px-20 bg-offwhite bg-noise reveal-section border-t border-chocolate/5 relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* TEXT & CARDS COLUMN */}
                        <div className="reveal-item flex flex-col justify-center">
                            <span className="text-base uppercase tracking-[0.5em] text-chocolate/60 font-serif font-bold mb-4 block leading-relaxed">
                                {t('depilacion.eyebrow')}
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase mb-8 tracking-tight">
                                {t('depilacion.title')}
                            </h2>
                            
                            {/* Mobile Image */}
                            <div className="lg:hidden mb-8 max-w-[280px] sm:max-w-xs mx-auto double-bezel-wrapper">
                                <div className="aspect-[3/4] overflow-hidden double-bezel-inner group shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)]">
                                    <img 
                                        src="/images/bioterapias/maquillaje-profesional-pilar-palomares.webp" 
                                        alt={t('depilacion.imgAlt')}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                </div>
                            </div>

                            <p className="text-lg text-chocolate/80 leading-relaxed mb-10 normal-case">
                                {t('depilacion.desc')}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-6 md:p-8 flex flex-col group h-full bg-offwhite/85 backdrop-blur-md rounded-[2rem] border border-chocolate/10 shadow-[0_12px_30px_-6px_rgba(60,47,47,0.08),_inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_24px_48px_-10px_rgba(60,47,47,0.15)] hover:-translate-y-1.5 hover:border-accent-aqua/30 transition-all duration-500">
                                    <div className="space-y-4">
                                        <div className="w-10 h-10 rounded-xl bg-accent-aqua/10 flex items-center justify-center text-accent-aqua flex-shrink-0">
                                            <Activity size={18} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="font-serif text-lg text-chocolate uppercase tracking-wider">{t('depilacion.depilacionTitle')}</h3>
                                        <div className="w-8 h-[1px] bg-accent-aqua/30"></div>
                                        <p className="text-sm text-chocolate/70 leading-relaxed font-sans normal-case">
                                            {t('depilacion.depilacionDesc')}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 flex flex-col group h-full bg-offwhite/85 backdrop-blur-md rounded-[2rem] border border-chocolate/10 shadow-[0_12px_30px_-6px_rgba(60,47,47,0.08),_inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_24px_48px_-10px_rgba(60,47,47,0.15)] hover:-translate-y-1.5 hover:border-accent-aqua/30 transition-all duration-500">
                                    <div className="space-y-4">
                                        <div className="w-10 h-10 rounded-xl bg-accent-aqua/10 flex items-center justify-center text-accent-aqua flex-shrink-0">
                                            <Sparkles size={18} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="font-serif text-lg text-chocolate uppercase tracking-wider">{t('depilacion.maquillajeTitle')}</h3>
                                        <div className="w-8 h-[1px] bg-accent-aqua/30"></div>
                                        <p className="text-sm text-chocolate/70 leading-relaxed font-sans normal-case">
                                            {t('depilacion.maquillajeDesc')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block reveal-item group">
                            <div className="double-bezel-wrapper aspect-[3/4]">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)]">
                                    <img 
                                        src="/images/bioterapias/maquillaje-profesional-pilar-palomares.webp" 
                                        alt={t('depilacion.imgAlt')} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ FACIAL SECTION ═══════════════ */}
            <section className="py-20 md:py-32 px-6 lg:px-20 bg-white bg-noise reveal-section relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 reveal-item">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-6 uppercase leading-[1.1] text-chocolate">{t('faciales.title')}</h2>
                        <div className="w-16 h-[1px] bg-accent-aqua mx-auto mb-6"></div>
                        <h2 className="text-xs uppercase tracking-[0.3em] text-chocolate/60 font-serif font-bold inline-flex items-center gap-3">
                            {t('faciales.eyebrow')}
                            <span className="w-1 h-1 rounded-full bg-accent-aqua/40"></span>
                            <span className="text-accent-aqua">{t('faciales.priceLabel')}</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-item">
                        {facialTreatments.map((tItem, idx) => (
                            <Link 
                                to={lp(tItem.link)} 
                                key={idx} 
                                className="p-6 md:p-8 flex flex-col justify-between group h-full bg-accent-aqua/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 select-none"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-base md:text-lg font-serif uppercase tracking-widest text-white leading-tight [text-shadow:0_2px_4px_rgba(35,64,59,0.5),0_1px_2px_rgba(255,255,255,0.3)]">
                                        {tItem.name}
                                    </h3>
                                    <div className="w-8 h-[1px] bg-white/30"></div>
                                    <p className="text-[10px] md:text-[11px] text-white/95 leading-relaxed uppercase tracking-wider font-medium">
                                        "{tItem.desc}"
                                    </p>
                                </div>
                                <div className="pt-6 border-t border-white/10 flex justify-end items-center">
                                    <span className="text-[10px] uppercase tracking-wider text-white/80 font-bold group-hover:text-white group-hover:translate-x-[-4px] transition-all duration-300 mr-2">{t('faciales.viewBtn')}</span>
                                    <ArrowRight size={14} className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ MANOS, PIES & MASAJES ═══════════════ */}
            <section id="manos-pies-masajes" className="py-20 md:py-32 px-6 lg:px-20 reveal-section relative overflow-hidden bg-mint/15 bg-noise">
                <div className="absolute inset-0 bg-mint/10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 md:mb-24 reveal-item">
                        <h2 className="eyebrow-badge">{t('manosPies.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase tracking-tight">{t('manosPies.title')}</h2>
                        <div className="w-16 h-[1px] bg-accent-aqua mx-auto mt-6 mb-8"></div>
                        <p className="text-lg text-chocolate/80 leading-relaxed max-w-3xl mx-auto normal-case">
                            {t('manosPies.desc')}
                        </p>
                    </div>

                    {/* REDESIGNED SERVICES ROW-BY-ROW */}
                    <div className="space-y-16 md:space-y-28">
                        {/* 1. Bioterapia de Manos */}
                        <div className="reveal-item grid md:grid-cols-12 gap-8 md:gap-16 items-center">
                            {/* Text content */}
                            <div className="md:col-span-6 space-y-6">
                                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-accent-aqua">{t('manosPies.manos.label')}</span>
                                <h3 className="text-2xl sm:text-3xl font-serif text-chocolate uppercase tracking-wide">{t('manosPies.manos.title')}</h3>
                                <div className="w-12 h-[1px] bg-accent-aqua/30"></div>
                                <p className="text-base text-chocolate/80 leading-relaxed normal-case">
                                    {t('manosPies.manos.desc')}
                                </p>
                            </div>
                            <div className="md:col-span-6 group">
                                <div className="double-bezel-wrapper aspect-[4/3] shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)]">
                                    <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                        <img 
                                            src="/images/bioterapias/bioterapia-manos-bioterapia-secretos-del-agua-pilar-palomares.webp" 
                                            alt={t('manosPies.manos.imgAlt')} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)]" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Bioterapia de Pies */}
                        <div className="reveal-item grid md:grid-cols-12 gap-8 md:gap-16 items-center">
                            <div className="md:col-span-6 group order-first md:order-none">
                                <div className="double-bezel-wrapper aspect-[4/3] shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)]">
                                    <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                        <img 
                                            src="/images/bioterapias/bioterapia-pies-estetica-bioterapia-secretos-del-agua-pilar-palomares.webp" 
                                            alt={t('manosPies.pies.imgAlt')} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)]" 
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Text content */}
                            <div className="md:col-span-6 space-y-6">
                                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-accent-aqua">{t('manosPies.pies.label')}</span>
                                <h3 className="text-2xl sm:text-3xl font-serif text-chocolate uppercase tracking-wide">{t('manosPies.pies.title')}</h3>
                                <div className="w-12 h-[1px] bg-accent-aqua/30"></div>
                                <p className="text-base text-chocolate/80 leading-relaxed normal-case">
                                    {t('manosPies.pies.desc')}
                                </p>
                            </div>
                        </div>

                        {/* 3. Masajes */}
                        <div className="reveal-item grid md:grid-cols-12 gap-8 md:gap-16 items-center">
                            {/* Text content */}
                            <div className="md:col-span-6 space-y-6">
                                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-accent-aqua">{t('manosPies.masajes.label')}</span>
                                <h3 className="text-2xl sm:text-3xl font-serif text-chocolate uppercase tracking-wide">{t('manosPies.masajes.title')}</h3>
                                <div className="w-12 h-[1px] bg-accent-aqua/30"></div>
                                <p className="text-base text-chocolate/80 leading-relaxed normal-case">
                                    {t('manosPies.masajes.desc')}
                                </p>
                            </div>
                            <div className="md:col-span-6 group">
                                <div className="double-bezel-wrapper aspect-[4/3] shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)]">
                                    <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                        <img 
                                            src="/images/bioterapias/masaje-bienestar-corporal-pilar-palomares.webp" 
                                            alt={t('manosPies.masajes.imgAlt')} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)]" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ MADEROTERAPIA ═══════════════ */}
            <section id="maderoterapia" className="py-20 md:py-32 px-6 lg:px-20 bg-offwhite bg-noise reveal-section border-t border-chocolate/5 relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* TEXT COLUMN */}
                        <div className="reveal-item">
                            <h3 className="eyebrow-badge">{t('madero.eyebrow')}</h3>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase mb-8 tracking-tight">{t('madero.title')}</h2>
                            
                            {/* Mobile Image: Shown only on small screens below the title */}
                            <div className="lg:hidden mb-8 max-w-[280px] sm:max-w-xs mx-auto double-bezel-wrapper">
                                <div className="aspect-[3/4] overflow-hidden double-bezel-inner group shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)]">
                                    <img 
                                        src="/images/bioterapias/maderoterapia-corporal-pilar-palomares.webp" 
                                        alt={t('madero.imgAlt')}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                </div>
                            </div>

                            <p className="text-lg text-chocolate/80 leading-relaxed mb-8 normal-case italic font-serif">
                                {t('madero.quote')}
                            </p>
                            <p className="text-base text-chocolate/70 leading-relaxed mb-10">
                                {t('madero.desc')}
                            </p>
                            
                            <div className="p-6 md:p-8 flex flex-col justify-between group bg-accent-aqua/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 max-w-md">
                                <div className="space-y-4">
                                    <h3 className="text-base md:text-lg font-serif uppercase tracking-widest text-white leading-tight [text-shadow:0_2px_4px_rgba(35,64,59,0.5),0_1px_2px_rgba(255,255,255,0.3)]">
                                        {t('madero.corporalTitle')}
                                    </h3>
                                    <div className="w-8 h-[1px] bg-white/30"></div>
                                    <p className="text-xs md:text-sm text-white/90 leading-relaxed font-sans normal-case">
                                        {t('madero.corporalDesc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block reveal-item group">
                            <div className="double-bezel-wrapper aspect-[3/4]">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)]">
                                    <img 
                                        src="/images/bioterapias/maderoterapia-corporal-pilar-palomares.webp" 
                                        alt={t('madero.imgAlt')} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                    <div className="absolute inset-0 bg-accent-aqua/5 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ FINAL CTA ═══════════════ */}
            <section className="bg-cream/40 bg-noise reveal-section overflow-hidden border-t border-peach/40 py-16 md:py-24 relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-4xl mx-auto text-center px-6 reveal-item relative z-10">
                    <h2 className="eyebrow-badge">{t('cta.eyebrow')}</h2>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase mb-10 tracking-tight">
                        {t('cta.title')}
                    </h2>
                    <p className="text-lg text-chocolate/80 mb-12 leading-relaxed max-w-2xl mx-auto normal-case">
                        {t('cta.desc')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-start w-full">
                        <Button
                            to={lp("/reserva")}
                            variant="coral"
                            icon={ArrowRight}
                            fullWidth
                            className="spring-bounce sm:w-auto"
                        >
                            {t('cta.btnReserva')}
                        </Button>
                        <Button
                            to={lp("/contacto")}
                            variant="outline-aqua"
                            fullWidth
                            className="spring-bounce sm:w-auto"
                        >
                            {t('cta.btnContacto')}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Estetica;
