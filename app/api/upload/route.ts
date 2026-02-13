import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No hay archivo" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Definir ruta y asegurar que la carpeta exista
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true }); // Esto crea la carpeta si no existe

    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);
    
    return NextResponse.json({ success: true, fileName: file.name });
  } catch (error) {
    console.error("Error en upload:", error);
    return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 });
  }
}