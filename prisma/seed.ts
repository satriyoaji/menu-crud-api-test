import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const menus = [
    { id: uuidv4(), name: 'System Management', depth: 0, parentId: null },
    { id: uuidv4(), name: 'System Code', depth: 1, parentId: '1' }, // Replace with correct UUID for parentId
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
