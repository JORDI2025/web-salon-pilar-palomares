import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Award, Scissors, Sparkles, Heart, Hand, Palette, Star, ArrowRight, Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { registerNS } from '../i18n';
import Button from '../components/Button';
import SEO from '../components/SEO';
import nsEs from '../locales/equipo/es.json';
import nsEn from '../locales/equipo/en.json';
import nsDe from '../locales/equipo/de.json';
import nsFr from '../locales/equipo/fr.json';

registerNS('equipo', { es: nsEs, en: nsEn, de: nsDe, fr: nsFr });

gsap.registerPlugin(ScrollTrigger);

/* ───────── PHOTO CAROUSEL COMPONENT ───────── */
const PhotoCarousel = ({ photos, name }) => {
    const { t } = useTranslation('equipo');
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const next = React.useCallback(() => {
        if (isAnimating || photos.length <= 1) return;
        setIsAnimating(true);
        setCurrent((prev) => (prev + 1) % photos.length);
        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating, photos.length]);

    const prev = () => {
        if (isAnimating || photos.length <= 1) return;
        setIsAnimating(true);
        setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    // Auto-advance
    useEffect(() => {
        if (photos.length <= 1) return;
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next, photos.length]);

    return (
        <div className="double-bezel-wrapper">
            <div className="relative group/carousel w-full aspect-[4/5] double-bezel-inner overflow-hidden">
                {photos.map((photo, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                            idx === current 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 scale-105'
                        }`}
                    >
                        {photo.isPlaceholder ? (
                            <div className="w-full h-full bg-gradient-to-br from-offwhite to-white/50 flex flex-col items-center justify-center gap-4">
                                <Camera size={48} className="text-chocolate/20" />
                                <span className="text-xs uppercase tracking-[0.2em] text-chocolate/30 font-bold">{t('carousel.placeholder', { num: idx + 1 })}</span>
                            </div>
                        ) : (
                            <img
                                src={photo.src}
                                alt={photo.alt || t('carousel.workAlt', { name, num: idx + 1 })}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                ))}

                {/* Controls */}
                {photos.length > 1 && (
                    <>
                        <button onClick={prev} aria-label={t('carousel.prevLabel')} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-center text-white hover:bg-white/30 hover:text-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 z-10 border border-white/20">
                            <ChevronLeft size={18} />
                        </button>
                        <button onClick={next} aria-label={t('carousel.nextLabel')} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-center text-white hover:bg-white/30 hover:text-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 z-10 border border-white/20">
                            <ChevronRight size={18} />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {photos.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        i === current 
                                            ? 'w-6 bg-white' 
                                            : 'w-1.5 bg-white/50 hover:bg-white/70'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

/* ───────── MAIN EQUIPO PAGE ───────── */
const Equipo = () => {
    const { t } = useTranslation('equipo');
    const mainRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Hero Animation with soft blur
            gsap.fromTo('.hero-text',
                { opacity: 0, y: 30, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'expo.out', stagger: 0.2 }
            );

            // Team member sections with soft blur
            const members = document.querySelectorAll('.team-member');
            members.forEach((member) => {
                gsap.fromTo(member.querySelectorAll('.member-reveal'),
                    { opacity: 0, y: 30, filter: 'blur(5px)' },
                    {
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 1.2,
                        stagger: 0.12,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: member,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });

            // CTA reveal
            gsap.fromTo('.cta-reveal',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 1.2, ease: 'power2.out',
                    scrollTrigger: { trigger: '.cta-section', start: 'top 85%' }
                }
            );
        }, mainRef);

        return () => ctx.revert();
    }, []);

    const team = [
        {
            name: "Pilar Palomares",
            role: t('team.pilar.role'),
            icon: <Award className="text-accent-aqua" size={22} />,
            bio: t('team.pilar.bio'),
            childhoodPhoto: { isPlaceholder: true },
            workPhotos: [
                { src: "/images/pilar-palomares-estilista-peluqueria-organica-malaga.webp", alt: t('team.pilar.photoAlt') }
            ],
            layout: 'right' // childhood photo on left, carousel on right
        },
        {
            name: "Bea",
            role: t('team.bea.role'),
            icon: <Sparkles className="text-accent-aqua" size={22} />,
            bio: t('team.bea.bio'),
            childhoodPhoto: { isPlaceholder: true },
            workPhotos: [
                { src: "/images/bea-peluquera-esteticista-pilar-palomares.webp", alt: t('team.bea.photoAlt') }
            ],
            layout: 'left'
        },
        {
            name: "Rosi",
            role: t('team.rosi.role'),
            icon: <Palette className="text-accent-aqua" size={22} />,
            bio: t('team.rosi.bio'),
            childhoodPhoto: { isPlaceholder: true },
            workPhotos: [
                { src: "/images/rosi-coloracion-barros-organicos-pilar-palomares.webp", alt: t('team.rosi.photoAlt') }
            ],
            layout: 'right'
        },
        {
            name: "Sonia",
            role: t('team.sonia.role'),
            icon: <Scissors className="text-accent-aqua" size={22} />,
            bio: t('team.sonia.bio'),
            childhoodPhoto: { isPlaceholder: true },
            workPhotos: [
                { src: "/images/sonia-estilista-recogidos-iluminaciones-pilar-palomares.webp", alt: t('team.sonia.photoAlt') }
            ],
            layout: 'left'
        },
        {
            name: "Paqui",
            role: t('team.paqui.role'),
            icon: <Heart className="text-accent-aqua" size={22} />,
            bio: t('team.paqui.bio'),
            childhoodPhoto: { isPlaceholder: true },
            workPhotos: [
                { src: "/images/paqui-esteticista-experta-piel-pilar-palomares.webp", alt: t('team.paqui.photoAlt') }
            ],
            layout: 'right'
        },
        {
            name: "Alba",
            role: t('team.alba.role'),
            icon: <Hand className="text-accent-aqua" size={22} />,
            bio: t('team.alba.bio'),
            childhoodPhoto: { isPlaceholder: true },
            workPhotos: [
                { src: "/images/alba-experta-manicura-pedicura-pilar-palomares.webp", alt: t('team.alba.photoAlt') }
            ],
            layout: 'left'
        },
        {
            name: "David",
            role: t('team.david.role'),
            icon: <Star className="text-accent-aqua" size={22} />,
            bio: t('team.david.bio'),
            childhoodPhoto: { isPlaceholder: true },
            workPhotos: [
                { src: "/images/david-estilista-caballeros-salon-pilar-palomares.webp", alt: t('team.david.photoAlt') }
            ],
            layout: 'right'
        }
    ];

    return (
        <div ref={mainRef} className="bg-offwhite min-h-screen font-sans text-chocolate overflow-x-hidden">
            <SEO
                title={t('seo.title')}
                canonical="/equipo"
                description={t('seo.description')}
                keywords={[
                    "pilar palomares estilista",
                    "equipo salon pilar palomares",
                    "estilistas organicos rincon de la victoria",
                    "peluqueros profesionales torre de benagalbon",
                    "terapeutas capilares anoreta",
                    "peluqueria cerca de chilches",
                    "estetica natural velez malaga",
                    "estilistas torre del mar",
                    "peluqueros nerja"
                ]}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    "name": "Equipo Técnico y Estilistas - Salón Pilar Palomares",
                    "description": "Presentación del equipo técnico, estilistas y terapeutas del Salón Pilar Palomares en Torre de Benagalbón, Rincón de la Victoria (Málaga).",
                    "url": "https://salonpilarpalomares.com/equipo",
                    "mainEntity": [
                        {
                            "@type": "Person",
                            "name": "Pilar Palomares",
                            "jobTitle": "Directora y Fundadora",
                            "worksFor": {
                                "@type": "BeautySalon",
                                "name": "Salón Pilar Palomares"
                            }
                        },
                        {
                            "@type": "Person",
                            "name": "María",
                            "jobTitle": "Estilista y Terapeuta Facial",
                            "worksFor": {
                                "@type": "BeautySalon",
                                "name": "Salón Pilar Palomares"
                            }
                        },
                        {
                            "@type": "Person",
                            "name": "David",
                            "jobTitle": "Estilista de Caballeros",
                            "worksFor": {
                                "@type": "BeautySalon",
                                "name": "Salón Pilar Palomares"
                            }
                        }
                    ]
                }}
            />

            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
                {/* Team background photo */}
                <div className="absolute inset-0 z-0 group">
                    <picture className="w-full h-full">
                        {/* Versión móvil específica de la portada del equipo */}
                        <source media="(max-width: 767px)" srcSet="/images/equipo-profesional-salon-pilar-palomares-movil.webp" />
                        <img
                            src="/images/equipo-profesional-salon-pilar-palomares-malaga.webp"
                            alt={t('hero.imgAlt')}
                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-[3s]"
                        />
                    </picture>
                    {/* Overlay uniforme (igual que las páginas de bioterapia), sin difuminado inferior */}
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-1000"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <span className="hero-text inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent-aqua/15 border border-accent-aqua/30 text-accent-aqua text-[10px] md:text-xs tracking-[0.25em] font-sans font-bold uppercase mb-8 backdrop-blur-sm shadow-sm select-none">
                        Salón Pilar Palomares
                    </span>
                    <h1 className="hero-text text-5xl md:text-7xl font-serif mb-8 leading-tight uppercase tracking-tight text-white drop-shadow-lg">
                        {t('hero.title1')} <br /> <span className="text-accent-aqua">{t('hero.title2')}</span>
                    </h1>
                    <p className="hero-text text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed normal-case">
                        {t('hero.text')}
                    </p>
                </div>
            </section>
 
            {/* ═══════════════ TÍTULO DEL EQUIPO + CITA ═══════════════ */}
            <section className="pt-20 md:pt-28 pb-8 md:pb-10 px-6 lg:px-20 bg-white bg-noise relative">
                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                <div className="reveal max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="eyebrow-badge">{t('intro.eyebrow')}</h2>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif leading-[1.1] uppercase text-chocolate mb-4">
                        {t('intro.title')}
                    </h2>
                    <p className="text-sm md:text-base uppercase tracking-[0.2em] font-sans font-bold text-accent-aqua mb-4">
                        {t('intro.subtitle')}
                    </p>
                    <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] font-sans font-semibold text-chocolate/60 mb-6">
                        {t('intro.tagline')}
                    </p>
                    <div className="w-16 h-[1px] bg-chocolate/30 mx-auto mb-8"></div>
                    <p className="text-xl md:text-2xl font-serif text-chocolate leading-relaxed max-w-3xl mx-auto mb-6">
                        {t('intro.lead')}
                    </p>
                    <p className="text-base text-chocolate/80 leading-relaxed font-sans normal-case max-w-2xl mx-auto">
                        {t('intro.text')}
                    </p>
                </div>
            </section>

            {/* ═══════════════ TEAM MEMBERS ═══════════════ */}
            {team.map((member, idx) => {
                const isEven = member.layout === 'left';

                return (
                    <section
                        key={idx}
                        className={`team-member ${idx === 0 ? 'pt-10 md:pt-12' : 'pt-16 md:pt-24'} pb-16 md:pb-24 px-6 lg:px-20 ${idx % 2 === 0 ? 'bg-white' : 'bg-offwhite'} overflow-hidden bg-noise relative`}
                    >
                        <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none"></div>
                        <div className="max-w-7xl mx-auto relative z-10">
                            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center`}>

                                {/* ── Info + Bio (en móvil va PRIMERO: nombre y rol delante de la foto) ── */}
                                <div className={`member-reveal lg:col-span-5 order-1 ${isEven ? 'lg:order-1' : 'lg:order-2'} space-y-6`}>
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-xl bg-accent-aqua/10 flex items-center justify-center">
                                                {member.icon}
                                            </div>
                                            <span className="text-xs uppercase tracking-[0.3em] text-chocolate/60 font-bold">{member.role}</span>
                                        </div>
                                        <h2 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-serif uppercase text-chocolate leading-[1.1]">
                                            {member.name}
                                        </h2>
                                        <div className="w-12 h-[1px] bg-chocolate/30 mt-4"></div>
                                    </div>

                                    <p className="text-base text-chocolate/80 leading-relaxed font-sans normal-case">
                                        {member.bio}
                                    </p>

                                    {/* Index badge */}
                                    <div className="flex items-center gap-3 pt-2">
                                        <div className="w-8 h-8 rounded-lg bg-accent-aqua/10 flex items-center justify-center">
                                            <span className="text-base font-bold text-chocolate/40">{String(idx + 1).padStart(2, '0')}</span>
                                        </div>
                                        <div className="flex-1 h-[1px] bg-chocolate/10"></div>
                                    </div>
                                </div>

                                {/* ── Work Photos Carousel ── */}
                                <div className={`member-reveal lg:col-span-7 order-2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                                    <PhotoCarousel photos={member.workPhotos} name={member.name} />
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* ═══════════════ CALL TO ACTION ═══════════════ */}
            <section className="cta-section py-24 md:py-32 px-6 lg:px-20 bg-chocolate text-center relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/images/imagen-pelu-interior-pilar-palomares.webp" 
                        alt={t('cta.imgAlt')}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/45"></div>
                </div>

                <div className="absolute inset-0 bg-[url('/images/textures/paper-grain.webp')] opacity-10 pointer-events-none z-0"></div>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-accent-aqua/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-aqua/5 rounded-full blur-[80px] translate-x-1/3 translate-y-1/3 z-0"></div>

                <div className="max-w-3xl mx-auto relative z-10 cta-reveal">
                    <span className="eyebrow-badge">{t('cta.eyebrow')}</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-serif text-white uppercase mb-8 leading-[1.1]">
                        {t('cta.title1')} <br /> <span className="text-accent-aqua">{t('cta.title2')}</span>
                    </h2>
                    <p className="text-base text-white/60 max-w-xl mx-auto mb-12 leading-relaxed normal-case">
                        {t('cta.text')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            to="/reserva"
                            variant="coral"
                            icon={ArrowRight}
                            className="shadow-xl spring-bounce hover:shadow-[0_20px_40px_-10px_rgba(253,179,164,0.4)]"
                        >
                            {t('cta.reservar')}
                        </Button>
                        <Button
                            to="/contacto"
                            variant="outline-aqua"
                        >
                            {t('cta.contactar')}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Equipo;
