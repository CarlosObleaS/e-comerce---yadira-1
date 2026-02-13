"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/useCart";
import { configurarCulqi } from "@/utils/Culqi";
import CulqiListener from "@/components/CulqiListener";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null); // Estado para las FAQ
  const { items, addItem, removeItem } = useCart();
  const total = items.reduce((acc, item) => acc + item.precio, 0);

  const manejarPago = () => {
    if (items.length === 0) return alert("Tu carrito está vacío");
    configurarCulqi(total, "Compra en MOSS"); 
  };

  const CATEGORIAS = [
    { id: 1, nombre: "Billeteras", imagen: "/categorias/billeteras.jpg", href: "/categorias/billeteras" },
    { id: 2, nombre: "Calzado", imagen: "/categorias/calzados.jpg", href: "/categorias/calzado" },
    { id: 3, nombre: "Carteras", imagen: "/categorias/carteras.jpg", href: "/categorias/carteras" },
    { id: 4, nombre: "Correas", imagen: "/categorias/correas.jpg", href: "/categorias/correas" },
  ];

  const PRODUCTOS = [
    { id: 1, nombre: "Bolso de cuero", precio: 420, categoria: "Carteras", imagen: "/productos/tote.jpg" },
    { id: 2, nombre: "Oxford Clásico", precio: 310, categoria: "Calzado", imagen: "/productos/oxford.jpg" },
    { id: 3, nombre: "Cinturón de cuero", precio: 95, categoria: "Accesorios", imagen: "/productos/belt.jpg" },
  ];

  const DESTACADOS = [
    { id: 101, nombre: "Billetera", precio: 120, imagen: "/destacados/billeteras.jpg" },
    { id: 102, nombre: "Correa Classic", precio: 85, imagen: "/destacados/correas.jpg" },
    { id: 103, nombre: "Zapatos Cuero", precio: 95, imagen: "/destacados/calzados.jpg" },
  ];

  const FAQS = [
    {
      pregunta: "¿Cuál es el tiempo de entrega?",
      respuesta: "Realizamos envíos a todo el Perú. En Lima el tiempo de entrega es de 2 a 3 días hábiles, y para provincias de 5 a 7 días hábiles."
    },
    {
      pregunta: "¿Los productos son de cuero legítimo?",
      respuesta: "Sí, todos nuestros productos son fabricados con cuero 100% vacuno de alta calidad, trabajados de forma artesanal por maestros peruanos."
    },
    {
      pregunta: "¿Cómo cuido mi producto de cuero?",
      respuesta: "Recomendamos hidratar el cuero con crema incolora cada 3 meses y evitar el contacto directo con agua, alcohol o perfumes para mantener su brillo natural."
    }
  ];

  return (
    <main className="min-h-screen bg-white text-[#1A1A1A] scroll-smooth">
      <CulqiListener />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 px-10 py-6 flex justify-between items-center bg-transparent">
        <h1 className="text-3xl font-serif tracking-[0.3em] font-light">MOSS</h1>
        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="text-xs uppercase tracking-[0.3em]"
        >
          Carrito ({items.length})
        </button>
      </nav>

      {/* CARRITO LATERAL */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCartOpen(false)} />
          <aside className="relative ml-auto w-96 max-w-full h-full bg-white shadow-2xl flex flex-col">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-sm uppercase tracking-widest">Tu carrito</h3>
              <button onClick={() => setCartOpen(false)} className="text-xs uppercase tracking-widest">
                Cerrar
              </button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              {items.length === 0 ? (
                <p className="text-gray-400 italic text-center">Tu carrito está vacío.</p>
              ) : (
                <ul className="space-y-6">
                  {items.map((item, index) => (
                    <li key={index} className="flex items-center space-x-4 border-b pb-4">
                      <Image src={item.imagen} alt={item.nombre} width={64} height={64} className="object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">{item.nombre}</h4>
                        <p className="text-xs text-gray-500">S/. {item.precio}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-xs text-red-500 underline">
                        Quitar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="p-6 border-t">
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total:</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
              <button onClick={manejarPago} className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest">
                Finalizar compra
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="/hero.jpg" alt="Leather craftsmanship" fill priority className="object-cover opacity-85" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white">
          <span className="block text-xs uppercase tracking-[0.4em] mb-6">Cuero hecho a mano</span>
          <h2 className="text-6xl md:text-8xl font-serif italic font-light mb-10">Elegancia atemporal</h2>
          <a href="#nuestra-coleccion" className="inline-block border border-white/50 px-14 py-4 text-xs uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-700">
            Ver colección
          </a>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section id="nuestra-coleccion" className="py-28 px-10 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-4">Nuestra colección</p>
          <h3 className="text-4xl font-serif italic mb-20">Diseñado para durar</h3>
          <div className="flex flex-wrap justify-center gap-16">
            {CATEGORIAS.map((cat) => (
              <Link key={cat.id} href={cat.href} className="group cursor-pointer">
                <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-xl mb-6">
                  <Image src={cat.imagen} alt={cat.nombre} fill className="object-cover group-hover:scale-110 transition duration-700" />
                </div>
                <h4 className="uppercase tracking-widest text-sm group-hover:text-yellow-700 transition-colors">{cat.nombre}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="py-32 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          {PRODUCTOS.map((p) => (
            <div key={p.id} className="group">
              <div className="relative aspect-[3/4] mb-8 overflow-hidden">
                <Image src={p.imagen} alt={p.nombre} fill className="object-cover group-hover:scale-105 transition duration-700" />
                <button onClick={() => addItem(p)} className="absolute bottom-0 w-full bg-black text-white py-4 text-xs uppercase tracking-[0.4em] translate-y-full group-hover:translate-y-0 transition duration-300">
                  Añadir al carrito
                </button>
              </div>
              <div className="flex justify-between">
                <h4 className="text-sm uppercase tracking-wider">{p.nombre}</h4>
                <p className="font-serif">S/. {p.precio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="py-20 px-10 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-10 uppercase tracking-widest text-center">Destacados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {DESTACADOS.map((prod) => (
              <div key={prod.id} className="border p-4 hover:shadow-lg bg-white transition duration-300">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image src={prod.imagen} alt={prod.nombre} fill className="object-cover" />
                </div>
                <h4 className="font-bold mt-4 uppercase text-xs tracking-wider">{prod.nombre}</h4>
                <p className="text-gray-600 mb-4">S/. {prod.precio}</p>
                <button onClick={() => addItem(prod)} className="w-full bg-black text-white py-2 uppercase text-[10px] tracking-widest hover:bg-gray-800 transition">
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN PREGUNTAS FRECUENTES (FAQ) */}
      <section className="py-24 px-10 bg-white border-t border-gray-50">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.4em] text-center text-gray-400 mb-4">Ayuda</p>
          <h3 className="text-3xl font-serif italic text-center mb-12">Preguntas Frecuentes</h3>
          <div className="space-y-2">
            {FAQS.map((faq, index) => (
              <div key={index} className="border-b border-gray-100">
                <button 
                  onClick={() => setFaqAbierta(faqAbierta === index ? null : index)}
                  className="w-full py-6 flex justify-between items-center text-left"
                >
                  <span className="text-[11px] uppercase tracking-widest font-bold">{faq.pregunta}</span>
                  <span className="text-lg font-light">{faqAbierta === index ? "−" : "+"}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${faqAbierta === index ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{faq.respuesta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIBRO DE RECLAMACIONES */}
      <section className="py-12 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6">
            <div className="bg-gray-200 w-12 h-12 rounded flex items-center justify-center">
              <span className="text-[20px]">📘</span>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest">Libro de Reclamaciones</h4>
              <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">Estamos a tu servicio para cualquier queja o reclamo.</p>
            </div>
          </div>
          <Link href="/libro-reclamaciones" className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition">
            Ingresar al Libro
          </Link>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-bold tracking-tighter mb-6">MOSS</h2>
            <p className="text-gray-500 max-w-sm mb-6 uppercase text-[10px] tracking-[0.2em]">
              Artesanía peruana en cuero. Diseños atemporales hechos para durar toda la vida.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-[10px] uppercase tracking-[0.2em] hover:text-yellow-700 transition">Instagram</a>
              <a href="#" className="text-[10px] uppercase tracking-[0.2em] hover:text-yellow-700 transition">Facebook</a>
              <a href="#" className="text-[10px] uppercase tracking-[0.2em] hover:text-yellow-700 transition">TikTok</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Explorar</h4>
            <ul className="text-sm space-y-4 text-gray-400 font-light">
              <li><Link href="#nuestra-coleccion" className="hover:text-black transition">Colección 2026</Link></li>
              <li><Link href="/categorias/billeteras" className="hover:text-black transition">Billeteras</Link></li>
              <li><Link href="/categorias/correas" className="hover:text-black transition">Correas</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Soporte</h4>
            <ul className="text-sm space-y-4 text-gray-400 font-light">
              <li><Link href="/libro-reclamaciones" className="hover:text-black transition font-bold text-black">Libro de Reclamaciones</Link></li>
              <li><a href="#" className="hover:text-black transition">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-black transition">Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-50 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">© 2026 MOSS-CCORI. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </footer>
    </main>
  );
}