const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function getFilters() {
    try {
        const collections = await prisma.collections.findMany({
            select: { id: true, name: true },
        });

        const categories = await prisma.categories.findMany({
            select: { id: true, name: true },
        });

        // TODO: Uncomment and implement the metals query when the metals table is available
        // const metals = await prisma.metals.findMany({
        //     select: { id: true, name: true },
        // });

        return {
            collections,
            categories,
            metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'], // TODO: Replace with actual metals from database
        };
    } catch (error) {
        console.error('Error fetching filters:', error);
        throw new Error('Failed to fetch filters');
    }
}

module.exports = {
    getFilters,
};