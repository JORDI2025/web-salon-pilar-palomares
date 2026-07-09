import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Heart, Crown, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { registerNS } from '../i18n';
import Button from '../components/Button';
import SEO from '../components/SEO';
import nsEs from '../locales/eventos/es.json';
import nsEn from '../locales/eventos/en.json';
import nsDe from '../locales/eventos/de.json';
import nsFr from '../locales/eventos/fr.json';

registerNS('eventos', { es: nsEs, en: nsEn, de: nsDe, fr: nsFr });

gsap.registerPlugin(ScrollTrigger);

const Eventos = () => {
    const { t } = useTranslation('eventos');
    const mainRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo('.fade-in', 
                { opacity: 0, y: 30 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    stagger: 0.2, 
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: mainRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Refresh ScrollTrigger after a short delay
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 1000);
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const services = [
        {
            id: "novias",
            icon: <Crown size={32} />,
            image: "/images/eventos/novias-peluqueria-maquillaje-peinado-maquillaje-eventos-pilar-palomares.webp"
        },
        {
            id: "madrinas",
            icon: <Sparkles size={32} />,
            image: "/images/eventos/madrinas-estilismo-evento-peinado-maquillaje-eventos-pilar-palomares.webp"
        },
        {
            id: "comuniones",
            icon: <Heart size={32} />,
            image: "/images/eventos/comuniones-peinado-infantil-peinado-maquillaje-eventos-pilar-palomares.webp"
        }
    ];

    return (
        <div ref={mainRef} className="bg-offwhite min-h-screen">
            <SEO 
                title={t('seo.title')}
                canonical="/eventos"
                description={t('seo.description')}
                keywords={[
                    "peluqueria novias malaga",
                    "peinados para eventos rincon de la victoria",
                    "maquillaje novias torre de benagalbon",
                    "recogidos de boda anoreta",
                    "estilistas novias chilches",
                    "peinado bodas torre del mar",
                    "maquillaje profesional velez malaga",
                    "recogidos de novia nerja"
                ]}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "serviceType": "Peluquería y Maquillaje de Novias y Eventos",
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
                    "description": "Estilismos capilares, recogidos, peinados de autor y maquillaje profesional libre de tóxicos para novias, madrinas e invitadas de boda."
                }}
            />
            {/* Header */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 group">
                    <picture className="w-full h-full">
                        <source media="(max-width: 767px)" srcSet="/images/eventos/hero-eventos-movil-peinado-maquillaje-eventos-pilar-palomares.webp" />
                        <source media="(min-width: 768px) and (max-width: 1023px)" srcSet="/images/eventos/hero-eventos-tablet-peinado-maquillaje-eventos-pilar-palomares.webp" />
                        <source media="(min-width: 1024px)" srcSet="/images/eventos/hero-eventos-desktop-peinado-maquillaje-eventos-pilar-palomares.webp" />
                        <img 
                            src="/images/eventos/hero-eventos-desktop-peinado-maquillaje-eventos-pilar-palomares.webp" 
                            alt={t('hero.imgAlt')} 
                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-[5s]"
                        />
                    </picture>
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-1000"></div>
                </div>
                <div className="relative z-10 text-center px-6 fade-in max-w-4xl mx-auto">
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

            {/* Philosophy */}
            <section className="pt-32 pb-12 px-6 lg:px-20 bg-offwhite bg-noise relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-4xl mx-auto text-center fade-in relative z-10">
                    <span className="eyebrow-badge">{t('vision.eyebrow')}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate mb-10 leading-[1.1] uppercase">{t('vision.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('vision.title2')}</span></h2>
                    <p className="text-lg md:text-xl text-chocolate/80 leading-relaxed normal-case">
                        {t('vision.text')}
                    </p>
                </div>
            </section>

            {/* MAQUILLAJE SECTION */}
            <section className="py-24 px-6 lg:px-20 bg-offwhite bg-noise border-b border-chocolate/5 relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="w-full fade-in">
                        <span className="eyebrow-badge">{t('maquillaje.eyebrow')}</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate mb-8 leading-[1.1] uppercase">{t('maquillaje.title')}</h2>
                        
                        {/* Mobile/Tablet image immediately below the title */}
                        <div className="w-full md:w-3/4 md:mx-auto lg:hidden mb-8 group">
                            <div className="aspect-[4/3] md:aspect-video rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)] bg-chocolate/5">
                                <img 
                                    src="/images/eventos/maquillaje-profesional-evento-peinado-maquillaje-eventos-pilar-palomares.webp" 
                                    alt={t('maquillaje.imgAlt')} 
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000"
                                />
                            </div>
                        </div>

                        <p className="text-lg text-chocolate/80 leading-relaxed mb-10 normal-case">
                            {t('maquillaje.text')}
                        </p>
                        <div className="flex items-center space-x-4 text-chocolate opacity-60">
                            <Sparkles size={20} className="text-chocolate/60" />
                            <span className="text-base uppercase tracking-widest font-bold">{t('maquillaje.tagline')}</span>
                        </div>
                    </div>
                    <div className="hidden lg:block w-full fade-in group h-full">
                        <div className="h-full min-h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(60,47,47,0.12)] bg-chocolate/5">
                            <img 
                                src="/images/eventos/maquillaje-profesional-evento-peinado-maquillaje-eventos-pilar-palomares.webp" 
                                alt={t('maquillaje.imgAlt')} 
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="pt-24 pb-32 px-6 lg:px-20 bg-white bg-noise border-b border-chocolate/5 relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 fade-in">
                        <span className="eyebrow-badge">{t('services.eyebrow')}</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate leading-[1.1] uppercase">{t('services.title1')} <br /> <span className="text-accent-aqua">{t('services.title2')}</span></h2>
                        <div className="w-16 h-[1px] bg-accent-aqua mx-auto mt-8"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {services.map((s, idx) => (
                        <div key={idx} className="liquid-glass bg-offwhite bg-noise fade-in group text-center flex flex-col overflow-hidden h-full rounded-[2rem]">
                            <div className="w-full h-96 overflow-hidden shrink-0">
                                <img 
                                    src={s.image} 
                                    alt={t(`services.${s.id}.imgAlt`)} 
                                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" 
                                />
                            </div>
                            <div className="p-10 flex-grow flex flex-col items-center">
                                <div className="w-16 h-16 rounded-2xl bg-peach/40 flex items-center justify-center text-chocolate/70 mb-6 group-hover:scale-110 transition-transform duration-500 shrink-0">
                                    {s.icon}
                                </div>
                                <div className="flex-grow flex flex-col justify-start">
                                    <h3 className="text-2xl font-serif text-chocolate mb-4 uppercase tracking-wide min-h-[64px] flex items-center justify-center leading-[1.1]">{t(`services.${s.id}.title`)}</h3>
                                    <p className="text-base text-chocolate/80 leading-relaxed mb-0 normal-case flex items-start justify-center">{t(`services.${s.id}.desc`)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </section>

            {/* Important Info */}
            <section className="py-24 px-6 lg:px-20 bg-offwhite bg-noise relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="liquid-glass max-w-7xl mx-auto bg-cream/60 p-12 md:p-24 text-chocolate relative overflow-hidden fade-in border border-peach/40 shadow-[0_30px_60px_-15px_rgba(60,47,47,0.25)] rounded-[3rem] z-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col justify-center text-left md:text-left">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-chocolate mb-8 leading-[1.1] uppercase">{t('info.title1')} <br /> <span className="text-accent-aqua">{t('info.title2')}</span></h2>
                            <p className="text-lg text-chocolate/80 leading-relaxed normal-case">
                                {t('info.text')}
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center uppercase mt-8 md:mt-0">
                            <div className="w-full text-center p-10 bg-white/70 backdrop-blur-md rounded-[40px] border border-peach/40 shadow-sm">
                                <h3 className="text-xs uppercase tracking-widest mb-2 opacity-60 font-bold text-chocolate">{t('info.cardEyebrow')}</h3>
                                <p className="text-2xl md:text-3xl font-serif text-chocolate mb-6">{t('info.cardTitle')}</p>
                                <Button
                                    to="/reserva"
                                    variant="coral"
                                    icon={ArrowRight}
                                    className="spring-bounce mt-4"
                                >
                                     {t('info.cta')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Eventos;
