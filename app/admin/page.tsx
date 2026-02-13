"use client";
import { useState, useEffect } from "react";

interface Producto {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: { name: string } | string | string;
}

export default function AdminPanel() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [confirmarEliminar, setConfirmarEliminar] = useState<number | null>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({ nombre: "", precio: "", categoria: "1" }); 

  const cargarProductos = async () => {
    try {
      const res = await fetch("/api/productos");
      const data = await res.json();
      setProductos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  useEffect(() => { cargarProductos(); }, []);

  const guardarProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Por favor selecciona una imagen");

    try {
      
      const fileData = new FormData();
      fileData.append("file", file);

      const uploadRes = await fetch("/api/upload", { 
        method: "POST", 
        body: fileData 
      });
      const uploadResult = await uploadRes.json();

      if (!uploadResult.success) throw new Error("Error al subir imagen");

      
      const response = await fetch("/api/productos", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nombre,
          price: parseFloat(form.precio),
          categoryId: parseInt(form.categoria), 
          images: [uploadResult.fileName] 
        })
      });
      
      if (response.ok) {
        setMostrarModal(false);
        setFile(null);
        setForm({ nombre: "", precio: "", categoria: "1" });
        cargarProductos();
      }
    } catch (error) {
      alert("Hubo un error al guardar el producto");
      console.error(error);
    }
  };

  const eliminarProducto = async (id: number) => {
    await fetch(`/api/productos?id=${id}`, { method: "DELETE" });
    setConfirmarEliminar(null);
    cargarProductos();
  };

  return (
    <div className="p-10 bg-white min-h-screen text-black">
      <div className="flex justify-between items-center mb-10 border-b pb-5">
        <h1 className="text-3xl font-bold uppercase tracking-tighter">Inventario MOSS</h1>
        <button onClick={() => setMostrarModal(true)} className="bg-black text-white px-6 py-2 text-xs uppercase tracking-widest hover:bg-gray-800 transition">
          + Nuevo Producto
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-400">
            <tr>
              <th className="p-4">Vista</th>
              <th className="p-4">Nombre</th>
              <th className="p-4">Precio</th>
              <th className="p-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="p-4">
                  {/* Cargamos desde la carpeta local /uploads/ */}
                  <img 
                    src={p.images && p.images[0] ? `/uploads/${p.images[0]}` : "/placeholder.png"} 
                    className="w-12 h-12 object-cover rounded" 
                    alt={p.name}
                  />
                </td>
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4">S/ {p.price.toString()}</td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => setConfirmarEliminar(p.id)}
                    className="text-red-500 text-[10px] font-bold uppercase hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL ELIMINAR */}
      {confirmarEliminar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[110]">
          <div className="bg-white p-8 rounded shadow-2xl max-w-sm text-center">
            <h3 className="text-lg font-bold mb-4 uppercase">¿Estás seguro?</h3>
            <p className="text-gray-500 text-sm mb-6">Esta acción no se puede deshacer. El producto será borrado permanentemente de la base de datos.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setConfirmarEliminar(null)} className="text-xs uppercase text-gray-400">Cancelar</button>
              <button onClick={() => eliminarProducto(confirmarEliminar)} className="bg-red-600 text-white px-6 py-2 text-xs uppercase">Sí, Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL NUEVO PRODUCTO */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-white p-10 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-tight">Añadir a la Colección</h2>
            <form onSubmit={guardarProducto} className="space-y-4">
              <input 
                type="text" 
                placeholder="Nombre del Producto" 
                className="w-full p-3 border border-gray-200 outline-none focus:border-black transition" 
                onChange={(e) => setForm({...form, nombre: e.target.value})} 
                required 
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="Precio (S/.)" 
                  className="w-full p-3 border border-gray-200 outline-none focus:border-black transition" 
                  onChange={(e) => setForm({...form, precio: e.target.value})} 
                  required 
                />
               
<select 
  className="w-full p-3 border border-gray-200 bg-white text-sm text-black" 
  onChange={(e) => setForm({...form, categoria: e.target.value})}
  value={form.categoria}
>
  <option value="1">Billeteras</option>
  <option value="2">Calzado</option>
  <option value="3">Carteras</option>
  <option value="4">Correas</option>
</select>
              </div>
              <div className="border-2 border-dashed border-gray-200 p-6 text-center hover:border-black transition cursor-pointer relative">
                <label className="cursor-pointer block">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest block">
                    {file ? file.name : "Click para cargar imagen de PC"}
                  </span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)} 
                    required 
                  />
                </label>
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setMostrarModal(false)} className="text-[10px] uppercase text-gray-400 hover:text-black">Cerrar</button>
                <button type="submit" className="bg-black text-white px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-gray-800 transition shadow-lg">
                  Confirmar y Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}