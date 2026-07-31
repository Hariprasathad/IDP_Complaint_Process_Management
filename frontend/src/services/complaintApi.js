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
 * Uses mock data until backend is ready.
 * @returns {Promise<Array<{code: string, name: string, phoneCode: string}>>}
 */
export const getCountries = async () => {
  // Mock data for development — replace with real API when backend is ready
  // const response = await apiClient.get('/master-data/countries');
  // return response.data.countries;
  
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  return [
    { code: 'AU', name: 'Australia', phoneCode: '+61' },
    { code: 'IN', name: 'India', phoneCode: '+91' },
    { code: 'GB', name: 'United Kingdom', phoneCode: '+44' },
    { code: 'US', name: 'United States', phoneCode: '+1' },
    { code: 'CA', name: 'Canada', phoneCode: '+1' },
    { code: 'NZ', name: 'New Zealand', phoneCode: '+64' },
    { code: 'SG', name: 'Singapore', phoneCode: '+65' },
    { code: 'MY', name: 'Malaysia', phoneCode: '+60' },
    { code: 'PH', name: 'Philippines', phoneCode: '+63' },
    { code: 'LK', name: 'Sri Lanka', phoneCode: '+94' },
    { code: 'BD', name: 'Bangladesh', phoneCode: '+880' },
    { code: 'NP', name: 'Nepal', phoneCode: '+977' },
    { code: 'PK', name: 'Pakistan', phoneCode: '+92' },
    { code: 'VN', name: 'Vietnam', phoneCode: '+84' },
    { code: 'TH', name: 'Thailand', phoneCode: '+66' },
    { code: 'ID', name: 'Indonesia', phoneCode: '+62' },
    { code: 'CN', name: 'China', phoneCode: '+86' },
    { code: 'JP', name: 'Japan', phoneCode: '+81' },
    { code: 'KR', name: 'South Korea', phoneCode: '+82' },
  ];
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
