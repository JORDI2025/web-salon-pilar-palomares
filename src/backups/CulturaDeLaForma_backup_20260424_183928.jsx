import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Sparkles, Droplets, Wind, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const CulturaDeLaForma = () => {
    const mainRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.fromTo('.hero-text', 
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out', stagger: 0.2 }
            );

            // Section Reveals
            const revealSections = document.querySelectorAll('.reveal-section');
            revealSections.forEach((section) => {
                gsap.fromTo(section.querySelectorAll('.reveal-item'),
                    { opacity: 0, y: 40 },
                    { 
                        opacity: 1, 
                        y: 0, 
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

            // Refresh ScrollTrigger after a short delay
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 1000);
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="bg-offwhite min-h-screen font-sans text-chocolate/80 overflow-x-hidden selection:bg-accent-aqua/30 selection:text-chocolate">
            <SEO 
                title="Cultura de la Forma · Corte y Textura"
                canonical="/cultura-de-la-forma"
                description="Salón Pilar Palomares: Cultura de la Forma. Cortes de autor, peinados personalizados y tratamientos de textura (Curly, Alisado) con tecnología botánica."
            />
            
            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 group">
                    <img 
                        src="/images/tratamiento-aminoproteico2.jpg" 
                        alt="Cultura de la Forma en Salón Pilar Palomares" 
                        className="w-full h-full object-cover object-top md:hidden group-hover:scale-110 transition-transform duration-[5s]"
                    />
                    <img 
                        src="/images/culturadelaforma-pc.jpg" 
                        alt="Cultura de la Forma en Salón Pilar Palomares" 
                        className="hidden md:block w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[5s]"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-1000"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <h3 className="hero-text text-base md:text-xl uppercase tracking-[0.6em] text-white/90 font-serif font-bold mb-6 block">Arquitectura Capilar · Diseño de Autor</h3>
                    <h1 className="hero-text text-4xl md:text-7xl font-serif mb-8 text-white uppercase tracking-tighter leading-tight">
                        Cultura de <br /> <span>la Forma</span>
                    </h1>
                    <p className="hero-text text-base md:text-lg lg:text-xl font-light text-white/85 max-w-2xl mx-auto leading-relaxed">
                        El equilibrio perfecto entre técnica, identidad y salud celular. Diseñamos formas que respetan la caída natural de tu cabello.
                    </p>
                </div>
            </section>

            {/* ═══════════════ SECTION: NUESTRO STYLING ═══════════════ */}
            <section id="styling" className="py-16 md:py-24 px-6 lg:px-20 bg-white relative overflow-hidden reveal-section border-b border-chocolate/5">
                <div className="container-custom">
                    <div className="reveal-item flex flex-col md:flex-row items-start gap-12 md:gap-24 lg:gap-32">
                        {/* Mobile Title */}
                        <div className="w-full md:hidden text-left mb-2">
                            <span className="text-base uppercase tracking-[0.6em] text-chocolate/60 font-serif font-bold mb-2 block leading-relaxed">Corte & Estilo</span>
                            <h3 className="text-3xl font-serif uppercase tracking-tight">Nuestro Styling</h3>
                        </div>

                        {/* Image Container */}
                        <div className="w-3/4 mx-auto md:w-5/12 aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl group relative">
                            <img 
                                src="/images/styling.png" 
                                alt="Nuestro Styling" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                            />
                            <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors duration-700"></div>
                        </div>

                        {/* Text Content */}
                        <div className="w-full md:w-7/12 space-y-6 md:space-y-8 text-left">
                            <div className="hidden md:block">
                                <span className="text-base uppercase tracking-[0.6em] text-chocolate/60 font-serif font-bold mb-4 block leading-relaxed">Corte & Estilo</span>
                                <h3 className="text-3xl md:text-5xl font-serif mb-6 uppercase tracking-tight">Nuestro Styling</h3>
                            </div>
                            <p className="text-base md:text-lg text-chocolate/80 leading-relaxed max-w-xl">
                                Es el equilibrio perfecto entre nutrición y fijación. Utilizamos productos botánicos que crean un escudo protector en la cutícula, aportando resistencia, brillo y control del encrespamiento para un estilo elegante, sano y natural.
                            </p>
                            
                            <div className="grid grid-cols-3 gap-4 text-center pt-4 max-w-md">
                                <div className="flex flex-col items-center group">
                                    <div className="w-14 h-14 rounded-full bg-accent-aqua/5 flex items-center justify-center text-accent-aqua shadow-lg mb-2 border border-white/20 group-hover:bg-accent-aqua group-hover:text-white transition-all duration-500">
                                        <Wind size={24} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-chocolate/60">Anti-frizz</span>
                                </div>
                                <div className="flex flex-col items-center group">
                                    <div className="w-14 h-14 rounded-full bg-accent-aqua/5 flex items-center justify-center text-accent-aqua shadow-lg mb-2 border border-white/20 group-hover:bg-accent-aqua group-hover:text-white transition-all duration-500">
                                        <Sparkles size={24} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-chocolate/60">Brillo</span>
                                </div>
                                <div className="flex flex-col items-center group">
                                    <div className="w-14 h-14 rounded-full bg-accent-aqua/5 flex items-center justify-center text-accent-aqua shadow-lg mb-2 border border-white/20 group-hover:bg-accent-aqua group-hover:text-white transition-all duration-500">
                                        <Droplets size={24} />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-chocolate/60">Nutrición</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ SECTION: DISEÑO Y ACABADO (CORTE DE AUTOR) ═══════════════ */}
            <section id="diseno-acabado" className="py-24 px-6 lg:px-20 bg-offwhite reveal-section">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 reveal-item">
                        <h3 className="text-base md:text-xl uppercase tracking-[0.6em] text-chocolate/60 font-serif font-bold mb-6 block">Estilo & Identidad</h3>
                        <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight tracking-tight uppercase">El Arte del Diseño y Acabado</h2>
                        <p className="text-base text-chocolate/80 leading-relaxed max-w-2xl mx-auto">
                            Cortes y peinados que respetan la caída natural y potencian tu identidad única.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {/* PEINADO DE MUJER */}
                        <div className="reveal-item group text-center md:text-left">
                            <h4 className="text-xl font-serif uppercase tracking-widest text-chocolate mb-6">Peinado de Mujer</h4>
                            <div className="card-elevated w-4/5 mx-auto md:w-full aspect-[4/5] overflow-hidden mb-8 relative group">
                                <img 
                                    src="/images/bea5.png" 
                                    alt="Peinado de mujer saludable" 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                />
                            </div>
                            <p className="text-base text-chocolate/80 leading-relaxed">
                                Incluye Lavado Dermocapilar, Bioterapia Facial y acabado con productos de Styling botánicos.
                            </p>
                        </div>

                        {/* CORTE DE AUTOR */}
                        <div className="reveal-item group text-center md:text-left">
                            <h4 className="text-xl font-serif uppercase tracking-widest text-chocolate mb-6">Corte de Autor</h4>
                            <div className="card-elevated w-4/5 mx-auto md:w-full aspect-[4/5] overflow-hidden mb-8 relative group">
                                <img 
                                    src="/images/acabado.jpeg" 
                                    alt="Corte de autor personalizado" 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                />
                            </div>
                            <p className="text-base text-chocolate/80 leading-relaxed font-sans normal-case">
                                Ritual de Lavado Dermocapilar, Bioterapia Facial Express y Styling personalizado según tu caída natural.
                            </p>
                        </div>

                        {/* CUIDADO MASCULINO */}
                        <div className="reveal-item group text-center md:text-left">
                            <h4 className="text-xl font-serif uppercase tracking-widest text-chocolate mb-6">Cuidado Masculino</h4>
                            <div className="card-elevated w-4/5 mx-auto md:w-full aspect-[4/5] overflow-hidden mb-8 relative group">
                                <img 
                                    src="/images/david1.jpeg" 
                                    alt="Cuidado masculino por David" 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                />
                            </div>
                            <p className="text-base text-chocolate/80 leading-relaxed">
                                Cortes esenciales y de experiencia que incluyen un momento de relax absoluto y bioterapia facial.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ SECTION: TEXTURA Y FORMA ═══════════════ */}
            <section id="textura" className="py-24 px-6 lg:px-20 bg-white reveal-section border-y border-chocolate/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 reveal-item">
                        <h3 className="text-base md:text-xl uppercase tracking-[0.6em] text-chocolate/60 font-serif font-bold mb-6 block">Activos Orgánicos & Minerales</h3>
                        <h2 className="text-4xl md:text-6xl font-serif mb-6 uppercase tracking-tight">Especialidades en Textura</h2>
                        <p className="text-base text-chocolate/80 max-w-2xl mx-auto leading-relaxed">
                            Tratamientos avanzados que trabajan en sinergia con tu cabello para recuperar su forma ideal.
                        </p>
                    </div>

                    <div className="space-y-24 md:space-y-40">
                        {/* MÉTODO CURLY */}
                        <div className="reveal-item flex flex-col md:flex-row items-center gap-12 md:gap-24">
                            {/* Mobile Title */}
                            <div className="w-full md:hidden text-left">
                                <span className="text-base uppercase tracking-[0.6em] text-chocolate/60 font-serif font-bold mb-4 block leading-relaxed">Definición & Salud</span>
                                <h3 className="text-3xl font-serif mb-0 uppercase tracking-tight">Método Curly</h3>
                            </div>

                            {/* Image Container */}
                            <div className="w-3/4 mx-auto md:w-5/12 aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl group relative">
                                <img 
                                    src="/images/peluqueria/metodo-curly-rizo-natural.webp" 
                                    alt="Método Curly: Recuperación de rizo natural" 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                                />
                                <div className="absolute inset-0 bg-chocolate/5 group-hover:bg-transparent transition-colors duration-700"></div>
                            </div>

                            {/* Text Content */}
                            <div className="w-full md:w-7/12 space-y-8 text-left">
                                <div className="hidden md:block">
                                    <span className="text-base uppercase tracking-[0.6em] text-chocolate/60 font-serif font-bold mb-4 block leading-relaxed">Definición & Salud</span>
                                    <h3 className="text-3xl md:text-5xl font-serif mb-6 uppercase tracking-tight">Método Curly</h3>
                                </div>
                                <p className="text-base text-chocolate/80 leading-relaxed max-w-xl">
                                    No se trata solo de peinar, sino de sanar el rizo desde su origen. Recuperamos la elasticidad y la memoria natural de tu cabello mediante el uso de minerales puros y plantas micronizadas que nutren la fibra sin añadir peso.
                                </p>
                                <div className="flex flex-row flex-nowrap gap-2 md:gap-3 overflow-x-hidden">
                                    <span className="px-3 py-1.5 md:px-5 md:py-2 rounded-full border border-chocolate/10 text-[10px] md:text-xs uppercase tracking-widest font-bold text-chocolate/60 whitespace-nowrap">Sin Siliconas</span>
                                    <span className="px-3 py-1.5 md:px-5 md:py-2 rounded-full border border-chocolate/10 text-[10px] md:text-xs uppercase tracking-widest font-bold text-chocolate/60 whitespace-nowrap">Botánica Pura</span>
                                    <span className="px-3 py-1.5 md:px-5 md:py-2 rounded-full border border-chocolate/10 text-[10px] md:text-xs uppercase tracking-widest font-bold text-chocolate/60 whitespace-nowrap">Elasticidad</span>
                                </div>
                            </div>
                        </div>

                        {/* ALISADO AMINOPROTÉICO */}
                        <div id="alisado-aminoproteico" className="reveal-item flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
                            {/* Mobile Title */}
                            <div className="w-full md:hidden text-left">
                                <span className="text-base uppercase tracking-[0.6em] text-chocolate/60 font-serif font-bold mb-4 block leading-relaxed">Control & Brillo</span>
                                <h3 className="text-3xl font-serif mb-0 uppercase tracking-tight">Alisado Aminoprotéico</h3>
                            </div>

                            {/* Image Container (Carousel) */}
                            <div className="w-3/4 mx-auto md:w-5/12 aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl group relative">
                                <ImageCarousel 
                                    images={[
                                        { url: "/images/tratamiento-aminoproteico1.jpg", alt: "Resultado Alisado Aminoprotéico 1" },
                                        { url: "/images/tratamiento-aminoproteico2.jpg", alt: "Resultado Alisado Aminoprotéico 2" },
                                        { url: "/images/tratamiento-aminoproteico3.jpg", alt: "Resultado Alisado Aminoprotéico 3" }
                                    ]} 
                                />
                            </div>

                            {/* Text Content */}
                            <div className="w-full md:w-7/12 space-y-8 text-left">
                                <div className="hidden md:block">
                                    <span className="text-base uppercase tracking-[0.6em] text-chocolate/60 font-serif font-bold mb-4 block leading-relaxed">Control & Brillo</span>
                                    <h3 className="text-3xl md:text-5xl font-serif mb-6 uppercase tracking-tight">Alisado Aminoprotéico</h3>
                                </div>
                                <p className="text-base text-chocolate/80 leading-relaxed max-w-xl">
                                    Una revolución en el alisado orgánico que disciplina el cabello mientras lo protege. Nuestra fórmula rica en aminoácidos reconstruye la estructura interna, dejando una melena lisa, con movimiento y un brillo tridimensional inigualable.
                                </p>
                                <div className="flex flex-row flex-nowrap gap-2 md:gap-3 overflow-x-hidden">
                                    <span className="px-3 py-1.5 md:px-5 md:py-2 rounded-full border border-chocolate/10 text-[10px] md:text-xs uppercase tracking-widest font-bold text-chocolate/60 whitespace-nowrap">Antifrizz</span>
                                    <span className="px-3 py-1.5 md:px-5 md:py-2 rounded-full border border-chocolate/10 text-[10px] md:text-xs uppercase tracking-widest font-bold text-chocolate/60 whitespace-nowrap">Orgánico</span>
                                    <span className="px-3 py-1.5 md:px-5 md:py-2 rounded-full border border-chocolate/10 text-[10px] md:text-xs uppercase tracking-widest font-bold text-chocolate/60 whitespace-nowrap">Protección</span>
                                </div>

                                <div className="space-y-6 pt-6 border-t border-chocolate/5">
                                    <h4 className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-accent-aqua/80">Recomendaciones: Alisado Natural Duradero</h4>
                                    <div className="grid gap-4">
                                        <div className="flex gap-4 items-start group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-aqua/40 mt-1.5 shrink-0 group-hover:bg-accent-aqua transition-colors" />
                                            <p className="text-sm text-chocolate/70 leading-relaxed italic">
                                                El post-tratamiento está incluido. Es fundamental continuar una rutina de cuidado <span className="text-chocolate font-medium">Secretos del Agua</span> en casa para garantizar resultados.
                                            </p>
                                        </div>
                                        <div className="flex gap-4 items-start group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-aqua/40 mt-1.5 shrink-0 group-hover:bg-accent-aqua transition-colors" />
                                            <p className="text-sm text-chocolate/70 leading-relaxed italic">
                                                Durante los primeros días mantén el cabello suelto, sin coletas ni trenzas apretadas.
                                            </p>
                                        </div>
                                        <div className="flex gap-4 items-start group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-aqua/40 mt-1.5 shrink-0 group-hover:bg-accent-aqua transition-colors" />
                                            <p className="text-sm text-chocolate/70 leading-relaxed italic">
                                                Seca por completo con manos y secador direccionando el alisado. El calor activa la queratina como una cera protectora.
                                            </p>
                                        </div>
                                        <div className="flex gap-4 items-start group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-aqua/40 mt-1.5 shrink-0 group-hover:bg-accent-aqua transition-colors" />
                                            <p className="text-sm text-chocolate/70 leading-relaxed italic">
                                                Si lo dejas secar al aire, obtendrás un resultado más ondulado y natural.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button 
                                        to="/bioterapia-capilar#alisado" 
                                        variant="primary"
                                        icon={ArrowRight}
                                    >
                                        Ver detalles
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ CTA FINAL ═══════════════ */}
            <section className="py-12 md:py-20 bg-offwhite text-center px-6 reveal-section relative overflow-hidden">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <div className="reveal-item mb-8 md:mb-12">
                        <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-tight text-chocolate">¿Buscas tu forma ideal?</h2>
                    </div>
                    
                    <div className="reveal-item w-full max-w-xl mb-8 md:mb-0 relative group">
                        {/* Image Container with Button Overlay */}
                        <div className="card-elevated aspect-square overflow-hidden rounded-[40px] shadow-2xl relative">
                            <img 
                                src="/images/4-peinados.jpg" 
                                alt="Transformación y estilo en Pilar Palomares" 
                                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                            />
                            {/* Overlay for all devices */}
                            <div className="flex absolute inset-0 bg-black/10 items-center justify-center">
                                <Button 
                                    to="/reserva" 
                                    variant="glass"
                                    className="px-8 py-4 md:px-10 md:py-5 text-xs md:text-sm tracking-[0.3em]"
                                >
                                    Reservar Cita
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const nextSlide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <div className="relative w-full h-full group/carousel">
            <div className={`w-full h-full transition-all duration-500 ease-in-out transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                <img 
                    src={images[currentIndex].url} 
                    alt={images[currentIndex].alt} 
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* Controls */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-10">
                <button 
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
                <button 
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, i) => (
                    <div 
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-white' : 'bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CulturaDeLaForma;
