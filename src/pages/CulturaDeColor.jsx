// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Droplets, Heart, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLang } from '../langContext';
import { registerNS } from '../i18n';
import Button from '../components/Button';
import SEO from '../components/SEO';
import nsEs from '../locales/cultura-de-color/es.json';
import nsEn from '../locales/cultura-de-color/en.json';
import nsDe from '../locales/cultura-de-color/de.json';
import nsFr from '../locales/cultura-de-color/fr.json';

registerNS('cultura-de-color', { es: nsEs, en: nsEn, de: nsDe, fr: nsFr });

gsap.registerPlugin(ScrollTrigger);

const CulturaDeColor = () => {
    const { t } = useTranslation('cultura-de-color');
    const { lp } = useLang();
    const mainRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const ctx = gsap.context(() => {
            gsap.fromTo('.fade-in', 
                { opacity: 0, y: 30, filter: 'blur(10px)' }, 
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'expo.out', scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top 80%',
                }}
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
                        stagger: 0.15, 
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });

            // Refresh ScrollTrigger after a short delay
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 1000);
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const ritualSteps = [
        {
            num: "01",
            title: t('ritual.step1.title'),
            desc: t('ritual.step1.desc')
        },
        {
            num: "02",
            title: t('ritual.step2.title'),
            desc: t('ritual.step2.desc')
        },
        {
            num: "03",
            title: t('ritual.step3.title'),
            desc: t('ritual.step3.desc')
        },
        {
            num: "04",
            title: t('ritual.step4.title'),
            desc: t('ritual.step4.desc')
        },
        {
            num: "05",
            title: t('ritual.step5.title'),
            desc: t('ritual.step5.desc')
        },
        {
            num: "06",
            title: t('ritual.step6.title'),
            desc: t('ritual.step6.desc')
        }
    ];

    const benefits = [
        { title: t('benefits.item1.title'), desc: t('benefits.item1.desc') },
        { title: t('benefits.item2.title'), desc: t('benefits.item2.desc') },
        { title: t('benefits.item3.title'), desc: t('benefits.item3.desc') },
        { title: t('benefits.item4.title'), desc: t('benefits.item4.desc') },
        { title: t('benefits.item5.title'), desc: t('benefits.item5.desc') },
        { title: t('benefits.item6.title'), desc: t('benefits.item6.desc') }
    ];

    return (
        <div ref={mainRef} className="bg-offwhite min-h-screen font-sans text-chocolate overflow-x-hidden">
            <SEO
                title={t('seo.title')}
                canonical="/cultura-de-color"
                description={t('seo.description')}
                keywords={[
                    "coloracion organica malaga",
                    "tinte barros rincon de la victoria",
                    "tinte natural torre de benagalbon",
                    "peluqueria barros secretos del agua anoreta",
                    "tinte sin amoniaco chilches",
                    "coloracion vegetal torre del mar",
                    "barros capilares velez malaga",
                    "tinte organico nerja"
                ]}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "serviceType": "Coloración Orgánica (Barros y Óleos)",
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
                    "description": "Coloración capilar 100% natural utilizando barros botánicos y óleos que respetan la fibra capilar, aportan brillo espejo y eliminan la química convencional."
                }}
            />
            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
                <div className="absolute inset-0 z-0 group">
                    {/* Responsive Hero Images */}
                    <img
                        src="/images/cultura-color-movil-pilar-palomares.webp"
                        alt={t('hero.imgAlt')}
                        className="w-full h-full object-cover md:hidden group-hover:scale-110 transition-transform duration-[3s]"
                    />
                    <img
                        src="/images/cultura-color-pilar-palomares.webp"
                        alt={t('hero.imgAlt')}
                        className="hidden md:block w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]"
                    />
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-1000"></div>
                </div>
                
                <div className="relative z-10 text-center px-6 max-w-4xl fade-in">
                    <span className="hero-text inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-aqua/15 border border-accent-aqua/30 text-accent-aqua text-[10px] md:text-xs tracking-[0.25em] font-sans font-bold uppercase mb-8 backdrop-blur-sm shadow-sm select-none">
                        {t('hero.eyebrow')}
                    </span>
                    <h1 className="hero-text text-5xl md:text-7xl font-serif mb-8 leading-tight uppercase tracking-tight text-white drop-shadow-lg">
                        {t('hero.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('hero.title2')}</span>
                    </h1>
                    <p className="hero-text text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed normal-case">
                        {t('hero.text')}
                    </p>
                </div>
            </section>
    
            {/* ═══════════════ PHILOSOPHY / INTRODUCTION ═══════════════ */}
            <section className="pt-20 pb-12 md:pt-24 md:pb-14 px-6 lg:px-20 bg-white bg-noise reveal-section border-b border-chocolate/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
                        <div className="reveal-item">
                            <h2 className="eyebrow-badge">{t('philosophy.eyebrow')}</h2>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-8 leading-[1.1] uppercase text-chocolate">{t('philosophy.title1')} <br/> <span className="text-accent-aqua">{t('philosophy.title2')}</span></h2>
                            <div className="space-y-6 text-base text-chocolate/80 leading-relaxed">
                                <p>
                                    {t('philosophy.p1')}
                                </p>
                                <p>
                                    {t('philosophy.p2')}
                                </p>
                            </div>

                            <div className="mt-10 p-8 bg-accent-aqua/80 backdrop-blur-md rounded-2xl flex items-start gap-4 border border-white/20 shadow-lg">
                                <Info className="text-white flex-shrink-0 mt-1" size={20} />
                                <p className="text-sm md:text-base font-serif italic text-white leading-relaxed">{t('philosophy.quote')}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 reveal-item">
                            {/* Respeto Estructural with PHOTO */}
                            <div className="sm:col-span-2 liquid-glass overflow-hidden flex flex-col md:flex-row h-full group hover:-translate-y-2">
                                <div className="w-full md:w-1/2 h-48 md:h-auto overflow-hidden">
                                    <img
                                        src="/images/color/aplicacion-barros-coloracion-organica-cabello.webp"
                                        alt={t('philosophy.card1.imgAlt')}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                </div>
                                <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-center bg-white/40">
                                    <h3 className="text-lg font-serif uppercase mb-2 tracking-widest leading-tight">{t('philosophy.card1.title')}</h3>
                                    <p className="text-chocolate/80 text-base leading-relaxed">{t('philosophy.card1.desc')}</p>
                                </div>
                            </div>

                            {/* Luminosidad Multitonal */}
                            <div className="p-6 md:p-8 liquid-glass flex flex-col justify-between group hover:-translate-y-2 bg-white/40">
                                <div className="overflow-hidden">
                                    <Sparkles className="text-accent-aqua mb-4" size={24} />
                                    <h3 className="text-lg font-serif uppercase mb-2 tracking-widest leading-tight">{t('philosophy.card2.title')}</h3>
                                    <p className="text-chocolate/80 text-base leading-relaxed">{t('philosophy.card2.desc')}</p>
                                </div>
                            </div>

                            {/* Cuidado Consciente */}
                            <div className="p-6 md:p-8 liquid-glass flex flex-col justify-between group hover:-translate-y-2 bg-white/40">
                                <div>
                                    <Heart className="text-accent-aqua mb-4" size={24} />
                                    <h3 className="text-lg font-serif uppercase mb-2 tracking-widest leading-tight">{t('philosophy.card3.title')}</h3>
                                    <p className="text-chocolate/80 text-base leading-relaxed">{t('philosophy.card3.desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ PRODUCT SHOWCASE ═══════════════ */}
            <section className="pt-12 pb-10 md:pt-14 md:pb-12 px-6 lg:px-20 bg-cream/30 bg-noise reveal-section">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="mb-16 reveal-item">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-6 leading-[1.1] uppercase text-chocolate">{t('products.title')}</h2>
                        <div className="w-16 h-[1px] bg-accent-aqua mx-auto mb-6"></div>
                        <h3 className="text-base md:text-xl uppercase tracking-[0.6em] text-chocolate/60 font-serif font-bold mb-6 block">{t('products.subtitle')}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                        {/* Barros */}
                        <div className="group reveal-item text-left flex flex-col">
                            <h3 className="text-2xl font-serif mb-4 uppercase tracking-widest order-1 md:order-2 px-2">
                                {t('products.barros.title')}
                            </h3>
                            <div className="double-bezel-wrapper w-full aspect-[4/3] mb-8 order-2 md:order-1">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                    <img
                                        src="/images/color/barros2-coloracion-organica-pilar-palomares.webp"
                                        alt={t('products.barros.imgAlt')}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                </div>
                            </div>
                            <div className="px-2 order-3 md:order-3">
                                <p className="text-chocolate/80 text-base leading-relaxed mb-6 md:min-h-[160px] lg:min-h-[110px]">
                                    {t('products.barros.desc')}
                                </p>
                                <div className="inline-flex items-center gap-2 text-accent-aqua text-xs font-serif font-bold tracking-[0.3em] uppercase border-b border-accent-aqua/20 pb-1">
                                    <Droplets size={14} />
                                    <span>{t('products.barros.tag')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Óleos */}
                        <div className="group reveal-item text-left flex flex-col">
                            <h3 className="text-2xl font-serif mb-4 uppercase tracking-widest order-1 md:order-2 px-2">
                                {t('products.oleos.title')}
                            </h3>
                            <div className="double-bezel-wrapper w-full aspect-[4/3] mb-8 order-2 md:order-1">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                    <img 
                                        src="/images/color/oleos2-coloracion-organica-pilar-palomares.webp" 
                                        alt={t('products.oleos.imgAlt')} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                </div>
                            </div>
                            <div className="px-2 order-3 md:order-3">
                                <p className="text-chocolate/80 text-base leading-relaxed mb-6 md:min-h-[160px] lg:min-h-[110px]">
                                    {t('products.oleos.desc')}
                                </p>
                                <div className="inline-flex items-center gap-2 text-accent-aqua text-xs font-serif font-bold tracking-[0.3em] uppercase border-b border-accent-aqua/20 pb-1">
                                    <Sparkles size={14} />
                                    <span>{t('products.oleos.tag')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ THE RITUAL ═══════════════ */}
            <section className="pt-10 pb-12 md:pt-12 md:pb-14 px-6 lg:px-20 bg-white bg-noise reveal-section border-y border-chocolate/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 reveal-item">
                        <h2 className="eyebrow-badge">{t('ritual.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-6 leading-[1.1] uppercase text-chocolate">{t('ritual.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('ritual.title2')}</span></h2>
                        <div className="w-16 h-[1px] bg-accent-aqua mx-auto mb-6"></div>
                    </div>

                    {/* Mobile/Tablet image immediately below the title section */}
                    <div className="lg:hidden mb-16 group max-w-md mx-auto reveal-item">
                        <div className="double-bezel-wrapper aspect-square relative z-10">
                            <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                <img 
                                    src="/images/lavado-cabello-tratamiento-capilar-organico.webp" 
                                    alt={t('ritual.imgAlt')} 
                                    className="w-full h-full object-cover object-left group-hover:scale-110 transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                />
                            </div>
                        </div>
                        {/* Info Card - Estilo Green Glassmorphism */}
                        <div className="mt-8 bg-accent-aqua/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white/20 z-20 transform hover:scale-102 transition-transform duration-500 text-center">
                            <p className="font-serif text-sm md:text-base italic text-white leading-relaxed mb-4">
                                {t('ritual.quote')}
                            </p>
                            <div className="w-12 h-[1px] bg-white/40 mx-auto mb-3"></div>
                            <p className="text-xs uppercase tracking-[0.3em] font-bold text-white/70">— Pilar Palomares</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
                        <div className="reveal-item space-y-10">
                            <div className="flex flex-col space-y-10">
                                {ritualSteps.map((step, idx) => (
                                    <div key={idx} className="grid grid-cols-[50px_1fr] gap-6 group">
                                        <span className="text-4xl font-serif text-accent-aqua/30 group-hover:text-accent-aqua transition-colors duration-500 leading-none">{step.num}</span>
                                        <div>
                                            <h3 className="text-base font-serif uppercase mb-2 tracking-widest leading-tight">{step.title}</h3>
                                            <p className="text-chocolate/80 text-base leading-relaxed max-w-md">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="hidden lg:block reveal-item relative group">
                            <div className="double-bezel-wrapper aspect-square relative z-10">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                    <img 
                                        src="/images/lavado-cabello-tratamiento-capilar-organico.webp" 
                                        alt={t('ritual.imgAlt')} 
                                        className="w-full h-full object-cover object-left group-hover:scale-110 transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                </div>
                            </div>
                            {/* Info Card - Estilo Green Glassmorphism - debajo de la foto */}
                            <div className="mt-8 bg-accent-aqua/80 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white/20 z-20 max-w-md mx-auto transform hover:scale-102 transition-transform duration-500 text-center">
                                <p className="font-serif text-sm md:text-base italic text-white leading-relaxed mb-4">
                                    {t('ritual.quote')}
                                </p>
                                <div className="w-12 h-[1px] bg-white/40 mx-auto mb-3"></div>
                                <p className="text-xs uppercase tracking-[0.3em] font-bold text-white/70">— Pilar Palomares</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ BENEFITS ═══════════════ */}
            <section className="pt-12 pb-20 md:pt-14 md:pb-24 px-6 lg:px-20 bg-mint/20 bg-noise reveal-section">
                <div className="max-w-5xl mx-auto reveal-item">
                    <div className="text-center mb-16">
                        <h2 className="eyebrow-badge">{t('benefits.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif leading-[1.1] uppercase text-chocolate">{t('benefits.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('benefits.title2')}</span></h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-x-12 md:gap-x-20 gap-y-0">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start space-x-4 border-b border-chocolate/10 py-5 group">
                                <CheckCircle2 className="text-accent-aqua flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                                <div>
                                    <h3 className="font-serif text-lg mb-1">{benefit.title}</h3>
                                    <p className="text-chocolate/80 text-base leading-relaxed">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ FINAL CTA SECTION SPLIT ═══════════════ */}
            <section className="bg-white bg-noise reveal-section overflow-hidden border-t border-chocolate/5">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0 border-x border-chocolate/5 items-center">
                    <div className="py-12 md:py-16 px-6 lg:px-20 flex flex-col items-center md:items-start justify-center reveal-item text-center md:text-left">
                        <h2 className="eyebrow-badge">{t('cta.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-8 leading-[1.1] uppercase text-chocolate">{t('cta.title1')} <br className="hidden lg:block" /> <span className="text-accent-aqua">{t('cta.title2')}</span></h2>
                        
                        {/* New Image for Mobile Only - Positioned after title as requested */}
                        <div className="block md:hidden mb-10 double-bezel-wrapper aspect-[3/4]">
                            <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                <img 
                                    src="/images/coloracion-con-barros-pilar-palomares.webp" 
                                    alt={t('cta.imgAlt')} 
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        </div>

                        <p className="text-base text-chocolate/80 mb-10 leading-relaxed max-w-xl normal-case font-sans">
                            {t('cta.text')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 md:gap-6 justify-center md:justify-start items-center md:items-start w-full">
                            <Button
                                to={lp("/reserva")}
                                variant="coral"
                                icon={ArrowRight}
                            >
                                {t('cta.reservar')}
                            </Button>
                            <Button 
                                to={lp("/contacto")}
                                variant="outline-aqua"
                            >
                                {t('cta.contactar')}
                            </Button>
                        </div>
                    </div>
                    <div className="hidden md:block reveal-item p-6 md:p-10 h-full group">
                        <div className="double-bezel-wrapper w-full h-full">
                            <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                <img 
                                    src="/images/coloracion-con-barros-pilar-palomares.webp" 
                                    alt={t('cta.imgAlt')} 
                                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CulturaDeColor;
