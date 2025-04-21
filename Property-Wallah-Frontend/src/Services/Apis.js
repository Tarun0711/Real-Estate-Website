const BASE_URL = typeof process !== 'undefined' ? process.env.REACT_APP_BASE_URL : 'https://api.propertywallah.org/api/v1';

export const AUTH_API = {
  SendOtp: `${BASE_URL}/user/send-otp`,
  VerifyOtp: `${BASE_URL}/user/verify-otp`,
};

export const PROPERTY_API = {
  getPropertyList: `${BASE_URL}/property/properties`, // Updated to match the route for getting all properties
  getPropertyDetails: `${BASE_URL}/property/properties/:id`, // Updated to match the route for getting property by ID
  CreateProperty: `${BASE_URL}/property/properties`, // Updated to match the route for creating a property
  GetPropertyById: `${BASE_URL}/property/properties`, // Updated to match the route for getting property by ID
  updateProperty: `${BASE_URL}/property/properties/:id`, // Updated to match the route for updating a property
  deleteProperty: `${BASE_URL}/properties/:id`, // Updated to match the route for deleting a property
  GetAllProperties: `${BASE_URL}/property/properties`, // Updated to match the route for getting all properties
  updateStatus: `${BASE_URL}/properties/:id/status`, // Updated to match the route for updating property status
  getPropertiesByUser: `${BASE_URL}/properties/getByUser`, // Assuming this route exists
};

export const SOCIETY_API = {
  CreateSociety: `${BASE_URL}/society/societies`,
  GetSocietyById: `${BASE_URL}/society/societies`,
  UpdateSociety: `${BASE_URL}/society/societies/:id`,
  DeleteSociety: `${BASE_URL}/society/societies/:id`,
  GetAllSocieties: `${BASE_URL}/society/societies`,
};

export const CONTACT_API = {
    sendContactEmail: `${BASE_URL}/contact`,
};