import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TestimonialCarousel = ({ testimonials }) => {
    const trackRef = useRef(null);
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const getInitialVisibleCards = () => {
        if (typeof window === 'undefined') return 3;
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    };
    const [visibleCards, setVisibleCards] = useState(getInitialVisibleCards);
    const [isPaused, setIsPaused] = useState(false);
    const [resizeKey, setResizeKey] = useState(0);
    const touchStartX = useRef(0);

    const updateVisible = () => {
        if (window.innerWidth >= 1024) setVisibleCards(3);
        else if (window.innerWidth >= 768) setVisibleCards(2);
        else setVisibleCards(1);
    };

    useEffect(() => {
        const handleResize = () => {
            updateVisible();
            setResizeKey(prev => prev + 1);
        };
        window.addEventListener('resize', handleResize);
        
        // GSAP entry animation (con limpieza: si no se mata el trigger,
        // se acumulan duplicados al navegar entre rutas o al cambiar
        // la lista de testimonios en resize).
        let entryTween = null;
        if (trackRef.current) {
            try {
                entryTween = gsap.fromTo(trackRef.current.children,
                    { opacity: 0, x: 50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1.2,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: trackRef.current,
                            start: "top 80%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            } catch { /* la red de seguridad global rescata los elementos */ }
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            if (entryTween) {
                entryTween.scrollTrigger?.kill();
                entryTween.kill();
            }
        };
    }, [testimonials]);

    const maxIndex = Math.max(0, testimonials.length - visibleCards);

    const handleNext = useCallback(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const handlePrev = useCallback(() => {
        setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    // Auto-play logic
    useEffect(() => {
        let interval;
        if (!isPaused) {
            interval = setInterval(() => {
                handleNext();
            }, 4000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPaused, handleNext]);

    // Handle GSAP translation animation on index change
    useEffect(() => {
        if (trackRef.current && trackRef.current.children[0]) {
            const card = trackRef.current.children[0];
            const cardWidth = card.getBoundingClientRect().width;
            const gap = window.innerWidth >= 768 ? 32 : 24; // gap-8 vs gap-6
            const offset = currentIndex * (cardWidth + gap);
            
            gsap.to(trackRef.current, {
                x: -offset,
                duration: 0.8,
                ease: "power3.out"
            });
        }
    }, [currentIndex, visibleCards, resizeKey]);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        setIsPaused(true);
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;
        if (diff > 50) {
            handleNext();
        } else if (diff < -50) {
            handlePrev();
        }
        setIsPaused(false);
    };

    const canScrollLeft = currentIndex > 0;
    const canScrollRight = currentIndex < maxIndex;

    return (
        <div 
            ref={containerRef}
            className="relative w-full mx-auto mt-12 md:mt-16 group/carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Translation Container */}
            <div 
                className="overflow-hidden w-full px-[7.5vw] md:px-8 pb-12 pt-4"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Track Container */}
                <div 
                    ref={trackRef}
                    className="flex gap-6 md:gap-8 w-full"
                    style={{ willChange: 'transform' }}
                >
                    {testimonials.map((t, index) => (
                        <div key={index} className="w-[85vw] md:w-[45vw] lg:w-[30vw] md:min-w-[320px] max-w-[450px] flex-shrink-0 h-auto">
                            <TestimonialCard t={t} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Controls (Centered below carousel on mobile, absolute top-right on desktop) */}
            <div className="flex justify-center md:absolute md:-top-20 md:right-8 gap-3 z-20 mt-4 md:mt-0">
                <button 
                    onClick={handlePrev}
                    disabled={!canScrollLeft}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-chocolate/10 flex items-center justify-center text-chocolate disabled:opacity-30 disabled:cursor-not-allowed hover:bg-chocolate hover:text-white hover:scale-105 spring-bounce shadow-md transition-all duration-300"
                    aria-label="Previous testimonials"
                >
                    <ArrowLeft size={20} strokeWidth={2} />
                </button>
                <button 
                    onClick={handleNext}
                    disabled={!canScrollRight}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border border-chocolate/10 flex items-center justify-center text-chocolate disabled:opacity-30 disabled:cursor-not-allowed hover:bg-chocolate hover:text-white hover:scale-105 spring-bounce shadow-md transition-all duration-300"
                    aria-label="Next testimonials"
                >
                    <ArrowRight size={20} strokeWidth={2} />
                </button>
            </div>
            
            {/* Fade Edges for Desktop */}
            <div className="hidden md:block absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-offwhite to-transparent pointer-events-none z-10"></div>
            <div className="hidden md:block absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-offwhite to-transparent pointer-events-none z-10"></div>
        </div>
    );
};

const TestimonialCard = ({ t }) => {
    return (
        <div className="liquid-glass p-8 md:p-10 flex flex-col group relative overflow-hidden h-full transform hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(60,47,47,0.15)] spring-bounce cursor-grab active:cursor-grabbing hover:bg-white">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-aqua/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150"></div>
            
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none text-chocolate">
                <Quote size={80} />
            </div>

            {/* Top Info section */}
            <div className="flex items-center space-x-5 mb-8 relative z-10">
                <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden double-bezel-inner shadow-lg">
                    {t.photo ? (
                        <img 
                            src={t.photo} 
                            alt={t.name} 
                            style={{ objectPosition: t.photoPosition || 'center' }} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                        />
                    ) : (
                        <div className="w-full h-full bg-sand/30 flex items-center justify-center text-chocolate font-serif font-bold text-2xl">
                            {t.name.charAt(0)}
                        </div>
                    )}
                </div>
                <div>
                    <h5 className="font-serif font-bold text-chocolate text-lg md:text-xl tracking-wide group-hover:text-accent-aqua transition-colors duration-500 leading-tight mb-1">{t.name}</h5>
                    <div className="flex items-center">
                        <span className="text-[10px] md:text-xs text-chocolate/50 uppercase font-bold tracking-[0.2em]">{t.source}</span>
                    </div>
                </div>
            </div>

            {/* Stars & Text */}
            <div className="relative z-10 flex flex-col flex-grow">
                <div className="flex space-x-1.5 mb-6">
                    {[...Array(t.rating || 5)].map((_, starIndex) => (
                        <Star 
                            key={starIndex} 
                            size={16} 
                            fill="#D4AF37" 
                            color="#D4AF37" 
                            className="drop-shadow-sm transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" 
                            style={{transitionDelay: `${starIndex * 40}ms`}}
                        />
                    ))}
                </div>
                
                <p className="text-chocolate/90 leading-relaxed text-[16px] md:text-[18px] font-sans font-medium mb-8 relative z-10 line-clamp-6 group-hover:line-clamp-none transition-all duration-500">
                    "{t.text}"
                </p>

                {/* Attached Photos Gallery */}
                {t.attached_photos && t.attached_photos.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-auto pt-5 border-t border-chocolate/5">
                        {t.attached_photos.map((photo, pIdx) => {
                            const photoUrl = typeof photo === 'string' ? photo : photo.url;
                            return (
                                <a 
                                    href={photoUrl} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    key={pIdx} 
                                    className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 overflow-hidden rounded-xl shadow-sm border border-chocolate/10 relative group/photo hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <img 
                                        src={photoUrl} 
                                        alt={`Foto adjunta ${pIdx + 1}`} 
                                        style={{ objectPosition: typeof photo === 'object' && photo.position ? photo.position : 'center' }} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/photo:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover/photo:bg-transparent transition-colors"></div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestimonialCarousel;
