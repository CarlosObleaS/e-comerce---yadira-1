export const configurarCulqi = (total: number, nombreProducto: string) => {
  if (typeof window !== "undefined" && (window as any).Culqi) {
    const Culqi = (window as any).Culqi;

    // 1. Configuración con tu LLAVE PÚBLICA (Usa la de pruebas de tu panel de Culqi)
    Culqi.publicKey = 'pk_test_7f539097e411a084'; 

    // 2. Configuración del pago
    Culqi.settings({
      title: 'MOSS Premium Leather',
      currency: 'PEN', // Moneda en Soles
      amount: total * 100, // Culqi recibe el monto en céntimos (Ej: 100.00 soles = 10000)
    });

    Culqi.options({
      lang: "auto",
      installments: true, // Permitir cuotas
      paymentMethods: {
        tarjeta: true,
        yape: true, 
        bancaMovil: true,
        agente: true,
        pagoEfectivo: true,
      },
      style: {
        logo: "https://tu-sitio.com/logo.png", // Tu logo de MOSS
        maincolor: "#000000", // Negro para el look premium
      }
    });

    Culqi.open();
  }
};