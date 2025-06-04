const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function registerCustomer(email, phone, password, name) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const customer = await prisma.customers.create({
            data: {
                email,
                phone,
                password: hashedPassword,
                name,
            },
        });
        return customer;
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Failed to register user');
    }
}

module.exports = {
    registerCustomer,
};
