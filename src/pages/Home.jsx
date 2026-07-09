import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, FlaskConicalOff, Heart, Sparkles, ShieldCheck, ArrowRight, Waves, Star, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { registerNS } from '../i18n';
import Button from '../components/Button';
import { useLang } from '../langContext';
import TestimonialCarousel from '../components/TestimonialCarousel';
import HeroCarousel from '../components/HeroCarousel';
import SEO from '../components/SEO';
import Sello from '../components/Sello';
import homeEs from '../locales/home/es.json';
import homeEn from '../locales/home/en.json';
import homeDe from '../locales/home/de.json';
import homeFr from '../locales/home/fr.json';

registerNS('home', { es: homeEs, en: homeEn, de: homeDe, fr: homeFr });

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const { t } = useTranslation('home');
    const { lang } = useLang();
    const heroRef = useRef(null);
    const sectionsRef = useRef([]);
    const [isMobile, setIsMobile] = React.useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // gsap.context agrupa todo lo creado aquí y permite revertirlo de golpe
        // al desmontar, sin matar triggers de otros componentes montados.
        const ctx = gsap.context(() => {
        try {
        // Hero Animation
        if (heroRef.current) {
            gsap.fromTo(heroRef.current.querySelector('.hero-content'),
                { opacity: 0, y: 80, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.8, ease: 'power4.out', delay: 0.3 }
            );
        }

        // Section Entrance Animations (Choreographed Timelines)
        sectionsRef.current.forEach((section) => {
            if (!section) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            const eyebrows = section.querySelectorAll('.reveal-eyebrow');
            const titles = section.querySelectorAll('.reveal-title');
            const images = section.querySelectorAll('.reveal-image');
            const texts = section.querySelectorAll('.reveal-text');
            const items = section.querySelectorAll('.reveal-item');

            let delayOffset = 0;

            if (eyebrows.length > 0) {
                tl.fromTo(eyebrows, 
                    { opacity: 0, y: 30, filter: 'blur(3px)' },
                    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
                );
                delayOffset = 0.6;
            }

            if (titles.length > 0) {
                tl.fromTo(titles,
                    { opacity: 0, y: 40, filter: 'blur(5px)' },
                    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, ease: 'power3.out' },
                    `-=${delayOffset}`
                );
                delayOffset = 0.8;
            }

            if (images.length > 0) {
                tl.fromTo(images,
                    { opacity: 0, scale: 0.96, y: 30, filter: 'blur(5px)' },
                    { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' },
                    `-=${delayOffset}`
                );
                delayOffset = 0.8;
            }

            if (texts.length > 0) {
                tl.fromTo(texts,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
                    `-=${delayOffset}`
                );
                delayOffset = 0.8;
            }

            if (items.length > 0) {
                tl.fromTo(items,
                    { opacity: 0, y: 30, filter: 'blur(3px)' },
                    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, ease: 'power3.out', stagger: 0.15 },
                    `-=${delayOffset}`
                );
            }
        });

        // Parallax effects for main images
        const parallaxImages = document.querySelectorAll('.parallax-img');
        parallaxImages.forEach(img => {
            gsap.to(img, {
                y: '15%',
                ease: 'none',
                scrollTrigger: {
                    trigger: img.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
        } catch {
            // Si GSAP falla, la red de seguridad de scrollReveal.js
            // rescata los elementos ocultos; no propagamos el error.
        }
        });

        const timer = setTimeout(() => {
            try {
                ScrollTrigger.refresh();
            } catch { /* nunca romper la página por un refresh fallido */ }
        }, 1000);

        return () => {
            clearTimeout(timer);
            ctx.revert();
        };
    }, []);

    // Refresh ScrollTrigger when isMobile changes (layout shift)
    useEffect(() => {
        setTimeout(() => ScrollTrigger.refresh(), 200);
    }, [isMobile]);

    const services = [
        {
            title: t('services.color.title'),
            desc: t('services.color.desc'),
            link: "/cultura-de-color",
            image: "/images/color/coloracion-organica-hero-pilar-palomares.webp",
            objectPos: "object-center"
        },
        {
            title: t('services.bioterapias.title'),
            desc: t('services.bioterapias.desc'),
            link: "/bioterapias",
            image: "/images/home/bioterapia-facial-servicio-pilar-palomares.webp",
            objectPos: "object-center"
        },
        {
            title: t('services.peluqueria.title'),
            desc: t('services.peluqueria.desc'),
            link: "/cultura-de-la-forma",
            image: "/images/home/peluqueria-organica-pilar-palomares.webp",
            objectPos: "object-center"
        },
        {
            title: t('services.estetica.title'),
            desc: t('services.estetica.desc'),
            link: "/estetica",
            image: "/images/home/estetica-consciente-servicio-pilar-palomares.webp",
            objectPos: "object-center"
        }
    ];

    const testimonials = [
        {
            name: "Maria Zambrana",
            text: t('testimonials.items.maria.text'),
            source: "Google Reviews",
            rating: 5,
            photo: "/images/testimonios/maria-profile-pilar-palomares.webp",
            attached_photos: [
                "/images/testimonios/maria-pilar-palomares.webp",
                "/images/testimonios/maria-pilar-palomares.webp",
                "/images/testimonios/maria-pilar-palomares.webp",
                "/images/testimonios/maria-pilar-palomares.webp"
            ],
            badge: t('testimonials.items.maria.badge')
        },
        {
            name: "Emma",
            text: t('testimonials.items.emma.text'),
            source: "Google Reviews",
            rating: 5,
            photo: null,
            badge: t('testimonials.items.emma.badge')
        },
        {
            name: "Gloria Ansede",
            text: t('testimonials.items.gloria.text'),
            source: "Google Reviews",
            rating: 5,
            photo: "/images/testimonios/gloria-profile-pilar-palomares.webp",
            attached_photos: [
                "/images/testimonios/gloria-pilar-palomares.webp"
            ],
            badge: t('testimonials.items.gloria.badge')
        },
        {
            name: "Jennifer Moreno Guerrero",
            text: t('testimonials.items.jennifer.text'),
            source: "Google Reviews",
            rating: 5,
            photo: "/images/testimonios/jennifer-profile-pilar-palomares.webp",
            attached_photos: [
                "/images/testimonios/jennifer-pilar-palomares.webp",
                "/images/testimonios/jennifer-pilar-palomares.webp"
            ],
            badge: t('testimonials.items.jennifer.badge')
        },
        {
            name: "Luisa Jolin",
            text: t('testimonials.items.luisa.text'),
            source: "Google Reviews",
            rating: 5,
            photo: "/images/testimonios/luisa-profile-pilar-palomares.webp",
            attached_photos: [
                "/images/testimonios/luisa-pilar-palomares.webp",
                "/images/testimonios/luisa-pilar-palomares.webp"
            ],
            badge: t('testimonials.items.luisa.badge')
        },
        {
            name: "Francisco Jesús González Ruiz",
            text: t('testimonials.items.francisco.text'),
            source: "Google Reviews",
            rating: 5,
            photo: "/images/testimonios/photo4-pilar-palomares.webp",
            badge: t('testimonials.items.francisco.badge')
        },
        {
            name: "Begoña Riera",
            text: t('testimonials.items.begona.text'),
            source: "Google Reviews",
            rating: 5,
            photo: "/images/testimonios/photo5-pilar-palomares.webp",
            attached_photos: [
                "/images/testimonios/emma-pilar-palomares.webp"
            ],
            badge: t('testimonials.items.begona.badge')
        }
    ];

    const filteredTestimonials = isMobile 
        ? testimonials.filter(t => !t.desktopOnly)
        : testimonials;

    return (
        <div className="overflow-hidden">
            <SEO
                title={t('seo.title')}
                canonical="/"
                description={t('seo.description')}
                keywords={[
                    "peluqueria organica malaga",
                    "bioterapias capilares secretos del agua rincon de la victoria",
                    "salon de belleza torre de benagalbon",
                    "estilistas secretos del agua velez malaga",
                    "coloracion de barro capilar torre del mar",
                    "corte de pelo organico nerja",
                    "peluqueria anoreta",
                    "tratamientos faciales chilches",
                    "estetica natural benagalbon",
                    "la caleta de velez",
                    "belleza consciente malaga"
                ]}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "HairSalon",
                    "@id": "https://salonpilarpalomares.es/#salon",
                    "name": "Salón Pilar Palomares",
                    "image": "https://salonpilarpalomares.es/images/fachada-salon-pilar-palomares-peluqueria-organica-malaga.webp",
                    "url": "https://salonpilarpalomares.es",
                    "telephone": "+34952972134",
                    "priceRange": "$$",
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
                    ],
                    "areaServed": [
                        { "@type": "AdministrativeArea", "name": "Torre de Benagalbón" },
                        { "@type": "AdministrativeArea", "name": "Rincón de la Victoria" },
                        { "@type": "AdministrativeArea", "name": "Añoreta" },
                        { "@type": "AdministrativeArea", "name": "Chilches" },
                        { "@type": "AdministrativeArea", "name": "Benagalbón" },
                        { "@type": "AdministrativeArea", "name": "La Cala del Moral" },
                        { "@type": "AdministrativeArea", "name": "Vélez Málaga" },
                        { "@type": "AdministrativeArea", "name": "Torre del Mar" },
                        { "@type": "AdministrativeArea", "name": "Nerja" },
                        { "@type": "AdministrativeArea", "name": "La Caleta de Vélez" },
                        { "@type": "AdministrativeArea", "name": "Málaga" },
                        { "@type": "AdministrativeArea", "name": "Axarquía" }
                    ],
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.6",
                        "reviewCount": "300"
                    },
                    "sameAs": [
                        "https://www.instagram.com/salon_pilar_palomares/",
                        "https://www.facebook.com/Salonpilarpalomares",
                        "https://www.tiktok.com/@salon.pilarpalomares"
                    ]
                }}
            />
            {/* HERO SECTION */}
            <section id="hero" ref={heroRef} className="relative min-h-[100dvh] flex items-center justify-center text-center px-6 py-24">
                <HeroCarousel />
                {/* Soft radial gradient to support text readability without darkening the overall images */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(60,47,47,0.35)_0%,rgba(60,47,47,0)_70%)] z-[1] pointer-events-none"></div>
                
                {/* Floating location status - Bottom Right (opposite of top left) */}
                <div className="absolute bottom-10 right-6 md:right-12 lg:right-20 z-10 flex items-center gap-2 select-none pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-aqua animate-pulse shadow-[0_0_8px_rgba(133,183,178,0.8)]"></span>
                    <span className="text-[10px] md:text-xs tracking-[0.2em] font-sans font-semibold uppercase text-white/50">
                        {lang === 'en' ? 'LIVE SALON - TORRE DE BENAGALBÓN' :
                         lang === 'de' ? 'SALON LIVE - TORRE DE BENAGALBÓN' :
                         lang === 'fr' ? 'SALON EN DIRECT - TORRE DE BENAGALBÓN' :
                         'SALÓN EN VIVO - TORRE DE BENAGALBÓN'}
                    </span>
                </div>

                <div className="relative z-10 hero-content max-w-7xl mx-auto text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.7),_0_1px_3px_rgba(0,0,0,0.95)]">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-aqua/15 border border-accent-aqua/30 text-accent-aqua text-[10px] md:text-xs tracking-[0.25em] font-sans font-bold uppercase mb-8 backdrop-blur-sm shadow-sm select-none">
                        {t('hero.eyebrow')}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.2] uppercase tracking-tight text-white drop-shadow-lg">
                        {lang === 'en' ? (
                            <>WHERE WATER <br /><span className="text-accent-aqua">AND EARTH</span> <br />MEET</>
                        ) : lang === 'de' ? (
                            <>WO WASSER <br /><span className="text-accent-aqua">UND ERDE</span> <br />SICH BEGEGNEN</>
                        ) : lang === 'fr' ? (
                            <>OÙ L'EAU <br /><span className="text-accent-aqua">ET LA TERRE</span> <br />SE RENCONTRENT</>
                        ) : (
                            <>DONDE EL AGUA <br /><span className="text-accent-aqua">Y LA TIERRA</span> <br />SE ENCUENTRAN</>
                        )}
                    </h1>
                    <p className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed normal-case mb-10">
                        {t('hero.text')}
                    </p>
                    <Button
                        to="/reserva"
                        variant="primary"
                        icon={ArrowRight}
                        className="mx-auto shadow-2xl spring-bounce"
                    >
                        {t('hero.cta')}
                    </Button>
                </div>
            </section>

            {/* MARQUEE */}
            <div className="marquee" aria-hidden="true">
                <div className="marquee__track">
                    <span>
                        {t('marquee.biotherapies')} <em>·</em> {t('marquee.biopolarWater')} <em>·</em> {t('marquee.brandName')} <em>·</em> {t('marquee.hairTreatments')} <em>·</em> {t('marquee.biotherapies')} <em>·</em> {t('marquee.biopolarWater')} <em>·</em> {t('marquee.brandName')} <em>·</em> {t('marquee.hairTreatments')} <em>·</em>
                    </span>
                    <span>
                        {t('marquee.biotherapies')} <em>·</em> {t('marquee.biopolarWater')} <em>·</em> {t('marquee.brandName')} <em>·</em> {t('marquee.hairTreatments')} <em>·</em> {t('marquee.biotherapies')} <em>·</em> {t('marquee.biopolarWater')} <em>·</em> {t('marquee.brandName')} <em>·</em> {t('marquee.hairTreatments')} <em>·</em>
                    </span>
                </div>
            </div>

            {/* DIAGNOSIS SECTION */}
            <section ref={el => sectionsRef.current[0] = el} className="pt-[51px] pb-[51px] md:pt-[115px] md:pb-[115px] px-6 lg:px-20 bg-cream group relative overflow-hidden bg-noise">
                <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-x-8 lg:gap-x-16 xl:gap-x-24 gap-y-10 items-center uppercase text-center md:text-left relative z-10">
                    {/* Image Part - Desktop Only */}
                    <div className="reveal-image hidden md:block w-full md:self-center double-bezel-wrapper">
                        <div className="w-full aspect-square md:aspect-[3/4] overflow-hidden double-bezel-inner group">
                            <picture>
                                <source media="(min-width: 1024px)" srcSet="/images/home/diagnostico-capilar-desktop.webp" />
                                <source media="(min-width: 768px)" srcSet="/images/home/diagnostico-capilar-tablet.webp" />
                                <img 
                                    src="/images/home/diagnostico-capilar-pilar-palomares.webp" 
                                    alt={t('diagnosis.imgAlt')} 
                                    loading="lazy"
                                    className="parallax-img w-full h-[120%] object-cover object-center group-hover:scale-[1.03] transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] scale-[1.05] -translate-y-[10%]"
                                />
                            </picture>
                        </div>
                    </div>

                    {/* Text Column (Vertically Centered) */}
                    <div className="order-1 md:order-2 w-full flex flex-col items-center md:items-start text-center md:text-left justify-center">
                        <h2 className="reveal-eyebrow eyebrow-badge">{t('diagnosis.eyebrow')}</h2>
                        <h2 className="reveal-title text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-6 md:mb-10 leading-[1.1] tracking-tight uppercase text-chocolate">{t('diagnosis.title1')}<br/><span className="text-accent-aqua">{t('diagnosis.title2')}</span></h2>
                        
                        {/* Mobile-only Image (rendered immediately after Title on mobile) */}
                        <div className="reveal-image block md:hidden w-full mb-8 double-bezel-wrapper">
                            <div className="w-full aspect-[4/3] overflow-hidden double-bezel-inner">
                                <img 
                                    src="/images/home/diagnostico-capilar-pilar-palomares.webp" 
                                    alt={t('diagnosis.imgAlt')} 
                                    loading="lazy"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        </div>

                        <p className="reveal-text text-lg md:text-xl text-chocolate/70 leading-relaxed mb-10 normal-case font-sans max-w-lg">
                            {t('diagnosis.text')}
                        </p>
                        <div className="reveal-item w-full flex justify-center md:justify-start">
                            <Button
                                to="/reserva"
                                variant="coral"
                                className="shadow-xl hover:shadow-2xl spring-bounce"
                            >
                                {t('diagnosis.cta')}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* BIENESTAR INTEGRAL SECTION */}
            <section ref={el => sectionsRef.current[1] = el} className="pt-24 pb-24 md:pt-40 md:pb-40 px-6 lg:px-20 bg-white relative overflow-hidden bg-noise">
                <div className="max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-x-16 items-center">
                    {/* Image Part - Desktop Only */}
                    <div className="reveal-image hidden md:block w-full md:self-center double-bezel-wrapper">
                        <div className="w-full aspect-[4/5] overflow-hidden double-bezel-inner group relative">
                            <img 
                                src="/images/home/bienestar-integral-agua-biopolar-pilar-palomares.webp" 
                                alt={t('bienestar.imgAlt')} 
                                loading="lazy"
                                className="parallax-img w-full h-[120%] object-cover object-top group-hover:scale-[1.03] transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] scale-[1.05] -translate-y-[10%]"
                            />
                            {/* Sello Agua y Tierra - Desktop (Inside image, bottom-left over water) */}
                            <div className="absolute bottom-6 left-6 w-20 h-20 lg:w-24 lg:h-24 z-20 hover:scale-110 hover:rotate-12 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_4px_12px_rgba(60,47,47,0.08)]">
                                <Sello name="agua-tierra" className="text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Text and Icons Column (Vertically Centered) */}
                    <div className="order-1 md:order-2 w-full flex flex-col items-center md:items-start justify-center text-center md:text-left space-y-6">
                        <div className="w-full">
                            <h2 className="reveal-eyebrow eyebrow-badge">{t('bienestar.eyebrow')}</h2>
                            <h2 className="reveal-title text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-6 leading-[1.1] uppercase text-chocolate">{t('bienestar.title1')}<br/><span className="text-accent-aqua">{t('bienestar.title2')}</span></h2>
                        </div>

                        {/* Mobile-only Image (rendered immediately after Title on mobile) */}
                        <div className="reveal-image block md:hidden w-full mb-8 double-bezel-wrapper">
                            <div className="w-full aspect-[4/3] overflow-hidden double-bezel-inner relative">
                                <img 
                                    src="/images/home/bienestar-integral-agua-biopolar-pilar-palomares.webp" 
                                    alt={t('bienestar.imgAlt')} 
                                    loading="lazy"
                                    className="w-full h-full object-cover object-center"
                                />
                                {/* Sello Agua y Tierra - Mobile (Inside image, bottom-left over water) */}
                                <div className="absolute bottom-4 left-4 w-16 h-16 z-20 drop-shadow-[0_4px_8px_rgba(60,47,47,0.08)]">
                                    <Sello name="agua-tierra" className="text-white" />
                                </div>
                            </div>
                        </div>

                        <p className="reveal-text text-lg md:text-xl text-chocolate/70 leading-relaxed font-sans normal-case mb-10 max-w-lg mx-auto md:mx-0">
                            {t('bienestar.text')}
                        </p>
                        
                        {/* INTEGRATED ICONS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center pt-6 w-full">
                            <div className="reveal-item flex flex-col items-center group text-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 mb-3 transition-all duration-500 transform group-hover:scale-105">
                                    <Sello name="sin-quimicos" className="text-chocolate/70 group-hover:text-accent-aqua transition-colors duration-500" />
                                </div>
                                <h3 className="font-serif text-base md:text-lg text-chocolate/90 leading-tight mb-1">{t('bienestar.icon1Title')}</h3>
                                <p className="text-[9px] md:text-[10px] tracking-[0.15em] text-accent-aqua font-bold uppercase leading-none">{t('bienestar.icon1Tag')}</p>
                            </div>
                            <div className="reveal-item flex flex-col items-center group text-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 mb-3 transition-all duration-500 transform group-hover:scale-105" style={{transitionDelay: "50ms"}}>
                                    <Sello name="botanica" className="text-chocolate/70 group-hover:text-accent-aqua transition-colors duration-500" />
                                </div>
                                <h3 className="font-serif text-base md:text-lg text-chocolate/90 leading-tight mb-1">{t('bienestar.icon2Title')}</h3>
                                <p className="text-[9px] md:text-[10px] tracking-[0.15em] text-accent-aqua font-bold uppercase leading-none">{t('bienestar.icon2Tag')}</p>
                            </div>
                            <div className="reveal-item flex flex-col items-center group text-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 mb-3 transition-all duration-500 transform group-hover:scale-105" style={{transitionDelay: "100ms"}}>
                                    <Sello name="agua-biopolar" className="text-chocolate/70 group-hover:text-accent-aqua transition-colors duration-500" />
                                </div>
                                <h3 className="font-serif text-base md:text-lg text-chocolate/90 leading-tight mb-1">{t('bienestar.icon3Title')}</h3>
                                <p className="text-[9px] md:text-[10px] tracking-[0.15em] text-accent-aqua font-bold uppercase leading-none">{t('bienestar.icon3Tag')}</p>
                            </div>
                            <div className="reveal-item flex flex-col items-center group text-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 mb-3 transition-all duration-500 transform group-hover:scale-105" style={{transitionDelay: "150ms"}}>
                                    <Sello name="holistico" className="text-chocolate/70 group-hover:text-accent-aqua transition-colors duration-500" />
                                </div>
                                <h3 className="font-serif text-base md:text-lg text-chocolate/90 leading-tight mb-1">{t('bienestar.icon4Title')}</h3>
                                <p className="text-[9px] md:text-[10px] tracking-[0.15em] text-accent-aqua font-bold uppercase leading-none">{t('bienestar.icon4Tag')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED SERVICES */}
            <section id="servicios" ref={el => sectionsRef.current[2] = el} className="pt-[76px] pb-[76px] md:pt-[140px] md:pb-[140px] px-6 lg:px-20 bg-cream relative overflow-hidden bg-noise">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="reveal-eyebrow eyebrow-badge">{t('services.eyebrow')}</h2>
                        <h2 className="reveal-title text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif uppercase text-chocolate leading-[1.1]">{t('services.title1')}<br/><span className="text-accent-aqua">{t('services.title2')}</span></h2>
                    </div>
                    
                    {/* Uniform 2x2 Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {services.map((service, index) => (
                            <div key={index} className="liquid-glass hover:shadow-[0_40px_80px_-20px_rgba(60,47,47,0.2)] transition-all duration-700 hover:-translate-y-2 group flex flex-col h-full relative overflow-hidden reveal-item"
                                style={{transitionDelay: `${index * 100}ms`}}
                            >
                                <div className="overflow-hidden relative order-1 aspect-[4/3]">
                                    <img 
                                        src={service.image} 
                                        alt={service.title} 
                                        loading="lazy"
                                        className={`w-full h-full object-cover ${service.objectPos || 'object-top'} group-hover:scale-110 transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)]`} 
                                    />
                                    <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors duration-500"></div>
                                    
                                    {/* Title Tag Overlay */}
                                    <div className="absolute top-4 left-4 md:top-6 md:left-6 flex justify-start">
                                        <div className="bg-accent-aqua/15 backdrop-blur-xl px-4 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl border border-accent-aqua/30 shadow-sm transition-all duration-700 group-hover:bg-accent-aqua/25 group-hover:scale-105 group-hover:shadow-xl">
                                            <h3 className="font-serif text-[11px] sm:text-xs md:text-base lg:text-lg text-accent-aqua uppercase tracking-[0.15em] leading-tight">{service.title}</h3>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-8 md:p-10 flex flex-col flex-grow bg-white/40 order-2">
                                    <p className="text-base text-chocolate/80 mb-10 leading-relaxed font-sans normal-case">
                                        {service.desc}
                                    </p>
                                    <div className="mt-auto">
                                        <Button
                                            to={service.link}
                                            variant="primary"
                                            size="sm"
                                            icon={ArrowRight}
                                            className="w-fit shadow-xl spring-bounce"
                                        >
                                            {t('services.cta')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EVENTOS & NOVIAS SECTION */}
            <section ref={el => sectionsRef.current[3] = el} className="pt-[76px] pb-32 md:pt-[140px] md:pb-40 px-6 lg:px-20 bg-white relative overflow-hidden bg-noise">
                <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-x-12 md:gap-x-24 gap-y-12 items-center">
                    {/* Text Column (Vertically Centered) */}
                    <div className="order-1 w-full flex flex-col items-center md:items-start text-center md:text-left justify-center space-y-8">
                        <div className="w-full">
                            <h2 className="reveal-eyebrow eyebrow-badge">{t('eventos.eyebrow')}</h2>
                            <h2 className="reveal-title text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif leading-[1.1] uppercase text-chocolate">
                                {t('eventos.title1')}<br/><span className="text-accent-aqua">{t('eventos.title2')}</span>
                            </h2>
                        </div>

                        {/* Mobile-only Image (rendered immediately after Title on mobile) */}
                        <div className="reveal-image block md:hidden w-full relative aspect-[3.5/5] max-w-[280px] mx-auto double-bezel-wrapper mb-24">
                            <div className="w-full h-full overflow-hidden double-bezel-inner">
                                <img 
                                    src="/images/home/novia-sombrero-pilar-palomares.webp" 
                                    alt={t('eventos.imgAlt')} 
                                    loading="lazy"
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            {/* Quote overlay card on mobile */}
                            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-20 bg-accent-aqua/80 backdrop-blur-md border border-white/20 shadow-2xl p-4 rounded-3xl w-[90vw] max-w-[240px]">
                                <div className="flex gap-2 items-start">
                                    <Quote className="text-white/90 flex-shrink-0" size={20} />
                                    <p className="text-sm md:text-base font-serif italic text-white leading-relaxed">
                                        {t('eventos.quote')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-20 h-px bg-chocolate/10 hidden md:block"></div>
                        <p className="reveal-text text-lg md:text-xl text-chocolate/70 leading-relaxed font-sans normal-case max-w-md mx-auto md:mx-0 pt-20 md:pt-0">
                            {t('eventos.text')}
                        </p>
                        <div className="reveal-item w-full flex justify-center md:justify-start">
                            <Button
                                onClick={() => window.scrollTo(0, 0)}
                                to="/eventos"
                                variant="primary"
                                icon={ArrowRight}
                                className="shadow-xl spring-bounce"
                            >
                                {t('eventos.cta')}
                            </Button>
                        </div>
                    </div>

                    {/* Image Column - Desktop Only */}
                    <div className="reveal-image hidden md:block relative w-full aspect-[3.5/5] md:aspect-[3/4] mx-auto md:ml-auto md:mr-0 max-w-[320px] md:max-w-md double-bezel-wrapper md:mb-0">
                        <div className="w-full h-full overflow-hidden relative z-10 group double-bezel-inner">
                            <img 
                                src="/images/home/novia-sombrero-pilar-palomares.webp" 
                                alt={t('eventos.imgAlt')} 
                                loading="lazy"
                                className="parallax-img w-full h-[120%] object-cover object-top group-hover:scale-[1.03] transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] scale-[1.05] -translate-y-[10%]"
                            />
                        </div>
                        
                        {/* Quote overlay card */}
                        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:-bottom-20 md:-left-8 lg:-left-24 z-20 bg-accent-aqua/80 backdrop-blur-md border border-white/20 shadow-2xl p-6 md:p-8 rounded-3xl w-[85vw] max-w-[300px] md:w-[350px] md:max-w-none transform hover:-translate-y-2 transition-transform duration-500 group reveal-item">
                            <div className="flex gap-4 items-start">
                                <Quote className="text-white/90 flex-shrink-0 group-hover:scale-110 transition-transform" size={28} />
                                <p className="text-sm md:text-base font-serif italic text-white leading-relaxed">
                                    {t('eventos.quote')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION - PREMIUM CAROUSEL */}
            <section ref={el => sectionsRef.current[4] = el} className="pt-[76px] pb-20 md:pt-[140px] md:pb-24 px-6 lg:px-20 bg-cream relative overflow-hidden bg-noise">
                <div className="max-w-[1400px] mx-auto relative z-10">
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="reveal-eyebrow eyebrow-badge">{t('testimonials.eyebrow')}</h2>
                        <h2 className="reveal-title text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif uppercase text-chocolate leading-[1.1]">{t('testimonials.title1')}<br/><span className="text-accent-aqua">{t('testimonials.title2')}</span></h2>
                        
                        {/* Google Rating Badge - Desktop */}
                        <div className="hidden lg:flex mt-12 justify-center items-center gap-6">
                            <div className="flex flex-col items-center">
                                <span className="text-6xl font-serif text-chocolate leading-none">4.6</span>
                                <div className="flex gap-1.5 text-[#EAB308] mt-5">
                                    <Star size={22} fill="currentColor" />
                                    <Star size={22} fill="currentColor" />
                                    <Star size={22} fill="currentColor" />
                                    <Star size={22} fill="currentColor" />
                                    <div className="relative">
                                        <Star size={22} className="text-chocolate/10" />
                                        <div className="absolute inset-0 overflow-hidden w-[60%]">
                                            <Star size={22} fill="currentColor" className="text-[#EAB308]" />
                                        </div>
                                    </div>
                                </div>
                                <span className="text-sm font-bold tracking-[0.4em] text-chocolate/40 uppercase mt-5">{t('testimonials.badge')}</span>
                            </div>
                        </div>

                        {/* Mobile Optimized Google Rating Badge */}
                        <div className="lg:hidden mt-10 flex flex-col items-center gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-serif text-chocolate leading-none">4.6</span>
                                <div className="flex gap-1 text-[#EAB308]">
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <Star size={16} fill="currentColor" />
                                    <div className="relative">
                                        <Star size={16} className="text-chocolate/10" />
                                        <div className="absolute inset-0 overflow-hidden w-[60%]">
                                            <Star size={16} fill="currentColor" className="text-[#EAB308]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs font-bold tracking-[0.3em] text-chocolate/50 uppercase">
                                {t('testimonials.badgeMobile')}
                            </span>
                        </div>
                    </div>
                    
                    <TestimonialCarousel testimonials={filteredTestimonials} />
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section ref={el => sectionsRef.current[5] = el} className="bg-white overflow-hidden pt-12 pb-0 md:pt-24 md:pb-0">
                <div className="max-w-7xl liquid-glass grid grid-cols-1 md:grid-cols-2 gap-0 items-center mx-4 lg:mx-auto">
                    {/* Content Section */}
                    <div className="py-16 md:py-24 px-8 md:px-16 lg:px-24 flex flex-col items-center md:items-start justify-center text-center md:text-left w-full">
                        <div className="w-full">
                            <h2 className="reveal-eyebrow eyebrow-badge">{t('cta.eyebrow')}</h2>
                            <h2 className="reveal-title text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif mb-8 uppercase leading-[1.1] text-chocolate">
                                {(() => {
                                    const titleText = t('cta.title') || '';
                                    const [t1, t2] = titleText.includes('|') ? titleText.split('|') : [titleText, ''];
                                    return (
                                        <>
                                            {t1.trim()} {t2 && <><br className="hidden md:block" /> <span className="text-accent-aqua">{t2.trim()}</span></>}
                                        </>
                                    );
                                })()}
                            </h2>
                        </div>
                        
                        {/* New Image for Mobile Only - Square and centered */}
                        <div className="reveal-image block md:hidden mb-12 mx-auto w-full max-w-sm aspect-square double-bezel-wrapper">
                            <div className="w-full h-full double-bezel-inner group">
                                <img 
                                    src="/images/chica-luz-pilar-palomares.webp" 
                                    alt={t('cta.imgAlt')} 
                                    className="w-full h-full object-cover object-center group-hover:scale-[1.05] transition-transform duration-[1500ms]"
                                />
                            </div>
                        </div>
                        
                        <p className="reveal-text text-lg md:text-xl text-chocolate/70 mb-12 leading-relaxed font-sans max-w-xl mx-auto md:mx-0 normal-case">
                            {t('cta.text')}
                        </p>

                        <div className="reveal-item flex flex-col sm:flex-row gap-5 md:gap-6 justify-center md:justify-start items-center md:items-start w-full">
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

                    {/* Image Section Desktop */}
                    <div className="reveal-image hidden md:flex p-6 md:p-12 h-full items-center justify-center">
                        <div className="w-full max-w-lg double-bezel-wrapper transform md:-translate-x-8">
                            <div className="w-full aspect-[4/5] overflow-hidden double-bezel-inner group">
                                <img 
                                    src="/images/chica-luz-pilar-palomares.webp" 
                                    alt={t('cta.imgAlt')} 
                                    className="w-full h-full object-cover object-[center_30%] group-hover:scale-[1.05] transition-transform duration-[1500ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
