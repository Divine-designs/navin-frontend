import React, { useState } from 'react';
import './CustomerProfile.css';

type Profile = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  wallet: string;
};

type ProfileErrors = {
  fullName?: string;
  phone?: string;
  address?: string;
};

const initialProfile: Profile = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  wallet: '', // Replace with actual wallet logic
};


const CustomerProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [loading, setLoading] = useState(false);

  // Inline validation logic
  const validate = (field: keyof Profile, value: string): string => {
    let error = '';
    if (field === 'fullName' && !value) error = 'Full name is required.';
    if (field === 'phone' && !/^\d{10,}$/.test(value)) error = 'Enter a valid phone number.';
    if (field === 'address' && !value) error = 'Address is required.';
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value } as Profile);
    setErrors({ ...errors, [name]: validate(name as keyof Profile, value) });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newErrors: ProfileErrors = {};
    (Object.keys(profile) as Array<keyof Profile>).forEach((field) => {
      if (field !== 'email' && field !== 'wallet') {
        const error = validate(field, profile[field]);
        if (error) newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Show success message or handle response
      }, 1500);
    }
  };

  return (
    <div className="customer-profile-container">
      <form className="customer-profile-form" onSubmit={handleSave}>
        <h2>Customer Profile</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className={errors.fullName ? 'error' : ''}
            placeholder="Enter your full name"
          />
          {errors.fullName && <span className="inline-error">{errors.fullName}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            value={profile.email}
            disabled
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            placeholder="Enter phone number"
          />
          {errors.phone && <span className="inline-error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label>Delivery Address</label>
          <input
            name="address"
            value={profile.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
            placeholder="Enter delivery address"
          />
          {errors.address && <span className="inline-error">{errors.address}</span>}
        </div>
        <div className="wallet-section">
          <label>Connected Wallet</label>
          <div className="wallet-address">
            {profile.wallet ? profile.wallet : 'Not Connected'}
          </div>
        </div>
        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default CustomerProfile;
