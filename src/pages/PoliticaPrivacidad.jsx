import React from 'react';
import SEO from '../components/SEO';

const PoliticaPrivacidad = () => {
    return (
        <div className="bg-offwhite min-h-screen pt-40 pb-24 px-6 lg:px-12">
            <SEO title="Política de Privacidad" noindex={true} canonical="/politica-privacidad" description="Política de privacidad de Salón Pilar Palomares. Conoce cómo gestionamos y protegemos tus datos de carácter personal con total seguridad." description="Política de privacidad de Salón Pilar Palomares. Conoce cómo gestionamos y protegemos tus datos de carácter personal con total seguridad." />
            <div className="max-w-4xl mx-auto font-sans text-chocolate/80">
                <h1 className="text-4xl md:text-5xl font-serif text-chocolate mb-12 text-center">Política de Privacidad</h1>
                
                <div className="space-y-8 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-serif text-chocolate mb-4">1. Recogida, finalidad y tratamientos de datos</h2>
                        <p>Salón Pilar Palomares tiene el deber de informar a los usuarios de su sitio web acerca de la recogida de datos de carácter personal que pueden llevarse a cabo, bien sea mediante el envío de correo electrónico o al cumplimentar los formularios incluidos en el sitio web. En este sentido, Salón Pilar Palomares será considerada como responsable de los datos recabados mediante los medios anteriormente descritos. Los datos personales facilitados por los usuarios quedan registrados con la única finalidad de prestarles el servicio solicitado y enviarles información comercial.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-serif text-chocolate mb-4">2. Comunicación de información a terceros</h2>
                        <p>Salón Pilar Palomares informa a los usuarios de que sus datos personales no serán cedidos a terceras organizaciones, con la salvedad de que dicha cesión de datos este amparada en una obligación legal o cuando la prestación de un servicio implique la necesidad de una relación contractual con un encargado de tratamiento.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-chocolate mb-4">3. Derechos de los usuarios</h2>
                        <p>La Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales concede a los interesados la posibilidad de ejercer una serie de derechos relacionados con el tratamiento de sus datos personales. Para hacer uso del ejercicio de estos derechos, el usuario deberá dirigirse mediante comunicación escrita a la siguiente dirección: Salón Pilar Palomares, C/ Axarquía 21, Local 3, 29738 Torre de Benagalbón, Málaga o al correo electrónico: salonestilistapilar@gmail.com.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PoliticaPrivacidad;
