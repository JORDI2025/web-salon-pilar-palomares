import React from 'react';

const Sello = ({ name, className = "" }) => {
  const svgClass = `w-full h-full select-none pointer-events-none ${className}`;

  switch (name) {
    case 'agua-tierra':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" color="currentColor" className={svgClass} role="img">
          <title>Water &amp; Earth — Conscious Beauty</title>
          <defs>
            <path id="sello-agua-top" d="M 30,100 A 70,70 0 0 1 170,100"/>
            <path id="sello-agua-bot" d="M 19,100 A 81,81 0 0 0 181,100"/>
          </defs>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="2.5" fill="currentColor">
            <textPath href="#sello-agua-top" startOffset="50%" text-anchor="middle">WATER &amp; EARTH</textPath>
          </text>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="4" fill="currentColor">
            <textPath href="#sello-agua-bot" startOffset="50%" text-anchor="middle">CONSCIOUS BEAUTY</textPath>
          </text>
          <circle cx="24.5" cy="100" r="2" fill="currentColor"/>
          <circle cx="175.5" cy="100" r="2" fill="currentColor"/>
          <g stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 100,58 C 100,58 84,78 84,90 A 16,16 0 0 0 116,90 C 116,78 100,58 100,58 Z"/>
            <path d="M 68,120 Q 76,114 84,120 T 100,120 T 116,120 T 132,120"/>
            <path d="M 72,140 A 40,40 0 0 1 128,140"/>
          </g>
        </svg>
      );

    case 'barros-organicos':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" color="currentColor" className={svgClass} role="img">
          <title>Organic Muds &amp; Oils — Color Culture</title>
          <defs>
            <path id="sello-barros-top" d="M 30,100 A 70,70 0 0 1 170,100"/>
            <path id="sello-barros-bot" d="M 19,100 A 81,81 0 0 0 181,100"/>
          </defs>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="2.5" fill="currentColor">
            <textPath href="#sello-barros-top" startOffset="50%" text-anchor="middle">ORGANIC MUDS &amp; OILS</textPath>
          </text>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="4" fill="currentColor">
            <textPath href="#sello-barros-bot" startOffset="50%" text-anchor="middle">COLOR CULTURE</textPath>
          </text>
          <circle cx="24.5" cy="100" r="2" fill="currentColor"/>
          <circle cx="175.5" cy="100" r="2" fill="currentColor"/>
          <g stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 70,110 H 130"/>
            <path d="M 74,110 A 26,26 0 0 0 126,110"/>
            <path d="M 100,110 C 100,100 100,94 100,80"/>
            <path d="M 100,96 Q 87,94 83,79 Q 96,81 100,96 Z"/>
            <path d="M 100,88 Q 113,86 117,71 Q 104,73 100,88 Z"/>
          </g>
          <circle cx="90" cy="120" r="2.2" fill="currentColor"/>
          <circle cx="109" cy="122" r="2.2" fill="currentColor"/>
        </svg>
      );

    case 'bioterapias':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" color="currentColor" className={svgClass} role="img">
          <title>Biotherapies — Integrative Health</title>
          <defs>
            <path id="sello-bioterapias-top" d="M 30,100 A 70,70 0 0 1 170,100"/>
            <path id="sello-bioterapias-bot" d="M 19,100 A 81,81 0 0 0 181,100"/>
          </defs>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="2.5" fill="currentColor">
            <textPath href="#sello-bioterapias-top" startOffset="50%" text-anchor="middle">BIOTHERAPIES</textPath>
          </text>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="4" fill="currentColor">
            <textPath href="#sello-bioterapias-bot" startOffset="50%" text-anchor="middle">INTEGRATIVE HEALTH</textPath>
          </text>
          <circle cx="24.5" cy="100" r="2" fill="currentColor"/>
          <circle cx="175.5" cy="100" r="2" fill="currentColor"/>
          <g stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 100,66 Q 90,84 100,106 Q 110,84 100,66 Z"/>
            <path d="M 100,106 Q 81,102 73,82 Q 91,86 100,106 Z"/>
            <path d="M 100,106 Q 119,102 127,82 Q 109,86 100,106 Z"/>
            <path d="M 76,118 A 32,32 0 0 0 124,118"/>
            <path d="M 86,128 A 22,22 0 0 0 114,128"/>
          </g>
        </svg>
      );

    case 'botanica-celular':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" color="currentColor" className={svgClass} role="img">
          <title>Cellular Botanics — Hair Health</title>
          <defs>
            <path id="sello-celular-top" d="M 30,100 A 70,70 0 0 1 170,100"/>
            <path id="sello-celular-bot" d="M 19,100 A 81,81 0 0 0 181,100"/>
          </defs>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="2.5" fill="currentColor">
            <textPath href="#sello-celular-top" startOffset="50%" text-anchor="middle">CELLULAR BOTANICS</textPath>
          </text>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="4" fill="currentColor">
            <textPath href="#sello-celular-bot" startOffset="50%" text-anchor="middle">HAIR HEALTH</textPath>
          </text>
          <circle cx="24.5" cy="100" r="2" fill="currentColor"/>
          <circle cx="175.5" cy="100" r="2" fill="currentColor"/>
          <g stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="100" cy="100" r="30"/>
            <path d="M 88,114 Q 86,90 112,84 Q 114,108 88,114 Z"/>
            <path d="M 88,114 Q 102,102 112,84"/>
          </g>
        </svg>
      );

    case 'calendario-biodinamico':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" color="currentColor" className={svgClass} role="img">
          <title>Biodynamic Calendar — Lunar Rhythms</title>
          <defs>
            <path id="sello-calendario-top" d="M 30,100 A 70,70 0 0 1 170,100"/>
            <path id="sello-calendario-bot" d="M 19,100 A 81,81 0 0 0 181,100"/>
          </defs>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="2.5" fill="currentColor">
            <textPath href="#sello-calendario-top" startOffset="50%" text-anchor="middle">BIODYNAMIC CALENDAR</textPath>
          </text>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="4" fill="currentColor">
            <textPath href="#sello-calendario-bot" startOffset="50%" text-anchor="middle">LUNAR RHYTHMS</textPath>
          </text>
          <circle cx="24.5" cy="100" r="2" fill="currentColor"/>
          <circle cx="175.5" cy="100" r="2" fill="currentColor"/>
          <path d="M 106,68 A 32,32 0 0 0 106,132 A 40,40 0 0 1 106,68 Z" fill="currentColor"/>
          <path d="M 132,68 Q 134,78 144,80 Q 134,82 132,92 Q 130,82 120,80 Q 130,78 132,68 Z" fill="currentColor"/>
          <circle cx="126" cy="118" r="2.5" fill="currentColor"/>
        </svg>
      );

    case 'cultura-forma':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" color="currentColor" className={svgClass} role="img">
          <title>Handcrafted Cut — Form Culture</title>
          <defs>
            <path id="sello-forma-top" d="M 30,100 A 70,70 0 0 1 170,100"/>
            <path id="sello-forma-bot" d="M 19,100 A 81,81 0 0 0 181,100"/>
          </defs>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="2.5" fill="currentColor">
            <textPath href="#sello-forma-top" startOffset="50%" text-anchor="middle">HANDCRAFTED CUT</textPath>
          </text>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="4" fill="currentColor">
            <textPath href="#sello-forma-bot" startOffset="50%" text-anchor="middle">FORM CULTURE</textPath>
          </text>
          <circle cx="24.5" cy="100" r="2" fill="currentColor"/>
          <circle cx="175.5" cy="100" r="2" fill="currentColor"/>
          <g stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 89,60 L 110,115"/>
            <path d="M 111,60 L 90,115"/>
            <circle cx="86" cy="123" r="9"/>
            <circle cx="114" cy="123" r="9"/>
          </g>
          <circle cx="100" cy="88.8" r="2.5" fill="currentColor"/>
        </svg>
      );

    case 'pilar-palomares':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" color="currentColor" className={svgClass} role="img">
          <title>Pilar Palomares — Torre de Benagalbón</title>
          <defs>
            <path id="sello-salon-top" d="M 30,100 A 70,70 0 0 1 170,100"/>
            <path id="sello-salon-bot" d="M 19,100 A 81,81 0 0 0 181,100"/>
          </defs>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="2.5" fill="currentColor">
            <textPath href="#sello-salon-top" startOffset="50%" text-anchor="middle">PILAR PALOMARES</textPath>
          </text>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="4" fill="currentColor">
            <textPath href="#sello-salon-bot" startOffset="50%" text-anchor="middle">TORRE DE BENAGALBÓN</textPath>
          </text>
          <circle cx="24.5" cy="100" r="2" fill="currentColor"/>
          <circle cx="175.5" cy="100" r="2" fill="currentColor"/>
          <g stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="100" cy="88" r="16"/>
            <path d="M 100,64 L 100,56"/>
            <path d="M 83,71 L 77,65"/>
            <path d="M 117,71 L 123,65"/>
            <path d="M 76,88 L 68,88"/>
            <path d="M 124,88 L 132,88"/>
            <path d="M 68,116 Q 76,111 84,116 T 100,116 T 116,116 T 132,116"/>
            <path d="M 82,128 Q 88,123 94,128 T 106,128 T 118,128"/>
          </g>
        </svg>
      );

    case 'sin-toxicos':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" color="currentColor" className={svgClass} role="img">
          <title>Toxin-Free Formulas — Pure Botanics</title>
          <defs>
            <path id="sello-toxicos-top" d="M 30,100 A 70,70 0 0 1 170,100"/>
            <path id="sello-toxicos-bot" d="M 19,100 A 81,81 0 0 0 181,100"/>
          </defs>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="2.5" fill="currentColor">
            <textPath href="#sello-toxicos-top" startOffset="50%" text-anchor="middle">TOXIN-FREE FORMULAS</textPath>
          </text>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="4" fill="currentColor">
            <textPath href="#sello-toxicos-bot" startOffset="50%" text-anchor="middle">PURE BOTANICS</textPath>
          </text>
          <circle cx="24.5" cy="100" r="2" fill="currentColor"/>
          <circle cx="175.5" cy="100" r="2" fill="currentColor"/>
          <g stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 100,62 C 110,68 120,71 129,71 C 129,99 118,121 100,132 C 82,121 71,99 71,71 C 80,71 90,68 100,62 Z"/>
            <path d="M 100,118 C 100,108 100,100 100,86"/>
            <path d="M 100,104 Q 89,102 86,89 Q 98,91 100,104 Z"/>
            <path d="M 100,96 Q 111,94 114,81 Q 102,83 100,96 Z"/>
          </g>
        </svg>
      );

    case 'agua-biopolar':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" color="currentColor" className={svgClass} role="img">
          <title>Biopolar Water — Vital Energy</title>
          <defs>
            <path id="sello-biopolar-top" d="M 30,100 A 70,70 0 0 1 170,100"/>
            <path id="sello-biopolar-bot" d="M 19,100 A 81,81 0 0 0 181,100"/>
          </defs>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="2.5" fill="currentColor">
            <textPath href="#sello-biopolar-top" startOffset="50%" text-anchor="middle">BIOPOLAR WATER</textPath>
          </text>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="4" fill="currentColor">
            <textPath href="#sello-biopolar-bot" startOffset="50%" text-anchor="middle">VITAL ENERGY</textPath>
          </text>
          <circle cx="24.5" cy="100" r="2" fill="currentColor"/>
          <circle cx="175.5" cy="100" r="2" fill="currentColor"/>
          <path d="M 100,58 Q 102,68 112,70 Q 102,72 100,82 Q 98,72 88,70 Q 98,68 100,58 Z" fill="currentColor"/>
          <g stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 68,100 Q 76,94 84,100 T 100,100 T 116,100 T 132,100"/>
            <path d="M 68,114 Q 76,108 84,114 T 100,114 T 116,114 T 132,114"/>
            <path d="M 68,128 Q 76,122 84,128 T 100,128 T 116,128 T 132,128"/>
          </g>
        </svg>
      );

    case 'botanica':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" color="currentColor" className={svgClass} role="img">
          <title>Botanics — Living Earth</title>
          <defs>
            <path id="sello-botanica-top" d="M 30,100 A 70,70 0 0 1 170,100"/>
            <path id="sello-botanica-bot" d="M 19,100 A 81,81 0 0 0 181,100"/>
          </defs>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="2.5" fill="currentColor">
            <textPath href="#sello-botanica-top" startOffset="50%" text-anchor="middle">BOTANICS</textPath>
          </text>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="4" fill="currentColor">
            <textPath href="#sello-botanica-bot" startOffset="50%" text-anchor="middle">LIVING EARTH</textPath>
          </text>
          <circle cx="24.5" cy="100" r="2" fill="currentColor"/>
          <circle cx="175.5" cy="100" r="2" fill="currentColor"/>
          <g stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 68,122 Q 100,112 132,122"/>
            <path d="M 100,117 C 100,106 100,98 100,84"/>
            <path d="M 100,102 Q 86,100 82,84 Q 95,86 100,102 Z"/>
            <path d="M 100,92 Q 114,90 118,74 Q 105,76 100,92 Z"/>
          </g>
          <circle cx="80" cy="132" r="2" fill="currentColor"/>
          <circle cx="100" cy="134" r="2" fill="currentColor"/>
          <circle cx="120" cy="132" r="2" fill="currentColor"/>
        </svg>
      );

    case 'holistico':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" color="currentColor" className={svgClass} role="img">
          <title>Holistic Care — Balance</title>
          <defs>
            <path id="sello-holistico-top" d="M 30,100 A 70,70 0 0 1 170,100"/>
            <path id="sello-holistico-bot" d="M 19,100 A 81,81 0 0 0 181,100"/>
          </defs>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="2.5" fill="currentColor">
            <textPath href="#sello-holistico-top" startOffset="50%" text-anchor="middle">HOLISTIC CARE</textPath>
          </text>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="4" fill="currentColor">
            <textPath href="#sello-holistico-bot" startOffset="50%" text-anchor="middle">BALANCE</textPath>
          </text>
          <circle cx="24.5" cy="100" r="2" fill="currentColor"/>
          <circle cx="175.5" cy="100" r="2" fill="currentColor"/>
          <g stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 100,128 C 90,119 70,106 70,90 A 16,16 0 0 1 100,86 A 16,16 0 0 1 130,90 C 130,106 110,119 100,128 Z"/>
            <path d="M 84,104 Q 92,98 100,104 T 116,104"/>
          </g>
        </svg>
      );

    case 'sin-quimicos':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none" color="currentColor" className={svgClass} role="img">
          <title>Chemical Free — Maximum Purity</title>
          <defs>
            <path id="sello-quimicos-top" d="M 30,100 A 70,70 0 0 1 170,100"/>
            <path id="sello-quimicos-bot" d="M 19,100 A 81,81 0 0 0 181,100"/>
          </defs>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="2.5" fill="currentColor">
            <textPath href="#sello-quimicos-top" startOffset="50%" text-anchor="middle">CHEMICAL FREE</textPath>
          </text>
          <text font-family="Wensley, Georgia, 'Times New Roman', serif" font-size="12" letter-spacing="4" fill="currentColor">
            <textPath href="#sello-quimicos-bot" startOffset="50%" text-anchor="middle">MAXIMUM PURITY</textPath>
          </text>
          <circle cx="24.5" cy="100" r="2" fill="currentColor"/>
          <circle cx="175.5" cy="100" r="2" fill="currentColor"/>
          <g stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M 89,62 H 111"/>
            <path d="M 93,62 L 93,78"/>
            <path d="M 107,62 L 107,78"/>
            <path d="M 93,78 L 76,116 C 73,123 77,128 84,128 L 116,128 C 123,128 127,123 124,116 L 107,78"/>
            <path d="M 82,114 H 118"/>
            <path d="M 70,64 L 130,132"/>
          </g>
        </svg>
      );

    default:
      return null;
  }
};

export default Sello;
