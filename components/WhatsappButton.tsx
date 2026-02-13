export default function WhatsappButton() {
  const telefono = "51900000000";
  const mensaje = "Hola MOSS, me gustaría obtener más información sobre sus productos de cuero.";
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[60] bg-[#25d366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
    >
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.754a8.117 8.117 0 01-3.876-.982l-.278-.164-2.882.756.77-2.808-.18-.287a8.111 8.111 0 01-1.242-4.301c0-4.482 3.645-8.127 8.13-8.127 2.17 0 4.207.845 5.743 2.381 1.536 1.536 2.381 3.574 2.381 5.743 0 4.483-3.646 8.128-8.13 8.128m0-17.43C6.357 1.666 1.75 6.273 1.75 11.9c0 1.8.468 3.56 1.356 5.12L1.083 22.25l5.37-1.41c1.505.82 3.2 1.25 4.942 1.25 5.543 0 10.05-4.507 10.05-10.05 0-2.686-1.046-5.212-2.946-7.112S17.086 1.666 14.4 1.666" />
      </svg>
      <span className="absolute right-full mr-4 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        ¿Necesitas ayuda? Escríbenos
      </span>
    </a>
  );
}