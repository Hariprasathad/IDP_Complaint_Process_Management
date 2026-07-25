import { create } from 'zustand';

/**
 * Zustand store for wizard state.
 * 
 * Architecture:
 * - Single flat `formData` object holds all field values
 * - saveStepX() methods update relevant slices after RHF validation passes
 * - getFormPayload() assembles the API request body
 * - No localStorage — F5 resets everything
 */

const initialFormData = {
  // Step 1: Complaint Details
  description: '',
  attachments: [], // { id, name, size, type, fileKey, status }

  // Step 2: Incident Location
  country: '',
  office: '',
  isOnline: false,
  isOther: false,
  onlineSpecify: '',

  // Step 3: Who Is Lodging
  complainantType: '',
  complainantTypeOther: '',

  // Step 4: Contact Preference
  contactPreference: '',
  fullName: '',
  emailAddress: '',
  countryCode: '',
  phoneNumber: '',
  currentCountry: '',
  studyDestinations: [],
  privacyPolicyAccepted: false,
};

const initialState = {
  currentStep: 1,
  isSubmitting: false,
  complaintId: null,
  formData: { ...initialFormData },
};

const useWizardStore = create((set, get) => ({
  ...initialState,

  // --- Navigation ---
  goNext: () => set((state) => {
    if (state.currentStep < 4) {
      return { currentStep: state.currentStep + 1 };
    }
    return state;
  }),

  goPrevious: () => set((state) => {
    if (state.currentStep > 1) {
      return { currentStep: state.currentStep - 1 };
    }
    return state;
  }),

  goToStep: (step) => set({ currentStep: step }),

  // --- Save validated step data ---
  saveStep1: (data) => set((state) => ({
    formData: { ...state.formData, ...data },
  })),

  saveStep2: (data) => set((state) => ({
    formData: { ...state.formData, ...data },
  })),

  saveStep3: (data) => set((state) => ({
    formData: { ...state.formData, ...data },
  })),

  saveStep4: (data) => set((state) => ({
    formData: { ...state.formData, ...data },
  })),

  // --- Attachments (managed asynchronously) ---
  addAttachment: (file) => set((state) => ({
    formData: {
      ...state.formData,
      attachments: [...state.formData.attachments, file],
    },
  })),

  removeAttachment: (id) => set((state) => ({
    formData: {
      ...state.formData,
      attachments: state.formData.attachments.filter(f => f.id !== id),
    },
  })),

  // --- Submission ---
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setComplaintId: (complaintId) => set({ complaintId }),
  submitComplete: (complaintId) => set({ currentStep: 5, complaintId, isSubmitting: false }),

  // --- Get API payload ---
  getFormPayload: () => {
    const { formData } = get();

    return {
      description: formData.description.trim(),
      attachments: formData.attachments
        .filter(f => f.status === 'completed')
        .map(f => ({ fileKey: f.fileKey, fileName: f.name, fileSize: f.size })),
      location: {
        country: formData.country,
        office: formData.office,
        isOnline: formData.isOnline,
        onlineSpecify: formData.onlineSpecify,
      },
      complainantType: formData.complainantType,
      complainantTypeOther: formData.complainantTypeOther,
      contactPreference: formData.contactPreference,
      contactDetails: formData.contactPreference === 'yes' ? {
        fullName: formData.fullName.trim(),
        emailAddress: formData.emailAddress.trim(),
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber.trim(),
        currentCountry: formData.currentCountry,
      } : null,
      studyDestinations: formData.studyDestinations,
      privacyPolicyAccepted: formData.privacyPolicyAccepted,
    };
  },

  // --- Reset ---
  reset: () => set({ ...initialState, formData: { ...initialFormData } }),
}));

export default useWizardStore;
