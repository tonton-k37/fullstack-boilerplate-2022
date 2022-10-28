import { Users, createRandomUser } from "../lib/faker";
import { prisma } from "@lib/prisma";

async function main() {
  await prisma.user.create({
    data: {
      email: "test@example.com",
      password: "hogehoge",
      uid: "test-user",
      provider: "Credentials",
    },
  });

  await prisma.user.createMany({
    data: Users,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
