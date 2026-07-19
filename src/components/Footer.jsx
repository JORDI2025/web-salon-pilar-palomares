import { Instagram, Facebook, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLang } from '../langContext';

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

const ElegantDrop = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    className={className}
  >
    <path 
      d="M12 21.5C16.1421 21.5 19.5 18.1421 19.5 14C19.5 9.85786 12 2.5 12 2.5C12 2.5 4.5 9.85786 4.5 14C4.5 18.1421 7.85786 21.5 12 21.5Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M16 14C16 16.2091 14.2091 18 12 18" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      opacity="0.4"
    />
  </svg>
);

const Footer = () => {
    const { t } = useTranslation();
    const { lp } = useLang();
    const logoFilter = "brightness(0) saturate(100%) invert(19%) sepia(12%) saturate(995%) hue-rotate(314deg) brightness(93%) contrast(85%)";

    return (
        <footer className="relative bg-white border-t border-chocolate/5 overflow-hidden w-full">
            <div 
                className="absolute inset-0 z-0 opacity-85 pointer-events-none"
                style={{ 
                    backgroundImage: "url('/images/shared/footer-textura-organica-pilar-palomares-malaga.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat',
                    mixBlendMode: 'multiply'
                }}
            ></div>
            <div className="max-w-7xl mx-auto relative z-10 pt-3 md:pt-16 pb-8 md:pb-10 px-6 lg:px-20">
                
                {/* 📱 Mobile version (flat stack with precise pixel gaps) */}
                <div className="flex flex-col items-center md:hidden mt-5 mb-4">
                    <img 
                        src="/logo-salon-pilar-palomares-malaga.webp" 
                        alt="Logo Salón Pilar Palomares - Especialistas en Bioterapia en Málaga" 
                        className="h-10 w-auto mt-4"
                        style={{ filter: logoFilter }}
                    />
                    <div className="flex items-center space-x-2 mt-2.5">
                        <ElegantDrop size={22} className="text-chocolate/80" />
                        <span className="text-[15px] font-serif text-chocolate whitespace-nowrap">
                            {t('footer.boutiqueAutorizada')}
                        </span>
                    </div>
                    <img 
                        src="/logo-secretos-del-agua.webp" 
                        alt="Secretos del Agua Boutique Autorizada" 
                        className="h-28 w-auto grayscale contrast-125 opacity-80 -mt-7"
                    />
                </div>

                {/* 💻 Tablet / Desktop version */}
                <div className="hidden md:flex flex-row justify-between items-center mb-10 gap-8 min-h-[120px]">
                    <div className="flex-1 flex justify-start items-center">
                        <img 
                            src="/logo-salon-pilar-palomares-malaga.webp" 
                            alt="Logo Salón Pilar Palomares - Especialistas en Bioterapia en Málaga" 
                            className="h-16 w-auto"
                            style={{ filter: logoFilter }}
                        />
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center space-x-3 z-10 relative transform translate-y-10">
                                <ElegantDrop size={24} className="text-chocolate/80 md:w-6 lg:w-[28px]" />
                                <span className="text-xl lg:text-2xl font-serif text-chocolate whitespace-nowrap">
                                    {t('footer.boutiqueAutorizada')}
                                </span>
                            </div>
                            <img 
                                src="/logo-secretos-del-agua.webp" 
                                alt="Secretos del Agua Boutique Autorizada" 
                                className="h-52 w-auto grayscale contrast-125 opacity-80 -mt-6"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full h-[1px] bg-chocolate/25 mb-6 md:mb-12"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 lg:gap-12 mb-10 md:mb-16 text-center md:text-left items-stretch">
                    
                    <div className="flex flex-col h-full items-center md:items-start md:col-span-1 border-b md:border-b-0 border-chocolate/20 pb-10 md:pb-0">
                        <h4 className="font-serif text-xl md:text-lg lg:text-2xl mb-4 md:mb-6 lg:mb-8 text-chocolate uppercase tracking-wider">{t('footer.contacto')}</h4>
                        <div className="relative z-20 flex flex-col justify-between flex-grow w-full text-base md:text-xs lg:text-base text-chocolate/80 font-sans">
                            <div className="leading-relaxed mb-4 md:mb-6">
                                <p className="font-medium text-chocolate/80">C/ Axarquía 21, Local 3</p>
                                <p>29738 Torre de Benagalbón, Málaga</p>
                            </div>
                            <div className="flex flex-col items-center md:items-start gap-y-1.5 mb-4 md:mb-6 text-sm md:text-xs whitespace-nowrap">
                                <a href="tel:+34952972134" className="flex items-center group hover:text-accent-aqua transition-colors font-medium">
                                    <Phone size={16} className="text-chocolate/80 mr-2 group-hover:text-accent-aqua transition-colors" />
                                    <span>+34 952 97 21 34</span>
                                </a>
                                <span className="hidden">|</span>
                                <a href="https://wa.me/34642275906?text=Hola,%20me%20gustaría%20solicitar%20un%20diagnóstico%20o%20cita%20en%20el%20salón." target="_blank" rel="noopener noreferrer" className="flex items-center group hover:text-accent-aqua transition-colors font-medium">
                                    <WhatsAppIcon size={16} className="text-chocolate/80 mr-2 group-hover:text-accent-aqua transition-colors" />
                                    <span>+34 642 27 59 06</span>
                                </a>
                            </div>
                            <div>
                                <a href="mailto:salonestilistapilar@gmail.com" className="leading-relaxed hover:text-accent-aqua transition-colors block break-all lg:break-normal font-medium text-base md:text-xs lg:text-base">
                                    salonestilistapilar@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col h-full items-center md:items-start md:col-span-1 border-b md:border-b-0 border-chocolate/20 pb-10 md:pb-0">
                        <h4 className="font-serif text-xl md:text-lg lg:text-2xl mb-4 md:mb-6 lg:mb-8 text-chocolate uppercase tracking-wider">{t('footer.horario')}</h4>
                        <div className="relative z-20 flex flex-col space-y-3 lg:space-y-4 flex-grow w-full text-base md:text-xs lg:text-base text-chocolate/80 font-sans normal-case">
                            <div>
                                <p className="font-semibold text-chocolate/90 uppercase tracking-wider text-[11px] lg:text-xs mb-1">{t('footer.lunesSabados')}</p>
                                <p className="font-medium text-chocolate/80">9:00 – 13:30</p>
                            </div>
                            <div>
                                <p className="font-semibold text-chocolate/90 uppercase tracking-wider text-[11px] lg:text-xs mb-1">{t('footer.martesViernes')}</p>
                                <p className="font-medium text-chocolate/80">9:00 – 18:00</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col h-full items-center md:items-start text-center md:text-left">
                        <h4 className="font-serif text-xl md:text-lg lg:text-2xl mb-4 md:mb-6 lg:mb-8 text-chocolate uppercase tracking-wider">{t('footer.explora')}</h4>
                        <ul className="relative z-20 flex flex-col space-y-2 lg:space-y-3 flex-grow w-full text-base md:text-xs lg:text-base text-chocolate/80 font-sans">
                            <li><Link to={lp('/')} className="hover:text-accent-aqua hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] block py-0.5">{t('nav.inicio').charAt(0).toUpperCase() + t('nav.inicio').slice(1).toLowerCase()}</Link></li>
                            <li><Link to={lp('/nuestra-esencia')} className="hover:text-accent-aqua hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] block py-0.5">{t('nav.nuestraEsencia')}</Link></li>
                            <li><Link to={lp('/equipo')} className="hover:text-accent-aqua hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] block py-0.5">{t('nav.equipo')}</Link></li>
                            <li><Link to={lp('/contacto')} className="hover:text-accent-aqua hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] block py-0.5">{t('nav.contacto')}</Link></li>
                            <li><Link to={lp('/calendario-biodinamico')} className="hover:text-accent-aqua hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] block py-0.5">{t('nav.calendario')}</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col h-full items-center md:items-start text-center md:text-left">
                        <h4 className="font-serif text-xl md:text-lg lg:text-2xl mb-4 md:mb-6 lg:mb-8 text-chocolate uppercase tracking-wider">{t('footer.servicios')}</h4>
                        <ul className="relative z-20 flex flex-col space-y-2 lg:space-y-3 flex-grow w-full text-base md:text-xs lg:text-base text-chocolate/80 font-sans">
                            <li><Link to={lp('/cultura-de-color')} className="hover:text-accent-aqua hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] block py-0.5">{t('nav.culturaDeColor')}</Link></li>
                            <li><Link to={lp('/cultura-de-la-forma')} className="hover:text-accent-aqua hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] block py-0.5">{t('nav.culturaDeLaForma')}</Link></li>
                            <li><Link to={lp('/estetica')} className="hover:text-accent-aqua hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] block py-0.5">{t('nav.estetica')}</Link></li>
                            <li><Link to={lp('/bioterapias')} className="hover:text-accent-aqua hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] block py-0.5">{t('nav.bioterapias')}</Link></li>
                            <li><Link to={lp('/eventos')} className="hover:text-accent-aqua hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] block py-0.5">{t('nav.eventos')}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center pt-6 md:pt-8 border-t border-chocolate/20 space-y-8 md:space-y-12">
                    {/* Social Media Section with 3D Floating Effect and Original Color */}
                    <div className="flex items-center space-x-8 md:space-x-10 p-4 md:p-5 bg-offwhite/50 rounded-full text-chocolate/50 shadow-[0_12px_36px_-6px_rgba(60,47,47,0.22)] border border-chocolate/10 transition-all duration-500 hover:shadow-[0_24px_48px_-8px_rgba(60,47,47,0.32)] hover:-translate-y-1.5 backdrop-blur-sm">
                        <a href="https://www.facebook.com/Salonpilarpalomares" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Salón Pilar Palomares" className="hover:text-accent-aqua transition-all duration-300 hover:scale-110">
                            <Facebook size={28} strokeWidth={1.5} />
                        </a>
                        <a href="https://www.instagram.com/salonpilarpalomares/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Salón Pilar Palomares" className="hover:text-accent-aqua transition-all duration-300 hover:scale-110">
                            <Instagram size={28} strokeWidth={1.5} />
                        </a>
                        <a href="https://www.tiktok.com/@salon.pilarpalomares" target="_blank" rel="noopener noreferrer" aria-label="TikTok de Salón Pilar Palomares" className="hover:text-accent-aqua transition-all duration-300 hover:scale-110">
                            <TikTokIcon size={27} />
                        </a>
                    </div>

                    <div className="flex flex-col items-center">
                        {/* Legal Links - Scaled down for elegance */}
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.25em] font-bold text-chocolate/50 text-center mb-6">
                            <Link to={lp('/aviso-legal')} className="hover:text-accent-aqua transition-colors duration-300">{t('footer.avisoLegal')}</Link>
                            <Link to={lp('/politica-privacidad')} className="hover:text-accent-aqua transition-colors duration-300">{t('footer.privacidad')}</Link>
                            <Link to={lp('/cookies')} className="hover:text-accent-aqua transition-colors duration-300">{t('footer.cookies')}</Link>
                        </div>

                        {/* Copyright - Minimalist */}
                        <p className="text-xs text-chocolate/40 uppercase tracking-[0.2em] text-center font-medium">
                            © {new Date().getFullYear()} {t('footer.copyright')}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
