// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Droplets, Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLang } from '../langContext';
import { registerNS } from '../i18n';
import Button from '../components/Button';
import SEO from '../components/SEO';
import Sello from '../components/Sello';
import nsEs from '../locales/bioterapia-capilar/es.json';
import nsEn from '../locales/bioterapia-capilar/en.json';
import nsDe from '../locales/bioterapia-capilar/de.json';
import nsFr from '../locales/bioterapia-capilar/fr.json';

registerNS('bioterapia-capilar', { es: nsEs, en: nsEn, de: nsDe, fr: nsFr });

gsap.registerPlugin(ScrollTrigger);

const isPackshot = (src) => src.endsWith('.png') && (src.includes('pack') || src.includes('champu') || src.includes('gel') || src.includes('623') || src.includes('aguadelluvia'));

const ImageSlideshow = ({ treatment, currentImageIndex, prevImage, nextImage, isMobile = false }) => (
    <div className={`${isMobile ? 'w-full max-w-[280px] mx-auto my-8 md:hidden' : 'hidden md:flex w-full md:w-1/2 lg:max-w-md justify-center order-2'}`}>
        <div className={`relative group w-full aspect-[4/5] ${isMobile ? 'h-auto rounded-[2rem]' : 'h-auto md:h-[480px] lg:h-[580px] rounded-[2rem] lg:rounded-[3rem]'} overflow-hidden shadow-[0_20px_40px_-10px_rgba(60,47,47,0.1)] hover:shadow-[0_60px_120px_-25px_rgba(60,47,47,0.2)] hover:-translate-y-4 transition-all duration-700 bg-offwhite border border-chocolate/5`}>
            <div className={`absolute inset-0 flex items-center justify-center ${
                isPackshot(treatment.images[currentImageIndex]) ? 'p-6' : ''
            }`}>
                <img 
                    src={treatment.images[currentImageIndex]} 
                    alt={treatment.title} 
                    className={`w-full h-full transition-all duration-[1000ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 ${
                        isPackshot(treatment.images[currentImageIndex])
                        ? 'object-contain scale-[1.1]' : 'object-cover object-[center_top]'
                    }`}
                />
            </div>
            
            {treatment.images.length > 1 && (
                <>
                    <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-chocolate hover:bg-accent-aqua hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-lg z-10"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-chocolate hover:bg-accent-aqua hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-lg z-10"
                    >
                        <ChevronRight size={20} />
                    </button>
                    
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {treatment.images.map((_, i) => (
                            <div 
                                key={i} 
                                className={`w-1 h-1 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'bg-accent-aqua w-3' : 'bg-chocolate/20'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    </div>
);

const TreatmentDetail = ({ treatment, bgColor }) => {
    const { t } = useTranslation('bioterapia-capilar');
    const { lp } = useLang();
    const [activeTab, setActiveTab] = useState('description');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const sectionRef = useRef(null);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % treatment.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + treatment.images.length) % treatment.images.length);
    };

    return (
        <div id={treatment.id} ref={sectionRef} className={`reveal-section pt-12 pb-24 border-b border-chocolate/5 px-6 lg:px-20 ${bgColor} scroll-mt-32`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 lg:gap-16 items-center lg:items-start">
                {/* ═══════════════ CONTENT ═══════════════ */}
                <div className="w-full md:w-1/2 space-y-6 md:space-y-8 lg:space-y-10 order-1">
                    <div className="space-y-4">
                        <span className="text-sm md:text-base uppercase tracking-[0.6em] text-chocolate/60 font-serif font-bold mb-4 block leading-relaxed">{treatment.subtitle}</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-chocolate leading-tight tracking-tight uppercase">{treatment.title}</h2>
                        
                        {/* MOBILE IMAGE: After title, before text */}
                        <ImageSlideshow
                            treatment={treatment}
                            currentImageIndex={currentImageIndex}
                            prevImage={prevImage}
                            nextImage={nextImage}
                            isMobile={true}
                        />

                        <p className="text-sm md:text-base uppercase tracking-widest text-chocolate/60 leading-relaxed font-bold max-w-xl">
                            {treatment.summary}
                        </p>
                    </div>

                    {/* 📱 MOBILE & TABLET ACCORDION (Hidden on Desktop) */}
                    <div className="lg:hidden space-y-3 md:space-y-4">
                        {[
                            { id: 'description', label: t('tabs.description') },
                            { id: 'benefits', label: t('tabs.benefits') },
                            { id: 'ideal', label: t('tabs.ideal') },
                            { id: 'actives', label: t('tabs.actives') }
                        ].map((tab) => (
                            <div key={tab.id} className="border-b border-chocolate/10">
                                <button
                                    onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
                                    className="w-full py-4 flex justify-between items-center text-left"
                                >
                                    <span className={`text-xs md:text-sm font-bold uppercase tracking-[0.2em] ${activeTab === tab.id ? 'text-accent-aqua' : 'text-chocolate/60'}`}>
                                        {tab.label}
                                    </span>
                                    {activeTab === tab.id ? (
                                        <Minus size={18} className="text-accent-aqua" />
                                    ) : (
                                        <Plus size={18} className="text-chocolate/40" />
                                    )}
                                </button>
                                <div className={`overflow-hidden transition-all duration-500 ${activeTab === tab.id ? 'max-h-[800px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-sm md:text-base text-chocolate/80 leading-relaxed font-sans normal-case whitespace-pre-line">
                                        {treatment.tabs[tab.id]}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 💻 DESKTOP TABS (Hidden on Mobile/Tablet) */}
                    <div className="hidden lg:block space-y-10">
                        <div className="flex border-b border-chocolate/10 gap-8 overflow-x-auto pb-2 scrollbar-hide">
                            {[
                                { id: 'description', label: t('tabs.description') },
                                { id: 'benefits', label: t('tabs.benefits') },
                                { id: 'ideal', label: t('tabs.ideal') },
                                { id: 'actives', label: t('tabs.actives') }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`pb-4 text-base font-bold uppercase tracking-[0.2em] transition-all relative ${
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
                            <p className="text-lg text-chocolate/80 leading-relaxed font-sans normal-case transition-opacity duration-500 max-w-2xl whitespace-pre-line">
                                {treatment.tabs[activeTab]}
                            </p>
                        </div>
                    </div>

                    {/* Return to Culture of Form (Specific for Alisado) - Visible on all devices */}
                    {treatment.id === 'alisado' && (
                        <div className="pt-6 md:pt-8">
                            <Button 
                                to={lp("/cultura-de-la-forma#alisado-aminoproteico")} 
                                variant="primary"
                                icon={ArrowRight}
                            >
                                {t('items.alisado.btn')}
                            </Button>
                        </div>
                    )}
                </div>

                {/* ═══════════════ DESKTOP & TABLET IMAGE ═══════════════ */}
                <ImageSlideshow
                    treatment={treatment}
                    currentImageIndex={currentImageIndex}
                    prevImage={prevImage}
                    nextImage={nextImage}
                    isMobile={false}
                />
            </div>
        </div>
    );
};


const BioterapiaCapilar = () => {
    const { t } = useTranslation('bioterapia-capilar');
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
                    ease: 'expo.out'
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

    const bioterapias = [
        {
            id: "restauradora",
            title: t('items.restauradora.title'),
            subtitle: t('items.restauradora.subtitle'),
            summary: t('items.restauradora.summary'),
            images: [
                "/images/bioterapias/restaurador-capilar-bioterapia-secretos-del-agua.webp",
                "/images/bioterapias/pack-restaurador-bioterapia-secretos-del-agua-pilar-palomares.webp"
            ],
            tabs: {
                description: t('items.restauradora.description'),
                benefits: t('items.restauradora.benefits'),
                ideal: t('items.restauradora.ideal'),
                actives: t('items.restauradora.actives')
            }
        },
        {
            id: "sensitiva",
            title: t('items.sensitiva.title'),
            subtitle: t('items.sensitiva.subtitle'),
            summary: t('items.sensitiva.summary'),
            images: [
                "/images/bioterapias/seccion-bioterapia-capilar-bioterapia-secretos-del-agua.webp",
                "/images/bioterapias/pack-sensitivo-capilar2-bioterapia-secretos-del-agua.webp"
            ],
            tabs: {
                description: t('items.sensitiva.description'),
                benefits: t('items.sensitiva.benefits'),
                ideal: t('items.sensitiva.ideal'),
                actives: t('items.sensitiva.actives')
            }
        },
        {
            id: "fuerza",
            title: t('items.fuerza.title'),
            subtitle: t('items.fuerza.subtitle'),
            summary: t('items.fuerza.summary'),
            images: [
                "/images/bioterapias/restaurador-fuerza-bioterapia-secretos-del-agua-pilar-palomares.webp",
                "/images/bioterapias/packs-fuerza-bioterapia-secretos-del-agua-pilar-palomares.webp"
            ],
            tabs: {
                description: t('items.fuerza.description'),
                benefits: t('items.fuerza.benefits'),
                ideal: t('items.fuerza.ideal'),
                actives: t('items.fuerza.actives')
            }
        },
        {
            id: "volumen",
            title: t('items.volumen.title'),
            subtitle: t('items.volumen.subtitle'),
            summary: t('items.volumen.summary'),
            images: [
                "/images/bioterapias/sensitivo-capilar2-bioterapia-secretos-del-agua.webp",
                "/images/bioterapias/pack-volumen-bioterapia-secretos-del-agua-pilar-palomares.webp"
            ],
            tabs: {
                description: t('items.volumen.description'),
                benefits: t('items.volumen.benefits'),
                ideal: t('items.volumen.ideal'),
                actives: t('items.volumen.actives')
            }
        },
        {
            id: "lluvia",
            title: t('items.lluvia.title'),
            subtitle: t('items.lluvia.subtitle'),
            summary: t('items.lluvia.summary'),
            images: [
                "/images/bioterapias/agua-lluvia-bioterapia-secretos-del-agua-pilar-palomares.webp",
                "/images/bioterapias/aguadelluvia-bioterapia-secretos-del-agua-pilar-palomares.webp"
            ],
            tabs: {
                description: t('items.lluvia.description'),
                benefits: t('items.lluvia.benefits'),
                ideal: t('items.lluvia.ideal'),
                actives: t('items.lluvia.actives')
            }
        },
        {
            id: "purificante",
            title: t('items.purificante.title'),
            subtitle: t('items.purificante.subtitle'),
            summary: t('items.purificante.summary'),
            images: [
                "/images/bioterapias/bioterapia-capilar-purificante-detox-cuero-cabelludo.webp",
                "/images/bioterapias/champu-purificante-bioterapia-secretos-del-agua-pilar-palomares.webp",
                "/images/bioterapias/gel-purificante-100ml-bioterapia-secretos-del-agua-pilar-palomares.webp"
            ],
            tabs: {
                description: t('items.purificante.description'),
                benefits: t('items.purificante.benefits'),
                ideal: t('items.purificante.ideal'),
                actives: t('items.purificante.actives')
            }
        },
        {
            id: "tierra",
            title: t('items.tierra.title'),
            subtitle: t('items.tierra.subtitle'),
            summary: t('items.tierra.summary'),
            images: [
                "/images/bioterapias/agua-tierra-bioterapia-secretos-del-agua-pilar-palomares.webp",
                "/images/bioterapias/agua-tierra-200m-bioterapia-secretos-del-agua-pilar-palomares.webp"
            ],
            tabs: {
                description: t('items.tierra.description'),
                benefits: t('items.tierra.benefits'),
                ideal: t('items.tierra.ideal'),
                actives: t('items.tierra.actives')
            }
        },
        {
            id: "alisado",
            title: t('items.alisado.title'),
            subtitle: t('items.alisado.subtitle'),
            summary: t('items.alisado.summary'),
            images: [
                "/images/bioterapias/aminoproteico8-bioterapia-secretos-del-agua-pilar-palomares.webp"
            ],
            tabs: {
                description: t('items.alisado.description'),
                benefits: t('items.alisado.benefits'),
                ideal: t('items.alisado.ideal'),
                actives: t('items.alisado.actives')
            }
        }
    ];

    return (
        <div ref={mainRef} className="bg-offwhite min-h-screen">
            <SEO 
                title={t('seo.title')}
                canonical="/bioterapia-capilar"
                description={t('seo.description')}
                keywords={[
                    "bioterapia capilar malaga",
                    "secretos del agua capilar rincon de la victoria",
                    "tratamiento anticaida torre de benagalbon",
                    "desintoxicacion capilar anoreta",
                    "alisado aminoproteico torre del mar",
                    "salud del cabello chilches",
                    "estilistas capilares velez malaga",
                    "tratamientos capilares nerja"
                ]}
                schemaData={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Bioterapia Capilar Avanzada",
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
                        "description": "Recupera la vitalidad, volumen y detiene la caída del cabello restaurando el cuero cabelludo con botánica celular y Agua Biopolar™ de Secretos del Agua."
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "¿Qué es la bioterapia capilar?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "La bioterapia capilar es un tratamiento orgánico y biológico que desintoxica, nutre y regenera el cuero cabelludo y el cabello desde el interior, utilizando Agua Biopolar™ y activos botánicos libres de siliconas, sulfatos y parabenos."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "¿Para qué tipo de problemas capilares está indicada?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Está especialmente indicada para tratar la caída del cabello, la caspa, el exceso de grasa, la deshidratación y la descamación del cuero cabelludo, así como para restaurar cabellos castigados por tintes químicos tradicionales."
                                }
                            }
                        ]
                    }
                ]}
            />
            {/* ═══════════════ HEADER HERO ═══════════════ */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 group">
                    <picture className="block w-full h-full">
                        <source media="(max-width: 768px)" srcSet="/images/bioterapias/portada-movil-tratamientos-bioterapia-secretos-del-agua-pilar-palomares.webp" />
                        <img 
                            src="/images/bioterapias/seccion-bioterapia-capilar-bioterapia-secretos-del-agua.webp" 
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
                            {t('hero.backBtn')}
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
                            to={lp("/reserva")}
                            variant="primary"
                        >
                            {t('hero.btn')}
                        </Button>
                    </div>
                </div>
            </section>

            {/* ═══════════════ LAVADO DERMOCAPILAR ═══════════════ */}
            <section className="py-24 pb-12 px-6 lg:px-20 reveal-section overflow-hidden bg-white relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20 relative z-10">
                    <div className="w-full md:w-1/2 space-y-8 md:space-y-10">
                        <div>
                            <span className="eyebrow-badge">{t('lavado.eyebrow')}</span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-chocolate leading-tight uppercase tracking-tighter">{t('lavado.title1')} <br /> <span className="text-accent-aqua">{t('lavado.title2')}</span></h2>
                            
                            {/* MOBILE IMAGE: After Title */}
                            <div className="md:hidden w-full max-w-[280px] mx-auto my-8">
                                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-10px_rgba(60,47,47,0.1)] relative">
                                    <img
                                        src="/images/bioterapias/lavado-dermocapilar-bioterapia-secretos-del-agua.webp"
                                        alt={t('lavado.imgAlt')}
                                        className="w-full h-full object-cover object-center"
                                    />
                                    {/* Sello Sin Tóxicos - Mobile */}
                                    <div className="absolute bottom-4 left-4 w-16 h-16 z-20 drop-shadow-[0_4px_8px_rgba(60,47,47,0.08)]">
                                        <Sello name="sin-toxicos" className="text-accent-aqua" />
                                    </div>
                                </div>
                            </div>

                            <p className="mt-6 md:mt-8 text-base md:text-lg lg:text-xl text-chocolate/80 leading-relaxed normal-case">
                                {t('lavado.desc')}
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="reveal reveal-delay-1 bg-cream rounded-3xl p-6 border border-peach/40">
                                <h3 className="text-sm uppercase tracking-widest text-chocolate font-bold mb-2">{t('lavado.card1Title')}</h3>
                                <p className="text-base text-chocolate/80 font-sans leading-relaxed">
                                    {t('lavado.card1Desc')}
                                </p>
                            </div>
                            <div className="reveal reveal-delay-2 bg-mint/30 rounded-3xl p-6 border border-peach/40">
                                <h3 className="text-sm uppercase tracking-widest text-chocolate font-bold mb-2">{t('lavado.card2Title')}</h3>
                                <p className="text-base text-chocolate/80 font-sans leading-relaxed">
                                    {t('lavado.card2Desc')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* DESKTOP & TABLET IMAGE */}
                    <div className="hidden md:block w-1/2 relative order-2">
                        <div className="aspect-[4/5] rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(60,47,47,0.12)] hover:shadow-[0_50px_100px_-20px_rgba(60,47,47,0.18)] hover:-translate-y-4 transition-all duration-700 relative group max-w-lg mx-auto lg:ml-auto">
                            <img
                                src="/images/bioterapias/lavado-dermocapilar-bioterapia-secretos-del-agua.webp"
                                alt={t('lavado.imgAlt')}
                                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors"></div>
                            {/* Sello Sin Tóxicos - Desktop */}
                            <div className="absolute bottom-6 left-6 w-20 h-20 lg:w-24 lg:h-24 z-20 hover:scale-110 hover:rotate-12 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_4px_12px_rgba(60,47,47,0.08)]">
                                <Sello name="sin-toxicos" className="text-accent-aqua" />
                            </div>
                        </div>
                        <div className="absolute -top-6 -right-6 lg:-top-10 lg:-right-10 bg-accent-aqua/80 backdrop-blur-md p-6 lg:p-8 rounded-3xl shadow-2xl z-20 hidden lg:block max-w-[280px] border border-white/20 transform hover:scale-105 transition-transform duration-500 group">
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-white shadow-lg rounded-xl flex items-center justify-center border border-accent-aqua/20">
                                <Droplets size={24} className="text-accent-aqua" />
                            </div>
                            <p className="font-serif text-[14px] leading-relaxed italic text-white mb-6">
                                "{t('lavado.quote')}"
                            </p>
                            <div className="w-8 h-[1px] bg-white/40"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ DETAILED TREATMENTS LIST ═══════════════ */}
            <section className="bg-offwhite pt-32 pb-0 px-6 reveal-section relative">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="eyebrow-badge">{t('listHeader.eyebrow')}</span>
                    <h2 className="text-4xl md:text-6xl font-serif text-chocolate uppercase tracking-tighter">{t('listHeader.title')}</h2>
                    <div className="w-16 h-[1px] bg-accent-aqua mx-auto mt-6"></div>
                </div>
            </section>

            <div className="bg-white">
                {bioterapias.map((treatment, index) => (
                    <TreatmentDetail 
                        key={treatment.id} 
                        treatment={treatment} 
                        bgColor={index % 2 === 0 ? 'bg-offwhite' : 'bg-white'} 
                    />
                ))}
            </div>

            {/* ═══════════════ DIAGNOSIS CTA ═══════════════ */}
            <section className="py-32 px-6 lg:px-20 bg-chocolate text-white relative overflow-hidden group">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/images/home/diagnostico-capilar-pilar-palomares.webp" 
                        alt={t('cta.imgAlt')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5s] object-center"
                    />
                    <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/25"></div>
                </div>
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none z-0"></div>
                
                <div className="max-w-5xl mx-auto text-center relative z-10 reveal-section drop-shadow-lg">
                    <h2 className="text-3xl md:text-6xl font-serif mb-8 leading-tight uppercase drop-shadow-md">{t('cta.title1')} <br /> <span className="text-accent-aqua">{t('cta.title2')}</span></h2>
                    <p className="text-lg md:text-xl text-white mb-12 max-w-2xl mx-auto font-light leading-relaxed normal-case drop-shadow-sm">
                        {t('cta.desc')}
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <Button
                            to={lp("/reserva")}
                            variant="coral"
                        >
                            {t('cta.btn')}
                        </Button>
                    </div>
                    <p className="mt-8 text-xs uppercase tracking-[0.3em] text-white/50">{t('cta.note')}</p>
                </div>
            </section>
        </div>
    );
};

export default BioterapiaCapilar;
