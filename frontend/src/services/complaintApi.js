import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.partner.idp.com/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

/**
 * Submit the complete complaint payload.
 * @param {Object} payload - Assembled from Zustand store via getFormPayload()
 * @returns {Promise<{complaintId: string, status: string, message: string}>}
 */
export const submitComplaint = async (payload) => {
  const response = await apiClient.post('/complaints', payload);
  return response.data;
};

/**
 * Get a pre-signed S3 URL for file upload.
 * @param {Object} params - { fileName, fileType, fileSize }
 * @returns {Promise<{uploadUrl: string, fileKey: string, expiresIn: number}>}
 */
export const getUploadUrl = async ({ fileName, fileType, fileSize }) => {
  const response = await apiClient.post('/complaints/upload-url', {
    fileName,
    fileType,
    fileSize,
  });
  return response.data;
};

/**
 * Upload a file to S3 using a pre-signed URL.
 * @param {string} uploadUrl - Pre-signed S3 URL
 * @param {File} file - File object to upload
 * @param {Function} onProgress - Progress callback (0-100)
 * @returns {Promise<void>}
 */
export const uploadFileToS3 = async (uploadUrl, file, onProgress) => {
  await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
    onUploadProgress: (progressEvent) => {
      const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      if (onProgress) onProgress(percent);
    },
  });
};

/**
 * Get country list for dropdowns.
 * @returns {Promise<Array<{code: string, name: string, phoneCode: string}>>}
 */
export const getCountries = async () => {
  const response = await apiClient.get('/master-data/countries');
  return response.data.countries;
};

/**
 * Get offices for a specific country.
 * @param {string} countryCode
 * @returns {Promise<Array<{id: string, name: string, country: string}>>}
 */
export const getOffices = async (countryCode) => {
  const response = await apiClient.get(`/master-data/offices?country=${countryCode}`);
  return response.data.offices;
};

export default apiClient;
