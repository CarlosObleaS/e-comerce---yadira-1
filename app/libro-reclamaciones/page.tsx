"use client";
import { useState } from "react";
import Link from "next/link";

export default function LibroReclamaciones() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí conectarías con tu API para enviar el correo o guardar en DB
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-3xl font-serif italic mb-4">Reclamo Registrado</h2>
        <p className="text-xs uppercase tracking-widest text-gray-500 max-w-md">
          Hemos recibido tu solicitud. Te enviaremos una copia a tu correo y te responderemos en un plazo máximo de 15 días hábiles conforme a ley.
        </p>
        <Link href="/" className="mt-10 border-b border-black text-[10px] uppercase tracking-[0.3em] font-bold">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Cabecera */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-serif italic mb-4">Libro de Reclamaciones</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Hoja de reclamación virtual</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Sección 1: Datos del Consumidor */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest border-b pb-2 mb-6">1. Identificación del Consumidor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required type="text" placeholder="Nombre Completo" className="w-full p-3 border-b outline-none focus:border-black text-sm" />
              <input required type="text" placeholder="DNI / CE" className="w-full p-3 border-b outline-none focus:border-black text-sm" />
              <input required type="email" placeholder="Correo Electrónico" className="w-full p-3 border-b outline-none focus:border-black text-sm" />
              <input required type="tel" placeholder="Teléfono / Celular" className="w-full p-3 border-b outline-none focus:border-black text-sm" />
              <input required type="text" placeholder="Domicilio" className="col-span-1 md:col-span-2 w-full p-3 border-b outline-none focus:border-black text-sm" />
            </div>
          </section>

          {/* Sección 2: Detalle del Bien */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest border-b pb-2 mb-6">2. Identificación del Bien Contratado</h3>
            <div className="flex gap-8 mb-6">
              <label className="flex items-center space-x-2 text-xs uppercase tracking-widest cursor-pointer">
                <input type="radio" name="tipoBien" value="producto" defaultChecked />
                <span>Producto</span>
              </label>
              <label className="flex items-center space-x-2 text-xs uppercase tracking-widest cursor-pointer">
                <input type="radio" name="tipoBien" value="servicio" />
                <span>Servicio</span>
              </label>
            </div>
            <input required type="number" placeholder="Monto Reclamado (S/.)" className="w-full p-3 border-b outline-none focus:border-black text-sm mb-6" />
            <textarea placeholder="Descripción del producto o servicio" className="w-full p-3 border border-gray-100 outline-none focus:border-black text-sm h-24 resize-none" />
          </section>

          {/* Sección 3: Detalle de la Reclamación */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest border-b pb-2 mb-6">3. Detalle de la Reclamación</h3>
            <div className="flex gap-8 mb-6">
              <label className="flex items-center space-x-2 text-xs uppercase tracking-widest cursor-pointer">
                <input type="radio" name="tipoQueja" value="reclamo" defaultChecked />
                <span>Reclamo (Disconformidad con el producto)</span>
              </label>
              <label className="flex items-center space-x-2 text-xs uppercase tracking-widest cursor-pointer">
                <input type="radio" name="tipoQueja" value="queja" />
                <span>Queja (Malestar en la atención)</span>
              </label>
            </div>
            <textarea required placeholder="Detalle su reclamo o queja de forma clara" className="w-full p-3 border border-gray-100 outline-none focus:border-black text-sm h-32 resize-none" />
          </section>

          <div className="bg-gray-50 p-6">
            <p className="text-[9px] text-gray-500 uppercase leading-relaxed tracking-wider">
              * La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.
              <br />* El proveedor debe dar respuesta al reclamo o queja en un plazo no mayor a quince (15) días hábiles.
            </p>
          </div>

          <button 
            type="submit" 
            className="w-full bg-black text-white py-4 text-xs uppercase tracking-[0.4em] hover:bg-gray-800 transition shadow-xl"
          >
            Enviar Reclamación
          </button>

          <div className="text-center">
             <Link href="/api/reclamos" className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black">Cancelar y volver</Link>
          </div>
        </form>
      </div>
    </main>
  );
}