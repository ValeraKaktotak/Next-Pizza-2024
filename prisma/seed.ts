import { hashSync } from 'bcrypt'

//Prisma
import { prisma } from './prisma-client'

//db data generation
async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User1',
        email: 'user1@test.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER'
      },
      {
        fullName: 'Admin',
        email: 'admin@test.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'AdMIN'
      }
    ]
  })
}

//db data removing
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
}

async function main() {
  try {
    await down()
    await up()
  } catch (error) {
    console.log(error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
  })
