import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.car.create({
    data: {
      make: "Ford",
      model: "Fiesta",
      year: 2020,
      condition: "EXCELLENT",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ebayimg.com%2F00%2Fs%2FNjAwWDgwMA%3D%3D%2Fz%2FH2wAAOSweF1dus75%2F%24_86.JPG&f=1&nofb=1",
      title: "I've got a 40 in my Ford Fiesta",
    },
  });

  await prisma.car.create({
    data: {
      make: "Mercedes",
      model: "CLK 430",
      year: 2001,
      condition: "GOOD",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbringatrailer.com%2Fwp-content%2Fuploads%2F2019%2F05%2F2001_mercedes-benz_clk430_coupe_1556918613495d565ef66eDSC_8365-e1557537324384.jpg&f=1&nofb=1",
      title: "2001 Mercedes CLK430",
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
