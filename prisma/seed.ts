import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const menus = [
    { id: '1', name: 'System Management', depth: 0, parentId: null },
    { id: '2', name: 'System Code', depth: 1, parentId: '1' },
  ];

  await prisma.menu.createMany({ data: menus });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
