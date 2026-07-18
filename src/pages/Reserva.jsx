import React, { useState, useEffect } from 'react';
import { Phone, Mail, ArrowRight, CheckCircle2, Instagram, MessageSquare, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { registerNS } from '../i18n';
import { useLang } from '../langContext';
import Button from '../components/Button';
import SEO from '../components/SEO';
import reservaEs from '../locales/reserva/es.json';
import reservaEn from '../locales/reserva/en.json';
import reservaDe from '../locales/reserva/de.json';
import reservaFr from '../locales/reserva/fr.json';

registerNS('reserva', { es: reservaEs, en: reservaEn, de: reservaDe, fr: reservaFr });

const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const Reserva = () => {
    const { t } = useTranslation('reserva');
    const { lp } = useLang();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        servicio: '',
        mensaje: ''
    });
    const [status, setStatus] = useState('idle');
    const [showLegal, setShowLegal] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        gsap.to(".fade-in", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "expo.out"
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1800);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (status === 'success') {
        return (
            <div className="pt-40 pb-24 px-6 min-h-[90vh] bg-offwhite flex items-center justify-center selection:bg-accent-aqua/30 selection:text-chocolate">
                <div className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl text-center border border-chocolate/5">
                    <div className="w-20 h-20 bg-accent-aqua/10 text-accent-aqua rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-serif text-chocolate mb-4 uppercase tracking-[0.2em]">{t('success.title')}</h2>
                    <p className="text-chocolate/80 mb-10 leading-relaxed font-sans text-base">
                        {t('success.text', { name: formData.nombre.split(' ')[0] })}
                    </p>
                    <Button
                        onClick={() => navigate(lp('/'))}
                        variant="primary"
                    >
                        {t('success.back')}
                    </Button>
                </div>
            </div>
        );
    }
    return (
        <div className="pt-40 pb-24 px-6 lg:px-20 bg-offwhite min-h-screen selection:bg-accent-aqua/30 selection:text-chocolate font-sans text-chocolate bg-noise">
            <SEO
                title={t('seo.title')}
                canonical="/reserva"
                description={t('seo.description')}
                keywords={[
                    "reservar peluqueria pilar palomares",
                    "diagnostico gratuito secretos del agua malaga",
                    "cita online peluqueria rincon de la victoria",
                    "reserva peluqueria anoreta",
                    "cita secretos del agua torre del mar",
                    "peluqueria nerja cita previa",
                    "estilistas velez malaga reservas"
                ]}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "BeautySalon",
                    "name": "Salón Pilar Palomares",
                    "image": "https://salonpilarpalomares.com/images/fachada-salon-pilar-palomares-peluqueria-organica-malaga.webp",
                    "telephone": "+34952972134",
                    "url": "https://salonpilarpalomares.com",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "C/ Axarquía 21, Local 3",
                        "addressLocality": "Torre de Benagalbón",
                        "addressRegion": "Málaga",
                        "postalCode": "29738",
                        "addressCountry": "ES"
                    },
                    "potentialAction": {
                        "@type": "ReserveAction",
                        "target": "https://salonpilarpalomares.com/reserva",
                        "result": {
                            "@type": "Reservation",
                            "name": "Reserva de cita o diagnóstico de belleza consciente"
                        }
                    }
                }}
            />
            <div className="max-w-7xl mx-auto">
                {/* BRANDED HEADER - Pure Serif Bold Uppercase */}
                <div className="text-center mb-12 md:mb-16 space-y-4 fade-in opacity-0 translate-y-10 md:hidden lg:block">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-chocolate/60 font-serif font-bold block">{t('header.eyebrow')}</span>
                    <h1 className="text-4xl md:text-7xl font-serif text-chocolate mb-6 leading-tight uppercase">
                        {t('header.title1')} <br /><span className="text-accent-aqua">{t('header.title2')}</span>
                    </h1>
                </div>

                {/* TABLET ONLY GRID */}
                <div className="hidden md:grid lg:hidden grid-cols-2 gap-10 items-center mb-12 fade-in opacity-0 translate-y-10" style={{ transitionDelay: '0.2s' }}>
                    {/* Left Column: Title and contact buttons */}
                    <div className="space-y-8">
                        <div>
                            <span className="text-xs uppercase tracking-[0.3em] text-chocolate/60 font-serif font-bold mb-2 block">{t('header.eyebrow')}</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-chocolate leading-tight uppercase">
                                {t('header.title1')} <br /><span className="text-accent-aqua">{t('header.title2')}</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Button 
                                href="tel:+34952972134"
                                variant="glass-outline-aqua"
                                className="p-4 md:p-6 justify-between transform-none hover:scale-105 spring-bounce"
                            >
                                <div className="flex items-center space-x-2 md:space-x-4">
                                    <Phone size={18} className="shrink-0" />
                                    <div className="text-left overflow-hidden">
                                        <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest mb-0.5 truncate opacity-70">{t('contact.callLabel')}</p>
                                        <p className="text-xs md:text-sm font-sans tracking-tight truncate font-medium">952 97 21 34</p>
                                    </div>
                                </div>
                            </Button>

                            <Button 
                                href={t('contact.whatsappHref')}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                variant="glass-outline-aqua"
                                className="p-4 md:p-6 justify-between transform-none hover:scale-105 spring-bounce"
                            >
                                <div className="flex items-center space-x-2 md:space-x-4">
                                    <WhatsAppIcon size={18} className="shrink-0" />
                                    <div className="text-left overflow-hidden">
                                        <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest mb-0.5 truncate opacity-70">{t('contact.whatsappLabel')}</p>
                                        <p className="text-xs md:text-sm font-sans tracking-tight truncate font-medium">642 27 59 06</p>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </div>
                    {/* Right Column: Photo */}
                    <div className="double-bezel-wrapper w-full max-w-[280px] aspect-[3/4] mx-auto">
                        <div className="w-full h-full rounded-[calc(2.5rem-0.75rem)] overflow-hidden relative z-10 double-bezel-inner">
                            <img
                                src="/images/shared/pilar-palomares-recepcion-belleza-consciente.webp"
                                alt={t('contact.imgAlt')}
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-stretch">
                    
                    {/* LEFT COLUMN: Visual & Contact cards */}
                    <div className="flex flex-col h-full fade-in opacity-0 translate-y-10 md:hidden lg:flex" style={{ transitionDelay: '0.2s' }}>
                        <div className="relative group mb-6 md:mb-10 double-bezel-wrapper w-full max-w-[280px] md:max-w-[320px] lg:max-w-none aspect-[3/4] lg:aspect-auto lg:h-full lg:flex-grow mx-auto">
                            <div className="w-full h-full rounded-[calc(2.5rem-0.75rem)] overflow-hidden relative z-10 double-bezel-inner">
                                <img
                                    src="/images/shared/pilar-palomares-recepcion-belleza-consciente.webp"
                                    alt={t('contact.imgAltFull')}
                                    className="w-full h-full object-cover object-top transition-transform duration-[2s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-chocolate/5 transition-opacity group-hover:opacity-0"></div>
                            </div>
                        </div>

                        {/* Contact Buttons - Matching Brand Style */}
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            <Button 
                                href="tel:+34952972134"
                                variant="glass-outline-aqua"
                                className="p-4 md:p-6 justify-between transform-none hover:scale-105 spring-bounce"
                            >
                                <div className="flex items-center space-x-2 md:space-x-4">
                                    <Phone size={18} className="shrink-0" />
                                    <div className="text-left overflow-hidden">
                                        <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest mb-0.5 truncate opacity-70">{t('contact.callLabel')}</p>
                                        <p className="text-xs md:text-sm font-sans tracking-tight truncate font-medium">952 97 21 34</p>
                                    </div>
                                </div>
                            </Button>

                            <Button 
                                href={t('contact.whatsappHref')}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                variant="glass-outline-aqua"
                                className="p-4 md:p-6 justify-between transform-none hover:scale-105 spring-bounce"
                            >
                                <div className="flex items-center space-x-2 md:space-x-4">
                                    <WhatsAppIcon size={18} className="shrink-0" />
                                    <div className="text-left overflow-hidden">
                                        <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest mb-0.5 truncate opacity-70">{t('contact.whatsappLabel')}</p>
                                        <p className="text-xs md:text-sm font-sans tracking-tight truncate font-medium">642 27 59 06</p>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: The Form - Matching Left Height */}
                    <div className="liquid-glass p-10 md:p-16 rounded-[40px] border border-white/50 h-full flex flex-col justify-center fade-in opacity-0 translate-y-10 w-full md:max-w-2xl md:mx-auto lg:max-w-none lg:mx-0" style={{ transitionDelay: '0.4s' }}>
                        <div className="mb-12">
                            <h2 className="text-2xl md:text-3xl font-serif text-chocolate mb-2 uppercase tracking-tight">{t('form.title')}</h2>
                             <p className="text-chocolate/80 text-base leading-relaxed max-w-md">
                                {t('form.subtitle')}
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-8 flex-grow">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2 border-b border-chocolate/10 pb-2">
                                    <label htmlFor="nombre" className="text-xs uppercase font-bold text-chocolate/70 tracking-[0.2em] cursor-pointer">{t('form.nameLabel')}</label>
                                    <input 
                                        type="text" 
                                        id="nombre"
                                        name="nombre"
                                        required
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-none px-0 py-2 focus:ring-0 outline-none text-chocolate font-sans placeholder:text-chocolate/40 text-md"
                                        placeholder={t('form.namePlaceholder')}
                                    />
                                </div>
                                <div className="space-y-2 border-b border-chocolate/10 pb-2">
                                    <label htmlFor="telefono" className="text-xs uppercase font-bold text-chocolate/70 tracking-[0.2em] cursor-pointer">{t('form.phoneLabel')}</label>
                                    <input 
                                        type="tel" 
                                        id="telefono"
                                        name="telefono"
                                        required
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-none px-0 py-2 focus:ring-0 outline-none text-chocolate font-sans placeholder:text-chocolate/40 text-md"
                                        placeholder={t('form.phonePlaceholder')}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 border-b border-chocolate/10 pb-2">
                                <label htmlFor="servicio" className="text-xs uppercase font-bold text-chocolate/70 tracking-[0.2em] cursor-pointer">{t('form.serviceLabel')}</label>
                                <div className="relative">
                                    <select 
                                        id="servicio"
                                        name="servicio"
                                        value={formData.servicio}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-none px-0 py-2 focus:ring-0 outline-none text-chocolate font-sans cursor-pointer appearance-none text-md"
                                    >
                                        <option value="">{t('form.serviceDefault')}</option>
                                        <option value="peluqueria">{t('form.servicePeluqueria')}</option>
                                        <option value="color">{t('form.serviceColor')}</option>
                                        <option value="bioterapia">{t('form.serviceBioterapia')}</option>
                                        <option value="estetica">{t('form.serviceEstetica')}</option>
                                        <option value="novias">{t('form.serviceNovias')}</option>
                                        <option value="otros">{t('form.serviceOtros')}</option>
                                    </select>
                                    <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 text-chocolate/40" size={16} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="mensaje" className="text-xs uppercase font-bold text-chocolate/70 tracking-[0.2em] cursor-pointer">{t('form.detailsLabel')}</label>
                                <textarea 
                                    id="mensaje"
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full bg-sand/20 border border-chocolate/10 rounded-2xl p-4 focus:ring-1 focus:ring-accent-aqua focus:bg-white outline-none text-chocolate font-sans placeholder:text-chocolate/40 resize-none text-sm transition-all"
                                    placeholder={t('form.detailsPlaceholder')}
                                ></textarea>
                            </div>

                            {/* Privacy Policy Checkbox */}
                            <div className="flex items-start space-x-3 pt-2">
                                <input 
                                    type="checkbox" 
                                    id="privacidad"
                                    name="privacidad"
                                    required
                                    className="mt-1.5 h-4.5 w-4.5 rounded border-chocolate/20 text-accent-aqua focus:ring-accent-aqua cursor-pointer accent-accent-aqua"
                                />
                                <label htmlFor="privacidad" className="text-xs text-chocolate/85 cursor-pointer leading-tight select-none font-sans">
                                    {t('form.privacyPre')}{' '}
                                    <Link to={lp('/politica-privacidad')} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent-aqua transition-colors font-medium">
                                        {t('form.privacyLink')}
                                    </Link>
                                    {t('form.privacyPost')}
                                </label>
                            </div>

                            {/* Informative Clause (First Layer LOPDGDD/GDPR) - Collapsible */}
                            <div className="border-t border-chocolate/10 pt-4 font-sans normal-case">
                                <button
                                    type="button"
                                    onClick={() => setShowLegal(!showLegal)}
                                    className="flex items-center justify-between w-full text-left text-[11px] md:text-xs font-semibold text-chocolate/90 hover:text-accent-aqua transition-colors duration-300 focus:outline-none"
                                >
                                    <span>{t('legal.title')}</span>
                                    <ChevronDown 
                                        size={16} 
                                        className={`text-chocolate/50 transition-transform duration-300 ${showLegal ? 'rotate-180' : ''}`} 
                                    />
                                </button>
                                <div 
                                    className={`transition-all duration-300 ease-in-out overflow-hidden text-[10px] md:text-[11px] text-chocolate/75 leading-relaxed ${
                                        showLegal ? 'max-h-80 mt-2 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <ul className="list-none space-y-1.5 pl-0 pt-1">
                                        <li><strong>{t('legal.responsableLabel')}</strong> {t('legal.responsable')}</li>
                                        <li><strong>{t('legal.finalidadLabel')}</strong> {t('legal.finalidad')}</li>
                                        <li><strong>{t('legal.legitimacionLabel')}</strong> {t('legal.legitimacion')}</li>
                                        <li><strong>{t('legal.destinatariosLabel')}</strong> {t('legal.destinatarios')}</li>
                                        <li><strong>{t('legal.derechosLabel')}</strong> {t('legal.derechos')}{' '}
                                            <Link to={lp('/politica-privacidad')} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent-aqua font-medium">
                                                {t('legal.derechosLink')}
                                            </Link>{t('legal.derechosPost')}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    variant="coral"
                                    fullWidth
                                    disabled={status === 'sending'}
                                    icon={status !== 'sending' ? ArrowRight : null}
                                    className="shadow-xl spring-bounce hover:shadow-[0_20px_40px_-10px_rgba(253,179,164,0.4)]"
                                >
                                    {status === 'sending' ? t('form.sending') : t('form.submit')}
                                </Button>

                                <p className="text-xs text-center text-chocolate/30 mt-8 uppercase tracking-[0.3em]">
                                    {t('form.footer')}
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reserva;
