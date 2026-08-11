// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLang } from '../langContext';
import { registerNS } from '../i18n';
import Button from '../components/Button';
import SEO from '../components/SEO';
import nsEs from '../locales/contacto/es.json';
import nsEn from '../locales/contacto/en.json';
import nsDe from '../locales/contacto/de.json';
import nsFr from '../locales/contacto/fr.json';

registerNS('contacto', { es: nsEs, en: nsEn, de: nsDe, fr: nsFr });

gsap.registerPlugin(ScrollTrigger);

const WhatsAppIcon = ({ size = 24, className = "" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
);

const TikTokIcon = ({ size = 24, className = "" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
    >
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
    </svg>
);

const Contacto = () => {
    const { t } = useTranslation('contacto');
    const { lp } = useLang();
    const mainRef = useRef(null);
    const [showInteractiveMap, setShowInteractiveMap] = React.useState(false);

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

    return (
        <div ref={mainRef} className="bg-offwhite bg-noise min-h-screen font-sans text-chocolate uppercase pb-32 relative">
            <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
            <SEO 
                title={t('seo.title')}
                canonical="/contacto"
                description={t('seo.description')}
                keywords={[
                    "contacto peluqueria pilar palomares",
                    "cita previa secretos del agua malaga",
                    "peluqueria rincon de la victoria",
                    "peluqueria torre de benagalbon",
                    "peluqueria anoreta",
                    "peluqueria chilches",
                    "peluqueria benagalbon",
                    "peluqueria la caleta",
                    "peluqueria torre del mar",
                    "peluqueria nerja",
                    "peluqueria velez malaga"
                ]}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Contacto y Cita Previa - Salón Pilar Palomares",
                    "description": "Contacto y cita previa en Salón Pilar Palomares, peluquería orgánica y bioterapias de Secretos del Agua en Torre de Benagalbón, Rincón de la Victoria. Área de influencia: Añoreta, Chilches, Vélez Málaga, Torre del Mar y Nerja.",
                    "url": "https://salonpilarpalomares.com/contacto",
                    "mainEntity": {
                        "@type": "BeautySalon",
                        "name": "Salón Pilar Palomares",
                        "image": "https://salonpilarpalomares.com/images/fachada-salon-pilar-palomares-peluqueria-organica-malaga.webp",
                        "telephone": "+34952972134",
                        "email": "salonestilistapilar@gmail.com",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "C/ Axarquía 21, Local 3",
                            "addressLocality": "Torre de Benagalbón",
                            "addressRegion": "Málaga",
                            "postalCode": "29738",
                            "addressCountry": "ES"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 36.7128115,
                            "longitude": -4.2426636
                        },
                        "openingHoursSpecification": [
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": ["Monday", "Saturday"],
                                "opens": "09:00",
                                "closes": "13:30"
                            },
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"],
                                "opens": "09:00",
                                "closes": "18:00"
                            }
                        ]
                    }
                }}
            />

            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden hero-section mb-20">
                <div className="absolute inset-0 z-0 group">
                    <picture>
                        <source 
                            media="(max-width: 768px)" 
                            srcSet="/images/fachada-salon-pilar-palomares-peluqueria-organica-malaga.webp" 
                        />
                        <img
                            src="/images/fachada-salon-pilar-palomares-peluqueria-organica-malaga.webp"
                            alt={t('hero.imgAlt')}
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[3s]"
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
                        {t('hero.desc')}
                    </p>
                </div>
            </section>

            {/* Header / Map Section */}
            <section className="px-6 lg:px-20 mb-20 reveal-section">
                <div className="max-w-7xl mx-auto">
                    {/* Title & Eyebrow at the top */}
                    <div className="mb-12 md:mb-16 reveal-item text-center lg:text-left">
                        <span className="eyebrow-badge">{t('loc.eyebrow')}</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1]">{t('loc.title1')} <br className="hidden md:block" /> <span className="text-accent-aqua">{t('loc.title2')}</span></h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        {/* Contact Info Column */}
                        <div className="lg:col-span-7 space-y-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal-item normal-case">
                                {/* Dirección */}
                                <div className="p-6 bg-white rounded-3xl border border-chocolate/10 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all duration-500">
                                    <div className="p-3 bg-peach/20 rounded-full text-accent-aqua group-hover:scale-110 transition-transform duration-500 mb-4">
                                        <MapPin size={24} />
                                    </div>
                                    <h2 className="text-xs uppercase tracking-widest font-bold text-chocolate mb-2 opacity-50">{t('cards.addressTitle')}</h2>
                                    <p className="text-base text-chocolate/80 leading-relaxed font-sans whitespace-pre-line mb-4">
                                        {t('cards.addressText')}
                                    </p>
                                    <a
                                        href="https://www.google.com/maps/dir/?api=1&destination=36.7128115,-4.2426636"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-accent-aqua/10 hover:bg-accent-aqua hover:text-white text-chocolate text-[11px] font-bold tracking-wider uppercase transition-all duration-300 shadow-sm mt-auto"
                                    >
                                        <MapPin size={14} className="shrink-0" />
                                        <span>Cómo llegar</span>
                                    </a>
                                </div>

                                {/* Teléfono */}
                                <div className="p-6 bg-white rounded-3xl border border-chocolate/10 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all duration-500">
                                    <div className="p-3 bg-peach/20 rounded-full text-accent-aqua group-hover:scale-110 transition-transform duration-500 mb-4">
                                        <Phone size={24} />
                                    </div>
                                    <h2 className="text-xs uppercase tracking-widest font-bold text-chocolate mb-2 opacity-50">{t('cards.phoneTitle')}</h2>
                                    <p className="text-base text-chocolate/80 leading-relaxed font-sans mb-4">+34 952 97 21 34</p>
                                    <Button
                                        href="https://wa.me/34642275906?text=Hola,%20me%20gustaría%20solicitar%20un%20diagnóstico%20o%20cita%20en%20el%20salón."
                                        variant="coral"
                                        size="sm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        icon={WhatsAppIcon}
                                        className="mx-auto"
                                    >
                                        {t('cards.phoneBtn')}
                                    </Button>
                                </div>

                                {/* Email */}
                                <div className="p-6 bg-white rounded-3xl border border-chocolate/10 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all duration-500">
                                    <div className="p-3 bg-peach/20 rounded-full text-accent-aqua group-hover:scale-110 transition-transform duration-500 mb-4">
                                        <Mail size={24} />
                                    </div>
                                    <h2 className="text-xs uppercase tracking-widest font-bold text-chocolate mb-2 opacity-50">{t('cards.emailTitle')}</h2>
                                    <p className="text-base text-chocolate/80 font-medium underline underline-offset-4 decoration-chocolate/20 break-all select-all font-sans">
                                        salonestilistapilar@gmail.com
                                    </p>
                                </div>

                                {/* Horarios */}
                                <div className="p-6 bg-white rounded-3xl border border-chocolate/10 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all duration-500 w-full">
                                    <div className="p-3 bg-peach/20 rounded-full text-accent-aqua group-hover:scale-110 transition-transform duration-500 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    </div>
                                    <h2 className="text-xs uppercase tracking-widest font-bold text-chocolate mb-2 opacity-50">{t('cards.hoursTitle')}</h2>
                                    <div className="w-full space-y-2 text-base text-chocolate/80 font-sans">
                                        <div className="flex justify-between gap-4 border-b border-chocolate/5 pb-1">
                                            <span className="font-medium text-chocolate/70">{t('cards.mondaySat')}</span>
                                            <span>9:00 – 13:30</span>
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <span className="font-medium text-chocolate/70">{t('cards.tueFri')}</span>
                                            <span>9:00 – 18:00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Column */}
                        <div className="lg:col-span-5 w-full aspect-video lg:aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl relative bg-sand/10 border border-chocolate/5 reveal-item group/map">
                            {showInteractiveMap ? (
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.8174542284954!2d-4.245238523727931!3d36.712811472271816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd725aaf30267c79%3A0x97d6e467b1a945e3!2sSal%C3%B3n%20de%20peluquer%C3%ADa%20y%20est%C3%A9tica%20Pilar%20Palomares%20Secretos%20del%20agua!5e0!3m2!1ses!2ses!4v1720543600000!5m2!1ses!2ses"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps - Salón Pilar Palomares"
                                    className="w-full h-full border-none"
                                ></iframe>
                            ) : (
                                <div 
                                    className="w-full h-full relative cursor-pointer"
                                    onClick={() => setShowInteractiveMap(true)}
                                >
                                    <img 
                                        src="/images/mapa.webp" 
                                        alt={t('map.imgAlt')}
                                        className="w-full h-full object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/map:scale-[1.02]"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover/map:bg-black/5 transition-colors duration-500 flex items-center justify-center">
                                        <span className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full text-chocolate border border-sand/40 font-sans text-xs tracking-wider uppercase font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
                                            {t('map.activate')}
                                        </span>
                                    </div>
                                    <a 
                                        href="https://www.google.com/maps/place/Sal%C3%B3n+de+peluquer%C3%ADa+y+est%C3%A9tica+Pilar+Palomares+Secretos+del+agua/@36.7128115,-4.2426636,955m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd725aaf30267c79:0x97d6e467b1a945e3!8m2!3d36.7128115!4d-4.2426636!16s%2Fg%2F11c6q7hlbm?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="absolute bottom-6 right-6 z-10 shadow-lg bg-white/90 border border-sand/30 text-chocolate hover:text-accent-aqua backdrop-blur-sm rounded-full px-5 py-2.5 min-h-[40px] text-[10px] uppercase font-semibold tracking-wider transition-all duration-300 flex items-center gap-1.5"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <MapPin size={14} className="shrink-0" />
                                        {t('map.btn')}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 lg:px-20 relative z-10 reveal-section">
                <div className="liquid-glass max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 bg-white rounded-[4rem] p-8 md:p-16 shadow-lg border border-chocolate/5 overflow-hidden reveal-item relative z-10">
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-8 uppercase text-chocolate leading-[1.1]">{t('boutique.title1')} <br /> <span className="text-accent-aqua">{t('boutique.title2')}</span></h2>
                        
                        {/* Mobile/Tablet image immediately below the title */}
                        <div className="w-full lg:hidden aspect-[16/9] double-bezel-wrapper mb-8">
                            <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                                <img 
                                    src="/images/entrada-salon-pilar-palomares-torre-benagalbon.webp" 
                                    alt={t('boutique.imgAlt')} 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                                />
                            </div>
                        </div>

                        <p className="text-lg text-chocolate/80 leading-relaxed mb-10 normal-case">
                            {t('boutique.desc')}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-8 mb-10 md:mb-0">
                            <Button
                                to={lp("/reserva")}
                                variant="coral"
                                className="w-full sm:w-auto shadow-xl"
                            >
                                {t('boutique.btn')}
                            </Button>
                            <div className="flex items-center space-x-6 font-normal">
                                <a href="https://www.instagram.com/salonpilarpalomares/" target="_blank" rel="noopener noreferrer" className="text-chocolate/40 hover:text-accent-aqua transition-colors focus-visible:ring-2 focus-visible:ring-accent-aqua rounded-full p-1 outline-none"><Instagram size={24} /></a>
                                <a href="https://www.facebook.com/Salonpilarpalomares" target="_blank" rel="noopener noreferrer" className="text-chocolate/40 hover:text-accent-aqua transition-colors focus-visible:ring-2 focus-visible:ring-accent-aqua rounded-full p-1 outline-none"><Facebook size={24} /></a>
                                <a href="https://www.tiktok.com/@salon.pilarpalomares" target="_blank" rel="noopener noreferrer" className="text-chocolate/40 hover:text-accent-aqua transition-colors focus-visible:ring-2 focus-visible:ring-accent-aqua rounded-full p-1 outline-none"><TikTokIcon size={24} /></a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block w-full lg:w-1/2 aspect-[16/9] double-bezel-wrapper">
                        <div className="w-full h-full double-bezel-inner overflow-hidden relative">
                            <img 
                                src="/images/entrada-salon-pilar-palomares-torre-benagalbon.webp" 
                                alt={t('boutique.imgAlt')} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contacto;
