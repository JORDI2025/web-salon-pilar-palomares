// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Droplets, Wind, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLang } from '../langContext';
import { registerNS } from '../i18n';
import Button from '../components/Button';
import SEO from '../components/SEO';
import Sello from '../components/Sello';
import nsEs from '../locales/cultura-de-la-forma/es.json';
import nsEn from '../locales/cultura-de-la-forma/en.json';
import nsDe from '../locales/cultura-de-la-forma/de.json';
import nsFr from '../locales/cultura-de-la-forma/fr.json';

registerNS('cultura-de-la-forma', { es: nsEs, en: nsEn, de: nsDe, fr: nsFr });

gsap.registerPlugin(ScrollTrigger);

const CulturaDeLaForma = () => {
    const { t } = useTranslation('cultura-de-la-forma');
    const { lp } = useLang();
    const mainRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Hero Animation with soft blur and y shift
            gsap.fromTo('.hero-text', 
                { opacity: 0, y: 30, filter: 'blur(10px)' }, 
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'power4.out', stagger: 0.2 }
            );

            // Section Reveals with soft blur
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

    return (
        <div ref={mainRef} className="bg-offwhite min-h-screen font-sans text-chocolate/80 overflow-x-hidden selection:bg-accent-aqua/30 selection:text-chocolate">
            <SEO 
                title={t('seo.title')}
                canonical="/cultura-de-la-forma"
                description={t('seo.description')}
                keywords={[
                    "corte de autor malaga",
                    "metodo curly rincon de la victoria",
                    "peinados organicos torre de benagalbon",
                    "corte de pelo mujer anoreta",
                    "estilistas capilares chilches",
                    "corte seco peluqueria torre del mar",
                    "estilismo velez malaga",
                    "corte de diseño nerja"
                ]}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "serviceType": "Diseño Capilar y Estilismo (Cultura de la Forma)",
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
                    "description": "Servicios exclusivos de diseño y corte de autor, peinado botánico y tratamientos de texturas personalizadas como método Curly y alisados saludables."
                }}
            />
            
            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
                <div className="absolute inset-0 z-0 group">
                    <img 
                        src="/images/tratamiento-aminoproteico2-pilar-palomares.webp" 
                        alt={t('hero.imgAlt')} 
                        className="w-full h-full object-cover object-top md:hidden group-hover:scale-110 transition-transform duration-[5s]"
                    />
                    <img 
                        src="/images/culturadelaforma-pilar-palomares.webp" 
                        alt={t('hero.imgAlt')} 
                        className="hidden md:block w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[5s]"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-1000"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl">
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

            {/* ═══════════════ SECTION: NUESTRO STYLING ═══════════════ */}
            <section id="styling" className="py-16 md:py-24 px-6 lg:px-20 bg-white bg-noise relative overflow-hidden reveal-section border-b border-chocolate/5">
                <div className="container-custom">
                    <div className="reveal-item flex flex-col md:flex-row items-center gap-12 md:gap-24 lg:gap-32">
                        {/* Mobile Title */}
                        <div className="w-full md:hidden text-left mb-2">
                            <span className="eyebrow-badge">{t('styling.eyebrow')}</span>
                            <h2 className="text-3xl font-serif uppercase tracking-tight">{t('styling.title')}</h2>
                        </div>

                        {/* Image Container with Double-Bezel */}
                        <div className="w-3/4 mx-auto md:w-5/12 aspect-[3/4] double-bezel-wrapper group">
                            <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                <img 
                                    src="/images/styling-botanico-acabado-cabello-saludable.webp"
                                    alt={t('styling.imgAlt')}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)]" 
                                />
                                <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors duration-700"></div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="w-full md:w-7/12 space-y-6 md:space-y-8 text-left">
                            <div className="hidden md:block">
                                <span className="eyebrow-badge">{t('styling.eyebrow')}</span>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-6 uppercase leading-[1.1] text-chocolate">{t('styling.title')}</h2>
                            </div>
                            <p className="text-base md:text-lg text-chocolate/80 leading-relaxed max-w-xl">
                                {t('styling.desc')}
                            </p>
                            
                            <div className="grid grid-cols-3 gap-4 text-center pt-4 max-w-md">
                                <div className="flex flex-col items-center group">
                                    <div className="w-14 h-14 rounded-full bg-accent-aqua/5 flex items-center justify-center text-accent-aqua shadow-lg mb-2 border border-white/20 group-hover:bg-accent-aqua group-hover:text-white transition-all duration-500">
                                        <Wind size={24} />
                                    </div>
                                    <span className="text-xs uppercase tracking-widest font-bold text-chocolate/60">{t('styling.antifrizz')}</span>
                                </div>
                                <div className="flex flex-col items-center group">
                                    <div className="w-14 h-14 rounded-full bg-accent-aqua/5 flex items-center justify-center text-accent-aqua shadow-lg mb-2 border border-white/20 group-hover:bg-accent-aqua group-hover:text-white transition-all duration-500">
                                        <Sparkles size={24} />
                                    </div>
                                    <span className="text-xs uppercase tracking-widest font-bold text-chocolate/60">{t('styling.shine')}</span>
                                </div>
                                <div className="flex flex-col items-center group">
                                    <div className="w-14 h-14 rounded-full bg-accent-aqua/5 flex items-center justify-center text-accent-aqua shadow-lg mb-2 border border-white/20 group-hover:bg-accent-aqua group-hover:text-white transition-all duration-500">
                                        <Droplets size={24} />
                                    </div>
                                    <span className="text-xs uppercase tracking-widest font-bold text-chocolate/60">{t('styling.nutrition')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ SECTION: DISEÑO Y ACABADO (CORTE DE AUTOR) ═══════════════ */}
            <section id="diseno-acabado" className="py-24 px-6 lg:px-20 bg-cream/30 bg-noise reveal-section">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 reveal-item">
                        <h2 className="eyebrow-badge">{t('design.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-8 uppercase leading-[1.1] text-chocolate">{t('design.title1')} <br /> <span className="text-accent-aqua">{t('design.title2')}</span></h2>
                        <p className="text-base text-chocolate/80 leading-relaxed max-w-2xl mx-auto">
                            {t('design.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {/* PEINADO DE MUJER */}
                        <div className="reveal-item group text-center md:text-left">
                            <h3 className="text-xl font-serif uppercase tracking-widest text-chocolate mb-6">{t('design.woman.title')}</h3>
                            <div className="double-bezel-wrapper w-4/5 mx-auto md:w-full aspect-[4/5] mb-8 group">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                    <img 
                                        src="/images/bea5-pilar-palomares.webp"
                                        alt={t('design.woman.imgAlt')}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)]" 
                                    />
                                    {/* Sello Cultura de la Forma */}
                                    <div className="absolute bottom-4 left-4 w-16 h-16 md:bottom-6 md:left-6 md:w-20 md:h-20 lg:w-24 lg:h-24 z-20 hover:scale-110 hover:rotate-12 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_4px_12px_rgba(60,47,47,0.08)]">
                                        <Sello name="cultura-forma" className="text-chocolate" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-base text-chocolate/80 leading-relaxed">
                                {t('design.woman.desc')}
                            </p>
                        </div>

                        {/* CORTE DE AUTOR */}
                        <div className="reveal-item group text-center md:text-left">
                            <h3 className="text-xl font-serif uppercase tracking-widest text-chocolate mb-6">{t('design.signature.title')}</h3>
                            <div className="double-bezel-wrapper w-4/5 mx-auto md:w-full aspect-[4/5] mb-8 group">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                    <img 
                                        src="/images/acabado-peinado-brillo-natural-peluqueria.webp"
                                        alt={t('design.signature.imgAlt')}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)]" 
                                    />
                                </div>
                            </div>
                            <p className="text-base text-chocolate/80 leading-relaxed font-sans normal-case">
                                {t('design.signature.desc')}
                            </p>
                        </div>

                        {/* CUIDADO MASCULINO */}
                        <div className="reveal-item group text-center md:text-left">
                            <h3 className="text-xl font-serif uppercase tracking-widest text-chocolate mb-6">{t('design.man.title')}</h3>
                            <div className="double-bezel-wrapper w-4/5 mx-auto md:w-full aspect-[4/5] mb-8 group">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                    <img 
                                        src="/images/david1-pilar-palomares.webp"
                                        alt={t('design.man.imgAlt')}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[1.5s] ease-[cubic-bezier(0.32,0.72,0,1)]" 
                                    />
                                </div>
                            </div>
                            <p className="text-base text-chocolate/80 leading-relaxed">
                                {t('design.man.desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ SECTION: TEXTURA Y FORMA ═══════════════ */}
            <section id="textura" className="py-24 px-6 lg:px-20 bg-white bg-noise reveal-section border-y border-chocolate/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 reveal-item">
                        <h2 className="eyebrow-badge">{t('specialties.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-6 uppercase leading-[1.1] text-chocolate">{t('specialties.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('specialties.title2')}</span></h2>
                        <p className="text-base text-chocolate/80 max-w-2xl mx-auto leading-relaxed">
                            {t('specialties.desc')}
                        </p>
                    </div>

                    <div className="space-y-24 md:space-y-40">
                        {/* MÉTODO CURLY */}
                        <div className="reveal-item flex flex-col md:flex-row items-center gap-12 md:gap-24">
                            {/* Mobile Title */}
                            <div className="w-full md:hidden text-left">
                                <span className="eyebrow-badge">{t('specialties.curly.eyebrow')}</span>
                                <h3 className="text-3xl font-serif mb-0 uppercase tracking-tight">{t('specialties.curly.title')}</h3>
                            </div>

                            {/* Image Container */}
                            <div className="w-3/4 mx-auto md:w-5/12 aspect-[3/4] double-bezel-wrapper group">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                    <img 
                                        src="/images/peluqueria/metodo-curly-rizo-natural-peluqueria-organica-pilar-palomares.webp" 
                                        alt={t('specialties.curly.imgAlt')} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)]" 
                                    />
                                    <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors duration-700"></div>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="w-full md:w-7/12 space-y-8 text-left">
                                <div className="hidden md:block">
                                    <span className="eyebrow-badge">{t('specialties.curly.eyebrow')}</span>
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-6 uppercase leading-[1.1] text-chocolate">{t('specialties.curly.title')}</h3>
                                </div>
                                <p className="text-base text-chocolate/80 leading-relaxed max-w-xl">
                                    {t('specialties.curly.desc')}
                                </p>
                                <div className="flex flex-row flex-nowrap gap-2 md:gap-3 overflow-x-hidden">
                                    <span className="px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-mint/30 border border-mint/50 text-xs uppercase tracking-widest font-bold text-chocolate/80 whitespace-nowrap">{t('specialties.curly.badge1')}</span>
                                    <span className="px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-mint/30 border border-mint/50 text-xs uppercase tracking-widest font-bold text-chocolate/80 whitespace-nowrap">{t('specialties.curly.badge2')}</span>
                                    <span className="px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-mint/30 border border-mint/50 text-xs uppercase tracking-widest font-bold text-chocolate/80 whitespace-nowrap">{t('specialties.curly.badge3')}</span>
                                </div>
                            </div>
                        </div>

                        {/* ALISADO AMINOPROTÉICO */}
                        <div id="alisado-aminoproteico" className="reveal-item flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
                            {/* Mobile Title */}
                            <div className="w-full md:hidden text-left">
                                        <span className="eyebrow-badge">{t('specialties.alisado.eyebrow')}</span>
                                <h3 className="text-3xl font-serif mb-0 uppercase tracking-tight">{t('specialties.alisado.title')}</h3>
                            </div>

                            {/* Image Container (Carousel) */}
                            <div className="w-3/4 mx-auto md:w-5/12 aspect-[3/4] double-bezel-wrapper group">
                                <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                    <ImageCarousel 
                                        images={[
                                            { url: "/images/tratamiento-aminoproteico1-pilar-palomares.webp", alt: t('specialties.alisado.title') + " 1" },
                                            { url: "/images/tratamiento-aminoproteico2-pilar-palomares.webp", alt: t('specialties.alisado.title') + " 2" },
                                            { url: "/images/tratamiento-aminoproteico3-pilar-palomares.webp", alt: t('specialties.alisado.title') + " 3" }
                                        ]} 
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="w-full md:w-7/12 space-y-8 text-left">
                                <div className="hidden md:block">
                                    <span className="eyebrow-badge">{t('specialties.alisado.eyebrow')}</span>
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-6 uppercase leading-[1.1] text-chocolate">{t('specialties.alisado.title')}</h3>
                                </div>
                                <p className="text-base text-chocolate/80 leading-relaxed max-w-xl">
                                    {t('specialties.alisado.desc')}
                                </p>
                                <div className="flex flex-row flex-nowrap gap-2 md:gap-3 overflow-x-hidden">
                                    <span className="px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-mint/30 border border-mint/50 text-xs uppercase tracking-widest font-bold text-chocolate/80 whitespace-nowrap">{t('specialties.alisado.badge1')}</span>
                                    <span className="px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-mint/30 border border-mint/50 text-xs uppercase tracking-widest font-bold text-chocolate/80 whitespace-nowrap">{t('specialties.alisado.badge2')}</span>
                                    <span className="px-3 py-1.5 md:px-5 md:py-2 rounded-full bg-mint/30 border border-mint/50 text-xs uppercase tracking-widest font-bold text-chocolate/80 whitespace-nowrap">{t('specialties.alisado.badge3')}</span>
                                </div>

                                <div className="space-y-6 pt-6 border-t border-chocolate/5">
                                    <h4 className="text-xs uppercase tracking-[0.4em] font-bold text-accent-aqua/80">{t('specialties.alisado.recHeader')}</h4>
                                    <div className="grid gap-4">
                                        <div className="flex gap-4 items-start group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-aqua/40 mt-1.5 shrink-0 group-hover:bg-accent-aqua transition-colors" />
                                            <p className="text-sm text-chocolate/70 leading-relaxed italic">
                                                {t('specialties.alisado.rec1')}
                                            </p>
                                        </div>
                                        <div className="flex gap-4 items-start group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-aqua/40 mt-1.5 shrink-0 group-hover:bg-accent-aqua transition-colors" />
                                            <p className="text-sm text-chocolate/70 leading-relaxed italic">
                                                {t('specialties.alisado.rec2')}
                                            </p>
                                        </div>
                                        <div className="flex gap-4 items-start group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-aqua/40 mt-1.5 shrink-0 group-hover:bg-accent-aqua transition-colors" />
                                            <p className="text-sm text-chocolate/70 leading-relaxed italic">
                                                {t('specialties.alisado.rec3')}
                                            </p>
                                        </div>
                                        <div className="flex gap-4 items-start group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-aqua/40 mt-1.5 shrink-0 group-hover:bg-accent-aqua transition-colors" />
                                            <p className="text-sm text-chocolate/70 leading-relaxed italic">
                                                {t('specialties.alisado.rec4')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button
                                        to={lp("/bioterapia-capilar#alisado")}
                                        variant="primary"
                                        icon={ArrowRight}
                                        className="spring-bounce"
                                    >
                                        {t('specialties.alisado.btn')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ CTA FINAL ═══════════════ */}
            <section className="py-12 md:py-20 bg-mint/20 bg-noise text-center px-6 reveal-section relative overflow-hidden">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <div className="reveal-item mb-8 md:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif uppercase leading-[1.1] text-chocolate">{t('cta.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('cta.title2')}</span></h2>
                    </div>
                    
                    <div className="reveal-item w-full max-w-xl mb-8 md:mb-0 group">
                        {/* Image Container with Button Overlay */}
                        <div className="double-bezel-wrapper aspect-square">
                            <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                <img 
                                    src="/images/ideas-peinados-recogidos-novias-eventos.webp"
                                    alt={t('cta.imgAlt')}
                                    className="w-full h-full object-cover transition-all duration-[3s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110"
                                />
                                {/* Overlay for all devices */}
                                <div className="flex absolute inset-0 bg-black/10 items-center justify-center">
                                    <Button
                                        to={lp("/reserva")}
                                        variant="glass"
                                        icon={ArrowRight}
                                        className="spring-bounce"
                                    >
                                        {t('cta.btn')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const nextSlide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <div className="relative w-full h-full group/carousel">
            <div className={`w-full h-full transition-all duration-500 ease-in-out transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                <img 
                    src={images[currentIndex].url} 
                    alt={images[currentIndex].alt} 
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* Controls */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-10">
                <button onClick={prevSlide} aria-label="Ver imagen anterior" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={nextSlide} aria-label="Ver imagen siguiente" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, i) => (
                    <div 
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-white' : 'bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CulturaDeLaForma;
