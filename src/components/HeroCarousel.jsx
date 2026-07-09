import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const desktopImages = [
    { 
        src: "/images/home/hero-masaje-relajante-pilar-palomares.webp", 
        position: "center 25%",
        alt: "Masaje relajante y bioterapia corporal en Salón Pilar Palomares en Torre de Benagalbón, Rincón de la Victoria, sirviendo a Añoreta, Chilches y Vélez Málaga"
    },
    { 
        src: "/images/home/hero-salon-peluqueria-organica-pilar-palomares.webp", 
        position: "center 35%",
        alt: "Salón de peluquería orgánica y corte de autor Pilar Palomares en Rincón de la Victoria, Málaga. Espacio boutique de belleza saludable"
    },
    { 
        src: "/images/home/hero-productos-secretos-del-agua-pilar-palomares.webp", 
        position: "center",
        alt: "Productos orgánicos, barros capilares e infoactivos de Secretos del Agua en peluquería Pilar Palomares cerca de Torre del Mar y Nerja"
    }
];

const mobileImages = [
    { 
        src: "/images/home/hero-mobile-masaje-relajante-pilar-palomares.webp", 
        position: "center 85%", 
        brightness: 0.9,
        alt: "Masaje corporal botánico y bienestar en Málaga, Salón Pilar Palomares" 
    },
    { 
        src: "/images/home/hero-mobile-salon-peluqueria-pilar-palomares.webp", 
        position: "center", 
        brightness: 0.85,
        alt: "Peluquería de autor y coloración natural en Rincón de la Victoria, Salón Pilar Palomares"
    },
    { 
        src: "/images/home/hero-mobile-productos-organicos-pilar-palomares.webp", 
        position: "center 75%", 
        brightness: 1.0,
        alt: "Gama premium de biocosmética de Secretos del Agua en peluquería orgánica Málaga"
    }
];

const HeroCarousel = () => {
    const [images, setImages] = useState(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            return mobileImages;
        }
        return desktopImages;
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    // Cambia cuando el usuario navega manualmente, para reiniciar el temporizador
    // del autoplay y que la imagen elegida no salte enseguida a la siguiente.
    const [manualKey, setManualKey] = useState(0);
    const carouselRef = useRef(null);
    const slidesRef = useRef([]);

    const goTo = (index) => {
        setCurrentIndex(index);
        setManualKey((k) => k + 1);
    };

    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth < 768) {
                setImages(mobileImages);
            } else {
                setImages(desktopImages);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (images.length > 0) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }
        }, 5000);

        return () => clearInterval(timer);
    }, [images.length, manualKey]);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        slidesRef.current.forEach((slide, index) => {
            if (index === currentIndex) {
                gsap.to(slide, {
                    opacity: 1,
                    scale: isMobile ? 1 : 1.05, // No zoom on mobile to keep it sharp
                    duration: 2,
                    ease: "power2.inOut"
                });
            } else {
                gsap.to(slide, {
                    opacity: 0,
                    scale: 1,
                    duration: 2,
                    ease: "power2.inOut"
                });
            }
        });
    }, [currentIndex, images.length]);

    return (
        <div ref={carouselRef} className="absolute inset-0 z-0 overflow-hidden">
            {images.map((img, index) => (
                <div
                    key={index}
                    ref={(el) => (slidesRef.current[index] = el)}
                    className="absolute inset-0 opacity-0 bg-offwhite"
                    style={{ zIndex: index === currentIndex ? 1 : 0 }}
                >
                    <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                        style={{ 
                            objectPosition: img.position || 'center'
                        }}
                    />
                </div>
            ))}

            {/* Indicadores del carrusel: informan de la imagen activa y permiten saltar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] flex items-center gap-2.5">
                {images.map((img, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => goTo(index)}
                        aria-label={`Ver imagen ${index + 1} de ${images.length}`}
                        aria-current={index === currentIndex ? 'true' : undefined}
                        className={`h-[3px] rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 ${
                            index === currentIndex
                                ? 'w-9 bg-white/95'
                                : 'w-4 bg-white/40 hover:bg-white/70'
                        }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
