import { PrismaClient } from '@prisma/client';

(async () => {
  const prisma = new PrismaClient();

  const data = [
    {
      name: 'Admin',
      description: 'System Super User'
    },
    {
      name: 'User',
      description: 'Default user with common privileges'
    },
    {
      name: 'Premium',
      description: 'User with privileges to access paid areas'
    }
  ];

  await prisma.roles.createMany({ data })
    .catch(({ message }) => console.error(`Error: ${message}`))
    .finally(async () => await prisma.$disconnect());
})();