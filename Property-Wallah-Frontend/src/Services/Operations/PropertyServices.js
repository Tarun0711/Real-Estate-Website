import { apiConnector } from "../ApiConnector";
import { toast } from "react-hot-toast";
import { PROPERTY_API } from "../Apis";

const {
  CreateProperty,
  GetPropertyById,
  UpdateProperty,
  DeleteProperty,
  GetAllProperties,
  UpdateStatus,
  GetPropertiesByUser,
} = PROPERTY_API;

const handleApiRequest = async (method, url, data, successMessage, errorMessage, token) => {
  const showToast = url !== GetAllProperties;
  const toastId = showToast ? toast.loading(`${successMessage}...`) : null;
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(method !== "GET" && method !== "DELETE" && { "Content-Type": "multipart/form-data" }),
  };

  console.log(`HTTP Method: ${method}, URL: ${url}`);

  try {
    const response = await apiConnector({
      method,
      url,
      data: method === "GET" ? null : data,
      headers,
      params: method === "GET" ? data : null,
    });
    if (!response.data.success) {
      throw new Error(response.data.message || errorMessage);
    }
    if (showToast) toast.success(successMessage);
    return response.data;
  } catch (error) {
    console.log(`${errorMessage}:`, error?.response?.data || error.message);
    if (showToast) toast.error(error?.response?.data?.message || errorMessage);
    throw error; 
  } finally {
    if (showToast) toast.dismiss(toastId);
  }
};

export const createProperty = (formData) => async (dispatch, getState) => {
  const { token } = getState().auth;
  return handleApiRequest("POST", CreateProperty, formData, "Property created successfully", "Could not create property", token);
};

export const getPropertyById = async (id, token) => {
  const response = await handleApiRequest("GET", `${GetPropertyById}/${id}`, null, "Property fetched successfully", "Could not fetch property", token);
  return response;
};

export const updateProperty = (id, updateData) => async (dispatch, getState) => {
  const { token } = getState().auth;
  return handleApiRequest("PUT", `${UpdateProperty}/${id}`, updateData, "Property updated successfully", "Could not update property", token);
};

export const deleteProperty = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;
  return handleApiRequest("DELETE", `${DeleteProperty}/${id}`, null, "Property deleted successfully", "Could not delete property", token);
};

export const getAllProperties = async (filters) => {
  return handleApiRequest("GET", GetAllProperties, filters, "Properties fetched successfully", "Could not fetch properties");
};

export const updateStatus = (id, statusData) => async (dispatch, getState) => {
  const { token } = getState().auth;
  return handleApiRequest("PUT", `${UpdateStatus}/${id}`, statusData, "Status updated successfully", "Could not update status", token);
};

export const getPropertiesByUser = (userId) => async (dispatch, getState) => {
  const { token } = getState().auth;
  return handleApiRequest("GET", `${GetPropertiesByUser}/${userId}`, null, "Properties fetched successfully", "Could not fetch user's properties", token);
};
