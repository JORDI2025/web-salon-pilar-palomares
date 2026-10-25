---
name: actualizar-calendario-biodinamico
description: Guía y flujo automatizado para actualizar el Calendario Lunar y Biodinámico mensual en la web de Salón Pilar Palomares (React + Vite + Vercel). Cubre el procesamiento de imágenes mensuales (cabello, color, depilación/piel, portada, tratamientos), reemplazo de PDF descargable de Secretos del Agua, actualización de textos multilenguaje (ES, EN, DE, FR), sincronización de build y despliegue a producción en Vercel.
---

# Skill Maestra: Actualización del Calendario Biodinámico Mensual
**Salón Pilar Palomares · Peluquería y Estética Orgánica**

Esta skill define el procedimiento exacto y estandarizado para renovar mensualmente la sección y página de **Calendario Biodinámico** (`/calendario-biodinamico`), manteniendo la coherencia de diseño editorial, los enlaces de descarga y el SEO multilingüe.

---

## 1. Materiales que se reciben cada mes

El cliente o diseñador entregará en la raíz del proyecto una carpeta mensual (por ejemplo `CALENDARIO NOVIEMBRE`, `CALENDARIO DICIEMBRE`, etc.) que habitualmente contiene:

1. **PDF Oficial de Secretos del Agua**:
   - Nombre típico: `[MES_NUM]_CB_[MES]-[AÑO]_LOW.pdf` (ej: `11_CB_NOVIEMBRE-2026_LOW.pdf`).
   - Contiene la tabla astronómica del mes: fases lunares (ascendente/descendente), constelaciones, elementos y recomendaciones de cabina (Iluminante, Detox, Antiaging, Sensitivo, Drenante, Piernas Cansadas, Reafirmante, Busto).
2. **Fotografías / Artes del mes** (típicamente 4 o 5 imágenes en JPEG/PNG de alta resolución, procedentes de WhatsApp o material de Secretos del Agua):
   - **Portada**: Fotografía temática de la clienta/modelo frente al tocador o en sintonía con el cosmos.
   - **Cabello (Corte)**: Modelo con cabello tratado, melena sana o rizos.
   - **Coloración**: Textura de barros botánicos, aplicación de pigmentos o cabello coloreado.
   - **Piel (Depilación)**: Espalda, hombros o piel limpia y calmada.
   - **Infografía Cósmica / Tratamientos**: Resumen visual completo del mes con los días y calendarios marcados.

---

## 2. Convención de nombres de archivo (Estandarización)

Cada mes, todas las imágenes deben convertirse a formato **WebP (calidad 90)** y ubicarse en `public/images/`:

| Rol en la Web | Nombre de archivo WebP |
|---|---|
| Portada de la sección | `calendario-cosmos-[mes]-portada-pilar-palomares.webp` |
| 01 · Corte de Cabello | `calendario-cosmos-[mes]-cabello-pilar-palomares.webp` |
| 02 · Coloración | `calendario-cosmos-[mes]-color-pilar-palomares.webp` |
| 03 · Piel / Depilación | `calendario-cosmos-[mes]-piel-pilar-palomares.webp` |
| 04 · Tratamientos / Infograma | `calendario-cosmos-[mes]-completo-pilar-palomares.webp` |

### PDF Descargable:
Copiar el PDF a `public/` con dos alias:
1. El nombre original: `public/[MES_NUM]_CB_[MES]-[AÑO]_LOW.pdf`
2. El alias semántico limpio: `public/calendario-biodinamico-[mes]-[año].pdf`

---

## 3. Script Python de procesamiento de imágenes y PDF

Ejecutar un script en Python rápido utilizando `Pillow` y `shutil` para generar los WebP y copiar el PDF:

```python
import os, shutil
from PIL import Image

mes = "noviembre"  # cambiar al mes en curso
año = "2026"
src_folder = f"CALENDARIO {mes.upper()}"
target_dirs = ["public/images", "dist/images"]

# Mapeo según los archivos entregados
images_map = {
    # Portada
    "WhatsApp Image ... (portada).jpeg": f"calendario-cosmos-{mes}-portada-pilar-palomares.webp",
    # Cabello
    "WhatsApp Image ... (cabello).jpeg": f"calendario-cosmos-{mes}-cabello-pilar-palomares.webp",
    # Color
    "WhatsApp Image ... (color).jpeg": f"calendario-cosmos-{mes}-color-pilar-palomares.webp",
    # Piel
    "WhatsApp Image ... (piel).jpeg": f"calendario-cosmos-{mes}-piel-pilar-palomares.webp",
    # Infograma completo
    "Calendari còsmic...png": f"calendario-cosmos-{mes}-completo-pilar-palomares.webp"
}

for src_name, dest_name in images_map.items():
    p = os.path.join(src_folder, src_name)
    with Image.open(p) as im:
        rgb_im = im.convert("RGB")
        for tdir in target_dirs:
            os.makedirs(tdir, exist_ok=True)
            rgb_im.save(os.path.join(tdir, dest_name), "WEBP", quality=90, method=6)

# Copia de PDFs
for tdir in ["public", "dist"]:
    shutil.copy2(os.path.join(src_folder, f"11_CB_{mes.upper()}-{año}_LOW.pdf"), os.path.join(tdir, f"calendario-biodinamico-{mes}-{año}.pdf"))
    shutil.copy2(os.path.join(src_folder, f"11_CB_{mes.upper()}-{año}_LOW.pdf"), os.path.join(tdir, f"11_CB_{mes.upper()}-{año}_LOW.pdf"))
```

---

## 4. Estructura de Textos y Traducciones

Actualizar los 4 archivos en `src/locales/calendario-biodinamico/`:
- `es.json` (Español)
- `en.json` (Inglés)
- `de.json` (Alemán)
- `fr.json` (Francés)

### Esquema de claves requeridas:
```json
{
  "seo": {
    "title": "Calendario Lunar y Biodinámico [Mes] [Año]",
    "description": "Calendario biodinámico lunar para el cuidado del cabello y la piel en [Mes] [Año] en Salón Pilar Palomares..."
  },
  "agosto": {
    "eyebrow": "Ciclos y Ventanas Favorables",
    "introText1": "...",
    "introText2": "...",
    "downloadBtn": "Bájate el calendario de [Mes]",
    "imgAlt1": "Calendario del Cosmos [Mes] [Año]",
    "title1": "Calendario",
    "title2": "de [Mes] [Año]",
    "introTitle1": "El mes de la serenidad",
    "introTitle2": "y la nutrición"
  },
  "corte": {
    "desc": "El cabello responde a los ciclos lunares...",
    "label1_2_27_29": "Del ... al ...",
    "d1_2_27_29": "Momento para cortar y sanear puntas...",
    "label2_5_29_31": "Del ... al ...",
    "d2_5_29_31": "Corte para fortalecer y reducir caída...",
    "label11_22": "Del ... al ...",
    "d11_22": "Cuidar el rizo y definir forma natural...",
    "label15_18": "Del ... al ...",
    "d15_18": "Crecimiento y renovación saludable..."
  },
  "color": {
    "desc": "La luna influye en cómo el cabello absorbe y retiene el color...",
    "label12_15": "Del ... al ...",
    "d12_15": "Aplicar color e intensificar tonos...",
    "label15_18": "Del ... al ...",
    "d15_18": "Fijación y mayor duración del color...",
    "label18_20": "Del ... al ...",
    "d18_20": "Potenciar el brillo y luminosidad..."
  },
  "depil": {
    "desc": "La luna descendente favorece los procesos de depilación...",
    "label18_20": "Del ... al ...",
    "d18_20": "Fase de luna descendente para retrasar el crecimiento del vello..."
  },
  "treat": {
    "desc": "La piel y el cuerpo se benefician enormemente al sincronizar los cuidados con los ciclos del cosmos...",
    "label2_15": "Del ... al ... (Luna ascendente)",
    "d2_15": "Tratamientos Iluminantes, Detox e Hidratación Celular (mañanas)...",
    "label18_20": "Del ... al ... (Luna descendente)",
    "d18_20": "Tratamientos Antiaging, Sensitivo, Drenante, Reafirmante y Busto (tardes/noches)...",
    "label20_31": "Recomendación biodinámica",
    "d20_31": "Evitar tratamientos invasivos en días desfavorables (nodos, perigeos, eclipses)."
  }
}
```

---

## 5. Componente React (`src/pages/CalendarioBiodinamico.jsx`)

1. Verificar que el botón de descarga apunte al nuevo PDF:
   ```jsx
   <Button 
       href={`/calendario-biodinamico-${mes}-${año}.pdf`}
       download={`calendario-biodinamico-${mes}-${año}.pdf`}
       target="_blank"
       rel="noopener noreferrer"
       variant="primary"
   >
       {t('agosto.downloadBtn')}
   </Button>
   ```
2. Verificar las rutas de las imágenes en las 4 secciones (`/images/calendario-cosmos-[mes]-*.webp`).

---

## 6. Previsualización y Servidor Local

- Si se corre el servidor local `node server.cjs`, verificar en:
  `http://localhost:5173/calendario-biodinamico`
- Se puede usar el agente de navegador para verificar que el título, las fotos y el botón de descarga funcionen sin errores en consola.

---

## 7. Despliegue en Vercel

1. Añadir y commitear los cambios:
   ```bash
   git add src/ public/
   git commit -m "feat(calendario): actualizar a [Mes] [Año] con nuevas imagenes y PDF"
   ```
2. Enviar a GitHub:
   ```bash
   git push origin main
   ```
3. Vercel desplegará automáticamente la nueva versión en:
   **https://salonpilarpalomares.com/calendario-biodinamico**
   (y en la URL del proyecto `web-salon-pilar-palomares.vercel.app`).
4. Comprobar mediante petición HTTP que la URL en producción responde con código 200 y contiene los textos del mes nuevo.
