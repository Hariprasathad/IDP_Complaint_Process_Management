import { create } from 'zustand';

const initialState = {
  currentStep: 1,
  isSubmitting: false,
  complaintId: null,

  // Step 1: Complaint Details
  description: '',
  attachments: [], // { id, file, name, size, type, progress, status }

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

const useWizardStore = create((set, get) => ({
  ...initialState,

  // Navigation
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

  // Step 1 actions
  setDescription: (description) => set({ description }),
  addAttachment: (file) => set((state) => ({
    attachments: [...state.attachments, file]
  })),
  removeAttachment: (id) => set((state) => ({
    attachments: state.attachments.filter(f => f.id !== id)
  })),
  updateAttachmentProgress: (id, progress, status) => set((state) => ({
    attachments: state.attachments.map(f => 
      f.id === id ? { ...f, progress, status } : f
    )
  })),

  // Step 2 actions
  setCountry: (country) => set({ country }),
  setOffice: (office) => set({ office }),
  setIsOnline: (isOnline) => set({ isOnline }),
  setIsOther: (isOther) => set({ isOther }),
  setOnlineSpecify: (onlineSpecify) => set({ onlineSpecify }),

  // Step 3 actions
  setComplainantType: (complainantType) => set({ complainantType }),
  setComplainantTypeOther: (complainantTypeOther) => set({ complainantTypeOther }),

  // Step 4 actions
  setContactPreference: (contactPreference) => set({ contactPreference }),
  setFullName: (fullName) => set({ fullName }),
  setEmailAddress: (emailAddress) => set({ emailAddress }),
  setCountryCode: (countryCode) => set({ countryCode }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setCurrentCountry: (currentCountry) => set({ currentCountry }),
  toggleStudyDestination: (destination) => set((state) => ({
    studyDestinations: state.studyDestinations.includes(destination)
      ? state.studyDestinations.filter(d => d !== destination)
      : [...state.studyDestinations, destination]
  })),
  setPrivacyPolicyAccepted: (privacyPolicyAccepted) => set({ privacyPolicyAccepted }),

  // Submission
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setComplaintId: (complaintId) => set({ complaintId }),
  submitForm: () => set({ currentStep: 5 }),

  // Reset
  reset: () => set(initialState),

  // Get all form data for submission
  getFormData: () => {
    const state = get();
    return {
      description: state.description.trim(),
      attachments: state.attachments.filter(f => f.status === 'completed'),
      location: {
        country: state.country,
        office: state.office,
        isOnline: state.isOnline,
        onlineSpecify: state.onlineSpecify,
      },
      complainantType: state.complainantType,
      complainantTypeOther: state.complainantTypeOther,
      contactPreference: state.contactPreference,
      contactDetails: state.contactPreference === 'yes' ? {
        fullName: state.fullName.trim(),
        emailAddress: state.emailAddress.trim(),
        countryCode: state.countryCode,
        phoneNumber: state.phoneNumber.trim(),
        currentCountry: state.currentCountry,
      } : null,
      studyDestinations: state.studyDestinations,
      privacyPolicyAccepted: state.privacyPolicyAccepted,
    };
  },
}));

export default useWizardStore;
