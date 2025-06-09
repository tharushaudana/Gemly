const { PrismaClient } = require('../generated/prisma');
const { createPayhereHash, merchantId, currency, returnUrl, cancelUrl, notifyUrl, sandbox, maxAmount } = require('../payhere/payhere')
const prisma = new PrismaClient();

async function createCheckoutSession(customer, addressId) {
    // Validate address
    const address = await prisma.customerAddresses.findUnique({
        where: { id: addressId },
    });

    if (!address || address.customerId !== customer.id) {
        throw new Error('Address not found or does not belong to the customer');
    }

    // Retrieve the customer's cart items
    const cartItems = await prisma.cartItems.findMany({
        where: { customerId: customer.id },
        include: { product: true },
    });

    if (cartItems.length === 0) {
        throw new Error('Cart is empty. Nothing to checkout.');
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of cartItems) {
        const productPrice = item.product.price; 
        totalAmount += productPrice * item.quantity;
    }

    // Check if total amount exceeds the maximum allowed amount
    if (totalAmount > maxAmount) {
        throw new Error(`Total amount exceeds the maximum allowed limit of ${maxAmount}`);
    }

    const generatedOrderId = `GM-${Date.now()}`;

    // Create order in the database
    await prisma.orders.create({
        data: {
            id: generatedOrderId,
            customerId: customer.id,
            totalAmount: totalAmount,
            cartItems,
            address,
        },
    });

    // Create Payhere hash
    const { hash, formattedAmount } = createPayhereHash(generatedOrderId, totalAmount);

    // Payhere payment request object
    const paymentRequest = {
        sandbox: sandbox,
        merchant_id: merchantId,
        return_url: returnUrl,
        cancel_url: cancelUrl,
        notify_url: notifyUrl,
        order_id: generatedOrderId,
        items: 'Cart Items',
        amount: formattedAmount,
        currency: currency,
        hash: hash,
        first_name: customer.name,
        last_name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: `${address.name}, ${address.street}, ${address.city}, ${address.country}`,
        city: address.city,
        country: address.country,
        delivery_address: `${address.name}, ${address.street}, ${address.city}, ${address.country}`,
        delivery_city: address.city,
        delivery_country: address.country,
        custom_1: '',
        custom_2: '',
    };

    return { 
        paymentRequest,
    };
}

module.exports = {
    createCheckoutSession,
};