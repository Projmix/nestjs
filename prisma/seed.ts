import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const firstNames = ["John", "Jane", "Alice", "Bob"];
const lastNames = ["Doe", "Smith", "Johnson", "Brown"];
const genders = ["Male", "Female"];

async function main() {
  for (let i = 0; i < 1000; i++) {
    await prisma.user.create({
      data: {
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        age: Math.floor(Math.random() * 60) + 18,
        gender: genders[Math.floor(Math.random() * genders.length)],
        problems: Math.random() < 0.5,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
