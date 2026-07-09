// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Scissors, Sparkles, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLang } from '../langContext';
import { registerNS } from '../i18n';
import Button from '../components/Button';
import SEO from '../components/SEO';
import nsEs from '../locales/peluqueria/es.json';
import nsEn from '../locales/peluqueria/en.json';
import nsDe from '../locales/peluqueria/de.json';
import nsFr from '../locales/peluqueria/fr.json';

registerNS('peluqueria', { es: nsEs, en: nsEn, de: nsDe, fr: nsFr });

gsap.registerPlugin(ScrollTrigger);

const Peluqueria = () => {
    const { t } = useTranslation('peluqueria');
    const { lp } = useLang();
    const mainRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Hero Animation with soft blur
            gsap.fromTo('.hero-text', 
                { opacity: 0, y: 30, filter: 'blur(10px)' }, 
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'expo.out', stagger: 0.2 }
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
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const categories = [
        {
            title: t('categories.color.title'),
            desc: t('categories.color.desc'),
            icon: Palette,
            link: "/cultura-de-color",
            image: "/images/color/aplicacion-barros-coloracion-organica-cabello.webp",
            label: t('categories.color.label')
        },
        {
            title: t('categories.forma.title'),
            desc: t('categories.forma.desc'),
            icon: Scissors,
            link: "/cultura-de-la-forma",
            image: "/images/peluqueria/corte-autor-mujer-personalizado-peluqueria-organica-pilar-palomares.webp",
            label: t('categories.forma.label')
        },
        {
            title: t('categories.tratamientos.title'),
            desc: t('categories.tratamientos.desc'),
            icon: Sparkles,
            link: "/bioterapia-capilar",
            image: "/images/bioterapias/bioterapia-capilar-tratamiento-bioterapia-secretos-del-agua.webp",
            label: t('categories.tratamientos.label')
        },
        {
            title: t('categories.eventos.title'),
            desc: t('categories.eventos.desc'),
            icon: Heart,
            link: "/eventos",
            image: "/images/peluqueria/momentos-especiales-bodas-eventos-peluqueria-organica-pilar-palomares.webp",
            label: t('categories.eventos.label')
        }
    ];

    return (
        <div ref={mainRef} className="bg-offwhite min-h-screen font-sans text-chocolate overflow-x-hidden selection:bg-accent-aqua/30 selection:text-chocolate">
            <SEO 
                title={t('seo.title')}
                canonical="/peluqueria"
                description={t('seo.description')}
                keywords={[
                    "peluqueria de autor malaga",
                    "peluqueria organica rincon de la victoria",
                    "tinte barros capilares torre de benagalbon",
                    "corte de autor anoreta",
                    "alisado organico torre del mar",
                    "peluqueria saludable chilches",
                    "estilistas velez malaga",
                    "peluqueria nerja"
                ]}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "serviceType": "Peluquería de Autor y Orgánica",
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
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "Catálogo de Peluquería Saludable",
                        "itemListElement": [
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "Cultura de Color (Barros y Óleos)",
                                    "description": "Coloración 100% botánica y orgánica con barros y óleos de Secretos del Agua que respetan la fibra capilar."
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "Cultura de la Forma (Corte de Autor)",
                                    "description": "Cortes de diseño y peinados personalizados respetando la caída natural y salud del cabello."
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "Tratamientos Capilares Secretos del Agua",
                                    "description": "Rituales de salud celular capilar que purifican, nutren y restauran desde el interior."
                                }
                            }
                        ]
                    }
                }}
            />
            
            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
                <div className="absolute inset-0 z-0 group">
                    <img 
                        src="/images/peluqueria/PORTADA_servicio_peluqueria_salonpilarpalomares.webp" 
                        alt={t('seo.title')}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]"
                    />
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-1000"></div>
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

            {/* ═══════════════ CATEGORY GRID ═══════════════ */}
            <section className="py-32 px-6 lg:px-20 reveal-section bg-cream/30 bg-noise">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {categories.map((cat, idx) => {
                            const Icon = cat.icon;
                            return (
                                <Link 
                                    key={idx} 
                                    to={lp(cat.link)}
                                    className="group relative h-[450px] md:h-[550px] rounded-[2.5rem] md:rounded-[3rem] border border-white/10 overflow-hidden reveal-item flex flex-col justify-end p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(60,47,47,0.2)] hover:shadow-[0_45px_90px_-20px_rgba(60,47,47,0.45)] hover:-translate-y-4 transition-all duration-700"
                                >
                                    <div className="absolute inset-0 z-0">
                                        <img 
                                            src={cat.image}
                                            alt={`${cat.title} - Salón Pilar Palomares`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/30 transition-colors duration-500"></div>
                                    </div>

                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-accent-aqua transition-colors duration-500 flex-shrink-0">
                                                <Icon size={24} />
                                            </div>
                                            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-accent-aqua/15 border border-accent-aqua/30 text-accent-aqua text-[10px] md:text-xs tracking-[0.2em] font-sans font-bold uppercase backdrop-blur-sm select-none shadow-sm">{cat.label}</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-tight leading-tight">{cat.title}</h2>
                                        <p className="text-base text-white/80 leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-4 group-hover:translate-y-0">
                                            {cat.desc}
                                        </p>
                                        <div className="pt-2">
                                            <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] font-bold text-white group-hover:text-accent-aqua transition-colors">
                                                {t('categories.explore')} <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Peluqueria;
