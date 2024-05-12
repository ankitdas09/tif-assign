import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const users = await prisma.users.findMany();
    const communities = await prisma.communities.findMany({
        where: {
            owner: "661bd150f769de7c2d69f795",
        },
    });
    // 661be7a6088ed38bd3e2de5f
    console.log(users);
    console.log(communities);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
