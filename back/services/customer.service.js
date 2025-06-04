const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function addAddress(customerId, addressData) {
    // Create the new address
    return await prisma.customerAddresses.create({
        data: {
            customerId,
            ...addressData,
        },
    });
}

async function updateAddress(customerId, addressId, addressData) {
    // Check if the address belongs to the customer
    const existingAddress = await prisma.customerAddresses.findUnique({
        where: {
            id: addressId,
            customerId: customerId,
        },
    });

    if (!existingAddress) {
        throw new Error('Address not found or does not belong to the customer');
    }

    // Update the address
    return await prisma.customerAddresses.update({
        where: {
            id: addressId,
        },
        data: addressData,
    });
}

async function deleteAddress(customerId, addressId) {
    // Check if the address belongs to the customer
    const existingAddress = await prisma.customerAddresses.findUnique({
        where: {
            id: addressId,
            customerId: customerId,
        },
    });

    if (!existingAddress) {
        throw new Error('Address not found or does not belong to the customer');
    }

    return await prisma.customerAddresses.delete({
        where: {
            id: addressId,
        },
    });
}

async function updateProfile(customerId, profileData) {
    // Permitted fields are: name, phone
    const permittedFields = ['name', 'phone'];
    const profileDataKeys = Object.keys(profileData);
    const invalidFields = profileDataKeys.filter(key => !permittedFields.includes(key));

    if (invalidFields.length > 0) {
        throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
    }

    // Update the customer profile
    return await prisma.customers.update({
        where: {
            id: customerId,
        },
        data: profileData,
    });
}

module.exports = {
    addAddress,
    updateAddress,
    deleteAddress,
    updateProfile,
};