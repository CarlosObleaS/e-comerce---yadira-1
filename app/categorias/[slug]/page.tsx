"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/useCart";

// ESTO ES LA LLAVE: Conecta el nombre de la URL con el ID que guardas en el Admin
const MAPA_CATEGORIAS: Record<string, number> = {
  "billeteras": 1,
  "calzado": 2,
  "carteras": 3,
  "correas": 4,
};

export default function CategoriaPage() {
  const params = useParams();
  const slug = params.slug as string; 
  const { addItem } = useCart();
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await fetch("/api/productos");
        const todosLosProductos = await res.json();
        
        // Obtenemos el ID que corresponde a este slug
        const idBuscado = MAPA_CATEGORIAS[slug.toLowerCase()];

        // Filtramos comparando IDs numéricos (es más seguro)
        const filtrados = todosLosProductos.filter((p: any) => {
          // Revisamos todas las formas en que el ID puede venir de la API
          const categoryId = p.categoryId || p.category?.id || p.category;
          return Number(categoryId) === idBuscado;
        });
        
        setProductos(filtrados);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, [slug]);

  return (
    <main className="min-h-screen bg-white text-black">
      <nav className="p-8 flex justify-between items-center border-b border-gray-100">
        <Link href="/" className="text-[10px] uppercase tracking-widest font-bold border-b border-black">
          ← Regresar 
        </Link>
        <h1 className="text-2xl font-serif italic capitalize">{slug}</h1>
        <div className="w-20"></div>
      </nav>

      <section className="py-16 px-10">
        <div className="max-w-7xl mx-auto">
          {cargando ? (
            <div className="flex justify-center py-20 animate-pulse text-xs uppercase tracking-widest">
              Cargando {slug}...
            </div>
          ) : productos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {productos.map((p: any) => (
                <div key={p.id} className="group flex flex-col">
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-50">
                    <Image 
                      src={p.images && p.images[0] ? `/uploads/${p.images[0]}` : "/placeholder.png"} 
                      alt={p.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <button
                      onClick={() => addItem({ 
                        id: p.id, 
                        nombre: p.name, 
                        precio: p.price, 
                        imagen: p.images[0] ? `/uploads/${p.images[0]}` : "/placeholder.png" 
                      })}
                      className="absolute bottom-0 w-full bg-black text-white py-4 text-[10px] uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition duration-300"
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                  <h3 className="text-[11px] uppercase tracking-wider font-bold mb-1">{p.name}</h3>
                  <p className="font-serif text-gray-800">S/. {Number(p.price).toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 border-2 border-dashed border-gray-100">
              <p className="text-gray-400 text-sm uppercase tracking-widest font-light">
                No hay productos en <span className="text-black font-bold">{slug}</span>
              </p>
              
            </div>
          )}
        </div>
      </section>
    </main>
  );
}