import React from 'react';
import SEO from '../components/SEO';

const AvisoLegal = () => {
    return (
        <div className="bg-offwhite min-h-screen pt-40 pb-24 px-6 lg:px-12">
            <SEO title="Aviso Legal" noindex={true} canonical="/aviso-legal" description="Aviso legal de Salón Pilar Palomares, peluquería orgánica en Torre de Benagalbón, Málaga. Información sobre términos de uso y condiciones legales." description="Aviso legal de Salón Pilar Palomares, peluquería orgánica en Torre de Benagalbón, Málaga. Información sobre términos de uso y condiciones legales." />
            <div className="max-w-4xl mx-auto font-sans text-chocolate/80">
                <h1 className="text-4xl md:text-5xl font-serif text-chocolate mb-12 text-center">Aviso Legal</h1>
                
                <div className="space-y-8 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-serif text-chocolate mb-4">1. Datos Identificativos</h2>
                        <p>En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos: la empresa titular de dominio web es Salón Pilar Palomares (en adelante, la Empresa), con domicilio a estos efectos en C/ Axarquía 21, Local 3, 29738 Torre de Benagalbón, Málaga. Correo electrónico de contacto: salonestilistapilar@gmail.com del sitio web. Teléfono de contacto: +34 952 97 21 34.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-serif text-chocolate mb-4">2. Usuarios</h2>
                        <p>El acceso y/o uso de este portal de Salón Pilar Palomares atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-chocolate mb-4">3. Propiedad Intelectual e Industrial</h2>
                        <p>Salón Pilar Palomares por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, etc.). Todos los derechos reservados.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-chocolate mb-4">4. Exclusión de Garantías y Responsabilidad</h2>
                        <p>Salón Pilar Palomares no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AvisoLegal;
