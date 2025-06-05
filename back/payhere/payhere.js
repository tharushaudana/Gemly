const crypto = require('crypto');

const merchantId = process.env.PAYHERE_MERCHANT_ID;
const secret = process.env.PAYHERE_SECRET;
const currency = process.env.PAYHERE_CURRENCY;
const returnUrl = process.env.PAYHERE_RETURN_URL || '';
const cancelUrl = process.env.PAYHERE_CANCEL_URL || '';
const notifyUrl = process.env.PAYHERE_NOTIFY_URL || '';
const sandbox = process.env.PAYHERE_SANDBOX === 'true' ? true : false;
const maxAmount = parseFloat(process.env.PAYHERE_MAX_AMOUNT);

function createPayhereHash(orderId, amount) {
    const formattedAmount = parseFloat(amount).toFixed(2);

    const hash = crypto.createHash('md5').update(
        merchantId +
        orderId +
        formattedAmount +
        currency +
        crypto.createHash('md5').update(secret).digest('hex').toUpperCase()
    ).digest('hex').toUpperCase();

    return { hash, formattedAmount };
}

function verifyReceivedNotify(body) {
    const { merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig } = body;

    if (merchant_id !== merchantId) {
        return false;
    }

    const expectedHash = crypto.createHash('md5').update(
        merchantId +
        order_id +
        payhere_amount +
        payhere_currency +
        status_code +
        crypto.createHash('md5').update(secret).digest('hex').toUpperCase()
    ).digest('hex').toUpperCase();

    return expectedHash === md5sig;
}

module.exports = {
    createPayhereHash,
    verifyReceivedNotify,
    merchantId,
    secret,
    currency,
    returnUrl,
    cancelUrl,
    notifyUrl,
    sandbox,
    maxAmount,
};