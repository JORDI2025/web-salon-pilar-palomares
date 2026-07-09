import React from 'react';
import SEO from '../components/SEO';

const Cookies = () => {
    return (
        <div className="bg-offwhite min-h-screen pt-40 pb-24 px-6 lg:px-12">
            <SEO title="Política de Cookies" noindex={true} canonical="/cookies" description="Política de cookies de Salón Pilar Palomares. Información sobre el uso de cookies y almacenamiento local de datos en nuestro sitio web." description="Política de cookies de Salón Pilar Palomares. Información sobre el uso de cookies y almacenamiento local de datos en nuestro sitio web." />
            <div className="max-w-4xl mx-auto font-sans text-chocolate/80">
                <h1 className="text-4xl md:text-5xl font-serif text-chocolate mb-12 text-center">Política de Cookies</h1>
                
                <div className="space-y-8 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-serif text-chocolate mb-4">1. ¿Qué son las cookies?</h2>
                        <p>Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-serif text-chocolate mb-4">2. Tipos de cookies utilizadas</h2>
                        <p>Esta página web utiliza, principalmente, cookies técnicas y de personalización estrictamente necesarias para el correcto funcionamiento del sitio web y no recopila datos de carácter personal del usuario de forma oculta o encubierta, así como también puede usar cookies de análisis (de terceros) para cuantificar el número de usuarios y realizar la medición y análisis estadístico.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-chocolate mb-4">3. Revocación y eliminación de cookies</h2>
                        <p>Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu ordenador. Para más información sobre cómo bloquear el uso de la cookies puedes visitar los enlaces de soporte oficiales de los principales navegadores (Chrome, Firefox, Safari, Edge).</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Cookies;
