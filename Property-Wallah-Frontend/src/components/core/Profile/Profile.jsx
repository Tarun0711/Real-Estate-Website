import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const NotificationSwitch = ({ label, isChecked, onToggle }) => {
  return (
    <div className="flex items-center justify-between">
      <h3>{label}</h3>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-custom focus:ring-offset-2 ${
          isChecked ? 'bg-custom' : 'bg-gray-200'
        }`}
        role="switch"
        aria-checked={isChecked}
      >
        <span
          className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isChecked ? 'translate-x-5' : 'translate-x-0'
          }`}
        >
          <span
            className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-out ${
              isChecked ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <i className="fas fa-times text-gray-400 text-xs"></i>
          </span>
          <span
            className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in ${
              isChecked ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <i className="fas fa-check text-custom text-xs"></i>
          </span>
        </span>
      </button>
    </div>
  );
};

// ProfileCard Component
const ProfileCard = ({ user }) => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <img
          src={user.image}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200">
          <i className="fas fa-camera text-gray-600"></i>
        </button>
      </div>
      <div className="ml-6">
        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
        <p className="text-sm text-gray-500">{`Premium Member since ${user.membershipYear}`}</p>
        <div className="mt-2 flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            <i className="fas fa-home mr-2"></i>
            {`${user.listings} Listings`}
          </span>
          <span className="text-sm text-gray-600">
            <i className="fas fa-star mr-2"></i>
            {`${user.rating} Rating`}
          </span>
        </div>
      </div>
    </div>
  );
};

// Personal Information Form Component
const PersonalInfoForm = ({ userInfo }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(userInfo).map(([label, value]) => (
          <div key={label}>
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type="text"
              value={value}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Active Listings Component
const ActiveListings = ({ listings }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Active Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((listing, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <img
              src={listing.image}
              alt="Property"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{listing.title}</h3>
              <p className="text-sm text-gray-500">{listing.address}</p>
              <p className="mt-2 text-lg font-medium text-gray-900">{listing.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function Profile() {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [listingUpdates, setListingUpdates] = useState(false);
  const { pwUser } = useSelector((state) => state.profile);

  const userInfo = {
    'Full Name': pwUser.name,
    Email: pwUser.email,
    Phone: pwUser.phone,
    'License Number': pwUser.license,
    'Business Address': pwUser.address,
  };

  const listings = pwUser.listingsData;

  return (
    <div className="bg-gray-100">
      <main className="max-w-8xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="mb-8 sticky top-0 bg-white rounded-lg shadow p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <ProfileCard user={pwUser} />
            <button className="bg-custom text-white px-4 py-2 text-sm font-medium rounded-lg">
              <i className="fas fa-edit mr-2"></i>Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-8">
            <PersonalInfoForm userInfo={userInfo} />
            {/* <ActiveListings listings={listings} /> */}
          </div>

          {/* Right Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Notification Preferences</h2>
              <NotificationSwitch
                label="Email Notifications"
                isChecked={emailNotifications}
                onToggle={() => setEmailNotifications(!emailNotifications)}
              />
              <NotificationSwitch
                label="Listing Updates"
                isChecked={listingUpdates}
                onToggle={() => setListingUpdates(!listingUpdates)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
