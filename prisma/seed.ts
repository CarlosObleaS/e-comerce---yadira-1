const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.category.createMany({
    data: [
      { id: 1, name: 'Billeteras' },
      { id: 2, name: 'Correas' },
      { id: 3, name: 'Bolsos' },
    ],
    skipDuplicates: true,
  })
  console.log('✅ Categorías creadas con éxito')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())