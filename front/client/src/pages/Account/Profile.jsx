import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { useFetch } from '../../context/FetchContext';
// Removed: import { Address } from '../../types';

// Removed type annotation React.FC
const Profile = () => {
  // useAuth hook is assumed to return regular JavaScript values/functions
  const { user, updateProfile, addAddress, updateAddress, removeAddress } = useAuth();
  const { callFetch } = useFetch();

  // Profile edit state - Removed type annotation
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  // Address form state - Removed type annotations
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  // Removed type annotation <string>
  const [currentAddressId, setCurrentAddressId] = useState('');
  // Removed type annotation <Omit<Address, 'id'>>
  const [addressData, setAddressData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    isDefault: false
  });

  // Handle profile data change - Simplified event type
  const handleProfileChange = (e) => { // e: React.ChangeEvent<HTMLInputElement> -> e
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  // Handle profile update
  const handleProfileUpdate = () => {
    if (user) {
      updateProfile({
        name: profileData.name,
        email: profileData.email
      });
      setIsEditingProfile(false);
    }
  };

  // Handle address data change - Simplified event type
  const handleAddressChange = (e) => { // e: React.ChangeEvent<HTMLInputElement> -> e
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
  };

  // Handle address checkbox change - Simplified event type
  const handleCheckboxChange = (e) => { // e: React.ChangeEvent<HTMLInputElement> -> e
    const { name, checked } = e.target;
    setAddressData(prev => ({ ...prev, [name]: checked }));
  };

  // Set up address form for editing - Removed type annotation
  const handleEditAddress = (address) => { // address: Address -> address
    setAddressData({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      isDefault: address.isDefault
    });
    setCurrentAddressId(address.id);
    setIsEditingAddress(true);
    setIsAddingAddress(true);
  };

  // Reset address form
  const resetAddressForm = () => {
    setAddressData({
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      isDefault: false
    });
    setCurrentAddressId('');
    setIsEditingAddress(false);
    setIsAddingAddress(false);
  };

  // Handle address save
  const handleSaveAddress = async () => {
    if (isEditingAddress && currentAddressId) {
      // Update existing address
      await callFetch(updateAddress({
        id: currentAddressId,
        ...addressData
      }));
    } else {
      // Add new address
      await callFetch(addAddress(addressData));
    }
    resetAddressForm();
  };

  // Handle address delete - Removed type annotation
  const handleDeleteAddress = async (addressId) => { // addressId: string -> addressId
    await callFetch(removeAddress(addressId));
  };

  return (
    <div className="space-y-8">
      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">Profile Information</h2>

          {!isEditingProfile && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingProfile(true)}
              className="flex items-center gap-1"
            >
              <Edit size={16} />
              Edit
            </Button>
          )}
        </div>

        {isEditingProfile ? (
          <div className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleProfileChange}
            />

            <div className="flex gap-3 pt-2">
              <Button variant="primary" onClick={handleProfileUpdate}>
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              {/* Optional chaining (`?.`) is valid in modern JavaScript */}
              <p className="font-medium">{user?.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
        )}
      </div>

      {/* Addresses */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">My Addresses</h2>

          {!isAddingAddress && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingAddress(true)}
              className="flex items-center gap-1"
            >
              <Plus size={16} />
              Add New Address
            </Button>
          )}
        </div>

        {isAddingAddress ? (
          <div className="border rounded-md p-4 mb-6">
            <h3 className="font-medium mb-4">
              {isEditingAddress ? 'Edit Address' : 'Add New Address'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Address Name (e.g., Home, Work)"
                name="name"
                value={addressData.name}
                onChange={handleAddressChange}
              />

              <div className="md:col-span-2">
                <Input
                  label="Street Address"
                  name="street"
                  value={addressData.street}
                  onChange={handleAddressChange}
                />
              </div>

              <Input
                label="City"
                name="city"
                value={addressData.city}
                onChange={handleAddressChange}
              />

              <Input
                label="State / Province"
                name="state"
                value={addressData.state}
                onChange={handleAddressChange}
              />

              <Input
                label="ZIP / Postal Code"
                name="zip"
                value={addressData.zip}
                onChange={handleAddressChange}
              />

              <Input
                label="Country"
                name="country"
                value={addressData.country}
                onChange={handleAddressChange}
              />

              <div className="md:col-span-2 flex items-center mt-2">
                <input
                  type="checkbox"
                  id="default-address"
                  name="isDefault"
                  checked={addressData.isDefault}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37] rounded"
                />
                <label htmlFor="default-address" className="ml-2 text-gray-700">
                  Set as default address
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="primary" onClick={handleSaveAddress}>
                {isEditingAddress ? 'Update Address' : 'Save Address'}
              </Button>
              <Button variant="outline" onClick={resetAddressForm}>
                Cancel
              </Button>
            </div>
          </div>
        ) : null}

        {/* Optional chaining (`?.`) and map are valid in modern JavaScript */}
        {user?.addresses && user.addresses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.addresses.map(address => (
              <div key={address.id} className="border rounded-md p-4 relative">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />

                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{address.name}</h3>

                      {address.isDefault && (
                        <span className="inline-block text-xs bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 mt-1">
                      {address.street}<br />
                      {address.city}, {address.state} {address.zip}<br />
                      {address.country}
                    </p>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="text-sm text-[#D4AF37] hover:underline flex items-center gap-1"
                      >
                        <Edit size={14} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-sm text-red-600 hover:underline flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border rounded-md">
            <p className="text-gray-500 mb-4">You haven't added any addresses yet.</p>
            {!isAddingAddress && (
              <Button
                variant="outline"
                onClick={() => setIsAddingAddress(true)}
                className="flex items-center gap-1 mx-auto"
              >
                <Plus size={16} />
                Add Your First Address
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;