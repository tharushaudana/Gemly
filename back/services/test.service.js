const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function test() {
    const records = prisma.user.findMany();
    return records;
}

module.exports = {
    test   
};