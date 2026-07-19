// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Droplets, Sparkles, Heart, Zap, Shield, ArrowRight, Wind, Sun, Moon, Flame, Brain, Activity, ChevronRight, Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLang } from '../langContext';
import { registerNS } from '../i18n';
import Button from '../components/Button';
import SEO from '../components/SEO';
import nsEs from '../locales/bioterapias/es.json';
import nsEn from '../locales/bioterapias/en.json';
import nsDe from '../locales/bioterapias/de.json';
import nsFr from '../locales/bioterapias/fr.json';

registerNS('bioterapias', { es: nsEs, en: nsEn, de: nsDe, fr: nsFr });

gsap.registerPlugin(ScrollTrigger);

const FAQItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div 
            className={`group transition-all duration-500 rounded-[2rem] overflow-hidden border backdrop-blur-md ${isOpen ? 'bg-black/40 shadow-2xl border-accent-aqua/50' : 'bg-black/20 border-white/10 hover:border-white/30 hover:bg-black/30'}`}
        >
            <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen ? "true" : "false"} className="w-full px-6 py-6 md:px-8 md:py-8 flex justify-between items-center text-left transition-colors focus:outline-none">
                <span className={`text-base md:text-lg lg:text-xl font-serif font-bold uppercase tracking-widest leading-relaxed pr-6 transition-colors duration-300 ${isOpen ? 'text-accent-aqua' : 'text-white/90'}`}>
                    {faq.question}
                </span>
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-accent-aqua/20 text-accent-aqua rotate-180' : 'bg-white/10 border border-white/20 text-white/70 group-hover:text-accent-aqua'}`}>
                    {isOpen ? (
                        <Minus size={20} strokeWidth={2.5} />
                    ) : (
                        <Plus size={20} strokeWidth={2.5} />
                    )}
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-8 md:px-8 pt-0 text-base md:text-lg leading-relaxed font-sans normal-case">
                    <div className="w-full h-[1px] bg-white/10 mb-6"></div>
                    {faq.answer}
                </div>
            </div>
        </div>
    );
};

const Bioterapias = () => {
    const { t } = useTranslation('bioterapias');
    const { lp } = useLang();
    const mainRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo('.fade-in',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'expo.out', scrollTrigger: {
                        trigger: '.hero-section',
                        start: 'top 80%',
                    }
                }
            );

            const revealSections = document.querySelectorAll('.reveal-section');
            revealSections.forEach((section) => {
                gsap.fromTo(section.querySelectorAll('.reveal-item'),
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
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

            // Refresh ScrollTrigger after a short delay
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 1000);
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const tratamientosCapilares = [
        { id: "biolaminar", link: "/bioterapia-capilar#restauradora" },
        { id: "fuerza", link: "/bioterapia-capilar#fuerza" },
        { id: "lluvia", link: "/bioterapia-capilar#lluvia" },
        { id: "volumen", link: "/bioterapia-capilar#volumen" },
        { id: "purificante", link: "/bioterapia-capilar#purificante" },
        { id: "tierra", link: "/bioterapia-capilar#tierra" },
        { id: "infoFuerza", link: "/bioterapia-capilar#fuerza" },
        { id: "infoSensitivo", link: "/bioterapia-capilar#sensitiva" },
        { id: "alisado", link: "/bioterapia-capilar#alisado" },
        { id: "reparador", link: "/bioterapia-capilar#alisado" }
    ];

    const tratamientosCorporales = [
        { id: "sculptor", link: "/bioterapia-corporal#sculptor" },
        { id: "colorLuz", link: "/bioterapia-corporal#colorluz" },
        { id: "piernas", link: "/bioterapia-corporal#piernas" }
    ];

    const tratamientosFaciales = [
        { id: "sensitiva", link: "/bioterapia-facial#sensitiva" },
        { id: "iluminante", link: "/bioterapia-facial#iluminante" },
        { id: "detox", link: "/bioterapia-facial#detox" },
        { id: "antiaging", link: "/bioterapia-facial#antiaging" },
        { id: "regeneradora", link: "/bioterapia-facial#regeneradora" }
    ];

    const bioterapiasEstetica = [
        { id: "manos" },
        { id: "pies" }
    ];

    const herramientasMadero = [
        { id: "tabla" },
        { id: "rodilloCubos" },
        { id: "copa" },
        { id: "rodilloLiso" },
        { id: "cepillo" }
    ];

    const remedios = [
        { code: "PUL", image: "/images/bioterapias/remedio-respirar-sistema-respiratorio-bioterapia-secretos-del-agua-pilar-palomares.webp", icon: Wind },
        { code: "REX", image: "/images/bioterapias/remedio-descanso-relajacion-bioterapia-secretos-del-agua-pilar-palomares.webp", icon: Moon },
        { code: "COR", image: "/images/bioterapias/remedio-amor-corazon-bioterapia-secretos-del-agua-pilar-palomares.webp", icon: Heart },
        { code: "BAZ", image: "/images/bioterapias/remedio-renovar-celular-bioterapia-secretos-del-agua-pilar-palomares.webp", icon: Sparkles },
        { code: "GEN", image: "/images/bioterapias/remedio-sensibilidad-cutanea-bioterapia-secretos-del-agua-pilar-palomares.webp", icon: Shield },
        { code: "PAN", image: "/images/bioterapias/remedio-flexibilidad-corporal-bioterapia-secretos-del-agua-pilar-palomares.webp", icon: Activity },
        { code: "HIG", image: "/images/bioterapias/remedio-coraje-hepatico-bioterapia-secretos-del-agua-pilar-palomares.webp", icon: Flame },
        { code: "DIG", image: "/images/bioterapias/remedio-digerir-digestivo-bioterapia-secretos-del-agua-pilar-palomares.webp", icon: Zap },
        { code: "RIN", image: "/images/bioterapias/remedio-energia-vitalidad-bioterapia-secretos-del-agua-pilar-palomares.webp", icon: Sun },
        { code: "MEN", image: "/images/bioterapias/remedio-direccion-enfoque-bioterapia-secretos-del-agua-pilar-palomares.webp", icon: Brain }
    ];

    const propiedadesAgua = [
        { id: "molecular" },
        { id: "regenerativa" },
        { id: "depurativa" },
        { id: "vibracion" }
    ];

    return (
        <div ref={mainRef} className="bg-offwhite min-h-screen font-sans text-chocolate overflow-x-hidden">
            <SEO 
                title={t('seo.title')}
                canonical="/bioterapias"
                description={t('seo.description')}
                keywords={[
                    "bioterapias malaga",
                    "secretos del agua rincon de la victoria",
                    "tratamientos biologicos de piel torre de benagalbon",
                    "estetica natural anoreta",
                    "maderoterapia torre del mar",
                    "tratamientos capilares organicos nerja",
                    "cuidado facial saludable chilches",
                    "cosmetica botánica velez malaga"
                ]}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "serviceType": "Bioterapias Celulares y Estética Saludable",
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
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": t('seo.title'),
                        "itemListElement": [
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": t('capilar.eyebrow'),
                                    "description": t('capilar.text')
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": t('facial.eyebrow'),
                                    "description": t('facial.text')
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": t('corporal.eyebrow'),
                                    "description": t('corporal.text')
                                }
                            }
                        ]
                    }
                }}
            />

            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
                <div className="absolute inset-0 z-0 group">
                    <picture>
                        <source 
                            media="(max-width: 768px)" 
                            srcSet="/images/maderoterapia-movil-pilar-palomares.webp" 
                        />
                        <img
                            src="/images/bioterapias/portada-bioterapia-corporal-bioterapia-secretos-del-agua-pilar-palomares.webp"
                            alt={t('hero.imgAlt')}
                            className="w-full h-full object-cover object-[center_85%] md:object-center group-hover:scale-110 transition-transform duration-[3s]"
                        />
                    </picture>
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-1000"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-7xl mx-auto fade-in">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-aqua/15 border border-accent-aqua/30 text-accent-aqua text-[10px] md:text-xs tracking-[0.25em] font-sans font-bold uppercase mb-8 backdrop-blur-sm shadow-sm select-none">
                        {t('hero.eyebrow')}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight uppercase tracking-tight text-white drop-shadow-lg">
                        {t('hero.title')}
                    </h1>
                    <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed normal-case">
                        {t('hero.text')}
                    </p>
                </div>
            </section>

            {/* ═══════════════ AGUA BIOPOLAR™ ═══════════════ */}
            <section className="pt-20 pb-24 md:pt-24 md:pb-32 px-6 lg:px-20 bg-cream bg-noise reveal-section relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="reveal-item">
                            <h2 className="eyebrow-badge">{t('agua.eyebrow')}</h2>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-8 leading-[1.1] uppercase text-chocolate">{t('agua.title')}</h3>
                            
                            {/* Mobile Image: Shown only on small screens after the title */}
                            <div className="md:hidden mb-8 double-bezel-wrapper">
                                <div className="aspect-square overflow-hidden double-bezel-inner group">
                                    <img
                                        src="/images/bioterapias/agua-biopolar-cola-caballo-bioterapia-secretos-del-agua-pilar-palomares.webp"
                                        alt={t('agua.imgAltMobile')}
                                        className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    />
                                </div>
                            </div>

                             <div className="space-y-6 text-base md:text-lg text-chocolate/80 leading-relaxed max-w-xl">
                                <p>
                                    {t('agua.text1')}<strong className="text-chocolate">{t('agua.textStrong')}</strong>{t('agua.text2')}
                                </p>
                            </div>

                            <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                                {propiedadesAgua.map((p, idx) => (
                                    <div key={idx} className="p-5 md:p-6 flex flex-col justify-center bg-accent-aqua/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                                        <h3 className="text-xs md:text-sm font-serif uppercase tracking-widest text-white mb-2 leading-tight [text-shadow:0_2px_4px_rgba(35,64,59,0.5),0_1px_2px_rgba(255,255,255,0.3)]">
                                            {t(`agua.props.${p.id}.title`)}
                                        </h3>
                                        <p className="text-[10px] md:text-[11px] text-white/95 leading-relaxed uppercase tracking-wider font-medium">
                                            {t(`agua.props.${p.id}.desc`)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Image: Hidden on mobile */}
                        <div className="reveal-item hidden md:block double-bezel-wrapper">
                            <div className="aspect-[3/4] overflow-hidden double-bezel-inner group shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)]">
                                <img
                                    src="/images/bioterapias/agua-biopolar-cola-caballo-bioterapia-secretos-del-agua-pilar-palomares.webp"
                                    alt={t('agua.imgAltDesktop')}
                                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ FAQ / QUÉ SON LAS BIOTERAPIAS ═══════════════ */}
            <section className="pt-20 pb-16 md:pt-28 md:pb-24 px-6 lg:px-20 reveal-section overflow-hidden relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/bioterapias/bioterapia-facial-hero2-bioterapia-secretos-del-agua-pilar-palomares.webp')" }}>
                <div className="absolute inset-0 bg-black/50"></div>
                
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="eyebrow-badge">{t('faq.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-white leading-tight uppercase mb-8 tracking-tight">{t('faq.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('faq.title2')}</span></h2>
                        <div className="w-16 h-[1px] bg-accent-aqua mx-auto"></div>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        {[
                            {
                                question: t('faq.q1.question'),
                                answer: (
                                    <ul className="space-y-4 list-none text-white/90">
                                        <li className="flex items-start gap-4"><span className="text-accent-aqua font-bold mt-1 text-xl leading-none">•</span> <span>{t('faq.q1.item1')}</span></li>
                                        <li className="flex items-start gap-4"><span className="text-accent-aqua font-bold mt-1 text-xl leading-none">•</span> <span>{t('faq.q1.item2')}</span></li>
                                        <li className="flex items-start gap-4"><span className="text-accent-aqua font-bold mt-1 text-xl leading-none">•</span> <span>{t('faq.q1.item3')}</span></li>
                                        <li className="flex items-start gap-4"><span className="text-accent-aqua font-bold mt-1 text-xl leading-none">•</span> <span>{t('faq.q1.item4')}</span></li>
                                        <li className="flex items-start gap-4"><span className="text-accent-aqua font-bold mt-1 text-xl leading-none">•</span> <span>{t('faq.q1.item5')}</span></li>
                                        <li className="flex items-start gap-4"><span className="text-accent-aqua font-bold mt-1 text-xl leading-none">•</span> <span>{t('faq.q1.item6')}</span></li>
                                        <li className="flex items-start gap-4"><span className="text-accent-aqua font-bold mt-1 text-xl leading-none">•</span> <span>{t('faq.q1.item7')}</span></li>
                                    </ul>
                                )
                            },
                            {
                                question: t('faq.q2.question'),
                                answer: <p className="text-white/90">{t('faq.q2.answer')}</p>
                            },
                            {
                                question: t('faq.q3.question'),
                                answer: (
                                    <div className="space-y-5 text-white/90">
                                        <p>{t('faq.q3.p1')}</p>
                                        <p>{t('faq.q3.p2')}</p>
                                        <p>{t('faq.q3.p3')}</p>
                                    </div>
                                )
                            }
                        ].map((faq, index) => (
                            <FAQItem key={index} faq={faq} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ BIOTERAPIA CAPILAR ═══════════════ */}
            <section className="pt-20 pb-16 md:pt-28 md:pb-24 px-6 lg:px-20 bg-offwhite bg-noise reveal-section overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    {/* Header + Highlight Image (Editorial style) */}
                    <div className="flex flex-col md:flex-row items-center gap-16 md:gap-6 mb-8 md:mb-24">
                        <div className="w-full md:w-1/2 reveal-item">
                            <h2 className="eyebrow-badge">{t('capilar.eyebrow')}</h2>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase mb-8 tracking-tight">{t('capilar.title1')} <br /> <span className="text-accent-aqua">{t('capilar.title2')}</span></h2>
                            
                            {/* Mobile Image - Below Title */}
                            <div className="md:hidden mb-12 aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 w-full max-w-[500px] mx-auto">
                                <img
                                    src="/images/bioterapias/restauracion-capilar2-bioterapia-secretos-del-agua.webp"
                                    alt={t('capilar.imgAlt')}
                                    className="w-full h-full object-cover object-[center_15%]"
                                />
                                {/* Mobile Floating Card Overlay */}
                                <div className="absolute bottom-4 left-4 right-4 bg-accent-aqua/90 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                                    <p className="font-serif text-sm md:text-base italic text-white leading-relaxed">
                                        {t('capilar.quoteMobile')}
                                    </p>
                                </div>
                            </div>

                            <p className="text-lg text-chocolate/80 leading-relaxed mb-4 normal-case text-balance">
                                {t('capilar.text')}
                            </p>
                        </div>

                        {/* Desktop Image - 50/50 Centered Layout with Floating Card */}
                        <div className="hidden md:block md:w-1/2 reveal-item group relative order-1 md:order-2">
                            <div className="relative h-full flex items-center justify-center py-10">
                                <div className="relative max-w-[440px] w-full mx-auto">
                                    <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                                        <img
                                            src="/images/bioterapias/restauracion-capilar2-bioterapia-secretos-del-agua.webp"
                                            alt={t('capilar.imgAlt')}
                                            className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-[4s]"
                                        />
                                    </div>
                                    
                                    {/* Floating Infoactivos Card - Bottom Right Placement, offset to not block face */}
                                    <div className="absolute -bottom-12 -right-6 lg:-right-16 bg-accent-aqua/80 backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-white/20 shadow-2xl max-w-[280px] lg:max-w-[320px] z-20 hover:scale-105 transition-transform duration-500 group/card">
                                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform">
                                            <Sparkles size={24} className="text-accent-aqua" />
                                        </div>
                                        <p className="font-serif text-base md:text-lg italic text-white leading-relaxed">
                                            {t('capilar.quoteDesktop')}
                                        </p>
                                        <div className="w-8 h-[1px] bg-white/40 mt-6"></div>
                                    </div>
                                    
                                    <div className="absolute -bottom-6 -left-6 w-full h-full bg-accent-aqua/5 rounded-[3rem] -z-0 translate-x-4 translate-y-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Full Width Treatment Grid - 3 Columns on Desktop */}
                    <div className="reveal-item">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 md:auto-rows-fr">
                                {tratamientosCapilares.map((tItem, idx) => (
                                    <Link 
                                        key={idx} 
                                        to={lp(tItem.link)} 
                                        className={`group transition-all duration-500 mx-auto w-full max-w-xl lg:max-w-none flex h-full ${tItem.id === 'reparador' ? 'lg:hidden flex' : 'flex'}`}
                                    >
                                        <div className="p-5 md:p-6 lg:p-10 w-full bg-white/70 backdrop-blur-md rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-white/50 shadow-[0_25px_50px_-12px_rgba(60,47,47,0.18)] hover:shadow-[0_45px_90px_-15px_rgba(60,47,47,0.25)] transition-all duration-700 hover:-translate-y-2 flex flex-col items-start gap-4 relative overflow-hidden md:h-full">
                                            {/* Header with Icon and Title */}
                                            <div className="flex items-start gap-4 w-full">
                                                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-accent-aqua/10 flex items-center justify-center group-hover:bg-accent-aqua/20 transition-all text-accent-aqua shadow-inner flex-shrink-0 mt-1">
                                                    <Droplets size={18} className="md:w-5 md:h-5" />
                                                </div>
                                                <div className="flex-1 flex flex-col justify-start min-h-[2.5rem] md:min-h-[4.5rem] lg:min-h-[6.5rem] pr-2">
                                                    <h3 className="text-sm md:text-lg lg:text-xl font-serif uppercase tracking-widest text-accent-aqua transition-colors leading-tight mb-2">{t(`capilar.items.${tItem.id}.name`)}</h3>
                                                    <div className="w-8 h-[1px] bg-accent-aqua/30 mb-0 hidden md:block"></div>
                                                </div>
                                            </div>

                                            <div className="flex-1 flex flex-col w-full text-left">
                                                <p className="text-base md:text-lg text-chocolate/80 leading-relaxed flex-1 line-clamp-3 md:line-clamp-none">"{t(`capilar.items.${tItem.id}.benefits`)}"</p>
                                            </div>

                                            <div className="mt-auto pt-4 md:pt-6 w-full flex flex-col gap-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] md:text-xs font-bold text-accent-aqua tracking-[0.2em] uppercase">{t(`capilar.items.${tItem.id}.price`)}</span>
                                                </div>
                                                <div className="w-full h-[1px] bg-chocolate/5"></div>
                                                <div className="flex justify-start items-center">
                                                    <div className="inline-flex items-center text-white transition-all uppercase tracking-[0.3em] text-[11px] md:text-xs font-bold bg-accent-aqua px-4 py-2 md:px-6 md:py-3 rounded-full border border-transparent shadow-md group-hover:bg-white group-hover:text-accent-aqua group-hover:border-accent-aqua/30 group-hover:scale-105 group-hover:shadow-[0_10px_20px_-5px_rgba(133,183,178,0.4)]">
                                                        {t('detalles')}
                                                        <ChevronRight size={10} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ BIOTERAPIA CORPORAL ═══════════════ */}
            <section className="pt-14 pb-14 md:pt-16 md:pb-16 px-6 lg:px-20 bg-white bg-noise reveal-section relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto">
                    {/* Intro Corporal: Renovación */}
                    <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center mb-12 md:mb-20">
                        <div className="w-full md:w-[58%] reveal-item order-2 md:order-1">
                            <h2 className="eyebrow-badge">{t('corporal.eyebrow')}</h2>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase mb-8 tracking-tight">{t('corporal.title1')} <br /> <span className="text-accent-aqua">{t('corporal.title2')}</span></h2>
                            
                            <h2 className="text-xs uppercase tracking-[0.3em] text-accent-aqua font-serif font-bold mb-8 flex items-center gap-2">
                                {t('corporal.sesiones')}
                                <span className="w-1 h-1 rounded-full bg-accent-aqua/40"></span>
                                {t('corporal.precio')}
                            </h2>

                            {/* Mobile Image - Shown only on small screens after the title */}
                            <div className="md:hidden mb-12 w-full max-w-[280px] mx-auto">
                                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 w-full mb-4">
                                    <img
                                        src="/images/bioterapias/davidypaqui-bioterapia-secretos-del-agua-pilar-palomares.webp"
                                        alt={t('corporal.imgAlt')}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="bg-accent-aqua/90 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-lg text-center">
                                    <p className="font-serif text-sm md:text-base italic text-white leading-relaxed">
                                        {t('corporal.quote')}
                                    </p>
                                </div>
                            </div>

                            <p className="text-lg text-chocolate/80 leading-relaxed mb-10 normal-case text-balance">
                                {t('corporal.text')}
                            </p>
                            
                            <div className="flex items-center gap-4 p-5 bg-accent-aqua/5 rounded-2xl border border-accent-aqua/10 shadow-sm">
                                <Sparkles size={20} className="text-accent-aqua flex-shrink-0" />
                                <p className="text-base text-chocolate/80 italic leading-relaxed">{t('corporal.protocolos')}</p>
                            </div>
                        </div>
                        
                        {/* Desktop Image - Restructured to prevent clipping */}
                        <div className="w-full md:w-[42%] relative order-1 md:order-2 hidden md:block group md:-mt-20 lg:-mt-32 xl:-mt-40">
                            <div className="relative max-w-[440px] w-full mx-auto">
                                <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl relative z-10">
                                    <img
                                        src="/images/bioterapias/davidypaqui-bioterapia-secretos-del-agua-pilar-palomares.webp"
                                        alt={t('corporal.imgAlt')}
                                        className="w-full h-full object-cover object-[center_5%] group-hover:scale-105 transition-transform duration-[4s]"
                                    />
                                </div>
                                
                                {/* Floating Card Overlay - Desktop - Offset and unclipped */}
                                <div className="md:relative lg:absolute md:bottom-0 lg:-bottom-28 md:right-0 lg:-right-12 bg-accent-aqua/80 backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-white/20 shadow-2xl md:max-w-md lg:max-w-[300px] md:mt-6 lg:mt-0 z-20 hover:scale-105 transition-transform duration-500 group/card mx-auto">
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform">
                                        <Activity size={24} className="text-accent-aqua" />
                                    </div>
                                    <p className="font-serif text-base md:text-lg italic text-white leading-relaxed">
                                        {t('corporal.quote')}
                                    </p>
                                    <div className="w-8 h-[1px] bg-white/40 mt-6"></div>
                                </div>
                                
                                <div className="absolute -bottom-6 -left-6 w-full h-full bg-accent-aqua/5 rounded-[3.5rem] -z-0 -translate-x-4 translate-y-4"></div>
                            </div>
                        </div>
                    </div>
 
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-fr">
                            {tratamientosCorporales.map((tItem, idx) => {
                                const icons = [<Activity size={20} />, <Sparkles size={20} />, <Zap size={20} />];
                                
                                return (
                                    <Link 
                                        key={idx} 
                                        to={lp(tItem.link)}
                                        className={`group transition-all duration-500 mx-auto w-full max-w-xl lg:max-w-none flex h-full ${idx === 2 ? 'md:col-span-2 lg:col-span-1 md:max-w-2xl' : ''}`}
                                    >
                                        <div className="p-5 md:p-6 lg:p-10 w-full bg-white/70 backdrop-blur-md rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-white/50 shadow-[0_25px_50px_-12px_rgba(60,47,47,0.18)] hover:shadow-[0_45px_90px_-15px_rgba(60,47,47,0.25)] transition-all duration-700 hover:-translate-y-2 flex flex-col items-start gap-4 relative overflow-hidden md:h-full">
                                            <div className="flex items-start gap-4 w-full">
                                                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-accent-aqua/10 flex items-center justify-center group-hover:bg-accent-aqua/20 transition-all text-accent-aqua shadow-inner flex-shrink-0 mt-1">
                                                    {icons[idx]}
                                                </div>
                                                <div className="flex-1 flex flex-col justify-start min-h-[2.5rem] md:min-h-[4.5rem] lg:min-h-[6.5rem]">
                                                    <h3 className="text-sm md:text-lg lg:text-xl font-serif uppercase tracking-widest text-accent-aqua transition-colors leading-tight mb-2">{t(`corporal.items.${tItem.id}.name`)}</h3>
                                                    <div className="w-8 h-[1px] bg-accent-aqua/30 mb-0 hidden md:block"></div>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col w-full text-left">
                                                <p className="text-base md:text-lg text-chocolate/80 leading-relaxed flex-1 line-clamp-3 md:line-clamp-none">"{t(`corporal.items.${tItem.id}.desc`)}"</p>
                                            </div>
                                            <div className="mt-auto pt-4 md:pt-6 w-full flex flex-col gap-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] md:text-xs font-bold text-accent-aqua tracking-[0.2em] uppercase">{t(`corporal.items.${tItem.id}.price`)}</span>
                                                </div>
                                                <div className="w-full h-[1px] bg-chocolate/5"></div>
                                                <div className="flex justify-start items-center">
                                                    <div className="inline-flex items-center text-white transition-all uppercase tracking-[0.3em] text-[11px] md:text-xs font-bold bg-accent-aqua px-4 py-2 md:px-6 md:py-3 rounded-full border border-transparent shadow-md group-hover:bg-white group-hover:text-accent-aqua group-hover:border-accent-aqua/30 group-hover:scale-105 group-hover:shadow-[0_10px_20px_-5px_rgba(133,183,178,0.4)]">
                                                        {t('detalles')}
                                                        <ChevronRight size={10} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                    {/* Maderoterapia Sub-section */}
                    <div className="mt-16 reveal-item relative group/madero">
                        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
                            {/* Mobile Title */}
                            <div className="w-full md:hidden block order-1">
                                <h2 className="eyebrow-badge">{t('madero.eyebrow')}</h2>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif uppercase tracking-tight text-chocolate mb-0 leading-[1.1]">{t('madero.title')}</h2>
                            </div>

                            {/* Photo/Image */}
                            <div className="w-full md:w-1/2 aspect-square md:aspect-square lg:aspect-[4/5] rounded-3xl md:rounded-[3.5rem] overflow-hidden shadow-2xl relative order-2 md:order-1">
                                <img 
                                    src="/images/bioterapias/tratamiento-maderoterapia-corporal-drenante.webp" 
                                    alt={t('madero.imgAlt')} 
                                    className="w-full h-full object-cover group-hover/madero:scale-105 transition-transform duration-[4s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                            </div>

                            {/* Description and Tools Content */}
                            <div className="w-full md:w-1/2 reveal-item order-3 md:order-2">
                                <div className="hidden md:block">
                                    <h2 className="eyebrow-badge">{t('madero.eyebrow')}</h2>
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif uppercase tracking-tight text-chocolate mb-8 leading-[1.1]">{t('madero.title')}</h2>
                                </div>
                                <p className="text-lg text-chocolate/80 leading-relaxed mb-8 max-w-2xl normal-case">
                                    {t('madero.text')}
                                </p>
                                <div className="grid grid-cols-2 gap-4 mb-10">
                                    {herramientasMadero.slice(0, 4).map((tool, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-accent-aqua/30"></div>
                                            <span className="text-xs md:text-sm uppercase tracking-widest text-chocolate/70 font-medium">{t(`madero.tools.${tool.id}.name`)}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link to={lp('/bioterapia-corporal#maderoterapia')} className="inline-flex items-center gap-4 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-accent-aqua hover:text-chocolate transition-all group/link pt-4 border-t border-chocolate/5 w-full">
                                    {t('madero.cta')} <ArrowRight size={16} className="group-hover/link:translate-x-3 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ BIOTERAPIA FACIAL ═══════════════ */}
            <section className="pt-14 pb-14 md:pt-16 md:pb-16 px-6 lg:px-20 bg-mint/20 bg-noise reveal-section">
                <div className="max-w-7xl mx-auto">
                    <div className="text-left mb-16 reveal-item pl-0 lg:pl-0">
                        <h2 className="eyebrow-badge">{t('facial.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-6 uppercase leading-[1.1] text-chocolate">{t('facial.title1')} <br /> <span className="text-accent-aqua">{t('facial.title2')}</span></h2>
                        <div className="w-16 h-[1px] bg-accent-aqua mb-6"></div>
                        <h2 className="text-xs uppercase tracking-[0.3em] text-accent-aqua font-serif font-bold mb-8 flex items-center justify-start gap-3">
                            {t('facial.badge')}
                            <span className="w-1 h-1 rounded-full bg-accent-aqua/40"></span>
                            {t('facial.precio')}
                        </h2>
                        <p className="text-lg text-chocolate/80 max-w-2xl leading-relaxed normal-case">
                            {t('facial.text')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-fr">
                        {/* FIRST ROW: Card 0 | PHOTO | Card 1 */}
                        
                        {/* CARD 0 */}
                        {(() => {
                            const tItem = tratamientosFaciales[0];
                            return (
                                <Link to={lp(tItem.link)} className="group transition-all duration-500 mx-auto w-full max-w-xl lg:max-w-none flex h-full">
                                    <div className="p-5 md:p-6 lg:p-8 w-full bg-white/70 backdrop-blur-md rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-white/50 shadow-[0_25px_50px_-12px_rgba(60,47,47,0.18)] hover:shadow-[0_45px_90px_-15px_rgba(60,47,47,0.25)] transition-all duration-700 hover:-translate-y-2 flex flex-col items-start gap-4 relative overflow-hidden md:h-full">
                                        <div className="flex items-start gap-4 w-full">
                                            <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-accent-aqua/10 flex items-center justify-center group-hover:bg-accent-aqua/20 transition-all text-accent-aqua shadow-inner flex-shrink-0 mt-1">
                                                <Shield size={20} />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-start min-h-[2.5rem] md:min-h-[4.5rem] lg:min-h-[6.5rem]">
                                                <h3 className="text-sm md:text-lg lg:text-xl font-serif uppercase tracking-widest text-accent-aqua transition-colors leading-tight mb-2">{t(`facial.items.${tItem.id}.name`)}</h3>
                                                <div className="w-8 h-[1px] bg-accent-aqua/30 mb-0 hidden md:block"></div>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col w-full text-left">
                                            <p className="text-base text-chocolate/80 leading-relaxed flex-1 line-clamp-3 md:line-clamp-none">"{t(`facial.items.${tItem.id}.desc`)}"</p>
                                        </div>
                                        <div className="mt-auto pt-4 md:pt-6 w-full flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] md:text-xs font-bold text-accent-aqua tracking-[0.2em] uppercase">{t(`facial.items.${tItem.id}.price`)}</span>
                                            </div>
                                            <div className="w-full h-[1px] bg-chocolate/5"></div>
                                            <div className="flex justify-start items-center">
                                                <div className="inline-flex items-center text-white transition-all uppercase tracking-[0.3em] text-[11px] md:text-xs font-bold bg-accent-aqua px-4 py-2 md:px-6 md:py-3 rounded-full border border-transparent shadow-md group-hover:bg-white group-hover:text-accent-aqua group-hover:border-accent-aqua/30 group-hover:scale-105 group-hover:shadow-[0_10px_20px_-5px_rgba(133,183,178,0.4)]">
                                                    {t('detalles')}
                                                    <ChevronRight size={10} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })()}

                        {/* PHOTO CARD (Center of first row in LG, First item in MD/SM) */}
                        <div className="reveal-item group h-full flex items-center justify-center order-first lg:order-none py-4 lg:py-0 md:col-span-2 lg:col-span-1">
                            <div className="w-full max-w-[280px] md:max-w-2xl lg:max-w-none md:w-full md:h-[300px] lg:h-full aspect-[4/5] md:aspect-video lg:aspect-[3/4] rounded-[2.5rem] md:rounded-[2rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl relative mx-auto">
                                <img
                                    src="/images/bioterapias/bioterapia-facial-tratamiento-bioterapia-secretos-del-agua-pilar-palomares.webp"
                                    alt={t('facial.imgAlt')}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4s]"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent h-1/2"></div>
                            </div>
                        </div>

                        {/* CARD 1 */}
                        {(() => {
                            const tItem = tratamientosFaciales[1];
                            return (
                                <Link to={lp(tItem.link)} className="group transition-all duration-500 mx-auto w-full max-w-xl lg:max-w-none flex h-full">
                                    <div className="p-5 md:p-6 lg:p-8 w-full bg-white/70 backdrop-blur-md rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-white/50 shadow-[0_25px_50px_-12px_rgba(60,47,47,0.18)] hover:shadow-[0_45px_90px_-15px_rgba(60,47,47,0.25)] transition-all duration-700 hover:-translate-y-2 flex flex-col items-start gap-4 relative overflow-hidden md:h-full">
                                        <div className="flex items-start gap-4 w-full">
                                            <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-accent-aqua/10 flex items-center justify-center group-hover:bg-accent-aqua/20 transition-all text-accent-aqua shadow-inner flex-shrink-0 mt-1">
                                                <Sun size={20} />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-start min-h-[2.5rem] md:min-h-[4.5rem] lg:min-h-[6.5rem]">
                                                <h3 className="text-sm md:text-lg lg:text-xl font-serif uppercase tracking-widest text-accent-aqua transition-colors leading-tight mb-2">{t(`facial.items.${tItem.id}.name`)}</h3>
                                                <div className="w-8 h-[1px] bg-accent-aqua/30 mb-0 hidden md:block"></div>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col w-full text-left">
                                            <p className="text-base text-chocolate/80 leading-relaxed flex-1 line-clamp-3 md:line-clamp-none">"{t(`facial.items.${tItem.id}.desc`)}"</p>
                                        </div>
                                        <div className="mt-auto pt-4 md:pt-6 w-full flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] md:text-xs font-bold text-accent-aqua tracking-[0.2em] uppercase">{t(`facial.items.${tItem.id}.price`)}</span>
                                            </div>
                                            <div className="w-full h-[1px] bg-chocolate/5"></div>
                                            <div className="flex justify-start items-center">
                                                <div className="inline-flex items-center text-white transition-all uppercase tracking-[0.3em] text-[11px] md:text-xs font-bold bg-accent-aqua px-4 py-2 md:px-6 md:py-3 rounded-full border border-transparent shadow-md group-hover:bg-white group-hover:text-accent-aqua group-hover:border-accent-aqua/30 group-hover:scale-105 group-hover:shadow-[0_10px_20px_-5px_rgba(133,183,178,0.4)]">
                                                    {t('detalles')}
                                                    <ChevronRight size={10} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })()}

                        {/* SECOND ROW: 2 | 3 | 4 */}
                        {[2, 3, 4].map((idx) => {
                            const tItem = tratamientosFaciales[idx];
                            const allIcons = [null, null, <Sparkles size={20} />, <Activity size={20} />, <Droplets size={20} />];
                            return (
                                <Link 
                                    key={idx} 
                                    to={lp(tItem.link)}
                                    className={`group transition-all duration-500 mx-auto w-full max-w-xl lg:max-w-none flex h-full ${idx === 4 ? 'md:col-span-2 lg:col-span-1 md:max-w-2xl' : ''}`}
                                >
                                    <div className="p-5 md:p-6 lg:p-8 w-full bg-white/70 backdrop-blur-md rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-white/50 shadow-[0_25px_50px_-12px_rgba(60,47,47,0.18)] hover:shadow-[0_45px_90px_-15px_rgba(60,47,47,0.25)] transition-all duration-700 hover:-translate-y-2 flex flex-col items-start gap-4 relative overflow-hidden md:h-full">
                                        <div className="flex items-start gap-4 w-full">
                                            <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-accent-aqua/10 flex items-center justify-center group-hover:bg-accent-aqua/20 transition-all text-accent-aqua shadow-inner flex-shrink-0 mt-1">
                                                {allIcons[idx]}
                                            </div>
                                            <div className="flex-1 flex flex-col justify-start min-h-[2.5rem] md:min-h-[4.5rem] lg:min-h-[6.5rem]">
                                                <h3 className="text-sm md:text-lg lg:text-xl font-serif uppercase tracking-widest text-accent-aqua transition-colors leading-tight mb-2">{t(`facial.items.${tItem.id}.name`)}</h3>
                                                <div className="w-8 h-[1px] bg-accent-aqua/30 mb-0 hidden md:block"></div>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col w-full text-left">
                                            <p className="text-base text-chocolate/80 leading-relaxed flex-1 line-clamp-3 md:line-clamp-none">"{t(`facial.items.${tItem.id}.desc`)}"</p>
                                        </div>
                                        <div className="mt-auto pt-4 md:pt-6 w-full flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] md:text-xs font-bold text-accent-aqua tracking-[0.2em] uppercase">{t(`facial.items.${tItem.id}.price`)}</span>
                                            </div>
                                            <div className="w-full h-[1px] bg-chocolate/5"></div>
                                            <div className="flex justify-start items-center">
                                                <div 
                                                    className="inline-flex items-center text-white transition-all uppercase tracking-[0.3em] text-[11px] md:text-xs font-bold bg-accent-aqua px-4 py-2 md:px-6 md:py-3 rounded-full border border-transparent shadow-md group-hover:bg-white group-hover:text-accent-aqua group-hover:border-accent-aqua/30 group-hover:scale-105 group-hover:shadow-[0_10px_20px_-5px_rgba(133,183,178,0.4)]"
                                                >
                                                    {t('detalles')}
                                                    <ChevronRight size={10} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════ BIOTERAPIA DE MANOS Y PIES ═══════════════ */}
            <section id="manos-pies" className="pt-14 pb-14 md:pt-16 md:pb-16 px-6 lg:px-20 bg-white bg-noise reveal-section relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto">
                    <div className="text-left mb-16 reveal-item">
                        <h2 className="eyebrow-badge">{t('manosPies.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-6 uppercase leading-[1.1] text-chocolate">{t('manosPies.title1')} <br /> <span className="text-accent-aqua">{t('manosPies.title2')}</span></h2>
                        <div className="w-16 h-[1px] bg-accent-aqua mb-6"></div>
                        <p className="text-lg text-chocolate/80 max-w-2xl leading-relaxed">
                            {t('manosPies.text')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 md:gap-16 justify-center">
                        {bioterapiasEstetica.map((bItem, idx) => (
                            <div 
                                key={idx} 
                                className="card-elevated-dark relative p-8 md:p-12 bg-chocolate overflow-hidden text-center group h-[340px] md:h-[400px] flex flex-col justify-end rounded-[3.5rem] w-full max-w-md mx-auto reveal-item shadow-2xl"
                                style={{ 
                                    backgroundImage: `linear-gradient(rgba(60, 47, 47, 0.2), rgba(60, 47, 47, 0.85)), url(${idx === 0 ? "/images/bioterapias/bioterapia-manos-bioterapia-secretos-del-agua-pilar-palomares.webp" : "/images/bioterapias/bioterapia-pies-estetica-bioterapia-secretos-del-agua-pilar-palomares.webp"})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-white/20 shadow-xl transition-all duration-700">
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/70 font-bold mb-3 block">{t('manosPies.protocolo')}</span>
                                    <h3 className="text-2xl md:text-3xl font-serif uppercase tracking-widest text-white mb-4 transition-transform duration-700">{t(`manosPies.${bItem.id}.name`)}</h3>
                                    <div className="w-12 h-[1px] bg-white/30 mx-auto mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 transition-all duration-700 ease-in-out overflow-hidden">
                                        <p className="text-base text-white/90 leading-relaxed max-w-[280px] mx-auto">{t(`manosPies.${bItem.id}.desc`)}</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-accent-aqua/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ═══════════════ REMEDIOS INTEGRATIVOS ═══════════════ */}
            <section className="pt-14 pb-14 md:pt-16 md:pb-16 px-6 lg:px-20 bg-offwhite bg-noise reveal-section relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-left mb-16 reveal-item">
                        <h2 className="eyebrow-badge">{t('remedios.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-6 uppercase leading-[1.1] text-chocolate">{t('remedios.title1')} <br /> <span className="text-accent-aqua">{t('remedios.title2')}</span></h2>
                        <div className="w-16 h-[1px] bg-accent-aqua mb-6"></div>
                        <p className="text-lg text-chocolate/80 max-w-2xl leading-relaxed">
                            {t('remedios.text')}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 bg-accent-aqua/80 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-sm">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-white">{t('remedios.badge')}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 reveal-item">
                        {remedios.map((rItem, idx) => {
                            const IconComponent = rItem.icon;
                            return (
                                <div 
                                    key={idx} 
                                    className={`card-elevated-dark relative p-6 bg-chocolate overflow-hidden text-center group h-[300px] flex flex-col justify-center rounded-[2.5rem]
                                        ${idx === 8 ? 'lg:col-start-2 xl:col-start-auto' : ''}
                                        ${idx === 9 ? 'md:col-start-2 lg:col-start-auto' : ''}
                                    `}
                                    style={{ 
                                        backgroundImage: `linear-gradient(rgba(60, 47, 47, 0.45), rgba(60, 47, 47, 0.85)), url(${rItem.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: rItem.code === 'PUL' ? 'center right' : 'center center'
                                    }}
                                >
                                    <div className="relative z-10 w-full h-full flex flex-col justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-aqua/20 transition-colors duration-500">
                                            <IconComponent size={20} className="text-white" />
                                        </div>
                                        <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-1" translate="no">{rItem.code}</div>
                                        <h3 className="text-sm font-serif uppercase tracking-wider mb-1 text-white">{t(`remedios.items.${rItem.code.toLowerCase()}.name`)}</h3>
                                        <div className="text-[10px] text-white/40 font-medium uppercase tracking-wider mb-3">{t(`remedios.items.${rItem.code.toLowerCase()}.organ`)}</div>
                                        <p className="text-base text-white/90 leading-relaxed px-2 normal-case">{t(`remedios.items.${rItem.code.toLowerCase()}.emotion`)}</p>
                                    </div>
                                    <div className="absolute inset-0 bg-accent-aqua/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-12 text-center reveal-item">
                        <div className="max-w-2xl mx-auto p-8 bg-accent-aqua/5 rounded-3xl">
                            <p className="text-base text-chocolate/80 leading-relaxed font-serif">
                                {t('remedios.quote')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ FINAL CTA ═══════════════ */}
            <section className="bg-white bg-noise reveal-section overflow-hidden border-t border-chocolate/5 relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-0 border-x border-chocolate/5 items-center relative z-10">
                    <div className="py-12 md:py-16 px-6 lg:px-20 flex flex-col items-center md:items-start justify-center reveal-item text-center md:text-left">
                        <h2 className="eyebrow-badge">{t('cta.eyebrow')}</h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-8 uppercase leading-[1.1] text-chocolate">
                            {t('cta.title1')} <br className="hidden lg:block" /> <span className="text-accent-aqua">{t('cta.title2')}</span>
                        </h2>
                        <p className="text-lg text-chocolate/80 mb-10 leading-relaxed max-w-xl normal-case">
                            {t('cta.text')}
                        </p>
                        
                        {/* Mobile Image - Shown only on small screens */}
                        <div className="md:hidden mb-10 w-full max-w-sm aspect-square rounded-[40px] overflow-hidden shadow-xl relative z-10 border-4 border-white mx-auto">
                            <img
                                src="/images/bioterapias/bioterapia-ritual-bienvenida-bioterapia-secretos-del-agua-pilar-palomares.webp"
                                alt={t('cta.imgAltMobile')}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-5 md:gap-6 justify-center md:justify-start items-center md:items-start w-full">
                            <Button
                                to="/reserva"
                                variant="coral"
                                icon={ArrowRight}
                                className="shadow-xl w-full sm:w-auto spring-bounce"
                            >
                                {t('cta.reservar')}
                            </Button>
                            <Button
                                to="/contacto"
                                variant="outline-aqua"
                                className="w-full sm:w-auto spring-bounce"
                            >
                                {t('cta.contactar')}
                            </Button>
                        </div>
                    </div>
                    <div className="hidden md:block reveal-item p-6 md:p-10 h-full group">
                        <div className="w-full h-full rounded-[40px] overflow-hidden shadow-sm">
                            <img
                                src="/images/bioterapias/bioterapia-ritual-bienvenida-bioterapia-secretos-del-agua-pilar-palomares.webp"
                                alt={t('cta.imgAltDesktop')}
                                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Bioterapias;
