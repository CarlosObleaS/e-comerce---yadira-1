import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script"; // Importamos el optimizador de scripts
import "./globals.css";
import CulqiListener from "@/components/CulqiListener";
import WhatsappButton from "@/components/WhatsappButton";

// 1. Definir fuentes arriba
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Metadata
export const metadata: Metadata = {
  title: "MOSS | Tienda de Cuero Premium",
  description: "Productos de cuero hechos a mano con elegancia y calidad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Usamos el componente Script para Culqi */}
        <Script 
          src="https://checkout.culqi.com/js/v4" 
          strategy="beforeInteractive" 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CulqiListener />
        
        {/* Envuelvo children en un min-h-screen para que el layout ocupe todo el alto */}
        <main className="min-h-screen">
          {children}
        </main>

        <WhatsappButton />
      </body>
    </html>
  );
}