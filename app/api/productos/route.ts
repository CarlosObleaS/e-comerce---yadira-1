import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function GET() {
  try {
    const productos = await prisma.product.findMany({
      include: {
        category: true, 
      },
    });
    return NextResponse.json(productos);
  } catch (error: any) {
    console.error(" ERROR EN GET PRODUCTOS:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Datos recibidos en la API:", body);

    const nuevoProducto = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description || "",
        price: Number(body.price), 
        categoryId: Number(body.categoryId),
        images: body.images, 
      },
    });

    return NextResponse.json(nuevoProducto);
  } catch (error: any) {
    console.error(" ERROR DETALLADO EN POST:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Producto eliminado" });
  } catch (error: any) {
    console.error(" ERROR EN DELETE:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}