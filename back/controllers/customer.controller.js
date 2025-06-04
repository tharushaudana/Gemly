const { addAddress, updateAddress, deleteAddress } = require('../services/customer.service');

exports.addAddress = async (req, res) => {
    const { addressData } = req.body;

    if (!addressData) {
        return res.status(400).json({ error: 'Customer ID and address data are required' });
    }

    try {
        const newAddress = await addAddress(req.user.id, addressData);
        res.status(201).json({ ...newAddress });
    } catch (error) {
        console.error('Error adding address:', error);
        res.status(500).json({ error: 'Failed to add address' });
    }
}

exports.updateAddress = async (req, res) => {
    const { addressId, addressData } = req.body;

    if (!addressId || !addressData) {
        return res.status(400).json({ error: 'Address ID and address data are required' });
    }

    try {
        const updatedAddress = await updateAddress(req.user.id, addressId, addressData);
        res.status(200).json({ ...updatedAddress });
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({ error: 'Failed to update address' });
    }
}

exports.deleteAddress = async (req, res) => {
    const { addressId } = req.body;

    if (!addressId) {
        return res.status(400).json({ error: 'Address ID is required' });
    }

    try {
        await deleteAddress(req.user.id, addressId);
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error('Error deleting address:', error);
        res.status(500).json({ error: 'Failed to delete address' });
    }
}