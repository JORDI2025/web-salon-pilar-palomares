import React from 'react';
import SEO from '../components/SEO';

const CondicionesVenta = () => {
    return (
        <div className="bg-offwhite min-h-screen pt-40 pb-24 px-6 lg:px-12">
            <SEO title="Condiciones de Venta" noindex={true} canonical="/condiciones-venta" description="Condiciones de venta y reservas de Salón Pilar Palomares. Información sobre políticas de cancelación, citas y servicios en Torre de Benagalbón." description="Condiciones de venta y reservas de Salón Pilar Palomares. Información sobre políticas de cancelación, citas y servicios en Torre de Benagalbón." />
            <div className="max-w-4xl mx-auto font-sans text-chocolate/80">
                <h1 className="text-4xl md:text-5xl font-serif text-chocolate mb-12 text-center">Condiciones de Venta</h1>
                
                <div className="space-y-8 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-serif text-chocolate mb-4">1. Precios y Pagos</h2>
                        <p>Los precios indicados en los servicios y productos incluyen los impuestos correspondientes aplicables vigentes al momento de la adquisición. El pago de los servicios se realizará íntegramente en el salón, aceptando pagos en efectivo y tarjeta de crédito/débito.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-serif text-chocolate mb-4">2. Política de Reservas y Cancelaciones</h2>
                        <p>Para asegurar su cita, recomendamos reservar con antelación. En caso de no poder asistir, rogamos nos lo comunique con al menos 24 horas de antelación para que podamos ajustar nuestra agenda y ofrecer ese horario a otro cliente.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-chocolate mb-4">3. Devoluciones de Productos</h2>
                        <p>Únicamente se aceptarán devoluciones de productos cosméticos en su envase original, sin abrir y en perfecto estado, en un plazo máximo de 14 días naturales desde la fecha de compra o recepción, presentando el ticket de compra correspondiente. No se realizarán devoluciones sobre servicios ya prestados.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif text-chocolate mb-4">4. Modificaciones</h2>
                        <p>Salón Pilar Palomares se reserva el derecho de modificar sus precios y servicios en cualquier momento, siempre sujetos a cambios con previo aviso de forma visible en el salón o medios de comunicación habituales.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CondicionesVenta;
