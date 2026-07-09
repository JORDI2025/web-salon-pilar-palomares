/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // === Anclas de marca (no cambian) ===
        chocolate: '#3C2F2F',      // Chocolate Profundo — texto, marca, secciones oscuras
        offwhite: '#F9F7F2',       // Beige Hueso — fondo base
        'gray-stone': '#4A4A4A',   // Gris piedra — párrafos largos
        sand: '#E8E2D6',           // Arena — bordes y texturas suaves
        'sand-tostado': '#C19A6B', // Marrón tostado
        beige: '#F5F5DC',

        // === Acento principal (armoniza con el menta de la paleta) ===
        'accent-aqua': '#85B7B2',  // Azul Agua Mate — CTA primario, iconos, acentos
        eucalyptus: '#778A6E',     // Botánico
        sage: '#8DA399',           // Verde salvia

        // === Paleta pastel Canva (integrada como evolución suave, tonos apagados) ===
        mint: '#B8CEC2',           // Menta — washes botánicos suaves
        cream: '#F4F1EA',          // Crema muy apagada — casi neutra, leve calidez
        peach: '#E6DED4',          // Greige apagado — sustituye al melocotón (sin tono naranja/rosa)
        coral: '#85B7B2',          // (alias) reconducido al aqua de marca; el coral no combinaba
        'sage-mist': '#D1DBCD',    // Salvia bruma — separadores y fondos tenues
      },
      fontFamily: {
        serif: ['"Wensley"', '"Wensley Fallback"', 'Georgia', 'serif'],
        sans: ['"Just Sans"', '"Just Sans Fallback"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 1s cubic-bezier(0.19,1,0.22,1) forwards',
        'fade-in': 'fade-in 1.2s cubic-bezier(0.19,1,0.22,1) forwards',
        'scale-in': 'scale-in 0.9s cubic-bezier(0.19,1,0.22,1) forwards',
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
