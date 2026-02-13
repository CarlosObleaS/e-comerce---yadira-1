"use client";
import { useEffect } from "react";

export default function CulqiListener() {
  useEffect(() => {
    const handleCulqiAction = () => {
      const Culqi = (window as any).Culqi;
      if (Culqi.token) {
        const token = Culqi.token.id;
        const email = Culqi.token.email;
        console.log("Token creado con éxito:", token, email);
        // Aquí es donde enviaremos estos datos a tu backend en Docker
        alert("Pago procesado con éxito (Simulación)");
      } else if (Culqi.order) {
        console.log("Orden creada:", Culqi.order);
      } else {
        console.log("Error:", Culqi.error.merchant_message);
      }
    };

    window.addEventListener("message", (event) => {
      if (event.data === "checkout_cerrado") {
        console.log("El usuario cerró el checkout");
      }
    });

    // Esta es la función global que Culqi busca automáticamente
    (window as any).culqi = handleCulqiAction;
  }, []);

  return null;
}