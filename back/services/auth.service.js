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

async function loginCustomer(email, password) {
    try {
        const customer = await prisma.customers.findUnique({
            where: { email },
            include: {
                addresses: true,
            }
        });

        if (!customer) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return customer;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw new Error('Failed to log in user');
    }
}

async function getCustomerById(id) {
    try {
        const customer = await prisma.customers.findUnique({
            where: { id },
            include: {
                addresses: true,
            }
        });

        if (!customer) {
            throw new Error('User not found');
        }

        return customer;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Failed to fetch user');
    }
}

module.exports = {
    registerCustomer,
    loginCustomer,
    getCustomerById,
};
