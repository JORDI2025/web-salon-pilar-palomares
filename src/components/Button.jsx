import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../langContext';

/**
 * Botón unificado del sistema de diseño "Earth Edition 2026".
 *
 * Reglas de unificación:
 *  - UN único tamaño base (definido en `.btn` de index.css): mismo padding,
 *    misma altura mínima, misma tipografía interna (Just Sans 600, 11px,
 *    tracking 0.22em, uppercase) en TODOS los botones de la web.
 *  - Las variantes solo cambian color/relleno, nunca el tamaño ni la letra.
 *  - `size="sm"` reduce padding manteniendo idéntico estilo de texto.
 */
const VARIANT_CLASS = {
  primary: 'btn-primary',
  // 'coral' se mantiene como alias por compatibilidad pero ahora renderiza
  // el aqua de marca (el coral no combinaba bien con la paleta).
  coral: 'btn-primary',
  secondary: 'btn-glass',
  glass: 'btn-glass',
  'glass-green': 'btn-primary',
  outline: 'btn-outline',
  'outline-aqua': 'btn-outline-aqua',
  'glass-outline-aqua': 'btn-outline-aqua',
};

const Button = ({
  to,
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',          // 'md' | 'sm'
  className = '',
  icon: Icon,
  fullWidth = false,
  target,
  rel,
  type = 'button',
  ...props
}) => {
  // Los enlaces internos se localizan automáticamente según el idioma activo
  // ('/reserva' -> '/de/reserva'), así las páginas no tienen que hacerlo.
  const { lp } = useLang();
  const variantClass = VARIANT_CLASS[variant] || 'btn-primary';
  const sizeClass = size === 'sm' ? 'btn-sm' : '';
  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClassName = `group ${variantClass} ${sizeClass} ${widthClass} ${className}`.replace(/\s+/g, ' ').trim();

  const content = (
    <>
      <span>{children}</span>
      {Icon && (
        <Icon
          size={15}
          strokeWidth={2}
          className="ml-1 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={lp(to)} className={combinedClassName} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClassName} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName} {...props}>
      {content}
    </button>
  );
};

export default Button;
