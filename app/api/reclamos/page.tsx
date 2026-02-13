"use client";
import { useEffect, useState } from "react";

export default function VerReclamos() {
  const [reclamos, setReclamos] = useState([]);

  useEffect(() => {
    fetch("/api/reclamos").then(res => res.json()).then(setReclamos);
  }, []);

  return (
    <div className="p-10 bg-white min-h-screen text-black">
      <h1 className="text-2xl font-bold uppercase tracking-tighter mb-10 border-b pb-4">
        Libro de Reclamaciones (Recibidos)
      </h1>
      
      <div className="space-y-6">
        {reclamos.length === 0 ? (
          <p className="text-gray-400 text-xs uppercase">No hay reclamos pendientes.</p>
        ) : (
          reclamos.map((r: any) => (
            <div key={r.id} className="border p-6 hover:bg-gray-50 transition">
              <div className="flex justify-between mb-4">
                <span className="text-[10px] bg-black text-white px-2 py-1 uppercase tracking-widest">
                  {r.dni}
                </span>
                <span className="text-[10px] text-gray-400">{new Date(r.fecha).toLocaleDateString()}</span>
              </div>
              <h3 className="font-bold text-sm uppercase">{r.nombre}</h3>
              <p className="text-xs text-gray-500 mb-4">{r.correo}</p>
              <div className="bg-white border p-4 text-xs italic text-gray-700">
                "{r.detalle}"
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}