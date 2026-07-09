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
import nsEs from '../locales/bioterapia-facial/es.json';
import nsEn from '../locales/bioterapia-facial/en.json';
import nsDe from '../locales/bioterapia-facial/de.json';
import nsFr from '../locales/bioterapia-facial/fr.json';

registerNS('bioterapia-facial', { es: nsEs, en: nsEn, de: nsDe, fr: nsFr });

gsap.registerPlugin(ScrollTrigger);

const TreatmentDetail = ({ treatment, bgColor }) => {
    const { t } = useTranslation('bioterapia-facial');
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
                        <button onClick={prevImage} aria-label={t('slideshow.prev')} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-chocolate hover:bg-accent-aqua hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-lg z-10">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={nextImage} aria-label={t('slideshow.next')} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-chocolate hover:bg-accent-aqua hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-lg z-10">
                            <ChevronRight size={24} />
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
        <div id={treatment.id} ref={sectionRef} className={`reveal-section pt-24 pb-32 border-b border-chocolate/5 px-6 lg:px-20 ${bgColor} bg-noise scroll-mt-32 relative`}>
            <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
            <div className="w-full flex flex-col lg:flex-row gap-16 items-center relative z-10">
                {/* ═══════════════ LEFT: CONTENT ═══════════════ */}
                <div className="w-full lg:w-1/2 space-y-10">
                    <div className="space-y-4">
                        <span className="text-base uppercase tracking-[0.6em] text-chocolate/60 font-serif font-bold mb-4 block leading-relaxed">{t(`treatments.${treatment.id}.subtitle`)}</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase">{t(`treatments.${treatment.id}.title`)}</h2>
                        {renderSlideshow(true)}
                        <p className="text-base uppercase tracking-widest text-chocolate/60 leading-relaxed font-bold max-w-xl">
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
                    <div className="hidden md:block space-y-10">
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
                            <div className="text-base md:text-lg text-chocolate/80 leading-relaxed font-sans normal-case transition-opacity duration-500 max-w-2xl whitespace-pre-line">
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

const BioterapiaFacial = () => {
    const { t } = useTranslation('bioterapia-facial');
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

    const facialTreatments = [
        {
            id: "sensitiva",
            title: "Bioterapia Sensitiva",
            subtitle: "Pieles Reactivas · Calma y Protección",
            summary: "Terapia biológica diseñada para restaurar el equilibrio de las pieles más delicadas y reactivas.",
            images: ["/images/bioterapias/bioterapia-facial-cuidado-rostro-bioterapia-secretos-del-agua-pilar-palomares.webp"],
            tabs: {
                description: "Ritual calmante que refuerza la barrera protectora de la dermis, eliminando rojeces y tirantez mediante el uso de Agua Biopolar™ y activos botánicos como la caléndula y el aciano.",
                benefits: "• Calma la irritación inmediata.\n• Refuerza la hidratación natural.\n• Reduce la reactividad cutánea.\n• Aporta suavidad y confort.",
                ideal: "• Tienes la piel sensible o reactiva.\n• Sufres de rojeces o descamación.\n• Notas tirantez tras el lavado.\n• Buscas un ritual suave y respetuoso.",
                actives: "Caléndula, Aciano, Manzanilla, Aloe Vera, Agua Biopolar™."
            }
        },
        {
            id: "iluminante",
            title: "Bioterapia Iluminante",
            subtitle: "Uniformidad · Luz y Despigmentación",
            summary: "Actúa sobre la hiperpigmentación para devolver la luminosidad y el tono uniforme al rostro.",
            images: ["/images/bioterapias/bioterapia-facial-tratamiento-bioterapia-secretos-del-agua-pilar-palomares.webp"],
            tabs: {
                description: "Tratamiento avanzado que regula la producción de melanina y unifica el relieve cutáneo. Ideal para pieles apagadas o con manchas solares y hormonales.",
                benefits: "• Difumina manchas y marcas.\n• Unifica el tono del rostro.\n• Aporta luminosidad instantánea.\n• Regenera el tejido dañado.",
                ideal: "• Notas el tono de tu piel apagado o desigual.\n• Tienes manchas solares o por la edad.\n• Quieres recuperar el brillo natural.\n• Tienes marcas de acné.",
                actives: "Gayuba, Regaliz, Vitamina C natural, Ginkgo Biloba."
            }
        },
        {
            id: "detox",
            title: "Bioterapia Detox",
            subtitle: "Pureza · Equilibrio y Limpieza Profunda",
            summary: "Limpieza biológica profunda que drena toxinas y drena el exceso de secreción sebácea.",
            images: ["/images/bioterapias/bioterapia-facial-seccion-bioterapia-secretos-del-agua-pilar-palomares.webp"],
            tabs: {
                description: "Ritual purificante que limpia los poros sin agredir, equilibrando el pH y devolviendo la vitalidad a pieles con tendencia a impurezas.",
                benefits: "• Elimina toxinas y puntos negros.\n• Regula el exceso de grasa.\n• Cierra el poro y afina la textura.\n• Previene brotes de acné.",
                ideal: "• Tienes la piel con tendencia grasa o mixta.\n• Notas poros dilatados e impurezas.\n• Vives en ambientes con polución.\n• Sientes la piel pesada o sucia.",
                actives: "Bardana, Ortiga, Arcilla Blanca, Limón, Tomillo."
            }
        },
        {
            id: "antiaging",
            title: "Bioterapia Antiaging",
            subtitle: "Reestructuración · Firmeza y Juventud",
            summary: "Terapia reestructurante que combate el envejecimiento celular y recupera la densidad de la piel.",
            images: ["/images/portada-facial-pilar-palomares.webp"],
            tabs: {
                description: "Ritual diseñado para pieles que necesitan un extra de nutrición y firmeza. Estimula la producción de colágeno y elastina de forma biológica, rellenando arrugas desde el interior.",
                benefits: "• Efecto lifting biológico.\n• Rellena líneas de expresión.\n• Mejora la elasticidad y firmeza.\n• Nutre en profundidad.",
                ideal: "• Notas pérdida de firmeza en el óvalo facial.\n• Tienes arrugas o líneas marcadas.\n• Buscas un rejuvenecimiento natural.\n• Notas la piel delgada o frágil.",
                actives: "Resveratrol, Aceite de Argán, Soja, Rosa Mosqueta, Karité."
            }
        },
        {
            id: "regeneradora",
            title: "Bioterapia Regeneradora",
            subtitle: "Renovación · Hidratación y Energía",
            summary: "Bioterapia de choque para pieles desvitalizadas, secas o con falta de energía celular.",
            images: ["/images/bioterapias/bioterapia-facial-hero2-bioterapia-secretos-del-agua-pilar-palomares.webp"],
            tabs: {
                description: "Ritual de nutrición intensa que devuelve la jugosidad y el volumen al rostro, reparando los daños causados por factores externos.",
                benefits: "• Hidratación de larga duración.\n• Regenera el tejido de forma exprés.\n• Suaviza el relieve cutáneo.\n• Aporta flexibilidad y jugosidad.",
                ideal: "• Tu piel está muy seca o deshidratada.\n• Notas falta de vitalidad y frescura.\n• Has estado expuesta al sol o frío extremo.\n• Buscas una piel elástica y jugosa.",
                actives: "Ácido Hialurónico vegetal, Aguacate, Manteca de Murumuru, Algas."
            }
        }
    ];

    return (
        <div ref={mainRef} className="bg-offwhite min-h-screen">
            <SEO 
                title={t('seo.title')}
                canonical="/bioterapia-facial"
                description={t('seo.description')}
                keywords={[
                    "bioterapia facial malaga",
                    "secretos del agua facial rincon de la victoria",
                    "limpieza facial organica torre de benagalbon",
                    "tratamiento antiarrugas natural anoreta",
                    "cosmetica botánica chilches",
                    "cuidado facial saludable torre del mar",
                    "belleza facial velez malaga",
                    "antiaging nerja"
                ]}
                schemaData={[
                    {
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Bioterapia Facial Avanzada",
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
                        "description": "Limpieza y rejuvenecimiento facial profundo libre de toxinas, siliconas y derivados del petróleo mediante Agua Biopolar™ e infoactivos de Secretos del Agua."
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "¿Qué beneficios aporta la bioterapia facial?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Aporta una limpieza celular profunda, elimina impurezas y toxinas, hidrata intensamente y estimula la regeneración celular. El resultado es una piel visiblemente más luminosa, firme, sana y rejuvenecida sin agresión química."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "¿Qué productos se utilizan en la bioterapia facial?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Utilizamos exclusivamente productos de Secretos del Agua, formulados con Agua Biopolar™ y activos botánicos puros de origen orgánico que respetan el pH natural de la piel y no contienen sustancias sintéticas o derivadas del petróleo."
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
                        <source media="(max-width: 768px)" srcSet="/images/portada-facial-pilar-palomares.webp" />
                        <source media="(min-width: 1024px)" srcSet="/images/portada-facial-pilar-palomares.webp" />
                        <img 
                            src="/images/portada-facial-pilar-palomares.webp" 
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

            {/* ═══════════════ INTRO: ARQUITECTURA DE PIEL ═══════════════ */}
            <section className="pt-24 pb-12 px-6 lg:px-20 reveal-section bg-white bg-noise relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="reveal w-full text-center relative z-10 bg-cream rounded-[2.5rem] p-8 md:p-12 border border-peach/40 max-w-4xl mx-auto">
                    <span className="eyebrow-badge">{t('intro.eyebrow')}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase mb-8">{t('intro.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('intro.title2')}</span></h2>
                    <p className="text-base text-chocolate/80 leading-relaxed normal-case">
                        {t('intro.text1')}<strong className="text-chocolate text-bold">{t('intro.strong')}</strong>{t('intro.text2')}
                    </p>
                </div>
            </section>

            {/* ═══════════════ FACIAL PROTOCOLS ═══════════════ */}
            <section className="pt-12 pb-10 px-6 lg:px-20 bg-white bg-noise reveal-section relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="w-full relative z-10">
                    {/* Top part: Text & Image */}
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center mb-0">
                        <div className="w-full lg:w-[42%]">
                            <span className="eyebrow-badge">{t('protocols.eyebrow')}</span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase mb-8">{t('protocols.title1')} <br /> <span className="text-accent-aqua">{t('protocols.title2')}</span></h2>
                            
                            {/* Mobile/Tablet image immediately below the title */}
                            <div className="w-full lg:hidden mb-8 double-bezel-wrapper">
                                <div className="aspect-[4/3] overflow-hidden double-bezel-inner shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)] group relative">
                                    <img 
                                        src="/images/bioterapias/bioterapia-facial-seccion-bioterapia-secretos-del-agua-pilar-palomares.webp" 
                                        alt={t('protocols.imgAltMobile')} 
                                        className="block w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05] object-center"
                                    />
                                    <div className="absolute inset-0 bg-chocolate/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                                </div>
                            </div>

                            <p className="text-base text-chocolate/80 leading-relaxed italic font-serif">
                                {t('protocols.quote')}
                            </p>

                            <div className="mt-10 p-8 md:p-10 bg-accent-aqua/80 backdrop-blur-md rounded-[3rem] border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-accent-aqua/20 transition-all duration-500 transform hover:-translate-y-2 relative group">
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Sparkles size={24} className="text-accent-aqua" />
                                </div>
                                <p className="text-sm md:text-base text-white font-serif italic leading-relaxed m-0">
                                    {t('protocols.card')}
                                </p>
                                <div className="w-12 h-[1px] bg-white/30 mt-6"></div>
                            </div>
                        </div>
                        <div className="hidden lg:block w-full lg:w-[58%] double-bezel-wrapper">
                            <div className="aspect-[4/3] overflow-hidden double-bezel-inner shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)] group relative">
                                <img
                                    src="/images/bioterapias/bioterapia-facial-seccion-bioterapia-secretos-del-agua-pilar-palomares.webp"
                                    alt={t('protocols.imgAltDesktop')}
                                    className="block w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05] object-center"
                                />
                                <div className="absolute inset-0 bg-chocolate/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ DETAILED TREATMENTS LIST HEADER ═══════════════ */}
            <section className="bg-offwhite bg-noise pt-24 pb-0 px-6 reveal-section relative text-center">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto z-10 relative">
                    <span className="eyebrow-badge">{t('list.eyebrow')}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate uppercase leading-[1.1]">{t('list.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('list.title2')}</span></h2>
                    <div className="w-16 h-[1px] bg-accent-aqua mx-auto mt-6"></div>
                    <p className="text-base text-chocolate/70 leading-relaxed max-w-xl mx-auto mt-8 font-sans normal-case">
                        {t('list.text')}
                    </p>
                </div>
            </section>

            {/* Bottom part: Treatments List */}
            <div className="bg-white">
                {facialTreatments.map((treatment, index) => (
                    <TreatmentDetail 
                        key={treatment.id} 
                        treatment={treatment} 
                        bgColor={index % 2 === 0 ? 'bg-offwhite' : 'bg-white'}
                    />
                ))}
            </div>
        </div>
    );
};

export default BioterapiaFacial;
