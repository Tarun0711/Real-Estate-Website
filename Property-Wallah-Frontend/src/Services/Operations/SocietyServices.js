import { apiConnector } from "../ApiConnector";
import { toast } from "react-hot-toast";
import { SOCIETY_API } from "../Apis"; // Corrected import statement

const {
  CreateSociety,
  GetSocietyById,
  UpdateSociety,
  DeleteSociety,
  GetAllSocieties,
} = SOCIETY_API;

const handleApiRequest = async (method, url, data, successMessage, errorMessage, token) => {
  const showToast = url !== GetAllSocieties;
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

export const createSociety = (formData) => async (dispatch, getState) => {
  const { token } = getState().auth;
  return handleApiRequest("POST", CreateSociety, formData, "Society created successfully", "Could not create society", token);
};

export const getSocietyById = async (id, token) => {
  const response = await handleApiRequest("GET", `${GetSocietyById}/${id}`, null, "Society fetched successfully", "Could not fetch society", token);
  return response;
};

export const updateSociety = (id, updateData) => async (dispatch, getState) => {
  const { token } = getState().auth;
  return handleApiRequest("PUT", `${UpdateSociety}/${id}`, updateData, "Society updated successfully", "Could not update society", token);
};

export const deleteSociety = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;
  return handleApiRequest("DELETE", `${DeleteSociety}/${id}`, null, "Society deleted successfully", "Could not delete society", token);
};

export const getAllSocieties = async (filters) => {
  return handleApiRequest("GET", GetAllSocieties, filters, "Societies fetched successfully", "Could not fetch societies");
};
