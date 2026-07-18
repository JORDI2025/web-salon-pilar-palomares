import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles, Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLang } from '../langContext';
import { registerNS } from '../i18n';
import Button from '../components/Button';
import SEO from '../components/SEO';
import nsEs from '../locales/bioterapia-corporal/es.json';
import nsEn from '../locales/bioterapia-corporal/en.json';
import nsDe from '../locales/bioterapia-corporal/de.json';
import nsFr from '../locales/bioterapia-corporal/fr.json';

registerNS('bioterapia-corporal', { es: nsEs, en: nsEn, de: nsDe, fr: nsFr });

gsap.registerPlugin(ScrollTrigger);

const TreatmentDetail = ({ treatment, bgColor }) => {
    const { t } = useTranslation('bioterapia-corporal');
    const [activeTab, setActiveTab] = useState('description');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const sectionRef = useRef(null);


    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % treatment.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + treatment.images.length) % treatment.images.length);
    };

    const renderSlideshow = (isMobile = false) => (
        <div className={`w-full ${isMobile ? 'lg:hidden my-8' : 'hidden lg:flex lg:w-1/2'} relative flex justify-center double-bezel-wrapper`}>
            <div className="aspect-[4/5] w-full max-w-md h-auto lg:h-[564px] overflow-hidden double-bezel-inner shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)] relative bg-offwhite group">
                <img 
                    src={treatment.images[currentImageIndex]} 
                    alt={t(`treatments.${treatment.id}.title`)} 
                    className="w-full h-full object-cover object-center transition-all duration-[1000ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105"
                />
                
                {treatment.images.length > 1 && (
                    <>
                        <button onClick={prevImage} aria-label={t('slideshow.prev')} className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-chocolate hover:bg-accent-aqua hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-lg z-10">
                            <ChevronLeft size={20} className="lg:w-6 lg:h-6" />
                        </button>
                        <button onClick={nextImage} aria-label={t('slideshow.next')} className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-chocolate hover:bg-accent-aqua hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-lg z-10">
                            <ChevronRight size={20} className="lg:w-6 lg:h-6" />
                        </button>
                        
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                            {treatment.images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentImageIndex(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        currentImageIndex === i ? 'bg-accent-aqua w-8' : 'bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div id={treatment.id} ref={sectionRef} className={`reveal-section pt-12 lg:pt-16 pb-24 lg:pb-32 border-b border-chocolate/5 px-6 lg:px-20 ${bgColor} bg-noise scroll-mt-32 relative`}>
            <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center relative z-10">
                {/* ═══════════════ LEFT: CONTENT ═══════════════ */}
                <div className="w-full lg:w-1/2 space-y-8 md:space-y-10">
                    <div className="space-y-4">
                        <span className="text-[11px] md:text-sm uppercase tracking-[0.6em] text-chocolate/60 font-serif font-bold mb-4 block leading-relaxed">{t(`treatments.${treatment.id}.subtitle`)}</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase">{t(`treatments.${treatment.id}.title`)}</h2>
                        {renderSlideshow(true)}
                        <p className="text-sm md:text-base uppercase tracking-widest text-chocolate/60 leading-relaxed font-bold max-w-xl">
                            {t(`treatments.${treatment.id}.summary`)}
                        </p>
                    </div>

                    {/* 📱 MOBILE ACCORDION (Hidden on Tablet/Desktop) */}
                    <div className="md:hidden space-y-4">
                        {[
                            { id: 'description', label: t('tabs.description') },
                            { id: 'benefits', label: t('tabs.benefits') },
                            { id: 'ideal', label: t('tabs.ideal') },
                            { id: 'actives', label: t('tabs.actives') }
                        ].map((tab) => (
                            <div key={tab.id} className="border-b border-chocolate/10">
                                <button onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)} aria-expanded={activeTab === tab.id ? "true" : "false"} className="w-full py-4 flex justify-between items-center text-left">
                                    <span className={`text-sm font-bold uppercase tracking-[0.2em] ${activeTab === tab.id ? 'text-accent-aqua' : 'text-chocolate/60'}`}>
                                        {tab.label}
                                    </span>
                                    {activeTab === tab.id ? (
                                        <Minus size={18} className="text-accent-aqua" />
                                    ) : (
                                        <Plus size={18} className="text-chocolate/40" />
                                    )}
                                </button>
                                <div className={`overflow-hidden transition-all duration-500 ${activeTab === tab.id ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-base text-chocolate/80 leading-relaxed font-sans normal-case whitespace-pre-line">
                                        {t(`treatments.${treatment.id}.tabs.${tab.id}`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 💻 TABLET/DESKTOP TABS (Hidden on Mobile) */}
                    <div className="hidden md:block space-y-8 lg:space-y-10">
                        <div className="flex border-b border-chocolate/10 gap-4 lg:gap-6 xl:gap-8 pb-2 overflow-hidden">
                            {[
                                { id: 'description', label: t('tabs.description') },
                                { id: 'benefits', label: t('tabs.benefits') },
                                { id: 'ideal', label: t('tabs.ideal') },
                                { id: 'actives', label: t('tabs.actives') }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`pb-4 text-sm lg:text-xs xl:text-base font-bold uppercase tracking-[0.12em] lg:tracking-[0.15em] xl:tracking-[0.2em] transition-all relative whitespace-nowrap ${
                                        activeTab === tab.id ? 'text-accent-aqua' : 'text-chocolate/40 hover:text-chocolate/60'
                                    }`}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-aqua" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[160px] pt-4">
                            <div className="text-sm lg:text-lg text-chocolate/80 leading-relaxed font-sans normal-case transition-opacity duration-500 max-w-2xl whitespace-pre-line">
                                {t(`treatments.${treatment.id}.tabs.${activeTab}`)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════════════ RIGHT: SLIDESHOW ═══════════════ */}
                {renderSlideshow(false)}
            </div>
        </div>
    );
};

const BioterapiaCorporal = () => {
    const { t } = useTranslation('bioterapia-corporal');
    const { lp } = useLang();
    const mainRef = useRef(null);

    useEffect(() => {
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
        
        const ctx = gsap.context(() => {
            gsap.fromTo('.reveal-hero',
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.5, 
                    ease: 'expo.out',
                    stagger: 0.2
                }
            );

            gsap.utils.toArray('.reveal-section').forEach((section) => {
                gsap.fromTo(section,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
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

    const bodyTreatments = [
        { id: "sculptor", images: ["/images/bioterapias/sculptor-maderoterapia-bioterapia-corporal-pilar-palomares.webp"] },
        { id: "colorluz", images: ["/images/bioterapias/colorluz-bioterapia-secretos-del-agua-pilar-palomares.webp"] },
        { id: "piernas", images: ["/images/bioterapias/bioterapia-piernas-perfectas-cansadas-drenante.webp"] }
    ];

    const maderoTools = [
        { id: "tabla" },
        { id: "cubos" },
        { id: "copa" },
        { id: "cepillo" },
        { id: "rodillo" }
    ];

    return (
        <div ref={mainRef} className="bg-offwhite min-h-screen">
            <SEO 
                title={t('seo.title')}
                canonical="/bioterapia-corporal"
                description={t('seo.description')}
                keywords={[
                    "bioterapia corporal malaga",
                    "maderoterapia rincon de la victoria",
                    "masaje corporal torre de benagalbon",
                    "tratamientos reafirmantes anoreta",
                    "drenaje linfatico natural chilches",
                    "masajes relajantes torre del mar",
                    "bienestar corporal velez malaga",
                    "spa corporal nerja"
                ]}
                schemaData={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Bioterapia Corporal Avanzada",
                        "provider": {
                            "@type": "BeautySalon",
                            "name": "Salón Pilar Palomares",
                            "url": "https://salonpilarpalomares.com"
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
                        "description": "Tratamientos holísticos corporales reductores, reafirmantes y masajes drenantes utilizando activos botánicos avanzados y Agua Biopolar™ de Secretos del Agua."
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "¿En qué consiste la bioterapia corporal?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Consiste en tratamientos corporales integrativos que combinan técnicas de masaje específicas (como drenaje y maderoterapia) con cosmética botánica celular para depurar toxinas, reafirmar tejidos y reducir volumen de forma saludable."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "¿Cuáles son las bioterapias corporales más solicitadas?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Las bioterapias más demandadas son la Reductora (para movilizar y eliminar grasas), la Reafirmante (para tonificar la piel) y los masajes con Pindas Aromáticas para aliviar tensiones físicas y emocionales."
                                }
                            }
                        ]
                    }
                ]}
            />
            
            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 group">
                    <picture className="block w-full h-full">
                        <source media="(max-width: 768px)" srcSet="/images/bioterapias/bioterapias-hero-mobile-bioterapia-secretos-del-agua-pilar-palomares.webp" />
                        <img 
                            src="/images/bioterapias/bioterapias-hero-pilar-palomares-bioterapia-secretos-del-agua.webp" 
                            alt={t('hero.imgAlt')} 
                            className="block w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[3s]"
                        />
                    </picture>
                    <div className="absolute inset-0 bg-chocolate/60 backdrop-blur-[1px]"></div>
                </div>
                
                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <div className="reveal-hero mb-8">
                        <Link
                            to={lp("/bioterapias")}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-aqua/15 border border-accent-aqua/30 text-accent-aqua text-[10px] md:text-xs tracking-[0.25em] font-sans font-bold uppercase transition-all hover:bg-accent-aqua/25 hover:border-accent-aqua/50 select-none shadow-sm backdrop-blur-sm"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            {t('hero.back')}
                        </Link>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight uppercase tracking-tight text-white drop-shadow-lg reveal-hero">
                        {t('hero.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('hero.title2')}</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed normal-case reveal-hero">
                        {t('hero.text')}
                    </p>
                    
                    <div className="reveal-hero mt-10">
                        <Button 
                            to="/reserva" 
                            variant="primary"
                        >
                            {t('hero.cta')}
                        </Button>
                    </div>
                </div>
            </section>

            {/* ═══════════════ INTRO: RITO DE SALUD ═══════════════ */}
            <section className="relative py-24 md:py-32 px-6 lg:px-20 reveal-section overflow-hidden border-y border-chocolate/5 bg-offwhite bg-noise">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                {/* Background Texture Overlay */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img 
                        src="/images/bioterapias/piel2-bioterapia-secretos-del-agua-pilar-palomares.webp" 
                        alt={t('intro.bgImgAlt')} 
                        className="w-full h-full object-cover opacity-20 grayscale mix-blend-soft-light"
                    />
                    <div className="absolute inset-0 bg-white/60"></div>
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <span className="eyebrow-badge">{t('intro.eyebrow')}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase mb-8">{t('intro.title')}</h2>
                    <p className="text-lg md:text-xl text-chocolate/80 leading-relaxed normal-case font-serif italic max-w-2xl mx-auto">
                        {t('intro.quote')}
                    </p>
                    <div className="w-12 h-[1px] bg-accent-aqua/30 mx-auto my-10"></div>
                    <p className="text-lg text-chocolate/70 leading-relaxed normal-case max-w-3xl mx-auto">
                        {t('intro.text1')}<strong className="text-chocolate font-bold italic">{t('intro.strong')}</strong>{t('intro.text2')}
                    </p>
                </div>
            </section>

            {/* ═══════════════ CORPORAL PROTOCOLS ═══════════════ */}
            <section className="py-20 md:py-32 px-6 lg:px-20 bg-white bg-noise reveal-section relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    
                    {/* 💻 DESKTOP VERSION (lg and up) */}
                    <div className="hidden lg:grid grid-cols-12 gap-12 lg:gap-16 items-center">
                        {/* LEFT COLUMN: TITLE, INTRO, CARD */}
                        <div className="col-span-6 space-y-8 text-left">
                            <div className="space-y-4">
                                <span className="eyebrow-badge">{t('protocols.eyebrow')}</span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase">{t('protocols.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('protocols.title2')}</span></h2>
                                <p className="text-lg md:text-xl text-chocolate/80 leading-relaxed italic font-serif max-w-xl">
                                    {t('protocols.quote')}
                                </p>
                            </div>

                            <div className="w-12 h-[1px] bg-accent-aqua/30 my-6"></div>

                            {/* Introduce Biotherapies */}
                            <div className="space-y-4">
                                <h3 className="text-xl md:text-2xl font-serif uppercase tracking-[0.2em] text-accent-aqua">{t('protocols.discoverTitle')}</h3>
                                <p className="text-base text-chocolate/80 leading-relaxed normal-case font-sans">
                                    {t('protocols.discoverText')}
                                </p>
                            </div>

                            {/* Info Card */}
                            <div className="relative p-6 md:p-8 bg-accent-aqua/80 backdrop-blur-md rounded-[2rem] border border-white/20 shadow-2xl hover:shadow-accent-aqua/30 transition-all duration-500 transform hover:-translate-y-1 group">
                                <div className="absolute -top-4 -left-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Sparkles size={20} className="text-accent-aqua" />
                                </div>
                                <p className="text-sm md:text-base text-white font-serif italic leading-relaxed m-0">
                                    {t('protocols.card')}
                                </p>
                                <div className="w-10 h-[1px] bg-white/30 mt-6"></div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: IMAGE */}
                        <div className="col-span-6 double-bezel-wrapper">
                            <div className="aspect-square overflow-hidden double-bezel-inner shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)] group relative rounded-[3.5rem]">
                                <img 
                                    src="/images/bioterapias/cuarzos-bioterapia-secretos-del-agua-pilar-palomares.webp" 
                                    alt={t('protocols.imgAlt')} 
                                    className="block w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05] object-bottom"
                                Aminoproteic
                                />
                                <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors duration-1000"></div>
                            </div>
                        </div>
                    </div>

                    {/* 📱 MOBILE / TABLET VERSION (lg hidden) */}
                    <div className="lg:hidden space-y-8 text-left">
                        {/* 1. Title Block */}
                        <div className="space-y-4">
                            <span className="eyebrow-badge">{t('protocols.eyebrow')}</span>
                            <h2 className="text-3xl sm:text-4xl font-serif text-chocolate leading-[1.1] uppercase">{t('protocols.title1')} <br /> <span className="text-accent-aqua">{t('protocols.title2')}</span></h2>
                            <p className="text-base text-chocolate/80 leading-relaxed italic font-serif">
                                {t('protocols.quote')}
                            </p>
                        </div>

                        {/* 2. Image */}
                        <div className="w-full double-bezel-wrapper my-6">
                            <div className="aspect-[4/3] overflow-hidden double-bezel-inner shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)] group relative rounded-[2.5rem]">
                                <img 
                                    src="/images/bioterapias/cuarzos-bioterapia-secretos-del-agua-pilar-palomares.webp" 
                                    alt={t('protocols.imgAlt')} 
                                    className="block w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05] object-bottom"
                                />
                                <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors duration-1000"></div>
                            </div>
                        </div>

                        {/* 3. Green Card */}
                        <div className="relative p-6 bg-accent-aqua/80 backdrop-blur-md rounded-[2rem] border border-white/20 shadow-2xl group">
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg">
                                <Sparkles size={20} className="text-accent-aqua" />
                            </div>
                            <p className="text-sm text-white font-serif italic leading-relaxed m-0">
                                {t('protocols.card')}
                            </p>
                            <div className="w-10 h-[1px] bg-white/30 mt-6"></div>
                        </div>

                        <div className="w-12 h-[1px] bg-accent-aqua/30 my-6"></div>

                        {/* 4. Introduce Biotherapies */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-serif uppercase tracking-[0.2em] text-accent-aqua">{t('protocols.discoverTitle')}</h3>
                            <p className="text-base text-chocolate/80 leading-relaxed normal-case font-sans">
                                {t('protocols.discoverText')}
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* ═══════════════ DETAILED TREATMENTS LIST HEADER ═══════════════ */}
            <section className="bg-offwhite pt-20 md:pt-32 pb-0 px-6 reveal-section relative">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-serif text-chocolate uppercase tracking-tighter">{t('list.title1')} <span className="text-accent-aqua">{t('list.title2')}</span></h2>
                    <div className="w-16 h-[1px] bg-accent-aqua mx-auto mt-6"></div>
                </div>
            </section>

            {/* Treatments List - Now Siblings of the above for consistent width */}
            <div className="bg-white">
                {bodyTreatments.map((treatment, index) => (
                    <TreatmentDetail 
                        key={treatment.id} 
                        treatment={treatment} 
                        bgColor={index % 2 === 0 ? 'bg-offwhite' : 'bg-white'}
                    />
                ))}
            </div>

            {/* ═══════════════ MADEROTERAPIA ═══════════════ */}
            <section id="maderoterapia" className="py-24 px-6 lg:px-20 reveal-section scroll-mt-20 md:scroll-mt-32 bg-white bg-noise relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-12 lg:mb-16">
                        <span className="eyebrow-badge">{t('madero.eyebrow')}</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-6 uppercase text-chocolate leading-[1.1]">{t('madero.title')}</h2>
                        <div className="w-16 h-[1px] bg-accent-aqua mx-auto mb-8"></div>
                        <p className="hidden md:block text-lg lg:text-xl text-chocolate/80 max-w-3xl mx-auto leading-relaxed normal-case">
                            {t('madero.text')}
                        </p>
                    </div>

                    {/* Top: Large Image and Intro Column */}
                    <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
                        {/* Image */}
                        <div className="w-full md:col-span-7 double-bezel-wrapper">
                            <div className="aspect-[4/3] md:aspect-square lg:aspect-[3/2] overflow-hidden double-bezel-inner group relative">
                                <img
                                    src="/images/bioterapias/tratamiento-maderoterapia-corporal-redefinente.webp"
                                    alt={t('madero.imgAlt')}
                                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[4s] ease-[cubic-bezier(0.32,0.72,0,1)]"
                                />
                                <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors"></div>
                            </div>
                        </div>

                        {/* Description & Recommended Protocol */}
                        <div className="w-full md:col-span-5 space-y-6 lg:space-y-8">
                            <p className="text-base md:text-lg lg:text-xl text-chocolate/80 leading-relaxed normal-case">
                                {t('madero.text')}
                            </p>
                            
                            <div className="p-6 lg:p-8 bg-accent-aqua/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
                                <p className="font-serif text-sm md:text-base italic text-white/90 leading-relaxed">
                                    <strong className="text-white font-bold not-italic font-sans uppercase tracking-wider text-xs block mb-2">{t('madero.protocolLabel')}</strong> {t('madero.protocolText')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom: Tools Grid */}
                    <div className="mt-16 lg:mt-24">
                        <h3 className="text-2xl lg:text-3xl font-serif uppercase tracking-widest mb-10 lg:mb-12 text-chocolate text-center underline decoration-accent-aqua/30 underline-offset-8">{t('madero.toolsTitle')}</h3>
                        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                            {maderoTools.map((tool, idx) => (
                                <div key={idx} className={`reveal reveal-delay-${(idx % 4) + 1} flex items-start gap-4 lg:gap-6 group/item p-6 bg-cream rounded-3xl border border-peach/40 hover:bg-white hover:shadow-xl transition-all duration-500 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]`}>
                                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-accent-aqua/5 flex items-center justify-center flex-shrink-0 group-hover/item:bg-accent-aqua/20 transition-all duration-500">
                                        <span className="text-sm lg:text-base font-serif font-bold text-chocolate group-hover/item:text-accent-aqua transition-colors">{String(idx + 1).padStart(2, '0')}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-base lg:text-lg font-serif uppercase tracking-[0.2em] mb-1 lg:mb-2 text-chocolate">{t(`madero.tools.${tool.id}.name`)}</h4>
                                        <p className="text-sm lg:text-base text-chocolate/80 leading-relaxed font-sans normal-case">{t(`madero.tools.${tool.id}.desc`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

             {/* ═══════════════ FINAL CALL TO ACTION ═══════════════ */}
            <section className="py-32 px-6 lg:px-20 relative overflow-hidden group">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/images/bioterapias/sincronizatucuerpo-bioterapia-secretos-del-agua-pilar-palomares.webp" 
                        alt={t('cta.imgAlt')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5s] object-center" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-chocolate/80 via-chocolate/50 to-transparent"></div>
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="max-w-3xl reveal-hero text-left">
                        <span className="eyebrow-badge">{t('cta.eyebrow')}</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-white mb-8 leading-[1.1] uppercase">{t('cta.title1')} <br /> <span className="text-accent-aqua">{t('cta.title2')}</span></h2>
                        <div className="w-20 h-[1px] bg-sand/50 mb-10"></div>
                        <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed normal-case">
                            {t('cta.text')}
                        </p>
                        <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4">
                            <Button
                                to="/reserva"
                                variant="coral"
                            >
                                {t('cta.btnPrimary')}
                            </Button>
                            <Button
                                href="https://wa.me/34642275906?text=Hola,%20me%20gustaría%20solicitar%20un%20diagnóstico%20de%20bioterapia%20corporal%20en%20el%20salón."
                                variant="glass"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t('cta.btnWhatsapp')}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BioterapiaCorporal;
